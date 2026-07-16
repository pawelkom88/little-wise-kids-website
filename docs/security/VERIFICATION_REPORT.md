# Security Hardening Verification Report

Date: 2026-07-16

Verdict: **local implementation verified; production activation not verified and not authorized**.

## Verified locally

| Control | Evidence | Result |
|---|---|---|
| Signed raw-body webhook validation | valid, missing, invalid, stale, and modified-body tests | Pass |
| Boundary validation | method, content type, JSON, 64 KiB, project, dataset, type, operation, draft/version tests | Pass |
| Payload minimization | normalized GitHub dispatch envelope test | Pass |
| Replay control | duplicate Durable Object event test | Pass |
| Burst control | ten-events-per-ten-minutes test | Pass |
| Failure recovery | upstream failure removes processing record for retry | Pass |
| CMS URL allowlist | absolute HTTPS helper test and render-boundary usage | Pass |
| Supply-chain workflow controls | least privilege, immutable action SHAs, concurrency, timeout, environment | Source reviewed |
| Gateway deployment bundle | Wrangler dry-run | Pass |
| Production build | Astro build with production Sanity dataset | Pass; 12 pages, including `/blog/test-blog` |

Commands:

```text
npm run test:security
npm run check:gateway
SANITY_PROJECT_ID=<project> SANITY_DATASET=production npm run build
```

The repository architecture check still reports a pre-existing `as any` in `src/components/content/PortableContent.astro`; this change did not introduce it.

## External evidence

- Latest inspected Sanity publish delivery: HTTP 422; GitHub rejected the full document body because `event_type` was absent.
- Latest successful GitHub repository-dispatch run predates that publish.
- Latest Cloudflare Worker deployment also predates that publish.
- The Worker URL serves the generated blog route but had older content at inspection time.
- The custom domain resolves to Hostinger and returned HTTP 403 for the blog route; it is not evidence of the Cloudflare deployment.
- Sanity production had one published blog document, zero drafts, exact localhost/Worker CORS origins, one administrator, and no API tokens at inspection time.
- Repository, history, archive, and environment-name review found no target deployment credential material. Secret values were never recorded.
- Production dependency audit reported 12 moderate transitive advisories in the Sanity/build tree. The automated force fix requires a breaking Sanity downgrade, so no unsafe dependency rewrite was applied.

## Not yet verified

- live gateway deployment and secret bindings;
- Sanity signature configuration, filter, projection, and successful 2xx delivery;
- GitHub repository environment protections, branch protections/rulesets, secret scopes, and token permissions;
- Cloudflare token scope and account-level controls;
- successful end-to-end publish through the new gateway;
- public custom-domain routing and TLS to the Cloudflare Worker;
- post-change secret rotation and revocation evidence.

These checks require explicit approval and authenticated live changes. Until they pass, the deployment path is not production-ready.
