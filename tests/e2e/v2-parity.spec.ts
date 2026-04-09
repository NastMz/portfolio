import { expect, test, type Page } from '@playwright/test'

async function waitForExperienceReady(page: Page) {
  await expect(page.locator('.v2-route')).toBeVisible()
  await expect(page.locator('.v2-boot-overlay')).toBeHidden({ timeout: 15_000 })
}

const parseRgb = (value: string): [number, number, number] => {
  const channels = value.match(/\d+(?:\.\d+)?/g)

  if (!channels || channels.length < 3) {
    throw new Error(`Unable to parse color value: ${value}`)
  }

  return [Number(channels[0]), Number(channels[1]), Number(channels[2])]
}

const relativeLuminance = ([r, g, b]: [number, number, number]): number => {
  const normalize = (channel: number) => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }

  return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b)
}

const contrastRatio = (foreground: [number, number, number], background: [number, number, number]): number => {
  const l1 = relativeLuminance(foreground)
  const l2 = relativeLuminance(background)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

const localeCases = [
  {
    locale: 'en',
    path: '/en',
    labels: {
      archive: 'ARCHIVE',
      logs: 'LOGS',
      stack: 'STACK',
      overview: 'Overview',
      systems: 'Systems',
      decisions: 'Decisions',
      contact: 'Contact',
    },
  },
  {
    locale: 'es',
    path: '/es',
    labels: {
      archive: 'ARCHIVE',
      logs: 'LOGS',
      stack: 'STACK',
      overview: 'Resumen',
      systems: 'Sistemas',
      decisions: 'Decisiones',
      contact: 'Contacto',
    },
  },
] as const

test.describe('v2 i18n interaction and accessibility parity', () => {
  for (const localeCase of localeCases) {
    test(`${localeCase.locale}: canonical homepage renders the v2 experience and locale switch`, async ({ page }) => {
      await page.goto(localeCase.path)
      await waitForExperienceReady(page)

      const localeSwitch = page.getByLabel('Switch language')

      await expect(localeSwitch).toBeVisible()
      await expect(localeSwitch).toHaveAttribute('href', localeCase.locale === 'en' ? '/es' : '/en')
      await expect(page.locator('main#main-content')).toBeVisible()
      await expect(page.locator('#artifacts')).toBeVisible()
      await expect(page.locator('#decision-log')).toBeVisible()
      await expect(page.locator('#stack-evaluation')).toBeVisible()
      await expect(page.locator('#projects')).toBeVisible()
      await expect(page.locator('#contact')).toBeVisible()
    })

    test(`${localeCase.locale}: language switch receives a visible focus ring`, async ({ page }) => {
      await page.goto(localeCase.path)
      await waitForExperienceReady(page)

      const localeSwitch = page.getByLabel('Switch language')
      await localeSwitch.focus()
      await expect(localeSwitch).toBeFocused()

      const focusStyle = await localeSwitch.evaluate((node) => {
        return window.getComputedStyle(node).boxShadow
      })

      expect(focusStyle).not.toBe('none')
    })

    test(`${localeCase.locale}: /projects and /contact preserve full faithful composition`, async ({ page }) => {
      const projectsPath = `${localeCase.path}/projects`
      const contactPath = `${localeCase.path}/contact`

      await page.goto(projectsPath)
      await waitForExperienceReady(page)
      await expect(page.locator('#projects')).toBeVisible()
      await expect(page.locator('#case-study')).toBeVisible()
      await expect(page.locator('#contact')).toBeVisible()

      await page.goto(contactPath)
      await waitForExperienceReady(page)
      await expect(page.locator('#contact')).toBeVisible()
      await expect(page.locator('#notes')).toBeVisible()
      await expect(page.locator('#projects')).toBeVisible()
    })

    test(`${localeCase.locale}: mobile uses bottom navigation with canonical anchors`, async ({ page }) => {
      await page.setViewportSize({ width: 393, height: 852 })
      await page.goto(localeCase.path)
      await waitForExperienceReady(page)

      const mobileNav = page.getByRole('navigation', { name: 'V2 mobile navigation' })

      await expect(mobileNav).toBeVisible()
      await expect(mobileNav.locator('a')).toHaveCount(6)

      const hrefs = await mobileNav.locator('a').evaluateAll((anchors) => {
        return anchors.map((anchor) => anchor.getAttribute('href'))
      })

      expect(hrefs).toEqual(['#overview', '#systems', '#artifacts', '#decision-log', '#stack', '#contact'])
    })

    test(`${localeCase.locale}: v2 tokens drive key surfaces and text contrast is compliant`, async ({ page }) => {
      await page.goto(localeCase.path)
      await waitForExperienceReady(page)

      const tokenValues = await page.evaluate(() => {
        const rootStyle = window.getComputedStyle(document.documentElement)

        return {
          bg: rootStyle.getPropertyValue('--v2-color-bg').trim(),
        }
      })

      const routeBackground = await page.locator('.v2-route').evaluate((node) => {
        return window.getComputedStyle(node).backgroundColor
      })

      const caseStudyClasses = await page.locator('#case-study').evaluate((node) => {
        return (node.parentElement as HTMLElement).className
      })

      const resolvedTokenColors = await page.evaluate((tokens) => {
        const probe = document.createElement('div')
        probe.style.display = 'none'
        document.body.appendChild(probe)

        const resolveColor = (value: string) => {
          probe.style.color = value
          return window.getComputedStyle(probe).color
        }

        const colors = {
          bg: resolveColor(tokens.bg),
        }

        probe.remove()
        return colors
      }, tokenValues)

      expect(routeBackground).toBe(resolvedTokenColors.bg)
      expect(caseStudyClasses.length).toBeGreaterThan(0)

      const routeText = await page.locator('.v2-route h1').first().evaluate((node) => window.getComputedStyle(node).color)
      const mutedText = await page.getByLabel('Switch language').evaluate((node) => {
        return window.getComputedStyle(node).color
      })
      const routeBgRgb = parseRgb(routeBackground)

      expect(contrastRatio(parseRgb(routeText), routeBgRgb)).toBeGreaterThanOrEqual(4.5)
      expect(contrastRatio(parseRgb(mutedText), routeBgRgb)).toBeGreaterThanOrEqual(4.5)
    })
  }

  test('legacy versioned paths permanently land on canonical routes', async ({ page }) => {
    await page.goto('/en/v2')
    await expect(page).toHaveURL(/\/en$/)
    await waitForExperienceReady(page)

    await page.goto('/en/v2/projects')
    await expect(page).toHaveURL(/\/en\/projects$/)
    await waitForExperienceReady(page)

    await page.goto('/es/v2/contact')
    await expect(page).toHaveURL(/\/es\/contact$/)
    await waitForExperienceReady(page)

    await page.goto('/es/legacy')
    await expect(page).toHaveURL(/\/es$/)
    await waitForExperienceReady(page)
  })

  test('reduced-motion token collapses duration to 0ms', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()

    await page.goto('/en')
    await waitForExperienceReady(page)

    const motionDuration = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).getPropertyValue('--v2-motion-duration').trim()
    })

    expect(['0ms', '0s']).toContain(motionDuration)

    await context.close()
  })
})
