/**
 * LinguaVela — Lessons Module (Level 1: Landlubber / Pre-A1)
 * Block: Alphabet & Basic Phonetics
 *   Lesson 1 — Practical Spelling (names, last names, email addresses)
 *   Lesson 2 — Listening Discrimination: Short vs Long Vowels
 *
 * Pure vanilla JS. Renders into #lesson-root, bilingual (ES/EN).
 * Re-renders automatically when main.js switches <html lang>.
 * Audio uses the browser's built-in Web Speech API (US English voice).
 */

(() => {
  const root = document.getElementById("lesson-root");
  if (!root) return;

  const STORAGE_KEY = "linguavela-lesson-a0-scores";

  /* ==========================================================================
     Helpers: language, audio (speech synthesis), spelling
     ========================================================================== */

  const lang = () => (document.documentElement.lang === "en" ? "en" : "es");
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
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }

  // How each letter's NAME sounds in US English (used for audio + hints)
  const LETTERS = [
    { l: "A", say: "ay", ipa: "eɪ" }, { l: "B", say: "bee", ipa: "biː" },
    { l: "C", say: "see", ipa: "siː" }, { l: "D", say: "dee", ipa: "diː" },
    { l: "E", say: "ee", ipa: "iː" }, { l: "F", say: "ef", ipa: "ɛf" },
    { l: "G", say: "gee", ipa: "dʒiː" }, { l: "H", say: "aitch", ipa: "eɪtʃ" },
    { l: "I", say: "eye", ipa: "aɪ" }, { l: "J", say: "jay", ipa: "dʒeɪ" },
    { l: "K", say: "kay", ipa: "keɪ" }, { l: "L", say: "el", ipa: "ɛl" },
    { l: "M", say: "em", ipa: "ɛm" }, { l: "N", say: "en", ipa: "ɛn" },
    { l: "O", say: "oh", ipa: "oʊ" }, { l: "P", say: "pee", ipa: "piː" },
    { l: "Q", say: "cue", ipa: "kjuː" }, { l: "R", say: "ar", ipa: "ɑːr" },
    { l: "S", say: "ess", ipa: "ɛs" }, { l: "T", say: "tee", ipa: "tiː" },
    { l: "U", say: "you", ipa: "juː" }, { l: "V", say: "vee", ipa: "viː" },
    { l: "W", say: "double you", ipa: "ˈdʌbəl juː" }, { l: "X", say: "ex", ipa: "ɛks" },
    { l: "Y", say: "why", ipa: "waɪ" }, { l: "Z", say: "zee", ipa: "ziː" },
  ];
  const LETTER_SAY = Object.fromEntries(LETTERS.map((x) => [x.l, x.say]));

  const SYMBOLS = {
    "@": "at", ".": "dot", "_": "underscore", "-": "dash",
    "0": "zero", "1": "one", "2": "two", "3": "three", "4": "four",
    "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine",
  };

  /**
   * Converts text into spelling tokens, e.g. "Bella" -> ["B","E","double L","A"]
   * and "ana.diaz@mail.com" -> ["A","N","A","dot", ... "at", ...].
   */
  function spellTokens(text) {
    const chars = [...text.trim().toUpperCase()];
    const tokens = [];
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      if (ch === " ") { tokens.push("/"); continue; }
      if (LETTER_SAY[ch] && chars[i + 1] === ch) {
        tokens.push(`double ${ch}`);
        i++;
        continue;
      }
      if (LETTER_SAY[ch]) tokens.push(ch);
      else if (SYMBOLS[ch]) tokens.push(SYMBOLS[ch]);
    }
    return tokens;
  }

  // Readable on screen: "B - E - double L - A"
  const spellDisplay = (text) => spellTokens(text).join(" - ");

  // Pronounceable for speech synthesis: "bee, ee, double el, ay"
  function spellSpeech(text) {
    return spellTokens(text)
      .map((tok) => {
        if (tok === "/") return "space";
        if (tok.startsWith("double ")) return `double ${LETTER_SAY[tok.slice(7)]}`;
        return LETTER_SAY[tok] || tok;
      })
      .join(", ");
  }

  const speakBtn = (speechText, label, extraClass = "") =>
    `<button type="button" class="speak-btn ${extraClass}" data-speak="${speechText}" aria-label="${t({ es: "Escuchar", en: "Listen" })}: ${label}">
      <span aria-hidden="true">🔊</span><span>${label}</span>
    </button>`;

  /* ==========================================================================
     Lesson Content (ES / EN)
     ========================================================================== */

  const ROUTINE = [
    { icon: "⏱️", text: { es: "Bloques diarios de 15–20 minutos de práctica deliberada", en: "Daily 15–20 minute blocks of deliberate practice" } },
    { icon: "🗣️", text: { es: "Todo en voz alta, imitando la entonación de EE. UU.", en: "Everything out loud, imitating US intonation" } },
    { icon: "🚫", text: { es: "Sin traducción mental ni listas largas", en: "No mental translation and no long lists" } },
    { icon: "🎯", text: { es: "Uso práctico: presentarte y dar tus datos de contacto", en: "Practical use: introduce yourself and give contact details" } },
  ];

  const SOUND_GROUPS = [
    { ipa: "/eɪ/", like: "day", letters: "A H J K" },
    { ipa: "/iː/", like: "see", letters: "B C D E G P T V Z" },
    { ipa: "/ɛ/", like: "bed", letters: "F L M N S X" },
    { ipa: "/aɪ/", like: "my", letters: "I Y" },
    { ipa: "/oʊ/", like: "go", letters: "O" },
    { ipa: "/juː/", like: "you", letters: "Q U W" },
    { ipa: "/ɑːr/", like: "car", letters: "R" },
  ];

  const TRICKY_LETTERS = [
    { pair: "E ↔ I", es: "La E suena «ii» /iː/ y la I suena «ai» /aɪ/. Es la confusión n.º 1 de los hispanohablantes.", en: "E sounds like 'ee' /iː/ and I sounds like 'eye' /aɪ/. This is the #1 confusion for Spanish speakers." },
    { pair: "A", es: "La A suena «ei» /eɪ/, nunca como la «a» del español.", en: "A sounds like 'ay' /eɪ/, never like the Spanish 'a'." },
    { pair: "G ↔ J", es: "G suena «yi» /dʒiː/ y J suena «yei» /dʒeɪ/.", en: "G sounds like 'gee' /dʒiː/ and J sounds like 'jay' /dʒeɪ/." },
    { pair: "H · R · Y", es: "H = «eich» /eɪtʃ/, R = «ar» /ɑːr/, Y = «uai» /waɪ/.", en: "H = 'aitch' /eɪtʃ/, R = 'ar' /ɑːr/, Y = 'why' /waɪ/." },
    { pair: "Z · W", es: "En EE. UU. la Z es «zi» /ziː/ (en Reino Unido «zed»). W = «dóbel-iu».", en: "In the US, Z is 'zee' /ziː/ (in the UK, 'zed'). W = 'double you'." },
  ];

  const SPELLING_PHRASES = [
    { en: "How do you spell that?", es: "¿Cómo se deletrea?" },
    { en: "Could you spell your last name, please?", es: "¿Podría deletrear su apellido, por favor?" },
    { en: "Is that with a B or a V?", es: "¿Es con B o con V?" },
    { en: "Sorry, can you repeat that?", es: "Perdón, ¿puede repetirlo?" },
  ];

  const DIALOGUE = [
    { who: "A", line: "Hi! What's your name?" },
    { who: "B", line: "My name is Roberto Díaz." },
    { who: "A", line: "How do you spell your last name?" },
    { who: "B", line: "D - I - A - Z.", speech: `${spellSpeech("Diaz")}.` },
    { who: "A", line: "And what's your email address?" },
    { who: "B", line: "It's roberto.diaz@mail.com.", speech: "It's roberto dot diaz at mail dot com." },
  ];

  const EMAIL_SYMBOLS = [
    { sym: "@", say: "at", es: "arroba", en: "at sign" },
    { sym: ".", say: "dot", es: "punto", en: "dot / period" },
    { sym: "_", say: "underscore", es: "guion bajo", en: "underscore" },
    { sym: "-", say: "dash", es: "guion", en: "dash / hyphen" },
    { sym: "aa", say: "double A", es: "letra repetida", en: "repeated letter" },
  ];

  const VOWEL_TABLE = [
    { letter: "A", short: ["cat", "apple"], shortIpa: "/æ/", long: ["cake", "name"], longIpa: "/eɪ/" },
    { letter: "E", short: ["bed", "pen"], shortIpa: "/ɛ/", long: ["see", "me"], longIpa: "/iː/" },
    { letter: "I", short: ["sit", "big"], shortIpa: "/ɪ/", long: ["time", "five"], longIpa: "/aɪ/" },
    { letter: "O", short: ["hot", "stop"], shortIpa: "/ɑː/", long: ["home", "phone"], longIpa: "/oʊ/" },
    { letter: "U", short: ["cup", "sun"], shortIpa: "/ʌ/", long: ["cute", "music"], longIpa: "/juː/" },
  ];

  const SILENT_E_PAIRS = [["cap", "cape"], ["kit", "kite"], ["hop", "hope"], ["cub", "cube"]];
  const MINIMAL_PAIRS = [["ship", "sheep"], ["sit", "seat"], ["hat", "hate"], ["not", "note"], ["cut", "cute"]];

  const ARTICULATION = [
    { sound: "/æ/ cat", es: "Baja la mandíbula y estira los labios, como sonriendo. Queda entre la «a» y la «e» del español.", en: "Drop your jaw and spread your lips, like a smile. It sits between Spanish 'a' and 'e'." },
    { sound: "/ɪ/ sit · /iː/ seat", es: "/ɪ/: boca relajada y sonido breve. /iː/: labios estirados, sonido más largo y tenso.", en: "/ɪ/: relaxed mouth, short sound. /iː/: spread lips, longer and tenser sound." },
    { sound: "/ʌ/ cup", es: "Boca medio abierta y relajada; sonido corto y neutro, sin redondear los labios.", en: "Mouth half-open and relaxed; short, neutral sound, without rounding your lips." },
    { sound: "/oʊ/ home", es: "Es un diptongo: empieza en «o» y se cierra hacia «u». No es una «o» fija.", en: "It's a diphthong: it starts at 'o' and glides toward 'u'. It is not a fixed 'o'." },
  ];

  /* --- Practice quizzes ---------------------------------------------------- */

  const QUIZZES = {
    l1: [
      {
        prompt: { es: "¿Qué letra se pronuncia /iː/, como en «see»?", en: "Which letter is pronounced /iː/, as in 'see'?" },
        options: ["E", "I", "A"], correct: 0,
        feedback: { es: "La E suena /iː/ («ii»). La I suena /aɪ/ («ai») y la A suena /eɪ/ («ei»).", en: "E sounds like /iː/ ('ee'). I sounds like /aɪ/ ('eye') and A sounds like /eɪ/ ('ay')." },
      },
      {
        prompt: { es: "Escucha el deletreo. ¿Qué nombre es?", en: "Listen to the spelling. Which name is it?" },
        audio: spellSpeech("James"), transcript: spellDisplay("James"),
        options: ["James", "Games", "Jaimes"], correct: 0,
        feedback: { es: "Es J - A - M - E - S. La J suena «yei» /dʒeɪ/; la G sonaría «yi» /dʒiː/.", en: "It's J - A - M - E - S. J sounds like 'jay' /dʒeɪ/; G would sound like 'gee' /dʒiː/." },
      },
      {
        prompt: { es: "¿Cómo se dice «@» al deletrear un correo electrónico?", en: "How do you say '@' when spelling an email address?" },
        options: ["at", "arroba", "and"], correct: 0,
        feedback: { es: "En inglés, «@» se dice «at»: «ana at mail dot com».", en: "In English, '@' is said 'at': 'ana at mail dot com'." },
      },
      {
        prompt: { es: "En «maria_lopez@mail.com», ¿cómo se dice «_»?", en: "In 'maria_lopez@mail.com', how do you say '_'?" },
        options: ["underscore", "dash", "dot"], correct: 0,
        feedback: { es: "«_» es «underscore». «-» es «dash» y «.» es «dot».", en: "'_' is 'underscore'. '-' is 'dash' and '.' is 'dot'." },
      },
      {
        prompt: { es: "¿Cuál es la forma natural de deletrear «Bella»?", en: "What is the natural way to spell 'Bella'?" },
        options: ["B - E - double L - A", "B - E - L - A", "B - I - double L - A"], correct: 0,
        feedback: { es: "Cuando una letra se repite, se dice «double»: B - E - double L - A.", en: "When a letter repeats, say 'double': B - E - double L - A." },
      },
      {
        prompt: { es: "Escucha. ¿Qué correo electrónico es?", en: "Listen. Which email address is it?" },
        audio: "ana dot diaz at mail dot com", transcript: "ana dot diaz at mail dot com",
        options: ["ana.diaz@mail.com", "ana-diaz@mail.com", "anadiaz@mail.com"], correct: 0,
        feedback: { es: "«dot» = «.», así que es ana.diaz@mail.com.", en: "'dot' = '.', so it's ana.diaz@mail.com." },
      },
      {
        prompt: { es: "¿Qué grupo de letras tiene el mismo sonido que «day» /eɪ/?", en: "Which group of letters shares the sound in 'day' /eɪ/?" },
        options: ["A, H, J, K", "A, E, I, O", "B, C, D, E"], correct: 0,
        feedback: { es: "A, H, J y K comparten el sonido /eɪ/. B, C, D y E comparten /iː/.", en: "A, H, J and K share the /eɪ/ sound. B, C, D and E share /iː/." },
      },
      {
        type: "dictation",
        prompt: { es: "Dictado: escucha el deletreo (puedes repetirlo) y escribe el apellido.", en: "Dictation: listen to the spelling (you can replay it) and type the last name." },
        audio: spellSpeech("Rivera"), transcript: spellDisplay("Rivera"),
        answers: ["rivera"],
        feedback: { es: "R - I - V - E - R - A. Atención a la I («ai») y la E («ii»).", en: "R - I - V - E - R - A. Watch the I ('eye') and the E ('ee')." },
      },
    ],
    l2: [
      {
        prompt: { es: "Escucha. ¿Qué palabra oyes?", en: "Listen. Which word do you hear?" },
        audio: "ship", transcript: "ship", options: ["ship", "sheep"], correct: 0,
        feedback: { es: "«ship» /ɪ/: vocal corta y relajada. «sheep» /iː/ es más larga y tensa.", en: "'ship' /ɪ/: short, relaxed vowel. 'sheep' /iː/ is longer and tenser." },
      },
      {
        prompt: { es: "Escucha. ¿Qué palabra oyes?", en: "Listen. Which word do you hear?" },
        audio: "seat", transcript: "seat", options: ["sit", "seat"], correct: 1,
        feedback: { es: "«seat» tiene la vocal larga /iː/, con los labios estirados.", en: "'seat' has the long vowel /iː/, with spread lips." },
      },
      {
        prompt: { es: "¿Qué palabra tiene una vocal LARGA (suena como el nombre de la letra)?", en: "Which word has a LONG vowel (it sounds like the letter's name)?" },
        options: ["cap", "cape"], correct: 1,
        feedback: { es: "En «cape» la A suena /eɪ/, igual que el nombre de la letra. La «e» final es muda.", en: "In 'cape' the A sounds like /eɪ/, just like the letter's name. The final 'e' is silent." },
      },
      {
        prompt: { es: "Escucha. ¿Qué palabra oyes?", en: "Listen. Which word do you hear?" },
        audio: "note", transcript: "note", options: ["not", "note"], correct: 1,
        feedback: { es: "«note» tiene el diptongo /oʊ/ (de «o» hacia «u»). «not» tiene /ɑː/, abierta.", en: "'note' has the diphthong /oʊ/ ('o' gliding to 'u'). 'not' has an open /ɑː/." },
      },
      {
        prompt: { es: "¿Qué sonido tiene la A en «cat»?", en: "What sound does the A in 'cat' have?" },
        options: [{ es: "Corta /æ/", en: "Short /æ/" }, { es: "Larga /eɪ/", en: "Long /eɪ/" }], correct: 0,
        feedback: { es: "«cat» tiene la A corta /æ/: mandíbula abajo, entre «a» y «e».", en: "'cat' has the short A /æ/: jaw down, between 'a' and 'e'." },
      },
      {
        prompt: { es: "Escucha. ¿Qué palabra oyes?", en: "Listen. Which word do you hear?" },
        audio: "cute", transcript: "cute", options: ["cut", "cute"], correct: 1,
        feedback: { es: "«cute» tiene la U larga /juː/, como el nombre de la letra U.", en: "'cute' has the long U /juː/, like the name of the letter U." },
      },
      {
        prompt: { es: "¿Cuál es el error más común de los hispanohablantes con las vocales en inglés?", en: "What is the most common vowel mistake for Spanish speakers?" },
        options: [
          { es: "Sustituirlas por las 5 vocales fijas del español", en: "Replacing them with the 5 fixed Spanish vowels" },
          { es: "Pronunciar demasiado las consonantes finales", en: "Over-pronouncing final consonants" },
          { es: "Hablar demasiado despacio", en: "Speaking too slowly" },
        ],
        correct: 0,
        feedback: { es: "El inglés tiene muchos más sonidos vocálicos que el español; reducirlos a 5 cambia el significado (ship/sheep).", en: "English has many more vowel sounds than Spanish; reducing them to 5 changes meaning (ship/sheep)." },
      },
      {
        type: "dictation",
        prompt: { es: "Micro-listening: escucha la palabra (repítela las veces que necesites) y escríbela exactamente.", en: "Micro-listening: listen to the word (replay it as often as you need) and type it exactly." },
        audio: "kite", transcript: "kite", answers: ["kite"],
        feedback: { es: "«kite» /aɪ/: I larga por la «e» muda final (kit → kite).", en: "'kite' /aɪ/: long I because of the silent final 'e' (kit → kite)." },
      },
    ],
  };

  /* ==========================================================================
     Quiz State (persists while switching language) & Best Scores
     ========================================================================== */

  const answers = { l1: {}, l2: {} };

  function loadScores() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveBestScore(quizId, score) {
    const scores = loadScores();
    if (!scores[quizId] || score > scores[quizId]) {
      scores[quizId] = score;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
      } catch {
        // ignore storage errors
      }
    }
  }

  /* ==========================================================================
     Rendering
     ========================================================================== */

  const L = (es, en) => (lang() === "es" ? es : en);

  function renderRoutine() {
    return `<ul class="routine-strip">
      ${ROUTINE.map((r) => `<li><span class="routine-icon" aria-hidden="true">${r.icon}</span><span>${t(r.text)}</span></li>`).join("")}
    </ul>`;
  }

  function renderOverview() {
    return `
    <nav class="lesson-overview" aria-label="${L("Contenido del bloque", "Block contents")}">
      <a href="#lesson-1" class="lesson-overview-card">
        <span class="lesson-overview-num">01</span>
        <span class="lesson-overview-title">${L("Deletreo práctico", "Practical Spelling")}</span>
        <span class="lesson-overview-meta">${L("Nombres, apellidos y correos · 8 ejercicios", "Names, last names & emails · 8 exercises")}</span>
      </a>
      <a href="#lesson-2" class="lesson-overview-card">
        <span class="lesson-overview-num">02</span>
        <span class="lesson-overview-title">${L("Vocales cortas y largas", "Short & Long Vowels")}</span>
        <span class="lesson-overview-meta">${L("Discriminación auditiva · 8 ejercicios", "Listening discrimination · 8 exercises")}</span>
      </a>
      <a href="#lesson-resources" class="lesson-overview-card">
        <span class="lesson-overview-num">＋</span>
        <span class="lesson-overview-title">${L("Recursos adicionales", "Additional Resources")}</span>
        <span class="lesson-overview-meta">Pre-A1 Starter English Guide</span>
      </a>
    </nav>`;
  }

  function sectionHead(step, title) {
    return `<h3 class="lesson-step-title"><span class="lesson-step-num">${step}</span>${title}</h3>`;
  }

  function renderLesson1() {
    const alphabet = LETTERS.map(
      (x) => `<button type="button" class="letter-btn" data-speak="${x.say}" aria-label="${x.l}: ${x.say}">
        <span class="letter-big">${x.l}</span>
        <span class="letter-say">${x.say}</span>
        <span class="letter-ipa">/${x.ipa}/</span>
      </button>`
    ).join("");

    const groups = SOUND_GROUPS.map(
      (g) => `<tr><td class="ipa-cell">${g.ipa}</td><td>${speakBtn(g.like, g.like, "speak-btn-sm")}</td><td class="letters-cell">${g.letters}</td></tr>`
    ).join("");

    const tricky = TRICKY_LETTERS.map(
      (x) => `<li><strong>${x.pair}</strong> — ${x[lang()]}</li>`
    ).join("");

    const dialogue = DIALOGUE.map(
      (d) => `<li class="dialogue-line dialogue-${d.who.toLowerCase()}">
        <span class="dialogue-who" aria-hidden="true">${d.who}</span>
        ${speakBtn(d.speech || d.line, d.line, "speak-btn-line")}
      </li>`
    ).join("");

    const phrases = SPELLING_PHRASES.map(
      (p) => `<li>${speakBtn(p.en, p.en, "speak-btn-sm")} <span class="phrase-translation">${lang() === "es" ? p.es : ""}</span></li>`
    ).join("");

    const symbols = EMAIL_SYMBOLS.map(
      (s) => `<tr><td class="symbol-cell">${s.sym}</td><td>${speakBtn(s.say, s.say, "speak-btn-sm")}</td><td>${s[lang()]}</td></tr>`
    ).join("");

    return `
    <section id="lesson-1" class="card lesson-card" aria-labelledby="lesson-1-title">
      <header class="lesson-card-header">
        <span class="card-eyebrow">${L("LECCIÓN 1 DE 2 · ALFABETO Y FONÉTICA BÁSICA", "LESSON 1 OF 2 · ALPHABET & BASIC PHONETICS")}</span>
        <h2 id="lesson-1-title" class="theory-title">${L("Deletreo práctico (Spelling)", "Practical Spelling")}</h2>
        <p class="theory-explanation">${L(
          "Objetivo comunicativo: deletrear tu nombre, tu apellido y tu correo electrónico con claridad en intercambios cotidianos, con pronunciación de inglés estadounidense.",
          "Communicative goal: clearly spell your first name, last name, and email address in everyday exchanges, with US English pronunciation."
        )}</p>
        <div class="can-do-box">
          <span class="example-box-label">${L("AL TERMINAR PODRÁS", "BY THE END YOU CAN")}</span>
          <ul>
            <li>${L("Decir las 26 letras con su nombre en inglés de EE. UU.", "Say all 26 letter names in US English")}</li>
            <li>${L("Deletrear tu nombre después de «What's your name?»", "Spell your name after 'What's your name?'")}</li>
            <li>${L("Dictar un correo electrónico usando «at», «dot» y «underscore»", "Dictate an email using 'at', 'dot', and 'underscore'")}</li>
          </ul>
        </div>
      </header>

      <div class="lesson-step">
        ${sectionHead(1, L("El alfabeto de EE. UU.", "The US alphabet"))}
        <p>${L("Toca cada letra para escucharla y repítela en voz alta. Fíjate en el nombre de la letra, no en cómo suena dentro de una palabra.", "Tap each letter to hear it and repeat it out loud. Focus on the letter's name, not how it sounds inside a word.")}</p>
        <div class="alphabet-grid">${alphabet}</div>
      </div>

      <div class="lesson-step">
        ${sectionHead(2, L("Aprende por familias de sonido", "Learn by sound families"))}
        <p>${L("En lugar de memorizar 26 letras sueltas, agrúpalas por el sonido que comparten. Es más rápido y evita la traducción mental.", "Instead of memorizing 26 separate letters, group them by the sound they share. It's faster and avoids mental translation.")}</p>
        <div class="table-wrap">
          <table class="lesson-table">
            <thead><tr><th>${L("Sonido", "Sound")}</th><th>${L("Como en", "As in")}</th><th>${L("Letras", "Letters")}</th></tr></thead>
            <tbody>${groups}</tbody>
          </table>
        </div>
      </div>

      <div class="lesson-step">
        ${sectionHead(3, L("Letras trampa para hispanohablantes", "Tricky letters for Spanish speakers"))}
        <ul class="tip-list">${tricky}</ul>
      </div>

      <div class="lesson-step">
        ${sectionHead(4, L("Caso de uso 1: identificación personal", "Use case 1: personal identification"))}
        <p>${L("Escucha el diálogo línea por línea y repite cada intervención de B (shadowing).", "Listen to the dialogue line by line and repeat each of B's lines (shadowing).")}</p>
        <ol class="dialogue">${dialogue}</ol>
        <div class="example-box">
          <span class="example-box-label">${L("FRASES ÚTILES", "USEFUL PHRASES")}</span>
          <ul class="phrase-list">${phrases}</ul>
        </div>
      </div>

      <div class="lesson-step">
        ${sectionHead(5, L("Caso de uso 2: correos electrónicos", "Use case 2: email addresses"))}
        <p>${L("Automatiza estos símbolos. Los correos se dictan en minúsculas, letra por letra, y las palabras comunes (mail, gmail, com) se dicen completas.", "Automate these symbols. Emails are dictated in lowercase, letter by letter, and common words (mail, gmail, com) are said as whole words.")}</p>
        <div class="table-wrap">
          <table class="lesson-table">
            <thead><tr><th>${L("Símbolo", "Symbol")}</th><th>${L("Se dice", "Say")}</th><th>${L("Nombre", "Name")}</th></tr></thead>
            <tbody>${symbols}</tbody>
          </table>
        </div>
        <div class="example-box">
          <span class="example-box-label">${L("EJEMPLO", "EXAMPLE")}</span>
          <p class="email-example"><code>roberto.diaz@mail.com</code></p>
          ${speakBtn("roberto dot diaz at mail dot com", "roberto dot diaz at mail dot com")}
        </div>
      </div>

      <div class="lesson-step">
        ${sectionHead(6, L("Entrenador de deletreo", "Spelling trainer"))}
        <p>${L("Escribe tu nombre, apellido o correo. Verás cómo se deletrea y podrás escucharlo para imitarlo.", "Type your name, last name, or email. You'll see how it's spelled and can listen to it to imitate it.")}</p>
        <form class="spelling-trainer" id="spelling-trainer" autocomplete="off">
          <label for="spelling-input" class="sr-only">${L("Texto para deletrear", "Text to spell")}</label>
          <input id="spelling-input" type="text" maxlength="40" placeholder="${L("Ej.: Bella Ruiz o ana.diaz@mail.com", "e.g. Bella Ruiz or ana.diaz@mail.com")}" />
          <button type="submit" class="btn btn-primary">${L("Deletrear 🔊", "Spell it 🔊")}</button>
        </form>
        <p id="spelling-output" class="spelling-output" aria-live="polite"></p>
      </div>

      <div class="lesson-step micro-practice">
        ${sectionHead(7, L("Micro-práctica diaria", "Daily micro-practice"))}
        <ul class="check-list">
          <li>${L("Elige <strong>3 nombres propios</strong> (familia, amigos, compañeros) y <strong>2 correos electrónicos</strong>.", "Choose <strong>3 proper names</strong> (family, friends, coworkers) and <strong>2 email addresses</strong>.")}</li>
          <li>${L("Deletréalos letra por letra <strong>en voz alta</strong>, imitando la entonación estadounidense.", "Spell them letter by letter <strong>out loud</strong>, imitating US intonation.")}</li>
          <li>${L("No traduzcas mentalmente: asocia cada letra directamente con su sonido en inglés.", "Don't translate in your head: link each letter directly to its English sound.")}</li>
          <li>${L("Usa el entrenador de arriba para comprobar tu pronunciación.", "Use the trainer above to check your pronunciation.")}</li>
        </ul>
      </div>

      ${renderQuiz("l1", L("Práctica final · Lección 1", "Final practice · Lesson 1"))}
    </section>`;
  }

  function renderLesson2() {
    const vowelRows = VOWEL_TABLE.map(
      (v) => `<tr>
        <td class="letters-cell">${v.letter}</td>
        <td><span class="ipa-cell">${v.shortIpa}</span> ${v.short.map((w) => speakBtn(w, w, "speak-btn-sm")).join(" ")}</td>
        <td><span class="ipa-cell">${v.longIpa}</span> ${v.long.map((w) => speakBtn(w, w, "speak-btn-sm")).join(" ")}</td>
      </tr>`
    ).join("");

    const pairRow = (pairs) =>
      pairs.map(
        ([a, b]) => `<li class="pair-item">${speakBtn(a, a, "speak-btn-sm")}<span class="pair-arrow" aria-hidden="true">↔</span>${speakBtn(b, b, "speak-btn-sm")}</li>`
      ).join("");

    const articulation = ARTICULATION.map(
      (a) => `<li><strong>${a.sound}</strong> — ${a[lang()]}</li>`
    ).join("");

    return `
    <section id="lesson-2" class="card lesson-card" aria-labelledby="lesson-2-title">
      <header class="lesson-card-header">
        <span class="card-eyebrow">${L("LECCIÓN 2 DE 2 · ALFABETO Y FONÉTICA BÁSICA", "LESSON 2 OF 2 · ALPHABET & BASIC PHONETICS")}</span>
        <h2 id="lesson-2-title" class="theory-title">${L("Discriminación auditiva: vocales cortas y largas", "Listening Discrimination: Short & Long Vowels")}</h2>
        <p class="theory-explanation">${L(
          "Objetivo: entrenar el oído para notar que una misma letra escrita tiene sonidos muy distintos según la palabra. Primero se escucha y se reconoce; las reglas vienen después.",
          "Goal: train your ear to notice that the same written letter has very different sounds depending on the word. First you listen and recognize; rules come later."
        )}</p>
        <div class="can-do-box">
          <span class="example-box-label">${L("AL TERMINAR PODRÁS", "BY THE END YOU CAN")}</span>
          <ul>
            <li>${L("Distinguir de oído una vocal corta de una larga (ship / sheep)", "Tell a short vowel from a long one by ear (ship / sheep)")}</li>
            <li>${L("Reconocer el patrón de la «e» muda (cap → cape)", "Recognize the silent 'e' pattern (cap → cape)")}</li>
            <li>${L("Evitar sustituir las vocales del inglés por las 5 del español", "Avoid replacing English vowels with the 5 Spanish ones")}</li>
          </ul>
        </div>
      </header>

      <div class="lesson-step">
        ${sectionHead(1, L("¿Por qué es importante?", "Why does it matter?"))}
        <div class="compare-grid">
          <div class="compare-box">
            <span class="compare-label">${L("Español", "Spanish")}</span>
            <span class="compare-big">5</span>
            <span>${L("vocales fijas: a, e, i, o, u", "fixed vowels: a, e, i, o, u")}</span>
          </div>
          <div class="compare-box compare-box-accent">
            <span class="compare-label">${L("Inglés de EE. UU.", "US English")}</span>
            <span class="compare-big">≈15</span>
            <span>${L("sonidos vocálicos con solo 5 letras", "vowel sounds with only 5 letters")}</span>
          </div>
        </div>
        <p>${L(
          "Si cambias una vocal por la más parecida del español, puedes cambiar la palabra: <em>ship</em> (barco) no es <em>sheep</em> (oveja).",
          "If you swap a vowel for the closest Spanish one, you can change the word: <em>ship</em> is not <em>sheep</em>."
        )}</p>
      </div>

      <div class="lesson-step">
        ${sectionHead(2, L("Corta vs. larga: la tabla esencial", "Short vs. long: the essential table"))}
        <p>${L("Regla práctica: la vocal <strong>larga</strong> suena como el <strong>nombre de la letra</strong> (A = /eɪ/). La <strong>corta</strong> es un sonido breve y relajado. Toca cada palabra y compara.", "Rule of thumb: a <strong>long</strong> vowel sounds like the <strong>letter's name</strong> (A = /eɪ/). A <strong>short</strong> vowel is a brief, relaxed sound. Tap each word and compare.")}</p>
        <div class="table-wrap">
          <table class="lesson-table">
            <thead><tr><th>${L("Letra", "Letter")}</th><th>${L("Corta", "Short")}</th><th>${L("Larga", "Long")}</th></tr></thead>
            <tbody>${vowelRows}</tbody>
          </table>
        </div>
      </div>

      <div class="lesson-step">
        ${sectionHead(3, L("Escucha el patrón de la «e» muda", "Hear the silent 'e' pattern"))}
        <p>${L("Al añadir una «e» final que no se pronuncia, la vocal se vuelve larga. Escucha cada par varias veces.", "Adding a final 'e' that isn't pronounced makes the vowel long. Listen to each pair several times.")}</p>
        <ul class="pair-list">${pairRow(SILENT_E_PAIRS)}</ul>
      </div>

      <div class="lesson-step">
        ${sectionHead(4, L("Pares mínimos", "Minimal pairs"))}
        <p>${L("Solo cambia el sonido vocálico, pero el significado es otro. Escucha, repite y exagera la diferencia.", "Only the vowel sound changes, but the meaning is different. Listen, repeat, and exaggerate the difference.")}</p>
        <ul class="pair-list">${pairRow(MINIMAL_PAIRS)}</ul>
      </div>

      <div class="lesson-step">
        ${sectionHead(5, L("Técnicas de entrenamiento", "Training techniques"))}
        <div class="technique-grid">
          <article class="technique-card">
            <span class="technique-icon" aria-hidden="true">🎧</span>
            <h4>Micro-listening</h4>
            <p>${L("Escucha un fragmento muy corto 3–5 veces, escribe exactamente lo que oyes y compara para analizar tus errores.", "Listen to a very short clip 3–5 times, write exactly what you hear, and compare to analyze your mistakes.")}</p>
          </article>
          <article class="technique-card">
            <span class="technique-icon" aria-hidden="true">👄</span>
            <h4>${L("Drills de articulación", "Articulation drills")}</h4>
            <p>${L("Repite pares mínimos cuidando la posición de la boca, para no caer en las 5 vocales del español.", "Repeat minimal pairs while minding your mouth position, so you don't fall back on the 5 Spanish vowels.")}</p>
          </article>
          <article class="technique-card">
            <span class="technique-icon" aria-hidden="true">🔁</span>
            <h4>Shadowing</h4>
            <p>${L("Escucha el modelo y repítelo en voz alta de inmediato, imitando el ritmo y la musicalidad del inglés de EE. UU.", "Listen to the model and repeat it out loud right away, imitating the rhythm and melody of US English.")}</p>
          </article>
        </div>
        <div class="example-box">
          <span class="example-box-label">${L("GUÍA DE ARTICULACIÓN", "ARTICULATION GUIDE")}</span>
          <ul class="tip-list">${articulation}</ul>
        </div>
      </div>

      <div class="lesson-step micro-practice">
        ${sectionHead(6, L("Rutina diaria (15–20 min)", "Daily routine (15–20 min)"))}
        <ul class="check-list">
          <li>${L("<strong>5 min</strong> · Escucha la tabla de vocales y repite cada palabra (shadowing).", "<strong>5 min</strong> · Listen to the vowel table and repeat each word (shadowing).")}</li>
          <li>${L("<strong>5 min</strong> · Pares mínimos: escucha, repite y exagera la diferencia.", "<strong>5 min</strong> · Minimal pairs: listen, repeat, and exaggerate the difference.")}</li>
          <li>${L("<strong>5–10 min</strong> · Micro-listening: haz la práctica final y anota las palabras que confundes.", "<strong>5–10 min</strong> · Micro-listening: do the final practice and note the words you confuse.")}</li>
        </ul>
      </div>

      ${renderQuiz("l2", L("Práctica final · Lección 2", "Final practice · Lesson 2"))}
    </section>`;
  }

  function renderResources() {
    return `
    <section id="lesson-resources" class="card lesson-card" aria-labelledby="resources-title">
      <header class="lesson-card-header">
        <span class="card-eyebrow">${L("RECURSOS ADICIONALES", "ADDITIONAL RESOURCES")}</span>
        <h2 id="resources-title" class="theory-title">Pre-A1 Starter English Guide</h2>
        <p class="theory-explanation">${L(
          "Infografía con los fundamentos del nivel Starter. Estas lecciones cubren el tema «Alphabet & Phonetics» y aplican la rutina recomendada.",
          "Infographic with the Starter level foundations. These lessons cover the 'Alphabet & Phonetics' topic and apply the recommended routine."
        )}</p>
      </header>
      <a href="../resources/Pre-A1_Starter_English_Guide.png" target="_blank" rel="noopener" class="resource-figure">
        <img src="../resources/Pre-A1_Starter_English_Guide.png" loading="lazy"
          alt="${L(
            "Infografía Pre-A1 Starter English: temas esenciales (alfabeto y fonética, saludos, vocabulario, verbo to be, artículos y plurales), rutina de estudio recomendada y ejercicios prácticos.",
            "Pre-A1 Starter English infographic: core topics (alphabet and phonetics, greetings, vocabulary, verb to be, articles and plurals), recommended study routine, and practical drills."
          )}" />
        <span class="resource-caption">${L("Abrir en tamaño completo ↗", "Open full size ↗")}</span>
      </a>
      <div class="technique-grid">
        <article class="technique-card">
          <span class="technique-icon" aria-hidden="true">🔤</span>
          <h4>Alphabet &amp; Phonetics</h4>
          <p>${L("Deletrear nombres y correos; vocales cortas y largas. → Lecciones 1 y 2.", "Spell names and emails; short and long vowels. → Lessons 1 and 2.")}</p>
        </article>
        <article class="technique-card">
          <span class="technique-icon" aria-hidden="true">🕒</span>
          <h4>Short Daily Blocks</h4>
          <p>${L("Sesiones de 15–20 minutos para maximizar la retención.", "15–20 minute sessions to maximize retention.")}</p>
        </article>
        <article class="technique-card">
          <span class="technique-icon" aria-hidden="true">🗣️</span>
          <h4>Oral Repetition Practice</h4>
          <p>${L("Deletrear en voz alta e imitar la entonación nativa de EE. UU.", "Spell out loud and imitate native US intonation.")}</p>
        </article>
        <article class="technique-card">
          <span class="technique-icon" aria-hidden="true">🍎</span>
          <h4>Direct Visual Association</h4>
          <p>${L("Conectar palabras con objetos e imágenes en lugar de traducir listas.", "Connect words to objects and images instead of translating lists.")}</p>
        </article>
      </div>
      <p class="resource-more">
        <a href="../resources/Dominio_Operativo_del_Ingl%C3%A9s_Estadounidense.pdf" target="_blank" rel="noopener">📄 ${L("Guía completa: Dominio Operativo del Inglés Estadounidense (PDF)", "Full guide: Operational Mastery of US English (PDF)")}</a>
      </p>
    </section>`;
  }

  /* --- Quiz rendering ------------------------------------------------------ */

  const LETTER_LABELS = ["A", "B", "C", "D"];

  function renderQuiz(quizId, title) {
    const questions = QUIZZES[quizId];
    const items = questions.map((q, i) => {
      const state = answers[quizId][i];
      const audio = q.audio
        ? `<div class="quiz-audio-row">
            <button type="button" class="btn btn-dark quiz-play" data-speak="${q.audio}" data-rate="0.75">🔊 ${L("Escuchar", "Listen")}</button>
            <details class="quiz-transcript"><summary>${L("Ver texto", "Show text")}</summary><span>${q.transcript}</span></details>
          </div>`
        : "";

      let body;
      if (q.type === "dictation") {
        body = `<form class="dictation-form" data-quiz="${quizId}" data-q="${i}" autocomplete="off">
            <label for="dict-${quizId}-${i}" class="sr-only">${L("Tu respuesta", "Your answer")}</label>
            <input id="dict-${quizId}-${i}" type="text" value="${state ? state.value : ""}" placeholder="${L("Escribe aquí…", "Type here…")}" />
            <button type="submit" class="btn btn-primary">${L("Comprobar", "Check")}</button>
          </form>`;
      } else {
        body = `<div class="options-list" role="group" aria-label="${L("Opciones de respuesta", "Answer options")}">
            ${q.options.map((opt, j) => {
              let cls = "option-btn";
              if (state && state.value === j) cls += state.correct ? " selected-correct" : " selected-wrong";
              return `<button type="button" class="${cls}" data-quiz="${quizId}" data-q="${i}" data-opt="${j}">
                <span class="option-letter" aria-hidden="true">${LETTER_LABELS[j]}</span><span>${t(opt)}</span>
              </button>`;
            }).join("")}
          </div>`;
      }

      let feedback = "";
      if (state) {
        feedback = state.correct
          ? `<div class="feedback-banner visible success" role="status">✓ ${t(q.feedback)}</div>`
          : `<div class="feedback-banner visible error" role="status">✕ ${L("Todavía no. Escucha de nuevo e inténtalo otra vez.", "Not yet. Listen again and try once more.")}</div>`;
      }

      return `<li class="quiz-item">
          <p class="quiz-prompt"><span class="quiz-num">${i + 1}</span>${t(q.prompt)}</p>
          ${audio}
          ${body}
          ${feedback}
        </li>`;
    }).join("");

    const correctCount = Object.values(answers[quizId]).filter((a) => a.correct).length;
    const best = loadScores()[quizId] || 0;

    return `
      <div class="lesson-quiz" id="quiz-${quizId}">
        <div class="quiz-header">
          <div>
            <span class="card-eyebrow">${L("PRÁCTICA", "PRACTICE")}</span>
            <h3 class="quiz-title">${title}</h3>
          </div>
          <div class="quiz-score" aria-live="polite">
            <span class="badge badge-teal">${L("Correctas", "Correct")}: ${correctCount} / ${questions.length}</span>
            <span class="badge badge-neutral">${L("Mejor", "Best")}: ${best} / ${questions.length}</span>
          </div>
        </div>
        ${speechSupported ? "" : `<p class="quiz-warning">${L("Tu navegador no admite audio sintetizado. Usa «Ver texto» en las preguntas de audio.", "Your browser doesn't support synthesized audio. Use 'Show text' on audio questions.")}</p>`}
        <ol class="quiz-list">${items}</ol>
        <button type="button" class="btn btn-light quiz-reset" data-reset="${quizId}">↺ ${L("Reiniciar práctica", "Restart practice")}</button>
      </div>`;
  }

  function render() {
    const scrollY = window.scrollY;
    root.innerHTML = `
      ${renderRoutine()}
      ${renderOverview()}
      ${renderLesson1()}
      ${renderLesson2()}
      ${renderResources()}
      <div class="lesson-back-row">
        <a href="lessons.html" class="btn btn-dark">${L("← Volver a Lecciones", "← Back to Lessons")}</a>
      </div>`;
    window.scrollTo(0, scrollY);
  }

  /* ==========================================================================
     Events (delegated on #lesson-root so they survive re-renders)
     ========================================================================== */

  function recordAnswer(quizId, index, value, correct) {
    // Keep the first correct answer; allow retries on wrong answers
    if (answers[quizId][index] && answers[quizId][index].correct) return;
    answers[quizId][index] = { value, correct };
    const correctCount = Object.values(answers[quizId]).filter((a) => a.correct).length;
    saveBestScore(quizId, correctCount);
    render();
    const item = document.querySelectorAll(`#quiz-${quizId} .quiz-item`)[index];
    const focusTarget = item && item.querySelector(".feedback-banner");
    if (focusTarget) focusTarget.setAttribute("tabindex", "-1"), focusTarget.focus({ preventScroll: true });
  }

  root.addEventListener("click", (event) => {
    const speakEl = event.target.closest("[data-speak]");
    if (speakEl) {
      speak(speakEl.dataset.speak, Number(speakEl.dataset.rate) || 0.85);
      return;
    }

    const optEl = event.target.closest(".option-btn[data-quiz]");
    if (optEl) {
      const { quiz, q, opt } = optEl.dataset;
      const question = QUIZZES[quiz][Number(q)];
      recordAnswer(quiz, Number(q), Number(opt), Number(opt) === question.correct);
      return;
    }

    const resetEl = event.target.closest("[data-reset]");
    if (resetEl) {
      answers[resetEl.dataset.reset] = {};
      render();
    }
  });

  root.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.id === "spelling-trainer") {
      const value = form.querySelector("input").value;
      const output = document.getElementById("spelling-output");
      const display = spellDisplay(value);
      output.textContent = display || L("Escribe algo para deletrear.", "Type something to spell.");
      if (display) speak(spellSpeech(value), 0.8);
      return;
    }

    if (form.classList.contains("dictation-form")) {
      const { quiz, q } = form.dataset;
      const question = QUIZZES[quiz][Number(q)];
      const value = form.querySelector("input").value.trim();
      if (!value) return;
      recordAnswer(quiz, Number(q), value, question.answers.includes(value.toLowerCase()));
    }
  });

  // Voices load asynchronously in some browsers
  if (speechSupported) window.speechSynthesis.onvoiceschanged = pickVoice;

  // Re-render when main.js switches the page language
  new MutationObserver(render).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });

  render();
})();
