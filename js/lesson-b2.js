/**
 * LinguaVela — Lessons Module (Level 5: Bosun / B2 Upper Intermediate)
 * Complete B2 Curriculum:
 *   1. Complex Conditionals, Mixed Conditionals & Wish / If only
 *   2. Advanced Passive Voice, Distancing & Causatives (Have/Get something done)
 *   3. Past Modals (Speculation, Criticism & Supposed to)
 *   4. Extended Reported Speech & Reporting Verbs
 *   5. Gerunds vs. Infinitives (Meaning Changes & Preposition Patterns)
 *   6. Advanced Quantifiers & Determiners (Few/Little, Both/Either/Neither)
 *   7. Academic Cohesion, Essays, Can-Do Skills & 25-Min Daily Routine
 *   8. 14-Point Final B2 Checklist & 14-Question Interactive Practice Quiz
 *
 * Pure vanilla JS. Renders into #lesson-root, bilingual (ES/EN).
 * Re-renders automatically when main.js switches <html lang>.
 * Audio uses the browser's built-in Web Speech API (US English voice).
 */

(() => {
  "use strict";

  const root = document.getElementById("lesson-root");
  if (!root) return;

  const STORAGE_KEY = "linguavela-lesson-b2-scores";

  const lang = () => (document.documentElement.lang === "en" ? "en" : "es");
  const L = (es, en) => (lang() === "es" ? es : en);
  const t = (value) =>
    value && typeof value === "object" && !Array.isArray(value) && "es" in value
      ? value[lang()]
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
    if (!scores.b2 || score > scores.b2) {
      scores.b2 = score;
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
    { es: "Puedo usar third conditional y mixed conditionals sin confundir had y would have.", en: "I can use third conditional and mixed conditionals without mixing up had and would have." },
    { es: "Puedo expresar deseos y lamentos con wish + past simple, past perfect y would.", en: "I can express wishes and regrets with wish + past simple, past perfect, and would." },
    { es: "Puedo usar pasiva en tiempos continuos, perfectos y con modales.", en: "I can use passive voice in continuous, perfect, and modal forms." },
    { es: "Puedo usar pasiva impersonal con It is believed that y estructuras de distanciamiento.", en: "I can use impersonal passive (It is believed that) and distancing structures." },
    { es: "Puedo delegar o describir incidentes con have / get something done.", en: "I can delegate tasks or describe incidents with have / get something done." },
    { es: "Puedo especular sobre el pasado con must have, can't have y might have.", en: "I can speculate about the past with must have, can't have, and might have." },
    { es: "Puedo criticar con should have y hablar de expectativas con was supposed to.", en: "I can criticize with should have and talk about expectations with was supposed to." },
    { es: "Puedo reportar con backshift completo y reporting verbs (suggest, advise, admit, insist on).", en: "I can report with full backshift and reporting verbs (suggest, advise, admit, insist on)." },
    { es: "Puedo elegir entre remember to do/doing, stop to do/doing y try to do/doing.", en: "I can choose between remember to do/doing, stop to do/doing, and try to do/doing." },
    { es: "Puedo usar few vs. a few y little vs. a little según el matiz positivo o negativo.", en: "I can use few vs. a few and little vs. a little for positive or negative nuance." },
    { es: "Puedo usar both, either... or y neither... nor con concordancia correcta.", en: "I can use both, either... or, and neither... nor with correct subject-verb agreement." },
    { es: "Puedo estructurar ensayos con nevertheless, whereas, consequently, hence y trade-offs.", en: "I can structure essays with nevertheless, whereas, consequently, hence, and trade-offs." },
    { es: "Puedo seguir un podcast nativo y reconocer shoulda, coulda y flap T.", en: "I can follow a native podcast and recognize shoulda, coulda, and flap T." },
    { es: "Puedo argumentar con hedging y sonar diplomático.", en: "I can argue using hedging and sound diplomatic." },
  ];

  const QUIZ_QUESTIONS = [
    {
      prompt: { es: "Elige el Third Conditional correcto:", en: "Choose the correct Third Conditional:" },
      options: [
        "If I would have studied, I would have passed.",
        "If I had studied more, I would have passed.",
        "If I studied more, I would have passed.",
      ],
      correct: 1,
      feedback: { es: "¡Correcto! Después de «if» en Third Conditional siempre va Past Perfect (had studied), nunca «would have».", en: "Correct! After 'if' in Third Conditional always use Past Perfect (had studied), never 'would have'." },
    },
    {
      prompt: { es: "Mixed Conditional (causa pasada → resultado presente):", en: "Mixed Conditional (past cause → present result):" },
      options: [
        "If I had taken that job, I would live in Seattle now.",
        "If I had taken that job, I would have lived in Seattle now.",
        "If I took that job, I would live in Seattle now.",
      ],
      correct: 0,
      feedback: { es: "¡Exacto! Causa pasada (If I had taken) + resultado ahora (I would live... now).", en: "Exactly! Past cause (If I had taken) + present result (I would live... now)." },
    },
    {
      prompt: { es: "¿Cuál frase con «wish» es INCORRECTA?", en: "Which sentence with 'wish' is INCORRECT?" },
      options: [
        "I wish they would stop interrupting.",
        "I wish I hadn't said that.",
        "I wish I would study more.",
      ],
      correct: 2,
      feedback: { es: "¡Bien visto! No usamos «wish + would» para uno mismo; decimos «I wish I studied more».", en: "Good catch! Don't use 'wish + would' for yourself; say 'I wish I studied more'." },
    },
    {
      prompt: { es: "Completa la pasiva en Present Continuous: «The issue is currently ___ resolved.»", en: "Complete the Present Continuous passive: 'The issue is currently ___ resolved.'" },
      options: ["being", "been", "be"],
      correct: 0,
      feedback: { es: "¡Correcto! Pasiva continua: am/is/are + being + participio pasado.", en: "Correct! Continuous passive: am/is/are + being + past participle." },
    },
    {
      prompt: { es: "Te cortó el pelo el peluquero ayer. ¿Cómo lo dices?", en: "The hairdresser cut your hair yesterday. How do you say it?" },
      options: [
        "I had cut my hair yesterday.",
        "I had my hair cut yesterday.",
        "I got cut my hair yesterday.",
      ],
      correct: 1,
      feedback: { es: "¡Exacto! Causativa: Subject + have/get + objeto + participio pasado («had my hair cut»).", en: "Exactly! Causative: Subject + have/get + object + past participle ('had my hair cut')." },
    },
    {
      prompt: { es: "Son las 10 y salieron a las 8. Estás casi seguro de que ya llegaron:", en: "It's 10 and they left at 8. You are almost sure they already arrived:" },
      options: [
        "They must have arrived by now.",
        "They should have arrived by now.",
        "They can't have arrived by now.",
      ],
      correct: 0,
      feedback: { es: "¡Correcto! «Must have + participio» expresa deducción lógica casi segura sobre el pasado.", en: "Correct! 'Must have + past participle' expresses strong logical deduction about the past." },
    },
    {
      prompt: { es: "Elige el Reporting Verb correcto:", en: "Choose the correct Reporting Verb pattern:" },
      options: [
        "He apologized for being late.",
        "He apologized to be late.",
        "He suggested to leave early.",
      ],
      correct: 0,
      feedback: { es: "¡Bien! «Apologize for + -ing» (y «suggest + -ing»).", en: "Nice! 'Apologize for + -ing' (and 'suggest + -ing')." },
    },
    {
      prompt: { es: "Ya dejaste el hábito de tomar refresco. ¿Qué dices?", en: "You quit the habit of drinking soda. What do you say?" },
      options: [
        "I stopped to drink soda.",
        "I stopped drinking soda.",
        "I forgot to drink soda.",
      ],
      correct: 1,
      feedback: { es: "¡Exacto! «Stop + -ing» = dejar una actividad. «Stop to do» = parar para hacer otra cosa.", en: "Exactly! 'Stop + -ing' = quit an activity. 'Stop to do' = pause in order to do something else." },
    },
    {
      prompt: { es: "Completa el cierre de correo formal: «I look forward to ___ from you.»", en: "Complete the formal email closing: 'I look forward to ___ from you.'" },
      options: ["hear", "hearing", "heard"],
      correct: 1,
      feedback: { es: "¡Correcto! Aquí «to» es preposición, así que siempre va seguido de gerundio («hearing»).", en: "Correct! Here 'to' is a preposition, so it always takes the gerund ('hearing')." },
    },
    {
      prompt: { es: "Tienes poco dinero, pero te alcanza para ir por un café (matiz positivo):", en: "You don't have much money, but enough to grab a coffee (positive nuance):" },
      options: [
        "I have little money, let's go for coffee.",
        "I have a few money, let's go for coffee.",
        "I have a little money, let's go for coffee.",
      ],
      correct: 2,
      feedback: { es: "¡Muy bien! «Money» es incontable (usa little) y «a little» da el matiz positivo de suficiencia.", en: "Well done! 'Money' is uncountable (use little) and 'a little' gives the positive nuance of enough." },
    },
    {
      prompt: { es: "Elige la concordancia correcta: «Neither my parents nor Ana ___ there.»", en: "Choose the correct agreement: 'Neither my parents nor Ana ___ there.'" },
      options: ["was", "were", "are"],
      correct: 0,
      feedback: { es: "¡Exacto! Con «neither... nor», el verbo concuerda con el sujeto más cercano («Ana» → singular «was»).", en: "Exactly! With 'neither... nor', the verb agrees with the nearest subject ('Ana' → singular 'was')." },
    },
    {
      prompt: { es: "Elige el conector correcto:", en: "Choose the correct connector:" },
      options: [
        "Despite of the delay, we finished on time.",
        "Despite the delay, we finished on time.",
        "Whereas the delay, we finished on time.",
      ],
      correct: 1,
      feedback: { es: "¡Correcto! «Despite» nunca lleva «of» (usa «Despite the delay» o «In spite of the delay»).", en: "Correct! 'Despite' never takes 'of' (use 'Despite the delay' or 'In spite of the delay')." },
    },
    {
      prompt: { es: "¿Qué significa «I shoulda told you» en inglés estadounidense hablado?", en: "What does 'I shoulda told you' mean in spoken US English?" },
      options: ["I should tell you", "I should have told you", "I shall tell you"],
      correct: 1,
      feedback: { es: "¡Bien! «Shoulda / coulda / woulda» son reducciones habladas de «should have / could have / would have».", en: "Nice! 'Shoulda / coulda / woulda' are spoken reductions of 'should have / could have / would have'." },
    },
    {
      prompt: { es: "¿Qué frase usa «hedging» diplomático B2 en una reunión?", en: "Which phrase uses diplomatic B2 hedging in a meeting?" },
      options: [
        "You are wrong. This idea is bad.",
        "I see your point, however, I'm not sure it will work in this context.",
        "Nobody likes your idea.",
      ],
      correct: 1,
      feedback: { es: "¡Excelente! El hedging suaviza el desacuerdo y suena profesional y colaborativo.", en: "Excellent! Hedging softens disagreement and sounds professional and collaborative." },
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
        <button type="button" class="btn btn-light" style="padding:0.4rem 0.85rem; font-size:0.86rem;" data-b2-reveal="${id}">
          ${open ? L("Ocultar solución", "Hide answer") : btnLabel}
        </button>
        ${open ? `<div class="can-do-box" style="margin-top:0.5rem;">${contentHtml}</div>` : ""}
      </div>
    `;
  }

  function renderHeroBanner() {
    return `
      <div class="routine-strip" style="margin-bottom: 1.25rem;">
        <li><span class="routine-icon" aria-hidden="true">🪈</span><span><strong>${L("Nivel:", "Crew level:")}</strong> Bosun (Contramaestre) · CEFR B2 Upper Intermediate</span></li>
        <li><span class="routine-icon" aria-hidden="true">☸️</span><span><strong>${L("Insignia:", "Badge:")}</strong> ${L("Timón · Independencia comunicativa avanzada", "Helm · Advanced communicative independence")}</span></li>
        <li><span class="routine-icon" aria-hidden="true">💼</span><span>${L("Argumentación, diplomacia (hedging), informes, pasivas avanzadas y habla nativa real.", "Argumentation, diplomacy (hedging), reports, advanced passives, and native-speed comprehension.")}</span></li>
      </div>
    `;
  }

  function renderFilterTabs() {
    const tabs = [
      { id: "all", label: { es: "📚 Ver Todo", en: "📚 View All" } },
      { id: "cond", label: { es: "1. Condicionales y Wish", en: "1. Conditionals & Wish" } },
      { id: "passive", label: { es: "2. Pasiva y Causativas", en: "2. Passive & Causatives" } },
      { id: "modals", label: { es: "3. Modales Pasados", en: "3. Past Modals" } },
      { id: "reported", label: { es: "4. Reported Speech", en: "4. Reported Speech" } },
      { id: "gerunds", label: { es: "5. Gerundios / Infinitivos", en: "5. Gerunds / Infinitives" } },
      { id: "quant", label: { es: "6. Cuantificadores", en: "6. Quantifiers" } },
      { id: "academic", label: { es: "7. Cohesión y Can-Do", en: "7. Cohesion & Can-Do" } },
      { id: "quiz", label: { es: "8. Checklist y Quiz", en: "8. Checklist & Quiz" } },
    ];
    return `
      <nav class="level-bar-wrapper" aria-label="${L("Secciones del Nivel B2", "Level B2 Sections")}">
        <div class="level-tabs" role="tablist">
          ${tabs
            .map(
              (tab) => `
            <button type="button" class="level-tab-btn ${activeTab === tab.id ? "active" : ""}" role="tab" aria-selected="${activeTab === tab.id}" data-b2-tab="${tab.id}">
              ${tab.label[lang()]}
            </button>`
            )
            .join("")}
        </div>
      </nav>
    `;
  }

  function renderConditionals() {
    return `
      <section class="card lesson-card" aria-labelledby="b2-cond-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 1 · CONDICIONALES COMPLEJOS E HIPÓTESIS", "BLOCK 1 · COMPLEX CONDITIONALS & HYPOTHESES")}</span>
          <h2 id="b2-cond-title" class="theory-title">1. Third Conditional, Mixed Conditionals &amp; Wish</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("1.1", "Third Conditional / " + L("Tercer condicional", "Unreal Past"))}
          <p>${L("Hipótesis sobre un pasado que ya no cambia (arrepentimiento, alivio o crítica):", "Hypothetical past that cannot change (regret, relief, or mild criticism):")} <code>If + Past Perfect, would/could/might have + past participle</code></p>
          <div class="phrase-list">
            <li>${speakBtn("If I had studied more, I would have passed the exam.", "Would have (cierto): If I had studied more, I would have passed.", "speak-btn-sm")}</li>
            <li>${speakBtn("If she had known, she could have helped us.", "Could have (capacidad): If she had known, she could have helped us.", "speak-btn-sm")}</li>
            <li>${speakBtn("If I had taken the job, I might have been happier.", "Might have (posibilidad débil): If I had taken the job, I might have been happier.", "speak-btn-sm")}</li>
          </div>
          <p>✕ <del>If I would have studied...</del> → ✓ <strong>If I had studied...</strong> · 🗣️ <code>would've / shoulda / coulda</code></p>
        </div>

        <div class="lesson-step">
          ${stepHead("1.2", "Mixed Conditionals / " + L("Condicionales mixtos", "Mixed Time Frames"))}
          <div class="compare-grid">
            <div class="compare-box">
              <span class="compare-label">${L("Tipo 1: Causa pasada → Presente", "Type 1: Past Cause → Present Result")}</span>
              <code>If + Past Perfect, would + base</code>
              ${speakBtn("If I had taken that job, I would live in Seattle now.", "If I had taken that job, I would live in Seattle now.", "speak-btn-sm")}
            </div>
            <div class="compare-box compare-box-accent">
              <span class="compare-label">${L("Tipo 2: Rasgo presente → Pasado", "Type 2: Present Trait → Past Result")}</span>
              <code>If + Past Simple, would have + p.p.</code>
              ${speakBtn("If she were more organized, she wouldn't have missed the deadline.", "If she were more organized, she wouldn't have missed the deadline.", "speak-btn-sm")}
            </div>
          </div>
        </div>

        <div class="lesson-step">
          ${stepHead("1.3", L("Deseo y lamento: Wish / If only", "Wishes & Regrets: Wish / If only"))}
          <ul class="tip-list">
            <li><strong>Wish + Past Simple (${L("presente irreal", "unreal present")}):</strong> ${speakBtn("I wish I had more bandwidth. If only I had more time.", "I wish I had more bandwidth.", "speak-btn-sm")}</li>
            <li><strong>Wish + Past Perfect (${L("lamento pasado", "past regret")}):</strong> ${speakBtn("I wish I hadn't said that. If only I had listened to you.", "I wish I hadn't said that.", "speak-btn-sm")}</li>
            <li><strong>Wish + Would (${L("queja sobre otros/clima", "complaint about others/external")}):</strong> ${speakBtn("I wish they would stop interrupting. I wish it would stop raining.", "I wish they would stop interrupting.", "speak-btn-sm")}</li>
          </ul>
          <p>✕ <del>I wish I would study more.</del> → ✓ <strong>I wish I studied more.</strong></p>
        </div>
      </section>
    `;
  }

  function renderPassive() {
    return `
      <section class="card lesson-card" aria-labelledby="b2-passive-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 2 · PASIVA AVANZADA Y CAUSATIVAS", "BLOCK 2 · ADVANCED PASSIVE & CAUSATIVES")}</span>
          <h2 id="b2-passive-title" class="theory-title">2. ${L("Pasivas continuas, modales, distanciamiento y Causativas", "Continuous/Perfect/Modal Passives, Distancing & Causatives")}</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("2.1", L("Pasivas continuas y perfectas", "Continuous & Perfect Passives"))}
          <div class="table-wrap">
            <table class="lesson-table">
              <thead><tr><th>${L("Tiempo", "Tense")}</th><th>${L("Activa", "Active")}</th><th>${L("Pasiva", "Passive")}</th></tr></thead>
              <tbody>
                <tr><td>Present Continuous</td><td>They are fixing the issue.</td><td>${speakBtn("The issue is currently being resolved.", "The issue is currently being resolved.", "speak-btn-sm")}</td></tr>
                <tr><td>Present Perfect</td><td>They have approved the budget.</td><td>${speakBtn("The budget has already been approved.", "The budget has already been approved.", "speak-btn-sm")}</td></tr>
                <tr><td>Past Perfect</td><td>They had finished the report.</td><td>${speakBtn("The report had already been finished.", "The report had already been finished.", "speak-btn-sm")}</td></tr>
                <tr><td>Past Continuous</td><td>They were building the school.</td><td>${speakBtn("The school was being built last year.", "The school was being built last year.", "speak-btn-sm")}</td></tr>
                <tr><td>Future</td><td>They will launch the app.</td><td>${speakBtn("The app will be launched next month.", "The app will be launched next month.", "speak-btn-sm")}</td></tr>
              </tbody>
            </table>
          </div>
          <p>✕ <del>The issue is being resolving.</del> → ✓ <strong>The issue is being resolved.</strong></p>
        </div>

        <div class="lesson-step">
          ${stepHead("2.2", "Modal Passives")}
          <p><code>modal + be + p.p.</code> (${L("presente/futuro", "present/future")}) · <code>modal + have been + p.p.</code> (${L("pasado", "past")})</p>
          <div class="phrase-list">
            <li>${speakBtn("This must be done today.", "This must be done today.", "speak-btn-sm")}</li>
            <li>${speakBtn("The report should have been sent yesterday.", "The report should have been sent yesterday. (crítica)", "speak-btn-sm")}</li>
          </div>
          ${revealBox("mp1", L("Ver práctica de pasiva modal", "Show modal passive answers"), `
            <p>1. This <strong>must be finished</strong> today.<br/>2. We <strong>should have been notified</strong>.<br/>3. The file <strong>can't be found</strong>.</p>
          `)}
        </div>

        <div class="lesson-step">
          ${stepHead("2.3", L("Pasiva impersonal y distanciamiento", "Impersonal Passive & Distancing"))}
          <div class="phrase-list">
            <li>${speakBtn("It is believed that the economy will improve next year.", "It is believed that the economy will improve next year.", "speak-btn-sm")}</li>
            <li>${speakBtn("The system is expected to launch next month.", "The system is expected to launch next month.", "speak-btn-sm")}</li>
            <li>${speakBtn("The manager is said to be resigning.", "The manager is said to be resigning.", "speak-btn-sm")}</li>
          </div>
        </div>

        <div class="lesson-step">
          ${stepHead("2.4", "Causatives: Have / Get something done")}
          <p>${L("Delegar una tarea a otro, o hablar de un incidente sufrido:", "Delegate a task to someone else, or describe an unfortunate incident:")} <code>have / get + object + past participle</code></p>
          <div class="phrase-list">
            <li>${speakBtn("We had the servers upgraded.", "We had the servers upgraded. (formal / professional)", "speak-btn-sm")}</li>
            <li>${speakBtn("I need to get my car fixed.", "I need to get my car fixed. (US spoken)", "speak-btn-sm")}</li>
            <li>${speakBtn("I had my phone stolen last week.", "I had my phone stolen last week. (incident)", "speak-btn-sm")}</li>
          </div>
          <p>✕ <del>I had cut my hair yesterday.</del> → ✓ <strong>I had my hair cut yesterday.</strong></p>
        </div>
      </section>
    `;
  }

  function renderPastModals() {
    return `
      <section class="card lesson-card" aria-labelledby="b2-modals-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 3 · MODALES EN PASADO", "BLOCK 3 · PAST MODALS")}</span>
          <h2 id="b2-modals-title" class="theory-title">3. ${L("Especulación, crítica y expectativas en el pasado", "Past Speculation, Criticism & Unfulfilled Expectations")}</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("3.1", L("Especulación sobre el pasado", "Speculation About the Past"))}
          <div class="table-wrap">
            <table class="lesson-table">
              <thead><tr><th>Modal + have + p.p.</th><th>${L("Significado", "Meaning")}</th><th>${L("Ejemplo", "Example")}</th></tr></thead>
              <tbody>
                <tr><td><strong>Must have</strong></td><td>${L("Certeza lógica (95%)", "Logical certainty")}</td><td>${speakBtn("They must have arrived by now.", "They must have arrived by now.", "speak-btn-sm")}</td></tr>
                <tr><td><strong>Can't / Couldn't have</strong></td><td>${L("Imposible", "Impossible")}</td><td>${speakBtn("He can't have forgotten the meeting.", "He can't have forgotten the meeting.", "speak-btn-sm")}</td></tr>
                <tr><td><strong>Might / May / Could have</strong></td><td>${L("Posibilidad / duda", "Possibility / doubt")}</td><td>${speakBtn("She might have misunderstood the instructions.", "She might have misunderstood.", "speak-btn-sm")}</td></tr>
              </tbody>
            </table>
          </div>
          <p>🗣️ <code>must've = MUST-UV</code> · <code>might've = MIGHT-UV</code></p>
        </div>

        <div class="lesson-step">
          ${stepHead("3.2", L("Crítica vs. expectativa no cumplida", "Criticism vs. Unfulfilled Expectation"))}
          <div class="compare-grid">
            <div class="compare-box">
              <span class="compare-label">Should have / Shouldn't have</span>
              <strong>${L("Tu juicio o arrepentimiento ahora", "Judgment or regret now")}</strong>
              ${speakBtn("You should have told me earlier.", "You should have told me earlier.", "speak-btn-sm")}
            </div>
            <div class="compare-box compare-box-accent">
              <span class="compare-label">Was / Were supposed to</span>
              <strong>${L("Plan o expectativa previa", "Previous plan or expectation")}</strong>
              ${speakBtn("The report was supposed to be ready yesterday.", "The report was supposed to be ready yesterday.", "speak-btn-sm")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderReportedSpeech() {
    return `
      <section class="card lesson-card" aria-labelledby="b2-rep-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 4 · DISCURSO INDIRECTO EXTENDIDO", "BLOCK 4 · EXTENDED REPORTED SPEECH")}</span>
          <h2 id="b2-rep-title" class="theory-title">4. Backshift &amp; Specific Reporting Verbs</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("4.1", L("Backshift completo, preguntas y órdenes", "Full Backshift, Questions & Commands"))}
          <ul class="tip-list">
            <li><code>Present → Past</code> · <code>Past → Past Perfect</code> · <code>will → would</code> · <code>can → could</code> · <code>must → had to</code></li>
            <li><strong>${L("Preguntas indirectas:", "Indirect questions:")}</strong> ${speakBtn("He asked where I lived. She asked whether I had finished.", "He asked where I lived. / She asked whether I had finished.", "speak-btn-sm")} (${L("sin do, sin orden de pregunta", "no do, statement word order")})</li>
            <li><strong>${L("Órdenes y peticiones:", "Orders & requests:")}</strong> ${speakBtn("She asked me to send her the report. He told us not to be late.", "She asked me to send her the report. / He told us not to be late.", "speak-btn-sm")}</li>
          </ul>
        </div>

        <div class="lesson-step">
          ${stepHead("4.2", L("Reporting Verbs específicos (4 patrones)", "Specific Reporting Verbs (4 Patterns)"))}
          <div class="table-wrap">
            <table class="lesson-table">
              <thead><tr><th>${L("Patrón", "Pattern")}</th><th>${L("Verbos", "Verbs")}</th><th>${L("Ejemplo", "Example")}</th></tr></thead>
              <tbody>
                <tr><td><code>verb + to + inf</code></td><td>promise, refuse, threaten, offer, agree</td><td>${speakBtn("He promised to help me. She refused to sign.", "He promised to help me.", "speak-btn-sm")}</td></tr>
                <tr><td><code>verb + obj + to + inf</code></td><td>advise, remind, urge, warn, persuade</td><td>${speakBtn("She advised me to rest. He reminded me to call Ana.", "She advised me to rest.", "speak-btn-sm")}</td></tr>
                <tr><td><code>verb + -ing</code></td><td>admit, deny, suggest, recommend, avoid</td><td>${speakBtn("He admitted making a mistake. She suggested leaving early.", "He admitted making a mistake.", "speak-btn-sm")}</td></tr>
                <tr><td><code>verb + prep + -ing</code></td><td>insist on, apologize for, accuse of</td><td>${speakBtn("She insisted on paying. He apologized for being late.", "He apologized for being late.", "speak-btn-sm")}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  function renderGerunds() {
    return `
      <section class="card lesson-card" aria-labelledby="b2-ger-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 5 · GERUNDIOS VS. INFINITIVOS", "BLOCK 5 · GERUNDS VS. INFINITIVES")}</span>
          <h2 id="b2-ger-title" class="theory-title">5. ${L("Cambios radicales de significado y preposiciones", "Meaning Changes & Preposition Patterns")}</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("5.1", "Remember / Forget / Stop / Try")}
          <div class="table-wrap">
            <table class="lesson-table">
              <thead><tr><th>${L("Verbo", "Verb")}</th><th><code>to + verb</code></th><th><code>verb + -ing</code></th></tr></thead>
              <tbody>
                <tr><td><strong>Remember / Forget</strong></td><td>${L("Tarea pendiente (futuro)", "Pending task")}: ${speakBtn("Remember to call Ana.", "Remember to call Ana.", "speak-btn-sm")}</td><td>${L("Memoria pasada", "Past memory")}: ${speakBtn("I remember meeting her in Antigua.", "I remember meeting her.", "speak-btn-sm")}</td></tr>
                <tr><td><strong>Stop</strong></td><td>${L("Parar para hacer otra cosa", "Pause to do X")}: ${speakBtn("I stopped to drink water.", "I stopped to drink water.", "speak-btn-sm")}</td><td>${L("Dejar el hábito/actividad", "Quit activity")}: ${speakBtn("I stopped drinking soda.", "I stopped drinking soda.", "speak-btn-sm")}</td></tr>
                <tr><td><strong>Try</strong></td><td>${L("Esfuerzo difícil", "Make an effort")}: ${speakBtn("I tried to finish on time.", "I tried to finish on time.", "speak-btn-sm")}</td><td>${L("Probar un método", "Experiment")}: ${speakBtn("Try doing yoga.", "Try doing yoga.", "speak-btn-sm")}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="lesson-step">
          ${stepHead("5.2", L("Preposiciones + Gerundio (-ing)", "Prepositions + Gerund (-ing)"))}
          <p>${L("Regla de oro: después de preposición, siempre <strong>-ing</strong>.", "Golden rule: after a preposition, always use <strong>-ing</strong>.")}</p>
          <p><code>interested in · capable of · good at · tired of · excited about · responsible for · instead of · by + -ing</code></p>
          <p>✕ <del>I look forward to hear from you.</del> → ✓ ${speakBtn("I look forward to hearing from you.", "I look forward to hearing from you.", "speak-btn-sm")}</p>
        </div>
      </section>
    `;
  }

  function renderQuantifiers() {
    return `
      <section class="card lesson-card" aria-labelledby="b2-quant-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 6 · CUANTIFICADORES Y DETERMINANTES", "BLOCK 6 · ADVANCED QUANTIFIERS & DETERMINERS")}</span>
          <h2 id="b2-quant-title" class="theory-title">6. Few vs. A few, Little vs. A little &amp; Dualities</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("6.1", "Few / A few & Little / A little")}
          <div class="compare-grid">
            <div class="compare-box">
              <span class="compare-label">${L("Sin «a» = escasez negativa", "Without 'a' = negative scarcity")}</span>
              <p><em>Few people came.</em> (${L("casi nadie", "hardly anyone")})<br/><em>I have little time.</em> (${L("no alcanza", "not enough")})</p>
            </div>
            <div class="compare-box compare-box-accent">
              <span class="compare-label">${L("Con «a» = suficiente / positivo", "With 'a' = enough / positive")}</span>
              <p><em>A few people came.</em> (${L("algunos, bien", "some, enough")})<br/><em>I have a little money.</em> (${L("alcanza", "enough")})</p>
            </div>
          </div>
        </div>

        <div class="lesson-step">
          ${stepHead("6.2", "Both, Either... or, Neither... nor")}
          <ul class="tip-list">
            <li><strong>Both (+ plural):</strong> ${speakBtn("Both options are good.", "Both options are good.", "speak-btn-sm")}</li>
            <li><strong>Either... or:</strong> ${speakBtn("You can have either coffee or tea.", "You can have either coffee or tea.", "speak-btn-sm")}</li>
            <li><strong>Neither... nor (${L("concuerda con el sujeto más cercano", "nearest-subject agreement")}):</strong> ${speakBtn("Neither Ana nor my parents were there.", "Neither Ana nor my parents were there.", "speak-btn-sm")} · ${speakBtn("Neither my parents nor Ana was there.", "Neither my parents nor Ana was there.", "speak-btn-sm")}</li>
          </ul>
          ${revealBox("q1", L("Ver respuestas de práctica", "Show practice answers"), `
            <p>1. <strong>Neither</strong> of the answers is correct.<br/>2. You can take <strong>either</strong> the bus or the train.<br/>3. I have <strong>a little</strong> time and <strong>a little</strong> money.</p>
          `)}
        </div>
      </section>
    `;
  }

  function renderAcademicAndCanDo() {
    return `
      <section class="card lesson-card" aria-labelledby="b2-acad-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 7 · COHESIÓN ACADÉMICA, CAN-DO Y RUTINA", "BLOCK 7 · ACADEMIC COHESION, CAN-DO & ROUTINE")}</span>
          <h2 id="b2-acad-title" class="theory-title">7. ${L("Conectores formales, Ensayos, Hedging y Rutina de 25 min", "Formal Connectors, Essays, Hedging & 25-Min Routine")}</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("7.1", L("Conectores de contraste, causa y propósito", "Contrast, Cause/Effect & Purpose Connectors"))}
          <div class="phrase-list">
            <li><strong>Nevertheless:</strong> ${speakBtn("The project was risky. Nevertheless, we decided to continue.", "The project was risky. Nevertheless, we decided to continue.", "speak-btn-sm")}</li>
            <li><strong>Whereas (${L("solo contraste", "contrast only")}):</strong> ${speakBtn("Online classes are flexible, whereas face-to-face classes are more interactive.", "Online classes are flexible, whereas face-to-face classes are more interactive.", "speak-btn-sm")}</li>
            <li><strong>Consequently / As a result / Hence:</strong> ${speakBtn("Sales increased. As a result, we hired more people.", "Sales increased. As a result, we hired more people.", "speak-btn-sm")}</li>
            <li><strong>In order that / So as to:</strong> ${speakBtn("We left early so as to arrive on time.", "We left early so as to arrive on time.", "speak-btn-sm")}</li>
          </div>
          <p>✕ <del>Despite of the rain.</del> → ✓ <strong>Despite the rain.</strong> / <strong>In spite of the rain.</strong></p>
        </div>

        <div class="lesson-step">
          ${stepHead("7.2", L("Ensayos, Informes, Correspondencia y Hedging", "Essays, Reports, Formal Email & Diplomatic Hedging"))}
          <div class="technique-grid">
            <div class="technique-card"><h4>📝 ${L("Ensayo (4 párrafos)", "4-Paragraph Essay")}</h4><p><em>It is often argued that... / On the one hand... On the other hand... / Nevertheless, the benefits outweigh the drawbacks. / Taking everything into account...</em></p></div>
            <div class="technique-card"><h4>📊 ${L("Informe (Report)", "Report Phrases")}</h4><p><em>The purpose of this report is to... / According to the data... / It is recommended that... / In light of these findings...</em></p></div>
            <div class="technique-card"><h4>🤝 ${L("Hedging diplomático", "Diplomatic Hedging")}</h4><p>${speakBtn("I see your point, however, I am not sure it will work in this context.", "I see your point, however...", "speak-btn-sm")}</p></div>
            <div class="technique-card"><h4>🎧 ${L("Reducciones nativas", "Native Reductions")}</h4><p><code>shoulda · coulda · woulda · gonna · wanna · gotta · hafta</code> + <strong>Flap T</strong> (<em>better = BED-er, water = WA-der</em>).</p></div>
          </div>
          <div class="micro-practice">
            <strong>${L("Plan diario de 25 minutos (Bosun B2):", "25-minute daily plan (Bosun B2):")}</strong>
            <ul class="check-list">
              <li><strong>0–5 min:</strong> ${L("Repasa 3 mixed conditionals y 3 modales en pasado en voz alta (con shoulda, coulda, woulda).", "Review 3 mixed conditionals and 3 past modals aloud (with shoulda, coulda, woulda).")}</li>
              <li><strong>5–13 min:</strong> ${L("Escribe 8 líneas usando un third conditional, un wish + past perfect y nevertheless/consequently.", "Write 8 lines with a third conditional, wish + past perfect, and nevertheless/consequently.")}</li>
              <li><strong>13–22 min:</strong> ${L("Escucha un podcast nativo sin pausas; anota argumentos y 3 reducciones.", "Listen to a native podcast straight through; note arguments and 3 reductions.")}</li>
              <li><strong>22–25 min:</strong> ${L("Di una opinión en voz alta usando hedging (I tend to think that..., although...).", "Speak an opinion aloud using hedging (I tend to think that..., although...).")}</li>
            </ul>
          </div>
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
          <input type="checkbox" data-b2-check="${idx}" ${checked ? "checked" : ""} style="margin-top:0.25rem;" />
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
            <button type="button" class="${cls}" data-b2-q="${idx}" data-b2-opt="${optIdx}">
              <span class="option-letter" aria-hidden="true">${letters[optIdx]}</span>
              <span>${t(opt)}</span>
            </button>`;
        })
        .join("");

      let feedback = "";
      if (state) {
        feedback = state.correct
          ? `<div class="feedback-banner visible success" role="status">✓ ${t(q.feedback)}</div>`
          : `<div class="feedback-banner visible error" role="status">✕ ${L("Revisa el bloque e inténtalo de nuevo.", "Review the block and try again.")}</div>`;
      }

      return `
        <li class="quiz-item">
          <p class="quiz-prompt"><span class="quiz-num">${idx + 1}</span>${t(q.prompt)}</p>
          <div class="options-list" role="group" aria-label="${L("Opciones de respuesta", "Answer options")}">${opts}</div>
          ${feedback}
        </li>`;
    }).join("");

    const correctCount = Object.values(answers).filter((a) => a.correct).length;
    const best = loadScores().b2 || 0;

    return `
      <section class="card lesson-card" aria-labelledby="b2-quiz-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 8 · CHECKLIST Y PRÁCTICA FINAL B2", "BLOCK 8 · CHECKLIST & B2 FINAL QUIZ")}</span>
          <h2 id="b2-quiz-title" class="theory-title">8. ${L(`Checklist B2 (${doneCount}/14) y Práctica Final`, `B2 Checklist (${doneCount}/14) & Final Quiz`)}</h2>
        </header>

        <div class="lesson-step" style="border-top:none; padding-top:0;">
          ${doneCount >= 10 ? `<div class="feedback-banner visible success">🧭 ${L("¡Listo para navegar hacia Navigator C1!", "Ready to sail to Navigator C1!")}</div>` : `<p>${L("Si dominas 10 de estos 14 puntos, estás listo para navegar a Navigator C1.", "If you master 10 of these 14 points, you're ready to sail to Navigator C1.")}</p>`}
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            ${checklistHtml}
          </div>
        </div>

        <div class="lesson-quiz">
          <div class="quiz-header">
            <div>
              <span class="card-eyebrow">${L("PRÁCTICA FINAL B2", "B2 FINAL PRACTICE")}</span>
              <h3 class="quiz-title">${L("Comprueba tu nivel Bosun B2", "Test your Bosun B2 level")}</h3>
            </div>
            <div class="quiz-score" aria-live="polite">
              <span class="badge badge-teal">${L("Correctas", "Correct")}: ${correctCount} / ${QUIZ_QUESTIONS.length}</span>
              <span class="badge badge-neutral">${L("Mejor", "Best")}: ${best} / ${QUIZ_QUESTIONS.length}</span>
            </div>
          </div>
          <ol class="quiz-list">${questionsHtml}</ol>
          <button type="button" id="b2-quiz-reset-btn" class="btn btn-light">↺ ${L("Reiniciar práctica", "Restart practice")}</button>
        </div>
      </section>
    `;
  }

  function render() {
    const scrollY = window.scrollY;
    let contentHtml = "";

    if (activeTab === "all") {
      contentHtml = `
        ${renderConditionals()}
        ${renderPassive()}
        ${renderPastModals()}
        ${renderReportedSpeech()}
        ${renderGerunds()}
        ${renderQuantifiers()}
        ${renderAcademicAndCanDo()}
        ${renderChecklistAndQuiz()}
      `;
    } else if (activeTab === "cond") contentHtml = renderConditionals();
    else if (activeTab === "passive") contentHtml = renderPassive();
    else if (activeTab === "modals") contentHtml = renderPastModals();
    else if (activeTab === "reported") contentHtml = renderReportedSpeech();
    else if (activeTab === "gerunds") contentHtml = renderGerunds();
    else if (activeTab === "quant") contentHtml = renderQuantifiers();
    else if (activeTab === "academic") contentHtml = renderAcademicAndCanDo();
    else if (activeTab === "quiz") contentHtml = renderChecklistAndQuiz();

    root.innerHTML = `
      ${renderHeroBanner()}
      ${renderFilterTabs()}
      ${contentHtml}
      <div class="level-nav-footer" style="margin-top: 2rem; display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        <a href="lesson-b1.html" class="btn btn-light">${L("← Nivel Anterior (4. Marinero)", "← Previous Level (4. Sailor)")}</a>
        <a href="lessons.html" class="btn btn-dark">${L("Volver a Lecciones", "Back to Lessons")}</a>
      </div>
    `;

    window.scrollTo(0, scrollY);
  }

  /* ==========================================================================
     Events
     ========================================================================== */

  root.addEventListener("click", (event) => {
    const speakEl = event.target.closest("[data-speak]");
    if (speakEl) {
      speak(speakEl.getAttribute("data-speak"));
      return;
    }

    const tabBtn = event.target.closest("[data-b2-tab]");
    if (tabBtn) {
      activeTab = tabBtn.getAttribute("data-b2-tab");
      render();
      return;
    }

    const revBtn = event.target.closest("[data-b2-reveal]");
    if (revBtn) {
      const id = revBtn.getAttribute("data-b2-reveal");
      revealed[id] = !revealed[id];
      render();
      return;
    }

    const optBtn = event.target.closest("[data-b2-opt]");
    if (optBtn) {
      const qIdx = Number(optBtn.getAttribute("data-b2-q"));
      const optIdx = Number(optBtn.getAttribute("data-b2-opt"));
      const q = QUIZ_QUESTIONS[qIdx];
      if (!q) return;
      if (answers[qIdx] && answers[qIdx].correct) return;
      answers[qIdx] = { value: optIdx, correct: optIdx === q.correct };
      saveBestScore(Object.values(answers).filter((a) => a.correct).length);
      render();
      return;
    }

    if (event.target.closest("#b2-quiz-reset-btn")) {
      for (const k in answers) delete answers[k];
      render();
    }
  });

  root.addEventListener("change", (event) => {
    const cb = event.target.closest("[data-b2-check]");
    if (cb) {
      checklist[cb.getAttribute("data-b2-check")] = cb.checked;
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
