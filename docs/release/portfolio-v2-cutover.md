# Portfolio V2 Cutover Checklist

## Scope
Cutover strategy for `portfolio-v2-rebuild-total` with coexistence, go/no-go decision, rollback (<10 minutes), and stabilization monitoring.

## 1) Coexistence Release (Root remains v1)

### In-repo automation (must pass before external deploy validation)

- [ ] `pnpm test`
- [ ] `pnpm perf:gate`
- [ ] `pnpm e2e:v2`
- [ ] `pnpm rollout:check:coexistence -- --base-url=<deployment-url>`

### External deployment execution (manual)

- [ ] Set env flags:
  - `NEXT_PUBLIC_ROOT_VERSION=v1`
  - `NEXT_PUBLIC_EXPOSE_V2_PATH=true`
  - `NEXT_PUBLIC_ALLOW_LEGACY_PATH=false`
- [ ] Deploy and verify routes:
  - `/{locale}` serves v1
  - `/{locale}/v2` serves v2
- [ ] Verify SEO locks:
  - v2 returns `noindex`
  - sitemap excludes `/v2`
  - robots disallow `/en/v2` and `/es/v2`
- [ ] Run manual smoke by locale (EN/ES): nav anchors, CTA links, locale switch keeps `/v2`

## 2) Go / No-Go Criteria

### Functional
- [ ] Route coexistence works for `/{locale}` + `/{locale}/v2`
- [ ] No missing translations in v2 content (`en`, `es`)
- [ ] Legacy path behavior verified (`/{locale}/legacy` blocked pre-cutover)

### Quality
- [ ] Lint passes
- [ ] No critical accessibility issues in keyboard/focus/reduced-motion checks
- [ ] No blocker regression in core sections (hero, projects, contact)

### Performance (target budgets)
- [ ] LCP <= 2.5s
- [ ] CLS < 0.1
- [ ] INP <= 200ms

If any item fails → **NO-GO**.

## 3) Cutover Execution

### In-repo automation against deployed candidate

- [ ] `pnpm rollout:check:cutover -- --base-url=<deployment-url>`

### External deployment execution (manual)

- [ ] Set env flags:
  - `NEXT_PUBLIC_ROOT_VERSION=v2`
  - `NEXT_PUBLIC_EXPOSE_V2_PATH=true`
  - `NEXT_PUBLIC_ALLOW_LEGACY_PATH=true`
- [ ] Deploy and verify:
  - `/{locale}` now serves v2
  - `/{locale}/legacy` serves v1
  - canonical/hreflang generated for active version

> Note: Tasks 5.2 and 5.3 require an actual deployed environment and env-flag flip. This repository now provides automated evidence scripts, but final execution is operational and cannot be completed purely in local code changes.

## 4) Rollback Runbook (<10 minutes)

### Trigger conditions
- Sustained 5xx increase
- Significant conversion drop by locale
- Critical UI regression on v2 root

### Steps
1. Set env flags back:
   - `NEXT_PUBLIC_ROOT_VERSION=v1`
   - `NEXT_PUBLIC_ALLOW_LEGACY_PATH=false`
2. Redeploy previous stable release.
3. Verify:
   - `/{locale}` serves v1
   - `/{locale}/v2` still available (if `NEXT_PUBLIC_EXPOSE_V2_PATH=true`)
4. Open incident log with timestamps and impacted locales.

Target total rollback time: **<= 10 minutes**.

## 5) Stabilization Monitoring (Post-cutover)

Track at least daily during stabilization window:

- Core Web Vitals by locale/version
- JS errors by route segment (`root`, `/v2`, `/legacy`)
- 404 rates for locale routes
- Contact conversion split by locale/version

Retire legacy only after stabilization window closes with no critical regressions.
