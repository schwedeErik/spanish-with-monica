# Spanish with Monica

Conversion-focused landing page for Monica’s online Spanish lessons (CEFR A1–C1).

Built with Next.js (App Router), TypeScript, Tailwind CSS, and a Cal.com booking embed.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Static build

GitHub Pages serves a static export (no Node server):

```bash
GITHUB_PAGES=true npm run build
```

Output lands in `out/`.

## Deploy on GitHub Pages

1. Push this repo to GitHub (public or with Pages enabled).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`/`master` (or run the **Deploy to GitHub Pages** workflow manually).

The site will be available at:

`https://<your-username>.github.io/spanish-with-monica/`

Before going live, replace the Cal.com iframe placeholder in `app/page.tsx` with Monica’s real booking URL.
