# Secret Rotation Plan

Use create → configure → verify → switch → revoke → verify. Never overwrite the only working credential first.

## GitHub Dispatch Credential

1. Create a fine-grained token for only `pawelkom88/little-wise-kids-website`, with the minimum repository-dispatch permission required and a short expiry.
2. Store as Cloudflare Worker secret `GITHUB_DISPATCH_TOKEN`.
3. Deploy/test gateway with a non-destructive signed event.
4. Switch Sanity webhook to the signed gateway and remove its Authorization header.
5. Prove one publish → one run → one Worker deployment.
6. Revoke the old credential stored in Sanity.
7. Confirm old webhook/credential can no longer create a run.

## Sanity Webhook Secret

1. Generate a high-entropy secret in an approved password/secret manager.
2. Store in gateway as `SANITY_WEBHOOK_SECRET`.
3. Configure the same secret on the replacement Sanity webhook without displaying or sharing the configuration URL.
4. Verify a valid signature succeeds and invalid/modified/stale signatures fail.
5. For rotation, deploy support for the new secret, switch Sanity, verify, then remove the old secret.

## Cloudflare Deploy Token

1. Inspect current token metadata and audit usage; do not expose the value.
2. Create a dedicated non-personal token scoped to the required account/Worker resources and actions only; set TTL/IP restrictions where operationally safe.
3. Store in the protected GitHub `production` environment.
4. Run a protected deployment and verify the exact Worker/version.
5. Revoke the previous token and verify rollback deployment still works.

## Web3Forms Access Key

Treat as browser-visible form identity, not privileged authorization. Restrict by provider domain/form controls, hCaptcha, rate limits, and recipient configuration. Rotate if abuse occurs or the form changes owner; update local/GitHub values, build, submit one benign test, then revoke the old key.

## Emergency Order

1. Disable or pause the affected trigger only with owner approval.
2. Preserve logs and deployment IDs.
3. Rotate the highest-authority credential first: Cloudflare deploy token, GitHub credential, Sanity token/secret, then form key.
4. Roll back unauthorized Worker versions.
5. Re-enable after negative tests and one known-good deployment.
