# Deployment Incident Response Runbook

## First response

1. Stop repeated publishes and manual retries.
2. Record UTC timestamps, affected document ID/type, Sanity delivery status, GitHub run ID, Cloudflare deployment ID, and affected hostname. Do not copy tokens, signatures, full webhook bodies, or secret values.
3. Determine the failing boundary: Sanity delivery, gateway validation, GitHub dispatch/build, Cloudflare deploy, or DNS/custom domain.
4. Keep the last known-good production deployment serving while investigating.

## Triage table

| Signal | Likely boundary | First check |
|---|---|---|
| Sanity has no delivery | Sanity filter or webhook state | webhook active state, dataset, type filter |
| Sanity 401 | signing boundary | secret pairing, raw-body handling, signature age |
| Sanity 403 | allowlist boundary | project, dataset, type, operation, draft/version ID |
| Sanity 413/415 | request contract | payload size or content type |
| Sanity 429 | replay/rate gate | event burst, duplicate keys, retry schedule |
| Sanity 502 | GitHub dispatch | token scope/expiry, repository setting, GitHub status |
| GitHub run missing | workflow admission | event type and `client_payload` guard |
| GitHub run failed | build/deploy | failing step, environment approval, Cloudflare secret names |
| Worker URL fresh, custom domain stale | DNS/routing | authoritative nameservers, apex/`www` records, Worker route |

## Credential exposure

1. Disable the affected webhook or gateway route if active exploitation is possible.
2. Revoke the suspected credential at its issuer first.
3. Create a replacement with the minimum required scope.
4. Update the secret store, redeploy, and verify one controlled event.
5. Search Sanity delivery metadata, GitHub logs, Cloudflare logs, repository history, and local artifacts for exposure without printing values.
6. Record issuer, secret name, rotation time, affected period, and evidence reviewed in the incident log.

## Replay or deploy storm

1. Disable the Sanity webhook to stop new ingress; do not delete it.
2. Inspect event IDs and timestamps, not full bodies.
3. Confirm the Durable Object is deduplicating a 24-hour event window and enforcing ten events per ten minutes.
4. Cancel queued duplicate GitHub runs if safe; do not cancel the last known-good deployment.
5. Fix the producer retry or idempotency source before re-enabling the webhook.

## Recovery verification

- one controlled publish receives a 2xx Sanity delivery;
- the gateway accepts exactly one event and forwards only normalized metadata;
- exactly one GitHub production run succeeds;
- exactly one new Cloudflare deployment becomes active;
- Worker and approved custom-domain URLs return expected fresh content over HTTPS;
- a second delivery of the same event does not cause another deploy;
- no secret value appears in logs or artifacts.

## Closure

Document root cause, affected window, user impact, credentials rotated, rollback/recovery actions, verification evidence, and preventive follow-up. Delete temporary diagnostic artifacts containing sensitive payloads after preserving redacted evidence.
