# ADR-001: Secure Content Deployment

Status: **Selected locally; live activation requires owner approval**

## Context

Current production content publication uses Sanity directly against GitHub repository dispatch. The webhook has no filter/projection/signature and GitHub rejects its full-document body. The repository deploys a Cloudflare **Worker**, not a Pages project, so a Pages Deploy Hook is not currently available as the final hop.

## Options

### A. Direct Sanity → Cloudflare Pages Deploy Hook

Smallest for Pages, but the hook URL is the sole bearer credential. Cloudflare cannot verify Sanity signatures at the hook. Replay/flood controls are weak. Not compatible with the observed Worker target without a larger Pages migration.

### B. Signed gateway → Cloudflare Pages Deploy Hook

Strong origin/replay controls and hides the hook as a Worker secret. Preferred generic design when Pages is the real target. Rejected for now because no Pages project exists and silently changing hosting would add downtime risk.

### C. Signed gateway → sanitized GitHub dispatch → existing Worker deployment

Adds one Worker gateway and Durable Object, verifies Sanity before creating a minimal dispatch, and preserves the known build/deploy workflow. GitHub dispatch still needs a fine-grained credential with Contents write, but that credential moves from Sanity into a narrow gateway secret and never receives raw CMS payload keys.

## Decision

Choose **Option C** for the current Worker architecture.

The gateway:

- accepts only `POST` and JSON up to 64 KiB;
- verifies the raw body with official `@sanity/webhook` before parsing;
- rejects signatures older/newer than ten minutes;
- checks exact project, production dataset, allowed types, create/update/delete operation, and draft/version IDs;
- hashes Sanity's idempotency key and coordinates one global production gate;
- uses Durable Object SQLite for 24-hour dedupe and 10 events/10-minute rate limit;
- sends only a normalized GitHub dispatch envelope;
- stores `SANITY_WEBHOOK_SECRET` and `GITHUB_DISPATCH_TOKEN` as Worker secrets;
- returns minimal errors and does not log payloads/signatures/secrets;
- serializes downstream deploys through GitHub Actions concurrency.

## Sanity Target Configuration

- Dataset: `production`
- Trigger on: create, update, delete
- Drafts/versions: off
- Filter:

```groq
coalesce(after()._type, before()._type) in [
  "businessDetails", "homePage", "aboutPage", "multilingualPage",
  "hoursNutritionPage", "parentsPage", "galleryPage", "contactPage",
  "thankYouPage", "blogPage", "blogPost", "galleryPhoto", "policyDocument"
]
```

- Projection:

```groq
{
  "_id": coalesce(after()._id, before()._id),
  "_type": coalesce(after()._type, before()._type)
}
```

## Residual Risk

- Gateway availability becomes part of publishing availability.
- GitHub dispatch credential has broader authority than a Cloudflare Pages bearer hook would ideally need.
- A valid editor can still generate legitimate events; rate limits bound, not eliminate, cost.
- 24-hour dedupe is not permanent replay prevention.
- Public custom-domain routing remains a separate owner decision.

## Migration

Deploy gateway and secrets first; add replacement Sanity webhook disabled/test-controlled; validate signature and one dispatch; switch production webhook; prove marker publish/remove; disable old direct webhook; revoke old credential. Do not delete the old webhook until evidence is preserved and rollback window ends.

## Rollback

Disable replacement webhook, roll back/remove gateway route, restore prior webhook only if the owner accepts its broken/insecure limitations, and deploy manually from protected `main`. No Sanity content is deleted.
