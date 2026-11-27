/**
 * LinguaVela — Lessons Module (Level 4: Sailor / B1 Intermediate)
 * Complete B1 Curriculum:
 *   1. Compound & Progressive Tenses (1.1 - 1.4)
 *   2. Conditionals (Zero, First, Second) (2.1 - 2.2)
 *   3. Passive Voice (Present, Past, 'by' agent) (3.1 - 3.2)
 *   4. Intermediate Modals & Used To (4.1 - 4.3)
 *   5. Discourse Cohesion, Reported Speech, Connectors & Question Tags (5.1 - 5.4)
 *   6. B1 Thematic Vocabulary (6.1 - 6.5)
 *   7. Can-Do Skills, 20-Min Daily Routine, 12-Point Checklist & 12-Question Quiz
 *
 * Pure vanilla JS. Renders into #lesson-root, bilingual (ES/EN).
 * Re-renders automatically when main.js switches <html lang>.
 * Audio uses the browser's built-in Web Speech API (US English voice).
 */

(() => {
  "use strict";

  const root = document.getElementById("lesson-root");
  if (!root) return;

  const STORAGE_KEY = "linguavela-lesson-b1-scores";

  /* ==========================================================================
     Helpers: language, translation, audio (speech synthesis)
     ========================================================================== */

  const LEVEL_ID = "b1";
  const lang = () => (document.documentElement.lang === "en" ? "en" : "es");
  const L = (es, en) =>
    window.LinguaSpanglish
      ? window.LinguaSpanglish.pair(es, en, LEVEL_ID)
      : lang() === "es"
      ? es
      : en;

  const t = (value) =>
    value && typeof value === "object" && !Array.isArray(value) && ("es" in value || "en" in value || "spanglish" in value)
      ? window.LinguaSpanglish
        ? window.LinguaSpanglish.resolve(value, LEVEL_ID)
        : value[lang()]
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
    if (!scores.b1 || score > scores.b1) {
      scores.b1 = score;
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
    { es: "Puedo decir cuánto tiempo llevo haciendo algo con have been + ing y for / since.", en: "I can say how long I've been doing something with have been + ing and for / since." },
    { es: "Puedo narrar con Past Continuous y Past Simple, y ordenar con Past Perfect.", en: "I can narrate with Past Continuous & Past Simple, and sequence with Past Perfect." },
    { es: "Puedo hablar de futuro con will, going to y Present Continuous según decisión, plan o arreglo.", en: "I can talk about the future with will, going to, and Present Continuous (decision, plan, arrangement)." },
    { es: "Puedo usar Zero, First y Second Conditional sin confundir will y would.", en: "I can use Zero, First, and Second Conditional without mixing up will and would." },
    { es: "Puedo usar pasiva en presente y pasado, y añadir by solo si aporta.", en: "I can use present and past passive, adding by only when it adds important info." },
    { es: "Puedo especular sobre el presente con must, might, could y can't.", en: "I can speculate about the present with must, might, could, and can't." },
    { es: "Puedo diferenciar must, have to, don't have to, mustn't, should y ought to.", en: "I can tell apart must, have to, don't have to, mustn't, should, and ought to." },
    { es: "Puedo hablar de hábitos pasados con used to (y didn't use to).", en: "I can talk about past habits with used to (and didn't use to)." },
    { es: "Puedo unir ideas con who, which, that, where, whose.", en: "I can connect ideas with who, which, that, where, and whose." },
    { es: "Puedo reportar lo que dijo alguien con said that y asked if.", en: "I can report what someone said with said that and asked if." },
    { es: "Puedo usar although, however, despite, because of, in order to y so that.", en: "I can use although, however, despite, because of, in order to, and so that." },
    { es: "Puedo usar question tags con la entonación correcta.", en: "I can use question tags with the right intonation." },
  ];

  const QUIZ_QUESTIONS = [
    {
      prompt: { es: "Completa: «I have been living in Mixco ___ 2020.»", en: "Complete: 'I have been living in Mixco ___ 2020.'" },
      options: ["for", "since", "during"],
      correct: 1,
      feedback: { es: "¡Correcto! Usamos «since» con puntos de inicio exactos (2020, 8 a.m., Monday).", en: "Correct! Use 'since' with a starting point (2020, 8 a.m., Monday)." },
    },
    {
      prompt: { es: "Elige la oración correcta (acción de fondo + interrupción):", en: "Choose the correct sentence (background action + interruption):" },
      options: [
        "I was walking home when it was starting to rain.",
        "I walked home when it was starting to rain.",
        "I was walking home when it started to rain.",
      ],
      correct: 2,
      feedback: { es: "¡Exacto! Fondo largo en Past Continuous (was walking) e interrupción en Past Simple (started).", en: "Exactly! Long background in Past Continuous (was walking) and interruption in Past Simple (started)." },
    },
    {
      prompt: { es: "Ya compraste el boleto para mañana a las 7 a.m. ¿Qué dices?", en: "You already bought a ticket for tomorrow at 7 a.m. What do you say?" },
      options: [
        "I am flying to Petén tomorrow at 7 a.m.",
        "I will fly to Petén tomorrow at 7 a.m.",
        "I flew to Petén tomorrow at 7 a.m.",
      ],
      correct: 0,
      feedback: { es: "¡Bien! Para arreglos agendados con boleto, cita o reserva usamos Present Continuous.", en: "Nice! For scheduled arrangements with a ticket or booking, use Present Continuous." },
    },
    {
      prompt: { es: "Elige el First Conditional correcto:", en: "Choose the correct First Conditional:" },
      options: [
        "If I will study tonight, I will pass.",
        "If I study tonight, I will pass.",
        "If I studied tonight, I will pass.",
      ],
      correct: 1,
      feedback: { es: "¡Correcto! Después de «if» en First Conditional usamos Present Simple, nunca «will».", en: "Correct! After 'if' in First Conditional we use Present Simple, never 'will'." },
    },
    {
      prompt: { es: "Situación imaginaria ahora: «If I ___ you, I would practice every day.»", en: "Imaginary situation now: 'If I ___ you, I would practice every day.'" },
      options: ["am", "were", "will be"],
      correct: 1,
      feedback: { es: "¡Exacto! En Second Conditional usamos Past Simple («If I were you...»).", en: "Exactly! In Second Conditional we use Past Simple ('If I were you...')." },
    },
    {
      prompt: { es: "Pasa a voz pasiva: «They built this school in 2005.»", en: "Change to passive voice: 'They built this school in 2005.'" },
      options: [
        "This school was built in 2005.",
        "This school was builded in 2005.",
        "This school is built in 2005 by them.",
      ],
      correct: 0,
      feedback: { es: "¡Perfecto! Pasado pasivo: was/were + participio pasado (built), sin «by them».", en: "Perfect! Past passive: was/were + past participle (built), without 'by them'." },
    },
    {
      prompt: { es: "Son las 9 a.m. y él siempre está en la oficina a esa hora. ¿Qué deduces?", en: "It is 9 a.m. and he is always at the office then. What do you deduce?" },
      options: ["He can't be at the office.", "He must be at the office.", "He must to be at the office."],
      correct: 1,
      feedback: { es: "¡Correcto! «Must» expresa deducción lógica casi segura (sin «to»).", en: "Correct! 'Must' expresses strong logical deduction (without 'to')." },
    },
    {
      prompt: { es: "Elige la negativa correcta de «used to»:", en: "Choose the correct negative of 'used to':" },
      options: [
        "I didn't used to like coffee.",
        "I didn't use to like coffee.",
        "I wasn't used to like coffee.",
      ],
      correct: 1,
      feedback: { es: "¡Muy bien! Con «didn't» y «did», el verbo vuelve a «use to» sin la -d final.", en: "Well done! With 'didn't' and 'did', it goes back to 'use to' without the final -d." },
    },
    {
      prompt: { es: "Une las ideas sin repetir el pronombre:", en: "Join the ideas without repeating the pronoun:" },
      options: [
        "The man who works here is friendly.",
        "The man who he works here is friendly.",
        "The man which works here is friendly.",
      ],
      correct: 0,
      feedback: { es: "¡Correcto! «Who» ya reemplaza a «he» para personas.", en: "Correct! 'Who' already replaces 'he' for people." },
    },
    {
      prompt: { es: "Reporta: Ana dijo «I will travel tomorrow.»", en: "Report: Ana said 'I will travel tomorrow.'" },
      options: [
        "Ana said that she will travel tomorrow.",
        "Ana said that she would travel the next day.",
        "Ana said that she traveled tomorrow.",
      ],
      correct: 1,
      feedback: { es: "¡Excelente! «Will» retrocede a «would» y «tomorrow» cambia a «the next day».", en: "Excellent! 'Will' shifts back to 'would' and 'tomorrow' changes to 'the next day'." },
    },
    {
      prompt: { es: "Elige el conector correcto con sustantivo:", en: "Choose the correct connector before a noun:" },
      options: [
        "Although the rain, we went out.",
        "Despite it was raining, we went out.",
        "Despite the rain, we went out.",
      ],
      correct: 2,
      feedback: { es: "¡Exacto! «Despite / In spite of» van con sustantivo o -ing; «Although» va con oración completa.", en: "Exactly! 'Despite / In spite of' take a noun or -ing; 'Although' takes a full clause." },
    },
    {
      prompt: { es: "Añade la Question Tag: «She didn't study, ___?»", en: "Add the Question Tag: 'She didn't study, ___?'" },
      options: ["did she", "didn't she", "does she"],
      correct: 0,
      feedback: { es: "¡Correcto! Oración negativa («didn't») → tag afirmativo con el mismo auxiliar («did she?»).", en: "Correct! Negative statement ('didn't') → positive tag with the same auxiliary ('did she?')." },
    },
  ];

  /* ==========================================================================
     Section Renderers
     ========================================================================== */

  const stepHead = (num, title) =>
    `<h3 class="lesson-step-title"><span class="lesson-step-num">${num}</span>${title}</h3>`;

  function revealBox(id, btnLabel, contentHtml) {
    const open = Boolean(revealed[id]);
    return `
      <div style="margin-top:0.4rem;">
        <button type="button" class="btn btn-light" style="padding:0.4rem 0.85rem; font-size:0.86rem;" data-b1-reveal="${id}">
          ${open ? L("Ocultar solución", "Hide answer") : btnLabel}
        </button>
        ${open ? `<div class="can-do-box" style="margin-top:0.5rem;">${contentHtml}</div>` : ""}
      </div>
    `;
  }

  function renderHeroBanner() {
    return `
      <div class="routine-strip" style="margin-bottom: 1.25rem;">
        <li><span class="routine-icon" aria-hidden="true">⛵</span><span><strong>${L("Nivel:", "Crew level:")}</strong> Sailor (Marinero) · CEFR B1 Intermediate</span></li>
        <li><span class="routine-icon" aria-hidden="true">🧭</span><span><strong>${L("Insignia:", "Badge:")}</strong> ${L("Brújula · Independencia comunicativa", "Compass · Communicative independence")}</span></li>
        <li><span class="routine-icon" aria-hidden="true">🗣️</span><span>${L("Viajar, trabajar, contar historias con 3 pasados y defender opiniones.", "Travel, work, tell stories with 3 past tenses, and defend opinions.")}</span></li>
      </div>
    `;
  }

  function renderFilterTabs() {
    const tabs = [
      { id: "all", label: { es: "📚 Ver Todo", en: "📚 View All" } },
      { id: "tenses", label: { es: "1. Tiempos Compuestos", en: "1. Tenses" } },
      { id: "conditionals", label: { es: "2. Condicionales", en: "2. Conditionals" } },
      { id: "passive", label: { es: "3. Voz Pasiva", en: "3. Passive Voice" } },
      { id: "modals", label: { es: "4. Modales y Used to", en: "4. Modals & Used to" } },
      { id: "cohesion", label: { es: "5. Cohesión y Discurso", en: "5. Cohesion & Speech" } },
      { id: "vocab", label: { es: "6. Vocabulario B1", en: "6. B1 Vocabulary" } },
      { id: "cando", label: { es: "7. Can-Do y Práctica", en: "7. Can-Do & Quiz" } },
      ...(window.LinguaLevelSections ? window.LinguaLevelSections.getTabDefs(LEVEL_ID) : []),
    ];
    return `
      <nav class="level-bar-wrapper" aria-label="${L("Secciones del Nivel B1", "Level B1 Sections")}">
        <div class="level-tabs" role="tablist">
          ${tabs
            .map(
              (tab) => `
            <button type="button" class="level-tab-btn ${activeTab === tab.id ? "active" : ""}" role="tab" aria-selected="${activeTab === tab.id}" data-b1-tab="${tab.id}">
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
      <section class="card lesson-card" aria-labelledby="b1-tenses-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 1 · TIEMPOS VERBALES", "BLOCK 1 · COMPOUND & PROGRESSIVE TENSES")}</span>
          <h2 id="b1-tenses-title" class="theory-title">1. ${L("Tiempos verbales compuestos y progresivos", "Compound & Progressive Tenses")}</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("1.1", "Present Perfect Continuous")}
          <p>${L("Acción que empezó en el pasado y sigue ahora, o acaba de terminar con un efecto visible.", "An action that started in the past and continues now, or just finished with a visible effect.")} <code>Subject + have/has + been + verb-ing</code></p>
          <div class="compare-grid">
            <div class="compare-box"><span class="compare-label">For + ${L("duración", "duration")}</span><strong>for 3 hours / 2 weeks</strong>${speakBtn("I have been studying for three hours.", "I've been studying for 3 hours.", "speak-btn-sm")}</div>
            <div class="compare-box compare-box-accent"><span class="compare-label">Since + ${L("inicio", "start point")}</span><strong>since 8 a.m. / 2020</strong>${speakBtn("She has been working since 8 a.m.", "She's been working since 8 a.m.", "speak-btn-sm")}</div>
          </div>
          <div class="example-box">
            <span class="example-box-label">${L("SIMPLE VS CONTINUOUS & PRONUNCIACIÓN US", "SIMPLE VS CONTINUOUS & US PRONUNCIATION")}</span>
            <ul class="tip-list">
              <li><strong>Simple (${L("resultado", "result")}):</strong> <em>I have read 3 books this month.</em> · <strong>Continuous (${L("proceso", "process")}):</strong> <em>I have been reading all morning.</em></li>
              <li>✕ <del>I have been knowing him for years.</del> → ✓ <strong>I have known him for years.</strong> (${L("verbos de estado: know, like, love, have, be", "state verbs")})</li>
              <li>🗣️ <code>I've been studying</code> → <code>AIV-BIN-STUDY-ing</code> (${L("been corto y ligado", "short linked been")})</li>
            </ul>
          </div>
          ${revealBox("t1", L("Ver práctica (for / since)", "Show practice (for / since)"), `
            <p>1. I have been living in Mixco <strong>since</strong> 2020.<br/>2. I have been learning English <strong>for</strong> two years.</p>
          `)}
        </div>

        <div class="lesson-step">
          ${stepHead("1.2", "Past Continuous vs. Past Simple")}
          <p>${L("Regla de oro para narrar: <strong>Past Continuous</strong> = acción larga de fondo (<code>was/were + ing</code>); <strong>Past Simple</strong> = acción corta que interrumpe.", "Golden rule: <strong>Past Continuous</strong> = long background action; <strong>Past Simple</strong> = short interrupting action.")}</p>
          <div class="phrase-list">
            <li>${speakBtn("I was walking home when it started to rain.", "I was walking home when it started to rain.", "speak-btn-sm")}</li>
            <li>${speakBtn("While I was cooking, Max was sleeping.", "While I was cooking, Max was sleeping. (2 long actions)", "speak-btn-sm")}</li>
            <li>${speakBtn("As I was leaving, Elena called me.", "As I was leaving, Elena called me.", "speak-btn-sm")}</li>
          </div>
          <p>✕ <del>I was walking home when it was starting to rain.</del> → ✓ <strong>...when it started to rain.</strong></p>
        </div>

        <div class="lesson-step">
          ${stepHead("1.3", "Past Perfect Simple")}
          <p>${L("Ordena dos hechos del pasado (dice cuál ocurrió primero):", "Orders two past events (shows which happened first):")} <code>Subject + had + past participle</code></p>
          <div class="phrase-list">
            <li>${speakBtn("When we arrived, the train had already left.", "When we arrived, the train had already left.", "speak-btn-sm")}</li>
            <li>${speakBtn("By the time I got home, they had already eaten.", "By the time I got home, they had already eaten.", "speak-btn-sm")}</li>
            <li>${speakBtn("I recognized him because I had met him in Antigua last year.", "I recognized him because I had met him in Antigua last year.", "speak-btn-sm")}</li>
          </div>
          <p>✕ <del>When we arrived, the train already left.</del> → ✓ <strong>...the train had already left.</strong></p>
        </div>

        <div class="lesson-step">
          ${stepHead("1.4", L("Formas de futuro combinadas (3 formas)", "Combined Future Forms (3 Forms)"))}
          <div class="table-wrap">
            <table class="lesson-table">
              <thead><tr><th>${L("Forma", "Form")}</th><th>${L("Uso", "Use")}</th><th>${L("Ejemplo", "Example")}</th></tr></thead>
              <tbody>
                <tr><td><strong>Will</strong></td><td>${L("Decisión espontánea, promesa, predicción", "Spontaneous decision, promise, prediction")}</td><td>${speakBtn("I will help you.", "I'll help you.", "speak-btn-sm")}</td></tr>
                <tr><td><strong>Going to</strong></td><td>${L("Plan previo, intención, evidencia", "Prior plan, intention, evidence")}</td><td>${speakBtn("I am going to study tonight.", "I'm gonna study tonight.", "speak-btn-sm")}</td></tr>
                <tr><td><strong>Present Continuous</strong></td><td>${L("Arreglo agendado (boleto, cita, hora)", "Scheduled arrangement (ticket, time)")}</td><td>${speakBtn("I am flying to Chicago tomorrow at 9 a.m.", "I'm flying to Chicago tomorrow at 9 a.m.", "speak-btn-sm")}</td></tr>
              </tbody>
            </table>
          </div>
          ${revealBox("f1", L("Ver práctica de futuro", "Show future practice"), `
            <p>1. I <strong>will</strong> help you. (decisión ahora)<br/>2. I <strong>am flying</strong> to Petén tomorrow at 7. (boleto)<br/>3. I <strong>am going to</strong> study tonight. (plan)</p>
          `)}
        </div>
      </section>
    `;
  }

  function renderConditionals() {
    return `
      <section class="card lesson-card" aria-labelledby="b1-cond-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 2 · CONDICIONALES", "BLOCK 2 · CONDITIONALS")}</span>
          <h2 id="b1-cond-title" class="theory-title">2. ${L("Estructuras hipotéticas y condicionales", "Conditionals (Zero, First & Second)")}</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("2.1", "Zero & First Conditional")}
          <div class="compare-grid">
            <div class="compare-box">
              <span class="compare-label">Zero (If + Present, Present)</span>
              <strong>${L("Verdad general / causa y efecto", "General truth / cause & effect")}</strong>
              ${speakBtn("If you heat water, it boils.", "If you heat water, it boils.", "speak-btn-sm")}
            </div>
            <div class="compare-box compare-box-accent">
              <span class="compare-label">First (If + Present, will/can)</span>
              <strong>${L("Futuro real y probable", "Real & likely future")}</strong>
              ${speakBtn("If I study tonight, I will pass the test.", "If I study tonight, I'll pass the test.", "speak-btn-sm")}
            </div>
          </div>
          <ul class="tip-list">
            <li>✕ <del>If I will study, I will pass.</del> → ✓ <strong>If I study, I will pass.</strong> (${L("nunca will después de if", "never will after if")})</li>
            <li><strong>Unless (= if not):</strong> ${speakBtn("Unless you study, you won't pass.", "Unless you study, you won't pass.", "speak-btn-sm")}</li>
          </ul>
        </div>

        <div class="lesson-step">
          ${stepHead("2.2", "Second Conditional")}
          <p>${L("Situaciones imaginarias o improbables en presente/futuro:", "Imaginary or unlikely situations in present/future:")} <code>If + Past Simple, would / could / might + base verb</code></p>
          <div class="phrase-list">
            <li>${speakBtn("If I had more time, I would travel more.", "If I had more time, I would travel more.", "speak-btn-sm")}</li>
            <li>${speakBtn("If I were you, I would study a little every day.", "If I were you, I would study every day.", "speak-btn-sm")}</li>
            <li>${speakBtn("If I had money, I could buy a car.", "If I had money, I could buy a car. (possibility)", "speak-btn-sm")}</li>
            <li>${speakBtn("If I spoke French, I might work in Paris.", "If I spoke French, I might work in Paris.", "speak-btn-sm")}</li>
          </div>
        </div>
      </section>
    `;
  }

  function renderPassive() {
    return `
      <section class="card lesson-card" aria-labelledby="b1-passive-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 3 · VOZ PASIVA", "BLOCK 3 · PASSIVE VOICE")}</span>
          <h2 id="b1-passive-title" class="theory-title">3. Passive Voice</h2>
          <p class="theory-explanation">${L(
            "En pasiva el enfoque está en la acción o el objeto, cuando el causante es desconocido, obvio o irrelevante.",
            "In passive voice, the focus is on the action or object when the agent is unknown, obvious, or irrelevant."
          )}</p>
        </header>

        <div class="lesson-step">
          ${stepHead("3.1", L("Pasiva en Presente y Pasado", "Present & Past Simple Passive"))}
          <div class="compare-grid">
            <div class="compare-box">
              <span class="compare-label">am / is / are + past participle</span>
              ${speakBtn("The software is updated weekly.", "The software is updated weekly.", "speak-btn-sm")}
              ${speakBtn("This bread is made in Antigua.", "This bread is made in Antigua.", "speak-btn-sm")}
            </div>
            <div class="compare-box compare-box-accent">
              <span class="compare-label">was / were + past participle</span>
              ${speakBtn("The report was written yesterday.", "The report was written yesterday.", "speak-btn-sm")}
              ${speakBtn("My phone was stolen last week.", "My phone was stolen last week.", "speak-btn-sm")}
            </div>
          </div>
          <p>✕ <del>The report was wrote yesterday.</del> → ✓ <strong>The report was written yesterday.</strong></p>
        </div>

        <div class="lesson-step">
          ${stepHead("3.2", L("¿Cuándo usar «by»?", "When to use 'by'?"))}
          <p>${L("Solo añade <strong>by + agente</strong> cuando aporta información nueva e importante:", "Only add <strong>by + agent</strong> when it adds new, important information:")}</p>
          <p>${speakBtn("The book was written by Gabriel Garcia Marquez.", "The book was written by Gabriel García Márquez.", "speak-btn-sm")} · ${L("(No digas «by someone»).", "(Never add 'by someone').")}</p>
          ${revealBox("p1", L("Ver soluciones de práctica", "Show practice answers"), `
            <p>1. The office <strong>is cleaned</strong> every day.<br/>2. My bike <strong>was stolen</strong>.<br/>3. This school <strong>was built</strong> in 2005.</p>
          `)}
        </div>
      </section>
    `;
  }

  function renderModalsAndUsedTo() {
    return `
      <section class="card lesson-card" aria-labelledby="b1-modals-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 4 · MODALES Y HÁBITOS PASADOS", "BLOCK 4 · MODALS & USED TO")}</span>
          <h2 id="b1-modals-title" class="theory-title">4. ${L("Modales intermedios y Used to", "Intermediate Modals & Used to")}</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("4.1", L("Deducción y probabilidad: Must, Might, Could, Can't", "Deduction & Probability: Must, Might, Could, Can't"))}
          <div class="table-wrap">
            <table class="lesson-table">
              <thead><tr><th>Modal</th><th>${L("Significado", "Meaning")}</th><th>${L("Ejemplo", "Example")}</th></tr></thead>
              <tbody>
                <tr><td><strong>Must</strong></td><td>${L("Casi seguro que sí (95%)", "Logical certainty (95%)")}</td><td>${speakBtn("He must be at the office.", "He must be at the office.", "speak-btn-sm")}</td></tr>
                <tr><td><strong>Might / Could</strong></td><td>${L("Posible (50%)", "Possible (50%)")}</td><td>${speakBtn("She might be sick. He could be in a meeting.", "She might be sick. / He could be in a meeting.", "speak-btn-sm")}</td></tr>
                <tr><td><strong>Can't</strong></td><td>${L("Imposible, casi seguro que no", "Impossible, logically not")}</td><td>${speakBtn("That can't be Elena. Elena is in Guatemala.", "That can't be Elena.", "speak-btn-sm")}</td></tr>
              </tbody>
            </table>
          </div>
          <p>✕ <del>He must to be at home.</del> → ✓ <strong>He must be at home.</strong> · 🗣️ <code>Can't</code> = <code>KAENT</code> (${L("t final clara", "clear final t")}).</p>
        </div>

        <div class="lesson-step">
          ${stepHead("4.2", L("Obligación, prohibición y consejo", "Obligation, Prohibition & Advice"))}
          <ul class="tip-list">
            <li><strong>Must</strong> (${L("obligación interna / fuerte", "personal / strong")}): <em>I must study tonight.</em></li>
            <li><strong>Have to</strong> (${L("norma externa", "external rule")}): <em>I have to wear a uniform.</em></li>
            <li><strong>Don't have to</strong> (${L("opcional, sin obligación", "optional, no obligation")}): <em>You don't have to bring food.</em></li>
            <li><strong>Mustn't</strong> (${L("prohibido", "prohibited")}): <em>You mustn't smoke here.</em></li>
            <li><strong>Should / Ought to</strong> (${L("consejo; ought to es más formal", "advice; ought to is more formal")}): <em>You should practice every day. / You ought to rest more.</em></li>
          </ul>
        </div>

        <div class="lesson-step">
          ${stepHead("4.3", L("Hábitos pasados: Used to", "Past Habits: Used to"))}
          <p>${L("Costumbres o estados de antes que ya no existen:", "Past habits or states that are no longer true:")} <code>used to + base verb</code> · 🗣️ <code>YUSTU</code></p>
          <div class="phrase-list">
            <li>${speakBtn("I used to work in sales.", "I used to work in sales. (AI-YUSTU-WORK)", "speak-btn-sm")}</li>
            <li>${speakBtn("I didn't use to like coffee.", "I didn't use to like coffee. (sin -d en negativa)", "speak-btn-sm")}</li>
            <li>${speakBtn("Did you use to play an instrument?", "Did you use to play an instrument?", "speak-btn-sm")}</li>
          </div>
        </div>
      </section>
    `;
  }

  function renderCohesion() {
    return `
      <section class="card lesson-card" aria-labelledby="b1-cohesion-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 5 · COHESIÓN Y DISCURSO", "BLOCK 5 · COHESION & REPORTED SPEECH")}</span>
          <h2 id="b1-cohesion-title" class="theory-title">5. ${L("Cláusulas, Discurso Indirecto, Conectores y Question Tags", "Relative Clauses, Reported Speech, Connectors & Tags")}</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("5.1", L("Cláusulas de relativo: Who, Which, That, Where, Whose", "Defining Relative Clauses"))}
          <ul class="tip-list">
            <li><strong>Who:</strong> ${speakBtn("The woman who works at the market is Elena.", "The woman who works at the market is Elena.", "speak-btn-sm")}</li>
            <li><strong>Which / That:</strong> ${speakBtn("The dog that barks a lot is Max.", "The dog that barks a lot is Max.", "speak-btn-sm")}</li>
            <li><strong>Where:</strong> ${speakBtn("This is the store where I buy bread.", "This is the store where I buy bread.", "speak-btn-sm")}</li>
            <li><strong>Whose:</strong> ${speakBtn("That's the man whose car is red.", "That's the man whose car is red.", "speak-btn-sm")}</li>
          </ul>
          <p>✕ <del>The man who he works here.</del> → ✓ <strong>The man who works here.</strong></p>
        </div>

        <div class="lesson-step">
          ${stepHead("5.2", "Reported Speech / " + L("Discurso indirecto", "Reporting What People Said"))}
          <div class="table-wrap">
            <table class="lesson-table">
              <thead><tr><th>${L("Directo", "Direct")}</th><th>${L("Indirecto (retrocede un tiempo)", "Reported (backshift)")}</th></tr></thead>
              <tbody>
                <tr><td>"I am busy."</td><td>${speakBtn("He said that he was busy.", "He said that he was busy.", "speak-btn-sm")}</td></tr>
                <tr><td>"I will call you."</td><td>${speakBtn("She said that she would call me.", "She said that she would call me.", "speak-btn-sm")}</td></tr>
                <tr><td>"I went to the market."</td><td>${speakBtn("He said that he had gone to the market.", "He said that he had gone to the market.", "speak-btn-sm")}</td></tr>
                <tr><td>"Do you speak English?"</td><td>${speakBtn("Ana asked if I spoke English.", "Ana asked if I spoke English.", "speak-btn-sm")}</td></tr>
                <tr><td>"Where do you live?"</td><td>${speakBtn("He asked where I lived.", "He asked where I lived.", "speak-btn-sm")}</td></tr>
              </tbody>
            </table>
          </div>
          <p><small><code>today → that day</code> · <code>tomorrow → the next day</code> · <code>yesterday → the day before</code></small></p>
        </div>

        <div class="lesson-step">
          ${stepHead("5.3", L("Conectores lógicos y de contraste", "Logical & Contrast Connectors"))}
          <div class="phrase-list">
            <li><strong>Although / Though (+ ${L("oración", "clause")}):</strong> ${speakBtn("Although it was raining, we went out.", "Although it was raining, we went out.", "speak-btn-sm")}</li>
            <li><strong>However:</strong> ${speakBtn("It was raining. However, we went out.", "It was raining. However, we went out.", "speak-btn-sm")}</li>
            <li><strong>Despite / In spite of (+ ${L("sustantivo / -ing", "noun / -ing")}):</strong> ${speakBtn("Despite the rain, we went out. Despite being tired, she studied.", "Despite the rain, we went out.", "speak-btn-sm")}</li>
            <li><strong>Because of (+ ${L("sustantivo", "noun")}) vs Because (+ ${L("oración", "clause")}):</strong> ${speakBtn("Because of the rain, we stayed home.", "Because of the rain, we stayed home.", "speak-btn-sm")}</li>
            <li><strong>In order to / So that:</strong> ${speakBtn("I study every day in order to improve. I save money so that I can travel.", "I study in order to improve. / I save money so that I can travel.", "speak-btn-sm")}</li>
          </div>
        </div>

        <div class="lesson-step">
          ${stepHead("5.4", "Question Tags")}
          <p>${L("Afirmativa → tag negativo; Negativa → tag afirmativo. Voz sube = duda real; voz baja = confirmación.", "Positive → negative tag; Negative → positive tag. Rising voice = real question; falling = confirming.")}</p>
          <div class="phrase-list">
            <li>${speakBtn("You're coming, aren't you?", "You're coming, aren't you?", "speak-btn-sm")}</li>
            <li>${speakBtn("He didn't call, did he?", "He didn't call, did he?", "speak-btn-sm")}</li>
            <li>${speakBtn("I am late, aren't I? Let's go, shall we?", "Special: I am late, aren't I? / Let's go, shall we?", "speak-btn-sm")}</li>
          </div>
          ${revealBox("qt1", L("Ver respuestas de Question Tags", "Show Question Tag answers"), `
            <p>1. You like coffee, <strong>don't you</strong>?<br/>2. She didn't study, <strong>did she</strong>?<br/>3. We are friends, <strong>aren't we</strong>?</p>
          `)}
        </div>
      </section>
    `;
  }

  function renderVocabulary() {
    return `
      <section class="card lesson-card" aria-labelledby="b1-vocab-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 6 · VOCABULARIO TEMÁTICO B1", "BLOCK 6 · B1 THEMATIC VOCABULARY")}</span>
          <h2 id="b1-vocab-title" class="theory-title">6. ${L("5 Áreas temáticas de vocabulario B1", "5 B1 Vocabulary Areas")}</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("6.1", L("Relaciones y emociones", "Relationships & Emotions"))}
          <p><strong>${L("Personalidad:", "Personality:")}</strong> <em>outgoing, stubborn, generous, patient, reliable, moody</em> · <strong>${L("Emociones:", "Emotions:")}</strong> <em>disappointed, proud, embarrassed, relieved, grateful</em> · <strong>${L("Conflictos:", "Conflicts:")}</strong> <em>to argue, apologize, forgive, make up, misunderstand</em></p>
          <p>${speakBtn("We had a misunderstanding, but we talked and made up.", "We had a misunderstanding, but we talked and made up.", "speak-btn-sm")}</p>
        </div>

        <div class="lesson-step">
          ${stepHead("6.2", L("Viajes y logística (Diálogo de hotel)", "Travel & Logistics (Hotel Dialogue)"))}
          <p><code>boarding pass · gate · customs · luggage · carry-on · check-in · check-out · flight delay</code></p>
          <ol class="dialogue">
            <li class="dialogue-line"><span class="dialogue-who">A</span>${speakBtn("Hi, I have a reservation for tonight. My name is Corona.", "Hi, I have a reservation for tonight. My name is Corona.", "speak-btn-line")}</li>
            <li class="dialogue-line dialogue-b"><span class="dialogue-who">B</span>${speakBtn("Let me check. Yes, you have a double room for 2 nights.", "Let me check. Yes, you have a double room for 2 nights.", "speak-btn-line")}</li>
            <li class="dialogue-line"><span class="dialogue-who">A</span>${speakBtn("Is breakfast included? And what time is check-out?", "Is breakfast included? And what time is check-out?", "speak-btn-line")}</li>
            <li class="dialogue-line dialogue-b"><span class="dialogue-who">B</span>${speakBtn("Breakfast is included, and check-out is at 11 a.m.", "Breakfast is included, and check-out is at 11 a.m.", "speak-btn-line")}</li>
          </ol>
        </div>

        <div class="lesson-step">
          ${stepHead("6.3", L("Ámbito laboral y correo semi-formal", "Work & Semi-Formal Email"))}
          <p><code>colleague · shift · deadline · meeting · attend a meeting · work from home · be in charge of</code></p>
          <div class="example-box">
            <span class="example-box-label">${L("MODELO DE CORREO", "EMAIL TEMPLATE")}</span>
            <p>${speakBtn("Dear Ana, I am writing to confirm our meeting on Friday at 10 a.m. Could you please send me the report before then? Looking forward to hearing from you. Best regards, Roberto.", "Dear Ana, I am writing to confirm our meeting on Friday at 10 a.m. Could you please send me the report before then? Looking forward to hearing from you. Best regards, Roberto.", "speak-btn-line")}</p>
          </div>
        </div>

        <div class="lesson-step">
          ${stepHead("6.4", L("Tecnología y medios", "Technology & Media"))}
          <p><code>screen time · to scroll · notification · to post · go viral · headline · breaking news · fake news · privacy</code></p>
          <p>${speakBtn("I think technology makes life easier. However, we spend too much time on our phones.", "I think technology makes life easier. However, we spend too much time on our phones.", "speak-btn-sm")}</p>
        </div>

        <div class="lesson-step">
          ${stepHead("6.5", L("Estilo de vida y salud", "Lifestyle & Health"))}
          <p><code>headache · stomachache · fever · cough · appointment · prescription · pharmacy · stay hydrated</code></p>
          <ol class="dialogue">
            <li class="dialogue-line"><span class="dialogue-who">A</span>${speakBtn("I have a headache and I feel tired.", "I have a headache and I feel tired.", "speak-btn-line")}</li>
            <li class="dialogue-line dialogue-b"><span class="dialogue-who">B</span>${speakBtn("How long have you been feeling like this?", "How long have you been feeling like this?", "speak-btn-line")}</li>
            <li class="dialogue-line"><span class="dialogue-who">A</span>${speakBtn("Since yesterday. I have been working a lot.", "Since yesterday. I have been working a lot.", "speak-btn-line")}</li>
            <li class="dialogue-line dialogue-b"><span class="dialogue-who">B</span>${speakBtn("You should rest and drink water. If it doesn't get better, you should see a doctor.", "You should rest and drink water. If it doesn't get better, you should see a doctor.", "speak-btn-line")}</li>
          </ol>
        </div>
      </section>
    `;
  }

  function renderCanDoAndQuiz() {
    const doneCount = CHECKLIST_ITEMS.filter((_, i) => checklist[i]).length;
    const checklistHtml = CHECKLIST_ITEMS.map((item, idx) => {
      const checked = Boolean(checklist[idx]);
      return `
        <label style="display:flex; align-items:flex-start; gap:0.6rem; cursor:pointer; padding:0.45rem 0.6rem; border-radius:10px; background:${checked ? "var(--status-success-bg)" : "var(--bg-surface)"}; border:1px solid var(--border-subtle);">
          <input type="checkbox" data-b1-check="${idx}" ${checked ? "checked" : ""} style="margin-top:0.25rem;" />
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
            <button type="button" class="${cls}" data-b1-q="${idx}" data-b1-opt="${optIdx}">
              <span class="option-letter" aria-hidden="true">${letters[optIdx]}</span>
              <span>${t(opt)}</span>
            </button>`;
        })
        .join("");

      let feedback = "";
      if (state) {
        feedback = state.correct
          ? `<div class="feedback-banner visible success" role="status">✓ ${t(q.feedback)}</div>`
          : `<div class="feedback-banner visible error" role="status">✕ ${L("Revisa el tema e inténtalo de nuevo.", "Review the topic and try again.")}</div>`;
      }

      return `
        <li class="quiz-item">
          <p class="quiz-prompt"><span class="quiz-num">${idx + 1}</span>${t(q.prompt)}</p>
          <div class="options-list" role="group" aria-label="${L("Opciones de respuesta", "Answer options")}">${opts}</div>
          ${feedback}
        </li>`;
    }).join("");

    const correctCount = Object.values(answers).filter((a) => a.correct).length;
    const best = loadScores().b1 || 0;

    return `
      <section class="card lesson-card" aria-labelledby="b1-cando-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 7 · CAN-DO, RUTINA Y PRÁCTICA", "BLOCK 7 · CAN-DO, ROUTINE & QUIZ")}</span>
          <h2 id="b1-cando-title" class="theory-title">7. ${L("Habilidades Can-Do, Rutina de 20 min y Práctica B1", "Can-Do Skills, 20-Min Routine & B1 Practice")}</h2>
        </header>

        <div class="lesson-step" style="border-top:none; padding-top:0;">
          <div class="technique-grid">
            <div class="technique-card"><h4>🎧 ${L("Auditiva", "Listening")}</h4><p>${L("Podcast de 5 min: 1.ª escucha → 3 ideas; 2.ª → 3 detalles sin pausar cada 5 s.", "5-min podcast: 1st listen → 3 main ideas; 2nd → 3 details without pausing.")}</p></div>
            <div class="technique-card"><h4>🗣️ ${L("Oral", "Speaking")}</h4><p>${L("Cuenta una película en 1 min usando First, then, after that, finally, because, although.", "Tell a movie plot in 1 min using First, then, after that, finally, because, although.")}</p></div>
            <div class="technique-card"><h4>✍️ ${L("Escrita", "Writing")}</h4><p>${L("Texto de 120–180 palabras en 3 párrafos: In my opinion / First, Second / However, In conclusion.", "120–180 words in 3 paragraphs: In my opinion / First, Second / However, In conclusion.")}</p></div>
            <div class="technique-card"><h4>📖 ${L("Lectura", "Reading")}</h4><p>${L("Subraya solo 5 palabras nuevas por artículo y adivina el resto por contexto.", "Underline only 5 new words per article and guess the rest from context.")}</p></div>
          </div>

          <div class="micro-practice">
            <strong>${L("Plan diario de 20 minutos (Sailor B1):", "20-minute daily plan (Sailor B1):")}</strong>
            <ul class="check-list">
              <li><strong>0–5 min:</strong> ${L("Repasa 5 verbos irregulares y 5 conectores en voz alta.", "Review 5 irregular verbs and 5 connectors aloud.")}</li>
              <li><strong>5–12 min:</strong> ${L("Escribe 6–8 líneas combinando un pasado y un condicional.", "Write 6–8 lines combining a past tense and a conditional.")}</li>
              <li><strong>12–18 min:</strong> ${L("Shadowing de 2 frases con question tags o reported speech.", "Shadow 2 sentences with question tags or reported speech.")}</li>
              <li><strong>18–20 min:</strong> ${L("Di una opinión en voz alta con although, however y because of.", "Speak an opinion aloud using although, however, and because of.")}</li>
            </ul>
          </div>
        </div>

        <div class="lesson-step">
          ${stepHead("✓", L(`Checklist final B1 (${doneCount}/12 — necesitas 9 para Bosun B2)`, `Final B1 Checklist (${doneCount}/12 — 9 needed for Bosun B2)`))}
          ${doneCount >= 9 ? `<div class="feedback-banner visible success">🧭 ${L("¡Listo para navegar hacia Bosun B2!", "Ready to sail to Bosun B2!")}</div>` : ""}
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            ${checklistHtml}
          </div>
        </div>

        <div class="lesson-quiz">
          <div class="quiz-header">
            <div>
              <span class="card-eyebrow">${L("PRÁCTICA FINAL B1", "B1 FINAL PRACTICE")}</span>
              <h3 class="quiz-title">${L("Comprueba tu nivel Sailor B1", "Test your Sailor B1 level")}</h3>
            </div>
            <div class="quiz-score" aria-live="polite">
              <span class="badge badge-teal">${L("Correctas", "Correct")}: ${correctCount} / ${QUIZ_QUESTIONS.length}</span>
              <span class="badge badge-neutral">${L("Mejor", "Best")}: ${best} / ${QUIZ_QUESTIONS.length}</span>
            </div>
          </div>
          <ol class="quiz-list">${questionsHtml}</ol>
          <button type="button" id="b1-quiz-reset-btn" class="btn btn-light">↺ ${L("Reiniciar práctica", "Restart practice")}</button>
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
        ${renderConditionals()}
        ${renderPassive()}
        ${renderModalsAndUsedTo()}
        ${renderCohesion()}
        ${renderVocabulary()}
        ${renderCanDoAndQuiz()}
        ${extraAll}
      `;
    } else if (activeTab === "tenses") contentHtml = renderTenses();
    else if (activeTab === "conditionals") contentHtml = renderConditionals();
    else if (activeTab === "passive") contentHtml = renderPassive();
    else if (activeTab === "modals") contentHtml = renderModalsAndUsedTo();
    else if (activeTab === "cohesion") contentHtml = renderCohesion();
    else if (activeTab === "vocab") contentHtml = renderVocabulary();
    else if (activeTab === "cando") contentHtml = renderCanDoAndQuiz();
    else if (window.LinguaLevelSections && activeTab.startsWith("sec-")) {
      contentHtml = window.LinguaLevelSections.renderSection(LEVEL_ID, activeTab);
    }

    root.innerHTML = `
      ${banner}
      ${renderHeroBanner()}
      ${renderFilterTabs()}
      ${contentHtml}
      <div class="level-nav-footer" style="margin-top: 2rem; display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        <a href="lesson-a2.html" class="btn btn-light">${L("← Nivel Anterior (3. Marinero de Cubierta)", "← Previous Level (3. Deckhand)")}</a>
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

    const tabBtn = event.target.closest("[data-b1-tab]");
    if (tabBtn) {
      activeTab = tabBtn.getAttribute("data-b1-tab");
      render();
      return;
    }

    const revBtn = event.target.closest("[data-b1-reveal]");
    if (revBtn) {
      const id = revBtn.getAttribute("data-b1-reveal");
      revealed[id] = !revealed[id];
      render();
      return;
    }

    const optBtn = event.target.closest("[data-b1-opt]");
    if (optBtn) {
      const qIdx = Number(optBtn.getAttribute("data-b1-q"));
      const optIdx = Number(optBtn.getAttribute("data-b1-opt"));
      const q = QUIZ_QUESTIONS[qIdx];
      if (!q) return;
      if (answers[qIdx] && answers[qIdx].correct) return;
      answers[qIdx] = { value: optIdx, correct: optIdx === q.correct };
      saveBestScore(Object.values(answers).filter((a) => a.correct).length);
      render();
      return;
    }

    if (event.target.closest("#b1-quiz-reset-btn")) {
      for (const k in answers) delete answers[k];
      render();
    }
  });

  root.addEventListener("change", (event) => {
    const cb = event.target.closest("[data-b1-check]");
    if (cb) {
      checklist[cb.getAttribute("data-b1-check")] = cb.checked;
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
