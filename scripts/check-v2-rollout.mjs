import process from 'node:process'

const args = process.argv.slice(2)

const readArg = (name, fallback) => {
  const key = `--${name}`
  const eqMatch = args.find((arg) => arg.startsWith(`${key}=`))

  if (eqMatch) {
    return eqMatch.split('=').slice(1).join('=')
  }

  const index = args.findIndex((arg) => arg === key)
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith('--')) {
    return args[index + 1]
  }

  return fallback
}

const mode = readArg('mode', 'coexistence')
const baseUrl = (readArg('base-url', process.env.ROLL_OUT_BASE_URL ?? 'http://127.0.0.1:3000') || '').replace(/\/$/, '')

if (!['coexistence', 'cutover'].includes(mode)) {
  throw new Error(`Invalid mode "${mode}". Use --mode=coexistence or --mode=cutover`)
}

const checks = []

const readText = async (path) => {
  const response = await fetch(`${baseUrl}${path}`, {
    redirect: 'follow',
    headers: {
      'user-agent': 'portfolio-rollout-checker/1.0',
    },
  })

  const text = await response.text()

  return {
    status: response.status,
    text,
  }
}

const expectCondition = (name, condition, details) => {
  checks.push({ name, pass: Boolean(condition), details })
}

const run = async () => {
  const enRoot = await readText('/en')
  const enV2 = await readText('/en/v2')
  const enLegacy = await readText('/en/legacy')
  const robots = await readText('/robots.txt')
  const sitemap = await readText('/sitemap.xml')

  expectCondition('EN v2 route renders v2 marker', enV2.status < 400 && enV2.text.includes('class="v2-route"'), {
    status: enV2.status,
  })

  if (mode === 'coexistence') {
    expectCondition('EN root remains v1', enRoot.status < 400 && !enRoot.text.includes('class="v2-route"'), {
      status: enRoot.status,
    })
    expectCondition('Legacy route blocked pre-cutover', enLegacy.status >= 400, {
      status: enLegacy.status,
    })
    expectCondition('V2 has noindex during coexistence', /<meta[^>]+name="robots"[^>]+noindex/i.test(enV2.text), {
      status: enV2.status,
    })
    expectCondition('robots disallow v2 paths', robots.text.includes('Disallow: /en/v2') && robots.text.includes('Disallow: /es/v2'), {
      status: robots.status,
    })
    expectCondition('sitemap excludes v2 paths', !sitemap.text.includes('/en/v2') && !sitemap.text.includes('/es/v2'), {
      status: sitemap.status,
    })
  }

  if (mode === 'cutover') {
    expectCondition('EN root serves v2 after cutover', enRoot.status < 400 && enRoot.text.includes('class="v2-route"'), {
      status: enRoot.status,
    })
    expectCondition('Legacy route serves v1 after cutover', enLegacy.status < 400 && !enLegacy.text.includes('class="v2-route"'), {
      status: enLegacy.status,
    })
    expectCondition('robots no longer disallow v2 paths', !robots.text.includes('Disallow: /en/v2') && !robots.text.includes('Disallow: /es/v2'), {
      status: robots.status,
    })
    expectCondition('sitemap includes v2 paths', sitemap.text.includes('/en/v2') && sitemap.text.includes('/es/v2'), {
      status: sitemap.status,
    })
  }

  const failed = checks.filter((item) => !item.pass)

  for (const check of checks) {
    const icon = check.pass ? '✅' : '❌'
    console.log(`${icon} ${check.name} (${JSON.stringify(check.details)})`)
  }

  if (failed.length > 0) {
    process.exitCode = 1
    throw new Error(`Rollout checks failed (${failed.length}/${checks.length}) for mode=${mode} baseUrl=${baseUrl}`)
  }

  console.log(`Rollout checks passed (${checks.length}/${checks.length}) for mode=${mode} baseUrl=${baseUrl}`)
}

run().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
