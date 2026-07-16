# Security Audit Worklog

Audit date: 2026-07-16  
Repository revision audited: `806140ccff021336abfdb5d49dad3c7ae0a50cef`  
Scope: GitHub, GitHub Actions, Cloudflare Workers, Sanity, Astro, secrets, dependencies, and publishing reliability.

## Guardrails

- Read-only live inspection only.
- No secret values, complete hook URLs, signed payloads, or personal account identifiers recorded.
- No live webhook, token, role, ruleset, DNS, domain, Worker, or secret changed.
- Local repository fixes are uncommitted and undeployed.

## Evidence Log

| Area | Evidence | Result |
| --- | --- | --- |
| Git | `main`; clean audited snapshot; GitHub remote identified | Repository confirmed |
| Deploy workflow | `.github/workflows/deploy.yml` | Push to `main` and `repository_dispatch: sanity-publish` deploy through Wrangler |
| Sanity webhook | Metadata and attempt/message history | Active production webhook sent whole document to GitHub; latest publish failed `422` |
| GitHub Actions | Public run/job/log APIs | Four runs; latest successful repository dispatch built production data and deployed one Worker version |
| Cloudflare | Wrangler read-only deployment/secrets/project inspection | Worker deployment exists; no Pages project; no Worker secrets on site Worker |
| Sanity content | Read-only production query | One published Blog post; query/slug/date/project/dataset are eligible |
| Build | Production-data Astro build | Passed; generated `/blog/test-blog`; fresh edited title present in generated HTML |
| Public Worker URL | HTTP/page-source check | Blog route returns `200`, but content predates the failed publish |
| Custom domain | DNS and HTTP headers | Domain is served by Hostinger DNS/edge, not the observed Cloudflare Worker |
| Secrets | Tree, sensitive filenames, Git history patterns, `src.zip` | No target token/private-key signature found; values never printed |
| Dependencies | `npm audit --omit=dev` | 12 moderate production-tree advisories; automated fix requires a breaking Sanity downgrade |
| Repository scan | Codex Security standard scan | 166/166 worklist receipts; three reportable mutable-Action instances |

## Functional Diagnosis Timeline

1. Sanity production document updated at `2026-07-16T08:29:12Z`.
2. Sanity generated one webhook message and one attempt.
3. GitHub returned `422`: the request contained document keys but no required `event_type`.
4. No GitHub workflow run followed that publish.
5. No Cloudflare Worker deployment followed that publish.
6. A local production-data build fetched the updated document and generated the expected Blog route.
7. Therefore query, route generation, and fresh build work; the active trigger does not.

## Local Changes

- Immutable GitHub Action SHAs, read-only workflow permissions, production environment binding, dispatch payload gate, timeout, and concurrency.
- CODEOWNERS and Dependabot configuration.
- `useCdn: false` for build-time Sanity reads.
- Runtime HTTPS allowlist for CMS-controlled external/social/policy URLs, plus Studio validation.
- Signed Cloudflare gateway using `@sanity/webhook`, raw-body verification, freshness checks, project/dataset/type/event gates, durable SQLite idempotency, and rate limiting.
- Five focused security tests and a successful Wrangler dry-run.
- Security audit, rotation, incident, architecture, and approval documents.

## Limitations

- GitHub branch/ruleset, environment protection, secret metadata, Apps/webhooks/deploy keys, and default Actions policy were not exposed by available authenticated APIs.
- Cloudflare CI token permissions, account MFA, roles, audit logs, and domain-zone ownership were not fully exposed.
- Sanity account MFA/session policy is not repository-verifiable.
- No live marker publish or adversarial request was sent. End-to-end health remains unproven until approved migration and verification.
