# 📋 Feedback Friday Kit

**Generate structured, beautiful feedback request pages in 60 seconds.**  
Copy to Reddit, share a link, or download a standalone page.

[![Deploy to GitHub Pages](https://github.com/Imadjalloul/feedback-friday-kit/actions/workflows/deploy.yml/badge.svg)](https://github.com/Imadjalloul/feedback-friday-kit/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](LICENSE)

🔗 **[Try it live →](https://imadjalloul.github.io/feedback-friday-kit/)**

---

## The Problem

Builders want feedback but post badly — no structured questions, no screenshots, no context. Reviewers don't know what to focus on, and the feedback you get back is vague and unhelpful.

## The Solution

Feedback Friday Kit walks you through a 4-step wizard to create a structured feedback request with:

- **Project info** — name, tagline, problem statement
- **Demo** — screenshots (drag & drop), videos, live demo links
- **Audience** — target user, use case, current stage
- **3 focused questions** — with quick-fill templates

Then export it however you need:

| Export | Description |
|--------|-------------|
| 📋 **Reddit Post** | Formatted markdown, one-click copy |
| 🔗 **Shareable Link** | URL that renders a beautiful feedback page |
| 📥 **Download HTML** | Self-contained page with embedded images |

## Screenshots

> _Coming soon — try the [live demo](https://imadjalloul.github.io/feedback-friday-kit/) in the meantime!_

## Tech Stack

- **Vite** — fast builds, hot reload
- **Vanilla JS** — zero framework overhead
- **LZ-String** — compresses form data into shareable URLs
- **GitHub Pages** — free hosting, auto-deploy

## Getting Started

```bash
# Clone
git clone https://github.com/Imadjalloul/feedback-friday-kit.git
cd feedback-friday-kit

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build
```

## Project Structure

```
├── index.html              # Landing + wizard + export
├── share.html              # Renders shared feedback pages
├── vite.config.js          # Multi-page Vite config
├── src/
│   ├── main.js             # State management, routing
│   ├── wizard.js           # 4-step form wizard
│   ├── preview.js          # Live preview renderer
│   ├── upload.js           # Drag & drop media upload
│   ├── export.js           # Reddit/link/HTML export
│   ├── reddit-formatter.js # Reddit markdown generator
│   ├── page-generator.js   # Standalone HTML exporter
│   ├── share-main.js       # URL hash decoder
│   ├── style.css           # Design system
│   └── share.css           # Share page styles
└── .github/workflows/
    └── deploy.yml          # GitHub Pages auto-deploy
```

## Contributing

PRs welcome! Feel free to open an issue or submit a pull request.

## License

[MIT](LICENSE)

---

Built for makers who want better feedback. 🚀
