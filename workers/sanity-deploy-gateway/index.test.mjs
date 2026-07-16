import assert from "node:assert/strict";
import test from "node:test";
import { encodeSignatureHeader } from "@sanity/webhook";
import {
  buildDispatchPayload,
  DeployGate,
  handleSanityWebhook,
} from "./index.mjs";

const secret = "test-only-secret";
const now = 1_800_000_000_000;
const body = JSON.stringify({ _id: "blog-1", _type: "blogPost", ignored: "not-forwarded" });

function env(fetchResponse = new Response(JSON.stringify({ accepted: true }), { status: 202 })) {
  const calls = [];
  return {
    calls,
    value: {
      SANITY_WEBHOOK_SECRET: secret,
      EXPECTED_SANITY_PROJECT_ID: "project-1",
      EXPECTED_SANITY_DATASET: "production",
      ALLOWED_DOCUMENT_TYPES: "blogPost,businessDetails",
      DEPLOY_GATE: {
        idFromName: (name) => name,
        get: () => ({
          fetch: async (...args) => {
            calls.push(args);
            return fetchResponse;
          },
        }),
      },
    },
  };
}

async function signedRequest(overrides = {}) {
  const payload = overrides.body ?? body;
  const timestamp = overrides.timestamp ?? now;
  const signature = overrides.signature ?? await encodeSignatureHeader(payload, timestamp, secret);
  return new Request("https://gateway.example/hooks/sanity", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "sanity-webhook-signature": signature,
      "sanity-project-id": overrides.projectId ?? "project-1",
      "sanity-dataset": overrides.dataset ?? "production",
      "sanity-document-id": overrides.documentId ?? "blog-1",
      "sanity-operation": overrides.operation ?? "update",
      "idempotency-key": "retry-key",
    },
    body: payload,
  });
}

function request({ method = "POST", contentType = "application/json", body: requestBody = body, headers = {} } = {}) {
  return new Request("https://gateway.example/hooks/sanity", {
    method,
    headers: { "content-type": contentType, ...headers },
    body: method === "POST" ? requestBody : undefined,
  });
}

class FakeSql {
  constructor() {
    this.events = new Map();
  }

  exec(query, ...args) {
    if (query.startsWith("CREATE TABLE")) return [];
    if (query.startsWith("DELETE FROM events WHERE created_at")) {
      for (const [id, event] of this.events) {
        if (event.createdAt < args[0]) this.events.delete(id);
      }
      return [];
    }
    if (query.startsWith("SELECT status")) {
      const event = this.events.get(args[0]);
      return event ? [{ status: event.status }] : [];
    }
    if (query.startsWith("SELECT COUNT")) {
      return [{ count: [...this.events.values()].filter((event) => event.createdAt >= args[0]).length }];
    }
    if (query.startsWith("INSERT INTO")) {
      this.events.set(args[0], { createdAt: args[1], status: "processing" });
      return [];
    }
    if (query.startsWith("UPDATE events")) {
      this.events.get(args[0]).status = "complete";
      return [];
    }
    if (query.startsWith("DELETE FROM events WHERE id")) {
      this.events.delete(args[0]);
      return [];
    }
    throw new Error(`Unexpected SQL: ${query}`);
  }
}

const gateEvent = (eventId) => ({
  projectId: "project-1",
  dataset: "production",
  documentId: "blog-1",
  documentType: "blogPost",
  operation: "update",
  eventId,
});

const gateRequest = (eventId) => new Request("https://deploy-gate.internal/dispatch", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(gateEvent(eventId)),
});

test("valid signed event forwards only a normalized envelope", async () => {
  const target = env();
  const response = await handleSanityWebhook(await signedRequest(), target.value, now);
  assert.equal(response.status, 202);
  assert.equal(target.calls.length, 1);
  const forwarded = JSON.parse(target.calls[0][1].body);
  assert.deepEqual(Object.keys(forwarded).sort(), [
    "dataset",
    "documentId",
    "documentType",
    "eventId",
    "operation",
    "projectId",
  ]);
  assert.equal(forwarded.documentType, "blogPost");
  assert.equal("ignored" in forwarded, false);
});

test("invalid or stale signatures fail closed", async () => {
  const target = env();
  const invalid = await handleSanityWebhook(
    await signedRequest({ signature: `t=${now},v1=invalid` }),
    target.value,
    now
  );
  const stale = await handleSanityWebhook(
    await signedRequest({ timestamp: now - 11 * 60 * 1000 }),
    target.value,
    now
  );
  assert.equal(invalid.status, 401);
  assert.equal(stale.status, 401);
  assert.equal(target.calls.length, 0);
});

test("missing and body-mismatched signatures fail closed", async () => {
  const target = env();
  const missing = await handleSanityWebhook(request(), target.value, now);
  const originalSignature = await encodeSignatureHeader(body, now, secret);
  const modified = await handleSanityWebhook(
    await signedRequest({
      body: JSON.stringify({ _id: "blog-1", _type: "businessDetails" }),
      signature: originalSignature,
    }),
    target.value,
    now
  );
  assert.equal(missing.status, 401);
  assert.equal(modified.status, 401);
  assert.equal(target.calls.length, 0);
});

test("method, media type, JSON, size, and missing configuration fail closed", async () => {
  const target = env();
  const get = await handleSanityWebhook(request({ method: "GET" }), target.value, now);
  const put = await handleSanityWebhook(request({ method: "PUT" }), target.value, now);
  const wrongType = await handleSanityWebhook(
    request({ contentType: "text/plain" }),
    target.value,
    now
  );
  const malformedBody = "{";
  const malformed = await handleSanityWebhook(
    await signedRequest({ body: malformedBody }),
    target.value,
    now
  );
  const oversizedBody = "x".repeat(64 * 1024 + 1);
  const oversized = await handleSanityWebhook(
    await signedRequest({ body: oversizedBody }),
    target.value,
    now
  );
  const unavailableEnv = env().value;
  delete unavailableEnv.SANITY_WEBHOOK_SECRET;
  const unavailable = await handleSanityWebhook(request(), unavailableEnv, now);
  assert.equal(get.status, 405);
  assert.equal(put.status, 405);
  assert.equal(wrongType.status, 415);
  assert.equal(malformed.status, 400);
  assert.equal(oversized.status, 413);
  assert.equal(unavailable.status, 503);
});

test("wrong project, dataset, draft/version ids, type, and operation are rejected", async () => {
  const target = env();
  const wrongProject = await handleSanityWebhook(
    await signedRequest({ projectId: "project-2" }),
    target.value,
    now
  );
  const wrongDataset = await handleSanityWebhook(
    await signedRequest({ dataset: "development" }),
    target.value,
    now
  );
  const draft = await handleSanityWebhook(
    await signedRequest({ documentId: "drafts.blog-1" }),
    target.value,
    now
  );
  const version = await handleSanityWebhook(
    await signedRequest({ documentId: "versions.release.blog-1" }),
    target.value,
    now
  );
  const irrelevant = await handleSanityWebhook(
    await signedRequest({ body: JSON.stringify({ _id: "x", _type: "internalNote" }) }),
    target.value,
    now
  );
  const wrongOperation = await handleSanityWebhook(
    await signedRequest({ operation: "publish" }),
    target.value,
    now
  );
  assert.equal(wrongProject.status, 403);
  assert.equal(wrongDataset.status, 403);
  assert.equal(draft.status, 403);
  assert.equal(version.status, 403);
  assert.equal(irrelevant.status, 403);
  assert.equal(wrongOperation.status, 403);
  assert.equal(target.calls.length, 0);
});

test("GitHub dispatch payload cannot inherit arbitrary CMS keys", () => {
  const payload = buildDispatchPayload({
    projectId: "project-1",
    dataset: "production",
    documentId: "blog-1",
    documentType: "blogPost",
    operation: "update",
    eventId: "event-1",
    authorization: "must-not-forward",
  });
  assert.equal(payload.event_type, "sanity-publish");
  assert.equal(payload.client_payload.authorization, undefined);
});

test("durable gate deduplicates accepted events", async () => {
  const sql = new FakeSql();
  const gate = new DeployGate(
    { storage: { sql } },
    { GITHUB_DISPATCH_TOKEN: "test-token", GITHUB_REPOSITORY: "owner/repo" }
  );
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (...args) => {
    calls.push(args);
    return new Response(null, { status: 204 });
  };
  try {
    const first = await gate.fetch(gateRequest("same-event"));
    const duplicate = await gate.fetch(gateRequest("same-event"));
    assert.equal(first.status, 202);
    assert.equal(duplicate.status, 202);
    assert.equal((await duplicate.json()).duplicate, true);
    assert.equal(calls.length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("durable gate rate-limits event bursts", async () => {
  const sql = new FakeSql();
  const current = Date.now();
  for (let index = 0; index < 10; index += 1) {
    sql.events.set(`event-${index}`, { createdAt: current, status: "complete" });
  }
  const gate = new DeployGate(
    { storage: { sql } },
    { GITHUB_DISPATCH_TOKEN: "test-token", GITHUB_REPOSITORY: "owner/repo" }
  );
  const response = await gate.fetch(gateRequest("event-11"));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "600");
});

test("durable gate fails closed and permits a later retry after upstream failure", async () => {
  const sql = new FakeSql();
  const gate = new DeployGate(
    { storage: { sql } },
    { GITHUB_DISPATCH_TOKEN: "test-token", GITHUB_REPOSITORY: "owner/repo" }
  );
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(null, { status: 500 });
  try {
    const failed = await gate.fetch(gateRequest("retry-event"));
    assert.equal(failed.status, 502);
    assert.equal(sql.events.has("retry-event"), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
