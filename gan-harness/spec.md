# Product Specification: ECC Tutorial -- Premium Redesign

> Generated from brief: "redesign the ecc-tutorial Next.js app to have a premium, high-end visual quality"

## Vision

Transform the ECC (Everything Claude Code) tutorial site from a functional but generic GitHub-dark themed app into a premium, editorial-quality learning experience that feels like a product from Linear, Vercel, or Raycast. The redesign must preserve all existing functionality -- 5 scenario pages, 7 expert scenario pages, 71-command cheatsheet with search/filter, and all interactive components -- while elevating every visual surface to feel intentional, layered, and refined. The language is Traditional Chinese (zh-TW) throughout.

## Design Direction

### Color Palette

The current palette is GitHub's default dark tokens. Replace it entirely with a custom system:

- **Background base**: `#09090b` (near-black with cool undertone, not GitHub gray)
- **Background elevated (surface-1)**: `#111113` (cards, modals)
- **Background elevated (surface-2)**: `#18181b` (nested containers, code blocks)
- **Background elevated (surface-3)**: `#1e1e22` (hover states on surface-2)
- **Border subtle**: `rgba(255, 255, 255, 0.06)` (most borders)
- **Border medium**: `rgba(255, 255, 255, 0.1)` (focused / interactive borders)
- **Border strong**: `rgba(255, 255, 255, 0.16)` (hover emphasis)
- **Text primary**: `#fafafa` (headings, primary content)
- **Text secondary**: `rgba(255, 255, 255, 0.64)` (body copy, descriptions)
- **Text tertiary**: `rgba(255, 255, 255, 0.4)` (captions, metadata, placeholders)
- **Accent primary (brand)**: `#7c6aef` (a refined violet, used for primary CTAs and key highlights)
- **Accent green**: `#34d399` (success, beginner level)
- **Accent blue**: `#60a5fa` (info, intermediate, links)
- **Accent amber**: `#fbbf24` (caution, automation)
- **Accent rose**: `#f472b6` (advanced, expert)
- **Accent orange**: `#fb923c` (warnings)
- **Glow / highlight**: Use accent colors at 4-8% opacity for background tints, never above 12%

### Typography

- **Headings**: `Inter` (variable weight, loaded via next/font/google). Tight letter-spacing: `-0.02em` for h1, `-0.015em` for h2.
- **Body**: `Inter` at 400/500 weight. Line-height 1.6-1.7 for readability.
- **Mono / Code**: `JetBrains Mono` (loaded via next/font/google). Used in command blocks, inline code, the navbar logo, and code snippets.
- **Hero heading**: `clamp(2.5rem, 1rem + 5vw, 4.5rem)` with font-weight 700.
- **Section headings (h2)**: `1.5rem` / font-weight 600.
- **Card titles**: `1rem` / font-weight 600.
- **Body text**: `0.9375rem` (15px) / font-weight 400.
- **Small / caption**: `0.8125rem` (13px).
- **Micro labels**: `0.6875rem` (11px), uppercase tracking `0.05em` for category badges.

### Layout Philosophy

- **Airy editorial with dense information density where needed.** Generous vertical rhythm (`clamp(4rem, 3rem + 4vw, 8rem)` between major sections) but tighter internal spacing within cards and grouped content.
- **Max content width**: `64rem` (1024px) for prose/scenario pages; `72rem` (1152px) for the cheatsheet grid.
- **Card grid**: Break away from uniform 3-column. Use a featured/hero card layout where the first scenario card spans full width or two columns, with remaining cards in a standard grid.
- **Whitespace as design element**: Let content breathe. Current 16px padding everywhere is too tight.

### Visual Identity

- **Grain texture overlay**: A subtle CSS noise texture (`background-image: url("data:image/svg+xml,...")` or generated via CSS) at 2-4% opacity on the page background. Adds tactile depth without being heavy.
- **Glow accents**: Radial gradient "glow" blobs behind key sections (hero, section headers) using brand violet at 3-6% opacity, ~400-600px radius. Not scattered everywhere -- max 2-3 per page.
- **Glass surfaces**: Navigation bar and floating elements use `backdrop-filter: blur(16px) saturate(180%)` with `rgba(9,9,11,0.7)` background. Cards do NOT use glassmorphism -- they use solid elevated surfaces.
- **Border glow on hover**: Cards transition from `border-color: rgba(255,255,255,0.06)` to the card's accent color at 30% opacity on hover, with a matching `box-shadow: 0 0 0 1px [accent]30, 0 8px 32px -8px [accent]12`.
- **Dot grid pattern**: A subtle repeating dot grid (`radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)` at `24px 24px`) on the hero section background, fading out via a mask gradient.
- **No emoji as design elements in headings.** Replace emoji with custom SVG icons or Lucide icons (already installed). Emoji may remain inline in card content and tags.

### Anti-Slop Directives

- NO gradient text on more than one heading per page. The hero headline may use a subtle gradient; everything else uses solid colors.
- NO uniform border-radius everywhere. Use `0.75rem` (12px) for cards, `0.5rem` (8px) for buttons and badges, `1rem` (16px) for large containers, `0.375rem` (6px) for inline code.
- NO `hover:scale-[1.02]` on cards. Use border-color transitions and subtle shadow lifts instead. Scale transforms on cards are a template tell.
- NO raw rgba inline styles scattered through JSX. All colors must be CSS custom properties defined in globals.css and consumed via Tailwind or var().
- NO three-dot window chrome (red/yellow/green circles) on code blocks unless the component is explicitly simulating a terminal window (CommandBlock, ChatDemo). Other code displays use a minimal header.
- NO `text-white/60` or `text-white/40` opacity utilities for text. Use the semantic text variables (--text-secondary, --text-tertiary).
- The cheatsheet page must NOT look like a default Tailwind card grid. Add visual hierarchy through section grouping, sticky category headers, or a sidebar navigation.

### Inspiration

- **Linear.app**: Surface layering, border treatments, glow effects, typography weight.
- **Vercel.com/docs**: Clean prose layout, sidebar navigation, command palette feel.
- **Raycast.com**: Card hover states, icon quality, dark background sophistication.
- **ui.shadcn.com**: Component polish, consistent spacing, muted color usage.
- **Resend.com**: Editorial hero sections, typographic boldness.

## Features (prioritized)

### Must-Have (Sprint 1 -- Foundation)

1. **Design Token System**: Extract all colors, spacing, typography, and border-radius into CSS custom properties in globals.css. Define light-mode tokens as well (even if unused now) for future-proofing. Acceptance: Every component references tokens, zero hardcoded color values in JSX.

2. **Typography Upgrade**: Load Inter (variable) and JetBrains Mono via `next/font/google`. Apply the typographic scale defined above. Acceptance: Hero heading uses clamp(), body text is 15px/1.6, all code uses JetBrains Mono, letter-spacing is tightened on headings.

3. **Premium Navigation Bar**: Redesign Navbar with glass effect, refined spacing, active route indicator (subtle bottom border or background highlight), and a keyboard shortcut hint (Cmd+K style) that visually suggests a command palette. The logo should use the hexagon icon rendered as SVG, not emoji. Acceptance: Navbar has blur backdrop, active state is visible, looks distinct from a template navbar.

4. **Hero Section Redesign**: Full-bleed hero with dot-grid background pattern, a large glow blob behind the headline, tighter typographic hierarchy, and a single refined gradient on the main headline. Stats should feel integrated (not a separate grid) -- consider inline or pill-style presentation. Acceptance: Hero feels editorial and weighty. Background has texture. Stats are visually connected to the hero copy.

5. **Scenario Card Redesign**: Replace the uniform card grid with a layout that has visual hierarchy. The first scenario ("beginner") should be a featured/hero card spanning wider. All cards get new hover states (border glow + shadow lift, no scale). Difficulty badges should use the micro-label style. Command tags should feel like keyboard shortcuts, not generic code badges. Acceptance: Cards have 3+ distinct visual layers (bg, border, shadow). Hover transitions are smooth (200-300ms ease). No two cards look identical even with similar content.

6. **Expert Section Redesign**: Separate the expert scenarios more dramatically from the main scenarios. Consider a different background tone, a horizontal rule with label, or a "level up" visual break. Cards should have a distinct treatment from beginner/intermediate cards (perhaps a subtle animated border or different surface treatment). Acceptance: Expert section feels like a distinct "tier" of content.

7. **Command Block Redesign**: Keep the terminal simulation but refine it. Use a tighter header with a monospace label, remove the three-dot chrome if the context is not a full terminal (use it only for ChatDemo), add a subtle syntax highlighting feel by coloring the command name vs arguments differently. The copy button should have a checkmark animation on success. Acceptance: Command blocks feel like a premium code editor, not a generic terminal widget.

8. **ChatDemo Redesign**: Elevate the conversation UI. User messages should right-align with a subtle blue tint. Claude messages should left-align with a violet tint matching the brand. Avatars should use Lucide icons or initials in a more refined circle. Add a subtle "typing" indicator animation. Acceptance: Chat demo looks like a polished product screenshot, not a prototype.

9. **Cheatsheet Page Redesign**: The 71-card grid needs structure. Group cards by category with sticky section headers. The search input should feel like a command palette (centered, prominent, with keyboard shortcut hint). Category filter pills should have active states with the category color as background at 15% opacity. Empty state should have more personality. Acceptance: Finding a command among 71 feels fast and oriented. Categories are visually separated. Search has focus ring animation.

10. **Cheatsheet Detail Page Redesign**: The command detail page needs an editorial layout. The header should be bold with the command name prominent. Sections (what it does, when to use, prompt example, Claude response) should use alternating subtle background treatments or distinct left-border accents. The prompt example block should feel like a premium code editor. Acceptance: Detail page reads like well-designed documentation (think Stripe or Vercel docs).

11. **StepFlow Component Redesign**: The timeline/stepper should use a continuous vertical line with node circles that pulse or glow at the current/active step. Steps should have better content spacing and the command code should be displayed in a mini CommandBlock. Acceptance: StepFlow feels like an interactive tutorial stepper, not a bullet list with circles.

12. **Footer Redesign**: Minimal but refined footer with subtle border, centered credit, and perhaps a "back to top" action. Should match the premium feel without being overdesigned. Acceptance: Footer is not an afterthought.

### Should-Have (Sprint 2 -- Polish)

13. **Page Transition Animations**: Use CSS `@view-transition` or a lightweight approach for smooth page transitions between scenario pages. The content area should fade/slide in. Acceptance: Navigation between pages feels smooth, not jarring.

14. **Scroll-Triggered Reveals**: Sections on the home page and scenario pages should fade in and slide up slightly as they enter the viewport. Use IntersectionObserver, not a heavy library. Acceptance: Content reveals feel intentional and polished but not distracting. Reduced-motion users see no animation.

15. **Keyboard Navigation**: Add visible focus rings that match the brand color. Tab navigation should work through all interactive elements. The search input on the cheatsheet should be focusable via Cmd+K / Ctrl+K. Acceptance: Full keyboard navigability with visible, attractive focus states.

16. **Responsive Excellence**: All pages must look premium on mobile (375px), tablet (768px), and desktop (1440px). Navigation collapses into a hamburger/slide-out on mobile. Card grids adapt from 1 to 2 to 3 columns. Hero text scales with clamp(). Acceptance: Mobile experience feels like a native app, not a shrunken desktop site.

17. **Breadcrumb Component**: Replace the inline breadcrumb text with a proper component using Lucide ChevronRight icons, consistent styling, and hover states. Used on scenario pages and cheatsheet detail pages. Acceptance: Breadcrumbs look designed and are reusable.

18. **Code Syntax Highlighting**: Within CommandDetail's prompt examples and Claude response blocks, apply lightweight syntax coloring (different colors for commands, arguments, flags, comments). Can be done with regex-based span wrapping, no need for a full highlighter library. Acceptance: Code blocks have at least 3 distinct token colors.

### Nice-to-Have (Sprint 3 -- Delight)

19. **Command Palette**: Implement a Cmd+K / Ctrl+K command palette modal for quick navigation to any scenario, cheatsheet command, or page. Use the cheatsheet data as the command source. Acceptance: Opens on keyboard shortcut, has search, navigates on selection, closes on Escape.

20. **Progress Tracking**: Visual indicator on the home page showing which scenarios the user has visited (localStorage). Subtle checkmark or progress bar on visited cards. Acceptance: State persists across sessions. Visual treatment is subtle, not gamified.

21. **Table of Contents**: On longer scenario pages and cheatsheet detail pages, add a floating right-sidebar table of contents that highlights the current section. Acceptance: TOC is sticky, highlights scroll position, and is collapsible on smaller screens.

22. **Animated Hero Visual**: A subtle animated element in the hero -- perhaps a slowly rotating hexagon grid, floating code snippets, or a gentle particle effect using CSS only (no canvas/WebGL). Acceptance: Animation is performant (compositor-only properties), subtle, and respects reduced-motion.

23. **Theme Toggle Prep**: While not implementing light mode now, add the CSS custom property structure and a toggle button (disabled/coming-soon state) that signals the design system supports theming. Acceptance: All components use CSS variables that could be swapped for light-mode values.

24. **Micro-interactions Collection**: Copy button checkmark animation, button press states (slight scale down on active), search clear button fade, category filter pill transitions, link underline animations. Acceptance: At least 6 distinct micro-interactions exist across the app.

## Technical Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 + CSS custom properties in globals.css. No additional CSS framework.
- **Fonts**: `next/font/google` for Inter (variable) and JetBrains Mono
- **Icons**: Lucide React (already installed) -- replace emoji in headings and navigation with Lucide icons
- **Animations**: CSS transitions and keyframes only. IntersectionObserver for scroll reveals. No external animation library.
- **State**: React useState/useMemo for client components. localStorage for progress tracking.
- **Testing**: Vitest + Testing Library (existing setup)
- **Key constraint**: No new runtime dependencies beyond what is already in package.json. Lucide is already available. Font loading via next/font adds no bundle cost.

## Evaluation Criteria

### Design Quality (weight: 0.3)

What makes this app's design "good":
- Surface layering is visible: at least 3 distinct elevation levels (base, surface-1, surface-2) with clear visual separation
- Typography has character: headings feel tight and bold, body text is comfortable to read, code text is distinct
- Color is used semantically: accent colors communicate meaning (difficulty, category), not just decoration
- Hover states are designed: every interactive element has a distinct, animated hover state
- The hero section has visual weight and atmosphere (grain, glow, pattern)
- No page looks like an unmodified Tailwind template

### Originality (weight: 0.2)

What would make this feel unique:
- The hexagon motif (from the ECC logo "hexagon") appears as a subtle design thread (logo, background pattern, section dividers)
- The command palette / keyboard shortcut aesthetic pervades the UI (monospace accents, keyboard-key styled badges, terminal references)
- The Chinese typography is treated with care (proper line-height for CJK, appropriate font fallbacks including "Noto Sans TC")
- The transition from "beginner" to "expert" scenarios has a clear visual escalation

### Craft (weight: 0.3)

What polish details matter:
- Transitions use appropriate easing (ease-out or custom cubic-bezier, not linear)
- All transitions are 150-300ms, never instant or sluggish
- Focus states exist on all interactive elements
- Empty states (search with no results) are designed, not afterthoughts
- Loading/skeleton states exist where appropriate
- No layout shift on page load (fonts are preloaded, images have dimensions)
- Scrollbar is styled to match the dark theme
- Reduced-motion preferences are respected

### Functionality (weight: 0.2)

Critical user flows:
- **Home to scenario**: User clicks a scenario card, arrives at scenario page with breadcrumb, reads through steps, navigates to next scenario
- **Cheatsheet search**: User opens cheatsheet, types a query, sees filtered results, clicks a command, reads the detail page, navigates back
- **Category filter**: User clicks a category pill, sees only that category's commands, clears filter, sees all
- **Mobile navigation**: User on mobile opens the menu, navigates to a page, menu closes
- **Copy command**: User clicks copy on a CommandBlock, sees confirmation, text is in clipboard

## Sprint Plan

### Sprint 1: Foundation -- Design System + Core Surfaces

- **Goals**: Establish the design token system, upgrade typography, and redesign the three highest-impact surfaces (navbar, hero, cards)
- **Features**: #1, #2, #3, #4, #5, #6, #7
- **Definition of done**:
  - globals.css contains the full token system with no hardcoded colors remaining in any component
  - Inter and JetBrains Mono are loaded and applied
  - Home page looks premium and distinct from the current version
  - All scenario cards have refined hover states
  - Navbar has glass effect and active state

### Sprint 2: Content Pages + Polish

- **Goals**: Redesign all content-heavy pages (scenarios, cheatsheet, detail) and add interaction polish
- **Features**: #8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18
- **Definition of done**:
  - Cheatsheet page has category grouping and refined search
  - Scenario pages read like editorial content
  - ChatDemo and StepFlow look polished
  - Page transitions exist
  - Full keyboard navigability
  - Mobile layout is premium quality

### Sprint 3: Delight + Extras

- **Goals**: Add differentiating features that elevate from "good redesign" to "impressive product"
- **Features**: #19, #20, #21, #22, #23, #24
- **Definition of done**:
  - Command palette works
  - Progress tracking persists
  - Micro-interactions are present throughout
  - At least one animated hero element exists
  - Design system is theme-ready
