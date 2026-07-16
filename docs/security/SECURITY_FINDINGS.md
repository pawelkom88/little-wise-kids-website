# Security Findings

## LWK-SEC-001

- **Title:** Mutable GitHub Actions execute in the production deployment job
- **Severity:** Medium / P2
- **Component:** `.github/workflows/deploy.yml`
- **Evidence:** Audited revision used `actions/checkout@v4`, `actions/setup-node@v4`, and `cloudflare/wrangler-action@v3`; the Wrangler action directly received `CLOUDFLARE_API_TOKEN`.
- **Attack scenario:** An attacker compromises an Action publisher/release process or moves a major-version tag. The next production run executes attacker code; earlier actions can persist runner state and the Wrangler action can read its token input.
- **Impact:** Production artifact tampering, deployment-token theft, Worker modification, or deployment disruption within token scope.
- **Likelihood:** Medium under the threat model; upstream compromise is required.
- **Current control:** Established vendors and GitHub masking; neither makes a tag immutable.
- **Remediation:** Pin all Actions to verified 40-character SHAs; use read-only workflow permissions, protected environment, CODEOWNERS, and narrow Cloudflare token.
- **Status:** Fixed locally; live protections/token scope await approval/verification.
- **Verification:** Local diff contains the three verified SHAs; workflow production build passed.
- **Residual risk:** A pinned commit may itself be compromised; updates require review. Cloudflare token scope remains not verifiable.

## LWK-OPS-001

- **Title:** Sanity publication webhook is rejected by GitHub
- **Severity:** High operational impact; not a vulnerability
- **Component:** Sanity production webhook → GitHub repository dispatch
- **Evidence:** One publish generated one attempt; GitHub returned `422`, listing full document keys as forbidden and reporting missing `event_type`.
- **Attack scenario:** Normal editor publication cannot update the deployed site; repeated attempts remain failed.
- **Impact:** Published nursery information is not deployed, creating integrity/availability and operational confusion.
- **Likelihood:** Certain on the observed configuration.
- **Current control:** GitHub schema validation safely rejects malformed dispatch.
- **Remediation:** Migrate to the signed gateway and sanitized dispatch envelope.
- **Status:** Live fix awaiting approval.
- **Verification:** Required marker publish/remove test and exact one-deploy evidence.
- **Residual risk:** Even after trigger repair, custom-domain routing must match the Worker target.

## LWK-OPS-002

- **Title:** Production custom domain does not route to the observed Cloudflare Worker
- **Severity:** High operational impact; architecture mismatch
- **Component:** DNS/custom domain/Cloudflare Worker
- **Evidence:** Worker deployments and `workers.dev` page exist; `littlewisekids.co.uk` resolves to Hostinger nameservers/addresses and returns Hostinger edge headers/`403` for the Blog route.
- **Attack scenario:** GitHub/Cloudflare deployment succeeds but the public domain continues serving a different platform or stale site.
- **Impact:** Successful deployments do not prove production publication; rollback/ownership can be confused.
- **Likelihood:** Observed.
- **Current control:** Worker URL can be checked independently.
- **Remediation:** Owner chooses and approves one production target, then performs controlled domain/DNS cutover or changes the deployment target.
- **Status:** Awaiting owner decision; no DNS/domain mutation made.
- **Verification:** Compare Worker URL and custom-domain page source/headers after cutover.
- **Residual risk:** DNS propagation and Hostinger rollback dependency.

## LWK-HARD-001

- **Title:** Direct Sanity-to-GitHub credential path lacks origin, replay, and flood controls
- **Severity:** Medium
- **Component:** Sanity webhook configuration
- **Evidence:** No webhook signing secret, no filter, no projection, all published document changes, Authorization header stored at Sanity.
- **Attack scenario:** Compromised Sanity admin/webhook configuration or leaked dispatch credential can submit deploy events; valid retries/bursts are not durably deduplicated.
- **Impact:** Repeated builds, cost/availability pressure, or unauthorized dispatch within credential authority.
- **Likelihood:** Medium; credential/admin compromise required.
- **Current control:** GitHub API authentication and rate limits.
- **Remediation:** Signed gateway, production/type/event allowlist, minimal projection, signature freshness, durable idempotency/rate limit, and secret rotation.
- **Status:** Gateway implemented/tested locally; live migration awaiting approval.
- **Verification:** Invalid/missing/stale signature and replay/burst tests; one legitimate publish → one deploy.
- **Residual risk:** GitHub repository dispatch needs a fine-grained credential with Contents write.

## LWK-DEF-001

- **Title:** CMS-controlled anchor schemes relied on Studio-only validation
- **Severity:** Low / defense in depth
- **Component:** Portable Text external links and footer social links
- **Evidence:** Original runtime emitted stored href values directly. Sanity Studio validates URL schemes, but Content Lake API writes are schema-agnostic.
- **Attack scenario:** A privileged/bypassing API writer stores a script scheme and convinces a visitor to click it.
- **Impact:** Browser-origin script execution is plausible, but no authenticated first-party session or material privilege expansion was proven.
- **Likelihood:** Low; privileged write plus victim click.
- **Current control:** Studio HTTP(S) URL validation and Astro text escaping.
- **Remediation:** Runtime HTTPS allowlist and explicit schema HTTPS validation.
- **Status:** Fixed locally; focused tests pass.
- **Verification:** `npm run test:security` rejects HTTP, script, data, relative, and malformed URLs.
- **Residual risk:** Compromised repository code or administrator can still change rendering/content.

## LWK-LIVE-001

- **Title:** Sanity membership is administrator-only
- **Severity:** Medium governance risk
- **Component:** Sanity project roles
- **Evidence:** One current member, role Administrator; no editor role observed.
- **Attack scenario:** A compromised day-to-day content account can manage project-level resources, tokens, datasets, or webhooks.
- **Impact:** Expanded blast radius beyond content editing.
- **Likelihood:** Unknown; account usage not visible.
- **Current control:** Single-account simplicity.
- **Remediation:** Keep emergency owner admin; assign routine publishers a least-privilege editor role; test publishing and rollback.
- **Status:** Awaiting approval.
- **Verification:** Editor can publish allowed documents but cannot manage tokens/datasets/webhooks.
- **Residual risk:** Sanity administrators retain full project authority.

## LWK-DEP-001

- **Title:** Moderate advisories remain in Sanity/build dependency chains
- **Severity:** Medium maintenance risk; exploitability not proven
- **Component:** `package-lock.json`
- **Evidence:** `npm audit --omit=dev` reports 12 moderate advisories involving `js-yaml`, `smol-toml`, and `uuid` through Sanity/Studio/build packages.
- **Attack scenario:** A vulnerable parser/helper is reached by adversarial build/Studio input under dependency-specific preconditions.
- **Impact:** Prototype pollution, denial of service, or bounds errors depending on path.
- **Likelihood:** Low/unknown for this static deployed site; no untrusted server parser path proved.
- **Current control:** Lockfile and static deployment.
- **Remediation:** Track compatible upstream Sanity releases; do not apply `npm audit fix --force` because it proposes a breaking downgrade.
- **Status:** Open/deferred.
- **Verification:** Re-run production audit and full build after compatible upgrades.
- **Residual risk:** Build-time and Studio dependencies remain trusted code.

## Not Verifiable Live Controls

GitHub rulesets/branch protection/default workflow permissions/environment protection/secret metadata; Cloudflare CI-token scope/MFA/account roles/audit logs/domain-zone ownership; Sanity MFA/session controls. Absence of API evidence is not evidence of safety.
