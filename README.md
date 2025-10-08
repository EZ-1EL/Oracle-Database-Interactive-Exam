# Oracle Database Fundamentals — Interactive Exam

An interactive, mobile-friendly exam (83 questions) covering Oracle Database Fundamentals. Questions are in English with Arabic hints/explanations. Built as a single-page app using plain HTML, modern CSS, and vanilla JavaScript.

## Preview
- Timer-driven quiz experience
- Multiple choice, true/false, and ordering questions
- Instant feedback with hints (Arabic)
- Review mode to see all correct answers and hints
- Works great on mobile

## Getting Started

### Run locally
No build step required. Just open `test.html` in your browser:
1. Download or clone the repository
2. Double‑click `test.html` (or right‑click → Open With → your browser)

### File structure
```
Onlone Exam Test/
  ├─ test.html     # Main HTML file (links external CSS/JS)
  ├─ styles.css    # Modern UI styles (glassy theme, animations, responsive)
  └─ app.js        # Quiz logic and data (83 questions)
```

## Development
- All styles live in `styles.css` (CSS variables at `:root` for easy theming)
- All behavior lives in `app.js` (timer, rendering, handlers, scoring)
- Edit questions inside `questionsMaster` in `app.js`

### Theming
You can quickly tweak the theme by changing CSS variables in `styles.css` under `:root` (e.g., `--accent`, `--accent-2`, `--bg`).

## Deploy
### GitHub Pages
1. Push this repository to GitHub
2. Go to Settings → Pages
3. Source: “Deploy from a branch”
4. Branch: `main` / Folder: `/root` → Save
5. Your site will be published at `https://<username>.github.io/<repo>/`

## License
This project is provided for educational purposes. Review your organization’s policies before using in production.

## Credits
Developed by Asim — EZEL.
