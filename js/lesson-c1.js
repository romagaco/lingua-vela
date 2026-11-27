/**
 * LinguaVela — Lessons Module (Level 6: Navigator / C1 Advanced)
 * Complete C1 Curriculum:
 *   1. Advanced Verb Tenses & Aspects
 *   2. Inversion, Cleft Sentences & Emphasis
 *   3. Advanced Conditionals & Hypotheticals
 *   4. Advanced Passive, Impersonal & Causatives
 *   5. Modals: Advanced Deduction & Attitude
 *   6. Advanced Reported Speech & Reporting Verbs
 *   7. Gerunds, Infinitives & Participle Clauses
 *   8. Cohesion, Hedging & Nominalization
 *   9. C1 Vocabulary Depth (Collocations, Idioms, Phrasal Verbs, Connotation)
 *  10. Can-Do Skills, Weekly Routine, 17-Point Checklist & 14-Question Quiz
 *
 * Pure vanilla JS. Renders into #lesson-root, bilingual (ES/EN).
 * Re-renders automatically when main.js switches <html lang>.
 * Audio uses the browser's built-in Web Speech API (US English voice).
 */

(() => {
  "use strict";

  const root = document.getElementById("lesson-root");
  if (!root) return;

  const STORAGE_KEY = "linguavela-lesson-c1-scores";

  const LEVEL_ID = "c1";
  const lang = () => (document.documentElement.lang === "en" ? "en" : "es");
  const L = (es, en) =>
    window.LinguaSpanglish
      ? window.LinguaSpanglish.pair(es, en, LEVEL_ID)
      : en;
  const t = (value) =>
    value && typeof value === "object" && !Array.isArray(value) && ("es" in value || "en" in value || "spanglish" in value)
      ? window.LinguaSpanglish
        ? window.LinguaSpanglish.resolve(value, LEVEL_ID)
        : value.en || value[lang()]
      : value;

  const speechSupported = "speechSynthesis" in window;

  function pickVoice() {
    const voices = speechSupported ? window.speechSynthesis.getVoices() : [];
    return (
      voices.find((v) => v.lang === "en-US") ||
      voices.find((v) => v.lang && v.lang.startsWith("en")) ||
      null
    );
  }

  function speak(text, rate = 0.88) {
    if (!speechSupported) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = rate;
      const voice = pickVoice();
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech error:", e);
    }
  }

  const speakBtn = (speechText, label, extraClass = "") =>
    `<button type="button" class="speak-btn ${extraClass}" data-speak="${speechText}" aria-label="${L("Escuchar", "Listen")}: ${label}">
      <span aria-hidden="true">🔊</span><span>${label}</span>
    </button>`;

  let activeTab = "all";
  const revealed = {};
  const checklist = {};
  const answers = {};

  function loadScores() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveBestScore(score) {
    const scores = loadScores();
    if (!scores.c1 || score > scores.c1) {
      scores.c1 = score;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
      } catch {
        // ignore storage errors
      }
    }
  }

  /* ==========================================================================
     Data
     ========================================================================== */

  const CHECKLIST_ITEMS = [
    { es: "Puedo usar Future Perfect y Future Perfect Continuous para plazos futuros.", en: "I can use Future Perfect and Future Perfect Continuous to talk about deadlines." },
    { es: "Puedo usar Past Perfect Continuous para explicar duración y resultados pasados.", en: "I can use Past Perfect Continuous to explain duration and results in the past." },
    { es: "Puedo invertir tras Never, Rarely, Not only, Hardly para dar énfasis.", en: "I can invert after Never, Rarely, Not only, Hardly for emphasis." },
    { es: "Puedo usar It-cleft y Wh-cleft para destacar información clave.", en: "I can use It-cleft and Wh-cleft to highlight key information." },
    { es: "Puedo usar condicionales invertidos como Had I known y Should you need.", en: "I can use inverted conditionals like Had I known and Should you need." },
    { es: "Puedo usar mixed conditionals para conectar causas pasadas con resultados presentes.", en: "I can use mixed conditionals to connect past causes to present results." },
    { es: "Puedo usar pasiva con reporting verbs (is said to be, is believed to).", en: "I can use passive with reporting verbs like is said to be and is believed to." },
    { es: "Puedo usar causativas con have someone do y get someone to do.", en: "I can use causative with have someone do and get someone to do." },
    { es: "Puedo especular sobre el pasado con must have, can't have y might have.", en: "I can speculate about the past with must have, can't have, and might have." },
    { es: "Puedo criticar con should have y hablar de expectativas con was supposed to.", en: "I can criticize with should have and talk about expectations with was supposed to." },
    { es: "Puedo reportar con verbos precisos (admit, deny, suggest, insist on, point out).", en: "I can report with precise verbs like admit, deny, suggest, insist on, and point out." },
    { es: "Controlo gerundio vs. infinitivo, incluyendo regret to vs. regret doing.", en: "I can control gerund vs. infinitive, including regret to vs. regret doing." },
    { es: "Puedo acortar cláusulas con participios sin cambiar el sujeto.", en: "I can shorten clauses with participles without dangling subjects." },
    { es: "Puedo argumentar con admittedly, moreover, on balance, thereby y on the contrary.", en: "I can argue with admittedly, moreover, on balance, thereby, and on the contrary." },
    { es: "Puedo usar hedging (seem, tend, arguably, likely) para sonar diplomático.", en: "I can hedge with seem, tend, arguably, and likely to sound diplomatic." },
    { es: "Puedo nominalizar en escritura formal sin sonar pesado al hablar.", en: "I can nominalize in formal writing without sounding heavy in conversation." },
    { es: "Uso colocaciones, modismos y phrasal verbs con la connotación adecuada.", en: "I can use collocations, idioms, and phrasal verbs with the right connotation." },
  ];

  const QUIZ_QUESTIONS = [
    {
      prompt: { es: "Elige la oración correcta en Past Perfect Continuous:", en: "Choose the correct Past Perfect Continuous sentence:" },
      options: [
        "I had been knowing him for years before we worked together.",
        "She was tired because she had been working all day.",
        "He had been finishing the report before the meeting.",
      ],
      correct: 1,
      feedback: { es: "¡Correcto! Explica una causa/duración continua en el pasado; «know» es verbo de estado y no usa Continuous.", en: "Correct! It explains ongoing duration/cause in the past; 'know' is a state verb." },
    },
    {
      prompt: { es: "Elige la inversión correcta tras un adverbio negativo:", en: "Choose the correct inversion after a negative adverb:" },
      options: [
        "Never I have seen such a beautiful place.",
        "Never have I seen such a beautiful place.",
        "Never did I saw such a beautiful place.",
      ],
      correct: 1,
      feedback: { es: "¡Exacto! Después de «Never» al inicio invertimos auxiliar + sujeto + verbo.", en: "Exactly! After 'Never' at the start, invert auxiliary + subject + verb." },
    },
    {
      prompt: { es: "¿Qué Wh-cleft enfatiza correctamente la idea?", en: "Which Wh-cleft correctly emphasizes the idea?" },
      options: [
        "What matters most is accuracy, not speed.",
        "What I need are more time.",
        "It was Elena which bought the bread.",
      ],
      correct: 0,
      feedback: { es: "¡Muy bien! «What matters most is...» es una estructura Wh-cleft clásica de C1.", en: "Well done! 'What matters most is...' is a classic C1 Wh-cleft." },
    },
    {
      prompt: { es: "Condicional invertido formal equivalente a «If I had known...»:", en: "Formal inverted conditional equivalent to 'If I had known...':" },
      options: [
        "Did I know, I would have helped.",
        "Had I known, I would have helped.",
        "Would I have known, I had helped.",
      ],
      correct: 1,
      feedback: { es: "¡Correcto! «Had I known» omite «if» e invierte «had» y el sujeto.", en: "Correct! 'Had I known' drops 'if' and inverts 'had' and the subject." },
    },
    {
      prompt: { es: "Completa con el tiempo correcto: «I would rather you ___ anyone.»", en: "Complete with the right tense: 'I would rather you ___ anyone.'" },
      options: ["don't tell", "didn't tell", "won't tell"],
      correct: 1,
      feedback: { es: "¡Exacto! Para preferencia sobre otra persona, «would rather + sujeto» usa Past Simple («didn't tell»).", en: "Exactly! For a preference about another person, 'would rather + subject' uses Past Simple ('didn't tell')." },
    },
    {
      prompt: { es: "Elige la causativa correcta cuando convenciste a Ana:", en: "Choose the right causative when you persuaded Ana:" },
      options: [
        "I got Ana to help me.",
        "I got Ana help me.",
        "I had Ana to help me.",
      ],
      correct: 0,
      feedback: { es: "¡Bien! «Get + person + to + verb» (persuadir), frente a «have + person + base verb».", en: "Nice! 'Get + person + to + verb' (persuade), vs. 'have + person + base verb'." },
    },
    {
      prompt: { es: "Diferencia entre deducción y obligación pasada:", en: "Tell apart past deduction vs. past obligation:" },
      options: [
        "He must have left early — his child was sick so it was mandatory.",
        "He had to leave early because his desk is empty.",
        "He must have left early — his desk is empty (deduction).",
      ],
      correct: 2,
      feedback: { es: "¡Correcto! «Must have left» es deducción por evidencia; «had to leave» es obligación.", en: "Correct! 'Must have left' is deduction from evidence; 'had to leave' is obligation." },
    },
    {
      prompt: { es: "¿Cuándo NO es necesario retroceder el tiempo (no backshift) en Reported Speech?", en: "When is backshift NOT required in Reported Speech?" },
      options: [
        "When the statement is still true or a general fact (The Earth is round).",
        "When reporting a past finished event from last year.",
        "When using 'asked whether'.",
      ],
      correct: 0,
      feedback: { es: "¡Exacto! Verdades generales o hechos que siguen vigentes pueden mantenerse en presente.", en: "Exactly! General truths or statements still true can stay in the present tense." },
    },
    {
      prompt: { es: "Lamentar dar una mala noticia ahora (carta formal):", en: "Regret giving bad news right now (formal letter):" },
      options: [
        "I regret telling you that we cannot help.",
        "I regret to tell you that we cannot help.",
        "I meant calling you.",
      ],
      correct: 1,
      feedback: { es: "¡Correcto! «Regret to tell/inform» = lamento comunicarte ahora; «regret doing» = me arrepiento de algo pasado.", en: "Correct! 'Regret to tell/inform' = sorry to announce now; 'regret doing' = regret a past action." },
    },
    {
      prompt: { es: "Elige la cláusula participial sin error de sujeto (no dangling participle):", en: "Choose the participle clause without a dangling subject:" },
      options: [
        "Having finished my homework, my mom called me.",
        "Having finished my homework, I called my mom.",
        "Written in 1990, the city loves the school.",
      ],
      correct: 1,
      feedback: { es: "¡Bien! El sujeto de la cláusula principal («I») debe ser el mismo que realizó la acción del participio.", en: "Nice! The main clause subject ('I') must match who did the participle action." },
    },
    {
      prompt: { es: "Elige el conector de concesión + contraste formal:", en: "Choose the formal concession + contrast marker:" },
      options: [
        "Admittedly, the plan is expensive. However, it will save money.",
        "On the contrary, the plan is expensive, so we agree.",
        "Thereby, the plan is expensive.",
      ],
      correct: 0,
      feedback: { es: "¡Exacto! «Admittedly» concede un punto antes de refutarlo o contrastarlo con «However».", en: "Exactly! 'Admittedly' concedes a point before contrasting it with 'However'." },
    },
    {
      prompt: { es: "¿Cuál frase usa «hedging» académico apropiado?", en: "Which sentence uses appropriate academic hedging?" },
      options: [
        "This proves 100% that the strategy is working.",
        "This suggests that the strategy is likely to succeed.",
        "It is recommended that maybe we possibly proceed.",
      ],
      correct: 1,
      feedback: { es: "¡Muy bien! «Suggests» y «likely to» matizan la afirmación; evita exagerar con hedging en recomendaciones directas.", en: "Well done! 'Suggests' and 'likely to' soften the claim appropriately." },
    },
    {
      prompt: { es: "Nominaliza formalmente: «We decided to expand because we wanted to improve sales.»", en: "Formal nominalization of 'We decided to expand because we wanted to improve sales':" },
      options: [
        "The decision to expand was driven by the need for sales improvement.",
        "We had a deciding to expand for improving sales.",
        "Expanding decision was because of improve.",
      ],
      correct: 0,
      feedback: { es: "¡Excelente! «decided → decision» e «improve → improvement» condensan la idea con estilo formal C1.", en: "Excellent! 'decided → decision' and 'improve → improvement' give concise C1 formal style." },
    },
    {
      prompt: { es: "Elige las colocaciones correctas (collocations):", en: "Choose the natural collocations:" },
      options: [
        "do a mistake · make a risk · give attention",
        "make a mistake · take a risk · pay attention",
        "do a decision · take a mistake · do attention",
      ],
      correct: 1,
      feedback: { es: "¡Perfecto! En inglés natural: make a mistake / decision, take a risk, pay attention.", en: "Perfect! Natural chunks: make a mistake / decision, take a risk, pay attention." },
    },
  ];

  /* ==========================================================================
     Renderers
     ========================================================================== */

  const stepHead = (num, title) =>
    `<h3 class="lesson-step-title"><span class="lesson-step-num">${num}</span>${title}</h3>`;

  function revealBox(id, btnLabel, contentHtml) {
    const open = Boolean(revealed[id]);
    return `
      <div style="margin-top:0.4rem;">
        <button type="button" class="btn btn-light" style="padding:0.4rem 0.85rem; font-size:0.86rem;" data-c1-reveal="${id}">
          ${open ? L("Ocultar solución", "Hide answer") : btnLabel}
        </button>
        ${open ? `<div class="can-do-box" style="margin-top:0.5rem;">${contentHtml}</div>` : ""}
      </div>
    `;
  }

  function renderHeroBanner() {
    return `
      <div class="routine-strip" style="margin-bottom: 1.25rem;">
        <li><span class="routine-icon" aria-hidden="true">🧭</span><span><strong>${L("Nivel:", "Crew level:")}</strong> Navigator (Navegante) · CEFR C1 Advanced</span></li>
        <li><span class="routine-icon" aria-hidden="true">🗺️</span><span><strong>${L("Insignia:", "Badge:")}</strong> ${L("Mapa y sextante · Dominio operativo eficaz", "Map & Sextant · Effective operational proficiency")}</span></li>
        <li><span class="routine-icon" aria-hidden="true">🎯</span><span>${L("Matiz, estilo, persuasión, inversión, nominalización y comprensión nativa con ironía.", "Nuance, style, persuasion, inversion, nominalization, and native-speed humor & irony.")}</span></li>
      </div>
    `;
  }

  function renderFilterTabs() {
    const tabs = [
      { id: "all", label: { es: "📚 Ver Todo", en: "📚 View All" } },
      { id: "tenses", label: { es: "1. Aspectos Perfectos", en: "1. Perfect Aspects" } },
      { id: "emphasis", label: { es: "2. Inversión y Cleft", en: "2. Inversion & Cleft" } },
      { id: "cond", label: { es: "3. Condicionales C1", en: "3. C1 Conditionals" } },
      { id: "passive", label: { es: "4. Pasiva y Modales", en: "4. Passive & Modals" } },
      { id: "reported", label: { es: "5. Reported y Participios", en: "5. Reported & Participles" } },
      { id: "style", label: { es: "6. Hedging y Nominalización", en: "6. Hedging & Style" } },
      { id: "vocab", label: { es: "7. Vocabulario y Can-Do", en: "7. Vocab & Can-Do" } },
      { id: "quiz", label: { es: "8. Checklist y Quiz", en: "8. Checklist & Quiz" } },
      ...(window.LinguaLevelSections ? window.LinguaLevelSections.getTabDefs(LEVEL_ID) : []),
    ];
    return `
      <nav class="level-bar-wrapper" aria-label="${L("Secciones del Nivel C1", "Level C1 Sections")}">
        <div class="level-tabs" role="tablist">
          ${tabs
            .map(
              (tab) => `
            <button type="button" class="level-tab-btn ${activeTab === tab.id ? "active" : ""}" role="tab" aria-selected="${activeTab === tab.id}" data-c1-tab="${tab.id}">
              ${t(tab.label)}
            </button>`
            )
            .join("")}
        </div>
      </nav>
    `;
  }

  function renderTenses() {
    return `
      <section class="card lesson-card" aria-labelledby="c1-tenses-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 1 · TIEMPOS Y ASPECTOS AVANZADOS", "BLOCK 1 · ADVANCED VERB TENSES & ASPECTS")}</span>
          <h2 id="c1-tenses-title" class="theory-title">1. Past Perfect Continuous &amp; Future Perfect</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("1.1", "Past Perfect Continuous")}
          <p>${L("Acción en progreso antes de otro hecho pasado (énfasis en duración o efecto visible):", "Ongoing action before another past event (duration or visible past result):")} <code>had + been + verb-ing</code></p>
          <div class="phrase-list">
            <li>${speakBtn("I had been studying for three hours when she called.", "I had been studying for three hours when she called.", "speak-btn-sm")}</li>
            <li>${speakBtn("She was tired because she had been working all day.", "She was tired because she had been working all day.", "speak-btn-sm")}</li>
          </div>
          <p>✕ <del>I had been knowing him for years.</del> → ✓ <strong>I had known him for years.</strong> (${L("verbos de estado", "state verbs")})</p>
        </div>

        <div class="lesson-step">
          ${stepHead("1.2", "Future Perfect & Future Perfect Continuous")}
          <div class="compare-grid">
            <div class="compare-box">
              <span class="compare-label">will + have + p.p.</span>
              <strong>${L("Terminado antes de un momento futuro", "Completed before a future time")}</strong>
              ${speakBtn("By December, I will have finished my course.", "By December, I will have finished my course.", "speak-btn-sm")}
            </div>
            <div class="compare-box compare-box-accent">
              <span class="compare-label">will + have + been + -ing</span>
              <strong>${L("Duración hasta un momento futuro", "Duration up to a future time")}</strong>
              ${speakBtn("By next year, I will have been living here for 10 years.", "By next year, I will have been living here for 10 years.", "speak-btn-sm")}
            </div>
          </div>
          <p>🗣️ <code>I will have finished</code> → <code>AIL-UV-FINISHED</code> (${L("habla rápida US; en escritura formal usa will have", "fast US speech; keep will have in formal writing")}).</p>
        </div>

        <div class="lesson-step">
          ${stepHead("1.3", L("Revisión de matiz C1: resultado vs. actividad", "C1 Nuance: Result vs. Activity"))}
          <p>${speakBtn("I have been staring at this screen all day, that is why I have a headache.", "I have been staring at this screen all day, that's why I have a headache.", "speak-btn-sm")}</p>
        </div>
      </section>
    `;
  }

  function renderEmphasis() {
    return `
      <section class="card lesson-card" aria-labelledby="c1-emp-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 2 · INVERSIÓN, CLEFT Y ÉNFASIS", "BLOCK 2 · INVERSION, CLEFT SENTENCES & EMPHASIS")}</span>
          <h2 id="c1-emp-title" class="theory-title">2. Inversion, Clefts &amp; Fronting</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("2.1", L("Inversión tras adverbios negativos", "Inversion After Negative Adverbs"))}
          <p><code>Never · Rarely · Seldom · Hardly · Not only · No sooner · Under no circumstances</code> + <code>auxiliary + subject + verb</code></p>
          <div class="phrase-list">
            <li>${speakBtn("Never have I seen such a beautiful place.", "Never have I seen such a beautiful place.", "speak-btn-sm")}</li>
            <li>${speakBtn("Not only did she pass, she got the highest score.", "Not only did she pass, she got the highest score.", "speak-btn-sm")}</li>
            <li>${speakBtn("Under no circumstances should you share your password.", "Under no circumstances should you share your password.", "speak-btn-sm")}</li>
          </div>
          ${revealBox("inv1", L("Ver práctica de inversión", "Show inversion practice"), `
            <p>1. <strong>Never have I been</strong> so proud.<br/>2. <strong>Rarely do we see</strong> this kind of talent.</p>
          `)}
        </div>

        <div class="lesson-step">
          ${stepHead("2.2", "Cleft Sentences (It-cleft & Wh-cleft) + Fronting & Do")}
          <div class="compare-grid">
            <div class="compare-box">
              <span class="compare-label">It-cleft</span>
              ${speakBtn("It was Elena who bought the bread yesterday, not Ana.", "It was Elena who bought the bread yesterday.", "speak-btn-sm")}
              ${speakBtn("It was not the price that convinced me, it was the quality.", "It was not the price, it was the quality.", "speak-btn-sm")}
            </div>
            <div class="compare-box compare-box-accent">
              <span class="compare-label">Wh-cleft</span>
              ${speakBtn("What matters most is not speed, it is accuracy.", "What matters most is accuracy.", "speak-btn-sm")}
              ${speakBtn("What I mean is, we need more time.", "What I mean is...", "speak-btn-sm")}
            </div>
          </div>
          <p><strong>Fronting &amp; Do:</strong> ${speakBtn("Amazing as it may seem, we finished on time. I do understand your point, I just disagree.", "Amazing as it may seem... / I do understand your point...", "speak-btn-sm")}</p>
        </div>
      </section>
    `;
  }

  function renderConditionals() {
    return `
      <section class="card lesson-card" aria-labelledby="c1-cond-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 3 · CONDICIONALES AVANZADOS E HIPÓTESIS", "BLOCK 3 · ADVANCED CONDITIONALS & HYPOTHETICALS")}</span>
          <h2 id="c1-cond-title" class="theory-title">3. Inverted Conditionals, Mixed &amp; Hypotheticals</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("3.1", L("Inversión en condicionales (omitir if)", "Inversion in Conditionals (Drop 'if')"))}
          <div class="phrase-list">
            <li><strong>Type 1:</strong> ${speakBtn("Should you have any questions, please contact us.", "Should you have any questions, please contact us.", "speak-btn-sm")}</li>
            <li><strong>Type 2:</strong> ${speakBtn("Were I you, I would accept.", "Were I you, I would accept.", "speak-btn-sm")}</li>
            <li><strong>Type 3:</strong> ${speakBtn("Had we left earlier, we would not have missed the flight.", "Had we left earlier, we wouldn't have missed the flight.", "speak-btn-sm")}</li>
          </div>
        </div>

        <div class="lesson-step">
          ${stepHead("3.2", L("Mixed avanzado y otras estructuras hipotéticas", "Advanced Mixed & Other Hypotheticals"))}
          <ul class="tip-list">
            <li><strong>Past Perfect Continuous mix:</strong> ${speakBtn("If I had been studying English earlier, I would be fluent now.", "If I had been studying English earlier, I would be fluent now.", "speak-btn-sm")}</li>
            <li><strong>Provided that / As long as / Supposing:</strong> ${speakBtn("You can borrow my car provided that you return it by six.", "Provided that you return it by 6.", "speak-btn-sm")}</li>
            <li><strong>Would rather / Had better:</strong> ${speakBtn("You had better finish this today. I would rather you didn't tell anyone.", "You had better finish this today. / I would rather you didn't tell anyone.", "speak-btn-sm")}</li>
          </ul>
        </div>
      </section>
    `;
  }

  function renderPassiveAndModals() {
    return `
      <section class="card lesson-card" aria-labelledby="c1-pm-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUES 4 Y 5 · PASIVA, CAUSATIVAS Y MODALES", "BLOCKS 4 & 5 · PASSIVE, CAUSATIVES & MODALS")}</span>
          <h2 id="c1-pm-title" class="theory-title">4 &amp; 5. Diplomacy, Causatives &amp; Modal Nuance</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("4.1", L("Pasiva con reporting verbs y diplomacia", "Reporting Passives & Diplomacy"))}
          <div class="phrase-list">
            <li>${speakBtn("He is said to be the best teacher in the school.", "He is said to be the best teacher.", "speak-btn-sm")}</li>
            <li>${speakBtn("She is thought to have left the country.", "She is thought to have left the country.", "speak-btn-sm")}</li>
            <li>${speakBtn("It is widely believed that social media affects teenagers.", "It is widely believed that...", "speak-btn-sm")}</li>
          </div>
          ${revealBox("dip1", L("Ver versión diplomática", "Show diplomatic version"), `
            <p>1. You forgot to attach the file → <strong>It seems the file was not attached.</strong><br/>2. You broke the printer → <strong>The printer appears to have been damaged.</strong></p>
          `)}
        </div>

        <div class="lesson-step">
          ${stepHead("4.2", "Causatives: Have someone do vs. Get someone to do")}
          <ul class="tip-list">
            <li><strong>have + object + p.p.:</strong> <em>I had my hair cut.</em></li>
            <li><strong>have + person + base verb:</strong> ${speakBtn("I had the mechanic repair my car.", "I had the mechanic repair my car.", "speak-btn-sm")}</li>
            <li><strong>get + person + to + verb:</strong> ${speakBtn("I got Ana to help me.", "I got Ana to help me. (persuaded)", "speak-btn-sm")}</li>
          </ul>
        </div>

        <div class="lesson-step">
          ${stepHead("5", L("Deducción, crítica y expectativa (Presente y Pasado)", "Deduction, Criticism & Expectation"))}
          <ul class="tip-list">
            <li><strong>must have (deducción) vs. had to (obligación):</strong> ${speakBtn("He must have left early. He had to leave early.", "He must have left early (evidence) vs. He had to leave early (obligation).", "speak-btn-sm")}</li>
            <li><strong>ought to have / could have / would have:</strong> ${speakBtn("I ought to have studied more. We could have avoided this problem.", "I ought to have studied more. / We could have avoided this.", "speak-btn-sm")}</li>
            <li><strong>was supposed to:</strong> ${speakBtn("The meeting was supposed to start at nine.", "The meeting was supposed to start at 9.", "speak-btn-sm")}</li>
          </ul>
        </div>
      </section>
    `;
  }

  function renderReportedAndParticiples() {
    return `
      <section class="card lesson-card" aria-labelledby="c1-rp-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUES 6 Y 7 · REPORTED SPEECH Y PARTICIPIOS", "BLOCKS 6 & 7 · REPORTED SPEECH & PARTICIPLE CLAUSES")}</span>
          <h2 id="c1-rp-title" class="theory-title">6 &amp; 7. Precise Reporting &amp; Participle Clauses</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("6", L("Sin backshift + Reporting verbs precisos", "No Backshift + Precise Reporting Verbs"))}
          <p>${L("Si el hecho sigue vigente (<em>He said the Earth is round</em>), puedes mantener el presente. Usa verbos precisos: <code>deny doing</code>, <code>suggest leaving</code>, <code>apologize for being</code>, <code>insist on paying</code>, <code>argue / point out / claim that...</code>.", "Keep present tense for general truths. Use precise verbs: <code>deny doing</code>, <code>suggest leaving</code>, <code>apologize for being</code>, <code>insist on paying</code>, <code>argue / point out / claim that...</code>.")}</p>
          <p>${speakBtn("She asked whether I wanted coffee or tea. He pointed out that we had no time.", "She asked whether I wanted coffee or tea. / He pointed out that...", "speak-btn-sm")}</p>
        </div>

        <div class="lesson-step">
          ${stepHead("7", L("Gerundios, infinitivos y cláusulas participiales", "Verb Patterns & Participle Clauses"))}
          <ul class="tip-list">
            <li><strong>regret to tell</strong> (${L("mala noticia ahora", "bad news now")}) vs. <strong>regret telling</strong> (${L("arrepentimiento pasado", "past regret")})</li>
            <li><strong>mean to call</strong> (${L("tenía intención", "intended")}) vs. <strong>means changing</strong> (${L("implica", "involves")})</li>
            <li><strong>Participle clauses:</strong> ${speakBtn("Having finished her work, she went home. Built in 1990, the school is one of the oldest.", "Having finished her work, she went home. / Built in 1990, the school...", "speak-btn-sm")}</li>
            <li>✕ <del>Having finished my homework, my mom called me.</del> → ✓ <strong>Having finished my homework, I called my mom.</strong></li>
          </ul>
          ${revealBox("part1", L("Ver práctica de reducción", "Show reduced clauses"), `
            <p>1. The woman <strong>wearing a red dress</strong> is Ana.<br/>2. <strong>Having finished the report</strong>, I sent it.</p>
          `)}
        </div>
      </section>
    `;
  }

  function renderStyle() {
    return `
      <section class="card lesson-card" aria-labelledby="c1-style-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 8 · COHESIÓN, HEDGING Y NOMINALIZACIÓN", "BLOCK 8 · COHESION, HEDGING & NOMINALIZATION")}</span>
          <h2 id="c1-style-title" class="theory-title">8. Discourse Markers, Hedging &amp; Nominalization</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("8.1", L("Marcadores discursivos de argumentación C1", "C1 Argumentation Markers"))}
          <p><code>Admittedly · Granted · On the contrary · Far from · Moreover · Furthermore · Thereby · In other words · On balance</code></p>
          <p>${speakBtn("Admittedly, working from home has drawbacks. However, it reduces commuting time, thereby improving work-life balance. On balance, it is a positive change.", "Listen to C1 paragraph example", "speak-btn-sm")}</p>
        </div>

        <div class="lesson-step">
          ${stepHead("8.2", "Hedging &amp; Nominalization")}
          <div class="compare-grid">
            <div class="compare-box">
              <span class="compare-label">Hedging</span>
              <p><code>seem · appear · tend · suggest · arguably · likely</code></p>
              ${speakBtn("This suggests that the strategy is likely to succeed.", "This suggests that the strategy is likely to succeed.", "speak-btn-sm")}
            </div>
            <div class="compare-box compare-box-accent">
              <span class="compare-label">Nominalization (Formal)</span>
              <p><code>decide → decision · improve → improvement</code></p>
              ${speakBtn("The decision to expand was driven by the need for sales improvement.", "The decision to expand was driven by...", "speak-btn-sm")}
            </div>
          </div>
          ${revealBox("nom1", L("Ver práctica de nominalización", "Show nominalization answers"), `
            <p>1. There is a need for <strong>service improvement</strong>.<br/>2. Their <strong>decision to close the office</strong> was announced.</p>
          `)}
        </div>
      </section>
    `;
  }

  function renderVocabAndCanDo() {
    return `
      <section class="card lesson-card" aria-labelledby="c1-vc-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 9 · VOCABULARIO C1, CAN-DO Y RUTINA", "BLOCK 9 · C1 VOCABULARY, CAN-DO & ROUTINE")}</span>
          <h2 id="c1-vc-title" class="theory-title">9. Collocations, Idioms, Connotation &amp; 25-Min Routine</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("9.1", "Collocations, Idioms, Phrasal Verbs &amp; Connotation")}
          <ul class="tip-list">
            <li><strong>Collocations:</strong> <code>make a decision / mistake / effort</code> · <code>take a risk / responsibility / into account</code> · <code>do research / damage</code> · <code>pay attention / the price</code></li>
            <li><strong>Idioms:</strong> <em>break the ice, hit the nail on the head, the tip of the iceberg, a blessing in disguise, bite the bullet, think outside the box</em></li>
            <li><strong>Phrasal verbs:</strong> Separable (<em>turn it down, put it off, bring up</em>) vs. Inseparable (<em>look into, come across, get over</em>)</li>
            <li><strong>Connotation:</strong> <em>slim (+) vs skinny (-), affordable (+) vs cheap (-), determined (+) vs stubborn (-)</em></li>
          </ul>
        </div>

        <div class="lesson-step">
          ${stepHead("9.2", L("Plan semanal y rutina diaria de 25 min", "Weekly Focus & 25-Min Daily Routine"))}
          <div class="micro-practice">
            <ul class="check-list">
              <li><strong>0–5 min:</strong> ${L("Repasa 5 colocaciones y 3 phrasal verbs en oraciones completas.", "Review 5 collocations and 3 phrasal verbs in full sentences.")}</li>
              <li><strong>5–13 min:</strong> ${L("Escribe 8 líneas usando 1 inversión, 1 cleft y 1 nominalización.", "Write 8 lines using 1 inversion, 1 cleft, and 1 nominalization.")}</li>
              <li><strong>13–22 min:</strong> ${L("Escucha un podcast o conferencia nativa sin subtítulos; anota 2 hedges y 1 idiom.", "Listen to a native podcast/lecture without subtitles; note 2 hedges and 1 idiom.")}</li>
              <li><strong>22–25 min:</strong> ${L("Habla 1 min defendiendo una postura con Admittedly, however, on balance.", "Speak for 1 min defending an argument with Admittedly, however, on balance.")}</li>
            </ul>
          </div>
          <p><small><strong>${L("Enfoque semanal:", "Weekly focus:")}</strong> Mon: Inversion &amp; cleft · Tue: Conditionals &amp; wish · Wed: Passive &amp; hedging · Thu: Reported speech · Fri: Participles &amp; nominalization · Sat: Collocations &amp; idioms · Sun: 200-word essay or 2-min speech.</small></p>
        </div>
      </section>
    `;
  }

  function renderChecklistAndQuiz() {
    const doneCount = CHECKLIST_ITEMS.filter((_, i) => checklist[i]).length;
    const checklistHtml = CHECKLIST_ITEMS.map((item, idx) => {
      const checked = Boolean(checklist[idx]);
      return `
        <label style="display:flex; align-items:flex-start; gap:0.6rem; cursor:pointer; padding:0.45rem 0.6rem; border-radius:10px; background:${checked ? "var(--status-success-bg)" : "var(--bg-surface)"}; border:1px solid var(--border-subtle);">
          <input type="checkbox" data-c1-check="${idx}" ${checked ? "checked" : ""} style="margin-top:0.25rem;" />
          <span>${item[lang()]}</span>
        </label>`;
    }).join("");

    const letters = ["A", "B", "C", "D"];
    const questionsHtml = QUIZ_QUESTIONS.map((q, idx) => {
      const state = answers[idx];
      const opts = q.options
        .map((opt, optIdx) => {
          let cls = "option-btn";
          if (state && state.value === optIdx) {
            cls += state.correct ? " selected-correct" : " selected-wrong";
          }
          return `
            <button type="button" class="${cls}" data-c1-q="${idx}" data-c1-opt="${optIdx}">
              <span class="option-letter" aria-hidden="true">${letters[optIdx]}</span>
              <span>${t(opt)}</span>
            </button>`;
        })
        .join("");

      let feedback = "";
      if (state) {
        feedback = state.correct
          ? `<div class="feedback-banner visible success" role="status">✓ ${t(q.feedback)}</div>`
          : `<div class="feedback-banner visible error" role="status">✕ ${L("Revisa el bloque e inténtalo de nuevo.", "Review the section and try again.")}</div>`;
      }

      return `
        <li class="quiz-item">
          <p class="quiz-prompt"><span class="quiz-num">${idx + 1}</span>${t(q.prompt)}</p>
          <div class="options-list" role="group" aria-label="${L("Opciones de respuesta", "Answer options")}">${opts}</div>
          ${feedback}
        </li>`;
    }).join("");

    const correctCount = Object.values(answers).filter((a) => a.correct).length;
    const best = loadScores().c1 || 0;

    return `
      <section class="card lesson-card" aria-labelledby="c1-quiz-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 10 · CHECKLIST Y PRÁCTICA FINAL C1", "BLOCK 10 · CHECKLIST & C1 FINAL QUIZ")}</span>
          <h2 id="c1-quiz-title" class="theory-title">10. ${L(`Checklist C1 (${doneCount}/17) y Práctica Final`, `C1 Checklist (${doneCount}/17) & Final Quiz`)}</h2>
        </header>

        <div class="lesson-step" style="border-top:none; padding-top:0;">
          ${doneCount >= 12 ? `<div class="feedback-banner visible success">☸️ ${L("¡Listo para navegar hacia Captain C2!", "Ready to sail to Captain C2!")}</div>` : `<p>${L("Si dominas 12 de estos 17 puntos, estás listo para navegar a Captain C2.", "If you master 12 of these 17 points, you are ready to sail to Captain C2.")}</p>`}
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            ${checklistHtml}
          </div>
        </div>

        <div class="lesson-quiz">
          <div class="quiz-header">
            <div>
              <span class="card-eyebrow">${L("PRÁCTICA FINAL C1", "C1 FINAL PRACTICE")}</span>
              <h3 class="quiz-title">${L("Comprueba tu nivel Navigator C1", "Test your Navigator C1 level")}</h3>
            </div>
            <div class="quiz-score" aria-live="polite">
              <span class="badge badge-teal">${L("Correctas", "Correct")}: ${correctCount} / ${QUIZ_QUESTIONS.length}</span>
              <span class="badge badge-neutral">${L("Mejor", "Best")}: ${best} / ${QUIZ_QUESTIONS.length}</span>
            </div>
          </div>
          <ol class="quiz-list">${questionsHtml}</ol>
          <button type="button" id="c1-quiz-reset-btn" class="btn btn-light">↺ ${L("Reiniciar práctica", "Restart practice")}</button>
        </div>
      </section>
    `;
  }

  function render() {
    const scrollY = window.scrollY;
    const banner = window.LinguaSpanglish
      ? window.LinguaSpanglish.renderBanner(LEVEL_ID, "lesson")
      : "";
    const extraAll = window.LinguaLevelSections
      ? window.LinguaLevelSections.renderAll(LEVEL_ID)
      : "";
    let contentHtml = "";

    if (activeTab === "all") {
      contentHtml = `
        ${renderTenses()}
        ${renderEmphasis()}
        ${renderConditionals()}
        ${renderPassiveAndModals()}
        ${renderReportedAndParticiples()}
        ${renderStyle()}
        ${renderVocabAndCanDo()}
        ${renderChecklistAndQuiz()}
        ${extraAll}
      `;
    } else if (activeTab === "tenses") contentHtml = renderTenses();
    else if (activeTab === "emphasis") contentHtml = renderEmphasis();
    else if (activeTab === "cond") contentHtml = renderConditionals();
    else if (activeTab === "passive") contentHtml = renderPassiveAndModals();
    else if (activeTab === "reported") contentHtml = renderReportedAndParticiples();
    else if (activeTab === "style") contentHtml = renderStyle();
    else if (activeTab === "vocab") contentHtml = renderVocabAndCanDo();
    else if (activeTab === "quiz") contentHtml = renderChecklistAndQuiz();
    else if (window.LinguaLevelSections && activeTab.startsWith("sec-")) {
      contentHtml = window.LinguaLevelSections.renderSection(LEVEL_ID, activeTab);
    }

    root.innerHTML = `
      ${banner}
      ${renderHeroBanner()}
      ${renderFilterTabs()}
      ${contentHtml}
      <div class="level-nav-footer" style="margin-top: 2rem; display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        <a href="lesson-b2.html" class="btn btn-light">${L("← Nivel Anterior (5. Contramaestre)", "← Previous Level (5. Bosun)")}</a>
        <a href="lessons.html" class="btn btn-dark">${L("Volver a Lecciones", "Back to Lessons")}</a>
      </div>
    `;

    window.scrollTo(0, scrollY);
  }

  /* ==========================================================================
     Events
     ========================================================================== */

  root.addEventListener("click", (event) => {
    if (
      window.LinguaLevelSections &&
      window.LinguaLevelSections.handleClick(event, LEVEL_ID, render)
    ) {
      return;
    }

    const speakEl = event.target.closest("[data-speak]");
    if (speakEl) {
      speak(speakEl.getAttribute("data-speak"));
      return;
    }

    const tabBtn = event.target.closest("[data-c1-tab]");
    if (tabBtn) {
      activeTab = tabBtn.getAttribute("data-c1-tab");
      render();
      return;
    }

    const revBtn = event.target.closest("[data-c1-reveal]");
    if (revBtn) {
      const id = revBtn.getAttribute("data-c1-reveal");
      revealed[id] = !revealed[id];
      render();
      return;
    }

    const optBtn = event.target.closest("[data-c1-opt]");
    if (optBtn) {
      const qIdx = Number(optBtn.getAttribute("data-c1-q"));
      const optIdx = Number(optBtn.getAttribute("data-c1-opt"));
      const q = QUIZ_QUESTIONS[qIdx];
      if (!q) return;
      if (answers[qIdx] && answers[qIdx].correct) return;
      answers[qIdx] = { value: optIdx, correct: optIdx === q.correct };
      saveBestScore(Object.values(answers).filter((a) => a.correct).length);
      render();
      return;
    }

    if (event.target.closest("#c1-quiz-reset-btn")) {
      for (const k in answers) delete answers[k];
      render();
    }
  });

  root.addEventListener("change", (event) => {
    const cb = event.target.closest("[data-c1-check]");
    if (cb) {
      checklist[cb.getAttribute("data-c1-check")] = cb.checked;
      render();
    }
  });

  if (speechSupported) window.speechSynthesis.onvoiceschanged = pickVoice;

  new MutationObserver(render).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });

  render();
})();
