/**
 * LinguaVela — Lessons Module (Level 2: Cabin Mate / A1)
 * Complete A1 Curriculum:
 *   Part 1: Grammar (Topics 1 - 15)
 *   Part 2: Vocabulary (Topics 16 - 25)
 *   Part 3: Communicative Functions (Topics 26 - 32)
 *   Part 4: Basic A1 Pronunciation (Topic 33)
 *   Suggested A1 Study Routine (Monday - Sunday)
 *   Interactive Practice Quiz with localStorage tracking
 *
 * Pure vanilla JS. Renders into #lesson-root, bilingual (ES/EN).
 * Re-renders automatically when main.js switches <html lang>.
 * Audio uses the browser's built-in Web Speech API (US English voice).
 */

(() => {
  "use strict";

  const root = document.getElementById("lesson-root");
  if (!root) return;

  const STORAGE_KEY = "linguavela-lesson-a1-scores";

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

  /* Active filter: 'all', 'grammar', 'vocab', 'functions', 'pronunciation', 'routine', 'quiz' */
  let activeTab = "all";

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
    if (!scores.best || score > scores.best) {
      scores.best = score;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
      } catch {
        // ignore storage errors
      }
    }
  }

  /* ==========================================================================
     Lesson Content & Sections
     ========================================================================== */

  const ROUTINE_DATA = [
    { day: { es: "Lunes", en: "Monday" }, task: { es: "Gramática 1 + Vocabulario 17 + 5 oraciones con to be.", en: "Grammar 1 + Vocabulary 17 + 5 sentences with to be." } },
    { day: { es: "Martes", en: "Tuesday" }, task: { es: "Gramática 2 y 3 + Vocabulario 24 + diario de rutina con adverbios de frecuencia.", en: "Grammar 2 and 3 + Vocabulary 24 + routine journal with adverbs of frequency." } },
    { day: { es: "Miércoles", en: "Wednesday" }, task: { es: "Gramática 5 y 6 + Vocabulario 19 + describe tu casa con There is / are.", en: "Grammar 5 and 6 + Vocabulary 19 + describe your house with There is / are." } },
    { day: { es: "Jueves", en: "Thursday" }, task: { es: "Gramática 7 y 8 + Vocabulario 20 y 21 + practica pedir comida.", en: "Grammar 7 and 8 + Vocabulary 20 and 21 + practice ordering food." } },
    { day: { es: "Viernes", en: "Friday" }, task: { es: "Gramática 15 + Función 31 + escribe 5 planes con going to.", en: "Grammar 15 + Function 31 + write 5 plans with going to." } },
    { day: { es: "Sábado", en: "Saturday" }, task: { es: "Repaso de vocabulario 18, 22, 23 + escucha un diálogo corto y repítelo.", en: "Review Vocabulary 18, 22, 23 + listen to a short dialogue and repeat it." } },
    { day: { es: "Domingo", en: "Sunday" }, task: { es: "Solo repaso: 10 minutos de flashcards y 10 minutos hablando en voz alta.", en: "Review only: 10 minutes of flashcards and 10 minutes speaking out loud." } },
  ];

  /* Interactive Quiz for Level A1 */
  const QUIZ_QUESTIONS = [
    {
      prompt: { es: "¿Cuál es la forma correcta del verbo To Be para «They»?", en: "What is the correct form of the verb To Be for 'They'?" },
      options: ["am", "is", "are"], correct: 2,
      feedback: { es: "Correcto: «They are students». I am, he/she/it is, we/you/they are.", en: "Correct: 'They are students'. I am, he/she/it is, we/you/they are." },
    },
    {
      prompt: { es: "Present Simple: ¿Cuál es la oración correcta en tercera persona (he)?", en: "Present Simple: Which sentence is correct in third person (he)?" },
      options: ["He watch TV every day.", "He watches TV every day.", "He is watch TV every day."], correct: 1,
      feedback: { es: "Correcto: Con he, she, it el verbo agrega -s o -es: «He watches TV».", en: "Correct: With he, she, it the verb takes -s or -es: 'He watches TV'." },
    },
    {
      prompt: { es: "¿Dónde se ubica el adverbio de frecuencia «always» con el verbo To Be?", en: "Where does the adverb of frequency 'always' go with the verb To Be?" },
      options: ["He always is happy.", "He is always happy.", "Always he is happy."], correct: 1,
      feedback: { es: "Correcto: Los adverbios de frecuencia van DESPUÉS de To Be (He is always happy) pero ANTES de los verbos normales.", en: "Correct: Adverbs of frequency go AFTER To Be (He is always happy) but BEFORE normal verbs." },
    },
    {
      prompt: { es: "¿Qué oración describe una acción que ocurre AHORA MISMO (Present Continuous)?", en: "Which sentence describes an action happening RIGHT NOW (Present Continuous)?" },
      options: ["I study English every Monday.", "I am studying English now.", "I study English."], correct: 1,
      feedback: { es: "Correcto: Present Continuous usa To Be + verbo en -ing («I am studying now»).", en: "Correct: Present Continuous uses To Be + verb in -ing ('I am studying now')." },
    },
    {
      prompt: { es: "¿Cuál es la opción correcta para decir que hay 2 sillas?", en: "Which option is correct to say there are 2 chairs?" },
      options: ["There is two chairs.", "There are two chairs.", "There have two chairs."], correct: 1,
      feedback: { es: "Correcto: Usamos «There are» para plurales (two chairs) y «There is» para singular.", en: "Correct: We use 'There are' for plural (two chairs) and 'There is' for singular." },
    },
    {
      prompt: { es: "¿Cómo se dice «a las 7:00 en punto» con la preposición de tiempo correcta?", en: "How do you say 'at 7:00' with the correct preposition of time?" },
      options: ["in 7:00", "on 7:00", "at 7:00"], correct: 2,
      feedback: { es: "Correcto: Usamos «at» para horas exactas (at 7:00, at night). «On» para días y «in» para meses/años.", en: "Correct: We use 'at' for exact times (at 7:00, at night). 'On' for days and 'in' for months/years." },
    },
    {
      prompt: { es: "Regla del modal Can: ¿Cuál es la forma correcta?", en: "Rule for modal Can: Which is the correct form?" },
      options: ["She cans speak English.", "She can speak English.", "She can to speak English."], correct: 1,
      feedback: { es: "Correcto: Can nunca lleva -s ni «to»: «She can speak English».", en: "Correct: Can never takes -s or 'to': 'She can speak English'." },
    },
    {
      prompt: { es: "En un restaurante, ¿cuál es la forma educada de pedir comida?", en: "At a restaurant, what is the polite way to order food?" },
      options: ["I give me coffee.", "I would like a coffee, please.", "I want drink."], correct: 1,
      feedback: { es: "Correcto: «I would like a coffee, please» es la expresión cortés y natural.", en: "Correct: 'I would like a coffee, please' is the natural and polite expression." },
    },
  ];

  /* ==========================================================================
     HTML Rendering Helpers
     ========================================================================== */

  function renderHeroBanner() {
    return `
      <section class="card lesson-card" style="margin-bottom: 1.75rem; border-left: 4px solid var(--accent-primary);">
        <header class="lesson-card-header">
          <span class="card-eyebrow">${L("NIVEL 2 · GRUMETE (CABIN MATE) • CEFR A1", "LEVEL 2 · CABIN MATE • CEFR A1")}</span>
          <h2 class="theory-title" style="margin-bottom: 0.5rem;">${L("El Objetivo del Nivel A1", "The Goal of Level A1")}</h2>
          <p class="theory-explanation" style="font-size: 1.05rem; line-height: 1.5; margin-bottom: 1rem;">
            ${L(
              "En A1 el objetivo <strong>no es hablar perfecto</strong>, es <strong>sobrevivir en inglés con frases simples</strong>: presentarte, hablar de tu rutina, describir tu casa, pedir comida, preguntar una dirección y decir lo que te gusta y lo que puedes hacer.",
              "At A1, the goal is <strong>not to speak perfectly</strong>, it is to <strong>survive in English with simple sentences</strong>: introduce yourself, talk about your routine, describe your house, order food, ask for directions, and say what you like and what you can do."
            )}
          </p>
          <div class="can-do-box">
            <span class="example-box-label">${L("COMPETENCIAS CLAVE DEL GRUMETE (A1)", "CABIN MATE CORE COMPETENCIES (A1)")}</span>
            <ul style="margin: 0; padding-left: 1.25rem;">
              <li><strong>${L("Gramática:", "Grammar:")}</strong> ${L("15 estructuras fundamentales (To Be, Present Simple & Continuous, Can, There is/are)", "15 essential structures (To Be, Present Simple & Continuous, Can, There is/are)")}</li>
              <li><strong>${L("Vocabulario:", "Vocabulary:")}</strong> ${L("10 temas prácticos cotidianos (familia, casa, comida, ciudad, rutina)", "10 everyday practical topics (family, home, food, city, routine)")}</li>
              <li><strong>${L("Funciones Comunicativas:", "Communicative Functions:")}</strong> ${L("7 situaciones reales (pedir direcciones, ordenar comida, dar datos)", "7 real-life situations (directions, ordering food, personal info)")}</li>
              <li><strong>${L("Pronunciación:", "Pronunciation:")}</strong> ${L("Dominio de la -s final, -ing, Th y entonación de preguntas", "Mastery of final -s, -ing, Th sound, and question intonation")}</li>
            </ul>
          </div>
        </header>
      </section>
    `;
  }

  function renderFilterTabs() {
    const tabs = [
      { id: "all", label: { es: "🧭 Ver Todo", en: "🧭 View All" } },
      { id: "grammar", label: { es: "✍️ Parte 1: Gramática (1-15)", en: "✍️ Part 1: Grammar (1-15)" } },
      { id: "vocab", label: { es: "🗣️ Parte 2: Vocabulario (16-25)", en: "🗣️ Part 2: Vocabulary (16-25)" } },
      { id: "functions", label: { es: "💬 Parte 3: Funciones (26-32)", en: "💬 Part 3: Functions (26-32)" } },
      { id: "pronunciation", label: { es: "🔊 Parte 4: Pronunciación (33)", en: "🔊 Part 4: Pronunciation (33)" } },
      { id: "routine", label: { es: "📅 Rutina Semanal", en: "📅 Study Routine" } },
      { id: "quiz", label: { es: "🎯 Práctica Interactiva", en: "🎯 Practice Quiz" } },
    ];

    return `
      <nav class="level-bar-wrapper" style="margin-bottom: 2rem;" aria-label="${L("Filtro de secciones A1", "A1 section filter")}">
        <span class="level-bar-label">${L("Secciones de la Lección A1:", "A1 Lesson Sections:")}</span>
        <div class="level-tabs" role="tablist">
          ${tabs
            .map(
              (tab) => `
            <button
              type="button"
              class="level-tab-btn ${activeTab === tab.id ? "active" : ""}"
              role="tab"
              data-a1-tab="${tab.id}"
              aria-selected="${activeTab === tab.id ? "true" : "false"}"
            >
              ${t(tab.label)}
            </button>
          `
            )
            .join("")}
        </div>
      </nav>
    `;
  }

  /* ==========================================================================
     PARTE 1: GRAMÁTICA (1 - 15)
     ========================================================================== */

  function renderPart1Grammar() {
    return `
      <section id="a1-grammar" class="lesson-section" style="margin-bottom: 3rem;">
        <div class="card lesson-card">
          <header class="lesson-card-header">
            <span class="card-eyebrow">${L("PARTE 1 DE 4 • GRAMÁTICA BÁSICA A1", "PART 1 OF 4 • BASIC A1 GRAMMAR")}</span>
            <h2 class="theory-title">15 Estructuras Gramaticales de Supervivencia</h2>
            <p class="theory-explanation">
              ${L(
                "Aprende para qué sirve cada estructura, su fórmula simple y ejemplos prácticos hablados en voz alta.",
                "Learn what each structure is for, its simple formula, and practical examples spoken out loud."
              )}
            </p>
          </header>

          <!-- 1. Pronombres y Verbo To Be -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">1</span>${L("Pronombres y Verbo To Be", "Pronouns and Verb To Be")}</h3>
            <p><strong>${L("Para qué sirve:", "What it is for:")}</strong> ${L("Identidad, edad, origen, profesión, estado y ubicación.", "Identity, age, origin, profession, state, and location.")}</p>
            <div class="example-box">
              <span class="example-box-label">${L("ESTRUCTURA", "STRUCTURE")}</span>
              <p><code>Sujeto + am / is / are + complemento</code></p>
            </div>
            <ul class="tip-list" style="margin-top: 0.75rem;">
              <li><strong>${L("Afirmativo:", "Affirmative:")}</strong> ${speakBtn("I am Roberto", "I am Roberto.")} • ${speakBtn("I am 26", "I am 26.")} • ${speakBtn("She is from Guatemala", "She is from Guatemala.")} • ${speakBtn("They are students", "They are students.")} • ${speakBtn("We are tired", "We are tired.")}</li>
              <li><strong>${L("Negativo:", "Negative:")}</strong> ${speakBtn("I am not tired", "I am not tired.")} • ${speakBtn("She is not from Mexico", "She is not / isn't from Mexico.")}</li>
              <li><strong>${L("Pregunta:", "Question:")}</strong> ${speakBtn("Are you ready?", "Are you ready?")} • ${speakBtn("Is he your brother?", "Is he your brother?")} • ${speakBtn("Where are you from?", "Where are you from?")}</li>
            </ul>
          </div>

          <!-- 2. Present Simple -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">2</span>${L("Present Simple: Rutinas, Hábitos y Hechos", "Present Simple: Routines, Habits, and Facts")}</h3>
            <p><strong>${L("Para qué sirve:", "What it is for:")}</strong> ${L("Lo que haces todos los días y lo que es siempre verdad.", "What you do every day and what is always true.")}</p>
            <div class="example-box">
              <span class="example-box-label">${L("REGLA DE TERCERA PERSONA (HE, SHE, IT)", "THIRD PERSON RULE (HE, SHE, IT)")}</span>
              <p>${L("En <em>he, she, it</em> el verbo lleva <strong>-s</strong> o <strong>-es</strong>: <em>He watches TV. She studies English.</em>", "In <em>he, she, it</em> the verb takes <strong>-s</strong> or <strong>-es</strong>: <em>He watches TV. She studies English.</em>")}</p>
            </div>
            <ul class="tip-list" style="margin-top: 0.75rem;">
              <li><strong>${L("Afirmativo:", "Affirmative:")}</strong> ${speakBtn("I work", "I work.")} • ${speakBtn("She works", "She works.")} • ${speakBtn("He watches TV", "He watches TV.")} • ${speakBtn("She studies English", "She studies English.")}</li>
              <li><strong>${L("Negativo (don't / doesn't):", "Negative (don't / doesn't):")}</strong> ${speakBtn("I don't work on Sundays", "I don't work on Sundays.")} • ${speakBtn("He doesn't like coffee", "He doesn't like coffee.")}</li>
              <li><strong>${L("Pregunta (Do / Does):", "Question (Do / Does):")}</strong> ${speakBtn("Do you like music?", "Do you like music?")} • ${speakBtn("Does she speak English?", "Does she speak English?")}</li>
              <li><strong>${L("Palabras clave:", "Key words:")}</strong> <em>every day, on Mondays, in the morning</em></li>
            </ul>
          </div>

          <!-- 3. Adverbios de Frecuencia -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">3</span>${L("Adverbios de Frecuencia", "Adverbs of Frequency")}</h3>
            <p><strong>${L("Para qué sirve:", "What it is for:")}</strong> ${L("Decir qué tan seguido haces algo.", "Saying how often you do something.")}</p>
            <div class="example-box">
              <span class="example-box-label">${L("POSICIÓN EN LA FRASE", "POSITION IN THE SENTENCE")}</span>
              <p>${L("Van <strong>antes</strong> del verbo principal, pero <strong>después de to be</strong>: <em>I always wake up at 6. She is usually happy.</em>", "They go <strong>before</strong> the main verb, but <strong>after to be</strong>: <em>I always wake up at 6. She is usually happy.</em>")}</p>
            </div>
            <div class="table-wrap" style="margin: 0.75rem 0;">
              <table class="lesson-table">
                <thead><tr><th>${L("Adverbio", "Adverb")}</th><th>${L("Porcentaje", "Scale")}</th><th>${L("Ejemplo", "Example")}</th></tr></thead>
                <tbody>
                  <tr><td>always</td><td>100%</td><td>${speakBtn("I always wake up at 6", "I always wake up at 6.")}</td></tr>
                  <tr><td>usually</td><td>≈ 85%</td><td>${speakBtn("She is usually happy", "She is usually happy.")}</td></tr>
                  <tr><td>often</td><td>≈ 70%</td><td>${speakBtn("They often cook at home", "They often cook at home.")}</td></tr>
                  <tr><td>sometimes</td><td>≈ 50%</td><td>${speakBtn("I sometimes drink tea", "I sometimes drink tea.")}</td></tr>
                  <tr><td>rarely</td><td>≈ 15%</td><td>${speakBtn("He rarely eats meat", "He rarely eats meat.")}</td></tr>
                  <tr><td>never</td><td>0%</td><td>${speakBtn("We never watch news", "We never watch news.")} • ${speakBtn("He is never late", "He is never late.")}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 4. Present Continuous -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">4</span>${L("Present Continuous: Acciones Ahora Mismo", "Present Continuous: Actions Right Now")}</h3>
            <p><strong>${L("Para qué sirve:", "What it is for:")}</strong> ${L("Lo que está pasando en este momento exacto.", "What is happening at this very moment.")}</p>
            <div class="compare-grid" style="margin: 0.75rem 0;">
              <div class="compare-box">
                <span class="compare-label">Present Simple</span>
                <span style="font-weight: 600;">Rutina / Hábito</span>
                <p style="margin: 0.25rem 0 0;">${speakBtn("I work every day", "I work every day.")}</p>
              </div>
              <div class="compare-box compare-box-accent">
                <span class="compare-label">Present Continuous</span>
                <span style="font-weight: 600;">Ahora Mismo (-ing)</span>
                <p style="margin: 0.25rem 0 0;">${speakBtn("I am working now", "I am working now.")}</p>
              </div>
            </div>
            <ul class="tip-list">
              <li><strong>${L("Estructura:", "Structure:")}</strong> <code>To be (am/is/are) + verbo + -ing</code>: ${speakBtn("I am studying", "I am studying.")} • ${speakBtn("They are eating", "They are eating.")}</li>
              <li><strong>${L("Ortografía:", "Spelling:")}</strong> make → <em>making</em>, run → <em>running</em>, dance → <em>dancing</em></li>
              <li><strong>${L("Pregunta:", "Question:")}</strong> ${speakBtn("What are you doing?", "What are you doing?")} • ${speakBtn("Are you working now?", "Are you working now?")}</li>
            </ul>
          </div>

          <!-- 5. There is / There are -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">5</span>${L("There is / There are", "There is / There are")}</h3>
            <p><strong>${L("Para qué sirve:", "What it is for:")}</strong> ${L("Decir qué hay en un lugar (existencia).", "Saying what exists in a place.")}</p>
            <div class="table-wrap" style="margin: 0.75rem 0;">
              <table class="lesson-table">
                <thead><tr><th>${L("Tipo", "Type")}</th><th>${L("Singular (There is)", "Singular (There is)")}</th><th>${L("Plural (There are)", "Plural (There are)")}</th></tr></thead>
                <tbody>
                  <tr>
                    <td><strong>${L("Afirmativa", "Affirmative")}</strong></td>
                    <td>${speakBtn("There is a bed in my room", "There is a bed in my room.")}</td>
                    <td>${speakBtn("There are two chairs", "There are two chairs.")}</td>
                  </tr>
                  <tr>
                    <td><strong>${L("Negativa", "Negative")}</strong></td>
                    <td>${speakBtn("There isn't a supermarket", "There isn't a supermarket.")}</td>
                    <td>${speakBtn("There aren't any apples", "There aren't any apples.")}</td>
                  </tr>
                  <tr>
                    <td><strong>${L("Pregunta", "Question")}</strong></td>
                    <td>${speakBtn("Is there a bathroom?", "Is there a bathroom?")}</td>
                    <td>${speakBtn("Are there any chairs?", "Are there any chairs?")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 6. Cuantificadores y Contables / Incontables -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">6</span>${L("Cuantificadores y Contables / Incontables", "Quantifiers and Countable / Uncountable Nouns")}</h3>
            <p>
              <strong>${L("Contables (se cuentan uno por uno):", "Countable (can count one by one):")}</strong> apple, chair, book, egg.<br/>
              <strong>${L("Incontables (masa o líquido, no se cuentan):", "Uncountable (cannot count one by one):")}</strong> water, rice, milk, bread, money.
            </p>
            <div class="table-wrap" style="margin: 0.75rem 0;">
              <table class="lesson-table">
                <thead><tr><th>${L("Situación", "Situation")}</th><th>${L("Contable", "Countable")}</th><th>${L("Incontable", "Uncountable")}</th></tr></thead>
                <tbody>
                  <tr>
                    <td><strong>${L("Afirmativa (some)", "Affirmative (some)")}</strong></td>
                    <td>${speakBtn("I have some apples", "I have some apples.")}</td>
                    <td>${speakBtn("I have some water", "I have some water.")}</td>
                  </tr>
                  <tr>
                    <td><strong>${L("Negativa / Pregunta (any)", "Negative / Question (any)")}</strong></td>
                    <td>${speakBtn("I don't have any apples", "I don't have any apples.")}</td>
                    <td>${speakBtn("Do you have any water?", "Do you have any water?")}</td>
                  </tr>
                  <tr>
                    <td><strong>${L("Mucha cantidad (a lot of)", "Large quantity (a lot of)")}</strong></td>
                    <td>${speakBtn("I have a lot of books", "I have a lot of books.")}</td>
                    <td>${speakBtn("I have a lot of homework", "I have a lot of homework.")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 7. Verbo Modal Can / Can't -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">7</span>${L("Verbo Modal Can / Can't", "Modal Verb Can / Can't")}</h3>
            <p><strong>${L("Para qué sirve:", "What it is for:")}</strong> ${L("Habilidad, permiso y petición.", "Ability, permission, and requests.")}</p>
            <div class="example-box">
              <span class="example-box-label">${L("REGLA CLAVE", "KEY RULE")}</span>
              <p>${L("No cambia con <em>he, she, it</em>. <strong>Nunca</strong> lleva <em>-s</em> ni <em>to</em>: <code>He can swim</code> (no <s>He cans</s> ni <s>He can to swim</s>).", "Does not change with <em>he, she, it</em>. <strong>Never</strong> takes <em>-s</em> or <em>to</em>: <code>He can swim</code>.")}</p>
            </div>
            <ul class="tip-list" style="margin-top: 0.75rem;">
              <li><strong>${L("Habilidad:", "Ability:")}</strong> ${speakBtn("I can cook", "I can cook.")} • ${speakBtn("I can't drive", "I can't drive.")} • ${speakBtn("She can speak English", "She can speak English.")}</li>
              <li><strong>${L("Permiso y petición:", "Permission and request:")}</strong> ${speakBtn("Can I go to the bathroom?", "Can I go to the bathroom?")} • ${speakBtn("Can you help me, please?", "Can you help me, please?")}</li>
              <li><strong>${L("Pregunta:", "Question:")}</strong> ${speakBtn("Can you speak Spanish?", "Can you speak Spanish?")}</li>
            </ul>
          </div>

          <!-- 8. Preposiciones de Tiempo: In, On, At -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">8</span>${L("Preposiciones de Tiempo: In, On, At", "Prepositions of Time: In, On, At")}</h3>
            <p><strong>${L("Para qué sirve:", "What it is for:")}</strong> ${L("Decir cuándo pasa algo con exactitud.", "Saying exactly when something happens.")}</p>
            <div class="table-wrap" style="margin: 0.75rem 0;">
              <table class="lesson-table">
                <thead><tr><th>${L("Preposición", "Preposition")}</th><th>${L("Se usa para", "Used for")}</th><th>${L("Ejemplos", "Examples")}</th></tr></thead>
                <tbody>
                  <tr><td><strong class="badge badge-warm">At</strong></td><td>${L("Horas y momentos exactos", "Exact hours and moments")}</td><td>${speakBtn("at 7:00", "at 7:00")} • ${speakBtn("at night", "at night")} • ${speakBtn("at noon", "at noon")}</td></tr>
                  <tr><td><strong class="badge badge-teal">On</strong></td><td>${L("Días y fechas con número", "Days and specific dates")}</td><td>${speakBtn("on Monday", "on Monday")} • ${speakBtn("on Sundays", "on Sundays")} • ${speakBtn("on May 5th", "on May 5th")}</td></tr>
                  <tr><td><strong class="badge badge-neutral">In</strong></td><td>${L("Meses, años, partes del día", "Months, years, parts of day")}</td><td>${speakBtn("in October", "in October")} • ${speakBtn("in 2026", "in 2026")} • ${speakBtn("in the morning", "in the morning")}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 9. Preposiciones de Lugar -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">9</span>${L("Preposiciones de Lugar", "Prepositions of Place")}</h3>
            <p><strong>${L("Para qué sirve:", "What it is for:")}</strong> ${L("Decir dónde está algo o alguien.", "Saying where something or someone is.")}</p>
            <div class="example-box">
              <span class="example-box-label">${L("PREPOSICIONES BÁSICAS", "BASIC PREPOSITIONS")}</span>
              <p><code>in</code> (dentro), <code>on</code> (sobre), <code>under</code> (debajo), <code>next to</code> (al lado de), <code>between</code> (entre dos), <code>behind</code> (detrás), <code>in front of</code> (delante de), <code>opposite</code> (enfrente de).</p>
            </div>
            <ul class="tip-list" style="margin-top: 0.75rem;">
              <li>${speakBtn("The keys are on the table", "The keys are on the table.")}</li>
              <li>${speakBtn("The cat is under the bed", "The cat is under the bed.")}</li>
              <li>${speakBtn("My house is next to a park", "My house is next to a park.")}</li>
              <li>${speakBtn("The bank is between the school and the pharmacy", "The bank is between the school and the pharmacy.")}</li>
            </ul>
          </div>

          <!-- 10. Artículos y Plurales -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">10</span>${L("Artículos y Plurales", "Articles and Plurals")}</h3>
            <ul class="tip-list">
              <li><strong>A / An (general, singular):</strong> <em>a book</em>, <em>a teacher</em>. <strong>An</strong> va antes de sonido vocal: ${speakBtn("an apple", "an apple")} • ${speakBtn("an egg", "an egg")} • ${speakBtn("an hour", "an hour")}</li>
              <li><strong>The (específico):</strong> ${speakBtn("The book on the table is mine", "The book on the table is mine.")}</li>
              <li><strong>${L("Plural regular:", "Regular plural:")}</strong> book → books, watch → watches, baby → babies</li>
              <li><strong>${L("Plural irregular básico (¡memorízalos!):", "Basic irregular plural (memorize these!):")}</strong><br/>
                ${speakBtn("man, men", "man → men")} • ${speakBtn("woman, women", "woman → women")} • ${speakBtn("child, children", "child → children")} • ${speakBtn("person, people", "person → people")} • ${speakBtn("foot, feet", "foot → feet")}
              </li>
            </ul>
          </div>

          <!-- 11. Posesivos -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">11</span>${L("Posesivos", "Possessives")}</h3>
            <p><strong>${L("Adjetivos posesivos:", "Possessive adjectives:")}</strong> <code>my, your, his, her, its, our, their</code>. Van antes del sustantivo: ${speakBtn("my phone", "my phone")} • ${speakBtn("her sister", "her sister")} • ${speakBtn("their house", "their house")}</p>
            <p><strong>${L("Genitivo sajón ('s):", "Possessive 's:")}</strong> ${speakBtn("Roberto's car", "Roberto's car.")} • ${speakBtn("My mother's name is Ana", "My mother's name is Ana.")}</p>
            <p><strong>${L("Pregunta clave:", "Key question:")}</strong> ${speakBtn("Whose is this?", "Whose is this?")} → ${speakBtn("It's mine", "It's mine.")} / ${speakBtn("It's yours", "It's yours.")}</p>
          </div>

          <!-- 12. Demostrativos -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">12</span>${L("Demostrativos", "Demonstratives")}</h3>
            <p><strong>${L("Para qué sirve:", "What it is for:")}</strong> ${L("Señalar cosas cerca y lejos en el espacio.", "Pointing to things near and far in space.")}</p>
            <div class="compare-grid" style="margin: 0.75rem 0;">
              <div class="compare-box">
                <span class="compare-label">${L("Cerca", "Near")}</span>
                <p>${speakBtn("This is my phone", "This is my phone.")} (singular)<br/>${speakBtn("These are my keys", "These are my keys.")} (plural)</p>
              </div>
              <div class="compare-box">
                <span class="compare-label">${L("Lejos", "Far")}</span>
                <p>${speakBtn("That is my house", "That is my house.")} (singular)<br/>${speakBtn("Those are my friends", "Those are my friends.")} (plural)</p>
              </div>
            </div>
            <p><strong>${L("Preguntas frecuentes:", "Common questions:")}</strong> ${speakBtn("What is this?", "What is this?")} • ${speakBtn("Who is that?", "Who is that?")}</p>
          </div>

          <!-- 13. Adjetivos: Descripción y Orden -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">13</span>${L("Adjetivos: Descripción y Orden", "Adjectives: Description and Order")}</h3>
            <div class="example-box">
              <span class="example-box-label">${L("REGLA DE ORO", "GOLDEN RULE")}</span>
              <p>${L("El adjetivo va <strong>antes</strong> del sustantivo y <strong>nunca lleva -s</strong>: <code>a big house</code>, <code>two small dogs</code> (no <s>smalls dogs</s>), <code>a happy family</code>.", "The adjective goes <strong>before</strong> the noun and <strong>never takes -s</strong>: <code>a big house</code>, <code>two small dogs</code>, <code>a happy family</code>.")}</p>
            </div>
            <p style="margin-top: 0.75rem;"><strong>${L("Opuestos básicos:", "Basic opposites:")}</strong></p>
            <ul class="tip-list">
              <li>${speakBtn("big, small", "big / small")} • ${speakBtn("hot, cold", "hot / cold")} • ${speakBtn("happy, sad", "happy / sad")}</li>
              <li>${speakBtn("easy, difficult", "easy / difficult")} • ${speakBtn("cheap, expensive", "cheap / expensive")} • ${speakBtn("fast, slow", "fast / slow")}</li>
            </ul>
            <p><strong>${L("Comparativo básico A1:", "Basic A1 comparative:")}</strong> <em>bigger, smaller, taller, more expensive</em>. Ejemplo: ${speakBtn("My house is bigger than yours", "My house is bigger than yours.")}</p>
          </div>

          <!-- 14. Imperativos y Let's -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">14</span>${L("Imperativos y Let's", "Imperatives and Let's")}</h3>
            <p><strong>${L("Para qué sirve:", "What it is for:")}</strong> ${L("Dar instrucciones, órdenes suaves y hacer sugerencias amistosas.", "Giving instructions, soft orders, and friendly suggestions.")}</p>
            <ul class="tip-list">
              <li><strong>${L("Imperativo (verbo en forma base):", "Imperative (base verb):")}</strong> ${speakBtn("Sit down, please", "Sit down, please.")} • ${speakBtn("Open your book", "Open your book.")} • ${speakBtn("Don't run", "Don't run.")}</li>
              <li><strong>${L("Sugerencia con Let's:", "Suggestion with Let's:")}</strong> ${speakBtn("Let's study", "Let's study.")} • ${speakBtn("Let's go to the park", "Let's go to the park.")} • ${speakBtn("Let's eat pizza", "Let's eat pizza.")}</li>
            </ul>
          </div>

          <!-- 15. Gustos, Deseos y Futuro Básico -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">15</span>${L("Gustos, Deseos y Futuro Básico", "Likes, Wants, and Basic Future")}</h3>
            <ul class="tip-list">
              <li><strong>Like / Love / Hate + verbo en -ing:</strong> ${speakBtn("I like listening to music", "I like listening to music.")} • ${speakBtn("She loves dancing", "She loves dancing.")} • ${speakBtn("They hate waking up early", "They hate waking up early.")}</li>
              <li><strong>Want / Need / Would like:</strong> ${speakBtn("I want a coffee", "I want a coffee.")} • ${speakBtn("I need help", "I need help.")} • ${speakBtn("I would like a sandwich, please", "I would like a sandwich, please.")}</li>
              <li><strong>Futuro con Going to (planes):</strong> ${speakBtn("I am going to study tomorrow", "I am going to study tomorrow.")} • ${speakBtn("We are going to visit my family on Sunday", "We are going to visit my family on Sunday.")}</li>
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  /* ==========================================================================
     PARTE 2: VOCABULARIO (16 - 25)
     ========================================================================== */

  function renderPart2Vocab() {
    return `
      <section id="a1-vocab" class="lesson-section" style="margin-bottom: 3rem;">
        <div class="card lesson-card">
          <header class="lesson-card-header">
            <span class="card-eyebrow">${L("PARTE 2 DE 4 • VOCABULARIO A1", "PART 2 OF 4 • A1 VOCABULARY")}</span>
            <h2 class="theory-title">10 Bloques de Vocabulario Práctico</h2>
            <p class="theory-explanation">
              ${L(
                "Cada bloque es vocabulario que tienes que reconocer y usar en contexto real, no solo traducir.",
                "Each block contains vocabulary you need to recognize and use in real context, not just translate."
              )}
            </p>
          </header>

          <!-- 16. Números, Alfabeto y Hora -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">16</span>${L("Números, Alfabeto y Hora", "Numbers, Alphabet, and Time")}</h3>
            <p><strong>${L("Números:", "Numbers:")}</strong> 0 to 100 • <em>first, second, third, tenth</em></p>
            <p><strong>${L("Alfabeto y deletreo:", "Alphabet and spelling:")}</strong> ${speakBtn("How do you spell your name? R-O-B-E-R-T-O", "How do you spell your name? R-O-B-E-R-T-O.")}</p>
            <p><strong>${L("La hora:", "Telling time:")}</strong> ${speakBtn("It's 7 o'clock", "It's 7 o'clock.")} • ${speakBtn("It's half past six", "It's half past six (6:30).")} • ${speakBtn("It's quarter to eight", "It's quarter to eight (7:45).")}</p>
          </div>

          <!-- 17. Días, Meses y Estaciones -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">17</span>${L("Días, Meses y Estaciones", "Days, Months, and Seasons")}</h3>
            <p><strong>${L("Días:", "Days:")}</strong> Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.</p>
            <p><strong>${L("Meses:", "Months:")}</strong> January, February, March, April, May, June, July, August, September, October, November, December.</p>
            <p><strong>${L("Estaciones y clima:", "Seasons and weather:")}</strong> spring, summer, autumn / fall, winter.<br/>
              ${speakBtn("It's sunny", "It's sunny")} • ${speakBtn("It's cloudy", "It's cloudy")} • ${speakBtn("It's rainy", "It's rainy")} • ${speakBtn("It's windy", "It's windy")} • ${speakBtn("It's hot", "It's hot")} • ${speakBtn("It's cold", "It's cold")}
            </p>
          </div>

          <!-- 18. Familia y Personas -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">18</span>${L("Familia y Personas", "Family and People")}</h3>
            <p><strong>${L("Familia:", "Family:")}</strong> mother, father, parents, brother, sister, son, daughter, husband, wife, baby, grandparents, cousin, uncle, aunt.</p>
            <p><strong>${L("Apariencia:", "Appearance:")}</strong> tall, short, young, old, long hair, short hair, brown eyes, glasses.</p>
            <p><strong>${L("Personalidad:", "Personality:")}</strong> friendly, funny, shy, kind, hardworking, happy, serious.</p>
          </div>

          <!-- 19. La Casa -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">19</span>${L("La Casa", "The House")}</h3>
            <p><strong>${L("Habitaciones:", "Rooms:")}</strong> bedroom, bathroom, kitchen, living room, garden, garage.</p>
            <p><strong>${L("Muebles y objetos:", "Furniture and objects:")}</strong> bed, table, chair, sofa, fridge, stove, shower, mirror, lamp, door, window.</p>
            <div class="example-box">
              <span class="example-box-label">${L("FRASE ÚTIL", "USEFUL SENTENCE")}</span>
              <p>${speakBtn("There is a big sofa in my living room", "There is a big sofa in my living room.")}</p>
            </div>
          </div>

          <!-- 20. Comida y Bebida -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">20</span>${L("Comida y Bebida", "Food and Drink")}</h3>
            <p><strong>${L("Comida:", "Food:")}</strong> bread, rice, beans, chicken, beef, fish, egg, cheese, salad, fruit, pizza, soup.</p>
            <p><strong>${L("Bebida:", "Drink:")}</strong> water, coffee, tea, milk, juice, soda.</p>
            <div class="example-box">
              <span class="example-box-label">${L("EN EL RESTAURANTE", "AT THE RESTAURANT")}</span>
              <p>${speakBtn("I would like a coffee, please", "I would like...")} • ${speakBtn("The menu, please", "The menu, please.")} • ${speakBtn("How much is it?", "How much is it?")}</p>
            </div>
          </div>

          <!-- 21. Ropa y Colores -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">21</span>${L("Ropa y Colores", "Clothes and Colors")}</h3>
            <p><strong>${L("Ropa:", "Clothes:")}</strong> shirt, t-shirt, pants, jeans, dress, skirt, jacket, shoes, hat, glasses.</p>
            <p><strong>${L("Colores:", "Colors:")}</strong> red, blue, green, yellow, black, white, pink, orange, purple, brown, gray.</p>
            <div class="example-box">
              <span class="example-box-label">${L("FRASE ÚTIL", "USEFUL SENTENCE")}</span>
              <p>${speakBtn("I am wearing a blue shirt and black jeans", "I am wearing a blue shirt and black jeans.")}</p>
            </div>
          </div>

          <!-- 22. Trabajo y Lugares de la Ciudad -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">22</span>${L("Trabajo y Lugares de la Ciudad", "Jobs and Places in the City")}</h3>
            <p><strong>${L("Trabajos:", "Jobs:")}</strong> teacher, doctor, nurse, driver, cook, waiter, student, engineer, police officer, secretary.</p>
            <p><strong>${L("Lugares:", "Places:")}</strong> school, hospital, bank, supermarket, pharmacy, park, restaurant, cinema, bus stop, market, church.</p>
            <div class="example-box">
              <span class="example-box-label">${L("FRASES ÚTILES", "USEFUL SENTENCES")}</span>
              <p>${speakBtn("She works in a hospital", "She works in a hospital.")} • ${speakBtn("He is a teacher", "He is a teacher.")}</p>
            </div>
          </div>

          <!-- 23. Transporte y Direcciones -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">23</span>${L("Transporte y Direcciones", "Transport and Directions")}</h3>
            <p><strong>${L("Transporte:", "Transport:")}</strong> car, bus, taxi, bike, motorcycle, train, plane, on foot.</p>
            <p><strong>${L("Direcciones:", "Directions:")}</strong> go straight, turn left, turn right, stop, cross the street, next to, far from, near.</p>
            <div class="example-box">
              <span class="example-box-label">${L("FRASE ÚTIL", "USEFUL SENTENCE")}</span>
              <p>${speakBtn("Where is the bus stop? Go straight and turn left", "Where is the bus stop? Go straight and turn left.")}</p>
            </div>
          </div>

          <!-- 24. Rutina Diaria y Tiempo Libre -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">24</span>${L("Rutina Diaria y Tiempo Libre", "Daily Routine and Free Time")}</h3>
            <p><strong>${L("Verbos de rutina:", "Routine verbs:")}</strong> wake up, get up, take a shower, get dressed, have breakfast, go to work, come home, have dinner, go to bed, sleep.</p>
            <p><strong>${L("Hobbies:", "Hobbies:")}</strong> read, listen to music, watch TV, play soccer, swim, run, dance, cook, draw, play video games, walk my dog.</p>
          </div>

          <!-- 25. Cuerpo y Salud Básica -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">25</span>${L("Cuerpo y Salud Básica", "Body and Basic Health")}</h3>
            <p><strong>${L("Cuerpo:", "Body:")}</strong> head, eyes, nose, mouth, ears, hands, arms, legs, feet, hair, face.</p>
            <div class="example-box">
              <span class="example-box-label">${L("SALUD BÁSICA (SÍNTOMAS)", "BASIC HEALTH (SYMPTOMS)")}</span>
              <p>
                ${speakBtn("I have a headache", "I have a headache.")} • 
                ${speakBtn("I have a fever", "I have a fever.")} • 
                ${speakBtn("I feel sick", "I feel sick.")} • 
                ${speakBtn("I need a doctor", "I need a doctor.")} • 
                ${speakBtn("I am tired", "I am tired.")}
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /* ==========================================================================
     PARTE 3: FUNCIONES COMUNICATIVAS (26 - 32)
     ========================================================================== */

  function renderPart3Functions() {
    return `
      <section id="a1-functions" class="lesson-section" style="margin-bottom: 3rem;">
        <div class="card lesson-card">
          <header class="lesson-card-header">
            <span class="card-eyebrow">${L("PARTE 3 DE 4 • FUNCIONES COMUNICATIVAS", "PART 3 OF 4 • COMMUNICATIVE FUNCTIONS")}</span>
            <h2 class="theory-title">7 Situaciones Reales de Comunicación</h2>
            <p class="theory-explanation">
              ${L(
                "Esto es lo que tienes que poder <strong>HACER</strong> en el mundo real, no solo memorizar reglas.",
                "This is what you need to be able to <strong>DO</strong> in the real world, not just memorize rules."
              )}
            </p>
          </header>

          <!-- 26. Saludos y Presentaciones -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">26</span>${L("Saludos y Presentaciones", "Greetings and Introductions")}</h3>
            <p>${speakBtn("Hello! Good morning. My name is Roberto. Nice to meet you. How are you? I'm fine, thanks. See you later. Bye!", "Hello! Good morning. My name is... Nice to meet you. How are you? I'm fine, thanks. See you later. Bye!")}</p>
          </div>

          <!-- 27. Dar Información Personal -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">27</span>${L("Dar Información Personal", "Giving Personal Information")}</h3>
            <ul class="tip-list">
              <li>${speakBtn("What's your name? My name is Roberto", "What's your name? My name is...")}</li>
              <li>${speakBtn("Where are you from? I am from Guatemala", "Where are you from? I am from...")}</li>
              <li>${speakBtn("How old are you? I am 26", "How old are you? I am 26.")}</li>
              <li>${speakBtn("Where do you live? I live in Mixco", "Where do you live? I live in...")}</li>
              <li>${speakBtn("What's your phone number and email?", "What's your phone number? What's your address? My email is...")}</li>
            </ul>
          </div>

          <!-- 28. Describir Personas y Lugares -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">28</span>${L("Describir Personas y Lugares", "Describing People and Places")}</h3>
            <p>${speakBtn("She is tall and friendly", "She is tall and friendly.")} • ${speakBtn("My city is small and quiet", "My city is small and quiet.")} • ${speakBtn("My house is big. There are three bedrooms", "My house is big. There are three bedrooms.")}</p>
          </div>

          <!-- 29. Pedir Direcciones -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">29</span>${L("Pedir Direcciones", "Asking for Directions")}</h3>
            <p>
              ${speakBtn("Excuse me, where is the supermarket?", "Excuse me, where is the supermarket?")}<br/>
              ${speakBtn("Is it far from here?", "Is it far from here?")}<br/>
              ${speakBtn("How do I get to the park?", "How do I get to the park?")}
            </p>
          </div>

          <!-- 30. Ordenar Comida y Comprar -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">30</span>${L("Ordenar Comida y Comprar", "Ordering Food and Shopping")}</h3>
            <ul class="tip-list">
              <li>${speakBtn("I would like a coffee, please", "I would like a coffee, please.")}</li>
              <li>${speakBtn("Can I have the menu?", "Can I have the menu?")}</li>
              <li>${speakBtn("How much is this shirt?", "How much is this shirt?")}</li>
              <li>${speakBtn("Do you have a bigger size?", "Do you have a bigger size?")}</li>
              <li>${speakBtn("I want to pay in cash. I want to pay by card", "I want to pay in cash / by card.")}</li>
            </ul>
          </div>

          <!-- 31. Hacer Invitaciones y Planes -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">31</span>${L("Hacer Invitaciones y Planes", "Making Invitations and Plans")}</h3>
            <p>
              ${speakBtn("Do you want to go to the park?", "Do you want to go to the park?")}<br/>
              ${speakBtn("Let's watch a movie", "Let's watch a movie.")}<br/>
              ${speakBtn("Are you free on Saturday? What time?", "Are you free on Saturday? What time?")}
            </p>
          </div>

          <!-- 32. Pedir Ayuda y Disculparse -->
          <div class="lesson-step">
            <h3 class="lesson-step-title"><span class="lesson-step-num">32</span>${L("Pedir Ayuda y Disculparse", "Asking for Help and Apologizing")}</h3>
            <p>
              ${speakBtn("Can you help me, please?", "Can you help me, please?")}<br/>
              ${speakBtn("I don't understand. Can you repeat, please?", "I don't understand. Can you repeat, please?")}<br/>
              ${speakBtn("Sorry, I don't speak English very well. Thank you so much!", "Sorry, I don't speak English very well. Thank you so much.")}
            </p>
          </div>
        </div>
      </section>
    `;
  }

  /* ==========================================================================
     PARTE 4: PRONUNCIACIÓN BÁSICA A1 (33)
     ========================================================================== */

  function renderPart4Pronunciation() {
    return `
      <section id="a1-pronunciation" class="lesson-section" style="margin-bottom: 3rem;">
        <div class="card lesson-card">
          <header class="lesson-card-header">
            <span class="card-eyebrow">${L("PARTE 4 DE 4 • FONÉTICA Y FLUIDEZ", "PART 4 OF 4 • PHONETICS & FLUENCY")}</span>
            <h2 class="theory-title">33. Sonidos que Confunden en A1</h2>
            <p class="theory-explanation">
              ${L(
                "Entrena estos 4 detalles acústicos para que los hablantes nativos te entiendan sin esfuerzo.",
                "Train these 4 acoustic details so native speakers understand you effortlessly."
              )}
            </p>
          </header>

          <div class="technique-grid">
            <article class="technique-card">
              <span class="technique-icon" aria-hidden="true">🎯</span>
              <h4>${L("La -s Final", "Final -s Sound")}</h4>
              <p>${L("<em>He works</em> se pronuncia con /s/. Pero <em>He watches</em> se pronuncia con /ɪz/.", "<em>He works</em> is pronounced with /s/. But <em>He watches</em> is with /ɪz/.")}</p>
              ${speakBtn("works, watches", "works / watches")}
            </article>

            <article class="technique-card">
              <span class="technique-icon" aria-hidden="true">🔁</span>
              <h4>${L("La Terminación -ing", "The -ing Ending")}</h4>
              <p>${L("Siempre suena <strong>-ing</strong> nasal, nunca como «in»: going, eating, studying.", "Always sounds nasal <strong>-ing</strong>, never just 'in': going, eating, studying.")}</p>
              ${speakBtn("going, eating, studying", "going / eating / studying")}
            </article>

            <article class="technique-card">
              <span class="technique-icon" aria-hidden="true">👅</span>
              <h4>${L("El Sonido Th", "The Th Sound")}</h4>
              <p>${L("Lengua entre los dientes, sin sustituir por t ni d fuerte: <em>this, that, think, three</em>.", "Tongue between teeth, no strong t or d sound: <em>this, that, think, three</em>.")}</p>
              ${speakBtn("this, that, think, three", "this / that / think / three")}
            </article>

            <article class="technique-card">
              <span class="technique-icon" aria-hidden="true">📈</span>
              <h4>${L("Entonación de Preguntas", "Question Intonation")}</h4>
              <p>${L("Las preguntas de Sí/No <strong>suben</strong> al final: <em>Are you ready? ↗</em>. Las preguntas con Wh- <strong>bajan</strong>: <em>Where are you from? ↘</em>", "Yes/No questions <strong>go up</strong> at the end: <em>Are you ready? ↗</em>. Wh- questions <strong>fall</strong>: <em>Where are you from? ↘</em>")}</p>
              ${speakBtn("Are you ready? Where are you from?", "Are you ready? / Where are you from?")}
            </article>
          </div>
        </div>
      </section>
    `;
  }

  /* ==========================================================================
     RUTINA DE ESTUDIO SUGERIDA
     ========================================================================== */

  function renderStudyRoutine() {
    return `
      <section id="a1-routine" class="lesson-section" style="margin-bottom: 3rem;">
        <div class="card lesson-card">
          <header class="lesson-card-header">
            <span class="card-eyebrow">${L("HÁBITOS DE ESTUDIO", "STUDY HABITS")}</span>
            <h2 class="theory-title">${L("Rutina Semanal Sugerida para A1", "Suggested Weekly Study Routine for A1")}</h2>
            <p class="theory-explanation">
              ${L(
                "Sigue este plan diario de 15 a 20 minutos para fijar las estructuras sin agotarte.",
                "Follow this daily 15 to 20 minute plan to anchor the structures without burnout."
              )}
            </p>
          </header>

          <div class="table-wrap">
            <table class="lesson-table">
              <thead><tr><th>${L("Día", "Day")}</th><th>${L("Plan de Práctica", "Practice Plan")}</th></tr></thead>
              <tbody>
                ${ROUTINE_DATA.map(
                  (r) => `
                  <tr>
                    <td><strong class="badge badge-warm">${t(r.day)}</strong></td>
                    <td>${t(r.task)}</td>
                  </tr>
                `
                ).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  /* ==========================================================================
     PRACTICE QUIZ SECTION
     ========================================================================== */

  const LETTER_LABELS = ["A", "B", "C", "D"];

  function renderQuiz() {
    const items = QUIZ_QUESTIONS.map((q, i) => {
      const state = answers[i];
      let optionsHtml = `<div class="options-list" role="group" aria-label="${L("Opciones de respuesta", "Answer options")}">`;
      optionsHtml += q.options
        .map((opt, j) => {
          let cls = "option-btn";
          if (state && state.value === j) {
            cls += state.correct ? " selected-correct" : " selected-wrong";
          }
          return `<button type="button" class="${cls}" data-a1-q="${i}" data-a1-opt="${j}">
            <span class="option-letter" aria-hidden="true">${LETTER_LABELS[j]}</span><span>${t(opt)}</span>
          </button>`;
        })
        .join("");
      optionsHtml += `</div>`;

      let feedback = "";
      if (state) {
        feedback = state.correct
          ? `<div class="feedback-banner visible success" role="status">✓ ${t(q.feedback)}</div>`
          : `<div class="feedback-banner visible error" role="status">✕ ${L("Todavía no. Revisa la regla e inténtalo de nuevo.", "Not yet. Review the rule and try again.")}</div>`;
      }

      return `
        <li class="quiz-item">
          <p class="quiz-prompt"><span class="quiz-num">${i + 1}</span>${t(q.prompt)}</p>
          ${optionsHtml}
          ${feedback}
        </li>
      `;
    }).join("");

    const correctCount = Object.values(answers).filter((a) => a.correct).length;
    const best = loadScores().best || 0;

    return `
      <section id="a1-quiz" class="lesson-quiz">
        <div class="quiz-header">
          <div>
            <span class="card-eyebrow">${L("EVALUACIÓN INTERACTIVA", "INTERACTIVE EVALUATION")}</span>
            <h3 class="quiz-title">${L("Práctica de Supervivencia A1", "A1 Survival Practice")}</h3>
          </div>
          <div class="quiz-score" aria-live="polite">
            <span class="badge badge-teal">${L("Correctas", "Correct")}: ${correctCount} / ${QUIZ_QUESTIONS.length}</span>
            <span class="badge badge-neutral">${L("Mejor Puntaje", "Best Score")}: ${best} / ${QUIZ_QUESTIONS.length}</span>
          </div>
        </div>
        <ol class="quiz-list">${items}</ol>
        <button type="button" id="a1-quiz-reset-btn" class="btn btn-light" style="margin-top: 1rem;">
          ↺ ${L("Reiniciar evaluación", "Restart evaluation")}
        </button>
      </section>
    `;
  }

  /* ==========================================================================
     Main Render
     ========================================================================== */

  function render() {
    const scrollY = window.scrollY;

    let contentHtml = "";
    if (activeTab === "all") {
      contentHtml = `
        ${renderPart1Grammar()}
        ${renderPart2Vocab()}
        ${renderPart3Functions()}
        ${renderPart4Pronunciation()}
        ${renderStudyRoutine()}
        ${renderQuiz()}
      `;
    } else if (activeTab === "grammar") {
      contentHtml = renderPart1Grammar();
    } else if (activeTab === "vocab") {
      contentHtml = renderPart2Vocab();
    } else if (activeTab === "functions") {
      contentHtml = renderPart3Functions();
    } else if (activeTab === "pronunciation") {
      contentHtml = renderPart4Pronunciation();
    } else if (activeTab === "routine") {
      contentHtml = renderStudyRoutine();
    } else if (activeTab === "quiz") {
      contentHtml = renderQuiz();
    }

    root.innerHTML = `
      ${renderHeroBanner()}
      ${renderFilterTabs()}
      ${contentHtml}
      <div class="level-nav-footer" style="margin-top: 3rem; display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        <a href="lesson-a0.html" class="btn btn-light">${L("← Nivel Anterior (1. Terrícola)", "← Previous Level (1. Landlubber)")}</a>
        <a href="lessons.html" class="btn btn-dark">${L("Volver a Lecciones", "Back to Lessons")}</a>
      </div>
    `;

    window.scrollTo(0, scrollY);
  }

  /* ==========================================================================
     Event Handling
     ========================================================================== */

  root.addEventListener("click", (event) => {
    // Audio button click
    const speakBtnEl = event.target.closest("[data-speak]");
    if (speakBtnEl) {
      const text = speakBtnEl.getAttribute("data-speak");
      if (text) speak(text);
      return;
    }

    // Section filter tab click
    const tabBtn = event.target.closest("[data-a1-tab]");
    if (tabBtn) {
      activeTab = tabBtn.getAttribute("data-a1-tab");
      render();
      return;
    }

    // Quiz option answer click
    const optBtn = event.target.closest("[data-a1-opt]");
    if (optBtn) {
      const qIdx = Number(optBtn.getAttribute("data-a1-q"));
      const optIdx = Number(optBtn.getAttribute("data-a1-opt"));
      const q = QUIZ_QUESTIONS[qIdx];
      const isCorrect = q.correct === optIdx;

      answers[qIdx] = { value: optIdx, correct: isCorrect };
      const currentScore = Object.values(answers).filter((a) => a.correct).length;
      saveBestScore(currentScore);
      render();
      return;
    }

    // Quiz reset click
    const resetBtn = event.target.closest("#a1-quiz-reset-btn");
    if (resetBtn) {
      for (const k in answers) delete answers[k];
      render();
      return;
    }
  });

  // Observe language attribute changes on <html>
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "lang") {
        render();
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true });

  // Initial render
  render();
})();
