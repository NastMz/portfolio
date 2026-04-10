import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const thresholds = {
  lcp: 2500,
  cls: 0.1,
  inp: 200,
}

const requiredRoutes = ['/en', '/en/projects', '/en/contact']
const metricsPath = process.env.V2_PERF_METRICS_PATH
  ? resolve(process.cwd(), process.env.V2_PERF_METRICS_PATH)
  : resolve(process.cwd(), 'reports/performance/v2-route-metrics.json')

let report

try {
  report = JSON.parse(readFileSync(metricsPath, 'utf8'))
} catch (error) {
  throw new Error(`Performance gate failed: cannot read metrics file at ${metricsPath}`)
}

const failures = []
const routeKeys = Object.keys(report?.routes ?? {}).sort()
const expectedRouteKeys = [...requiredRoutes].sort()

if (JSON.stringify(routeKeys) !== JSON.stringify(expectedRouteKeys)) {
  failures.push(`route alignment mismatch: expected ${expectedRouteKeys.join(', ')} but received ${routeKeys.join(', ') || 'none'}`)
}

for (const route of requiredRoutes) {
  const metric = report?.routes?.[route]

  if (!metric) {
    failures.push(`${route}: missing metrics entry`)
    continue
  }

  if (typeof metric.lcp !== 'number' || metric.lcp > thresholds.lcp) {
    failures.push(`${route}: LCP ${metric.lcp ?? 'N/A'}ms exceeds ${thresholds.lcp}ms`)
  }

  if (typeof metric.cls !== 'number' || metric.cls >= thresholds.cls) {
    failures.push(`${route}: CLS ${metric.cls ?? 'N/A'} must be < ${thresholds.cls}`)
  }

  if (typeof metric.inp !== 'number' || metric.inp > thresholds.inp) {
    failures.push(`${route}: INP ${metric.inp ?? 'N/A'}ms exceeds ${thresholds.inp}ms`)
  }
}

if (failures.length > 0) {
  throw new Error(`Performance gate failed:\n- ${failures.join('\n- ')}`)
}

console.log('Performance gate passed for canonical portfolio routes')
