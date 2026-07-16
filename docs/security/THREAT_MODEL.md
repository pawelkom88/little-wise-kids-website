# Deployment Threat Model

## Assets

Production content integrity/availability; GitHub workflow/repository integrity; Cloudflare deployment credential and Worker control; Sanity project, unpublished content, webhooks and editor accounts; contact-form data handled by Web3Forms.

## Actors And Main Paths

| Threat | Path | Impact | Current control / weakness | Remediation | Residual risk |
| --- | --- | --- | --- | --- | --- |
| Anonymous attacker | Guess/leak hook or hit gateway | Build flood/cost/availability | Current GitHub API still requires Authorization, but secret is stored in Sanity; target gateway not live | Signature, raw body, body cap, freshness, Durable Object rate/dedupe | Edge request cost before valid signature; add Cloudflare rate policy if needed |
| Leaked GitHub dispatch credential | Call repository dispatch | Repeated deploy or repository modification | Fine-grained scope/current lifecycle unknown | New single-repo expiring token in Worker secret; rotate | Contents-write remains broad by GitHub API design |
| Compromised Sanity editor | Publish deceptive/hostile content or flood edits | Defacement, phishing, repeated builds | Current only member is Administrator; runtime escaping; URL sinks previously relied on Studio validation | Least-privilege editor role; HTTPS runtime allowlist; gateway type/rate gates | Authorized editors still control public copy |
| Compromised GitHub collaborator | Merge workflow/code change | Persistent production compromise | Live branch/ruleset/bypass not verified | Ruleset, PR approval, CODEOWNERS, protected environment | Repository owners retain emergency bypass |
| Fork pull request | Untrusted code seeks secrets | Credential theft | Deploy workflow has no PR trigger | Keep privileged deploy separate; do not add `pull_request_target` checkout | Other future workflows require review |
| Compromised Action | Mutable tag selects attacker code | Build tamper, Cloudflare token theft | Original actions used major tags | Full-SHA pins + Dependabot review | Pinned commit can itself be malicious; review updates |
| Compromised npm dependency | Lifecycle/build code executes | Runner compromise/build tamper | Lockfile + `npm ci`; moderate advisories remain | Dependabot, provenance review, minimal job token/secret exposure | npm install/build must execute trusted dependency code |
| Replayed valid webhook | Repeat same publish | Duplicate deploy/cost/race | Current path lacks replay control | Signature freshness + hashed idempotency key + durable SQLite state | Events after TTL can trigger again if replay is freshly signed |
| Webhook flood | Many valid publishes | Cost/availability | No current limit | 10 accepted events/10 min + serialized production deploy | Legitimate bursts may receive `429` and retry |
| Malicious CMS URL | Unsafe scheme in stored field | Browser script/phishing | Studio URL validation only in original renderer | Runtime HTTPS allowlist + schema rule | Compromised code/admin can still alter renderer |
| Preview attacker | Preview secret/data reaches prod | Cross-environment escalation | No explicit preview path found | Separate future preview project/env/secrets | Not verifiable until preview exists |
| Serving-path confusion | Deploy Worker while domain serves Hostinger | Stale/wrong production content | Observed mismatch | Owner-approved domain/target decision and cutover | DNS propagation/rollback window |

## Security Invariants

- Only reviewed `main` code and verified production Sanity events can start production deployment.
- One source event produces at most one accepted deployment within the durable retention window.
- Drafts, versions, development data, irrelevant types, fork code, and malformed/unsigned requests cannot deploy.
- Secrets remain server-side, narrowly scoped, independently rotatable, and absent from logs/source/browser bundles unless the provider explicitly defines a browser key.
- Build-time reads use the current production dataset; Worker output and custom-domain serving target must match.
- Rollback never deletes Sanity content.
