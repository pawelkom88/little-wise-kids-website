# Sanity to Cloudflare Trigger Diagnosis

## Verdict

**B. Webhook emitted but receiver rejected it**

The active Sanity webhook targets GitHub repository dispatch. It is not a direct Cloudflare hook and not a verifying Worker gateway.

## Evidence

| Check | Evidence | Result |
| --- | --- | --- |
| Correct content | Production project/dataset contains one published `blogPost`, slug `test-blog`, not future-dated | Pass |
| Frontend filter | `_type`, slug, published date, and `publishedAt <= now()` match | Pass |
| Query projection | Edited title/excerpt are selected | Pass |
| Sanity delivery | One message/attempt at `2026-07-16T08:29:12Z` | Pass |
| Receiver response | GitHub returned `422` in 273 ms | Fail |
| GitHub response summary | Document fields were not permitted and required `event_type` was absent | Root-cause proof |
| GitHub run | No run started after the failed attempt | Fail |
| Cloudflare deploy | No deployment started after the failed attempt | Fail |
| Production build | Local build with production selectors generated `/blog/test-blog` and contained the current title | Pass |
| Worker URL | Existing route returns `200` with older title | Stale deployment |
| Custom domain | DNS/headers show Hostinger, not the observed Worker | Separate serving-path mismatch |

## Webhook Configuration Observed

- Name: `Sanity Publish → GitHub Deploy`
- Dataset: `production`
- Document event: enabled; drafts and versions disabled
- Filter: none
- Projection: none
- Destination: GitHub API; redacted fingerprint `16ee7278724b`
- Webhook fingerprint: `1a578e95bddf`
- Secret: not configured
- Custom header names: `Accept`, `Content-Type`, `Authorization`; values not inspected or recorded
- Latest result: one failed message, one failed attempt, HTTP `422`

## Root Cause

With no projection, Sanity posts the complete published document. GitHub's repository-dispatch endpoint requires a JSON envelope containing `event_type` and permits only `event_type` plus optional `client_payload`. GitHub rejects the current body before any workflow exists.

The failed trigger is upstream of Astro/Cloudflare. A production-data build proves the current query and route can fetch the edit when a build actually runs.

## Exact Fix

Route Sanity through the repository's signed gateway:

1. deploy `little-wise-kids-sanity-gateway`;
2. store `SANITY_WEBHOOK_SECRET` and `GITHUB_DISPATCH_TOKEN` as Worker secrets;
3. configure a production-only Sanity webhook with a narrow filter, minimal `_id`/`_type` projection, and shared signing secret;
4. point it to `/hooks/sanity` on the gateway;
5. remove the GitHub Authorization header from Sanity;
6. verify gateway dispatch and one Actions/Worker deployment;
7. disable the old webhook only after verification.

Affected resources: Sanity production webhook, new Cloudflare gateway Worker/Durable Object, GitHub fine-grained dispatch credential, production Actions workflow.

Live approval required: **Yes**.

## Verification

After approval, use one harmless marker and prove:

1. one signed Sanity attempt;
2. one accepted gateway event;
3. one GitHub workflow run;
4. one Cloudflare Worker deployment;
5. marker present in Worker page source;
6. marker removal creates one second deployment;
7. marker absent;
8. replay creates no second deployment.

No marker was introduced during read-only diagnosis because the existing publish supplied a timestamp-correlated failing attempt and public mutation was unnecessary. The required end-to-end proof is therefore still pending; the content path must not be called healthy.

## Rollback

If the gateway migration fails, restore the previous webhook configuration without deleting content, keep the old webhook disabled only if explicitly approved, and trigger a manual protected `main` deployment. Gateway rollback does not require reverting Sanity documents.
