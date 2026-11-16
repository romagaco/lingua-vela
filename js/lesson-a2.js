/**
 * LinguaVela — Lessons Module (Level 3: Deckhand / A2 Elementary)
 * Complete A2 Curriculum:
 *   1. Past Simple (Did/Didn't, Was/Were, 20 Irregular Verbs, Regular -ed)
 *   2. Future Forms (Going to vs. Will)
 *   3. Comparatives & Superlatives (Short, Long, Irregular, as...as)
 *   4. Present Perfect Simple (Ever/Never, Contrast with Past Simple, US Already/Just/Yet)
 *   5. Modals of Obligation & Advice (Should, Have to, Must, Mustn't vs Don't have to)
 *   6. Recommended A2 Study Routines (5-6 Line Daily Journal, Shadowing, 15-min Plan)
 *   7. Quick Self-Check & Interactive A2 Practice Quiz (10 questions)
 *
 * Pure vanilla JS. Renders into #lesson-root, bilingual (ES/EN).
 * Re-renders automatically when main.js switches <html lang>.
 * Audio uses the browser's built-in Web Speech API (US English voice).
 */

(() => {
  "use strict";

  const root = document.getElementById("lesson-root");
  if (!root) return;

  const STORAGE_KEY = "linguavela-lesson-a2-scores";

  /* ==========================================================================
     Helpers: language, translation, audio (speech synthesis)
     ========================================================================== */

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

  function speak(text, rate = 0.85) {
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

  /* Active filter: 'all', 'past', 'future', 'compare', 'perfect', 'modals', 'routine', 'quiz' */
  let activeTab = "all";

  /* Interactive Try-it reveals & Can-do checklist state */
  const revealedTryIt = {};
  const canDoChecked = {};

  /* ==========================================================================
     Quiz State & LocalStorage
     ========================================================================== */

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
    if (!scores.a2 || score > scores.a2) {
      scores.a2 = score;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
      } catch {
        // ignore storage errors
      }
    }
  }

  /* ==========================================================================
     Curriculum Data
     ========================================================================== */

  const IRREGULAR_VERBS = [
    ["go", "went", "I went to Mixco yesterday."],
    ["see", "saw", "I saw a good movie."],
    ["buy", "bought", "She bought milk and eggs."],
    ["take", "took", "He took the bus."],
    ["make", "made", "We made tacos."],
    ["get", "got", "I got a new book."],
    ["come", "came", "They came at 5."],
    ["eat", "ate", "We ate pizza."],
    ["drink", "drank", "I drank coffee."],
    ["give", "gave", "She gave me a gift."],
    ["find", "found", "I found my keys."],
    ["tell", "told", "He told me a story."],
    ["speak", "spoke", "She spoke English."],
    ["write", "wrote", "I wrote a message."],
    ["read", "read", "I read a story."],
    ["sleep", "slept", "I slept well."],
    ["leave", "left", "We left at 8."],
    ["bring", "brought", "She brought fruit."],
    ["think", "thought", "I thought about it."],
    ["have", "had", "I had a busy day."],
  ];

  const TRY_IT_PAST = [
    {
      id: "luna",
      prompt: "I saw Luna.",
      neg: "I didn't see Luna.",
      q: "Did you see Luna?",
    },
    {
      id: "bus",
      prompt: "We took the bus.",
      neg: "We didn't take the bus.",
      q: "Did you take the bus?",
    },
    {
      id: "job",
      prompt: "She got a new job.",
      neg: "She didn't get a new job.",
      q: "Did she get a new job?",
    },
  ];

  const FUTURE_CHOICE_ROWS = [
    {
      sit: { es: "Ya lo planeaste antes", en: "You planned it before" },
      use: "Going to",
      ex: "I am going to cook pasta tonight.",
    },
    {
      sit: { es: "Lo decides ahora mismo", en: "You decide now" },
      use: "Will",
      ex: "Oh, I will cook pasta tonight.",
    },
    {
      sit: { es: "Ofrecimiento o promesa", en: "Offer or promise" },
      use: "Will",
      ex: "I will help you with that.",
    },
    {
      sit: { es: "Ves evidencia clara", en: "You see evidence" },
      use: "Going to",
      ex: "He is going to fall, watch out.",
    },
    {
      sit: { es: "Predicción general", en: "General prediction" },
      use: "Will",
      ex: "I think you will love this movie.",
    },
  ];

  const PARTICIPLE_LIST = [
    ["be", "been"],
    ["see", "seen"],
    ["eat", "eaten"],
    ["go", "gone"],
    ["try", "tried"],
    ["meet", "met"],
    ["visit", "visited"],
    ["fly", "flown"],
    ["swim", "swum"],
    ["ride", "ridden"],
  ];

  const WEEKLY_PROMPTS = [
    { day: { es: "Lunes", en: "Monday" }, q: { es: "¿Qué hiciste ayer?", en: "What did you do yesterday?" } },
    { day: { es: "Martes", en: "Tuesday" }, q: { es: "¿Qué compraste la última vez que fuiste de compras?", en: "What did you buy last time you went shopping?" } },
    { day: { es: "Miércoles", en: "Wednesday" }, q: { es: "¿Cuál fue el mejor día de la semana pasada y por qué?", en: "What was the best day last week? Why?" } },
    { day: { es: "Jueves", en: "Thursday" }, q: { es: "Cuenta una historia sobre Max o Luna (real o inventada).", en: "Tell a story about Max or Luna, real or invented." } },
    { day: { es: "Viernes", en: "Friday" }, q: { es: "¿Qué hiciste ayer en el trabajo o la escuela?", en: "What did you do at work or school yesterday?" } },
    { day: { es: "Sábado", en: "Saturday" }, q: { es: "¿Qué comiste y a quién viste?", en: "What did you eat and who did you see?" } },
    { day: { es: "Domingo", en: "Sunday" }, q: { es: "¿Qué vas a hacer la próxima semana?", en: "What are you going to do next week?" } },
  ];

  const CAN_DO_ITEMS = [
    { es: "Puedo contar una historia de ayer usando went, saw, bought, took, made, got.", en: "I can tell a story about yesterday using went, saw, bought, took, made, got." },
    { es: "Puedo hacer y responder preguntas con did y didn't.", en: "I can ask and answer questions with did and didn't." },
    { es: "Puedo usar was y were correctamente.", en: "I can use was and were correctly." },
    { es: "Puedo hablar de planes con going to y decisiones con will.", en: "I can talk about plans with going to and decisions with will." },
    { es: "Puedo comparar dos cosas con bigger, more expensive, better, worse.", en: "I can compare two things with bigger, more expensive, better, worse." },
    { es: "Puedo preguntar sobre experiencias con Have you ever...?", en: "I can ask about experiences with Have you ever...?" },
    { es: "Puedo dar consejos con should y hablar de obligaciones con have to.", en: "I can give advice with should and talk about obligations with have to." },
    { es: "Puedo escribir 5–6 líneas sobre mi día usando first, then, after that, finally.", en: "I can write 5 to 6 lines about my day using first, then, after that, finally." },
    { es: "Puedo hacer shadowing con una conversación corta en inglés de EE. UU. y copiar gonna y hafta.", en: "I can shadow a short US conversation and copy gonna and hafta." },
  ];

  const QUIZ_QUESTIONS = [
    {
      prompt: {
        es: "Elige la pregunta correcta en Pasado Simple:",
        en: "Choose the correct Past Simple question:",
      },
      options: ["Did you went to the park?", "Did you go to the park?", "Did you going to the park?"],
      correct: 1,
      feedback: {
        es: "¡Correcto! Después de «did», siempre usamos el verbo base («go»).",
        en: "Correct! After 'did', always use the base verb ('go').",
      },
    },
    {
      prompt: {
        es: "Completa con el pasado del verbo 'to be': «___ you at the store yesterday?»",
        en: "Complete with the past of 'to be': '___ you at the store yesterday?'",
      },
      options: ["Did", "Was", "Were"],
      correct: 2,
      feedback: {
        es: "¡Exacto! Con «you / we / they» usamos «were», nunca «did» con to be.",
        en: "Exactly! With 'you / we / they' we use 'were', never 'did' with to be.",
      },
    },
    {
      prompt: {
        es: "¿Cómo suena la terminación -ed en «watched» (I watched TV)?",
        en: "How is the -ed ending pronounced in 'watched' (I watched TV)?",
      },
      options: [
        { es: "Como /t/ en una sílaba: WATCHT", en: "Like /t/ in one syllable: WATCHT" },
        { es: "Como /id/ en dos sílabas: WATCH-id", en: "Like /id/ in two syllables: WATCH-id" },
        { es: "Como /d/ suave: WATCH-ed", en: "Like soft /d/: WATCH-ed" },
      ],
      correct: 0,
      feedback: {
        es: "¡Muy bien! «Watch» termina en sonido sordo /tʃ/, así que -ed suena /t/: WATCHT (una sola sílaba).",
        en: "Well done! 'Watch' ends in a voiceless /tʃ/ sound, so -ed sounds like /t/: WATCHT (one syllable).",
      },
    },
    {
      prompt: {
        es: "Ves nubes oscuras en el cielo. ¿Qué dices?",
        en: "You see dark clouds in the sky. What do you say?",
      },
      options: ["It is going to rain.", "It will to rain.", "It is will rain."],
      correct: 0,
      feedback: {
        es: "¡Correcto! Cuando hay evidencia visible ahora mismo, usamos «going to».",
        en: "Correct! When there is visible evidence right now, we use 'going to'.",
      },
    },
    {
      prompt: {
        es: "Tu amigo lleva bolsas pesadas y te ofreces en el momento: «___ carry your bags.»",
        en: "Your friend is carrying heavy bags and you offer right now: '___ carry your bags.'",
      },
      options: ["I am going to", "I will", "I going to"],
      correct: 1,
      feedback: {
        es: "¡Perfecto! Para ofrecimientos y decisiones espontáneas en el momento usamos «will» (I'll).",
        en: "Perfect! For offers and spontaneous decisions in the moment, we use 'will' (I'll).",
      },
    },
    {
      prompt: {
        es: "Elige la comparación correcta:",
        en: "Choose the correct comparison:",
      },
      options: [
        "My English is gooder than last year.",
        "My English is more better than last year.",
        "My English is better than last year.",
      ],
      correct: 2,
      feedback: {
        es: "¡Así es! «Good» es irregular: good → better → the best.",
        en: "That's right! 'Good' is irregular: good → better → the best.",
      },
    },
    {
      prompt: {
        es: "¿Cuál frase usa correctamente «Present Perfect» vs. «Past Simple»?",
        en: "Which sentence uses 'Present Perfect' vs. 'Past Simple' correctly?",
      },
      options: [
        "I have been to Mexico in 2022.",
        "I have been to Mexico. I went in 2022.",
        "I went to Mexico never.",
      ],
      correct: 1,
      feedback: {
        es: "¡Excelente! Present Perfect para experiencia general (sin fecha), y Past Simple cuando dices cuándo («in 2022»).",
        en: "Excellent! Present Perfect for general experience (no date), and Past Simple when you say when ('in 2022').",
      },
    },
    {
      prompt: {
        es: "El museo es gratis hoy. ¿Qué significa «You don't have to pay»?",
        en: "The museum is free today. What does 'You don't have to pay' mean?",
      },
      options: [
        { es: "Está prohibido pagar", en: "It is forbidden to pay" },
        { es: "No es necesario pagar (es opcional)", en: "It is not necessary to pay (optional)" },
        { es: "Debes pagar antes de entrar", en: "You must pay before entering" },
      ],
      correct: 1,
      feedback: {
        es: "¡Exacto! «Don't have to» = sin obligación. «Mustn't» = prohibido.",
        en: "Exactly! 'Don't have to' = no obligation. 'Mustn't' = prohibited.",
      },
    },
    {
      prompt: {
        es: "Elige la oración correcta con un modal:",
        en: "Choose the correct sentence with a modal:",
      },
      options: ["I must go now.", "I must to go now.", "She shoulds study more."],
      correct: 0,
      feedback: {
        es: "¡Bien! Los modales (must, should) van directo con el verbo base, sin «to» y sin «-s».",
        en: "Nice! Modals (must, should) go directly with the base verb, without 'to' and without '-s'.",
      },
    },
    {
      prompt: {
        es: "En inglés estadounidense hablado, ¿qué significa «I hafta study»?",
        en: "In spoken US English, what does 'I hafta study' mean?",
      },
      options: ["I have to study", "I had to study", "I am going to study"],
      correct: 0,
      feedback: {
        es: "¡Correcto! En habla rápida en EE. UU., «have to» suele reducirse a «hafta» (y «going to» a «gonna»).",
        en: "Correct! In fast US speech, 'have to' often reduces to 'hafta' (and 'going to' to 'gonna').",
      },
    },
  ];

  /* ==========================================================================
     Renderers
     ========================================================================== */

  function stepHead(num, title) {
    return `<h3 class="lesson-step-title"><span class="lesson-step-num">${num}</span>${title}</h3>`;
  }

  function renderHeroBanner() {
    return `
      <div class="routine-strip" style="margin-bottom: 1.25rem;">
        <li><span class="routine-icon" aria-hidden="true">🪢</span><span><strong>${L("Rango:", "Crew level:")}</strong> ${L("Marinero de Cubierta (Deckhand)", "Deckhand")}</span></li>
        <li><span class="routine-icon" aria-hidden="true">🧭</span><span><strong>CEFR:</strong> A2 Elementary</span></li>
        <li><span class="routine-icon" aria-hidden="true">💬</span><span>${L("Compras, viajes, mensajes de trabajo e historias simples en pasado, presente y futuro.", "Shopping, travel, work messages, and simple stories in past, present, and future.")}</span></li>
      </div>
    `;
  }

  function renderFilterTabs() {
    const tabs = [
      { id: "all", label: { es: "📚 Ver Todo", en: "📚 View All" } },
      { id: "past", label: { es: "1. Pasado Simple", en: "1. Past Simple" } },
      { id: "future", label: { es: "2. Going to vs. Will", en: "2. Going to vs. Will" } },
      { id: "compare", label: { es: "3. Comparativos", en: "3. Comparatives" } },
      { id: "perfect", label: { es: "4. Present Perfect", en: "4. Present Perfect" } },
      { id: "modals", label: { es: "5. Should / Have to", en: "5. Should / Have to" } },
      { id: "routine", label: { es: "6. Rutinas A2", en: "6. A2 Routines" } },
      { id: "quiz", label: { es: "7. Práctica Final", en: "7. Quick Check & Quiz" } },
    ];

    return `
      <nav class="level-bar-wrapper" aria-label="${L("Secciones del Nivel A2", "Level A2 Sections")}">
        <div class="level-tabs" role="tablist">
          ${tabs
            .map(
              (tab) => `
            <button type="button" class="level-tab-btn ${activeTab === tab.id ? "active" : ""}" role="tab" aria-selected="${activeTab === tab.id}" data-a2-tab="${tab.id}">
              ${tab.label[lang()]}
            </button>`
            )
            .join("")}
        </div>
      </nav>
    `;
  }

  function renderPastSimple() {
    const tryItHtml = TRY_IT_PAST.map((item) => {
      const open = Boolean(revealedTryIt[item.id]);
      return `
        <div class="compare-box" style="align-items: flex-start; text-align: left;">
          <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:0.5rem; flex-wrap:wrap;">
            <strong>${item.prompt}</strong>
            ${speakBtn(item.prompt, L("Escuchar", "Listen"), "speak-btn-sm")}
          </div>
          <button type="button" class="btn btn-light" style="padding:0.35rem 0.75rem; font-size:0.85rem; margin-top:0.35rem;" data-tryit="${item.id}">
            ${open ? L("Ocultar respuesta", "Hide answer") : L("Ver negativa y pregunta", "Show negative & question")}
          </button>
          ${
            open
              ? `<div style="margin-top:0.5rem; display:flex; flex-direction:column; gap:0.35rem;">
                  <div>${speakBtn(item.neg, item.neg, "speak-btn-sm")}</div>
                  <div>${speakBtn(item.q, item.q, "speak-btn-sm")}</div>
                </div>`
              : ""
          }
        </div>
      `;
    }).join("");

    const irregularRows = IRREGULAR_VERBS.map(
      ([base, past, ex]) => `
        <tr>
          <td class="letters-cell">${base}</td>
          <td>${speakBtn(past, past, "speak-btn-sm")}</td>
          <td>${speakBtn(ex, ex, "speak-btn-sm")}</td>
        </tr>`
    ).join("");

    return `
      <section class="card lesson-card" aria-labelledby="a2-past-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("SECCIÓN 1 · PASADO SIMPLE", "SECTION 1 · PAST SIMPLE")}</span>
          <h2 id="a2-past-title" class="theory-title">1. Past Simple / ${L("Pasado Simple", "Finished Actions")}</h2>
          <p class="theory-explanation">${L(
            "Usa Past Simple para acciones terminadas en un tiempo que ya acabó (yesterday, last week, in 2020, two days ago). Forma: Sujeto + verbo en pasado.",
            "Use Past Simple for finished actions in the past. The time is finished: yesterday, last week, in 2020, two days ago. Form: Subject + verb in past."
          )}</p>
        </header>

        <div class="lesson-step">
          ${stepHead("1.1", L("Auxiliar Did / Didn't (negativas y preguntas)", "Auxiliary Did / Didn't for negatives & questions"))}
          <p>${L(
            "Con la mayoría de los verbos no cambias el verbo principal: usas <strong>did / didn't</strong> + el verbo base.",
            "With most verbs, you do not change the main verb. You use <strong>did / didn't</strong> + the base verb."
          )}</p>
          <div class="can-do-box">
            <ul style="list-style:none; padding-left:0;">
              <li>✅ <strong>${L("Afirmativa:", "Affirmative:")}</strong> ${speakBtn("I watched a movie.", "I watched a movie.", "speak-btn-sm")}</li>
              <li>❌ <strong>${L("Negativa:", "Negative:")}</strong> ${speakBtn("I didn't watch a movie.", "I did not / didn't watch a movie.", "speak-btn-sm")}</li>
              <li>❓ <strong>${L("Pregunta:", "Question:")}</strong> ${speakBtn("Did you watch a movie?", "Did you watch a movie?", "speak-btn-sm")} → <em>Yes, I did. / No, I didn't.</em></li>
            </ul>
          </div>
          <div class="phrase-list">
            <li>${speakBtn("She bought bread. She didn't buy bread. Did she buy bread?", "She bought bread. / She didn't buy bread. / Did she buy bread?", "speak-btn-sm")}</li>
            <li>${speakBtn("They went to the park. They didn't go to the park. Did they go to the park?", "They went to the park. / They didn't go. / Did they go?", "speak-btn-sm")}</li>
            <li>${speakBtn("He made dinner. He didn't make dinner. Did he make dinner?", "He made dinner. / He didn't make dinner. / Did he make dinner?", "speak-btn-sm")}</li>
          </div>
          <div class="example-box">
            <span class="example-box-label">${L("ERROR COMÚN Y PRONUNCIACIÓN", "COMMON MISTAKE & PRONUNCIATION")}</span>
            <p>✕ <del>Did you went? / I didn't went.</del> → ✓ <strong>Did you go? / I didn't go.</strong> ${L("(Después de did, siempre verbo base).", "(After did, always use the base verb.)")}</p>
            <p>🗣️ <strong>Didn't</strong> = <code>DID-ent</code> · <strong>Did you eat?</strong> ${L("suena rápido como", "in fast speech sounds like")} <code>DIJ-uh eat?</code> ${speakBtn("Did you eat?", "Did you eat?", "speak-btn-sm")}</p>
          </div>
          <p><strong>${L("Inténtalo tú (cambia a negativa y pregunta):", "Try it (change to negative & question):")}</strong></p>
          <div class="compare-grid">${tryItHtml}</div>
        </div>

        <div class="lesson-step">
          ${stepHead("1.2", L("El verbo To Be en pasado: Was / Were", "The Verb To Be in the Past: Was / Were"))}
          <p>${L(
            "To be es especial: <strong>no usa did</strong>. Cambia a <strong>was</strong> (I / he / she / it) o <strong>were</strong> (you / we / they).",
            "To be is special. It <strong>does not use did</strong>. It changes to <strong>was</strong> (I / he / she / it) or <strong>were</strong> (you / we / they)."
          )}</p>
          <div class="phrase-list">
            <li>${speakBtn("I was at home yesterday. She was tired after work.", "I was at home yesterday. / She was tired after work.", "speak-btn-sm")}</li>
            <li>${speakBtn("They were in the market. We were happy.", "They were in the market. / We were happy.", "speak-btn-sm")}</li>
            <li>${speakBtn("I wasn't at school. They weren't ready.", "I wasn't at school. / They weren't ready.", "speak-btn-sm")}</li>
            <li>${speakBtn("Were you at the store? Yes, I was. Was it cold? No, it wasn't.", "Were you at the store? Yes, I was. / Was it cold? No, it wasn't.", "speak-btn-sm")}</li>
          </div>
          <div class="example-box">
            <span class="example-box-label">${L("MINI HISTORIA", "MINI STORY")}</span>
            <p>✕ <del>Did you was happy?</del> → ✓ <strong>Were you happy?</strong></p>
            <p>${speakBtn("Yesterday, Elena was at the grocery store. She was with Max. The store was busy, but Elena was happy because she found fresh bread.", "Yesterday, Elena was at the grocery store. She was with Max. The store was busy, but Elena was happy because she found fresh bread.", "speak-btn-line")}</p>
          </div>
        </div>

        <div class="lesson-step">
          ${stepHead("1.3", L("20 verbos irregulares de alta frecuencia", "20 High-Frequency Irregular Verbs"))}
          <p>${L(
            "Estos verbos no agregan -ed. Apréndelos en grupos de 3 (<em>go - went - gone</em>), enfocándote primero en el pasado.",
            "These verbs do not add -ed. Learn them in groups of 3 (<em>go - went - gone</em>), focusing on the past form first."
          )}</p>
          <div class="table-wrap">
            <table class="lesson-table">
              <thead><tr><th>Base</th><th>Past</th><th>${L("Ejemplo", "Example")}</th></tr></thead>
              <tbody>${irregularRows}</tbody>
            </table>
          </div>
        </div>

        <div class="lesson-step">
          ${stepHead("1.4", L("Terminaciones regulares -ed: 3 sonidos y ortografía", "Regular Past Endings -ed: 3 Sounds & Spelling"))}
          <div class="technique-grid">
            <div class="technique-card">
              <h4>/ɪd/ (t, d)</h4>
              <p>${L("Añade una sílaba extra:", "Adds an extra syllable:")} <code>WANT-id</code></p>
              ${speakBtn("wanted, needed, visited", "wanted · needed · visited", "speak-btn-sm")}
            </div>
            <div class="technique-card">
              <h4>/t/ (p, k, s, sh, ch, f)</h4>
              <p>${L("Sonido sordo, una sílaba:", "Voiceless sound, 1 syllable:")} <code>WATCHT</code></p>
              ${speakBtn("watched, cooked, washed, laughed", "watched · cooked · washed", "speak-btn-sm")}
            </div>
            <div class="technique-card">
              <h4>/d/ (l, n, b, g, v, m, vocal)</h4>
              <p>${L("Sonido sonoro, una sílaba:", "Voiced sound, 1 syllable:")} <code>PLAYD</code></p>
              ${speakBtn("played, cleaned, lived, called", "played · cleaned · lived", "speak-btn-sm")}
            </div>
          </div>
          <div class="example-box">
            <span class="example-box-label">${L("ORTOGRAFÍA Y PREFERENCIA EN EE. UU.", "SPELLING & US ENGLISH PREFERENCE")}</span>
            <ul class="tip-list">
              <li><code>watch → watched</code> · <code>play → played</code> (${L("vocal + y", "vowel + y")}) · <code>study → studied</code> (${L("consonante + y → i", "consonant + y → i")})</li>
              <li><code>stop → stopped</code> (${L("dobla consonante CVC", "double final consonant")}) · <code>love → loved</code> (${L("quita la -e", "drop -e")})</li>
              <li><strong>US English:</strong> <em>learned, burned, dreamed</em> ${L("(más común en EE. UU. que learnt/burnt/dreamt).", "(more common in the US than learnt/burnt/dreamt).")}</li>
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  function renderFutureForms() {
    const rows = FUTURE_CHOICE_ROWS.map(
      (r) => `
        <tr>
          <td>${r.sit[lang()]}</td>
          <td><strong>${r.use}</strong></td>
          <td>${speakBtn(r.ex, r.ex, "speak-btn-sm")}</td>
        </tr>`
    ).join("");

    return `
      <section class="card lesson-card" aria-labelledby="a2-future-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("SECCIÓN 2 · FUTURO", "SECTION 2 · FUTURE FORMS")}</span>
          <h2 id="a2-future-title" class="theory-title">2. Future Forms: Going to vs. Will</h2>
          <p class="theory-explanation">${L(
            "Ambos hablan del futuro, pero la intención es distinta: Going to es para un plan previo o evidencia; Will es para una decisión tomada en este momento.",
            "Both talk about the future, but the feeling is different: Going to is for a plan or evidence; Will is for a decision in the moment."
          )}</p>
        </header>

        <div class="lesson-step">
          ${stepHead("2.1", L("Planes e intenciones: Going to (y gonna)", "Plans & Intentions: Going to (and gonna)"))}
          <p><strong>${L("Forma:", "Form:")}</strong> <code>Subject + am / is / are + going to + base verb</code></p>
          <div class="phrase-list">
            <li>${speakBtn("I am going to study English tonight.", "I am going to study English tonight.", "speak-btn-sm")}</li>
            <li>${speakBtn("She is going to visit her mom on Sunday.", "She is going to visit her mom on Sunday.", "speak-btn-sm")}</li>
            <li>${speakBtn("Look at the clouds. It is going to rain.", "Look at the clouds. It is going to rain. (evidence)", "speak-btn-sm")}</li>
          </div>
          <div class="example-box">
            <span class="example-box-label">${L("PRONUNCIACIÓN EN EE. UU.: GONNA", "US PRONUNCIATION: GONNA")}</span>
            <p>${L("En habla natural, «going to» se reduce a <strong>gonna</strong> (solo al hablar o en mensajes informales):", "In natural conversation, 'going to' reduces to <strong>gonna</strong> (speaking & informal texts only):")}</p>
            <p>${speakBtn("I'm gonna study tonight. She's gonna call you. We're gonna travel in December.", "I'm gonna study tonight · She's gonna call you · We're gonna travel in December", "speak-btn-sm")}</p>
          </div>
        </div>

        <div class="lesson-step">
          ${stepHead("2.2", L("Decisiones espontáneas, ofertas y promesas: Will", "Spontaneous Decisions, Offers & Promises: Will"))}
          <p><strong>${L("Forma:", "Form:")}</strong> <code>Subject + will + base verb</code> · ${L("Negativa:", "Negative:")} <code>will not / won't</code> (<code>WOHNT</code>)</p>
          <div class="phrase-list">
            <li>${speakBtn("I'll help you. I'll carry your bags.", "Offer: I'll help you. / I'll carry your bags.", "speak-btn-sm")}</li>
            <li>${speakBtn("I'll call you tomorrow, I promise.", "Promise: I'll call you tomorrow, I promise.", "speak-btn-sm")}</li>
            <li>${speakBtn("I'll take this one.", "Quick decision: I'll take this one.", "speak-btn-sm")}</li>
          </div>
          <p>✕ <del>I am will go tomorrow.</del> → ✓ <strong>I will go tomorrow.</strong> / <strong>I am going to go tomorrow.</strong></p>
        </div>

        <div class="lesson-step">
          ${stepHead("2.3", L("¿Cómo elegir? + Diálogo de práctica", "How to Choose + Practice Dialogue"))}
          <div class="table-wrap">
            <table class="lesson-table">
              <thead><tr><th>${L("Situación", "Situation")}</th><th>${L("Usa", "Use")}</th><th>${L("Ejemplo", "Example")}</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
          <ol class="dialogue">
            <li class="dialogue-line"><span class="dialogue-who">A</span>${speakBtn("What are you going to do this weekend?", "What are you going to do this weekend?", "speak-btn-line")}</li>
            <li class="dialogue-line dialogue-b"><span class="dialogue-who">B</span>${speakBtn("I am going to visit my family. What about you?", "I am going to visit my family. What about you?", "speak-btn-line")}</li>
            <li class="dialogue-line"><span class="dialogue-who">A</span>${speakBtn("I don't know. I will stay home and rest, I think.", "I don't know. I will stay home and rest, I think.", "speak-btn-line")}</li>
            <li class="dialogue-line dialogue-b"><span class="dialogue-who">B</span>${speakBtn("Oh, I forgot my phone. I will go back for it.", "Oh, I forgot my phone. I will go back for it.", "speak-btn-line")}</li>
          </ol>
        </div>
      </section>
    `;
  }

  function renderComparatives() {
    return `
      <section class="card lesson-card" aria-labelledby="a2-compare-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("SECCIÓN 3 · COMPARATIVOS Y SUPERLATIVOS", "SECTION 3 · COMPARATIVES & SUPERLATIVES")}</span>
          <h2 id="a2-compare-title" class="theory-title">3. Comparatives and Superlatives</h2>
          <p class="theory-explanation">${L(
            "Usa comparativos para comparar 2 cosas y superlativos para comparar 1 cosa con todo un grupo.",
            "Use comparatives to compare 2 things. Use superlatives to compare 1 thing with a whole group."
          )}</p>
        </header>

        <div class="lesson-step">
          ${stepHead("3.1", L("Adjetivos cortos: -er y -est", "Short Adjectives: -er and -est"))}
          <p><code>adjective + er + than</code> · <code>the + adjective + est</code></p>
          <div class="phrase-list">
            <li>${speakBtn("My dog is bigger than your dog. Max is the biggest dog in the park.", "Big: bigger than / the biggest (double g)", "speak-btn-sm")}</li>
            <li>${speakBtn("A cheetah is faster than a lion. A cheetah is the fastest land animal.", "Fast: faster than / the fastest", "speak-btn-sm")}</li>
            <li>${speakBtn("Today I am happier than yesterday. This is the happiest day of the week.", "Happy: happier / the happiest (y → i)", "speak-btn-sm")}</li>
          </div>
        </div>

        <div class="lesson-step">
          ${stepHead("3.2", L("Adjetivos largos: More y The Most", "Long Adjectives: More and The Most"))}
          <p><code>more + adjective + than</code> · <code>the most + adjective</code> ${L("(sin -er)", "(do not add -er)")}</p>
          <div class="phrase-list">
            <li>${speakBtn("This phone is more expensive than that one. This is the most expensive phone in the store.", "Expensive: more expensive than / the most expensive", "speak-btn-sm")}</li>
            <li>${speakBtn("Lake Atitlan is the most beautiful place I know.", "Beautiful: more beautiful / the most beautiful", "speak-btn-sm")}</li>
            <li>${speakBtn("Grammar is the most difficult part for me.", "Difficult: more difficult / the most difficult", "speak-btn-sm")}</li>
          </div>
        </div>

        <div class="lesson-step">
          ${stepHead("3.3", L("Irregulares y patrones extra A2", "Irregular Forms & Extra A2 Patterns"))}
          <div class="table-wrap">
            <table class="lesson-table">
              <thead><tr><th>Adjective</th><th>Comparative</th><th>Superlative</th></tr></thead>
              <tbody>
                <tr><td>good</td><td>${speakBtn("better", "better", "speak-btn-sm")}</td><td>${speakBtn("the best", "the best", "speak-btn-sm")}</td></tr>
                <tr><td>bad</td><td>${speakBtn("worse", "worse", "speak-btn-sm")}</td><td>${speakBtn("the worst", "the worst", "speak-btn-sm")}</td></tr>
                <tr><td>far</td><td>${speakBtn("farther", "farther / further", "speak-btn-sm")}</td><td>${speakBtn("the farthest", "the farthest / furthest", "speak-btn-sm")}</td></tr>
              </tbody>
            </table>
          </div>
          <div class="example-box">
            <span class="example-box-label">${L("PATRONES A2 Y ERRORES COMUNES", "A2 PATTERNS & COMMON MISTAKES")}</span>
            <ul class="tip-list">
              <li>${speakBtn("She is as tall as her sister.", "as + adj + as: She is as tall as her sister.", "speak-btn-sm")}</li>
              <li>${speakBtn("This bag is less expensive than that one.", "less + adj: This bag is less expensive than that one.", "speak-btn-sm")}</li>
              <li>✕ <del>more bigger / most happiest / gooder</del> → ✓ <strong>bigger / the happiest / better</strong></li>
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  function renderPresentPerfect() {
    const participles = PARTICIPLE_LIST.map(
      ([base, pp]) => `<span class="vocab-chip" data-speak="${base}, ${pp}">🔊 <strong>${base}</strong> → ${pp}</span>`
    ).join("");

    return `
      <section class="card lesson-card" aria-labelledby="a2-perfect-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("SECCIÓN 4 · PRESENT PERFECT", "SECTION 4 · PRESENT PERFECT SIMPLE")}</span>
          <h2 id="a2-perfect-title" class="theory-title">4. Present Perfect Simple: Introduction</h2>
          <p class="theory-explanation">${L(
            "Conecta el pasado con el presente. En A2 empezamos con experiencias de vida usando ever y never.",
            "Present Perfect connects the past to the present. For A2, start with life experiences using ever and never."
          )}</p>
        </header>

        <div class="lesson-step">
          ${stepHead("4.1", L("Experiencias de vida: Ever y Never", "Life Experiences: Ever and Never"))}
          <p><code>Have you ever + past participle?</code> · <code>I have never + past participle</code></p>
          <div class="phrase-list">
            <li>${speakBtn("Have you ever been to California? Yes, I have.", "Have you ever been to California? Yes, I have.", "speak-btn-sm")}</li>
            <li>${speakBtn("Have you ever eaten tacos al pastor? Yes, I have. They are delicious.", "Have you ever eaten tacos al pastor? Yes, I have.", "speak-btn-sm")}</li>
            <li>${speakBtn("Has she ever seen a whale? No, she has never seen one.", "Has she ever seen a whale? No, she has never seen one.", "speak-btn-sm")}</li>
          </div>
          <div class="vocab-chips">${participles}</div>
        </div>

        <div class="lesson-step">
          ${stepHead("4.2", L("Contraste con Past Simple", "Contrast with Past Simple"))}
          <div class="compare-grid">
            <div class="compare-box">
              <span class="compare-label">Present Perfect</span>
              <strong>${L("Experiencia (sin fecha)", "Experience (no date)")}</strong>
              ${speakBtn("I have been to Mexico.", "I have been to Mexico.", "speak-btn-sm")}
            </div>
            <div class="compare-box compare-box-accent">
              <span class="compare-label">Past Simple</span>
              <strong>${L("Tiempo específico", "Specific finished time")}</strong>
              ${speakBtn("I went to Mexico in 2022.", "I went to Mexico in 2022.", "speak-btn-sm")}
            </div>
          </div>
          <ol class="dialogue">
            <li class="dialogue-line"><span class="dialogue-who">A</span>${speakBtn("Have you ever been to Antigua?", "Have you ever been to Antigua?", "speak-btn-line")}</li>
            <li class="dialogue-line dialogue-b"><span class="dialogue-who">B</span>${speakBtn("Yes, I have.", "Yes, I have.", "speak-btn-line")}</li>
            <li class="dialogue-line"><span class="dialogue-who">A</span>${speakBtn("When did you go?", "When did you go?", "speak-btn-line")}</li>
            <li class="dialogue-line dialogue-b"><span class="dialogue-who">B</span>${speakBtn("I went last month. It was beautiful.", "I went last month. It was beautiful.", "speak-btn-line")}</li>
          </ol>
        </div>

        <div class="lesson-step">
          ${stepHead("4.3", L("Nota de inglés de EE. UU.: Already, Just, Yet", "US English Note: Already, Just, Yet"))}
          <p>${L(
            "En el habla cotidiana de EE. UU. se prefiere Past Simple con <em>already, just, yet</em> (aunque Present Perfect también es correcto).",
            "In everyday US speech, speakers strongly favor Past Simple with <em>already, just, yet</em> (both are correct)."
          )}</p>
          <div class="phrase-list">
            <li>${speakBtn("Did you eat yet? Yes, I ate already.", "US: Did you eat yet? Yes, I ate already.", "speak-btn-sm")}</li>
            <li>${speakBtn("Did you finish yet? No, I didn't finish yet.", "US: Did you finish yet? No, I didn't finish yet.", "speak-btn-sm")}</li>
            <li>${speakBtn("I just got home.", "US: I just got home.", "speak-btn-sm")}</li>
          </div>
          <p>✕ <del>I have went to the store yesterday.</del> → ✓ <strong>I went to the store yesterday.</strong></p>
        </div>
      </section>
    `;
  }

  function renderModals() {
    return `
      <section class="card lesson-card" aria-labelledby="a2-modals-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("SECCIÓN 5 · MODALES", "SECTION 5 · MODALS OF OBLIGATION & ADVICE")}</span>
          <h2 id="a2-modals-title" class="theory-title">5. Modals: Should, Have to, Must</h2>
          <p class="theory-explanation">${L(
            "Los modales cambian la intención del verbo: consejo suave (should), regla externa (have to) u obligación fuerte / prohibición (must / mustn't).",
            "Modals change the feeling of a verb: soft advice (should), external rule (have to), or strong obligation / prohibition (must / mustn't)."
          )}</p>
        </header>

        <div class="lesson-step">
          ${stepHead("5.1", L("Dar consejos: Should / Shouldn't", "Giving Advice: Should / Shouldn't"))}
          <p>🗣️ <strong>Should</strong> = <code>SHOOD</code> · <strong>Shouldn't</strong> = <code>SHOOD-ent</code></p>
          <div class="phrase-list">
            <li>${speakBtn("You should practice every day.", "You should practice every day.", "speak-btn-sm")}</li>
            <li>${speakBtn("You shouldn't stay up late. You have class tomorrow.", "You shouldn't stay up late.", "speak-btn-sm")}</li>
          </div>
          <ol class="dialogue">
            <li class="dialogue-line"><span class="dialogue-who">A</span>${speakBtn("I want to improve my listening.", "I want to improve my listening.", "speak-btn-line")}</li>
            <li class="dialogue-line dialogue-b"><span class="dialogue-who">B</span>${speakBtn("You should listen to a podcast every morning. And you should shadow one sentence a day.", "You should listen to a podcast every morning. And you should shadow one sentence a day.", "speak-btn-line")}</li>
          </ol>
        </div>

        <div class="lesson-step">
          ${stepHead("5.2", L("Necesidad y prohibición: Have to vs. Must", "Necessity & Prohibition: Have to vs. Must"))}
          <div class="compare-grid">
            <div class="compare-box">
              <span class="compare-label">Have to (hafta)</span>
              <strong>${L("Regla externa", "External rule")}</strong>
              ${speakBtn("I have to wear a uniform at work.", "I have to wear a uniform at work.", "speak-btn-sm")}
            </div>
            <div class="compare-box compare-box-accent">
              <span class="compare-label">Must</span>
              <strong>${L("Fuerte / oficial", "Personal / official")}</strong>
              ${speakBtn("You must stop at a red light.", "You must stop at a red light.", "speak-btn-sm")}
            </div>
          </div>
          <div class="example-box">
            <span class="example-box-label">${L("DIFERENCIA CLAVE EN NEGATIVA", "CRUCIAL NEGATIVE DIFFERENCE")}</span>
            <ul class="tip-list">
              <li><strong>Don't have to:</strong> ${L("No hay obligación (es opcional).", "No obligation (optional).")} ${speakBtn("You don't have to pay. It is free today.", "You don't have to pay. It is free today.", "speak-btn-sm")}</li>
              <li><strong>Mustn't:</strong> ${L("Prohibido, no lo hagas.", "Prohibited, do not do it.")} ${speakBtn("You mustn't park here.", "You mustn't park here.", "speak-btn-sm")}</li>
              <li>✕ <del>I must to go.</del> → ✓ <strong>I must go.</strong> / <strong>I have to go.</strong></li>
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  function renderRoutines() {
    const promptsHtml = WEEKLY_PROMPTS.map(
      (p) => `<li><strong>${p.day[lang()]}:</strong> ${p.q[lang()]}</li>`
    ).join("");

    return `
      <section class="card lesson-card" aria-labelledby="a2-routine-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("SECCIÓN 6 · RUTINAS DE ESTUDIO A2", "SECTION 6 · RECOMMENDED A2 STUDY ROUTINES")}</span>
          <h2 id="a2-routine-title" class="theory-title">6. ${L("Diario de 5–6 líneas y Shadowing A2", "5–6 Line Journal & A2 Shadowing")}</h2>
        </header>

        <div class="lesson-step">
          ${stepHead("6.1", L("Narración corta: diario de 5–6 líneas", "Short Story Narration: 5–6 Line Daily Journal"))}
          <p>${L(
            "Usa palabras de secuencia como pegamento: <strong>First, then, after that, finally</strong>. Lee tu diario en voz alta cuidando -ed y was/were.",
            "Use sequence words as glue: <strong>First, then, after that, finally</strong>. Read it aloud listening for -ed endings and was/were."
          )}</p>
          <div class="example-box">
            <span class="example-box-label">${L("EJEMPLO DE DIARIO", "JOURNAL EXAMPLE")}</span>
            <p>${speakBtn(
              "First, I went to the market in the morning. Then, I bought bread, milk, and eggs. After that, I met my friend Ana. Then, we drank coffee and talked about our classes. Finally, I went home and studied English for 20 minutes. It was a good day.",
              L("Escuchar diario completo", "Listen to full journal"),
              "speak-btn-sm"
            )}</p>
            <p style="margin-top:0.5rem;"><em>First, I went to the market in the morning. Then, I bought bread, milk, and eggs. After that, I met my friend Ana. Then, we drank coffee and talked about our classes. Finally, I went home and studied English for 20 minutes. It was a good day.</em></p>
          </div>
          <ul class="tip-list">${promptsHtml}</ul>
        </div>

        <div class="lesson-step">
          ${stepHead("6.2", L("Shadowing con conversaciones A2 + Plan de 15 minutos", "Shadowing with A2 Conversations + 15-Minute Daily Plan"))}
          <p>${L(
            "Escucha y repite al mismo tiempo (medio segundo detrás) copiando enlaces reales: <code>what are you = whadaya</code>, <code>going to = gonna</code>, <code>have to = hafta</code>, <code>did you = didja</code>.",
            "Listen and speak half a second behind, copying real linking: <code>what are you = whadaya</code>, <code>going to = gonna</code>, <code>have to = hafta</code>, <code>did you = didja</code>."
          )}</p>
          <ol class="dialogue">
            <li class="dialogue-line"><span class="dialogue-who">A</span>${speakBtn("Hey, what are you gonna do tonight?", "Hey, what are you gonna do tonight?", "speak-btn-line")}</li>
            <li class="dialogue-line dialogue-b"><span class="dialogue-who">B</span>${speakBtn("I'm gonna stay home. I hafta study for my test.", "I'm gonna stay home. I hafta study for my test.", "speak-btn-line")}</li>
            <li class="dialogue-line"><span class="dialogue-who">A</span>${speakBtn("Did you eat already?", "Did you eat already?", "speak-btn-line")}</li>
            <li class="dialogue-line dialogue-b"><span class="dialogue-who">B</span>${speakBtn("Yeah, I just ate. I had tacos.", "Yeah, I just ate. I had tacos.", "speak-btn-line")}</li>
            <li class="dialogue-line"><span class="dialogue-who">A</span>${speakBtn("Nice. You should practice listening, too.", "Nice. You should practice listening, too.", "speak-btn-line")}</li>
            <li class="dialogue-line dialogue-b"><span class="dialogue-who">B</span>${speakBtn("I know. I will listen to a podcast. I promise.", "I know. I will listen to a podcast. I promise.", "speak-btn-line")}</li>
          </ol>
          <div class="micro-practice">
            <strong>${L("Plan diario de 15 minutos:", "15-minute daily plan:")}</strong>
            <ul class="check-list">
              <li><strong>0–3 min:</strong> ${L("Repasa 5 verbos irregulares en voz alta.", "Review 5 irregular verbs aloud.")}</li>
              <li><strong>3–8 min:</strong> ${L("Escribe tu diario de 5 líneas.", "Write your 5-line journal.")}</li>
              <li><strong>8–13 min:</strong> ${L("Haz shadowing 3 veces con un diálogo corto.", "Shadow one short dialogue, 3 times.")}</li>
              <li><strong>13–15 min:</strong> ${L("Di una oración nueva con going to y otra con should.", "Say one new sentence with going to and one with should.")}</li>
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  function renderQuizAndCheck() {
    const letters = ["A", "B", "C", "D"];
    const checklistHtml = CAN_DO_ITEMS.map((item, idx) => {
      const checked = Boolean(canDoChecked[idx]);
      return `
        <label style="display:flex; align-items:flex-start; gap:0.6rem; cursor:pointer; padding:0.45rem 0.6rem; border-radius:10px; background:${checked ? "var(--status-success-bg)" : "var(--bg-surface)"}; border:1px solid var(--border-subtle);">
          <input type="checkbox" data-cando="${idx}" ${checked ? "checked" : ""} style="margin-top:0.25rem;" />
          <span>${item[lang()]}</span>
        </label>`;
    }).join("");

    const questionsHtml = QUIZ_QUESTIONS.map((q, idx) => {
      const state = answers[idx];
      const opts = q.options
        .map((opt, optIdx) => {
          let cls = "option-btn";
          if (state && state.value === optIdx) {
            cls += state.correct ? " selected-correct" : " selected-wrong";
          }
          return `
            <button type="button" class="${cls}" data-a2-q="${idx}" data-a2-opt="${optIdx}">
              <span class="option-letter" aria-hidden="true">${letters[optIdx]}</span>
              <span>${t(opt)}</span>
            </button>`;
        })
        .join("");

      let feedback = "";
      if (state) {
        feedback = state.correct
          ? `<div class="feedback-banner visible success" role="status">✓ ${t(q.feedback)}</div>`
          : `<div class="feedback-banner visible error" role="status">✕ ${L("Revisa la lección e inténtalo de nuevo.", "Review the lesson and try again.")}</div>`;
      }

      return `
        <li class="quiz-item">
          <p class="quiz-prompt"><span class="quiz-num">${idx + 1}</span>${t(q.prompt)}</p>
          <div class="options-list" role="group" aria-label="${L("Opciones de respuesta", "Answer options")}">${opts}</div>
          ${feedback}
        </li>`;
    }).join("");

    const correctCount = Object.values(answers).filter((a) => a.correct).length;
    const best = loadScores().a2 || 0;

    return `
      <section class="card lesson-card" aria-labelledby="a2-quiz-title">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("SECCIÓN 7 · AUTOEVALUACIÓN Y PRÁCTICA", "SECTION 7 · QUICK CHECK & PRACTICE")}</span>
          <h2 id="a2-quiz-title" class="theory-title">7. ${L("¿Ya puedes hacer esto? + Práctica A2", "Can You Do This? + A2 Practice")}</h2>
        </header>

        <div class="lesson-step" style="border-top:none; padding-top:0;">
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            ${checklistHtml}
          </div>
        </div>

        <div class="lesson-quiz">
          <div class="quiz-header">
            <div>
              <span class="card-eyebrow">${L("PRÁCTICA FINAL A2", "A2 FINAL PRACTICE")}</span>
              <h3 class="quiz-title">${L("Comprueba lo aprendido", "Test what you learned")}</h3>
            </div>
            <div class="quiz-score" aria-live="polite">
              <span class="badge badge-teal">${L("Correctas", "Correct")}: ${correctCount} / ${QUIZ_QUESTIONS.length}</span>
              <span class="badge badge-neutral">${L("Mejor", "Best")}: ${best} / ${QUIZ_QUESTIONS.length}</span>
            </div>
          </div>
          <ol class="quiz-list">${questionsHtml}</ol>
          <button type="button" id="a2-quiz-reset-btn" class="btn btn-light">↺ ${L("Reiniciar práctica", "Restart practice")}</button>
        </div>
      </section>
    `;
  }

  function render() {
    const scrollY = window.scrollY;
    let contentHtml = "";

    if (activeTab === "all") {
      contentHtml = `
        ${renderPastSimple()}
        ${renderFutureForms()}
        ${renderComparatives()}
        ${renderPresentPerfect()}
        ${renderModals()}
        ${renderRoutines()}
        ${renderQuizAndCheck()}
      `;
    } else if (activeTab === "past") contentHtml = renderPastSimple();
    else if (activeTab === "future") contentHtml = renderFutureForms();
    else if (activeTab === "compare") contentHtml = renderComparatives();
    else if (activeTab === "perfect") contentHtml = renderPresentPerfect();
    else if (activeTab === "modals") contentHtml = renderModals();
    else if (activeTab === "routine") contentHtml = renderRoutines();
    else if (activeTab === "quiz") contentHtml = renderQuizAndCheck();

    root.innerHTML = `
      ${renderHeroBanner()}
      ${renderFilterTabs()}
      ${contentHtml}
      <div class="level-nav-footer" style="margin-top: 2rem; display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        <a href="lesson-a1.html" class="btn btn-light">${L("← Nivel Anterior (2. Grumete)", "← Previous Level (2. Cabin Mate)")}</a>
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

    const tabBtn = event.target.closest("[data-a2-tab]");
    if (tabBtn) {
      activeTab = tabBtn.getAttribute("data-a2-tab");
      render();
      return;
    }

    const tryBtn = event.target.closest("[data-tryit]");
    if (tryBtn) {
      const id = tryBtn.getAttribute("data-tryit");
      revealedTryIt[id] = !revealedTryIt[id];
      render();
      return;
    }

    const optBtn = event.target.closest("[data-a2-opt]");
    if (optBtn) {
      const qIdx = Number(optBtn.getAttribute("data-a2-q"));
      const optIdx = Number(optBtn.getAttribute("data-a2-opt"));
      const q = QUIZ_QUESTIONS[qIdx];
      if (!q) return;
      if (answers[qIdx] && answers[qIdx].correct) return;
      answers[qIdx] = { value: optIdx, correct: optIdx === q.correct };
      const score = Object.values(answers).filter((a) => a.correct).length;
      saveBestScore(score);
      render();
      return;
    }

    if (event.target.closest("#a2-quiz-reset-btn")) {
      for (const k in answers) delete answers[k];
      render();
    }
  });

  root.addEventListener("change", (event) => {
    const cb = event.target.closest("[data-cando]");
    if (cb) {
      canDoChecked[cb.getAttribute("data-cando")] = cb.checked;
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
