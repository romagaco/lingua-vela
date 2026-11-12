# LinguaVela ⛵

Open-source web application for learning English (Pre-A0 to C2).  
Simple, lightweight, accessible, and beginner-friendly.

Built with pure **HTML5**, **CSS3**, and **vanilla JavaScript**.  
No frameworks. No complexity. Ready for **GitHub Pages**.

## Features

- **Bilingual Interface (`ES` / `EN`)**: Default in Spanish with a header language toggle to switch the entire application to full English.
- **Accessibility Theme Switcher**: Switch between **Brisa / Breeze (Light)**, **Océano / Ocean (Dark)**, and **Alto Contraste / High Contrast (WCAG AAA)**.
- **Multi-Page Curriculum Structure**:
  - **Port (`index.html`)**: Main dashboard entry point with daily goal rhythm, active module preview, and weekly study chart.
  - **Grammar Workshop (`pages/grammar.html`)**: Interactive grammar guides and exercises across all 7 CEFR levels (`Pre A / A0`, `A1`, `A2`, `B1`, `B2`, `C1`, `C2`).
  - **Vocabulary & Pronunciation (`pages/vocabulary.html`)**: Interactive flashcards, IPA phonetic breakdowns, Web Speech API pronunciation (`1.0x` and `0.75x`), and exercises from `Pre A / A0` to `C2`.
  - **Listening (`pages/listening.html`)**: Graded audio scenarios with adjustable playback speed, interactive transcripts, and comprehension exercises from `Pre A / A0` to `C2`.
  - **My Ship (`pages/ship.html`)**: User profile and training for **Discourse Competence**, **Sociolinguistic & Pragmatic Competence**, **Strategic Competence**, and **Daily Goals & Streaks**.

## Project Structure

```text
/
├── index.html               # Port (Main entry point)
├── logo.png                 # LinguaVela brand logo
├── css/
│   └── styles.css           # Global styles & accessibility themes
├── js/
│   └── main.js              # Curriculum data, i18n (ES/EN), speech & interactive exercises
├── pages/
│   ├── grammar.html         # Grammar Workshop (Pre-A0 to C2)
│   ├── vocabulary.html      # Vocabulary & Pronunciation (Pre-A0 to C2)
│   ├── listening.html       # Listening Comprehension (Pre-A0 to C2)
│   └── ship.html            # My Ship (Competences & Daily Goals)
├── Agents.md
└── README.md
```

## Run Locally (with Bun)

```bash
bunx serve .
```
Or open `index.html` directly in your browser.
