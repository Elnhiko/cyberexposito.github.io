# Portfolio — Nicolas Exposito

> Cyberpunk-themed personal portfolio · Vanilla HTML/CSS/JS · Hosted on GitHub Pages

[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-181717?logo=github)](https://cyberexposito.github.io)
[![License](https://img.shields.io/badge/License-MIT-00f5ff)](#license)

---

## 📌 About

Personal portfolio showcasing my skills, experience and projects as an IT apprentice specialising in systems & networking administration. Built with no framework — pure HTML, CSS and JavaScript.

---

## ✨ Features

- **Cyberpunk aesthetic** — neon colors, CRT scanlines, grid background, glitch animation
- **Typing effect** — rotating phrases in the hero section
- **Scroll reveal** — sections animate in as you scroll
- **Custom cursor** — crosshair with magenta trailing dot
- **Responsive** — works on desktop and mobile
- **Contact form** — opens your mail client directly via `mailto:`

---

## 🗂️ Project Structure

```
cyberexposito.github.io/
├── index.html        # HTML structure
├── style.css         # All styles (CSS variables, animations, layout)
├── main.js           # JavaScript (cursor, typing, scroll reveal, contact)
├── thumbnail.png     # LinkedIn preview image
├── CNAME             # Custom domain config
└── README.md
```

---

## 🛠️ Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 — custom properties, clip-path, keyframes |
| Scripting | Vanilla JavaScript — IntersectionObserver, typing effect |
| Fonts | Google Fonts — Orbitron, Share Tech Mono, Rajdhani |
| Hosting | GitHub Pages |

---

## 🎨 Color Palette

Defined as CSS variables in `style.css`:

```css
:root {
  --cyan:    #00f5ff;
  --magenta: #ff0080;
  --yellow:  #ffd700;
  --dark:    #05050f;
}
```

---

## 🚀 Local Development

No build step required.

```bash
# Clone the repo
git clone https://github.com/Elnhiko/cyberexposito.github.io.git
cd cyberexposito.github.io

# Option 1 — open directly
open index.html

# Option 2 — serve locally
python3 -m http.server 8080
# then visit http://localhost:8080
```

---

## 📦 Deployment

Deployed automatically via **GitHub Pages** on every push to `main`.

```bash
git add .
git commit -m "update: your description here"
git push origin main
```

---

## ✏️ Customization

| Section | File | What to edit |
|---|---|---|
| Hero | `index.html` | `.hero-tag`, `.hero-name` |
| Typing phrases | `main.js` | `phrases[]` array |
| About / Terminal | `index.html` | `.about-text` + `.terminal-box` |
| Skills | `index.html` | `.skill-card` blocks in `#skills` |
| Experience | `index.html` | `.timeline-item` blocks in `#experience` |
| Formations | `index.html` | `.timeline-item` blocks in `#formations` |
| Projects | `index.html` | `.project-card` blocks in `#projects` |
| Contact links | `index.html` | `href` on `.contact-item` elements |
| Contact email | `main.js` | `mailto:` address in the send handler |

---

## 📄 License

MIT — feel free to fork and adapt.
