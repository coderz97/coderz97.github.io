# Jordan Lee — Portfolio

A single-page, interactive portfolio site built as a "lab notebook" — numbered
cells, a hoverable career chart drawn like a training curve, and hand-scrawled
margin notes. Pure HTML/CSS/JS, no build step, no framework.

## Files

```
index.html   → structure & content (placeholder copy — replace with your own)
style.css    → design system (colors/fonts as CSS variables at the top)
script.js    → interactivity + editable DATA arrays (career + skills)
assets/      → put resume.pdf and portrait.jpg here
```

## 1. Customize the content

Everything you'll want to change lives in three places:

- **Text & links** — edit directly in `index.html`. Section by section:
  hero headline, about bio, project cards, contact links.
- **Career timeline** — edit the `CAREER_DATA` array at the top of `script.js`.
  Each entry is `{ year, impact, role, company, note }`. `impact` is 0–100 and
  controls the point's height on the chart — think of it loosely as
  seniority/scope, not a real metric.
- **Skills heatmap** — edit `SKILLS_DATA` in `script.js`. Each skill is
  `[name, level]` where level is 1–5 and controls the color intensity.
- **Colors & fonts** — edit the `:root` variables at the top of `style.css`
  (`--coral`, `--blue`, `--paper`, etc.) and the Google Fonts `<link>` in
  `index.html` if you want different typefaces.

## 2. Add your assets

Drop these into the `assets/` folder:
- `resume.pdf` — your résumé (linked from the nav bar and hero/contact)
- `portrait.jpg` — your photo for the About section (square works best; if
  it's missing, the site shows a labeled placeholder instead of breaking)

## 3. Host it on GitHub Pages

1. **Create a repository** on GitHub — e.g. `yourname.github.io` (using
   exactly this format gives you a live site at `https://yourname.github.io`)
   or any other name (site will live at `https://yourname.github.io/repo-name`).

2. **Push these files** to the repo root (not inside a subfolder), e.g.:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Turn on Pages**: on GitHub, go to your repo → **Settings** →
   **Pages** (left sidebar) → under "Build and deployment", set
   **Source** to `Deploy from a branch` → pick **`main`** branch,
   **`/ (root)`** folder → **Save**.

4. GitHub will give you a URL (something like
   `https://yourusername.github.io/your-repo/`) — it usually goes live
   within a minute or two. Refresh the Pages settings page if it doesn't
   show up right away.

5. **Custom domain (optional)**: in the same Pages settings, add your domain
   under "Custom domain" and follow GitHub's DNS instructions.

## 4. Local preview

No build tools needed — just open `index.html` in a browser, or serve it
locally so relative paths behave exactly like production:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Notes on the interactive bits

- **Hero canvas**: a lightweight particle field that reacts to cursor
  movement. Pure `<canvas>`, no libraries.
- **Career chart**: hand-rolled SVG (no chart library) so it's easy to
  restyle — look for `careerChart()` in `script.js`.
- **Contact form**: since GitHub Pages is static (no server), the form opens
  the visitor's email client via a `mailto:` link pre-filled with their
  message. If you want real form submissions without a backend, consider a
  service like Formspree or Getform and swap the `submit` handler in
  `script.js` for a `fetch()` call to their endpoint.
- Respects `prefers-reduced-motion` and is keyboard-navigable (chart points
  are focusable and show tooltips on focus).

## Ideas for next customization passes

- Swap the hero "hypothesis" joke for something in your own voice
- Add real project links/repos in the card `<a>` tags
- Add a dark mode toggle (the CSS variables make this a fairly small change)
- Wire the contact form to Formspree for real submissions
- Add a blog/notes section styled as additional notebook cells
