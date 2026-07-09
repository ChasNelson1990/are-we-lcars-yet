# Are We LCARS Yet?

A tongue-in-cheek feature comparison of every Star Trek computer generation — NX-01, Constitution Class, Galaxy Class, Intrepid Class, and the Discovery/Picard/SNW era — benchmarked against what Claude, ChatGPT, and Gemini can actually do today.

**Live site:** https://chasnelson1990.github.io/are-we-lcars-yet/

## What's here

A single static page (`public/index.html` + `public/assets/`) styled after LCARS, the _Star Trek: The Next Generation_ interface language. No build step, no framework — just HTML, CSS, and a little vanilla JS for the stardate clock and the icon/text row toggle.

## Local development

```bash
npm install
npm run format        # auto-format html/css/js/md with Prettier
npm run lint           # eslint + stylelint + htmlhint
npm run check           # format:check + lint, what CI runs
```

Then just open `public/index.html` in a browser — no server required.

## Tooling

| Tool                                       | Job                                        |
| ------------------------------------------ | ------------------------------------------ |
| [Prettier](https://prettier.io)            | Formatting for HTML, CSS, JS, and Markdown |
| [ESLint](https://eslint.org) (flat config) | Linting `public/assets/*.js`               |
| [Stylelint](https://stylelint.io)          | Linting `public/assets/*.css`              |
| [HTMLHint](https://htmlhint.com)           | Basic markup sanity checks                 |

Config lives in `eslint.config.js`, `.stylelintrc.json`, `.htmlhintrc`, and `.prettierrc.json` at the repo root.

## CI/CD

- **`.github/workflows/ci.yml`** — runs on every push and pull request to `main`: format check + full lint.
- **`.github/workflows/deploy.yml`** — runs on every push to `main`: re-runs the checks, then publishes `public/` to GitHub Pages via `actions/upload-pages-artifact` + `actions/deploy-pages`.

### One-time setup after pushing

GitHub Pages needs to be pointed at Actions as its source before the deploy workflow can publish anything:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or re-run the Deploy workflow from the Actions tab) — the site will publish to `https://chasnelson1990.github.io/are-we-lcars-yet/`.

## License

MIT — see [LICENSE](LICENSE).
