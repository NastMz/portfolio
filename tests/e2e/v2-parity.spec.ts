import { expect, test } from '@playwright/test'

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
    path: '/en/v2',
    labels: {
      archive: 'ARCHIVE',
      logs: 'LOGS',
      stack: 'STACK',
    },
  },
  {
    locale: 'es',
    path: '/es/v2',
    labels: {
      archive: 'ARCHIVE',
      logs: 'LOGS',
      stack: 'STACK',
    },
  },
] as const

test.describe('v2 i18n interaction and accessibility parity', () => {
  for (const localeCase of localeCases) {
    test(`${localeCase.locale}: keyboard nav and focus-visible are present`, async ({ page }) => {
      await page.goto(localeCase.path)

      const topNav = page.getByRole('navigation', { name: 'V2 main navigation' })

      await expect(topNav).toBeVisible()
      await expect(topNav.getByRole('link', { name: localeCase.labels.archive, exact: true })).toBeVisible()
      await expect(topNav.getByRole('link', { name: localeCase.labels.logs, exact: true })).toBeVisible()
      await expect(topNav.getByRole('link', { name: localeCase.labels.stack, exact: true })).toBeVisible()
      await expect(page.locator('main#main-content')).toBeVisible()

      await page.keyboard.press('Tab')
      await expect(topNav.getByRole('link', { name: localeCase.labels.archive, exact: true })).toBeFocused()

      const focusStyle = await topNav.getByRole('link', { name: localeCase.labels.archive, exact: true }).evaluate((node) => {
        return window.getComputedStyle(node).boxShadow
      })

      expect(focusStyle).not.toBe('none')
    })

    test(`${localeCase.locale}: /projects and /contact preserve full faithful composition`, async ({ page }) => {
      const projectsPath = localeCase.path.replace('/v2', '/v2/projects')
      const contactPath = localeCase.path.replace('/v2', '/v2/contact')

      await page.goto(projectsPath)
      await expect(page.locator('#projects')).toBeVisible()
      await expect(page.locator('#case-study')).toBeVisible()
      await expect(page.locator('#contact')).toBeVisible()

      await page.goto(contactPath)
      await expect(page.locator('#contact')).toBeVisible()
      await expect(page.locator('#notes')).toBeVisible()
      await expect(page.locator('#projects')).toBeVisible()
    })

    test(`${localeCase.locale}: v2 tokens drive key surfaces and text contrast is compliant`, async ({ page }) => {
      await page.goto(localeCase.path)

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
      expect(caseStudyClasses).toContain('bg-surface-container-lowest')

      const routeText = await page.locator('.v2-route h1').first().evaluate((node) => window.getComputedStyle(node).color)
      const mutedText = await page
        .getByRole('navigation', { name: 'V2 main navigation' })
        .getByRole('link', { name: localeCase.labels.archive, exact: true })
        .evaluate((node) => {
        return window.getComputedStyle(node).color
      })
      const routeBgRgb = parseRgb(routeBackground)

      expect(contrastRatio(parseRgb(routeText), routeBgRgb)).toBeGreaterThanOrEqual(4.5)
      expect(contrastRatio(parseRgb(mutedText), routeBgRgb)).toBeGreaterThanOrEqual(4.5)
    })
  }

  test('reduced-motion token collapses duration to 0ms', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()

    await page.goto('/en/v2')

    const motionDuration = await page.locator('.v2-route').evaluate((node) => {
      return window.getComputedStyle(node).getPropertyValue('--v2-motion-duration').trim()
    })

    expect(['0ms', '0s']).toContain(motionDuration)

    await context.close()
  })
})
