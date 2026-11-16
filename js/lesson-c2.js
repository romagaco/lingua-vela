/**
 * LinguaVela — Lessons Module (Level 7: Captain / C2 Mastery)
 * Complete C2 Curriculum:
 *   1. Subtle Verb Forms & Aspect (Attitude, Stative Bending, Polite Future Continuous)
 *   2. Advanced Sentence Structure (Ellipsis, Substitution, Pseudo-clefts, Absolute Phrases)
 *   3. Hypotheticals, Formal Subjunctive & Unreal Time (Were it not for, It is high time)
 *   4. Epistemic/Deontic Modals, Academic Distancing & Subtle Reporting
 *   5. Discourse Markers, Pragmatics (Implicature, Irony, Sarcasm) & Register Shifting
 *   6. Near-Native Vocabulary (Collocations, Connotation, Polysemy, Word Formation)
 *   7. Can-Do Skills, Connected Speech/Intonation & 25-Min Daily Study Plan
 *   8. 17-Point Final C2 Checklist & 14-Question C2 Mastery Quiz
 *
 * Pure vanilla JS. Renders into #lesson-root, bilingual (ES/EN).
 * Re-renders automatically when main.js switches <html lang>.
 * Audio uses the browser's built-in Web Speech API (US English voice).
 */

(() => {
  "use strict";

  const root = document.getElementById("lesson-root");
  if (!root) return;

  const STORAGE_KEY = "linguavela-lesson-c2-scores";

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
    if (!scores.c2 || score > scores.c2) {
      scores.c2 = score;
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
    { es: "Uso Perfect y Continuous para mostrar actitud, no solo tiempo.", en: "I can use Perfect and Continuous to show attitude, not just time." },
    { es: "Uso elipsis y sustitución para sonar natural en conversación.", en: "I can use ellipsis and substitution to sound natural in conversation." },
    { es: "Uso inversión, fronting y clefts para dar estilo y ritmo.", en: "I can use inversion, fronting, and clefts for style and rhythm." },
    { es: "Uso cláusulas participiales y frases absolutas para comprimir ideas.", en: "I can use participle clauses and absolute phrases to compress ideas." },
    { es: "Uso condicionales invertidos como Had I known y Were it not for.", en: "I can use inverted conditionals like Had I known and Were it not for." },
    { es: "Uso el subjuntivo formal tras suggest, insist, it is essential that.", en: "I can use subjunctive after suggest, insist, it is essential that." },
    { es: "Uso wish, would rather, had better e it is (high) time con pasado irreal.", en: "I can use wish, would rather, had better, and it is time with unreal past." },
    { es: "Uso modales para mostrar certeza, expectativa, crítica y cortesía.", en: "I can use modals to show certainty, expectation, criticism, and politeness." },
    { es: "Uso pasiva y estructuras impersonales para ser objetivo y diplomático.", en: "I can use passive and impersonal structures to be objective and diplomatic." },
    { es: "Reporto con verbos precisos (claim, admit, deny, point out, argue).", en: "I can report with precise verbs like claim, admit, deny, point out, argue." },
    { es: "Uso marcadores discursivos (admittedly, moreover, thereby, on balance).", en: "I can use discourse markers like admittedly, moreover, thereby, on balance." },
    { es: "Comprendo implicatura, ironía, understatement y sarcasmo.", en: "I can understand implicature, irony, understatement, and sarcasm." },
    { es: "Cambio de registro (casual, formal, académico) en una misma conversación.", en: "I can shift register from casual to formal to academic in one conversation." },
    { es: "Uso colocaciones, modismos y phrasal verbs con la connotación correcta.", en: "I can use collocations, idioms, and phrasal verbs with correct connotation." },
    { es: "Uso formación de palabras para ampliar vocabulario y evitar repetición.", en: "I can use word formation to build vocabulary and avoid repetition." },
    { es: "Entiendo habla nativa rápida con acentos, humor y significado implícito.", en: "I can listen to fast native speech with accents, humor, and implied meaning." },
    { es: "Escribo con estructura clara, estilo y voz propia, no solo corrección.", en: "I can write with clear structure, style, and voice, not just correctness." },
  ];

  const QUIZ_QUESTIONS = [
    {
      prompt: { es: "¿Qué matiz transmite «You are being difficult» frente a «You are difficult»?", en: "What nuance does 'You are being difficult' convey vs. 'You are difficult'?" },
      options: [
        "Temporary behavior right now, not a permanent trait",
        "It is a grammatical error because 'be' is stative",
        "It refers to a finished past event",
      ],
      correct: 0,
      feedback: { es: "¡Exacto! En C2, doblar verbos de estado al continuo expresa conducta temporal o emoción pasajera.", en: "Exactly! Bending stative verbs into continuous expresses temporary behavior or feeling." },
    },
    {
      prompt: { es: "¿Cuál pregunta suena más cortés e indirecta en inglés?", en: "Which question sounds most polite and indirect?" },
      options: [
        "Do you use the car tomorrow?",
        "Will you be using the car tomorrow?",
        "Are you going to use the car?",
      ],
      correct: 1,
      feedback: { es: "¡Correcto! Future Continuous («Will you be using...?») suena suave y no invasivo.", en: "Correct! Future Continuous ('Will you be using...?') sounds polite and non-intrusive." },
    },
    {
      prompt: { es: "Completa con elipsis y sustitución naturales: «A: Is it raining? B: ___»", en: "Complete with natural ellipsis & substitution: 'A: Is it raining? B: ___'" },
      options: ["I think so.", "I think it.", "Yes, it is raining now."],
      correct: 0,
      feedback: { es: "¡Bien! «so» sustituye a toda la cláusula («that it is raining»).", en: "Nice! 'so' substitutes for the entire clause ('that it is raining')." },
    },
    {
      prompt: { es: "¿Qué estructura es una «frase absoluta» (absolute phrase) para comprimir ideas?", en: "Which structure is an absolute phrase for elegant compression?" },
      options: [
        "The meeting over, we went for coffee.",
        "When the meeting was over, we went for coffee.",
        "Because the meeting finished, we went.",
      ],
      correct: 0,
      feedback: { es: "¡Exacto! Sustantivo + participio/adjetivo («The meeting over,...») comprime el contexto en escritura C2.", en: "Exactly! Noun + participle/adjective ('The meeting over,...') compresses context in C2 writing." },
    },
    {
      prompt: { es: "Elige el subjuntivo formal correcto:", en: "Choose the correct formal subjunctive:" },
      options: [
        "It is essential that she is present.",
        "It is essential that she be present.",
        "It is essential that she being present.",
      ],
      correct: 1,
      feedback: { es: "¡Correcto! Tras «It is essential that», el subjuntivo usa la forma base («be»), incluso con he/she/it.", en: "Correct! After 'It is essential that', formal subjunctive uses the base verb ('be')." },
    },
    {
      prompt: { es: "¿Qué significa «Were it not for Ana, we would have failed»?", en: "What does 'Were it not for Ana, we would have failed' mean?" },
      options: [
        "If it were not for Ana (without Ana), we would have failed.",
        "Ana was not there, so we failed.",
        "In case Ana arrives, we will fail.",
      ],
      correct: 0,
      feedback: { es: "¡Muy bien! Es la inversión formal de «If it were not for...».", en: "Well done! It is the formal inversion of 'If it were not for...'." },
    },
    {
      prompt: { es: "Elige la forma correcta con «It is high time»:", en: "Choose the correct form with 'It is high time':" },
      options: [
        "It is high time we change this system.",
        "It is high time we changed this system.",
        "It is high time we will change this system.",
      ],
      correct: 1,
      feedback: { es: "¡Correcto! «It is (high) time + Past Simple» expresa que ya debió hacerse hace tiempo.", en: "Correct! 'It is (high) time + Past Simple' means it should have been done already." },
    },
    {
      prompt: { es: "¿Qué oración muestra tono académico C2 con distanciamiento objetivo?", en: "Which sentence shows objective C2 academic distancing?" },
      options: [
        "Social media destroys teenagers completely.",
        "There is evidence to suggest that excessive social media use may affect well-being.",
        "Everyone knows social media is terrible.",
      ],
      correct: 1,
      feedback: { es: "¡Excelente! Combina distanciamiento («There is evidence to suggest») y hedging («may affect»).", en: "Excellent! It combines distancing ('There is evidence to suggest') and hedging ('may affect')." },
    },
    {
      prompt: { es: "Elige el verbo de reporte que indica que NO estamos seguros de que sea verdad:", en: "Choose the reporting verb implying we are not sure it is true:" },
      options: ["He pointed out that...", "He admitted that...", "He claimed he was innocent."],
      correct: 2,
      feedback: { es: "¡Exacto! «Claim» reporta lo que alguien afirma sin que el hablante lo dé por hecho.", en: "Exactly! 'Claim' reports what someone asserts without endorsing it as fact." },
    },
    {
      prompt: { es: "En pragmática, A pregunta «Do you want to come?» y B responde «I have an exam tomorrow.» Eso es:", en: "In pragmatics, A asks 'Do you want to come?' and B replies 'I have an exam tomorrow.' This is:" },
      options: ["Implicature (implied 'no')", "Subjunctive mood", "A pseudo-cleft"],
      correct: 0,
      feedback: { es: "¡Correcto! B no dijo «no» literalmente, pero lo implicó por contexto (implicatura).", en: "Correct! B didn't say 'no' literally, but implied it through context (implicature)." },
    },
    {
      prompt: { es: "¿Qué grupo tiene SOLO palabras con connotación positiva?", en: "Which set contains ONLY words with positive connotation?" },
      options: [
        "skinny · cheap · stubborn",
        "slim · affordable · determined",
        "thin · inexpensive · childish",
      ],
      correct: 1,
      feedback: { es: "¡Perfecto! Slim, affordable y determined proyectan una valoración positiva.", en: "Perfect! Slim, affordable, and determined carry positive connotation." },
    },
    {
      prompt: { es: "¿Qué significa el modismo «to cut corners»?", en: "What does the idiom 'to cut corners' mean?" },
      options: [
        "To do something quickly or cheaply by sacrificing quality",
        "To take a shorter street while driving",
        "To decorate a square room",
      ],
      correct: 0,
      feedback: { es: "¡Bien! «Cut corners» = ahorrarse pasos/dinero sacrificando calidad o seguridad.", en: "Nice! 'Cut corners' = do something in the easiest/cheapest way at the expense of quality." },
    },
    {
      prompt: { es: "¿Qué indica una entonación «fall-rise» al decir «I suppose so»?", en: "What does a fall-rise intonation on 'I suppose so' indicate?" },
      options: [
        "Doubt, hesitation, or polite reservation",
        "Strong anger and certainty",
        "A direct command",
      ],
      correct: 0,
      feedback: { es: "¡Exacto! El contorno descendente-ascendente (fall-rise) transmite duda o reserva cortés.", en: "Exactly! A fall-rise contour conveys doubt, hesitation, or polite reservation." },
    },
    {
      prompt: { es: "¿Qué registro corresponde a «Dear Ms. Lopez, I would appreciate it if you could confirm...»?", en: "Which register fits 'Dear Ms. Lopez, I would appreciate it if you could confirm...'?" },
      options: ["Casual friend chat", "Formal professional / client correspondence", "Academic thesis abstract"],
      correct: 1,
      feedback: { es: "¡Correcto! Saludo formal + condicional de cortesía es registro profesional formal con cliente.", en: "Correct! Formal salutation + polite conditional fits formal client correspondence." },
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
        <button type="button" class="btn btn-light" style="padding:0.4rem 0.85rem; font-size:0.86rem;" data-c2-reveal="${id}">
          ${open ? L("Ocultar solución", "Hide answer") : btnLabel}
        </button>
        ${open ? `<div class="can-do-box" style="margin-top:0.5rem;">${contentHtml}</div>` : ""}
      </div>
    `;
  }

  function renderHeroBanner() {
    return `
      <div class="routine-strip" style="margin-bottom: 1.25rem;">
        <li><span class="routine-icon" aria-hidden="true">☸️</span><span><strong>${L("Nivel:", "Crew level:")}</strong> Captain (Capitán) · CEFR C2 Mastery</span></li>
        <li><span class="routine-icon" aria-hidden="true">🧭</span><span><strong>${L("Insignia:", "Badge:")}</strong> ${L("Gorra de capitán y brújula · Maestría", "Captain's hat & compass · Mastery")}</span></li>
        <li><span class="routine-icon" aria-hidden="true">✨</span><span>${L("Voz propia, estilo, ritmo, elipsis, subjuntivo, pragmática y cambio de registro.", "Voice, style, rhythm, ellipsis, subjunctive, pragmatics, and register shifting.")}</span></li>
      </div>
    `;
  }

  function renderFilterTabs() {
    const tabs = [
      { id: "all", label: { es: "📚 Ver Todo", en: "📚 View All" } },
      { id: "aspect", label: { es: "1. Aspecto y Futuro", en: "1. Aspect & Future" } },
      { id: "structure", label: { es: "2. Elipsis y Estilo", en: "2. Ellipsis & Style" } },
      { id: "subjunctive", label: { es: "3. Subjuntivo e Hipótesis", en: "3. Subjunctive & Unreal" } },
      { id: "modals", label: { es: "4–6. Modales, Pasiva y Reporte", en: "4–6. Modals, Passive & Report" } },
      { id: "pragmatics", label: { es: "7. Pragmática y Registro", en: "7. Pragmatics & Register" } },
      { id: "vocab", label: { es: "8. Léxico C2", en: "8. Near-Native Vocab" } },
      { id: "fluency", label: { es: "9. Can-Do y Pronunciación", en: "9. Can-Do & Fluency" } },
      { id: "quiz", label: { es: "10. Checklist y Quiz", en: "10. Checklist & Quiz" } },
    ];
    return `
      <nav class="level-bar-wrapper" aria-label="${L("Secciones del Nivel C2", "Level C2 Sections")}">
        <div class="level-tabs" role="tablist">
          ${tabs
            .map(
              (tab) => `
            <button type="button" class="level-tab-btn ${activeTab === tab.id ? "active" : ""}" role="tab" aria-selected="${activeTab === tab.id}" data-c2-tab="${tab.id}">
              ${tab.label[lang()]}
            </button>`
            )
            .join("")}
        </div>
      </nav>
    `;
  }

  function renderAspect() {
    return `
      <section class="card lesson-card" aria-labelledby="c2-aspect-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 1 · FORMAS VERBALES SUTILES", "BLOCK 1 · SUBTLE VERB FORMS & ASPECT")}</span>
          <h2 id="c2-aspect-title" class="theory-title">1. Aspect Attitude, Stative Bending &amp; Polite Future</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("1.1", L("Perfecto y Continuo para mostrar actitud", "Perfect & Continuous for Attitude"))}
          <div class="phrase-list">
            <li>${speakBtn("I have been waiting for an hour.", "I have been waiting for an hour. (annoyed attitude vs neutral 'have waited')", "speak-btn-sm")}</li>
            <li>${speakBtn("I am loving this city. You are being difficult. I am seeing Ana tomorrow.", "Stative bending: I'm loving this city / You're being difficult / I'm seeing Ana", "speak-btn-sm")}</li>
          </div>
          <p><small>${L("No abuses del Perfecto en historias terminadas: «I went to Antigua, I met Ana, we talked for hours» suena más limpio.", "Avoid overusing Perfect for finished stories: Simple Past is clearer and more natural.")}</small></p>
        </div>

        <div class="lesson-step">
          ${stepHead("1.2", L("Elección sutil de futuro (Future Continuous cortés)", "Subtle Future Choice (Polite Future Continuous)"))}
          <p>${speakBtn("Will you be using the car tomorrow? Will you be needing anything else?", "Will you be using the car tomorrow? / Will you be needing anything else?", "speak-btn-sm")}</p>
        </div>
      </section>
    `;
  }

  function renderStructure() {
    return `
      <section class="card lesson-card" aria-labelledby="c2-struct-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 2 · ESTRUCTURA AVANZADA", "BLOCK 2 · ADVANCED SENTENCE STRUCTURE")}</span>
          <h2 id="c2-struct-title" class="theory-title">2. Ellipsis, Substitution, Style &amp; Compression</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("2.1", "Ellipsis &amp; Substitution")}
          <p>${speakBtn("She can speak Spanish, and I can too. He said he would help, and he did. I think so. I hope not. A cheap one.", "I can too · and he did · I think so · I hope not · A cheap one", "speak-btn-sm")}</p>
          ${revealBox("ell1", L("Ver práctica de elipsis", "Show ellipsis answers"), `
            <p>1. Do you like this book? → <strong>Yes, I do. / Not really.</strong><br/>2. Will you be there tomorrow? → <strong>I hope so. / I think so.</strong></p>
          `)}
        </div>

        <div class="lesson-step">
          ${stepHead("2.2", "Inversion, Fronting, Pseudo-Clefts &amp; Absolute Phrases")}
          <ul class="tip-list">
            <li><strong>Pseudo-cleft (All):</strong> ${speakBtn("All I wanted was a little help. What makes a good captain is not authority, it is trust.", "All I wanted was a little help. / What makes a good captain is trust.", "speak-btn-sm")}</li>
            <li><strong>Absolute phrase:</strong> ${speakBtn("The meeting over, we went for coffee. With the deadline approaching, we worked faster.", "The meeting over, we went for coffee. / With the deadline approaching...", "speak-btn-sm")}</li>
            <li><strong>Rhythm:</strong> <em>We had tried everything. Nothing worked. Never had we felt so stuck. Then Ana called.</em></li>
          </ul>
        </div>
      </section>
    `;
  }

  function renderSubjunctive() {
    return `
      <section class="card lesson-card" aria-labelledby="c2-subj-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 3 · HIPÓTESIS Y SUBJUNTIVO", "BLOCK 3 · HYPOTHETICALS, SUBJUNCTIVE & UNREAL TIME")}</span>
          <h2 id="c2-subj-title" class="theory-title">3. Were it not for, Subjunctive &amp; It is high time</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("3.1", "Inverted &amp; Alternative Conditionals")}
          <p>${speakBtn("Were it not for Ana, we would have failed. In case it rains, bring an umbrella.", "Were it not for Ana, we would have failed. / In case it rains...", "speak-btn-sm")}</p>
        </div>

        <div class="lesson-step">
          ${stepHead("3.2", L("Subjuntivo formal C2", "Formal C2 Subjunctive"))}
          <p><code>suggest / insist / recommend / demand / it is essential that + subject + base verb</code></p>
          <div class="phrase-list">
            <li>${speakBtn("I suggest that he study more. It is essential that she be present. It is vital that everyone understand the rules.", "I suggest that he study more. / It is essential that she be present.", "speak-btn-sm")}</li>
          </div>
          ${revealBox("sub1", L("Ver práctica de subjuntivo", "Show subjunctive answers"), `
            <p>1. It is important that she <strong>be</strong> here.<br/>2. I recommend that he <strong>go</strong>.</p>
          `)}
        </div>

        <div class="lesson-step">
          ${stepHead("3.3", "Would rather, Had better &amp; It is (high) time")}
          <p>${speakBtn("I would rather you stayed. You had better leave now. It is high time we changed this system.", "I would rather you stayed. / It is high time we changed this system.", "speak-btn-sm")}</p>
        </div>
      </section>
    `;
  }

  function renderModalsPassiveReport() {
    return `
      <section class="card lesson-card" aria-labelledby="c2-mpr-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUES 4, 5 Y 6 · MODALES, DISTANCIAMIENTO Y REPORTE", "BLOCKS 4, 5 & 6 · MODALS, DISTANCING & REPORTING")}</span>
          <h2 id="c2-mpr-title" class="theory-title">4–6. Epistemic/Deontic Modals, Distancing &amp; Subtle Reporting</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("4", "Epistemic (Certainty) vs. Deontic (Politeness &amp; Rules)")}
          <p>${speakBtn("Could you possibly send me the report when you have a moment? I would appreciate it if you could.", "Polite C2: Could you possibly send me the report... / I would appreciate it if...", "speak-btn-sm")}</p>
        </div>

        <div class="lesson-step">
          ${stepHead("5", L("Distanciamiento académico y objetividad", "Academic Distancing & Objectivity"))}
          <p>${speakBtn("There is evidence to suggest that excessive social media use may affect teenagers' well-being.", "There is evidence to suggest that excessive social media use may affect well-being.", "speak-btn-sm")}</p>
        </div>

        <div class="lesson-step">
          ${stepHead("6", "Subtle Reporting Verbs &amp; No-Backshift Exceptions")}
          <p><code>claim · admit · deny · insist on · point out · argue · warn · boast</code> · ${speakBtn("He claimed he was innocent. He said water boils at 100 degrees.", "He claimed he was innocent. / He said water boils at 100 degrees.", "speak-btn-sm")}</p>
        </div>
      </section>
    `;
  }

  function renderPragmatics() {
    return `
      <section class="card lesson-card" aria-labelledby="c2-prag-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 7 · COHESIÓN, PRAGMÁTICA Y REGISTRO", "BLOCK 7 · COHESION, PRAGMATICS & REGISTER")}</span>
          <h2 id="c2-prag-title" class="theory-title">7. Discourse Markers, Irony, Implicature &amp; Register Shifting</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("7.1", "Discourse Markers &amp; Topic Shifting")}
          <p><code>Admittedly · Granted · On the contrary · Moreover · Thereby · In other words · On balance · Turning to · With regard to</code></p>
          <p>${speakBtn("Turning to the budget, we need to cut costs. On balance, it represents a positive shift.", "Turning to the budget... / On balance, it represents a positive shift.", "speak-btn-sm")}</p>
        </div>

        <div class="lesson-step">
          ${stepHead("7.2", "Pragmatics: Implicature, Irony, Understatement &amp; Sarcasm")}
          <ul class="tip-list">
            <li><strong>Implicature:</strong> <em>A: Do you want to come? B: I have an exam tomorrow.</em> (= no)</li>
            <li><strong>Irony / Sarcasm:</strong> <em>"Oh great, another meeting."</em> / <em>"Nice parking."</em></li>
            <li><strong>Understatement (UK):</strong> <em>"It is a bit cold."</em> (= freezing) · <em>"Not bad."</em> (= very good)</li>
          </ul>
          ${revealBox("prag1", L("¿Qué significa «That is an interesting idea» en tono plano?", "What does flat 'That is an interesting idea' mean?"), `
            <p>${L("Con tono plano y mirando a otro lado, suele significar que <strong>no le gusta la idea</strong>, pero lo expresa con cortesía.", "With a flat tone and looking away, she likely means <strong>she does not like it</strong>, expressed politely.")}</p>
          `)}
        </div>

        <div class="lesson-step">
          ${stepHead("7.3", "Register Shifting (Casual ↔ Professional ↔ Formal ↔ Academic)")}
          <div class="phrase-list">
            <li><strong>Casual:</strong> ${speakBtn("Hey, what's up? Wanna grab coffee?", "Hey, what's up? Wanna grab coffee?", "speak-btn-sm")}</li>
            <li><strong>Neutral pro:</strong> ${speakBtn("Hi Ana, do you have a moment to talk about the project?", "Hi Ana, do you have a moment to talk about the project?", "speak-btn-sm")}</li>
            <li><strong>Formal client:</strong> ${speakBtn("Dear Ms. Lopez, I am writing in connection with the proposal.", "Dear Ms. Lopez, I am writing in connection with the proposal.", "speak-btn-sm")}</li>
            <li><strong>Academic:</strong> ${speakBtn("This essay will argue that there is evidence to suggest...", "This essay will argue that there is evidence to suggest...", "speak-btn-sm")}</li>
          </div>
        </div>
      </section>
    `;
  }

  function renderVocab() {
    return `
      <section class="card lesson-card" aria-labelledby="c2-vocab-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 8 · PRECISIÓN LÉXICA CASI NATIVA", "BLOCK 8 · NEAR-NATIVE VOCABULARY PRECISION")}</span>
          <h2 id="c2-vocab-title" class="theory-title">8. Collocations, Connotation, Polysemy &amp; Word Formation</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("8.1", "Strong Collocations &amp; Polysemy")}
          <ul class="tip-list">
            <li><strong>Chunks:</strong> <code>heavily dependent · deeply concerned · bitterly disappointed · highly unlikely · strongly recommend</code></li>
            <li><strong>Polysemy (run / break):</strong> <em>run a company / run out of time / a run of good luck · break a leg / break the ice / break down</em></li>
            <li><strong>Idioms:</strong> <em>cut corners · on thin ice · tip of the iceberg · bite the bullet · think outside the box</em></li>
          </ul>
        </div>

        <div class="lesson-step">
          ${stepHead("8.2", "Connotation &amp; Word Formation")}
          <p><code>slim (+) / skinny (-) / thin (neutral)</code> · <code>affordable (+) / cheap (-)</code> · <code>determined (+) / stubborn (-)</code> · <code>childlike (+) / childish (-)</code></p>
          <p><code>well-known · time-consuming · user-friendly · long-term · decision-making · evidence-based · peer-reviewed</code></p>
        </div>
      </section>
    `;
  }

  function renderFluency() {
    return `
      <section class="card lesson-card" aria-labelledby="c2-flu-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 9 · CAN-DO, PRONUNCIACIÓN Y RUTINA", "BLOCK 9 · CAN-DO, FLUENCY & 25-MIN ROUTINE")}</span>
          <h2 id="c2-flu-title" class="theory-title">9. Connected Speech, Intonation, Style &amp; Study Plan</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("9.1", "Connected Speech, Weak Forms, Intonation &amp; Rhythm")}
          <ul class="tip-list">
            <li><strong>Connected speech:</strong> ${speakBtn("What do you think? I am going to go.", "Whaddya think? / D'you wanna? / I'm gonna", "speak-btn-sm")}</li>
            <li><strong>Weak forms:</strong> <em>a cup-uh tea · I hafta go</em></li>
            <li><strong>Intonation:</strong> Falling (statements), Rising (yes/no questions), <strong>Fall-rise</strong> (<em>I suppose so</em> = doubt/politeness).</li>
            <li><strong>Stress-timed rhythm:</strong> <em>I am GOING to the MARket to BUY some BREAD.</em></li>
          </ul>
        </div>

        <div class="lesson-step">
          ${stepHead("9.2", L("Plan diario de 25 min y enfoque semanal", "25-Min Daily Plan & Weekly Focus"))}
          <div class="micro-practice">
            <ul class="check-list">
              <li><strong>0–5 min:</strong> ${L("5 colocaciones + 2 modismos en voz alta con acentuación natural.", "5 collocations + 2 idioms aloud with natural stress.")}</li>
              <li><strong>5–13 min:</strong> ${L("Escribe 8 líneas con 1 inversión, 1 cleft, 1 subjuntivo y 1 nominalización.", "Write 8 lines with 1 inversion, 1 cleft, 1 subjunctive, and 1 nominalization.")}</li>
              <li><strong>13–22 min:</strong> ${L("Audio nativo sin subtítulos; anota 2 ironías, 1 modismo y 1 elipsis.", "Native audio without subtitles; note 2 ironies, 1 idiom, and 1 ellipsis.")}</li>
              <li><strong>22–25 min:</strong> ${L("Habla 1 min defendiendo una postura y cambia de registro (casual → formal).", "Speak 1 min defending an opinion and shift register (casual → formal).")}</li>
            </ul>
          </div>
          <p><small><strong>${L("Enfoque semanal:", "Weekly focus:")}</strong> Mon: Inversion/clefts/ellipsis · Tue: Subjunctive &amp; hypotheticals · Wed: Modals &amp; hedging · Thu: Reported speech &amp; distancing · Fri: Discourse &amp; pragmatics · Sat: Collocations/idioms/connotation · Sun: 250-word essay or 2-min story.</small></p>
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
          <input type="checkbox" data-c2-check="${idx}" ${checked ? "checked" : ""} style="margin-top:0.25rem;" />
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
            <button type="button" class="${cls}" data-c2-q="${idx}" data-c2-opt="${optIdx}">
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
    const best = loadScores().c2 || 0;

    return `
      <section class="card lesson-card" aria-labelledby="c2-quiz-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("BLOQUE 10 · CHECKLIST Y PRÁCTICA FINAL C2", "BLOCK 10 · CHECKLIST & C2 MASTERY QUIZ")}</span>
          <h2 id="c2-quiz-title" class="theory-title">10. ${L(`Checklist C2 (${doneCount}/17) y Práctica Final`, `C2 Checklist (${doneCount}/17) & Final Quiz`)}</h2>
        </header>

        <div class="lesson-step" style="border-top:none; padding-top:0;">
          ${doneCount >= 14 ? `<div class="feedback-banner visible success">☸️ ${L("¡Eres todo un Capitán! El inglés ya es una herramienta para tu vida.", "You are a Captain! English is now a tool for your life.")}</div>` : `<p>${L("Si dices sí a 14 de estos 17 puntos, ya eres todo un Capitán.", "If you can say yes to 14 of these 17, you are a Captain.")}</p>`}
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            ${checklistHtml}
          </div>
        </div>

        <div class="lesson-quiz">
          <div class="quiz-header">
            <div>
              <span class="card-eyebrow">${L("PRÁCTICA FINAL C2", "C2 MASTERY QUIZ")}</span>
              <h3 class="quiz-title">${L("Comprueba tu nivel Captain C2", "Test your Captain C2 mastery")}</h3>
            </div>
            <div class="quiz-score" aria-live="polite">
              <span class="badge badge-teal">${L("Correctas", "Correct")}: ${correctCount} / ${QUIZ_QUESTIONS.length}</span>
              <span class="badge badge-neutral">${L("Mejor", "Best")}: ${best} / ${QUIZ_QUESTIONS.length}</span>
            </div>
          </div>
          <ol class="quiz-list">${questionsHtml}</ol>
          <button type="button" id="c2-quiz-reset-btn" class="btn btn-light">↺ ${L("Reiniciar práctica", "Restart practice")}</button>
        </div>
      </section>
    `;
  }

  function render() {
    const scrollY = window.scrollY;
    let contentHtml = "";

    if (activeTab === "all") {
      contentHtml = `
        ${renderAspect()}
        ${renderStructure()}
        ${renderSubjunctive()}
        ${renderModalsPassiveReport()}
        ${renderPragmatics()}
        ${renderVocab()}
        ${renderFluency()}
        ${renderChecklistAndQuiz()}
      `;
    } else if (activeTab === "aspect") contentHtml = renderAspect();
    else if (activeTab === "structure") contentHtml = renderStructure();
    else if (activeTab === "subjunctive") contentHtml = renderSubjunctive();
    else if (activeTab === "modals") contentHtml = renderModalsPassiveReport();
    else if (activeTab === "pragmatics") contentHtml = renderPragmatics();
    else if (activeTab === "vocab") contentHtml = renderVocab();
    else if (activeTab === "fluency") contentHtml = renderFluency();
    else if (activeTab === "quiz") contentHtml = renderChecklistAndQuiz();

    root.innerHTML = `
      ${renderHeroBanner()}
      ${renderFilterTabs()}
      ${contentHtml}
      <div class="level-nav-footer" style="margin-top: 2rem; display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        <a href="lesson-c1.html" class="btn btn-light">${L("← Nivel Anterior (6. Navegante)", "← Previous Level (6. Navigator)")}</a>
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

    const tabBtn = event.target.closest("[data-c2-tab]");
    if (tabBtn) {
      activeTab = tabBtn.getAttribute("data-c2-tab");
      render();
      return;
    }

    const revBtn = event.target.closest("[data-c2-reveal]");
    if (revBtn) {
      const id = revBtn.getAttribute("data-c2-reveal");
      revealed[id] = !revealed[id];
      render();
      return;
    }

    const optBtn = event.target.closest("[data-c2-opt]");
    if (optBtn) {
      const qIdx = Number(optBtn.getAttribute("data-c2-q"));
      const optIdx = Number(optBtn.getAttribute("data-c2-opt"));
      const q = QUIZ_QUESTIONS[qIdx];
      if (!q) return;
      if (answers[qIdx] && answers[qIdx].correct) return;
      answers[qIdx] = { value: optIdx, correct: optIdx === q.correct };
      saveBestScore(Object.values(answers).filter((a) => a.correct).length);
      render();
      return;
    }

    if (event.target.closest("#c2-quiz-reset-btn")) {
      for (const k in answers) delete answers[k];
      render();
    }
  });

  root.addEventListener("change", (event) => {
    const cb = event.target.closest("[data-c2-check]");
    if (cb) {
      checklist[cb.getAttribute("data-c2-check")] = cb.checked;
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
