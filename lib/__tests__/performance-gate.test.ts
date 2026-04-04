import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const projectRoot = resolve(__dirname, '../..')
const scriptPath = resolve(projectRoot, 'scripts/check-v2-performance-gate.mjs')

describe('v2 performance gate script', () => {
  it('blocks when any route breaches budget thresholds', () => {
    expect(() => {
      execFileSync('node', [scriptPath], {
        cwd: projectRoot,
        env: {
          ...process.env,
          V2_PERF_METRICS_PATH: 'reports/performance/v2-route-metrics-breach.json',
        },
        encoding: 'utf8',
      })
    }).toThrowError(/Performance gate failed/i)
  })
})
