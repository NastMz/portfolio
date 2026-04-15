import { expect, test, type Page } from "@playwright/test";

async function waitForExperienceReady(page: Page) {
  await expect(page.locator(".v2-route")).toBeVisible();
  await expect(page.locator(".v2-boot-overlay")).toBeHidden({
    timeout: 15_000,
  });
}

const parseRgb = (value: string): [number, number, number] => {
  const channels = value.match(/\d+(?:\.\d+)?/g);

  if (!channels || channels.length < 3) {
    throw new Error(`Unable to parse color value: ${value}`);
  }

  return [Number(channels[0]), Number(channels[1]), Number(channels[2])];
};

const relativeLuminance = ([r, g, b]: [number, number, number]): number => {
  const normalize = (channel: number) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
};

const contrastRatio = (
  foreground: [number, number, number],
  background: [number, number, number],
): number => {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

const localeCases = [
  {
    locale: "en",
    path: "/en",
    labels: {
      skipLink: "Skip to main content",
      localeSwitchLabel: "Switch language",
      sidebarNavLabel: "V2 section navigation",
      mobileNavLabel: "V2 mobile navigation",
      archive: "ARCHIVE",
      logs: "LOGS",
      stack: "STACK",
      overview: "Overview",
      systems: "Systems",
      decisions: "Decisions",
      contact: "Contact",
    },
  },
  {
    locale: "es",
    path: "/es",
    labels: {
      skipLink: "Saltar al contenido principal",
      localeSwitchLabel: "Cambiar idioma",
      sidebarNavLabel: "Navegación de secciones V2",
      mobileNavLabel: "Navegación móvil V2",
      archive: "ARCHIVE",
      logs: "LOGS",
      stack: "STACK",
      overview: "Resumen",
      systems: "Sistemas",
      decisions: "Decisiones",
      contact: "Contacto",
    },
  },
] as const;

test.describe("v2 i18n interaction and accessibility parity", () => {
  for (const localeCase of localeCases) {
    test(`${localeCase.locale}: canonical homepage renders the v2 experience and locale switch`, async ({
      page,
    }) => {
      await page.goto(localeCase.path);
      await waitForExperienceReady(page);

      const localeSwitch = page.getByLabel(localeCase.labels.localeSwitchLabel);

      await expect(localeSwitch).toBeVisible();
      await expect(localeSwitch).toHaveAttribute(
        "href",
        localeCase.locale === "en" ? "/es" : "/en",
      );
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        localeCase.locale,
      );
      await expect(page.locator("main#main-content")).toBeVisible();
      await expect(
        page.getByRole("navigation", {
          name: localeCase.labels.sidebarNavLabel,
        }),
      ).toBeVisible();
      await expect(page.locator("#artifacts")).toBeVisible();
      await expect(page.locator("#decision-log")).toBeVisible();
      await expect(page.locator("#stack-evaluation")).toBeVisible();
      await expect(page.locator("#projects")).toBeVisible();
      await expect(page.locator("#contact")).toBeVisible();
    });

    test(`${localeCase.locale}: skip link is the first keyboard target and lands on main content`, async ({
      page,
    }) => {
      await page.goto(localeCase.path);
      await waitForExperienceReady(page);

      await page.keyboard.press("Tab");

      const skipLink = page.getByRole("link", {
        name: localeCase.labels.skipLink,
      });
      await expect(skipLink).toBeFocused();
      await skipLink.press("Enter");

      await expect(page.locator("main#main-content")).toBeFocused();
    });

    test(`${localeCase.locale}: main content exposes a coherent heading outline`, async ({
      page,
    }) => {
      await page.goto(localeCase.path);
      await waitForExperienceReady(page);

      const headings = await page
        .locator("main#main-content :is(h1, h2, h3, h4, h5, h6)")
        .evaluateAll((nodes) => {
          return nodes
            .map((node) => {
              const element = node as HTMLElement;
              const level = Number(element.tagName.slice(1));
              const text = element.textContent?.trim() ?? "";
              const style = window.getComputedStyle(element);
              const isVisible =
                style.display !== "none" &&
                style.visibility !== "hidden" &&
                text.length > 0;

              return isVisible ? { level, text } : null;
            })
            .filter(
              (heading): heading is { level: number; text: string } =>
                heading !== null,
            );
        });

      expect(headings.length).toBeGreaterThan(0);
      expect(headings.filter((heading) => heading.level === 1)).toHaveLength(1);
      expect(headings[0]).toMatchObject({ level: 1 });

      for (const [index, heading] of headings.entries()) {
        if (index === 0) {
          continue;
        }

        const previousHeading = headings[index - 1];
        expect(heading.level - previousHeading.level).toBeLessThanOrEqual(1);
      }
    });

    test(`${localeCase.locale}: language switch receives a visible focus ring`, async ({
      page,
    }) => {
      await page.goto(localeCase.path);
      await waitForExperienceReady(page);

      const localeSwitch = page.getByLabel(localeCase.labels.localeSwitchLabel);
      await localeSwitch.focus();
      await expect(localeSwitch).toBeFocused();

      const focusStyle = await localeSwitch.evaluate((node) => {
        return window.getComputedStyle(node).boxShadow;
      });

      expect(focusStyle).not.toBe("none");
    });

    test(`${localeCase.locale}: /projects and /contact preserve full faithful composition`, async ({
      page,
    }) => {
      const projectsPath = `${localeCase.path}/projects`;
      const contactPath = `${localeCase.path}/contact`;

      await page.goto(projectsPath);
      await waitForExperienceReady(page);
      await expect(page.locator("#projects")).toBeVisible();
      await expect(page.locator("#case-study")).toBeVisible();
      await expect(page.locator("#contact")).toBeVisible();

      await page.goto(contactPath);
      await waitForExperienceReady(page);
      await expect(page.locator("#contact")).toBeVisible();
      await expect(page.locator("#notes")).toBeVisible();
      await expect(page.locator("#projects")).toBeVisible();
    });

    test(`${localeCase.locale}: mobile uses bottom navigation with canonical anchors`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 393, height: 852 });
      await page.goto(localeCase.path);
      await waitForExperienceReady(page);

      const mobileNav = page.getByRole("navigation", {
        name: localeCase.labels.mobileNavLabel,
      });

      await expect(mobileNav).toBeVisible();
      await expect(mobileNav.locator("a")).toHaveCount(6);

      const hrefs = await mobileNav.locator("a").evaluateAll((anchors) => {
        return anchors.map((anchor) => anchor.getAttribute("href"));
      });

      expect(hrefs).toEqual([
        "#overview",
        "#systems",
        "#artifacts",
        "#decision-log",
        "#stack",
        "#contact",
      ]);
    });

    test(`${localeCase.locale}: shell chrome stays readable on mobile without horizontal overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 393, height: 852 });
      await page.goto(localeCase.path);
      await waitForExperienceReady(page);

      const shellChrome = await page.evaluate(() => {
        return {
          headerCount: document.querySelectorAll(
            '[data-shell-section-header="true"]',
          ).length,
          panelCount: document.querySelectorAll("[data-shell-panel]").length,
        };
      });

      expect(shellChrome.headerCount).toBeGreaterThanOrEqual(7);
      expect(shellChrome.panelCount).toBeGreaterThanOrEqual(10);

      const mainLayout = await page
        .locator("main#main-content")
        .evaluate((node) => {
          return {
            clientWidth: node.clientWidth,
            scrollWidth: node.scrollWidth,
          };
        });

      expect(
        mainLayout.scrollWidth - mainLayout.clientWidth,
      ).toBeLessThanOrEqual(1);

      const readableParagraphs = await page
        .locator("main#main-content p")
        .evaluateAll((nodes) => {
          return nodes
            .map((node) => {
              const element = node as HTMLElement;
              const text = element.textContent?.trim() ?? "";

              if (text.length < 60) {
                return null;
              }

              const rect = element.getBoundingClientRect();
              const style = window.getComputedStyle(element);
              const fontSize = Number.parseFloat(style.fontSize) || 0;
              const lineHeight = Number.parseFloat(style.lineHeight) || 0;

              if (
                style.display === "none" ||
                style.visibility === "hidden" ||
                rect.width === 0 ||
                rect.height === 0
              ) {
                return null;
              }

              return {
                fontSize,
                height: rect.height,
                lineHeight,
                width: rect.width,
              };
            })
            .filter(
              (
                paragraph,
              ): paragraph is {
                fontSize: number;
                height: number;
                lineHeight: number;
                width: number;
              } => paragraph !== null,
            );
        });

      expect(readableParagraphs.length).toBeGreaterThanOrEqual(4);

      for (const paragraph of readableParagraphs.slice(0, 4)) {
        expect(paragraph.width).toBeGreaterThan(180);
        expect(paragraph.height).toBeGreaterThan(paragraph.fontSize);

        if (paragraph.lineHeight > 0) {
          expect(paragraph.lineHeight).toBeGreaterThan(paragraph.fontSize);
        }
      }
    });

    test(`${localeCase.locale}: v2 tokens drive key surfaces and text contrast is compliant`, async ({
      page,
    }) => {
      await page.goto(localeCase.path);
      await waitForExperienceReady(page);

      const tokenValues = await page.evaluate(() => {
        const rootStyle = window.getComputedStyle(document.documentElement);

        return {
          bg: rootStyle.getPropertyValue("--v2-color-bg").trim(),
        };
      });

      const routeBackground = await page
        .locator(".v2-route")
        .evaluate((node) => {
          return window.getComputedStyle(node).backgroundColor;
        });

      const resolvedTokenColors = await page.evaluate((tokens) => {
        const probe = document.createElement("div");
        probe.style.display = "none";
        document.body.appendChild(probe);

        const resolveColor = (value: string) => {
          probe.style.color = value;
          return window.getComputedStyle(probe).color;
        };

        const colors = {
          bg: resolveColor(tokens.bg),
        };

        probe.remove();
        return colors;
      }, tokenValues);

      expect(routeBackground).toBe(resolvedTokenColors.bg);
      await expect(page.locator("#case-study details").first()).toContainText(
        "PROBLEM",
      );
      await expect(page.locator("#case-study details").first()).toContainText(
        "DECISION",
      );

      const routeText = await page
        .locator(".v2-route h1")
        .first()
        .evaluate((node) => window.getComputedStyle(node).color);
      const mutedText = await page
        .getByLabel(localeCase.labels.localeSwitchLabel)
        .evaluate((node) => {
          return window.getComputedStyle(node).color;
        });
      const routeBgRgb = parseRgb(routeBackground);

      expect(
        contrastRatio(parseRgb(routeText), routeBgRgb),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(parseRgb(mutedText), routeBgRgb),
      ).toBeGreaterThanOrEqual(4.5);
    });
  }

  test("legacy versioned paths permanently land on canonical routes", async ({
    page,
  }) => {
    await page.goto("/en/v2");
    await expect(page).toHaveURL(/\/en$/);
    await waitForExperienceReady(page);

    await page.goto("/en/v2/projects");
    await expect(page).toHaveURL(/\/en\/projects$/);
    await waitForExperienceReady(page);

    await page.goto("/es/v2/contact");
    await expect(page).toHaveURL(/\/es\/contact$/);
    await waitForExperienceReady(page);

    await page.goto("/es/legacy");
    await expect(page).toHaveURL(/\/es$/);
    await waitForExperienceReady(page);
  });

  test("contact form associates each invalid field with its own error message", async ({
    page,
  }) => {
    await page.goto("/en/contact");
    await waitForExperienceReady(page);

    const submitButton = page.getByRole("button", { name: "SEND_MESSAGE" });
    const identityInput = page.getByLabel("IDENTITY");
    const endpointInput = page.getByLabel("ENDPOINT_ADDRESS");

    await endpointInput.fill("kevin@example.com");
    await submitButton.click();

    await expect(identityInput).toHaveAttribute("aria-invalid", "true");
    await expect(identityInput).toHaveAttribute(
      "aria-describedby",
      "contact-identity-error",
    );
    await expect(page.locator("#contact-identity-error")).toContainText(
      "ERROR::IDENTITY_REQUIRED",
    );
    await expect(endpointInput).not.toHaveAttribute(
      "aria-describedby",
      /contact-endpoint-error/,
    );

    await identityInput.fill("Kevin");
    await endpointInput.fill("invalid-endpoint");
    await submitButton.click();

    await expect(endpointInput).toHaveAttribute("aria-invalid", "true");
    await expect(endpointInput).toHaveAttribute(
      "aria-describedby",
      "contact-endpoint-error",
    );
    await expect(page.locator("#contact-endpoint-error")).toContainText(
      "ERROR::ENDPOINT_ADDRESS_INVALID",
    );
    await expect(identityInput).not.toHaveAttribute(
      "aria-describedby",
      /contact-identity-error/,
    );
  });

  test("reduced-motion token collapses duration to 0ms", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();

    await page.goto("/en");
    await waitForExperienceReady(page);

    const motionDuration = await page.evaluate(() => {
      return window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--v2-motion-duration")
        .trim();
    });

    expect(["0ms", "0s"]).toContain(motionDuration);

    await context.close();
  });
});
