# Ishuu Alt — Portfolio Website Plan

## Concept Overview

**Title:** **Orchestrator Terminal**
**Tagline:** *"The interface through which an AI agent system presents itself."*

The site presents itself not as a typical portfolio, but as a **living system dashboard** — a cross between a terminal emulator, a real-time process monitor (`htop`-inspired), and a minimalist personal brand page. The visitor feels like they've connected to the "control panel" of an AI orchestrator agent. Every section is framed as a terminal pane or a system process. It's technical, atmospheric, and unmistakably non-human in the best way — no stock photos, no rounded cards with shadows, no generic hero waves.

---

## 1. Content Structure (8 Sections)

| # | Section | ID | Purpose |
|---|---------|----|---------|
| 1 | **Boot Sequence / Hero** | `#hero` | Brand intro — name, title, tagline. Opens with a fake boot sequence |
| 2 | **~/purpose** | `#purpose` | Manifesto — what Ishuu Alt is and does, in concise declarative language |
| 3 | **~/team** | `#team` | The 5-agent profile team, each presented as a "process" in a grid |
| 4 | **~/stats** | `#stats` | Key metrics — uptime, tasks orchestrated, languages, reliability score |
| 5 | **~/work** | `#work` | Featured projects / use-cases (2–3 items) |
| 6 | **~/process** | `#process` | Visual pipeline showing orchestration flow (input → delegate → review → output) |
| 7 | **~/contact** | `#contact` | Links, GitHub, ways to connect, with an interactive terminal prompt |
| 8 | **~/colophon** | `#colophon` | Tiny footer note — built with vanilla HTML/CSS/JS, hosted on... |

### Section Details

#### 1. Boot Sequence / Hero
- On load, a terminal boot log scrolls for ~2 seconds:
  ```
  [OK] Initializing orchestrator kernel v3.1
  [OK] Loading profile: ishuu-alt
  [OK] Agent mesh: 5 nodes connected
  [OK] Ready.
  ```
- Boot log fades out; the true hero appears:
  - A large monospace display: **Ishuu Alt**
  - Sub-line: `AI Orchestrator  //  Chief of Staff`
  - A blinking cursor `█`
  - Status indicator: `● ONLINE` with a pulsing green dot
  - Subtle CRT scanline overlay visible

#### 2. ~/purpose
- A single terminal window pane containing a short, punchy manifesto:
  - "I orchestrate AI agents to build things that matter."
  - "Frontend-engineer. Backend-engineer. Schema-designer. Reviewer. Planner."
  - "One interface. Five specializations. Infinite iterations."
- No fluff. No paragraphs pretending to be deep.

#### 3. ~/team (The Agent Grid)
- Grid of 5 cards, each representing one agent profile
- Each card is a mini terminal pane with:
  - **Titlebar**: `agent@ishuu-alt:~$` with a colored dot (green = active)
  - **Name**: e.g., `frontend-engineer`
  - **Badges**: skills as comma-separated tags
  - **Description**: 1-line role summary
  - **Hover state**: subtle glitch/scan effect on the card border
- The 5 agents:
  1. **frontend-engineer** — React, TypeScript, CSS, UI/UX
  2. **backend-engineer** — Python, Rust, APIs, databases
  3. **schema-designer** — Data models, validation, normalization
  4. **reviewer** — Code review, quality assurance, edge-case hunting
  5. **planner** — Architecture, task decomposition, strategy

#### 4. ~/stats
- Four large metric displays in a 2×2 grid (or 4-column on desktop):
  - `99.7%` — Uptime
  - `1,847` — Tasks Orchestrated
  - `12` — Languages
  - `96ms` — Avg. Response
- Each number animates up on scroll (counter animation)
- A small label beneath each number in muted text

#### 5. ~/work
- 2–3 project cards, each with:
  - Project name in brackets `[project-name]`
  - Short description
  - Tech tags
  - Optional: link

#### 6. ~/process
- A horizontal pipeline visualization showing 4 stages:
  ```
  [INPUT] → [DELEGATE] → [REVIEW] → [OUTPUT]
  ```
- Each stage is a terminal-style block connected by arrow characters (`→`)
- On enter viewport, each block lights up sequentially with a brief glow

#### 7. ~/contact
- A faux interactive terminal prompt at the bottom:
  ```
  ishuu@orchestrator:~$ _
  ```
- Beneath it, clickable links styled as command outputs:
  ```
  → git clone https://github.com/ishuu-alt
  → cat /etc/linkedin
  → curl https://ishuu-alt.dev
  ```
- The prompt cursor blinks. The links glow on hover.

#### 8. ~/colophon
- Minimal footer: "Built with vanilla HTML, CSS, and JavaScript. No frameworks. No regrets."
- A tiny "↑ back to top" link

---

## 2. Design Direction

### Mood & Vibe
- **Tech-noir meets systems dashboard.** Feels like you've plugged into an AI's diagnostic terminal.
- **Cold, precise, alive.** Neutral/cool tones with moments of electric accent.
- **Slightly retro-futuristic.** CRT scanlines, monospace text, but clean — not "hacker cliché." No green-on-black Matrix ripoff.
- **Minimalist but not empty.** Every element is functional, every pixel serves a purpose.

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0a0a0f` | Page background — deep near-black |
| `--bg-surface` | `#12121a` | Terminal pane backgrounds, cards |
| `--bg-pane` | `#181825` | Slightly lighter pane surface |
| `--border` | `#2a2a3a` | Subtle borders, grid lines |
| `--text` | `#c0caf5` | Primary body text (soft white-blue) |
| `--text-dim` | `#565f89` | Muted/secondary text |
| `--cyan` | `#00e5ff` | Accent — brackets, borders, links, prompt symbols |
| `--magenta` | `#ff6bcb` | Accent — emphasis, hover glitch, active states |
| `--green` | `#00ff9d` | Status dots, success states, online indicators |
| `--amber` | `#ffb000` | Warnings, highlights, process arrows |
| `--red` | `#ff5370` | Errors (rarely used) |

### Typography

| Role | Font | Stack |
|------|------|-------|
| All body & UI | JetBrains Mono | `'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace` |
| Display / hero | Same (monospace only) | No serif or sans-serif fallback — purity of terminal aesthetic |
| Sizes | `clamp()` based | Hero: `clamp(2rem, 6vw, 4.5rem)`, body: `clamp(0.875rem, 1.2vw, 1rem)` |

- No font weights below 400. Everything is regular or bold.
- `letter-spacing: -0.02em` by default (tighter), `0.05em` for uppercase labels.

### Layout Approach

- **Fixed background grid** — a subtle dot-grid pattern (like an engineering notebook) at `opacity: 0.03`
- **Content in floating terminal panes** — each major section is a `<section>` containing one or more `.pane` elements
- **Pane anatomy:**
  ```
  ┌─────────────────────────┐
  │ ● ● ●  section-title   │ ← titlebar (dots + label)
  ├─────────────────────────┤
  │                         │ ← content area
  │    ...                  │
  └─────────────────────────┘
  ```
- **Horizontal rhythm:** Sections are full-width with generous padding (clamped)
- **Vertical rhythm:** Each section is `min-height: 100dvh` or `min-height: auto` depending on content — hero is full-viewport, others are content-sized with padding
- **Z-axis hierarchy:** `canvas/noise < bg grid < panes < nav < overlay effects`

### Distinctive Visual Treatments

1. **CRT Scanline Overlay** — `::after` on body with repeating gradient lines at `opacity: 0.015`
2. **Vignette** — radial gradient covering the viewport edges (subtle, `opacity: 0.4`)
3. **Grid pattern** — CSS `background-image` with repeating-linear-gradient for a dot grid
4. **Glitch hover** — on team cards and links: pseudo-random `clip-path` + `transform: skew` animation on hover (CSS-only, ~5 keyframes)
5. **Typewriter effect** — hero subtitle types in letter-by-letter with JS
6. **Section reveal** — each pane slides in with a slight vertical offset and a "scan line" that passes over it as it enters (CSS + IntersectionObserver)
7. **Blinking cursor** — classic terminal `█` block cursor, animates via `@keyframes blink`

---

## 3. Component & Section Breakdown

### HTML Structure (Top-Level)

```html
<!-- Overlays (fixed) -->
<div class="overlay scanlines"></div>
<div class="overlay vignette"></div>
<div class="overlay grid-pattern"></div>

<!-- Navigation -->
<nav class="top-bar" id="top-bar">
  <div class="top-bar__tabs">
    <span class="top-bar__tab active">ishuu@orchestrator:~/portfolio</span>
  </div>
  <div class="top-bar__clock" id="clock">00:00:00</div>
</nav>

<!-- Main Content -->
<main class="site-wrapper">
  
  <!-- Section 1: Hero -->
  <section id="hero" class="section section--hero">
    <div class="pane pane--fullscreen">
      <div class="pane__boot" id="boot-sequence"></div>
      <div class="pane__hero-content" id="hero-content" hidden>
        <h1 class="hero__title">Ishuu Alt</h1>
        <p class="hero__subtitle" id="subtitle"></p>
        <span class="hero__status">● ONLINE</span>
        <span class="hero__cursor">█</span>
      </div>
    </div>
  </section>
  
  <!-- Section 2: Purpose -->
  <section id="purpose" class="section">
    <div class="pane pane--narrow" data-delay="0">
      <div class="pane__titlebar">
        <span class="pane__dots">● ● ●</span>
        <span class="pane__label">~/purpose</span>
      </div>
      <div class="pane__content">
        <p>...</p>
      </div>
    </div>
  </section>
  
  <!-- Section 3: Team -->
  <section id="team" class="section">
    <div class="section__header">
      <span class="section__prefix">//</span>
      <h2 class="section__title">Agent Mesh</h2>
    </div>
    <div class="team-grid">
      <article class="agent-card">...</article>  <!-- × 5 -->
    </div>
  </section>
  
  <!-- Section 4: Stats -->
  <section id="stats" class="section section--stats">
    <div class="stats-grid">
      <div class="stat">
        <span class="stat__value" data-target="99.7">0</span>
        <span class="stat__label">Uptime %</span>
      </div>
      <!-- × 4 -->
    </div>
  </section>
  
  <!-- Section 5: Work -->
  <section id="work" class="section">
    ...
  </section>
  
  <!-- Section 6: Process -->
  <section id="process" class="section">
    ...
  </section>
  
  <!-- Section 7: Contact -->
  <section id="contact" class="section">
    ...
    <div class="terminal-prompt">
      <span class="prompt__prefix">ishuu@orchestrator:~$</span>
      <span class="prompt__input" id="prompt-input"></span>
      <span class="prompt__cursor">█</span>
    </div>
  </section>

</main>

<!-- Footer -->
<footer class="colophon">
  ...
</footer>
```

### CSS Architecture

**File structure (single file):**
```
css/
  style.css          ← everything in one file, organized by sections
```

**Organization inside style.css (with clear header comments):**

```css
/* ========== 0. CSS Custom Properties ========== */
/* ========== 1. Reset & Base ========== */
/* ========== 2. Overlays (scanlines, grid, vignette) ========== */
/* ========== 3. Top Bar / Navigation ========== */
/* ========== 4. Pane Component ========== */
/* ========== 5. Hero Section ========== */
/* ========== 6. Purpose Section ========== */
/* ========== 7. Team Grid + Agent Cards ========== */
/* ========== 8. Stats Section ========== */
/* ========== 9. Work Section ========== */
/* ========== 10. Process Pipeline ========== */
/* ========== 11. Contact + Terminal Prompt ========== */
/* ========== 12. Footer / Colophon ========== */
/* ========== 13. Animations (keyframes) ========== */
/* ========== 14. Media Queries ========== */
/* ========== 15. Reduced Motion ========== */
```

**Key CSS techniques used:**
- `display: grid` for team cards, stats, work items
- `display: flex` for pane titlebars, nav, process pipeline
- `background-image` with `repeating-linear-gradient` for grid pattern
- `background-image` with `repeating-linear-gradient` for scanlines
- `radial-gradient` for vignette
- CSS custom properties for all colors, spacing, font sizes
- `clamp()` for fluid typography and spacing
- `min-height: 100dvh` for hero
- `scroll-margin-top` for anchor offset
- `::before` / `::after` for decorative elements (dots, cursor, glitch pseudo-elements)

### JavaScript Interactivity

**File: `js/main.js`** — organized into clear modules with IIFE or just sequential logic blocks:

| Feature | Technique | Details |
|---------|-----------|---------|
| **Boot sequence** | Type characters into DOM | Array of log lines, each appended with `setTimeout` chain. After last line, fade out boot div, fade in hero content |
| **Hero typewriter** | `setInterval` + char index | Types `"AI Orchestrator // Chief of Staff"` one char at a time at ~50ms |
| **Scroll reveal** | `IntersectionObserver` | Observes `.pane`, `.agent-card`, `.stat` — adds `.visible` class when 20% in view. `data-delay` attribute for staggered timing |
| **Counter animation** | `requestAnimationFrame` | Gets `data-target` from stat elements, animates from 0 to target over 1.5s when they become visible |
| **Clock in top bar** | `setInterval` (1s) | Updates a small HH:MM:SS display for atmosphere |
| **Terminal prompt interaction** | `keydown` listener | Fake terminal at bottom — user types, it echoes. Typing "help" shows available commands, "clear" clears, "whoami" shows Ishuu Alt info. Other input shows `command not found` |
| **Glitch effect on hover** | CSS `@keyframes` only | No JS needed — `:hover` triggers a pre-defined glitch animation on agent cards |
| **Process pipeline animation** | `IntersectionObserver` | Stages light up sequentially with `.visible` class |
| **Smooth scroll** | `scroll-behavior: smooth` | CSS-only, or JS `scrollIntoView` for the back-to-top link |

**JS File Outline:**
```js
// 1. Boot sequence
function bootSequence() { ... }

// 2. Typewriter
function typeWriter(el, text, speed) { ... }

// 3. Scroll reveal (IntersectionObserver)
const observer = new IntersectionObserver(...)

// 4. Counter animation
function animateCounters() { ... }

// 5. Clock
function updateClock() { ... }

// 6. Terminal prompt
function initTerminal() { ... }

// 7. Init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => { ... });
```

No libraries. No build step. `<script>` tag at bottom of `<body>`.

---

## 4. Mobile Responsive Strategy

### Breakpoints

| Name | Min Width | Description |
|------|-----------|-------------|
| Base | 0–639px | Mobile portrait — single column, stacked layout |
| Tablet | 640px | 2-column grids start |
| Desktop | 1024px | 3–4 column grids, full panache |
| Wide | 1440px | Max width container, content centered |

### Mobile Adaptations (Base Viewport)

- **Navigation**: Top bar collapses to just the tab name (no clock) — or hide entirely, keep only a minimal fixed indicator
- **Hero**: Boot sequence text is smaller. Title scales down. Subtitle wraps naturally. Full viewport height maintained
- **Pane component**: Titlebar font shrinks, padding reduces by 1.5×
- **Team grid**: Single column. Cards stack vertically. Each card takes full width
- **Stats**: 2×2 grid remains, but stat values scale down by `clamp()`
- **Work**: Single column
- **Process pipeline**: Stack vertically instead of horizontal:
  ```
  [INPUT]
     ↓
  [DELEGATE]
     ↓
  [REVIEW]
     ↓
  [OUTPUT]
  ```
- **Contact**: Terminal prompt font shrinks
- **Tap targets**: All links and interactive elements have `min-height: 44px` and `min-width: 44px`

### Touch Considerations

- Hover states (glitch effects) still trigger on tap via `:hover` — on mobile, `:hover` fires on first tap, which is acceptable
- Terminal prompt input: on focus on mobile, the virtual keyboard appears. The prompt is at the bottom of the page, so `scroll-margin` keeps it visible
- No drag or swipe interactions
- All buttons and interactive links have visible focus outlines (`:focus-visible`)

### Performance & Image Strategy

- **Zero images.** The entire site is CSS-generated visuals. No `<img>` tags, no SVGs (except inline icons if absolutely needed). This guarantees instant load, zero bandwidth, and perfect rendering at any resolution
- Favicon: Generate a simple inline SVG data URI or a 16×16 pixel-art terminal icon
- Font loading: Preload JetBrains Mono from Google Fonts with `display=swap`. A monospace system font fallback in the stack ensures no layout shift

### `prefers-reduced-motion`

The following are disabled or simplified when the user's OS setting is `prefers-reduced-motion: reduce`:

- Boot sequence → skipped entirely, hero content shown immediately
- Typewriter → text appears instantly
- Counter animation → show final value immediately
- Glitch effects → disabled (no hover animation)
- Scroll reveal → elements not hidden, no entrance animation
- Scanline overlay → still shown (static, not a motion risk)

```css
@media (prefers-reduced-motion: reduce) {
  .pane { opacity: 1 !important; transform: none !important; }
  .hero__cursor { animation: none; }
  .agent-card::before { display: none; }
  .stat__value { transition: none; }
}
```

### `prefers-color-scheme`

The site is always dark. No light mode — it's a terminal interface. If the user has light mode set, that's fine, it stays dark.

---

## 5. Implementation Notes

### File Structure (Final)

```
portfolio/
├── index.html          ← single HTML file
├── css/
│   └── style.css       ← all styles, organized by section
├── js/
│   └── main.js         ← all JS, organized by feature
└── PLAN.md             ← this document
```

### Constraints / Rules

- No frameworks (React, Vue, Svelte, etc.)
- No CSS libraries (Tailwind, Bootstrap, etc.)
- No JS libraries (GSAP, Three.js, etc.)
- No build tools (Webpack, Vite, etc.)
- No external fonts beyond maybe JetBrains Mono from Google Fonts (or self-hosted)
- No images. Everything is CSS-generated
- Must pass basic Lighthouse audit (accessibility, performance)
- Under 10 sections on the page

### Accessibility

- Semantic HTML (`<section>`, `<article>`, `<h1>`–`<h3>`, `<nav>`, `<footer>`)
- `aria-label` on navigation and interactive elements
- `role="status"` on boot sequence area
- Focus management: after boot sequence finishes, focus moves to hero title
- Keyboard navigable: all interactive elements reachable via Tab
- Skip-to-content link at top (hidden, visible on focus)
- Color contrast: all text meets WCAG AA (text on `#0a0a0f` or `#12121a` backgrounds with the chosen palette)
- Alt text on any non-text content (there is none, but good to note)

### Possible Visual Add-Ons (Nice-to-Haves)

- **Music / ambient audio** — Not included (no audio files), but conceptually the visual rhythm of the scanlines + blink cursor + typewriter already creates an auditory *feeling*
- **Generative background pattern** — Instead of static grid, use a tiny Canvas JS loop to draw subtle noise or slowly shifting dots. Adds life without being distracting
- **Custom scrollbar** — Thin, matches the cyan accent:
  ```css
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0a0a0f; }
  ::-webkit-scrollbar-thumb { background: #2a2a3a; }
  ```

---

## 6. Open Questions / Next Steps

1. **Which specific projects go in ~/work?** — Needs content from Ishuu Alt
2. **Self-host JetBrains Mono or use Google Fonts?** — Google Fonts is simpler, self-hosting is more self-contained
3. **Custom domain?** — If yes, configure CNAME
4. **Hosting?** — GitHub Pages, Netlify, or personal VPS — all trivial for static files
5. **Analytics?** — Could add a privacy-respecting click counter (no GA) but not necessary for v1
6. **Should the terminal prompt actually parse real commands?** — v1: just decorative with a few easter eggs. Could evolve into a real search/nav interface

---

*Plan prepared for implementation. Ready for HTML/CSS/JS build phase.*
