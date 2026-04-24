# Kevin Martínez Portfolio

Modern, high-performance backend-focused portfolio built with **Next.js 16 (React 19)** and **Atomic Design**.

## 🏗️ Architecture: Atomic Design

The project follows a strict Atomic Design hierarchy under `components/`:

-   **Atoms**: Base primitives (Buttons, Inputs, Badges, etc.) and original shadcn UI components.
-   **Molecules**: Simple compounds (Navigation items, Metric panels, Shell headers).
-   **Organisms**: Complex sections (Hero, About, Artifacts, Case Studies) and system-level blocks (Boot Sequence, Global Nav).
-   **Templates**: Version-agnostic layouts that define the structural skeleton of pages.
-   **Pages**: Slim controllers in `features/pages/` that fetch and inject data into templates.

## 🚀 Key Features

-   **Modular Sections**: Every section of the portfolio is an independent organism.
-   **Strict Performance Gate**: Automated script to verify LCP, CLS, and INP metrics.
-   **Canonical Routing**: Unified I18n with permanent redirects for legacy versioned paths.
-   **Design System**: Fully normalized CSS tokens and variables (`--portfolio-*` namespace).
-   **Boot Sequence**: Immersive terminal-like initialization sequence.

## 🛠️ Tech Stack

-   **Frontend**: Next.js 16 (Turbopack), React 19, Tailwind CSS.
-   **Tooling**: Vitest, Playwright, Husky, ESLint.
-   **i18n**: next-intl for English and Spanish parity.

## 📜 Development Scripts

-   `pnpm dev`: Start local development.
-   `pnpm build`: Verify production build.
-   `pnpm test`: Run integration tests.
-   `pnpm perf:gate`: Check performance metrics against budget.
