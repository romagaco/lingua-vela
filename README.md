# LinguaVela ⛵

Open-source web application for learning English from **Landlubber (Pre-A1)** to **Captain (C2)**.  
Simple, lightweight, accessible, and beginner-friendly — no login walls, no frameworks, ready for **GitHub Pages**.

Built with pure **HTML5**, **CSS3**, and **vanilla JavaScript**.

- 🌐 **Live Site:** https://romagaco.github.io/lingua-vela/
- 🌱 **Interactive Companion Game (Juego Granja — LinguaVela):** https://romagaco.github.io/Juego-Granja---LinguaVela/

## Features

- **Bilingual Interface (`ES` / `EN`)**: Defaults to Spanish with an instant header toggle to switch the entire site to English.
- **Accessibility Theme Switcher**: Switch between **Brisa / Breeze (Light)**, **Océano / Ocean (Dark)**, and **Alto Contraste / High Contrast (WCAG AAA)**.
- **7 Nautical Crew Ranks (`Pre-A1` → `C2`)**: Progress from *Terrícola (Landlubber)* to *Capitán (Captain)* with clear Can-Do milestones.
- **Multi-Page Curriculum Structure**:
  - **Port (`index.html`)**: Main entry point featuring Crew Ranks, core module previews, SLA methodology & US English Blueprint PDF/infographic, and community collaboration links.
  - **Lessons (`pages/lessons.html`)**: Structured lessons across all 7 ranks (`lesson-a0.html` – `lesson-c2.html`) plus thematic **Vocabulary Flashcards** (`pages/lessons-vocabulary.html`, including 40 interactive Animal flashcards).
  - **Practice (`pages/practice.html`)**:
    - **Grammar Workshop (`pages/grammar.html`)**: Interactive grammar guides + dedicated **Extra Practice Bank** (10 extra exercises per level, 70 total).
    - **Vocabulary & Pronunciation (`pages/vocabulary.html`)**: IPA phonetic breakdowns, Web Speech API audio (`1.0x` and `0.75x`), US Connected Speech + dedicated **Extra Practice Bank** (10 extra exercises per level, 70 total).
    - **Listening (`pages/listening.html`)**: Graded audio scenarios with adjustable speed, interactive transcripts, and comprehension checks (`Pre-A1` to `C2`).
  - **Books (`pages/books.html`)**: Extensive reading collection featuring 4 illustrated beginner stories (with optional Spanish translation & audio) and 4 full-length advanced English blog books (*The Economic Mind*, *The Economic Mind II*, *The Culinary Atlas*, and *The Healthy Life*), each with a chapter Table of Contents, vocabulary chips, and **20 comprehension questions**.
  - **My Ship (`pages/ship.html`)**: Learner logbook, monthly & weekly study calendars, and training for **Discourse**, **Sociolinguistic & Pragmatic**, and **Strategic** competences.

## Community, Updates & Collaboration

LinguaVela is an open community project — feedback, bug reports, and ideas are always welcome! Follow us to stay up to date:

- ▶️ **YouTube:** [LinguaVela](https://www.youtube.com/@LinguaVela)
- 📸 **Instagram:** [LinguaVela](https://www.instagram.com/linguavela/)
- ✉️ **Contact & Feedback:**
  - `LinguaVelaCommunityproject@gmail.com`
  - `roberde26@gmail.com`
- 🌱 **Play the Companion Game:** [Juego Granja — LinguaVela](https://romagaco.github.io/Juego-Granja---LinguaVela/)

## Project Structure

```text
/
├── index.html                        # Port (Main entry point & community hub)
├── logo.png                          # LinguaVela brand logo
├── css/
│   └── styles.css                    # Global styles & accessibility themes
├── js/
│   ├── main.js                       # Core curriculum, i18n (ES/EN), speech & exercises
│   ├── lessons.js                    # Level 1 (Pre-A1) lesson module
│   ├── lesson-a1.js … lesson-c2.js   # Level 2–7 lesson modules
│   ├── books.js                      # Books reader (illustrated stories + Markdown books)
│   ├── books-extended.js             # 4 full-length books + 20 comprehension questions each
│   ├── practice-extra.js             # Extra Practice Bank renderer (Grammar & Vocabulary)
│   ├── practice-extra-grammar.js     # 70 extra Grammar exercises (10 per level)
│   ├── practice-extra-vocab.js       # 70 extra Vocabulary exercises (10 per level)
│   └── vocabulary-animals.js         # 40 Animals interactive flashcards
├── pages/
│   ├── lessons.html                  # Lessons hub (7 ranks + thematic vocabulary)
│   ├── lessons-vocabulary.html       # Vocabulary flashcards hub
│   ├── lesson-a0.html … lesson-c2.html
│   ├── practice.html                 # Practice hub
│   ├── grammar.html                  # Grammar Workshop + Extra Practice Bank
│   ├── vocabulary.html               # Vocabulary & Pronunciation + Extra Practice Bank
│   ├── listening.html                # Listening Comprehension
│   ├── books.html                    # Extensive Reading & Full Books
│   └── ship.html                     # My Ship (Logbook, Calendars & Competences)
├── resources/                        # PDF guides, blueprints, book Markdown sources & icons
├── Agents.md
└── README.md
```

## Run Locally (with Bun)

```bash
bunx serve .
```

Or open `index.html` directly in your browser.
