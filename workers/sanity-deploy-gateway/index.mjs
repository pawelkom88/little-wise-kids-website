import {
  SIGNATURE_HEADER_NAME,
  decodeSignatureHeader,
  isValidSignature,
} from "@sanity/webhook";

const MAX_BODY_BYTES = 64 * 1024;
const MAX_SIGNATURE_AGE_MS = 10 * 60 * 1000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 10;
const EVENT_TTL_MS = 24 * 60 * 60 * 1000;

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
  });

const header = (request, name) => request.headers.get(name)?.trim() ?? "";

async function readLimitedBody(request, maximumBytes) {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maximumBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

export function isAllowedExternalValue(value, expected) {
  return Boolean(value && expected && value === expected);
}

export function buildDispatchPayload(event) {
  return {
    event_type: "sanity-publish",
    client_payload: {
      source: "sanity-gateway",
      projectId: event.projectId,
      dataset: event.dataset,
      documentId: event.documentId,
      documentType: event.documentType,
      operation: event.operation,
      eventId: event.eventId,
    },
  };
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function allowedTypes(env) {
  return new Set(
    (env.ALLOWED_DOCUMENT_TYPES ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  );
}

export async function handleSanityWebhook(request, env, now = Date.now()) {
  const url = new URL(request.url);
  if (url.pathname !== "/hooks/sanity") return json({ error: "not_found" }, 404);
  if (request.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405, { allow: "POST" });
  }
  if (!env.SANITY_WEBHOOK_SECRET || !env.DEPLOY_GATE) {
    return json({ error: "gateway_unavailable" }, 503);
  }
  if (!header(request, "content-type").toLowerCase().startsWith("application/json")) {
    return json({ error: "unsupported_media_type" }, 415);
  }

  const declaredLength = Number(header(request, "content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) return json({ error: "payload_too_large" }, 413);

  const rawBody = await readLimitedBody(request, MAX_BODY_BYTES);
  if (!rawBody) {
    return json({ error: "payload_too_large" }, 413);
  }

  const signature = header(request, SIGNATURE_HEADER_NAME);
  let signatureTimestamp;
  try {
    signatureTimestamp = decodeSignatureHeader(signature).timestamp;
  } catch {
    return json({ error: "invalid_signature" }, 401);
  }
  if (
    Math.abs(now - signatureTimestamp) > MAX_SIGNATURE_AGE_MS ||
    !(await isValidSignature(rawBody, signature, env.SANITY_WEBHOOK_SECRET))
  ) {
    return json({ error: "invalid_signature" }, 401);
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const projectId = header(request, "sanity-project-id");
  const dataset = header(request, "sanity-dataset");
  const documentId = header(request, "sanity-document-id") || body?._id;
  const documentType = body?._type;
  const operation = header(request, "sanity-operation");

  if (
    !isAllowedExternalValue(projectId, env.EXPECTED_SANITY_PROJECT_ID) ||
    !isAllowedExternalValue(dataset, env.EXPECTED_SANITY_DATASET) ||
    !allowedTypes(env).has(documentType) ||
    !["create", "update", "delete"].includes(operation) ||
    typeof documentId !== "string" ||
    !documentId ||
    documentId.startsWith("drafts.") ||
    documentId.startsWith("versions.")
  ) {
    return json({ error: "event_not_allowed" }, 403);
  }

  const suppliedEventId = header(request, "idempotency-key");
  const eventId = await sha256(
    suppliedEventId ||
      [projectId, dataset, documentId, documentType, operation, rawBody].join("\n")
  );
  const event = { projectId, dataset, documentId, documentType, operation, eventId };
  const gate = env.DEPLOY_GATE.get(env.DEPLOY_GATE.idFromName("production"));
  return gate.fetch("https://deploy-gate.internal/dispatch", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(event),
  });
}

export default {
  fetch(request, env) {
    return handleSanityWebhook(request, env);
  },
};

export class DeployGate {
  constructor(state, env) {
    this.sql = state.storage.sql;
    this.env = env;
    this.sql.exec(
      "CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, created_at INTEGER NOT NULL, status TEXT NOT NULL)"
    );
  }

  async fetch(request) {
    if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);

    const event = await request.json();
    const now = Date.now();
    this.sql.exec("DELETE FROM events WHERE created_at < ?", now - EVENT_TTL_MS);

    const existing = [...this.sql.exec("SELECT status FROM events WHERE id = ?", event.eventId)][0];
    if (existing) return json({ accepted: true, duplicate: true }, 202);

    const recent = [...this.sql.exec(
      "SELECT COUNT(*) AS count FROM events WHERE created_at >= ?",
      now - RATE_WINDOW_MS
    )][0]?.count ?? 0;
    if (recent >= RATE_LIMIT) {
      return json({ error: "rate_limited" }, 429, { "retry-after": "600" });
    }

    this.sql.exec(
      "INSERT INTO events (id, created_at, status) VALUES (?, ?, 'processing')",
      event.eventId,
      now
    );

    try {
      if (!this.env.GITHUB_DISPATCH_TOKEN || !/^[^/\s]+\/[^/\s]+$/.test(this.env.GITHUB_REPOSITORY ?? "")) {
        throw new Error("dispatch configuration missing");
      }
      const response = await fetch(
        `https://api.github.com/repos/${this.env.GITHUB_REPOSITORY}/dispatches`,
        {
          method: "POST",
          headers: {
            accept: "application/vnd.github+json",
            authorization: `Bearer ${this.env.GITHUB_DISPATCH_TOKEN}`,
            "content-type": "application/json",
            "user-agent": "little-wise-kids-sanity-gateway",
            "x-github-api-version": "2022-11-28",
          },
          body: JSON.stringify(buildDispatchPayload(event)),
        }
      );
      if (response.status !== 204) throw new Error(`dispatch failed: ${response.status}`);
      this.sql.exec("UPDATE events SET status = 'complete' WHERE id = ?", event.eventId);
      return json({ accepted: true, duplicate: false }, 202);
    } catch {
      this.sql.exec("DELETE FROM events WHERE id = ?", event.eventId);
      return json({ error: "dispatch_failed" }, 502);
    }
  }
}
