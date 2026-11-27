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
│   ├── spanglish.js         # Progressive Spanglish-to-English immersion engine (Pre-A1 to C2)
│   ├── main.js              # Main JavaScript logic, bilingual i18n (ES/EN) & exercises
│   ├── lessons.js           # Lesson block module (Level 1 Pre-A1)
│   ├── lesson-a1.js … lesson-c2.js # Lesson curriculum modules (Levels 2–7, A1–C2)
│   ├── level-sections-data.js # Data for 3 extra sections per level (Reading, Expressions/False Friends, Roleplay)
│   ├── level-sections.js    # Interactive renderer for the 3 extra sections on all 7 levels
│   ├── books.js             # Books reader logic (illustrated stories + long-form Markdown books)
│   ├── books-extended.js    # Full-length books data & 20 comprehension questions each
│   ├── practice-extra.js    # Dedicated Extra Practice Bank renderer (Grammar & Vocabulary)
│   ├── practice-extra-grammar.js # 70 extra Grammar exercises (10 per level, a0–c2)
│   ├── practice-extra-vocab.js   # 70 extra Vocabulary exercises (10 per level, a0–c2)
│   ├── listening-extra.js        # Renderer for the 2 extra Listening sections
│   ├── listening-extra-dictation.js # 70 Micro-Dictation & Connected Speech Cloze exercises
│   ├── listening-extra-dialogue.js  # 70 Interactive Dialogue & Next-Reply exercises
│   ├── practice-builder-data.js  # Data for Drag-and-Drop Builder & Live Document Lab (a0–c2)
│   ├── practice-builder.js       # Interactive Drag-and-Drop Builder & Document Lab renderer
│   ├── practice-realworld-data.js # Data for Click-to-Fix Error Detective & Register Sorter (a0–c2)
│   ├── practice-realworld.js     # Interactive Proofreading & Tone/Register Sorter renderer
│   └── vocabulary-animals.js # Animals flashcards (40 animals, click-to-reveal)
├── assets/                  # Images, icons, audio, etc.
├── pages/                   # Separate HTML pages (top nav: Port, Lessons, Practice, Books, My Ship)
│   ├── lessons.html         # Lessons hub — categories & large icon menu of the 7 levels
│   ├── lessons-vocabulary.html # Category under Lessons: Vocabulary & Animals flashcards
│   ├── lesson-a0.html … lesson-c2.html  # One page per level (coming soon)
│   ├── practice.html        # Practice hub — large icon menu (Grammar, Vocabulary, Listening, Builder, Error Detective)
│   ├── grammar.html         # Grammar Workshop (Pre A/A0 - C2)
│   ├── vocabulary.html      # Vocabulary & Pronunciation (Pre A/A0 - C2)
│   ├── listening.html       # Listening (Pre A/A0 - C2)
│   ├── builder.html         # Real-World Message Builder (Drag & Drop) & Live Document Lab (Pre A/A0 - C2)
│   ├── real-world.html      # Real-World Error Detective (Click-to-Fix) & Tone/Register Sorter (Pre A/A0 - C2)
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