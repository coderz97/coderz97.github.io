# Sreya Tobji — Portfolio

A single-page, warm and approachable portfolio site. Real content, a soft
terracotta/sage/cream palette, a simple timeline for experience, and a
highlights section for certifications, awards, and volunteering. Pure
HTML/CSS/JS, no build step, no framework.

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
  hero headline, about bio, experience timeline, project cards, highlights,
  contact links. The LinkedIn and GitHub links in Contact are placeholders —
  search `placeholder-link` in `index.html` and swap in your real URLs.
- **Skills** — edit the `SKILLS_DATA` array at the top of `script.js` to
  add/remove/reorder skill tags by category.
- **Colors & fonts** — edit the `:root` variables at the top of `style.css`
  (`--terracotta`, `--sage`, `--cream`, etc.) and the Google Fonts `<link>` in
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

- **Scroll reveal**: sections gently fade/rise into view as you scroll,
  respecting `prefers-reduced-motion`.
- **Contact form**: since GitHub Pages is static (no server), the form opens
  the visitor's email client via a `mailto:` link pre-filled with their
  message. If you want real form submissions without a backend, consider a
  service like Formspree or Getform and swap the `submit` handler in
  `script.js` for a `fetch()` call to their endpoint.

## Ideas for next customization passes

- Add your real LinkedIn/GitHub URLs (currently placeholders in Contact)
- Add real project repo links in the project cards
- Add a couple of project screenshots or diagrams if you have them
- Wire the contact form to Formspree for real submissions
- Add a "Publications" or "Writing" section if that becomes relevant
