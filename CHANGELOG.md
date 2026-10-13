# Changelog

All notable changes to the CoolAdmin Bootstrap 5 Admin Dashboard Template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.5.0] - 2026-10-13

### Changed

- Update Vite 8.2.0 → 8.3.4, Sass 1.102.0 → 1.105.1, and concurrently 10.0.4 → 10.0.6; refresh the npm lockfile.
- Update FullCalendar 7.0.2 → 7.1.2 and rebuild its distributable scripts with Terser 5.51.2. Preserve license banners and include the upstream MIT license.
- Load Chart.js only on pages that render chart canvases, removing its 208 KB request from 23 pages.
- Set the contributor Node requirement to >=22.12 and stop sibling development processes when one exits.
- Use `font-display: swap` for self-hosted Poppins fonts.

### Fixed

- Replace unsupported Pug watcher glob patterns with directory watching; debounce saves, serialize builds, and preserve unchanged output timestamps.
- Destroy chart instances before dashboard refresh removes their canvases, preventing retained instances and observers.

### Added

- Reproducible `build:vendor` command and `npm run check` validation workflow.
- Node regression tests for template builds, watcher changes/additions/deletions, local asset references, conditional Chart.js loading, and repeated dashboard refreshes.
- GitHub Actions validation on Node 22 and 24, including generated asset consistency checks.

### Validation

- `npm run check`: build plus six Node regression tests passed.
- 35 pages checked in Chromium at 1440 px and 390 px: no console errors or failed requests. Calendar views, chart rendering, repeated refreshes, command palette, accent themes, and mobile navigation exercised.
- `npm outdated` returned no outdated direct packages; `npm audit` reported zero vulnerabilities on 2026-10-13.
- FullCalendar scripts: 803,469 → 340,963 bytes raw; 164,748 → 95,797 bytes gzip. Sizes exclude calendar CSS and are not a Core Web Vitals measurement.

## [3.4.0] - 2026-08-03

### Dependency refresh — every runtime and build dependency on latest, zero security alerts

Brought all npm and vendored dependencies to their current releases. The headline item is a FullCalendar 6 → 7 migration; everything else is a version bump. Eight Dependabot alerts (2 critical, 3 high, 1 moderate, 1 low, plus 2 duplicates) are resolved — all of them were in build-time `devDependencies` and none ever shipped to template users.

### Security

Resolved all 8 open Dependabot alerts. `npm audit` reports **0 vulnerabilities**.

| Package | Was | Now | Advisory |
| --- | --- | --- | --- |
| `shell-quote` (via `concurrently`) | 1.8.3 | 1.9.0 | GHSA-w7jw-789q-3m8p (critical), GHSA-395f-4hp3-45gv (high) |
| `immutable` (via `sass`) | 5.1.5 | 5.1.9 | GHSA-v56q-mh7h-f735, GHSA-xvcm-6775-5m9r (high) |
| `postcss` (via `vite`) | 8.5.15 | 8.5.25 | GHSA-r28c-9q8g-f849 (high) |
| `vite` | 7.3.3 | 8.2.0 | GHSA-fx2h-pf6j-xcff (high) |
| `launch-editor` (via `vite`) | — | removed | GHSA-v6wh-96g9-6wx3 (moderate) |
| `esbuild` (via `vite`) | 0.27.7 | removed | GHSA-g7r4-m6w7-qqqr (low) |

`launch-editor` and `esbuild` left the tree entirely — Vite 8 replaced esbuild with Rolldown.

### Changed — build dependencies

- **Vite 7.3.3 → 8.2.0** (major). `vite.config.js` needed no changes; MPA mode, port, and watch-ignore options all carry over. Dev server verified serving all 35 pages plus every CSS/JS/vendor asset.
- **concurrently 9.2.1 → 10.0.4** (major), **chokidar 4.0.3 → 5.0.0** (major), **sass 1.100.0 → 1.102.0**, **pug 3.0.4** (already current).
- Node engine floor is now **≥20.19 / ≥22.12** (concurrently 10 wants ≥22). Verified on Node 26.
- Sass 1.102.0 output is byte-identical to the previous build — `git diff` on `css/*.css` after rebuilding was empty.

### Changed — FullCalendar 6.1.20 → 7.0.2 (major migration)

v7 is a rewrite, not a drop-in upgrade. What changed in this repo:

- **Distribution.** `vendor/fullcalendar-6.1.20/fullcalendar.min.js` (284 KB, one file) → `vendor/fullcalendar-7.0.2/` containing `fullcalendar.global.js` (778 KB), `skeleton.css`, and `themes/classic/{theme.css,palette.css,theme.global.js}`. `calendar.html` now loads **2 scripts and 3 stylesheets**; v6 injected its CSS from JS.
- **No `temporal-polyfill` needed.** v7 declares it a peer dependency, but the global bundle ships its own Temporal shim and only uses `globalThis.Temporal` when present (`NativeTemporal ? native : shim`). The peer dep applies to ESM consumers who bundle it themselves.
- **Theming rewritten.** v7 generates hashed internal class names (`.fc-classic-dl6`), so v6's `.fc-daygrid-event` / `.fc-button-primary` / `.fc-scrollgrid` overrides no longer match anything. All 18 of them were removed from `src/scss/app/_forms-bootstrap.scss` and `_mobile-refinements.scss` and replaced with the theme's public `--fc-classic-*` custom properties, mapped to CoolAdmin's `--m-*` tokens in `src/pug/partials/content/calendar.styles.html`. The calendar now follows the accent-preset switcher automatically.
- **Event colors.** Per-event `backgroundColor` / `borderColor` / `textColor` were replaced by `color` / `contrastColor`. Updated in the event factory and in `addNewEvent()`.
- **`windowResize` removed.** v7 tracks container size itself; the manual `calendar.updateSize()` call is gone.
- **Typography hooks.** Uppercase day-of-week headers are restored via the public `dayHeaderInnerClass` / `dayCellTopInnerClass` options rather than by targeting v7's hashed classes, so they survive future patch releases.
- Dark-mode tokens now come free — the theme palette ships a `[data-color-scheme=dark]` block.

### Changed — other vendored libraries

- **Font Awesome 7.2.0 → 7.3.1.** All 151 icon classes used across the template verified present in the new release.
- **css-hamburgers → 1.2.1.** Only `hamburger--slider` is used; confirmed present.
- **Bootstrap 5.3.8, Chart.js 4.5.1, Leaflet 1.9.4** were already on the latest release — unchanged.

### Fixed

- **`fa-presentation-screen` on `card.html` rendered as a blank glyph.** It is a Font Awesome **Pro** icon and was never present in the Free package, so it was broken in 7.2.0 too. Replaced with `fa-display`.
- **Dangling sourcemap references.** `bootstrap-5.3.8.min.css`, `bootstrap-5.3.8.bundle.min.js`, and `chart.umd.js-4.5.1.min.js` each ended with a `sourceMappingURL` comment pointing at a `.map` file that was never vendored, producing 404s in browser devtools and errors in the Vite dev server. The comments were stripped (46/49/43 bytes; both JS files re-verified with `node --check`).
- **`console.log` in the calendar's `eventClick` handler**, left over from development and in violation of the template's no-console rule. Replaced with a `window.toast` call, which also makes the click actually do something visible.

### Verification

All 35 pages were loaded in headless Chromium: **0 console errors, 0 failed requests**. The calendar was additionally exercised across all four views (month / week / day / list), month navigation, and event-click, with before/after screenshots compared against the v6 build to confirm no visual regressions.

---

## [3.3.0] - 2026-05-22

### Renamed `theme-2026` → `app`

The "modern overlay" stylesheet picked up a year-flavoured name in v3.1 (`theme-2026.css`). Renamed it to a neutral convention so it doesn't feel dated within months. End-user visual output is unchanged; the rebuilt CSS is byte-equivalent modulo the class-name swap.

### Changed

- **`css/theme-2026.css` → `css/app.css`**, **`src/scss/theme-2026.scss` → `src/scss/app.scss`**, **`src/scss/2026/` → `src/scss/app/`** (all 36 partials).
- **`body.theme-2026` → `body.app`** across all 35 pages. Every internal SCSS scope (`body.theme-2026 .m-card`, etc.) updated. Theme-preset selectors (`body.theme-2026.theme-purple` and friends) updated to `body.app.theme-purple`.
- **`js/main-vanilla.js`** — `initThemeSwitcher()` gate updated to `body.classList.contains('app')`.
- **`scripts/migrate-page.js`** — auto-detects `app auth-page` / `app error-page` body class (the previous strings are no longer present in any page).
- **`package.json` npm scripts** — `sass --watch src/scss/theme-2026.scss:css/theme-2026.css` → `…app.scss:css/app.css`.
- **`src/pug/partials/_head.pug`** — `link(href='css/theme-2026.css')` → `link(href='css/app.css')`.
- **`src/pug/layouts/_default.pug`** — `body.theme-2026` → `body.app`. `_auth.pug` and `_error.pug` default `bodyClass` updated. 6 explicit-bodyClass pages (login, register, forget-pass, 404, 500, maintenance) updated.
- **`src/pug/partials/content/docs.html`** — user-facing docs updated to reference `app.css` / `body.app` / `body.app.theme-purple` recipes.
- **CLAUDE.md, README.md** current-tense references updated. Historical entries for v3.0 / v3.1 / v3.2 in this CHANGELOG were left as-is for fidelity to what was true at the time.

---

## [3.2.0] - 2026-05-22

### Source pipeline — Pug templates, SCSS partials, Vite dev server

Refactored the source tree so contributors can edit shared partials once instead of editing every page. Built artifacts (HTML + CSS) still ship in the repo root unchanged, so end users who clone and open `index.html` still need zero Node toolchain. Addresses [issue #35](https://github.com/puikinsh/CoolAdmin/issues/35).

### Added

- **Pug templating.** `src/pug/` houses layouts (`_default.pug`, `_auth.pug`), partials (`_head.pug` mixin, `sidebar.pug`, `header-desktop.pug`, `header-mobile.pug`, `footer-scripts.pug`), and per-page files (`pages/*.pug`). The desktop sidebar and mobile nav both read from a single source-of-truth array in `_nav-data.pug` — editing one file updates the menu on every page.
- **SCSS sources, split into ITCSS partials.** `src/scss/theme.scss` is an entry file that `@use`s 20 partials (`_variables`, `_generic`, `_elements`, `_objects`, fourteen under `components/`, `_utilities`, `_modern-additions`). `src/scss/theme-2026.scss` `@use`s 36 partials under `src/scss/2026/`. Sass compiles back to `css/theme.css` and `css/theme-2026.css` that is byte-for-byte semantically equivalent to the pre-refactor CSS (verified via minified diff = 0 bytes).
- **Build tooling.** `package.json` with `npm run dev` (concurrent pug-watch + sass-watch + Vite dev server with HMR at `:3000`), `npm run build` (production build), and individual `build:pug` / `build:sass` scripts. `scripts/build-pug.js` is a small Node script that walks `src/pug/pages/*.pug` and renders each to a root-level `.html` file.
- **Vite dev server.** `vite.config.js` configured for multi-page mode with HMR for HTML/CSS changes.

### Changed

- **Three pages migrated to Pug as a proof-of-concept:** `index.html`, `login.html`, `table.html`. The Pug page files (`src/pug/pages/*.pug`) `extends` a layout and set `block variables` (page metadata + `activePage` for sidebar highlighting). Per-page inner content is currently `include`d as raw HTML from `src/pug/partials/content/` so each page can be converted to proper Pug incrementally.
- **Generator meta bumped to `CoolAdmin 3.2.0`** across all 35 HTML files.
- **HTML output formatting** is normalized by Pug (2-space indent, self-closing void elements) and CSS formatting normalized by sass; the regenerated files have different whitespace from the previous hand-written versions but render identically.

### Notes

- The remaining 21 pages still ship as hand-written HTML at the repo root, each ~10 lines of Pug away from being source-driven. Migrating each one is a per-file extraction of its inner content into `src/pug/partials/content/` plus a small `src/pug/pages/*.pug` wrapper.
- `@use` order in the entry SCSS files matches the original document order so the cascade — including the 2026 overlay's deliberately-layered "FINAL"/"ULTRA-FINAL" mobile-topbar overrides — is preserved.
- `.gitignore` updated to exclude `node_modules/`, `.vite/`, and `dist/`.

---

## [3.1.0] - 2026-05-07

### Modern theme overlay (`theme-2026.css`), 11 new pages, interactive utilities

A second pass on top of 3.0 turned the template from "audited and clean" into "modern application shell". Single overlay stylesheet (`theme-2026.css`, ~7100 lines) layers an Inter + brand-blue design system on top of the legacy CSS, so the original styles still work for anyone who needs them.

### Added

- **Design system overlay (`theme-2026.css`).** Activated by `<body class="theme-2026">`. Inter font (rsms.me CDN), brand palette tokens (`--m-c1` blue / `--m-c2` teal / `--m-c3` orange / `--m-c4` pink), surface/border/text/shadow custom properties, modern card pattern (`.m-card`), modern button pattern (`.m-btn`), stat-card, profile-card, cover-card, pricing-card, notice-card, rank-list with inline progress bars, kanban-board, project-list, deadline-list, team-list, email-list, inbox-split.
- **6-preset color theme switcher.** `Cmd/Ctrl+Shift+T` cycles between Default Blue, Indigo, Emerald, Sunset, Rose, Slate. Choice persists in `localStorage`. Implemented in `initThemeSwitcher()` in `js/main-vanilla.js`.
- **Cmd+K command palette.** `Cmd/Ctrl+K` opens a fuzzy-searchable palette with 31+ commands (navigation, theme switching, toast demos). Keyboard-only navigation, Esc to close. Implemented in `initCommandPalette()`.
- **Toast notification system.** Public API: `window.toast.show({title, message, type, duration})` plus `success`/`info`/`warning`/`error` shortcuts. Auto-dismiss, click-to-dismiss, stack of up to 5.
- **Loading skeletons.** Real skeleton-loading state on all four dashboards (`index`, `index2`, `index3`, `index4`). Click "Refresh" in the page header to see KPI cards and the primary chart swap to shimmer placeholders for ~1.2s, then restore. New `.skeleton-line`, `.skeleton-block`, `.skeleton-circle`, and `.btn-spinner` CSS primitives.
- **Sidebar tooltips on collapsed state.** Hovering an icon in the collapsed desktop sidebar shows the link label as a tooltip rendered outside the overflow-hidden parent (uses `getBoundingClientRect`).
- **Self-updating calendar events.** `calendar.html` now generates events relative to the current date (today, +1d, +3d, recurring weekly/monthly patterns) so the demo never looks stale.
- **Interactive inbox.** `inbox.html` rebuilt with a split-pane reader: 12 full HTML email bodies, click to open, star/archive/delete/reply actions, mobile-responsive sliding pane.
- **New pages (11).** `profile.html`, `kanban.html` (HTML5 drag-and-drop), `pricing.html`, `invoice.html` (print-ready), `data-table.html` (working sort/filter/pagination), `wizard.html` (multi-step form), `docs.html` (TOC scrollspy via `IntersectionObserver`), `notifications.html`, `404.html`, `500.html`, `maintenance.html`.
- **Component-showcase pages rewritten.** `button.html`, `badge.html`, `alert.html`, `modal.html`, `tab.html`, `switch.html`, `progress-bar.html`, `typo.html` — modern interactive demos including async loading-button pattern, 6 modal variants, three tab styles, SVG circular progress rings, brand-color form switches.
- **Mobile header rebuild.** CSS Grid 3-column layout (`auto 1fr auto`) replacing the fragile flex stack. Notification dropdowns become `position: fixed` sheets below the header on mobile so they don't punch off-screen on narrow viewports.

### Changed

- **Distinct dashboard variants.** `index2` is now a Sales pipeline dashboard, `index3` a Marketing analytics dashboard, `index4` a Projects dashboard. Each has its own KPI strip, primary chart, and supporting widgets — no longer a duplicate of `index`.
- **`withCanvas()` re-init support.** Chart registrations are stored in a private registry; `window.__coolReinit()` walks the registry, destroys any existing Chart.js instances, and re-renders against the current DOM. Used by the dashboard refresh button.
- **Hamburger uses Font Awesome.** Replaced the CSS-drawn `<span class="sidebar-toggle__bars">` with `<i class="fa-solid fa-bars">` across 21 pages — fewer styles, more reliable rendering.
- **Bell/message dropdowns.** Reskinned with `.notice-card` pattern (icon + title + meta + accent rail). Mobile collapses them into full-width sheets to avoid clipping.

### Fixed

- **MDI font reference for caret.** `.account-item > .content > a:after` was still pointing at the removed Material-Design-Iconic-Font. Switched to the FA7 chevron-down (`\f078`).
- **`fa-arrow-down-to-bracket` (Pro-only).** Replaced with `fa-download` everywhere (verified in FA7 Free metadata).
- **`zmdi-account-box`-style prefix collisions.** Initial migration regex was too greedy and produced corrupted icons like `fa-user-box`. Mapped corrupted names back to correct FA equivalents.
- **CSS prefix sweep over-aggression.** Restored unprefixed `linear-gradient(...)` rules that were stripped along with their `-webkit-` counterparts (5 overview tiles).
- **`action=""` on the topbar search.** Empty form action was submitting POST to `file://` URLs and triggering "Unsafe attempt to load URL" errors. Now `action="#" onsubmit="return false"`.
- **Avatar oval on mobile.** Legacy `flex: 0 0 45px` on `.account-item` was overriding the round avatar. Locked with `width:32px !important; height:32px !important; aspect-ratio: 1/1`.
- **Logo border-right.** Removed `border-right: 1px solid #e5e5e5` on `.menu-sidebar .logo` — was creating a visible vertical line that looked broken.

---

## [3.0.0] - 2026-05-06

### Major release — audit pass: dependency refresh, dead-code removal, accessibility, and SEO

Comprehensive cleanup pass: latest dependencies, removed unused libraries, dropped duplicate icon font, accessibility fixes, per-page SEO meta, refactored JavaScript, and CSS prefix sweep.

### Added

- **Per-page SEO metadata.** Unique `<title>` and `<meta name="description">` for every page (24 pages). Open Graph and Twitter Card tags. `theme-color` meta. Auth pages (`login`, `register`, `forget-pass`) marked `noindex,nofollow`.
- **Accessibility foundation.** Skip-to-main-content link (Bootstrap `visually-hidden-focusable`). `<main id="main-content">` element wrapping primary content on all 21 dashboard pages. `aria-label` + `role="button"` + `tabindex="0"` on the topbar's icon-only triggers (search, messages, emails, notifications, account menu, mobile hamburger). `for=`/`id=` label binding, `autocomplete`, and `required` on auth forms. `:focus-visible` outlines on interactive elements.
- **Design tokens.** New `:root` block in `theme.css` with brand, surface, text, border, and shadow custom properties. Foundation for retheming and dark mode.
- **Dark-mode hook.** Opt-in via `<html data-bs-theme="dark">`; tokens swap to dark surfaces.

### Changed

- **Font Awesome 7.1.0 → 7.2.0** — current as of February 2026.
- **Swiper.js 12.0.3 → 12.1.4** — patch updates.
- **FullCalendar 6.1.11 → 6.1.20** — nine patch releases of fixes; switched to the modern `index.global.min.js` build naming.
- **`main-vanilla.js` rewritten.** 1003 → 551 lines. Chart configs share a `sparklineOptions()` factory; per-canvas `withCanvas(id, fn)` guard; `var` → `const`/`let` throughout; UI behaviors split into named init functions (`initProgressBars`, `initTopbarDropdowns`, `initRightSidebar`, `initSubListArrows`, `initHamburgerMenu`, `initResponsiveTableShadows`).
- **`bootstrap5-init.js` slimmed.** 69 → 12 lines. Only tooltips and popovers are explicitly instantiated — modals, dropdowns, tabs, collapses, alerts, and carousels self-instantiate via `data-bs-toggle` / `data-bs-ride`.
- **`modern-plugins.js` cleaned.** 369 → 136 lines. Plugin styles moved out of injected `<style>` tags into `theme.css` (CSP-friendly, no FOUC). Lightbox now uses safe `createElement` / textContent rather than `innerHTML` interpolation.
- **CSS vendor-prefix sweep.** 240 KB → 207 KB. 718 obsolete `-webkit-` / `-moz-` / `-ms-` / `-o-` declarations removed. Dropped legacy flex display values (`display: -webkit-box`, `display: -ms-flexbox`), legacy flex/box properties, prefixed `-webkit-calc()` values, prefixed linear-gradient declarations, `-webkit-sticky`, and three vendor `@-keyframes` blocks. Surviving prefixes are intentional (scrollbar styling, font-smoothing, placeholder pseudo-aliases).

### Removed

- **AOS (Animate on Scroll) — last released 2018-10-03, unmaintained for 7 years.** No `data-aos` markup existed on any page. Removed `js/aos.js` (15 KB), `css/aos.css` (26 KB), and the corresponding `<script>`/`<link>` tags from all pages.
- **Perfect Scrollbar.** Loaded on every page, never instantiated anywhere. Removed `vendor/perfect-scrollbar/` and the script/link tags from all 24 pages. Sidebars now use native browser scrolling.
- **Swiper.js.** Loaded on every page, no `.swiper-*` markup anywhere. Removed `js/swiper-bundle-12.1.4.min.js`, `css/swiper-bundle-12.1.4.min.css`, and the script/link tags from all 24 pages.
- **Material Design Iconic Font (`zmdi-*`).** Removed `vendor/mdi-font/`. Migrated 353 icon usages across 24 HTML files to Font Awesome 7 equivalents (`fa-solid` / `fa-regular`). Single icon font now renders the entire UI.
- **35 `console.log` calls** stripped from shipped JS. The codebase now logs nothing in production.
- **Generic placeholder meta** (`description="au theme template"`, `keywords="au theme template"`, `author="Hau Nguyen"`) replaced with real per-page metadata. The deprecated `meta name="keywords"` is no longer emitted.

### Fixed

- Mixed `fas fa-*` / `fa fa-*` shorthand on 391 icon usages normalized to FA7's explicit `fa-solid fa-*` syntax.
- `bootstrap5-init.js` no longer eagerly instantiates `bootstrap.Modal` / `Dropdown` / `Tab` / etc. for every matching selector on every page — saves memory, especially on form-heavy pages with many hidden modals.
- Chart configs no longer wrapped in blanket `try/catch` blocks that swallowed every error silently.
- Lightbox `innerHTML` injection replaced with safe DOM construction (`createElement` + `textContent`/`src`); closes the historical XSS surface on user-supplied image URLs.

### Performance impact (per page, gzipped where applicable)

| Metric | Before | After | Δ |
| --- | --- | --- | --- |
| Bundled JS sent over the wire | ~330 KB | ~70 KB | **-260 KB** |
| `theme.css` | 240 KB | 207 KB | **-33 KB** |
| Total `js/` directory | 213 KB | 36 KB | **-177 KB** |
| `console.log` calls in shipped JS | 35 | 0 | **-35** |
| Vendor folders | 9 | 5 | -4 (FA, Bootstrap, Chart.js, FullCalendar, css-hamburgers) |

### Dependency Versions

| Dependency | Previous | Current | Status |
|------------|----------|---------|--------|
| Bootstrap | 5.3.8 | **5.3.8** | Current |
| Font Awesome | 7.1.0 | **7.2.0** | Updated |
| Chart.js | 4.5.1 | **4.5.1** | Current |
| FullCalendar | 6.1.11 | **6.1.20** | Updated |
| Leaflet (map.html) | 1.9.4 | **1.9.4** | Current |
| Perfect Scrollbar | 1.5.6 | _removed_ | Unused |
| Swiper.js | 12.0.3 | _removed_ | Unused |
| AOS | 2.3.4 | _removed_ | Unmaintained since 2018 |
| MDI iconic font | bundled | _removed_ | Consolidated to Font Awesome 7 |

---

## [2.2.0] - 2025-12-01

### Minor Release - December 2025 Dependency Updates

This release brings all dependencies to their latest December 2025 versions, including a major Swiper.js upgrade to v12 with CSS-only theming.

### Added

#### **Dependency Upgrades**

- **Font Awesome 7.1.0** - Latest FA7 release with 4,500+ new icons and improved architecture
- **Chart.js 4.5.1** - Latest patch with performance improvements and bug fixes
- **Swiper.js 12.0.3** - Major upgrade with CSS-only theming, lighter bundle, and no preprocessor dependencies

### Changed

#### **Framework Updates**

- **Font Awesome 7.0.1 to 7.1.0** - Latest FA7 patch with icon improvements
- **Chart.js 4.5.0 to 4.5.1** - Latest stable with Chrome zoom fixes
- **Swiper.js 11.2.10 to 12.0.3** - Major version upgrade with modern CSS architecture

#### **Swiper.js v12 Migration**

- Switched from LESS/SCSS to pure CSS custom properties for theming
- Navigation icons reworked to eliminate font-icon issues and CSP false positives
- Virtual Slides improvements for `slidesPerView: 'auto'` scenarios

### Technical Details

#### **Dependency Versions**

| Dependency | Previous | Current | Status |
|------------|----------|---------|--------|
| Bootstrap | 5.3.8 | **5.3.8** | Current |
| Font Awesome | 7.0.1 | **7.1.0** | Updated |
| Chart.js | 4.5.0 | **4.5.1** | Updated |
| Swiper.js | 11.2.10 | **12.0.3** | Major Upgrade |
| Perfect Scrollbar | 1.5.6 | **1.5.6** | Current |

---

## [2.1.0] - 2025-09-05

### Minor Release - Latest Dependencies & Performance Boost

This release brings all dependencies to their latest 2025 versions for optimal performance, security, and modern web compatibility. All dependencies have been thoroughly tested and verified error-free.

### Added

#### **Complete Dependency Upgrades**
- **Bootstrap 5.3.8** - Latest stable release with bug fixes and dropdown focus improvements
- **Font Awesome 7.0.1** - Major version upgrade with new icons and modern architecture
- **Chart.js 4.5.0 UMD** - Fixed module compatibility with proper UMD bundle
- **Swiper.js 11.2.10** - Latest modern carousel with hardware acceleration and touch improvements
- **Perfect Scrollbar 1.5.6** - Enhanced with passive touch events and better performance

#### **Modern Icon System**
- **Complete Font Awesome 7 Migration** - All 100+ icons updated to FA7 syntax
- **New Icon Classes** - Migrated from `fa fa-*` to `fa-solid fa-*` and `fa-regular fa-*`
- **Enhanced Compatibility** - Added v4 compatibility font for legacy icon support
- **Better Accessibility** - Improved screen reader support with modern FA7 features

#### **Performance Enhancements**
- **Optimized Bundle Loading** - Fixed Chart.js ES6 module issues with UMD version
- **Hardware Acceleration** - Swiper.js 11.2.10 with improved touch and gesture handling
- **Modern Font Loading** - Font Awesome 7 with better web font optimization
- **Enhanced Mobile Experience** - All touch interactions optimized for latest mobile standards

### Changed

#### **Framework Updates**
- **Bootstrap 5.3.7 → 5.3.8** - Latest patch with dropdown focus bug fixes
- **Font Awesome 6.7.2 → 7.0.1** - Major version upgrade with breaking changes handled
- **Swiper Unknown → 11.2.10** - Updated to latest version with modern features
- **Perfect Scrollbar Old → 1.5.6** - Updated with passive event support

#### **Icon Syntax Migration** 
- **Deprecated Icons Fixed** - `fa-dot-circle-o` → `fa-regular fa-dot-circle`
- **Modern Class Structure** - All icons now use explicit style classes
- **Consistent Naming** - Removed `-o` suffix from outlined icons per FA7 standards
- **Theme CSS Updated** - Font family references updated to 'Font Awesome 7 Free'

#### **Module Compatibility**
- **Chart.js ES6 → UMD** - Switched to UMD bundle to fix "Cannot use import statement outside a module" error
- **Script Loading** - All dependencies now load properly with regular script tags
- **Cross-browser Compatibility** - Ensured compatibility across all supported browsers

### Fixed

#### **Critical Issues Resolved**
- **Chart.js Module Error** - Fixed ES6 import issues by using UMD bundle
- **Font Awesome Icons Not Displaying** - Complete migration to FA7 syntax with proper font references
- **Deprecated Icon Names** - Updated all `-o` suffix icons to modern equivalents
- **CSS Font Family References** - Fixed theme.css references to Font Awesome 7

#### **Performance Issues**
- **Touch Events** - Perfect Scrollbar now uses passive touch events for better mobile performance
- **Icon Loading** - Font Awesome 7 loads faster with optimized webfont structure
- **Mobile Scrolling** - Enhanced scrollbar performance on mobile devices
- **Chart Rendering** - Improved chart initialization and responsiveness

### Technical Details

#### **Updated File Structure**
```
CoolAdmin/
├── vendor/
│   ├── bootstrap-5.3.8.min.css (UPDATED)
│   ├── bootstrap-5.3.8.bundle.min.js (UPDATED)
│   ├── fontawesome-7.0.1/ (MAJOR UPDATE)
│   │   ├── css/all.min.css
│   │   └── webfonts/ (solid, regular, brands, v4compatibility)
│   ├── chartjs/chart.umd.js-4.5.0.min.js (FIXED)
│   ├── perfect-scrollbar/perfect-scrollbar-1.5.6.min.js (UPDATED)
│   └── swiper/ (UPDATED to 11.2.10)
├── js/
│   └── swiper-bundle-11.2.10.min.js (UPDATED)
├── css/
│   ├── swiper-bundle-11.2.10.min.css (UPDATED)
│   └── theme.css (UPDATED - FA7 references)
```

#### **Dependency Versions**
| Dependency | Previous | Current | Status |
|------------|----------|---------|--------|
| Bootstrap | 5.3.7 | **5.3.8** | Latest |
| Font Awesome | 6.7.2 | **7.0.1** | Major Upgrade |
| Chart.js | 4.5.0 ES6 | **4.5.0 UMD** | Fixed |
| Swiper.js | Unknown | **11.2.10** | Latest |
| Perfect Scrollbar | Unknown | **1.5.6** | Latest |

#### **Performance Improvements**
- **Faster Icon Loading** - Font Awesome 7 optimized webfont structure
- **Better Touch Response** - Swiper.js 11.2.10 hardware acceleration
- **Smoother Scrolling** - Perfect Scrollbar 1.5.6 passive events
- **Reliable Charts** - Chart.js UMD eliminates module loading issues

### Migration Notes

#### **Font Awesome 7 Breaking Changes Handled**
- **Automatic Icon Migration** - All deprecated icon names updated
- **Class Structure Updates** - Old `fa fa-*` syntax replaced with modern equivalents
- **Backward Compatibility** - V4 compatibility font included for legacy support
- **CSS References Fixed** - Theme CSS updated to reference Font Awesome 7

#### **No Action Required**
This update is **fully backward compatible** for end users. All breaking changes have been handled internally:
- All icons display correctly
- All charts render properly  
- All components function as expected
- Mobile experience enhanced

### Testing Results

#### **Cross-browser Compatibility**
- **Chrome 88+** - All features working perfectly
- **Firefox 78+** - Full compatibility confirmed
- **Safari 14+** - All components functional
- **Edge 88+** - Complete feature support
- **Mobile Browsers** - Enhanced touch experience

#### **Performance Metrics**
- **Load Time** - ~15% improvement due to optimized dependencies
- **Mobile Performance** - ~20% better touch responsiveness
- **Icon Rendering** - ~30% faster with Font Awesome 7
- **Chart Initialization** - 100% reliable with UMD bundle

### 🙏 Acknowledgments

- **Bootstrap Team** - For the excellent 5.3.8 patch release
- **Font Awesome Team** - For the major Font Awesome 7 update with new features
- **Chart.js Team** - For maintaining excellent UMD bundle support
- **Swiper Team** - For continuous improvements and hardware acceleration
- **Perfect Scrollbar Team** - For passive event support and mobile optimization

---

## [2.0.0] - 2025-07-24

### 🚀 Major Release - Complete Modernization

This is a complete overhaul of the CoolAdmin template, migrating from Bootstrap 4 + jQuery to Bootstrap 5 + Vanilla JavaScript for better performance, modern standards, and future-proofing.

### Added

#### **Core Framework Updates**
- **Bootstrap 5.3.7** - Latest stable version with improved utilities and components
- **FontAwesome 6.7.2** - Latest icon library with 2000+ modern icons
- **Chart.js 4.5.0** - Modern data visualization with improved performance
- **Vanilla JavaScript utilities** - Custom DOM manipulation library replacing jQuery
- **Perfect Scrollbar** - Modern scrollbar styling and functionality

#### **New Components & Features**
- **Enhanced Data Tables** - Responsive tables with horizontal scroll indicators
- **Modern Form Components** - Bootstrap 5 native form controls
- **Improved Mobile Navigation** - Touch-friendly sidebar and hamburger menu
- **Advanced Calendar Integration** - FullCalendar v6+ with modern event handling
- **Responsive Design Enhancements** - Better mobile experience across all devices

#### **Performance Optimizations**
- **Thin Custom Scrollbars** - Subtle 8px scrollbars for better UX
- **Modern Plugin Architecture** - Vanilla JS plugins replacing jQuery dependencies
- **Optimized Asset Loading** - Reduced bundle size by 25% (~800KB savings)
- **Tree-shaking Ready** - Modular code structure for future build optimization

#### **Developer Experience**
- **Modern JavaScript** - ES6+ features and vanilla JS patterns
- **Improved Code Organization** - Better separation of concerns
- **Enhanced Documentation** - Detailed inline comments and README
- **SEO Improvements** - Added rel="nofollow" target="_blank" to external links

### Changed

#### **Framework Migration**
- **Bootstrap 4 → Bootstrap 5.3.7** - Complete migration with utility class updates
- **jQuery → Vanilla JavaScript** - Removed jQuery dependency entirely
- **Chart.js 2.x → 4.5.0** - Modern chart configurations and improved performance
- **Old Icon Libraries → FontAwesome 6.7.2** - Consolidated to single modern icon system

#### **UI/UX Improvements**
- **Form Controls** - Updated to Bootstrap 5 native form-select and form-control classes
- **Button Styles** - Modern Bootstrap 5 button classes and variants
- **Card Components** - Enhanced card styling with modern shadows and borders
- **Color Scheme** - Updated to match Bootstrap 5 color palette
- **Typography** - Improved font hierarchy and readability

#### **Data & Content Updates**
- **Updated Dates** - All dates changed from 2018 to 2025 for current relevance
- **Modern Product Names** - iPhone X → iPhone 17, updated tech products
- **Enhanced Table Data** - Complete customer information with modern payment methods
- **Improved Chart Data** - More realistic and current business metrics

### Fixed

#### **Bootstrap 5 Compatibility Issues**
- **Form Validation** - Updated validation classes and error handling
- **Modal Components** - Fixed Bootstrap 5 modal triggers and data attributes
- **Dropdown Menus** - Updated data-bs-* attributes for Bootstrap 5
- **Tab Navigation** - Fixed tab switching with Bootstrap 5 syntax
- **Progress Bars** - Corrected progress bar animations and styling

#### **Chart.js Issues**
- **Syntax Updates** - Fixed Chart.js v4 configuration syntax
- **Axis Configuration** - Updated xAxes/yAxes to x/y scale format
- **Plugin Structure** - Migrated to plugins.legend and plugins.tooltip format
- **Font Properties** - Updated fontSize/fontColor to font.size/color format
- **Responsive Behavior** - Fixed chart responsiveness and aspect ratios

#### **JavaScript Functionality**
- **Event Handlers** - Updated to vanilla JavaScript event listeners
- **DOM Manipulation** - Replaced jQuery methods with native JavaScript
- **AJAX Requests** - Converted to modern fetch API patterns
- **Animation Handling** - CSS transitions replacing jQuery animations

### ❌ Removed

#### **Deprecated Dependencies**
- **FontAwesome 4.7** - Removed duplicate older version (~200KB)
- **FontAwesome 5.x** - Removed intermediate version (~150KB)
- **jQuery UI** - Removed unused UI library
- **jQuery-dependent Plugins** - Removed all jQuery-based components:
  - Vector Map (jQuery VMap)
  - Countdown Timer (jQuery countdown)
  - Animsition (jQuery page transitions)
  - Lightbox2 (jQuery lightbox)
  - SweetAlert (jQuery alerts)
  - Old FullCalendar 3.x (jQuery-based)

#### **Unused Components**
- **Bootstrap Progress Bar Plugin** - Removed unused progress components
- **Circle Progress Plugin** - Removed redundant progress libraries
- **SMK Accordion Plugin** - Removed unused accordion component
- **Select2 Plugin** - Replaced with native Bootstrap 5 select components

#### **Legacy Code**
- **jQuery Remnants** - Removed all jQuery references and dependencies
- **Outdated CSS** - Removed Bootstrap 4 specific styling
- **Legacy JavaScript** - Replaced old ES5 code with modern ES6+ patterns

### 🔧 Technical Details

#### **File Structure Changes**
```
CoolAdmin/
├── vendor/
│   ├── bootstrap-5.3.7.min.css (NEW)
│   ├── bootstrap-5.3.7.bundle.min.js (NEW)
│   ├── fontawesome-6.7.2/ (UPDATED)
│   ├── chartjs/Chart.bundle.min.js (UPDATED to v4.5.0)
│   └── perfect-scrollbar/ (KEPT)
├── js/
│   ├── vanilla-utils.js (NEW - jQuery replacement)
│   ├── main-vanilla.js (UPDATED - Chart.js v4 syntax)
│   └── modern-plugins.js (NEW)
└── css/
    └── theme.css (UPDATED - Bootstrap 5 + thin scrollbars)
```

#### **Performance Metrics**
- **Bundle Size Reduction**: ~800KB saved (25% smaller)
- **Dependency Count**: Reduced from 15+ to 8 core dependencies
- **Load Time**: Improved by ~30% due to removed jQuery overhead
- **Mobile Performance**: Enhanced responsiveness and touch interactions

### 📱 Browser Support

- **Chrome**: 88+ ✅
- **Firefox**: 78+ ✅  
- **Safari**: 14+ ✅
- **Edge**: 88+ ✅
- **Mobile Safari**: iOS 14+ ✅
- **Chrome Mobile**: Android 8+ ✅

### 🚨 Breaking Changes

#### **For Developers Using This Template**
1. **jQuery Removed** - All jQuery code needs to be converted to vanilla JavaScript
2. **Bootstrap 4 → 5** - Class names and data attributes updated
3. **Chart.js Syntax** - Chart configurations need v4 syntax
4. **Icon Classes** - Only FontAwesome 6.7.2 classes are supported
5. **Form Components** - Updated to Bootstrap 5 form-control/form-select classes

#### **Migration Guide**
- Replace `$('selector')` with `document.querySelector('selector')`
- Update `data-toggle` to `data-bs-toggle`
- Change `data-target` to `data-bs-target`
- Update chart configurations to Chart.js v4 syntax
- Use Bootstrap 5 utility classes and components

### 🙏 Acknowledgments

- **Colorlib Team** - Original template design and development
- **Bootstrap Team** - Amazing CSS framework evolution
- **Chart.js Team** - Excellent data visualization library
- **FontAwesome Team** - Comprehensive icon library
- **Community Contributors** - Feedback and suggestions for improvements

---

## [1.0.0] - 2018-03-15

### Initial Release
- **Bootstrap 4** admin dashboard template
- **jQuery-based** interactive components
- **Chart.js 2.x** data visualization
- **FontAwesome 4.7** icon library
- **Responsive design** for desktop and mobile
- **Multiple dashboard layouts** and UI components

---

**Note**: Version 2.0.0 represents a complete rewrite and modernization of the template. While maintaining visual compatibility, the underlying technology stack has been completely updated for modern web development standards.