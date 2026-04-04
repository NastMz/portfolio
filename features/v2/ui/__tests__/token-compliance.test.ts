import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Button, Card, Nav, SectionShell } from '@/features/v2/ui'

const tokenRegex = /var\(--([a-z0-9-]+)\)/gi

const extractTokenNames = (markup: string): string[] => {
  const matches = markup.matchAll(tokenRegex)
  return [...matches].map((entry) => entry[1])
}

describe('v2 token compliance in UI primitives', () => {
  it('uses only v2 token namespace in primitive styles', () => {
    const markup = [
      renderToStaticMarkup(createElement(Button, null, 'Primary')),
      renderToStaticMarkup(createElement(Card, null, 'Card content')),
      renderToStaticMarkup(
        createElement(Nav, {
          locale: 'en',
          localeLabel: 'Switch locale',
          items: [
            { label: 'Summary', href: '#summary' },
            { label: 'Projects', href: '#projects' },
          ],
        }),
      ),
      renderToStaticMarkup(
        createElement(
          SectionShell,
          { id: 'summary', title: 'Summary', subtitle: 'Subtitle' },
          'Child',
        ),
      ),
    ].join('\n')

    const tokens = extractTokenNames(markup)

    expect(tokens.length).toBeGreaterThan(0)
    expect(tokens.every((token) => token.startsWith('v2-'))).toBe(true)
  })
})
