# Evaluation -- Iteration 1

## Scores

| Criterion | Sub-criterion | Max | Raw | Notes |
|-----------|--------------|-----|-----|-------|
| **1. Design Quality** | | **3.0** | | |
| | 1.1 Surface Layering | 0.6 | 0.4 | Home page has 2-3 levels (base, surface-1, surface-2). But scenario pages, CommandBlock, ChatDemo, StepFlow all still use old `#0d1117`/`#161b22`/`#30363d` palette -- no token usage. Two distinct visual systems coexist. |
| | 1.2 Typography | 0.6 | 0.4 | Inter and JetBrains Mono loaded via next/font. Hero uses clamp(). But scenario pages still use hardcoded `#e6edf3` for headings and raw Tailwind text sizes. No CJK line-height tuning (1.7+) on body text across scenario pages. The typographic scale is applied only on home page and cheatsheet index. |
| | 1.3 Color System | 0.5 | 0.3 | globals.css defines a complete custom property system. Home page and cheatsheet index consume them. However, 291 occurrences of old GitHub-dark hex values remain across 21 files. CommandBlock, ChatDemo, StepFlow, all 5 scenario pages, all 7 expert pages still use `#0d1117`, `#161b22`, `#30363d`, `#8b949e`, `#e6edf3`. The command detail page uses `text-white/40`, `border-white/10`, `bg-white/5`. This is not "some hardcoded colors remain" -- it is the majority of the app. |
| | 1.4 Hover/Interactive States | 0.6 | 0.4 | HoverCard has designed border-glow hover (no scale). Navbar items have JS-driven hover. But: Navbar hover uses inline JS event handlers instead of CSS (fragile, no transition on leave). No active/focus states designed for buttons. CTA buttons on home page have no hover state. Filter pills on cheatsheet have active state but no hover transition. The breadcrumb links on command detail page use raw `hover:text-white/70`. |
| | 1.5 Hero Section | 0.7 | 0.5 | Dot-grid background with mask fade-out, violet glow blob, clamp() headline, gradient text, inline stat pills, brand tag -- all present. The hero is improved and has atmosphere. Missing: no grain visible in hero (the body::before grain is z-9999 fixed, might not layer correctly in all browsers). Stats feel a bit small and disconnected. CTAs lack hover states. Falls short of "credible SaaS landing page screenshot" due to lack of button polish. |
| | **Design subtotal** | **3.0** | **2.0** | |
| **2. Originality** | | **2.0** | | |
| | 2.1 Visual Identity | 0.8 | 0.3 | The hexagon character (unicode) is used in the logo -- but it is still an emoji/text character, not a custom SVG. No hexagon motif elsewhere. No dot/grid pattern outside hero. No keyboard-key badge styling (command tags use generic surface-2 code blocks). The command palette aesthetic is limited to a Ctrl+K visual hint that does nothing. The cheatsheet search is a plain input, not a centered command-palette modal. The app looks like a Tailwind dark template on most pages. |
| | 2.2 Beginner-to-Expert Escalation | 0.5 | 0.3 | The expert section has a labeled divider ("advanced zone" pill) and rose-colored badges. But structurally, expert cards are identical to regular cards. No atmospheric change, no different surface treatment, no layout complexity difference. The visual escalation from beginner to expert is purely a color/label change. |
| | 2.3 Cheatsheet Structure | 0.7 | 0.5 | Category-grouped sections with sticky headers, emoji + label + count + horizontal rule per group. Search is centered with Ctrl+K hint and max-width constraint. Category pills have active states with accent color. Empty state is designed with icon and clear button. This is noticeably better than a flat grid. Missing: search does not feel like a command palette (no overlay, no keyboard shortcut binding). Sticky headers could use glassmorphism for depth. |
| | **Originality subtotal** | **2.0** | **1.1** | |
| **3. Craft** | | **3.0** | | |
| | 3.1 CSS Token System | 0.5 | 0.15 | Tokens are defined in globals.css and are well-organized. But consumption is limited to home page, cheatsheet index, Navbar, HoverCard, CommandCard, and SearchFilter. 21 out of ~30 component/page files still use hardcoded values. The token system exists but is not adopted across the app. |
| | 3.2 Transitions/Animations | 0.5 | 0.3 | card-hover class uses consistent timing (250ms ease-out). HoverCard transitions border-color and box-shadow. Navbar uses `transition-all`. Reduced-motion media query exists in globals.css. Missing: no micro-interactions (copy button has no checkmark animation, buttons have no active state, no search focus animation, no section reveal animations). The CopyButton component likely still uses the old design. Only 2-3 distinct transition types exist. |
| | 3.3 Responsive Design | 0.5 | 0.15 | No mobile hamburger menu -- nav items are `hidden md:flex`, meaning mobile users see only the logo and GitHub link with no navigation to scenarios. Card grid uses responsive columns (1/2/3). Hero text scales with clamp(). But the complete absence of mobile navigation is a critical gap. No evidence of touch target sizing (44px minimum). |
| | 3.4 Component Consistency | 0.5 | 0.15 | Home page cards (HoverCard) use the new design system. But CommandBlock, ChatDemo, StepFlow, PitfallBox, CodeDiff all use the old GitHub-dark palette. CommandDetail uses raw Tailwind opacity utilities. Two completely different visual systems coexist -- the redesigned surfaces and the original GitHub-dark components. This is the biggest consistency failure. |
| | 3.5 Edge States | 0.5 | 0.3 | Empty search state is designed with personality (icon, message, clear button). Long command names handled by card layout. Code blocks appear to handle overflow. Missing: no evidence of breadcrumb truncation handling. Copy button success feedback uncertain (CopyButton likely still old). |
| | 3.6 No Regression | 0.5 | 0.5 | Generator reports: tsc passes with 0 errors, 76 tests pass, build succeeds with 88 pages prerendered. All pages return 200. No broken links detected. All scenario pages, expert pages, and cheatsheet commands appear functional. |
| | **Craft subtotal** | **3.0** | **1.55** | |
| **4. Functionality** | | **2.0** | | |
| | 4.1 Navigation Flow | 0.5 | 0.15 | Home to scenario works. Scenario to next scenario works (beginner has "next: feature-dev" link). Cheatsheet to command detail works. But: no active route indicator in navbar. Breadcrumbs on command detail page use old styling. No breadcrumbs on scenario pages (just a simple "home / scenario" text link). Mobile navigation is completely absent -- users on mobile cannot reach any scenario page from the navbar. |
| | 4.2 Search and Filter | 0.5 | 0.5 | Search filters in real-time via useMemo. Category pills work and show counts. Combined search + category works. Clearing restores all. Empty state handled. Performance should be fine for 71 items. Ctrl+K hint shown but not functional (not a rubric requirement for full marks -- the rubric asks for the experience to be "fast and oriented"). |
| | 4.3 Accessibility | 0.5 | 0.3 | html lang="zh-TW" set. Focus-visible ring defined globally with accent-brand color. Semantic elements: nav, main, footer, section used on some pages. But: heading hierarchy has gaps (scenario pages jump from h1 to h2 with emoji prefixes). Many interactive elements lack aria-label (the search emoji, icon buttons). The Navbar uses onMouseEnter/Leave JS handlers for hover -- no keyboard equivalent. CommandBlock and ChatDemo lack semantic structure (no role attributes on the chat messages). |
| | 4.4 Performance | 0.5 | 0.3 | Fonts loaded via next/font with display: swap -- good. No external animation libraries added. No layout shifts expected from font loading. But: the grain texture overlay uses z-index: 9999 on a fixed pseudo-element covering the entire viewport -- this could cause compositor issues and affects click-through (pointer-events: none is set, but the z-index is extreme). The body::before SVG-based grain repeats a 128x128 tile -- acceptable but the SVG filter in a data URI on every page load is not ideal. Build reportedly succeeds without warnings. |
| | **Functionality subtotal** | **2.0** | **1.25** | |

---

## Summary

| Category | Max | Score |
|----------|-----|-------|
| Design Quality | 3.0 | 2.0 |
| Originality | 2.0 | 1.1 |
| Craft | 3.0 | 1.55 |
| Functionality | 2.0 | 1.25 |
| **TOTAL** | **10.0** | **5.9** |

## Verdict: FAIL (threshold: 8.0, scored 5.9)

---

## What's working well

- The CSS custom property system in globals.css is well-structured and complete -- it defines all the right tokens per the spec (backgrounds, text, borders, accents, radius, transitions).
- Inter and JetBrains Mono are loaded correctly via next/font/google with CSS variable injection.
- The home page hero section has genuine atmosphere: dot-grid with mask, violet glow blob, clamp() headline, gradient text, inline stat pills. This is the strongest surface in the app.
- HoverCard component implements the spec's border-glow hover correctly (no scale transform, accent-colored border + shadow transition).
- The cheatsheet page has meaningful category grouping with sticky headers, designed empty state, and a centered search input with keyboard hint. This is a real improvement over a flat grid.
- The expert section divider with the "advanced zone" pill label is a nice touch.
- Build, tests, and type-checking all pass -- zero regressions on functionality.
- Reduced-motion media query is present in globals.css.
- Custom scrollbar styling matches the dark theme.

## Critical issues (blocking higher score)

1. **21 files still use the old GitHub-dark palette (291 hardcoded hex occurrences).** This is the single biggest problem. All 5 scenario pages, all 7 expert pages, CommandBlock, ChatDemo, StepFlow, PitfallBox, CodeDiff, CopyButton, CommandDetail, and RelatedCommands still use `#0d1117`, `#161b22`, `#30363d`, `#8b949e`, `#e6edf3`, `#58a6ff`, `#3fb950`, etc. The token system exists but is not consumed. Fix: systematically replace every hardcoded hex in these files with the corresponding CSS custom property (`var(--bg-base)`, `var(--bg-surface-1)`, `var(--text-primary)`, `var(--text-secondary)`, `var(--border-subtle)`, etc.). This is the highest-impact change.

2. **No mobile navigation.** Navbar items are `hidden md:flex` with no hamburger/slide-out menu. On mobile (<768px), users see only the logo and GitHub link -- they cannot navigate to any scenario or the cheatsheet from the navbar. Fix: add a hamburger button visible on `md:hidden`, a slide-out or dropdown menu panel, and ensure it closes on navigation.

3. **Navbar has no active route indicator.** The current page is not visually distinguished in the nav. Fix: use `usePathname()` from `next/navigation` to compare against nav item hrefs. Apply a bottom border, background highlight, or text color change to the active item.

4. **CommandBlock still uses three-dot window chrome and old colors.** The spec explicitly says to remove the red/yellow/green dots except for terminal simulation contexts and to use a tighter monospace header. Fix: replace the three dots with a minimal header (monospace label), use CSS custom properties for all colors, add syntax-like coloring (command name vs arguments).

5. **ChatDemo not redesigned.** Still uses old GitHub-dark colors. User messages are not right-aligned with blue tint. Claude messages are not left-aligned with violet tint. No typing indicator. Fix: apply the spec's ChatDemo redesign -- right-align user bubbles with blue tint, left-align Claude bubbles with violet/brand tint, use Lucide icons or styled initials for avatars, add a subtle typing animation.

6. **Command detail page uses raw Tailwind opacity utilities.** `text-white/40`, `text-white/70`, `border-white/10`, `bg-white/5` appear throughout `CommandDetail.tsx` and `[slug]/page.tsx`. Fix: replace with `var(--text-tertiary)`, `var(--text-secondary)`, `var(--border-subtle)`, `var(--bg-surface-1)` respectively.

## Major issues (should fix for next iteration)

7. **StepFlow component not redesigned.** Uses old hardcoded colors. The spec calls for a continuous vertical line with glowing node circles and mini CommandBlocks for code. Currently it is a basic timeline with circles. Fix: use CSS custom properties, add a continuous connecting line, style command code inside a mini CommandBlock.

8. **Navbar hover uses inline JS handlers instead of CSS.** `onMouseEnter`/`onMouseLeave` set inline styles. This is fragile, not animatable via CSS transitions, and has no keyboard equivalent. Fix: use CSS classes for hover states (e.g., `hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]`) or define a utility class in globals.css.

9. **No scroll-triggered reveals.** The spec's Sprint 2 includes sections fading in as they enter the viewport using IntersectionObserver. Currently no pages have any entrance animations. Fix: create a `useScrollReveal` hook or a `RevealSection` wrapper component that applies `opacity: 0; transform: translateY(16px)` initially and transitions to visible on intersection.

10. **Ctrl+K keyboard shortcut is visual-only.** The cheatsheet shows a `Ctrl+K` keyboard hint but pressing it does nothing. Fix: add a `useEffect` with a `keydown` listener that focuses the search input on Ctrl+K / Cmd+K.

11. **Logo uses a unicode hexagon character, not an SVG.** The spec requires the hexagon icon rendered as SVG. Fix: create a small inline SVG hexagon or use Lucide's `Hexagon` icon component.

## Minor issues (nice to fix)

12. **Grain texture z-index is 9999.** While `pointer-events: none` is set, this extreme z-index could interfere with dev tools overlays and is unnecessarily high. Fix: use `z-index: 1` or `z-index: 50` -- the grain just needs to be above content.

13. **No button hover states on CTAs.** The "start beginner" and "view cheatsheet" buttons on the home page have no visible hover state. Fix: add `hover:brightness-110` or a `hover:bg-[color]` variant for the primary CTA, and a border-color change for the secondary.

14. **Category filter "all" button has inconsistent styling.** When active, it has no border but other active pills have borders. Fix: add `border: 1px solid var(--accent-brand)` to the active "all" button state.

15. **Scenario pages use emoji in headings.** The spec says "No emoji as design elements in headings. Replace emoji with custom SVG icons or Lucide icons." The scenario pages and sections still prefix headings with emoji. Fix: replace with Lucide icons (e.g., `<BookOpen />` for learning, `<Target />` for objectives).

16. **Footer is minimal but acceptable.** Could benefit from a "back to top" action per spec. Fix: add a subtle scroll-to-top button.

## Specific fixes for Generator (iteration 2)

Priority order (highest impact first):

1. **File: all 21 files with hardcoded colors.** Create a find-and-replace pass:
   - `#0d1117` -> `var(--bg-base)`
   - `#161b22` -> `var(--bg-surface-1)`
   - `#1c2128` -> `var(--bg-surface-2)`
   - `#30363d` -> `var(--border-medium)` or `var(--border-subtle)`
   - `#21262d` -> `var(--border-subtle)`
   - `#8b949e` -> `var(--text-secondary)` (or `var(--text-tertiary)` for less important text)
   - `#e6edf3` -> `var(--text-primary)`
   - `#58a6ff` -> `var(--accent-blue)`
   - `#3fb950` -> `var(--accent-green)`
   - `#ffa657` -> `var(--accent-orange)`
   - `#bc8cff` -> `var(--accent-brand)` (close enough)
   - `#f85149` -> `var(--accent-rose)` (close enough)
   - `text-white/XX` -> corresponding `var(--text-*)` variables
   - `border-white/XX` -> corresponding `var(--border-*)` variables
   - `bg-white/XX` -> corresponding `var(--bg-surface-*)` variables
   - `bg-yellow-500/10`, `bg-orange-500/10`, `bg-blue-500/10` in CommandDetail -> use accent variables with opacity

2. **File: `app/components/Navbar.tsx`.** Add `usePathname()` for active state. Add mobile hamburger menu with slide-out panel. Replace JS hover handlers with CSS hover classes.

3. **File: `app/components/CommandBlock.tsx`.** Remove three-dot chrome. Use token variables. Add monospace header label. Color command name vs arguments differently.

4. **File: `app/components/ChatDemo.tsx`.** Right-align user messages with blue/green tint background. Left-align Claude messages with violet tint. Use token variables throughout. Add typing indicator dots animation.

5. **File: `app/components/StepFlow.tsx`.** Replace hardcoded colors with tokens. Add continuous vertical line. Style command code as mini code blocks.

6. **File: `app/cheatsheet/commands/[slug]/page.tsx`.** Replace `text-white/40`, `border-white/10` with token variables. Style breadcrumb with ChevronRight icons.

7. **File: `app/cheatsheet/components/CommandDetail.tsx`.** Replace all `text-white/XX`, `bg-white/XX`, `border-white/XX` with token variables. Replace Tailwind color classes (`bg-yellow-500/10`, `text-green-400`) with accent variables.

8. **File: `app/cheatsheet/components/SearchFilter.tsx`.** Add `useEffect` for Ctrl+K / Cmd+K keyboard shortcut to focus search input.

9. **New component: mobile nav.** Add a `MobileNav` component or expand Navbar with a hamburger toggle, overlay panel, and close-on-navigate behavior.

10. **New hook or component: scroll reveal.** Create a `RevealOnScroll` wrapper using IntersectionObserver for section entrance animations on home and scenario pages.
