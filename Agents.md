# AGENTS.md

## Project Overview
Open-source web application for learning languages.  
Simple, lightweight, and beginner-friendly.  
Currently uses pure vanilla HTML, CSS, and JavaScript (no frameworks).  
Goal: make language learning accessible and easy to contribute to.

## Tech Stack
- HTML5
- CSS3 (vanilla, no preprocessors for now)
- JavaScript (vanilla ES modules when needed)
- Bun (preferred package manager and runtime — do **not** use npm or yarn)
- Git + GitHub

## Project Structure
/
├── index.html               # Port — Main entry point
├── logo.png                 # LinguaVela logo
├── css/
│   └── styles.css           # Global styles & accessibility themes
├── js/
│   ├── main.js              # Main JavaScript logic, bilingual i18n (ES/EN) & exercises
│   ├── lessons.js           # Lesson block module (Level 1 Pre-A1)
│   ├── lesson-a1.js         # Lesson module (Level 2 A1 Cabin Mate — 33 topics & routine)
│   ├── books.js             # Books reader logic
│   └── vocabulary-animals.js # Animals flashcards (40 animals, click-to-reveal)
├── assets/                  # Images, icons, audio, etc.
├── pages/                   # Separate HTML pages (top nav: Port, Lessons, Practice, Books, My Ship)
│   ├── lessons.html         # Lessons hub — categories & large icon menu of the 7 levels
│   ├── lessons-vocabulary.html # Category under Lessons: Vocabulary & Animals flashcards
│   ├── lesson-a0.html … lesson-c2.html  # One page per level (coming soon)
│   ├── practice.html        # Practice hub — large icon menu (Grammar, Vocabulary, Listening)
│   ├── grammar.html         # Grammar Workshop (Pre A/A0 - C2)
│   ├── vocabulary.html      # Vocabulary & Pronunciation (Pre A/A0 - C2)
│   ├── listening.html       # Listening (Pre A/A0 - C2)
│   ├── books.html           # Extensive readings, not by level (coming soon)
│   └── ship.html            # My Ship (User profile, Competences & Streaks)
├── AGENTS.md
├── README.md
└── package.json             # Only if needed for Bun scripts


Keep the structure flat and simple. Avoid creating unnecessary folders.

## Commands (use Bun only)

- Install dependencies (if any):  
  `bun install`

- Start a local development server:  
  `bunx serve .`  
  or  
  `bun --hot index.html` (if using Bun's hot reload)

- Open the project:  
  Just open `index.html` in the browser for the simplest workflow.

- Prefer Bun for any future scripts or tooling.  
  Never use `npm`, `npx`, `yarn`, or `pnpm`.

## Coding Conventions
- Use clear, readable variable and function names.
- Prefer modern vanilla JavaScript (ES6+).
- Keep CSS simple and organized (use comments to separate sections).
- Avoid adding frameworks or heavy libraries unless absolutely necessary and discussed first.
- Write comments in English.
- Keep files small and focused.

## Rules for Agents
- Do **not** introduce npm, React, Vue, Tailwind, or any framework without explicit approval.
- Prefer pure HTML, CSS, and vanilla JavaScript solutions.
- Always use Bun instead of npm/yarn.
- Make small, focused changes.
- Do not commit secrets or `.env` files.
- Update this `AGENTS.md` if the project structure or commands change significantly.
- When adding new features, prefer progressive enhancement and accessibility.

## GitHub & Contribution
- This is an open-source project. Keep the code clean and well-commented so others can contribute easily.
- Prefer clear commit messages (e.g. "Add vocabulary quiz section", "Fix mobile layout").
- Do not force-push to main.
- Create pull requests for non-trivial changes.

## Future Ideas (optional)
Possible next steps the project may grow into:
- Basic language selection (Spanish, English, etc.)
- Flashcards / vocabulary sections
- Simple quizzes
- Dark mode
- Local storage for progress
- Progressive Web App (PWA) features later

Keep the foundation simple for now.