# Secret Inventory

Values are intentionally omitted.

| Name/type | Purpose | Owner | Storage/consumer | Intended scope | Observed state | Rotation state |
| --- | --- | --- | --- | --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | Deploy site Worker | Cloudflare automation owner | GitHub secret → Wrangler action | One account and required Worker deploy resources only | Exists by workflow reference; exact scope not verifiable | Verify then rotate if broad/personal |
| `WEB3FORMS_ACCESS_KEY` | Accept browser contact-form submissions | Website/form owner | GitHub secret and local ignored `.env`; compiled into form HTML | One form/domain with provider abuse controls | Browser-visible by design; not a server authorization secret | Rotate through provider if abused/exposed outside intended form |
| Current GitHub dispatch credential | Authenticate Sanity call to GitHub | GitHub repo owner | Sanity webhook Authorization header | One repository; Contents write is required by repository-dispatch API | Value never read; current webhook is broken | Replace during gateway migration, then revoke old credential |
| `SANITY_WEBHOOK_SECRET` | Sign Sanity webhook raw body | Sanity/Cloudflare owner | Sanity secret + Cloudflare Worker secret | One production webhook/gateway | Not live; code expects it | Create at migration; rotate with overlap verification |
| `GITHUB_DISPATCH_TOKEN` | Gateway sends sanitized repository dispatch | GitHub repo owner | Cloudflare Worker secret | Single repository, shortest expiry, minimal required permission | Not live | Create at migration; rotate before expiry |
| Local Wrangler OAuth session | Operator CLI access | Cloudflare account owner | Local Wrangler credential store | Ideally time-limited operator work only | Authenticated with broad user permissions; not proven to be CI credential | Revoke/logout after approved work; use dedicated CI token separately |

## Exposure Audit

- Current tracked tree: no target token/private-key signature found.
- Local ignored files: `.env` exists with three expected key names; file is ignored and untracked.
- Git history: no target token/private-key signature found. Historical Playwright log filenames and a vendored dependency test key existed; neither matched target credentials.
- `src.zip`: no target token/private-key signature found.
- Build output: form access key is intentionally browser-visible; no privileged Sanity/Cloudflare/GitHub token should be bundled.
- Sanity webhook destination/header values: not saved; fingerprints/names only.
