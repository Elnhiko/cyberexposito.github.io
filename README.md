cyberexposito.github.io

Personal portfolio website — cyberpunk-themed, single-page, no frameworks.

Overview
Single-file portfolio built with vanilla HTML, CSS and JavaScript. Designed with a cyberpunk aesthetic: neon colors, scanline overlay, CRT grid background, glitch animations and a custom cursor.

Features
Animated hero section with typing effect and glitch animation
Scroll-reveal on all sections
Responsive layout (mobile-friendly)
Custom crosshair cursor with trailing dot
Fixed navigation with active section highlighting
Timeline-based experience section
Skills cards grid
Project cards
Contact form + social links

Stack
LayerTechMarkupHTML5StylingCSS3 (custom properties, clip-path, keyframes)ScriptingVanilla JavaScript (IntersectionObserver, typing effect)FontsGoogle Fonts — Orbitron, Share Tech Mono, RajdhaniHostingGitHub Pages

Structure
cyberexposito.github.io/
├── index.html          # Entire site (HTML + CSS + JS)
├── CNAME               # Custom domain config
└── README.md

Customization
All content is in index.html. Key sections to update:
SectionWhat to editHero.hero-tag, .hero-name, typing phrases[] array in JSAbout.about-text paragraphs + .terminal-box key/value linesSkills.skill-card blocks inside #skillsExperience.timeline-item blocks inside #experienceProjects.project-card blocks inside #projectsContacthref on .contact-item links
Colors are defined as CSS variables at the top of the <style> block:
css:root {
  --cyan: #00f5ff;
  --magenta: #ff0080;
  --yellow: #ffd700;
}
