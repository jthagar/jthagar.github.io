# jthagar.github.io

Personal portfolio site, built with [Hugo](https://gohugo.io/) (extended) and deployed to [GitHub Pages](https://pages.github.com/).

## Local development

Install [Hugo Extended](https://gohugo.io/installation/) (needed for Sass). Then:

```bash
hugo server -D
```

Open the URL Hugo prints (usually `http://localhost:1313/`).

To produce a production build:

```bash
hugo --minify --gc
```

Output is written to `public/` (ignored by git).

## UI & JavaScript

- **Layout**: Single scrolling page with a **sticky top bar** (logo, anchor links, theme toggle). **Mobile** uses a slide-in menu and body scroll lock. Content uses a centered **max-width container**; sections are stacked vertically (no full-screen “one panel at a time” mode).
- **Behavior** (`assets/js/main.ts`, bundled with Hugo’s `js.Build`): smooth scrolling to in-page anchors, **scroll spy** (nav highlights the section in view), hash updates, dark/light theme with `localStorage` + `prefers-color-scheme`, mobile menu (Escape to close), Material-style **ink ripples** on interactive controls, and `prefers-reduced-motion` support.
- **Look & feel**: [Material Design 3](https://m3.material.io/)–style tokens (surface, containers, elevation), **Roboto** + **Material Symbols**. **MUI** targets the same system but requires React for `@mui/material`.

**If you want real MUI components later:** add a Vite + React (or Next.js) app, install `@mui/material` and `@emotion/react`, and either embed the SPA in a Hugo page or migrate the site. Intermediate options: [MUI Base](https://mui.com/base-ui/) with React, or [Material Web](https://github.com/material-components/material-web) components without React.

**Other UI ideas (non-blocking):** skill chips instead of bars, MD3 **filled tonal buttons** sitewide, **snackbar** for “Email copied”, card elevation on portfolio tiles, and optional **scroll-snap** if you move from stacked sections to a scrolling layout.

## Editing content

| What | Where |
|------|--------|
| Site title, bio, links, email | `hugo.toml` → `[params]` |
| Skills and percentages | `data/skills.yaml` |
| Stat tiles (hero/about) | `data/stats.yaml` |
| Timeline | `data/timeline.yaml` |
| Portfolio cards | `data/projects.yaml` |
| Styles | `assets/css/` (Sass) |
| Layout | `layouts/` |

The hero image is `static/img/headshot.jpg` (copied from `.personal` for the live site). The downloadable CV is `static/Resume-JH-2026.pdf`. You can swap or compress these files under `static/` as needed.

Optional: regenerate from private copies in `.personal/` (that folder is gitignored).

## Deployment

The workflow in `.github/workflows/hugo.yml` builds on every push to `main` and deploys with GitHub Pages. In the repository **Settings → Pages**, set the source to **GitHub Actions** if it is not already.

## License

See [LICENSE](LICENSE).
