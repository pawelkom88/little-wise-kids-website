# Security Audit Redaction Policy

## Never Record

- Secret/token values, signatures, cookies, private keys, recovery codes, or Authorization header values.
- Complete Sanity webhook destinations, GitHub dispatch credentials, Cloudflare hook URLs, or share URLs.
- Full signed webhook payloads or raw production request bodies.
- Personal account emails or account/member identifiers unless the owner explicitly needs them.

## Safe Recording

- Secret names, purpose, owner role, consumer, storage class, and rotation state.
- Public project/dataset/repository/Worker names.
- Sensitive destination fingerprints: service, HTTP host class, stable short hash, and non-secret resource type only.
- HTTP status, duration, timestamps, retry count, and redacted response summary.

## Handling Rules

1. Prefer metadata-only CLI/API requests.
2. Never dump an environment or secret store.
3. Redact before saving output; do not rely on later cleanup.
4. If a probable credential appears, stop copying output, record only type/path/commit, and add rotation work.
5. Do not put real secrets in fixtures, examples, docs, screenshots, shell history, `PUBLIC_` variables, or GitHub output.
6. Preserve evidence hashes and timestamps without preserving credential material.
