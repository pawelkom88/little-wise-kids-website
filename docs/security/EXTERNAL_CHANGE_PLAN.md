# External Change Plan

Status: **awaiting owner approval**. Nothing in this plan has been applied to Sanity, GitHub, Cloudflare, or DNS.

## Current state

- Sanity webhook delivery is active but rejected by GitHub with HTTP 422 because the request body is a Sanity document rather than a GitHub `repository_dispatch` envelope.
- The last successful GitHub deployment predates the latest Sanity publish.
- Cloudflare serves the successful Worker deployment at `little-wise-kids.raspy-snowflake-9303.workers.dev`.
- `littlewisekids.co.uk` and `www.littlewisekids.co.uk` still resolve to Hostinger, not the Cloudflare Worker.
- Keep the current webhook and DNS records available until the replacement path passes an end-to-end test.

## Approval A: activate signed deployment gateway

Resources changed:

1. Cloudflare Worker `little-wise-kids-sanity-gateway` and Durable Object binding `DEPLOY_GATE`.
2. Worker secrets `SANITY_WEBHOOK_SECRET` and `GITHUB_DISPATCH_TOKEN`.
3. GitHub production environment secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` if they are not already scoped there.
4. Sanity production webhook destination, signing secret, filter, and projection.
5. GitHub default-branch workflow from `.github/workflows/deploy.yml`.

Expected impact: publishing a permitted production document creates one sanitized GitHub dispatch and one serialized production deployment. Duplicate and burst deliveries are suppressed. No public-site downtime is expected.

Change order:

1. Merge the local hardening changes.
2. Create a fine-grained GitHub token limited to this repository and the minimum permission needed to create repository dispatches. Store it only as a Worker secret.
3. Generate a high-entropy Sanity webhook secret. Store the same value as a Worker secret and as the Sanity webhook signing secret.
4. Deploy the gateway using `wrangler.sanity-gateway.jsonc`.
5. Confirm an unsigned probe returns 401 and an irrelevant route returns 404.
6. Update the Sanity webhook destination to the gateway `/hooks/sanity` endpoint.
7. Configure the documented production/type filter and minimal `_id`/`_type` projection.
8. Publish one harmless test edit and verify Sanity 2xx, gateway acceptance, one GitHub run, one Cloudflare deployment, and fresh content.
9. Disable the old direct-to-GitHub webhook only after the replacement succeeds.

Rollback triggers:

- valid publications receive non-2xx responses for more than two consecutive attempts;
- unexpected document types trigger deployments;
- more than one deployment occurs for one event;
- GitHub or Cloudflare deployment health checks fail.

Rollback:

1. Restore the prior Sanity webhook destination and disable the new destination.
2. Revert the workflow commit if its dispatch guard blocks expected manual/push deployments.
3. Roll back the gateway Worker deployment through Cloudflare deployment history.
4. Revoke the gateway GitHub token and rotate the Sanity signing secret if disclosure is suspected.
5. Keep the last known-good site Worker deployment active throughout rollback.

## Approval B: move the public domain to Cloudflare

This is separate because it changes the user-visible serving path and may affect Hostinger-hosted services.

Preconditions:

- inventory every current DNS record, especially MX, TXT, SPF, DKIM, DMARC, verification records, and subdomains;
- decide whether to move authoritative nameservers or only change web records;
- confirm the Cloudflare Worker custom-domain route and certificate are ready;
- reduce relevant DNS TTLs before the change where the current provider permits it.

Expected impact: the apex and `www` web traffic move from Hostinger to the Cloudflare Worker. DNS propagation can produce a temporary mixed serving path; email records must remain unchanged. Do not start this change during a publishing incident.

Rollback: restore the captured apex and `www` records or prior nameservers, remove the Worker custom-domain route, and verify Hostinger content and TLS before closing the rollback.

## Required approval

Approval A and Approval B are independent. Authorize each explicitly. Approval of A does not authorize DNS changes, secret creation, repository settings changes, or domain migration beyond the listed gateway activation steps.
