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

## Editing content

| What | Where |
|------|--------|
| Site title, bio, links, email | `hugo.toml` → `[params]` |
| Skills and percentages | `data/skills.yaml` |
| Stat tiles (hero/about) | `data/stats.yaml` |
| Timeline | `data/timeline.yaml` |
| Portfolio cards | `data/projects.yaml` |
| Writing / featured links | `data/blog.yaml` |
| Styles | `assets/css/` (Sass) |
| Layout | `layouts/` |

Replace `static/img/avatar.svg` with your photo, or point the image in `layouts/index.html` to a file under `static/`.

Optional CV download: set `cvURL` in `hugo.toml` to a PDF path under `static/` (for example `"/cv/resume.pdf"`).

## Deployment

The workflow in `.github/workflows/hugo.yml` builds on every push to `main` and deploys with GitHub Pages. In the repository **Settings → Pages**, set the source to **GitHub Actions** if it is not already.

## License

See [LICENSE](LICENSE).
