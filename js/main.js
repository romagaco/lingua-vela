/**
 * LinguaVela — Main Application, Crew Rank System & SLA Resources Logic
 * Pure Vanilla JavaScript (ES6+)
 * Default Language: Spanish (es), with instant full switch to English (en).
 */

const STORAGE_THEME_KEY = "linguavela-theme";
const STORAGE_LANG_KEY = "linguavela-lang";
const STORAGE_PROGRESS_KEY = "linguavela-progress";
const STORAGE_AVATAR_KEY = "linguavela-avatar";

/* ==========================================================================
   Crew Ranks System (Hidden CEFR -> Visible Nautical Rank & Badge)
   ========================================================================== */

const CREW_RANKS = [
  {
    id: "a0",
    levelNum: 1,
    hiddenCefr: "Pre-A1",
    badge: "⚓",
    badgeLabel: { es: "Ancla en tierra", en: "Anchor on land" },
    name: { es: "Terrícola (Landlubber)", en: "Landlubber" },
    shortTitle: { es: "Nivel 1: Terrícola", en: "Level 1: Landlubber" },
    subtitle: {
      es: "Aún en tierra firme. Todavía no has embarcado.",
      en: "Still on land. You have not boarded yet.",
    },
    canDo: {
      es: [
        "Conoces algunas palabras: hola, gracias, los números",
        "Estás aprendiendo el alfabeto y los sonidos básicos",
      ],
      en: [
        "You know a few words: hello, thank you, numbers",
        "You are learning the alphabet and basic sounds",
      ],
    },
    example: "Hello, my name is Roberto.",
  },
  {
    id: "a1",
    levelNum: 2,
    hiddenCefr: "A1",
    badge: "🪣",
    badgeLabel: { es: "Cubo de cubierta", en: "Deck Bucket" },
    name: { es: "Grumete (Cabin Mate)", en: "Cabin Mate" },
    shortTitle: { es: "Nivel 2: Grumete", en: "Level 2: Cabin Mate" },
    subtitle: {
      es: "De las primeras palabras a conversaciones simples. Acabas de abordar y estás aprendiendo dónde está todo.",
      en: "From first words to simple conversations. You just boarded. You are learning where everything is.",
    },
    canDo: {
      es: [
        "Puedes hablar sobre ti, tu familia y tu rutina diaria",
        "Comprendes audio lento y claro",
      ],
      en: [
        "You can talk about yourself, family, and daily routine",
        "You understand slow, clear audio",
      ],
    },
    example: "I live in Guatemala. I work every day.",
  },
  {
    id: "a2",
    levelNum: 3,
    hiddenCefr: "A2",
    badge: "🪢",
    badgeLabel: { es: "Cabo de amarre", en: "Mariner's Rope" },
    name: { es: "Marinero de Cubierta (Deckhand)", en: "Deckhand" },
    shortTitle: {
      es: "Nivel 3: Marinero de Cubierta",
      en: "Level 3: Deckhand",
    },
    subtitle: {
      es: "Puedes realizar tareas básicas en cubierta sin ayuda.",
      en: "You can do basic jobs on deck without help.",
    },
    canDo: {
      es: [
        "Puedes desenvolverte en viajes, compras y charlas sencillas de trabajo",
        "Puedes contar una historia en pasado",
      ],
      en: [
        "You can handle travel, shopping, and simple work talk",
        "You can tell a story in the past",
      ],
    },
    example: "Yesterday I went to the market and I bought fruit.",
  },
  {
    id: "b1",
    levelNum: 4,
    hiddenCefr: "B1",
    badge: "⛵",
    badgeLabel: { es: "Vela mayor", en: "Mainsail" },
    name: { es: "Marinero (Sailor)", en: "Sailor" },
    shortTitle: { es: "Nivel 4: Marinero", en: "Level 4: Sailor" },
    subtitle: {
      es: "Puedes trabajar solo. Conoces todas las maniobras.",
      en: "You can work alone. You know the ropes.",
    },
    canDo: {
      es: [
        "Puedes mantener una conversación real sobre trabajo, sueños y opiniones",
        "Comprendes series y podcasts con algo de ayuda",
      ],
      en: [
        "You can have a real conversation about work, dreams, and opinions",
        "You understand series and podcasts with some help",
      ],
    },
    example: "I think learning English is important because I want to travel.",
  },
  {
    id: "b2",
    levelNum: 5,
    hiddenCefr: "B2",
    badge: "🪈",
    badgeLabel: { es: "Silbato de mando", en: "Bosun's Whistle" },
    name: { es: "Contramaestre (Bosun)", en: "Bosun" },
    shortTitle: { es: "Nivel 5: Contramaestre", en: "Level 5: Bosun" },
    subtitle: {
      es: "Lideras al equipo de cubierta. La tripulación confía en ti.",
      en: "You lead the deck team. People trust you.",
    },
    canDo: {
      es: [
        "Puedes debatir y explicar ventajas y desventajas",
        "Comprendes a la mayoría de hablantes nativos y noticieros",
      ],
      en: [
        "You can debate, explain advantages and disadvantages",
        "You understand most native speakers and news",
      ],
    },
    example:
      "On the one hand, working from home is flexible. On the other hand, it can be lonely.",
  },
  {
    id: "c1",
    levelNum: 6,
    hiddenCefr: "C1",
    badge: "🧭",
    badgeLabel: { es: "Brújula náutica", en: "Navigator's Compass" },
    name: { es: "Navegante (Navigator)", en: "Navigator" },
    shortTitle: { es: "Nivel 6: Navegante", en: "Level 6: Navigator" },
    subtitle: {
      es: "Trazas el rumbo. Lees los mapas y dominas las tormentas.",
      en: "You chart the course. You read the maps and handle storms.",
    },
    canDo: {
      es: [
        "Usas el inglés para el trabajo o la universidad",
        "Comprendes bromas, significado implícito y textos complejos",
      ],
      en: [
        "You use English for work or university",
        "You understand jokes, implied meaning, and complex texts",
      ],
    },
    example:
      "What she really meant was that the project was already behind schedule.",
  },
  {
    id: "c2",
    levelNum: 7,
    hiddenCefr: "C2",
    badge: "☸️",
    badgeLabel: { es: "Timón del capitán", en: "Captain's Wheel" },
    name: { es: "Capitán (Captain)", en: "Captain" },
    shortTitle: { es: "Nivel 7: Capitán", en: "Level 7: Captain" },
    subtitle: {
      es: "Comandas el barco.",
      en: "You command the ship.",
    },
    canDo: {
      es: [
        "Comprendes casi todo, incluso el habla rápida y con acento",
        "Expresas matices como un hablante nativo con alta formación",
      ],
      en: [
        "You understand almost everything, even fast, accented speech",
        "You express nuance like a highly educated native speaker",
      ],
    },
    example:
      "Had we set sail earlier, we would have avoided the storm entirely.",
  },
];

/* ==========================================================================
   UI Translations Dictionary (Spanish Default + Full English)
   ========================================================================== */

const UI_TEXT = {
  es: {
    skipLink: "Saltar al contenido principal",
    navPort: "Puerto",
    navGrammar: "Taller de Gramática",
    navVocab: "Vocabulario y Pronunciación",
    navListening: "Comprensión Auditiva",
    navShip: "Mi Barco",
    navLessons: "Lecciones",
    navPractice: "Práctica",
    navBooks: "Libros",
    practiceEyebrow: "PRÁCTICA • ELIGE TU DISCIPLINA",
    practiceTitle: "Práctica",
    practiceSubtitle: "Elige un área para practicar con ejercicios interactivos en los 7 rangos de tripulación.",
    practiceGrammarDesc: "Estructuras gramaticales paso a paso con retroalimentación inmediata.",
    practiceVocabDesc: "Palabras clave, fonética estadounidense y pronunciación en contexto.",
    practiceListeningDesc: "Escucha audios reales y responde preguntas de comprensión.",
    lessonsEyebrow: "LECCIONES • 7 RANGOS",
    lessonsTitle: "Lecciones",
    lessonsSubtitle: "Elige tu rango para estudiar la gramática y las lecciones de cada nivel.",
    lessonsCardMeta: "Gramática y lecciones",
    booksEyebrow: "LIBROS • LECTURA EXTENSA",
    booksTitle: "Libros",
    booksSubtitle: "Lecturas largas para practicar la comprensión lectora, sin separación por niveles.",
    comingSoonTitle: "Próximamente",
    comingSoonLessonText: "Estamos preparando la gramática y las lecciones de este nivel. ¡Vuelve pronto!",
    comingSoonBooksText: "Pronto añadiremos lecturas extensas para practicar. ¡Vuelve pronto!",
    backToLessons: "← Volver a Lecciones",
    lessonA0Subtitle: "Pre-A1 Starter · Bloque 1: Alfabeto y Fonética Básica — deletreo práctico y vocales cortas y largas.",
    lessonA1Subtitle: "Nivel A1 · Sobrevivir en inglés: frases simples, gramática esencial, vocabulario práctico, funciones comunicativas y pronunciación.",
    lessonA2Subtitle: "Nivel A2 Elementary · Pasado Simple, Going to vs. Will, Comparativos, Present Perfect, Modales y Rutinas de estudio.",
    rank1Nav: "1. Terrícola (Landlubber)",
    rank2Nav: "2. Grumete (Cabin Mate)",
    rank3Nav: "3. Marinero de Cubierta (Deckhand)",
    rank4Nav: "4. Marinero (Sailor)",
    rank5Nav: "5. Contramaestre (Bosun)",
    rank6Nav: "6. Navegante (Navigator)",
    rank7Nav: "7. Capitán (Captain)",
    subLogbook: "Bitácora, Calendarios y Lecciones",
    subDiscourse: "Competencia Discursiva",
    subSocio: "Competencia Sociolingüística y Pragmática",
    subStrategic: "Competencia Estratégica",
    subLessonRanks: "7 Rangos (Terrícola a Capitán)",
    subLessonVocab: "Vocabulario (Vocabulary)",
    lessonsVocabEyebrow: "LECCIONES • CATEGORÍA DE VOCABULARIO",
    lessonsVocabTitle: "Vocabulario (Vocabulary)",
    lessonsVocabSubtitle: "Aprende vocabulario temático por categorías con tarjetas interactivas (flashcards). Haz clic en una tarjeta para descubrir su información.",
    lessonsVocabCardDesc: "Aprende léxico por categorías con tarjetas interactivas: 40 animales, datos curiosos, países y poblaciones.",
    badgeVocabAnimals: "🐾 40 Flashcards de Animales",
    lessonsCategoryHeading: "Categorías de Lecciones",
    lessonsCategorySubtitle: "Práctica temática estructurada por áreas de aprendizaje.",
    lessonsRanksTitle: "Lecciones por Rango de Tripulación",
    lessonsRanksDesc: "Elige tu rango para estudiar la gramática y las lecciones de cada nivel (1 a 7).",
    catAnimals: "Animales (Animals)",
    catOcean: "Océano y Vida Marina",
    catTravel: "Viajes y Exploración",
    comingSoonPill: "Pronto",
    statTotalLabel: "Total:",
    statRevealedLabel: "Reveladas:",
    btnFlipAll: "Voltear todas",
    btnHideAll: "Ocultar todas",
    btnShuffle: "Mezclar",
    langBtnTitle: "Cambiar idioma a Inglés (Switch to English)",
    themeLight: "Brisa",
    themeDark: "Océano",
    themeContrast: "Contraste",
    /* Port (index.html) — New User, No Login/Progress */
    heroTaglineBadge: "De Terrícola a Capitán • Tu travesía en el inglés",
    heroHelloNewUser: "¡Hola, ",
    heroNewUserHighlight: "nuevo usuario",
    heroReadySub: "De Terrícola a Capitán. Tu travesía en el inglés.",
    heroSubtitle:
      "Aprende inglés de forma abierta, sin necesidad de cuenta ni muros de pago. Explora nuestros rangos de tripulación, recursos de Adquisición de Segundas Lenguas (SLA) y laboratorios interactivos.",
    startExploringBtn: "Explorar Rangos de Tripulación ↓",
    openResourcesBtn: "Ver Recursos y Guía PDF →",
    ranksEyebrow: "SISTEMA DE RANGOS DE LA TRIPULACIÓN",
    ranksHeading: "De Terrícola a Capitán: ¿Qué puede hacer cada rango?",
    ranksMeta: "7 rangos náuticos progresivos con insignias propias",
    modulesEyebrow: "DISCIPLINAS DE NAVEGACIÓN",
    modulesHeading: "Módulos Principales y Laboratorios",
    modulesMeta: "Acceso libre a todos los niveles sin registro previo",
    modGrammarBadge: "7 RANGOS",
    modGrammarTitle: "Taller de Gramática",
    modGrammarDesc:
      "Domina la claridad oracional, el inglés corporativo de EE. UU., el subjuntivo mandativo y las inversiones estilísticas con un ejercicio por rango.",
    modGrammarStatLabel: "RUTA COMPLETA",
    modGrammarStatVal: "De Terrícola a Capitán",
    modGrammarLink: "Abrir Taller →",
    modVocabBadge: "IPA + CONNECTED SPEECH",
    modVocabTitle: "Vocabulario y Pronunciación",
    modVocabDesc:
      "Practica el Flap T estadounidense, enlaces fonéticos (linking), Sentence Mining (Regla 1T) y síntesis de voz en tiempo real.",
    modVocabDef: "adj. Ambiguo; abierto a más de una interpretación.",
    modVocabStatLabel: "LABORATORIO FONÉTICO",
    modVocabStatVal: "Audio Nativo + IPA",
    modVocabLink: "Practicar Vocabulario →",
    modListenBadge: " ESCUCHA EN 3 CAPAS",
    modListenTitle: "Comprensión Auditiva (Listening)",
    modListenDesc:
      "Entrena con Micro-Listening, escucha estratificada y sobrecarga de velocidad desde diálogos básicos hasta debates diplomáticos.",
    modListenStatLabel: "ENTRENAMIENTO AUDITIVO",
    modListenStatVal: "Velocidad 1.0x y 0.75x",
    modListenLink: "Ir a Listening →",
    modShipBadge: "BITÁCORA Y COMPETENCIAS",
    modShipTitle: "Mi Barco y Competencias",
    modShipDesc:
      "Explora el perfil de tripulante, calendario mensual y semanal de estudio, resumen de lecciones y competencias comunicativas.",
    modShipStatLabel: "ÁREAS DE PRÁCTICA",
    modShipStatVal: "Calendarios + 3 Competencias",
    modShipLink: "Ver Mi Barco →",
    /* Resources Section on Port */
    resEyebrow: "RECURSOS DEL PROYECTO Y METODOLOGÍA SLA",
    resHeading: "Dominio Operativo del Inglés Estadounidense",
    resMeta: "Basado en principios neurobiológicos de Adquisición de Segundas Lenguas (SLA)",
    resBlueprintBadge: "INFOGRAFÍA + DOCUMENTO PDF",
    resBlueprintTitle: "Mastering US English: The Complete Practical Blueprint",
    resBlueprintDesc:
      "Consulta e imprime el plano visual completo y descarga el manual técnico en PDF sobre Input Comprensible (i+1), Repetición Espaciada (Regla 1T), Protocolo de Shadowing en 4 fases, Connected Speech estadounidense y comunicación corporativa.",
    resDownloadPdfBtn: "📄 Abrir Guía Completa PDF",
    resViewImageBtn: "🖼️ Ver Infografía en Tamaño Completo",
    p1Badge: "PILAR 1 • NEUROBIOLOGÍA SLA",
    p1Title: "Input Comprensible, SRS y Shadowing",
    p1Item1: "Input Comprensible (i+1): Exposición a material donde comprendes el 70%–80%, asimilando gramática de forma implícita.",
    p1Item2: "Sentence Mining (Regla 1T): Tarjetas SRS con oraciones completas que contienen solo 1 término desconocido.",
    p1Item3: "Shadowing en 4 Fases: Escucha activa, repetición con texto, shadowing a ciegas y grabación comparativa.",
    p2Badge: "PILAR 2 • FONÉTICA DE EE. UU.",
    p2Title: "Connected Speech, Flap T y Escucha en 3 Capas",
    p2Item1: "Flap T Estadounidense: /t/ o /d/ intervocálica suena como 'r' suave española (water → wah-der, city → sih-dee).",
    p2Item2: "Linking y Reducciones: Enlace consonante-vocal (hold on → hol-don) y parada glótica (button → /bʌʔ.n/).",
    p2Item3: "Sobrecarga Auditiva: Escuchar a 1.25x–1.5x por 5 minutos para que 1.0x se perciba claro y pausado.",
    p3Badge: "PILAR 3 • LECTURA Y EXPRESIÓN ORAL",
    p3Title: "Lectura Escalonada y Solo Speaking",
    p3Item1: "Skimming, Scanning e Intensive Reading: Barrido de tesis central en 2 minutos y análisis de conectores.",
    p3Item2: "Sumarización Marginal: Condensar cada sección técnica en una nota al margen de máximo 10 palabras en inglés.",
    p3Item3: "Storytelling en 3 Tiempos: 1) The reason we ran into this issue... 2) What I ended up doing... 3) The key takeaway is...",
    hedgingEyebrow: "COMUNICACIÓN PROFESIONAL EN EE. UU.",
    hedgingTitle: "Mitigación Diplomática (Hedging) y Convenciones Laborales",
    hedgingDesc:
      "En entornos técnicos y corporativos de EE. UU. se prefiere el Past Simple con 'just/already/yet' (I just got home), el Subjuntivo Mandativo (I recommend that he be present) y el reencuadre diplomático:",
    thGoal: "Objetivo Comunicativo",
    thDirect: "Frase Literal / Directa (Evitar)",
    thStandard: "Estándar Profesional en EE. UU. (Hedging)",
    tdGoal1: "Expresar desacuerdo técnico",
    tdGoal2: "Consultar disponibilidad (Bandwidth)",
    tdGoal3: "Priorizar una tarea urgente",
    tdGoal4: "Alinear al equipo en un proyecto",
    quoteText: "“Tener otro idioma es poseer una segunda alma.”",
    quoteAuthor: "— CARLOMAGNO",
    footerTagline: "— De Terrícola a Capitán. Tu travesía en el inglés.",
    footerCopy:
      "© 2026 LinguaVela. Educación de código abierto impulsada por la comunidad.",
    /* Discipline Pages Shared Labels */
    selectLevelLabel: "Selecciona tu Rango de Tripulación:",
    selectCompetenceLabel: "Secciones de Mi Barco:",
    theoryBadge: "GUÍA DEL RANGO Y CONTEXTO",
    exampleLabel: "EJEMPLO EN CONTEXTO",
    exerciseBadge: "EJERCICIO INTERACTIVO",
    prevLevelBtn: "← Rango Anterior",
    nextLevelBtn: "Siguiente Rango →",
    listenNormalBtn: "🔊 Escuchar (1.0x)",
    listenSlowBtn: "🐢 Lento (0.75x)",
    toggleTranscriptBtn: "📄 Mostrar / Ocultar Transcripción",
    grammarPageEyebrow: "DE TERRÍCOLA A CAPITÁN • 7 RANGOS",
    grammarPageTitle: "Taller de Gramática",
    grammarPageSubtitle:
      "Domina las estructuras gramaticales paso a paso desde el Nivel 1: Terrícola hasta el Nivel 7: Capitán.",
    vocabPageEyebrow: "LÉXICO, FONÉTICA IPA Y CONNECTED SPEECH",
    vocabPageTitle: "Vocabulario y Pronunciación",
    vocabPageSubtitle:
      "Escucha la pronunciación nativa, practica el Flap T y resuelve el ejercicio de cada rango de la tripulación.",
    listeningPageEyebrow: "ESCUCHA ESTRATIFICADA • 7 RANGOS",
    listeningPageTitle: "Comprensión Auditiva (Listening)",
    listeningPageSubtitle:
      "Reproduce el audio de cada rango a velocidad normal o lenta, revisa la transcripción y responde la pregunta.",
    /* My Ship Page */
    shipPageEyebrow: "PERFIL DEL TRIPULANTE Y BITÁCORA DE NAVEGACIÓN",
    shipPageTitle: "Mi Barco — Bitácora del Aprendiz",
    shipTagline: "De Terrícola a Capitán. Tu travesía en el inglés.",
    shipCurrentRankTitle: "Nivel 2: Grumete (Cabin Mate)",
    shipCurrentRankSub: "De las primeras palabras a conversaciones simples",
    uploadPhotoBtn: "📷 Cambiar Foto de Perfil",
    monthCalEyebrow: "REGISTRO MENSUAL DE CONSTANCIA",
    prevMonthBtn: "← Mes Anterior",
    nextMonthBtn: "Mes Siguiente →",
    legendBlue: "Azul: Meta diaria alcanzada",
    legendGreen: "Verde: Día trabajado",
    legendRed: "Rojo: Día perdido",
    resumeEyebrow: "BITÁCORA DE PROGRESO",
    resumeTitle: "Resumen de Lecciones Completadas",
    resumeSub: "Historial de lecciones dominadas por rango y módulo",
    weekCalEyebrow: "PLANIFICADOR DE LA SEMANA ACTUAL",
    weekCalTitle: "Calendario Semanal de Lecciones Trabajadas",
    weekCalSub: "Detalle de las lecciones y ejercicios practicados cada día de esta semana",
  },
  en: {
    skipLink: "Skip to main content",
    navPort: "Port",
    navGrammar: "Grammar Workshop",
    navVocab: "Vocabulary & Pronunciation",
    navListening: "Listening",
    navShip: "My Ship",
    navLessons: "Lessons",
    navPractice: "Practice",
    navBooks: "Books",
    practiceEyebrow: "PRACTICE • CHOOSE YOUR DISCIPLINE",
    practiceTitle: "Practice",
    practiceSubtitle: "Choose an area to practice with interactive exercises across all 7 crew ranks.",
    practiceGrammarDesc: "Step-by-step grammar structures with instant feedback.",
    practiceVocabDesc: "Key words, American English phonetics, and pronunciation in context.",
    practiceListeningDesc: "Listen to real audio and answer comprehension questions.",
    lessonsEyebrow: "LESSONS • 7 RANKS",
    lessonsTitle: "Lessons",
    lessonsSubtitle: "Choose your rank to study the grammar and lessons for each level.",
    lessonsCardMeta: "Grammar & lessons",
    booksEyebrow: "BOOKS • EXTENSIVE READING",
    booksTitle: "Books",
    booksSubtitle: "Long readings to practice reading comprehension, not separated by level.",
    comingSoonTitle: "Coming soon",
    comingSoonLessonText: "We are preparing the grammar and lessons for this level. Check back soon!",
    comingSoonBooksText: "We will soon add extensive readings for practice. Check back soon!",
    backToLessons: "← Back to Lessons",
    lessonA0Subtitle: "Pre-A1 Starter · Block 1: Alphabet & Basic Phonetics — practical spelling and short & long vowels.",
    lessonA1Subtitle: "Level A1 · Surviving in English: simple sentences, essential grammar, practical vocabulary, communicative functions, and pronunciation.",
    lessonA2Subtitle: "Level A2 Elementary · Past Simple, Going to vs. Will, Comparatives, Present Perfect, Modals, and Study Routines.",
    rank1Nav: "1. Landlubber",
    rank2Nav: "2. Cabin Mate",
    rank3Nav: "3. Deckhand",
    rank4Nav: "4. Sailor",
    rank5Nav: "5. Bosun",
    rank6Nav: "6. Navigator",
    rank7Nav: "7. Captain",
    subLogbook: "Logbook, Calendars & Lessons",
    subDiscourse: "Discourse Competence",
    subSocio: "Sociolinguistic & Pragmatic Competence",
    subStrategic: "Strategic Competence",
    subLessonRanks: "7 Ranks (Landlubber to Captain)",
    subLessonVocab: "Vocabulary",
    lessonsVocabEyebrow: "LESSONS • VOCABULARY CATEGORY",
    lessonsVocabTitle: "Vocabulary",
    lessonsVocabSubtitle: "Learn thematic vocabulary by category with interactive flashcards. Click on any card to reveal its information.",
    lessonsVocabCardDesc: "Learn vocabulary by category with interactive flashcards: 40 animals, fun facts, countries, and populations.",
    badgeVocabAnimals: "🐾 40 Animal Flashcards",
    lessonsCategoryHeading: "Lesson Categories",
    lessonsCategorySubtitle: "Thematic practice structured by learning areas.",
    lessonsRanksTitle: "Crew Rank Lessons",
    lessonsRanksDesc: "Choose your rank to study the grammar and lessons for each level (1 to 7).",
    catAnimals: "Animals",
    catOcean: "Ocean & Marine Life",
    catTravel: "Travel & Exploration",
    comingSoonPill: "Soon",
    statTotalLabel: "Total:",
    statRevealedLabel: "Revealed:",
    btnFlipAll: "Flip all",
    btnHideAll: "Hide all",
    btnShuffle: "Shuffle",
    langBtnTitle: "Switch language to Spanish (Cambiar a Español)",
    themeLight: "Breeze",
    themeDark: "Ocean",
    themeContrast: "Contrast",
    /* Port (index.html) — New User, No Login/Progress */
    heroTaglineBadge: "From Landlubber to Captain • Your journey in English",
    heroHelloNewUser: "Hello, ",
    heroNewUserHighlight: "new user",
    heroReadySub: "From Landlubber to Captain. Your journey in English.",
    heroSubtitle:
      "Learn English openly with no sign-in required and zero paywalls. Explore our nautical crew ranks, Second Language Acquisition (SLA) resources, and interactive laboratories.",
    startExploringBtn: "Explore Crew Ranks ↓",
    openResourcesBtn: "View Resources & PDF Blueprint →",
    ranksEyebrow: "CREW RANK SYSTEM",
    ranksHeading: "From Landlubber to Captain: What Each Rank Can Do",
    ranksMeta: "7 progressive nautical ranks with dedicated badges",
    modulesEyebrow: "NAVIGATION DISCIPLINES",
    modulesHeading: "Core Modules & Laboratories",
    modulesMeta: "Open access to every rank with no sign-in required",
    modGrammarBadge: "7 CREW RANKS",
    modGrammarTitle: "Grammar Workshop",
    modGrammarDesc:
      "Master sentence clarity, US workplace grammar conventions, the mandative subjunctive, and stylistic inversions with one exercise per rank.",
    modGrammarStatLabel: "COMPLETE PATHWAY",
    modGrammarStatVal: "From Landlubber to Captain",
    modGrammarLink: "Enter Workshop →",
    modVocabBadge: "IPA + CONNECTED SPEECH",
    modVocabTitle: "Vocabulary & Pronunciation",
    modVocabDesc:
      "Practice the American Flap T, connected speech linking, Sentence Mining (1T Rule), and real-time speech synthesis.",
    modVocabDef: "adj. Ambiguous; open to more than one interpretation.",
    modVocabStatLabel: "PHONETICS LAB",
    modVocabStatVal: "Native Audio + IPA",
    modVocabLink: "Practice Vocabulary →",
    modListenBadge: "3-LAYER LISTENING",
    modListenTitle: "Listening Comprehension",
    modListenDesc:
      "Train with Focused Micro-Dictation, Three-Layered Listening, and Speed Overload from basic greetings to diplomatic debates.",
    modListenStatLabel: "ACOUSTIC TRAINING",
    modListenStatVal: "1.0x & 0.75x Playback",
    modListenLink: "Go to Listening →",
    modShipBadge: "LOGBOOK & COMPETENCES",
    modShipTitle: "My Ship & Competences",
    modShipDesc:
      "Explore the learner profile, monthly & weekly study calendars, completed lessons resume, and communicative competences.",
    modShipStatLabel: "PRACTICE AREAS",
    modShipStatVal: "Calendars + 3 Competences",
    modShipLink: "Open My Ship →",
    /* Resources Section on Port */
    resEyebrow: "PROJECT RESOURCES & SLA METHODOLOGY",
    resHeading: "Operational Mastery of American English",
    resMeta: "Grounded in neurobiological Second Language Acquisition (SLA) principles",
    resBlueprintBadge: "INFOGRAPHIC + PDF GUIDE",
    resBlueprintTitle: "Mastering US English: The Complete Practical Blueprint",
    resBlueprintDesc:
      "View the complete visual blueprint and download the comprehensive PDF handbook covering Comprehensible Input (i+1), Spaced Repetition Sentence Mining (1T Rule), the 4-Phase Shadowing Protocol, US Connected Speech, and workplace hedging.",
    resDownloadPdfBtn: "📄 Open Complete PDF Guide",
    resViewImageBtn: "🖼️ View Full-Size Blueprint Image",
    p1Badge: "PILLAR 1 • SLA NEUROBIOLOGY",
    p1Title: "Comprehensible Input, SRS & Shadowing",
    p1Item1: "Comprehensible Input (i+1): Exposure to material where you understand 70%–80%, acquiring grammar implicitly in context.",
    p1Item2: "Sentence Mining (1T Rule): SRS flashcards using full authentic sentences containing only 1 unknown target word.",
    p1Item3: "4-Phase Shadowing Protocol: Active listening, shadowing with text, blind shadowing, and recorded self-comparison.",
    p2Badge: "PILLAR 2 • US PHONETICS",
    p2Title: "Connected Speech, Flap T & Layered Listening",
    p2Item1: "American Flap T: Intervocalic /t/ or /d/ becomes a quick alveolar tap (water → wah-der, city → sih-dee).",
    p2Item2: "Linking & Reductions: Consonant-to-vowel linking (hold on → hol-don) and glottal stop cutoffs (button → /bʌʔ.n/).",
    p2Item3: "Speed Overload Training: Listen at 1.25x–1.5x for 5 minutes so 1.0x real-time speech feels effortless.",
    p3Badge: "PILLAR 3 • READING & SOLO SPEAKING",
    p3Title: "Three-Tier Reading & Guided Monologues",
    p3Item1: "Skimming, Scanning & Intensive Reading: 2-minute thesis sweep plus deep syntactic breakdown of connectors.",
    p3Item2: "Active Marginal Summarization: Condense each technical section into a margin note of 10 English words or fewer.",
    p3Item3: "3-Step Storytelling: 1) The reason we ran into this issue... 2) What I ended up doing... 3) The key takeaway is...",
    hedgingEyebrow: "US WORKPLACE COMMUNICATION",
    hedgingTitle: "Diplomatic Professional Hedging & US Conventions",
    hedgingDesc:
      "In US technical and corporate teams, speakers favor the Past Simple with 'just/already/yet' (I just got home), the Mandative Subjunctive (I recommend that he be present), and diplomatic hedging:",
    thGoal: "Communication Goal",
    thDirect: "Literal / Direct Phrase (Avoid)",
    thStandard: "US Workplace Standard (Hedging)",
    tdGoal1: "Expressing Technical Disagreement",
    tdGoal2: "Checking Capacity (Bandwidth)",
    tdGoal3: "Prioritizing an Urgent Task",
    tdGoal4: "Project Alignment",
    quoteText: "“To have another language is to possess a second soul.”",
    quoteAuthor: "— CHARLEMAGNE",
    footerTagline: "— From Landlubber to Captain. Your journey in English.",
    footerCopy:
      "© 2026 LinguaVela. Community-driven, open-source education.",
    /* Discipline Pages Shared Labels */
    selectLevelLabel: "Select your Crew Rank:",
    selectCompetenceLabel: "My Ship Sections:",
    theoryBadge: "RANK GUIDE & CONTEXT",
    exampleLabel: "CONTEXTUAL EXAMPLE",
    exerciseBadge: "INTERACTIVE EXERCISE",
    prevLevelBtn: "← Previous Rank",
    nextLevelBtn: "Next Rank →",
    listenNormalBtn: "🔊 Listen (1.0x)",
    listenSlowBtn: "🐢 Slow (0.75x)",
    toggleTranscriptBtn: "📄 Show / Hide Transcript",
    grammarPageEyebrow: "FROM LANDLUBBER TO CAPTAIN • 7 RANKS",
    grammarPageTitle: "Grammar Workshop",
    grammarPageSubtitle:
      "Master English grammar step by step from Level 1: Landlubber to Level 7: Captain.",
    vocabPageEyebrow: "LEXICON, IPA PHONETICS & CONNECTED SPEECH",
    vocabPageTitle: "Vocabulary & Pronunciation",
    vocabPageSubtitle:
      "Listen to native speech synthesis, practice the American Flap T, and solve the exercise for each crew rank.",
    listeningPageEyebrow: "LAYERED LISTENING • 7 CREW RANKS",
    listeningPageTitle: "Listening Comprehension",
    listeningPageSubtitle:
      "Play the audio broadcast for each rank at normal or slow speed, inspect the transcript, and answer the comprehension question.",
    /* My Ship Page */
    shipPageEyebrow: "LEARNER PROFILE & NAVIGATION LOGBOOK",
    shipPageTitle: "My Ship — Learner Logbook",
    shipTagline: "From Landlubber to Captain. Your journey in English.",
    shipCurrentRankTitle: "Level 2: Cabin Mate",
    shipCurrentRankSub: "From first words to simple conversations",
    uploadPhotoBtn: "📷 Change Profile Photo",
    monthCalEyebrow: "MONTHLY CONSISTENCY LOG",
    prevMonthBtn: "← Previous Month",
    nextMonthBtn: "Next Month →",
    legendBlue: "Blue: Daily goal reached",
    legendGreen: "Green: Day worked",
    legendRed: "Red: Day missed",
    resumeEyebrow: "PROGRESS LOGBOOK",
    resumeTitle: "Resume of Lessons Completed",
    resumeSub: "Summary of lessons mastered across crew ranks and modules",
    weekCalEyebrow: "CURRENT WEEK SCHEDULE",
    weekCalTitle: "Week Calendar of Lessons Worked On",
    weekCalSub: "Breakdown of the specific lessons and drills practiced each day this week",
  },
};

/* ==========================================================================
   1. Grammar Workshop Data (Level 1: Landlubber -> Level 7: Captain)
   ========================================================================== */

const GRAMMAR_DATA = {
  a0: {
    title: {
      es: "Nivel 1: Terrícola (Landlubber) — Presentaciones y Verbo 'To Be'",
      en: "Level 1: Landlubber — Introductions & Verb 'To Be'",
    },
    explanation: {
      es: "Empiezas con tus primeras palabras (hello, thank you, números), artículos (a/an), pronombres personales y el verbo 'to be' (am, is, are) para presentarte y describir cosas simples.",
      en: "You start with your first words (hello, thank you, numbers), articles (a/an), subject pronouns, and the verb 'to be' (am, is, are) to introduce yourself and describe simple things.",
    },
    wrongExample: "Hello, my name are Roberto.",
    rightExample: "Hello, my name is Roberto.",
    exercises: [
      {
        question: {
          es: "Completa la frase de presentación del Nivel 1 (Terrícola): «Hello, my name ___ Roberto.»",
          en: "Complete the Level 1 (Landlubber) introduction sentence: 'Hello, my name ___ Roberto.'",
        },
        options: ["is", "am", "are"],
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! «My name» es singular (it), por lo que usamos «is»: «Hello, my name is Roberto.»",
          en: "Correct! 'My name' is third-person singular (it), so we use 'is': 'Hello, my name is Roberto.'",
        },
      },
      {
        question: {
          es: "Elige la forma correcta de 'to be' con el pronombre 'I': «Hi! I ___ a student from Mexico.»",
          en: "Choose the correct form of 'to be' with 'I': 'Hi! I ___ a student from Mexico.'",
        },
        options: ["am", "is", "are"],
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! Con el pronombre «I» siempre usamos «am»: «I am a student.»",
          en: "Well done! With the pronoun 'I', we always use 'am': 'I am a student.'",
        },
      },
      {
        question: {
          es: "Selecciona el artículo correcto antes de un sonido vocal: «I have ___ apple and a sandwich for lunch.»",
          en: "Select the correct article before a vowel sound: 'I have ___ apple and a sandwich for lunch.'",
        },
        options: ["an", "a", "two"],
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! Usamos «an» antes de palabras que empiezan con sonido vocal como «apple».",
          en: "Spot on! We use 'an' before words starting with a vowel sound like 'apple'.",
        },
      },
      {
        question: {
          es: "Completa el saludo en plural: «Good morning! We ___ ready to start.»",
          en: "Complete the plural sentence: 'Good morning! We ___ ready to start.'",
        },
        options: ["are", "is", "am"],
        correctIndex: 0,
        feedback: {
          es: "¡Excelente! Con «we», «you» y «they» usamos «are».",
          en: "Excellent! With 'we', 'you', and 'they', we use 'are'.",
        },
      },
    ],
  },
  a1: {
    title: {
      es: "Nivel 2: Grumete (Cabin Mate) — Rutina Diaria en Presente Simple",
      en: "Level 2: Cabin Mate — Daily Routine in the Present Simple",
    },
    explanation: {
      es: "Hablas sobre ti, tu familia y tu rutina diaria usando el Presente Simple (I live, I work, she works), preguntas con 'do/does' y adverbios de frecuencia.",
      en: "You talk about yourself, your family, and your daily routine using the Present Simple (I live, I work, she works), 'do/does' questions, and frequency adverbs.",
    },
    wrongExample: "I lives in Guatemala. I working every day.",
    rightExample: "I live in Guatemala. I work every day.",
    exercises: [
      {
        question: {
          es: "Elige la forma correcta para hablar de tu rutina diaria: «I ___ in Guatemala. I work every day.»",
          en: "Choose the correct form to describe your daily routine: 'I ___ in Guatemala. I work every day.'",
        },
        options: ["live", "lives", "living"],
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien, Grumete! Con el pronombre 'I' usamos el verbo en su forma base: «I live in Guatemala. I work every day.»",
          en: "Well done, Cabin Mate! With the subject pronoun 'I', we use the base form: 'I live in Guatemala. I work every day.'",
        },
      },
      {
        question: {
          es: "Completa la rutina de tercera persona singular: «My sister ___ coffee every morning at 7:00 a.m.»",
          en: "Complete the third-person singular routine: 'My sister ___ coffee every morning at 7:00 a.m.'",
        },
        options: ["drinks", "drink", "drinking"],
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! Con «she / he / it» en Presente Simple añadimos «-s» al verbo: «My sister drinks coffee.»",
          en: "Correct! With 'she / he / it' in the Present Simple, we add '-s' to the verb: 'My sister drinks coffee.'",
        },
      },
      {
        question: {
          es: "Elige el auxiliar correcto para preguntar por una rutina: «___ your brother work on Saturdays?»",
          en: "Choose the correct auxiliary to ask about a routine: '___ your brother work on Saturdays?'",
        },
        options: ["Does", "Do", "Is"],
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! Para preguntas en Presente Simple con «he / she / it» (your brother) usamos «Does» + verbo base.",
          en: "Exact! For Present Simple questions with 'he / she / it' (your brother), we use 'Does' + base verb.",
        },
      },
      {
        question: {
          es: "Completa la oración negativa sobre tu rutina: «I ___ watch TV before breakfast.»",
          en: "Complete the negative routine sentence: 'I ___ watch TV before breakfast.'",
        },
        options: ["don't", "doesn't", "am not"],
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! Con «I / you / we / they» negamos acciones habituales usando «don't» + verbo base.",
          en: "Well done! With 'I / you / we / they', we negate habitual actions using 'don't' + base verb.",
        },
      },
    ],
  },
  a2: {
    title: {
      es: "Nivel 3: Marinero de Cubierta (Deckhand) — Historias en Pasado (US Past Simple)",
      en: "Level 3: Deckhand — Telling Stories in the Past (US Past Simple)",
    },
    explanation: {
      es: "Cuentas historias en pasado, manejas compras y viajes, y comparas objetos. En el inglés de EE. UU. se prefiere el Past Simple con 'yesterday', 'just' y 'already'.",
      en: "You tell stories in the past, handle shopping and travel, and compare things. In US English, the Past Simple is preferred with 'yesterday', 'just', and 'already'.",
    },
    wrongExample: "Yesterday I go to the market and I buyed fruit.",
    rightExample: "Yesterday I went to the market and I bought fruit.",
    exercises: [
      {
        question: {
          es: "Completa la historia en pasado del Marinero de Cubierta: «Yesterday I ___ to the market and I bought fruit.»",
          en: "Complete the Deckhand's past story: 'Yesterday I ___ to the market and I bought fruit.'",
        },
        options: ["went", "go", "gone"],
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! El pasado simple irregular de 'go' es 'went', y el de 'buy' es 'bought'.",
          en: "Spot on! The irregular past simple of 'go' is 'went', and 'buy' becomes 'bought'.",
        },
      },
      {
        question: {
          es: "Elige la pregunta correcta en pasado sobre un viaje: «Where ___ you stay during your trip to Chicago?»",
          en: "Choose the correct past question about a trip: 'Where ___ you stay during your trip to Chicago?'",
        },
        options: ["did", "were", "do"],
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! Usamos «did» + sujeto + verbo base («stay») para preguntar sobre acciones terminadas en pasado.",
          en: "Correct! We use 'did' + subject + base verb ('stay') to ask about completed actions in the past.",
        },
      },
      {
        question: {
          es: "Selecciona la forma comparativa correcta al hacer compras: «This blue jacket is ___ than the gray one.»",
          en: "Select the correct comparative form while shopping: 'This blue jacket is ___ than the gray one.'",
        },
        options: ["cheaper", "more cheap", "cheapest"],
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! Los adjetivos cortos de una sílaba como «cheap» forman el comparativo con «-er» + «than».",
          en: "Great job! Short one-syllable adjectives like 'cheap' form the comparative with '-er' + 'than'.",
        },
      },
      {
        question: {
          es: "Completa la respuesta natural en inglés estadounidense con 'already': «No thanks, I ___ ate lunch twenty minutes ago.»",
          en: "Complete the natural US English response with 'already': 'No thanks, I ___ ate lunch twenty minutes ago.'",
        },
        options: ["already", "am already", "already have"],
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! En EE. UU. es muy común usar «already» directamente con Past Simple («I already ate»).",
          en: "Spot on! In US English, it is completely natural to pair 'already' with the Past Simple ('I already ate').",
        },
      },
    ],
  },
  b1: {
    title: {
      es: "Nivel 4: Marinero (Sailor) — Expresar Opiniones, Sueños y Motivos",
      en: "Level 4: Sailor — Expressing Opinions, Dreams & Reasons",
    },
    explanation: {
      es: "Mantienes conversaciones reales sobre trabajo, sueños y opiniones uniendo cláusulas con 'because', 'if', infinitivos, modales de consejo y el Present Perfect.",
      en: "You hold real conversations about work, dreams, and opinions by linking clauses with 'because', 'if', infinitives, advice modals, and the Present Perfect.",
    },
    wrongExample: "I think learning English is important because I want travel.",
    rightExample: "I think learning English is important because I want to travel.",
    exercises: [
      {
        question: {
          es: "Selecciona la estructura correcta para expresar tu opinión y meta: «I think learning English is important because I ___ to travel.»",
          en: "Select the correct structure to express your opinion and goal: 'I think learning English is important because I ___ to travel.'",
        },
        options: ["want", "wants", "wanting"],
        correctIndex: 0,
        feedback: {
          es: "¡Excelente, Marinero! «I want + to + infinitivo» («I want to travel») expresa propósitos y metas con claridad.",
          en: "Excellent, Sailor! 'I want + to + base verb' ('I want to travel') clearly expresses goals and intentions.",
        },
      },
      {
        question: {
          es: "Completa esta oración del Primer Condicional sobre planes laborales: «If I finish the report early, I ___ join the afternoon call.»",
          en: "Complete this First Conditional sentence about work plans: 'If I finish the report early, I ___ join the afternoon call.'",
        },
        options: ["will", "would", "did"],
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! En el Primer Condicional (situaciones reales futuras), usamos «If + Present Simple, will + verbo base».",
          en: "Correct! In the First Conditional (real future possibilities), we use 'If + Present Simple, will + base verb'.",
        },
      },
      {
        question: {
          es: "Elige la forma correcta para hablar de experiencia de vida hasta hoy: «She has ___ in three different countries so far.»",
          en: "Choose the correct form to talk about life experience up to now: 'She has ___ in three different countries so far.'",
        },
        options: ["worked", "work", "working"],
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! El Present Perfect («has + participio pasado») describe experiencias acumuladas hasta el presente.",
          en: "Well done! The Present Perfect ('has + past participle') describes life experiences up to the present.",
        },
      },
      {
        question: {
          es: "Completa el consejo profesional con un verbo modal adecuado: «You ___ back up your files before updating the laptop.»",
          en: "Complete the workplace advice with the right modal verb: 'You ___ back up your files before updating the laptop.'",
        },
        options: ["should", "must to", "should to"],
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! Después de verbos modales como «should», el verbo principal va en forma base sin «to».",
          en: "Exact! After modal verbs like 'should', the main verb stays in its base form without 'to'.",
        },
      },
    ],
  },
  b2: {
    title: {
      es: "Nivel 5: Contramaestre (Bosun) — Debatir Ventajas y Desventajas",
      en: "Level 5: Bosun — Debating Advantages, Disadvantages & Trade-offs",
    },
    explanation: {
      es: "Puedes debatir, evaluar alternativas ('weigh the trade-offs'), usar condicionales hipotéticos (2º Condicional), voz pasiva y conectores de contraste simétricos.",
      en: "You can debate, weigh trade-offs, use hypothetical conditionals (2nd Conditional), passive voice, and balanced discourse markers.",
    },
    wrongExample: "On the one hand, remote work is flexible. In the other hand, it can be lonely.",
    rightExample: "On the one hand, working from home is flexible. On the other hand, it can be lonely.",
    exercises: [
      {
        question: {
          es: "Completa el argumento de debate del Contramaestre: «On the one hand, working from home is flexible. ___ the other hand, it can be lonely.»",
          en: "Complete the Bosun's debate argument: 'On the one hand, working from home is flexible. ___ the other hand, it can be lonely.'",
        },
        options: ["On", "In", "At"],
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! El par correlativo en inglés siempre utiliza la preposición 'On': «On the one hand... On the other hand...».",
          en: "Correct! The correlative pair always uses the preposition 'On': 'On the one hand... On the other hand...'.",
        },
      },
      {
        question: {
          es: "Elige el conector de concesión seguido de un sustantivo: «___ the tight budget, the team delivered the app on time.»",
          en: "Choose the concession linker followed by a noun phrase: '___ the tight budget, the team delivered the app on time.'",
        },
        options: ["Despite", "Although", "Even though"],
        correctIndex: 0,
        feedback: {
          es: "¡Excelente! «Despite» (y «In spite of») va seguido de un sustantivo o gerundio, mientras que «Although» exige una cláusula con sujeto y verbo.",
          en: "Excellent! 'Despite' (and 'In spite of') is followed by a noun phrase or -ing form, whereas 'Although' requires a full subject + verb clause.",
        },
      },
      {
        question: {
          es: "Completa esta hipótesis de debate (Segundo Condicional): «If cities invested more in public transit, traffic congestion ___ drop significantly.»",
          en: "Complete this debate hypothesis (Second Conditional): 'If cities invested more in public transit, traffic congestion ___ drop significantly.'",
        },
        options: ["would", "will", "had"],
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! En el Segundo Condicional imaginamos escenarios presentes o futuros con «If + Past Simple, would + verbo base».",
          en: "Well done! In the Second Conditional, we express hypothetical scenarios using 'If + Past Simple, would + base verb'.",
        },
      },
      {
        question: {
          es: "Selecciona la voz pasiva correcta para un informe formal: «The quarterly results ___ reviewed by the finance committee yesterday.»",
          en: "Select the correct passive voice for a formal report: 'The quarterly results ___ reviewed by the finance committee yesterday.'",
        },
        options: ["were", "was", "have"],
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! «Results» es plural y la acción ocurrió ayer («yesterday»), por lo que usamos «were + participio pasado».",
          en: "Spot on! 'Results' is plural and the action happened yesterday, so we use 'were + past participle'.",
        },
      },
    ],
  },
  c1: {
    title: {
      es: "Nivel 6: Navegante (Navigator) — Oraciones Hendidas (Cleft) y Subjuntivo Mandativo",
      en: "Level 6: Navigator — Pseudo-Cleft Sentences & US Mandative Subjunctive",
    },
    explanation: {
      es: "Usas inglés en entornos profesionales o académicos: oraciones hendidas con 'What...' para aclarar subtexto, subjuntivo mandativo ('recommend that he be'), e inversión negativa.",
      en: "You use English at work or university: 'What...' pseudo-cleft sentences to clarify implied meaning, the mandative subjunctive ('recommend that he be'), and negative inversion.",
    },
    wrongExample: "That she really meant was that the project was behind schedule.",
    rightExample: "What she really meant was that the project was already behind schedule.",
    exercises: [
      {
        question: {
          es: "Completa la oración de nivel Navegante para enfatizar el significado implícito: «___ she really meant was that the project was already behind schedule.»",
          en: "Complete the Navigator-level sentence to emphasize implied meaning: '___ she really meant was that the project was already behind schedule.'",
        },
        options: ["What", "Which", "How"],
        correctIndex: 0,
        feedback: {
          es: "¡Brillante, Navegante! «What she really meant was...» (The thing that she meant) focaliza la intención oculta del hablante.",
          en: "Brilliant, Navigator! 'What she really meant was...' focuses attention on the speaker's underlying meaning.",
        },
      },
      {
        question: {
          es: "Elige la forma del Subjuntivo Mandativo estándar en EE. UU.: «The auditor recommended that the database ___ encrypted immediately.»",
          en: "Choose the standard US Mandative Subjunctive form: 'The auditor recommended that the database ___ encrypted immediately.'",
        },
        options: ["be", "is", "was"],
        correctIndex: 0,
        feedback: {
          es: "¡Impecable! Tras verbos de exigencia o recomendación («recommend, insist, suggest + that»), el inglés estadounidense formal usa el verbo en forma base («be»).",
          en: "Impeccable! After verbs of urgency or recommendation ('recommend, insist, suggest + that'), formal US English uses the bare infinitive ('be').",
        },
      },
      {
        question: {
          es: "Completa esta inversión enfática negativa para un ensayo o presentación: «Not only ___ the team meet the deadline, but they also reduced costs.»",
          en: "Complete this negative emphatic inversion for an essay or presentation: 'Not only ___ the team meet the deadline, but they also reduced costs.'",
        },
        options: ["did", "has", "was"],
        correctIndex: 0,
        feedback: {
          es: "¡Excelente! Cuando «Not only» inicia la oración, invertimos el auxiliar antes del sujeto («Not only did the team meet...»).",
          en: "Excellent! When 'Not only' opens a sentence, we invert the auxiliary before the subject ('Not only did the team meet...').",
        },
      },
      {
        question: {
          es: "Selecciona la cláusula participial correcta para mayor concisión ejecutiva: «___ the client's concerns, we revised the proposal overnight.»",
          en: "Select the correct participle clause for executive conciseness: '___ the client's concerns, we revised the proposal overnight.'",
        },
        options: ["Having heard", "Heard", "To hearing"],
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! «Having + participio pasado» expresa una acción completada justo antes de la cláusula principal.",
          en: "Well done! 'Having + past participle' expresses an action completed immediately prior to the main clause.",
        },
      },
    ],
  },
  c2: {
    title: {
      es: "Nivel 7: Capitán (Captain) — Inversión Condicional y Matices de Registro Culto",
      en: "Level 7: Captain — Inverted Conditionals & High-Register Nuance",
    },
    explanation: {
      es: "Expresas matices con precisión de hablante nativo culto: inversiones condicionales sin 'if' ('Had we...', 'Were they...', 'Should you...'), condicionales mixtos y registro académico.",
      en: "You express nuance like a highly educated native speaker: inverted conditionals without 'if' ('Had we...', 'Were they...', 'Should you...'), mixed conditionals, and academic register.",
    },
    wrongExample: "If we would have set sail earlier, we had avoided the storm.",
    rightExample: "Had we set sail earlier, we would have avoided the storm entirely.",
    exercises: [
      {
        question: {
          es: "Elige la estructura de rango Capitán: «___ we set sail earlier, we would have avoided the storm entirely.»",
          en: "Choose the Captain-rank structure: '___ we set sail earlier, we would have avoided the storm entirely.'",
        },
        options: ["Had", "Would have", "Were"],
        correctIndex: 0,
        feedback: {
          es: "¡Maestría de Capitán! «Had we set sail earlier...» invierte el auxiliar del pasado perfecto para lograr la máxima elegancia estilística.",
          en: "Captain Mastery! 'Had we set sail earlier...' inverts the past perfect auxiliary for high-register precision.",
        },
      },
      {
        question: {
          es: "Completa esta inversión formal de Segundo Condicional: «___ the board to approve the merger today, the stock would surge tomorrow.»",
          en: "Complete this formal Second Conditional inversion: '___ the board to approve the merger today, the stock would surge tomorrow.'",
        },
        options: ["Were", "Was", "Had"],
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! «Were + sujeto + to + infinitivo» sustituye a «If the board approved / were to approve» en discursos legales y ejecutivos.",
          en: "Spot on! 'Were + subject + to-infinitive' replaces 'If the board were to approve' in executive and legal prose.",
        },
      },
      {
        question: {
          es: "Elige la inversión condicional más cortés para correspondencia formal: «___ you require any further clarification, please do not hesitate to reach out.»",
          en: "Choose the most polite formal conditional inversion: '___ you require any further clarification, please do not hesitate to reach out.'",
        },
        options: ["Should", "Would", "Could"],
        correctIndex: 0,
        feedback: {
          es: "¡Brillante! «Should you require...» equivale a «If you should happen to require...» y transmite máxima cortesía profesional.",
          en: "Brilliant! 'Should you require...' means 'If you happen to require...' and conveys polished professional courtesy.",
        },
      },
      {
        question: {
          es: "Completa este Condicional Mixto (pasado irreal con consecuencia presente): «If she had accepted that fellowship five years ago, she ___ leading the lab today.»",
          en: "Complete this Mixed Conditional (unreal past with present result): 'If she had accepted that fellowship five years ago, she ___ leading the lab today.'",
        },
        options: ["would be", "would have been", "will be"],
        correctIndex: 0,
        feedback: {
          es: "¡Dominio absoluto! Cuando una condición pasada irreal afecta el presente («today»), combinamos «If + Past Perfect» con «would be + -ing».",
          en: "Absolute mastery! When an unreal past condition affects the present ('today'), we pair 'If + Past Perfect' with 'would be + -ing'.",
        },
      },
    ],
  },
};

/* ==========================================================================
   2. Vocabulary & Pronunciation Data (7 Crew Ranks + US Phonetics)
   ========================================================================== */

const VOCAB_DATA = {
  a0: {
    exercises: [
      {
        word: "Hello & Numbers",
        ipa: "/həˈloʊ/",
        contrast: {
          es: "Nivel 1 (Terrícola ⚓): Sonidos básicos del alfabeto, aspiración suave de /h/ y diptongo /oʊ/.",
          en: "Level 1 (Landlubber ⚓): Basic alphabet sounds, gentle /h/ aspiration, and diphthong /oʊ/.",
        },
        definition: {
          es: "Palabras esenciales de cortesía y saludo: hello (hola), thank you (gracias), one, two, three.",
          en: "Essential first words of greeting and courtesy: hello, thank you, one, two, three.",
        },
        example: "Hello, my name is Roberto. Thank you!",
        question: {
          es: "En «thank you» (/θæŋk juː/), ¿cómo se produce el sonido inicial «th» /θ/?",
          en: "In 'thank you' (/θæŋk juː/), how is the initial 'th' sound /θ/ articulated?",
        },
        options: {
          es: [
            "Colocando suavemente la punta de la lengua entre los dientes y soplando aire sin vibrar.",
            "Cerrando ambos labios por completo como en una /p/.",
            "Tocando el velo del paladar con la parte posterior de la lengua como en /k/.",
          ],
          en: [
            "Gently placing the tongue tip between the teeth and blowing air without voicing.",
            "Closing both lips completely as in /p/.",
            "Touching the soft palate with the back of the tongue as in /k/.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien, Terrícola! El sonido /θ/ es interdental sordo, clave desde tus primeras palabras en inglés.",
          en: "Well done, Landlubber! The /θ/ phoneme is a voiceless dental fricative, essential from your very first words.",
        },
      },
      {
        word: "Morning & Coffee",
        ipa: "/ˈmɔːr.nɪŋ/ • /ˈkɔː.fi/",
        contrast: {
          es: "Nivel 1 (Terrícola ⚓): La 'r' inglesa (/r/) se pronuncia sin tocar el paladar con la punta de la lengua.",
          en: "Level 1 (Landlubber ⚓): The English /r/ is pronounced without the tongue tip tapping the roof of the mouth.",
        },
        definition: {
          es: "Vocabulario básico de la mañana: morning (mañana), coffee (café), water (agua).",
          en: "Basic morning vocabulary: morning, coffee, water.",
        },
        example: "Good morning! One coffee, please.",
        question: {
          es: "Si entras a una cafetería por la mañana, ¿qué frase corta y cortés usas para pedir un café?",
          en: "If you walk into a coffee shop in the morning, which short polite phrase do you use to order?",
        },
        options: {
          es: [
            "«Good morning! One coffee, please.»",
            "«Good night! Zero coffee, bye.»",
            "«Hello, my table is coffee.»",
          ],
          en: [
            "'Good morning! One coffee, please.'",
            "'Good night! Zero coffee, bye.'",
            "'Hello, my table is coffee.'",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Excelente! «Please» y «Thank you» son la base de la cortesía diaria en inglés.",
          en: "Excellent! 'Please' and 'Thank you' are the foundation of everyday courtesy in English.",
        },
      },
      {
        word: "Phone & Address",
        ipa: "/foʊn/ • /ˈæd.res/",
        contrast: {
          es: "Nivel 1 (Terrícola ⚓): El dígrafo 'ph' en «phone» siempre suena como /f/, igual que en «photo».",
          en: "Level 1 (Landlubber ⚓): The digraph 'ph' in 'phone' always sounds like /f/, just like in 'photo'.",
        },
        definition: {
          es: "Datos básicos de contacto: phone number (número de teléfono), email (correo), address (dirección).",
          en: "Basic contact details: phone number, email, address.",
        },
        example: "My phone number is five-five-five, zero-one-two.",
        question: {
          es: "¿Cómo se pronuncian las letras «ph» en palabras como «phone» y «photo»?",
          en: "How are the letters 'ph' pronounced in words like 'phone' and 'photo'?",
        },
        options: {
          es: [
            "Como el sonido /f/ (labiodental suave).",
            "Como una /p/ seguida de una /h/ fuerte.",
            "Son completamente mudas.",
          ],
          en: [
            "Like the /f/ sound (voiceless labiodental).",
            "Like a /p/ followed by a hard /h/.",
            "They are completely silent.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! «Ph» representa el fonema /f/: /foʊn/ y /ˈfoʊ.t̬oʊ/.",
          en: "Correct! 'Ph' represents the /f/ phoneme: /foʊn/ and /ˈfoʊ.t̬oʊ/.",
        },
      },
      {
        word: "Days & Colors",
        ipa: "/ˈmʌn.deɪ/ • /bluː/",
        contrast: {
          es: "Nivel 1 (Terrícola ⚓): En los días de la semana («Monday», «Friday»), la sílaba final «-day» lleva el diptongo /eɪ/.",
          en: "Level 1 (Landlubber ⚓): In days of the week ('Monday', 'Friday'), the final '-day' carries the /eɪ/ diphthong.",
        },
        definition: {
          es: "Vocabulario esencial: Monday (lunes), Tuesday (martes), red (rojo), blue (azul), green (verde).",
          en: "Essential vocabulary: Monday, Tuesday, red, blue, green.",
        },
        example: "My English class is on Monday and Wednesday.",
        question: {
          es: "¿Qué preposición se usa en inglés antes de los días de la semana («___ Monday»)?",
          en: "Which preposition is used in English before days of the week ('___ Monday')?",
        },
        options: {
          es: ["on", "in", "at"],
          en: ["on", "in", "at"],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! Con días de la semana y fechas siempre usamos «on»: «on Monday», «on Friday».",
          en: "Well done! With days of the week and dates we always use 'on': 'on Monday', 'on Friday'.",
        },
      },
    ],
  },
  a1: {
    exercises: [
      {
        word: "Water & City (Flap T)",
        ipa: "/ˈwɔː.ɾɚ/ • /ˈsɪ.ɾi/",
        contrast: {
          es: "Nivel 2 (Grumete 🪣): En inglés de EE. UU., la /t/ entre dos vocales suena como una 'r' suave española (/ɾ/): «wah-der», «sih-dee».",
          en: "Level 2 (Cabin Mate 🪣): In US English, intervocalic /t/ becomes a quick alveolar tap (/ɾ/): 'wah-der', 'sih-dee'.",
        },
        definition: {
          es: "Regla del Flap T estadounidense: cuando /t/ o /d/ va entre vocales y la segunda sílaba no lleva acento.",
          en: "American Flap T rule: when /t/ or /d/ sits between two vowel sounds and the second syllable is unstressed.",
        },
        example: "I live in the city and drink water every day.",
        question: {
          es: "¿Cómo articula un hablante nativo de EE. UU. la «t» en palabras cotidianas como «water», «better» y «city»?",
          en: "How does a native US speaker articulate the 't' in everyday words like 'water', 'better', and 'city'?",
        },
        options: {
          es: [
            "Con un toque rápido de la lengua en el paladar (Flap T /ɾ/, parecido a la 'r' de 'pero').",
            "Como una /k/ fuerte al final de la garganta.",
            "Omitiendo por completo la segunda sílaba.",
          ],
          en: [
            "With a quick tap of the tongue against the alveolar ridge (Flap T /ɾ/, like a light 'd').",
            "As a hard /k/ at the back of the throat.",
            "By dropping the second syllable completely.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Exacto, Grumete! El Flap T (/ɾ/) es uno de los rasgos más característicos del inglés estadounidense.",
          en: "Spot on, Cabin Mate! The Flap T (/ɾ/) is one of the defining features of natural American English.",
        },
      },
      {
        word: "Family & Breakfast",
        ipa: "/ˈfæm.ə.li/ • /ˈbrek.fəst/",
        contrast: {
          es: "Nivel 2 (Grumete 🪣): En «breakfast», la segunda sílaba es átona y se reduce a schwa /ə/: /ˈbrek.fəst/ (no 'fast').",
          en: "Level 2 (Cabin Mate 🪣): In 'breakfast', the second syllable is unstressed and reduces to schwa /ə/: /ˈbrek.fəst/.",
        },
        definition: {
          es: "Rutina familiar diaria: parents (padres), siblings (hermanos), breakfast (desayuno), dinner (cena).",
          en: "Daily family routine: parents, siblings, breakfast, dinner.",
        },
        example: "I eat breakfast with my family at seven-thirty.",
        question: {
          es: "¿Por qué la palabra «breakfast» se pronuncia /ˈbrek.fəst/ y no con el sonido abierto de «fast» (/fæst/)?",
          en: "Why is 'breakfast' pronounced /ˈbrek.fəst/ rather than with the full vowel of 'fast' (/fæst/)?",
        },
        options: {
          es: [
            "Porque la segunda sílaba no lleva acento y su vocal se reduce al sonido neutro schwa /ə/.",
            "Porque la letra 'a' siempre es muda al final de las palabras.",
            "Porque se pronuncia igual que 'break' + 'first'.",
          ],
          en: [
            "Because the second syllable is unstressed, so its vowel reduces to the neutral schwa /ə/.",
            "Because the letter 'a' is always silent at the end of words.",
            "Because it is pronounced like 'break' + 'first'.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! El sonido schwa (/ə/) aparece en las sílabas sin acento para dar ritmo natural al inglés.",
          en: "Well done! The schwa (/ə/) appears in unstressed syllables to give English its natural rhythm.",
        },
      },
      {
        word: "Grocery & Kitchen",
        ipa: "/ˈɡroʊ.sɚ.i/ • /ˈkɪtʃ.ən/",
        contrast: {
          es: "Nivel 2 (Grumete 🪣): En «kitchen», la 't' antes de 'ch' refuerza la oclusión de /tʃ/, y la terminación '-en' se reduce a /ən/.",
          en: "Level 2 (Cabin Mate 🪣): In 'kitchen', 'tch' produces /tʃ/ while '-en' reduces to /ən/.",
        },
        definition: {
          es: "Lugares del hogar y compras: grocery store (supermercado), kitchen (cocina), bedroom (habitación).",
          en: "Home and shopping places: grocery store, kitchen, bedroom.",
        },
        example: "I cook dinner in the kitchen after visiting the grocery store.",
        question: {
          es: "Si necesitas comprar frutas, leche y pan para la casa, ¿a qué lugar vas?",
          en: "If you need to buy fruit, milk, and bread for your home, where do you go?",
        },
        options: {
          es: [
            "To the grocery store.",
            "To the post office.",
            "To the library.",
          ],
          en: [
            "To the grocery store.",
            "To the post office.",
            "To the library.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! En inglés estadounidense, «grocery store» (o «supermarket») es la tienda de alimentos.",
          en: "Correct! In US English, 'grocery store' is the standard everyday word for a food market.",
        },
      },
      {
        word: "Commute & Schedule",
        ipa: "/kəˈmjuːt/ • /ˈskedʒ.uːl/",
        contrast: {
          es: "Nivel 2 (Grumete 🪣): En inglés de EE. UU., «schedule» empieza con /sk/ («skeh-jool»).",
          en: "Level 2 (Cabin Mate 🪣): In US English, 'schedule' starts with /sk/ ('skeh-jool').",
        },
        definition: {
          es: "Commute = trayecto diario al trabajo o escuela. Schedule = horario o agenda del día.",
          en: "Commute = daily travel to work or school. Schedule = daily timetable or plan.",
        },
        example: "My morning commute takes twenty minutes by bus.",
        question: {
          es: "¿Qué significa la palabra «commute» cuando hablas de tu rutina diaria?",
          en: "What does the word 'commute' mean when talking about your daily routine?",
        },
        options: {
          es: [
            "El trayecto regular de ida y vuelta entre tu casa y tu trabajo o escuela.",
            "La hora de dormir los fines de semana.",
            "Una llamada rápida por teléfono.",
          ],
          en: [
            "The regular daily trip between your home and your workplace or school.",
            "Your bedtime on weekends.",
            "A quick phone call.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! «Commute» funciona tanto como sustantivo («my morning commute») como verbo («I commute by train»).",
          en: "Exact! 'Commute' works both as a noun ('my morning commute') and as a verb ('I commute by train').",
        },
      },
    ],
  },
  a2: {
    exercises: [
      {
        word: "Hold on & Turn off",
        ipa: "/hoʊl.dɑːn/ • /tɝː.nɔːf/",
        contrast: {
          es: "Nivel 3 (Marinero de Cubierta 🪢): En habla conectada (Linking), la consonante final se une a la vocal inicial siguiente.",
          en: "Level 3 (Deckhand 🪢): In Connected Speech linking, a final consonant links directly into the next word's initial vowel.",
        },
        definition: {
          es: "Linking Consonante-a-Vocal: «Hold on» suena /hol-don/ y «Check it out» suena /tʃɛkɪdaʊt/.",
          en: "Consonant-to-Vowel Linking: 'Hold on' sounds like /hol-don/ and 'Check it out' links into /tʃɛkɪdaʊt/.",
        },
        example: "Please hold on while I check it out.",
        question: {
          es: "En el habla fluida de EE. UU. (Connected Speech), ¿cómo se enlaza acústicamente la frase «check it out»?",
          en: "In natural US connected speech, how is the phrase 'check it out' acoustically linked?",
        },
        options: {
          es: [
            "Las palabras se enlazan sin pausas como /tʃɛkɪdaʊt/ («che-ki-dout»).",
            "Se hace una pausa larga de dos segundos entre cada palabra.",
            "No se pronuncia la palabra 'out'.",
          ],
          en: [
            "The words link smoothly without pauses as /tʃɛkɪdaʊt/ ('che-ki-dout').",
            "A two-second pause is placed between each word.",
            "The word 'out' is omitted.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Excelente! El enlace consonante-vocal y el Flap T fusionan «check it out» en una sola cadena rítmica.",
          en: "Excellent! Consonant-to-vowel linking and the Flap T merge 'check it out' into one smooth rhythmic unit.",
        },
      },
      {
        word: "Mountain & Button (Glottal Stop)",
        ipa: "/ˈmaʊn.ʔn̩/ • /ˈbʌʔ.n̩/",
        contrast: {
          es: "Nivel 3 (Marinero de Cubierta 🪢): Ante una 'n' silábica (-tain, -ton), la /t/ en EE. UU. se vuelve un corte glótico (/ʔ/): «moun'n».",
          en: "Level 3 (Deckhand 🪢): Before a syllabic 'n' (-tain, -ton), US /t/ becomes a glottal stop (/ʔ/): 'moun'n'.",
        },
        definition: {
          es: "Glottal Stop (/ʔ/): breve cierre en la garganta antes de /n/ en palabras como mountain, button, written.",
          en: "Glottal Stop (/ʔ/): brief closure at the vocal cords before /n/ in words like mountain, button, written.",
        },
        example: "Press the green button to book the mountain hotel.",
        question: {
          es: "¿Qué ocurre con la «t» en palabras como «mountain» y «button» en inglés estadounidense natural?",
          en: "What happens to the 't' in words like 'mountain' and 'button' in natural US English?",
        },
        options: {
          es: [
            "Se reemplaza por un corte breve en la garganta (Glottal Stop /ʔ/) antes de la 'n'.",
            "Se pronuncia como una /s/ larga.",
            "Se duplica como 't-t' con mucha fuerza.",
          ],
          en: [
            "It is replaced by a brief glottal stop (/ʔ/) right before the 'n'.",
            "It is pronounced like a long /s/.",
            "It is doubled as a heavy 't-t' sound.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! El Glottal Stop (/ʔ/) hace que «mountain» y «button» suenen mucho más naturales en EE. UU.",
          en: "Great! The Glottal Stop (/ʔ/) makes 'mountain' and 'button' sound natural in everyday American speech.",
        },
      },
      {
        word: "Receipt & Refund",
        ipa: "/rɪˈsiːt/ • /ˈriː.fʌnd/",
        contrast: {
          es: "Nivel 3 (Marinero de Cubierta 🪢): En «receipt», la letra 'p' es completamente muda (/rɪˈsiːt/).",
          en: "Level 3 (Deckhand 🪢): In 'receipt', the letter 'p' is completely silent (/rɪˈsiːt/).",
        },
        definition: {
          es: "Compras y viajes: receipt (recibo/ticket), refund (reembolso), exchange (cambio de producto).",
          en: "Shopping & travel: receipt, refund, exchange.",
        },
        example: "Keep your receipt in case you need a refund.",
        question: {
          es: "Si compras una camisa de talla equivocada y quieres que te devuelvan el dinero, ¿qué pides en la tienda?",
          en: "If you buy a shirt in the wrong size and want your money back, what do you ask for at the store?",
        },
        options: {
          es: [
            "A refund (with your receipt).",
            "A boarding pass.",
            "A departure gate.",
          ],
          en: [
            "A refund (with your receipt).",
            "A boarding pass.",
            "A departure gate.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! Y recuerda que la 'p' de «receipt» nunca se pronuncia: /rɪˈsiːt/.",
          en: "Correct! And remember the 'p' in 'receipt' is always silent: /rɪˈsiːt/.",
        },
      },
      {
        word: "Luggage & Boarding Pass",
        ipa: "/ˈlʌɡ.ɪdʒ/ • /ˈbɔːr.dɪŋ pæs/",
        contrast: {
          es: "Nivel 3 (Marinero de Cubierta 🪢): En «luggage», la terminación '-age' se reduce a /ɪdʒ/ («luh-gij»), nunca /eɪdʒ/.",
          en: "Level 3 (Deckhand 🪢): In 'luggage', the '-age' ending reduces to /ɪdʒ/ ('luh-gij'), never /eɪdʒ/.",
        },
        definition: {
          es: "Viajes en aeropuerto: luggage (equipaje, incontable), boarding pass (pase de abordar), delay (retraso).",
          en: "Airport travel: luggage (uncountable), boarding pass, delay.",
        },
        example: "Show your boarding pass at the gate before checking your luggage.",
        question: {
          es: "¿Cuál de estas frases sobre equipaje es gramaticalmente correcta en inglés?",
          en: "Which of these sentences about luggage is grammatically correct in English?",
        },
        options: {
          es: [
            "«I have two pieces of luggage.» (incontable, sin 's').",
            "«I have two luggages.»",
            "«I have a luggage very bigs.»",
          ],
          en: [
            "'I have two pieces of luggage.' (uncountable, no 's').",
            "'I have two luggages.'",
            "'I have a luggage very bigs.'",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! «Luggage» es incontable en inglés; para contar maletas usamos «bags», «suitcases» o «pieces of luggage».",
          en: "Exact! 'Luggage' is uncountable in English; to count items we say 'bags', 'suitcases', or 'pieces of luggage'.",
        },
      },
    ],
  },
  b1: {
    exercises: [
      {
        word: "Call off & Figure out",
        ipa: "/kɔːl ɔːf/ • /ˈfɪɡ.jɚ aʊt/",
        contrast: {
          es: "Nivel 4 (Marinero ⛵): Extracción de oraciones (Sentence Mining con Regla 1T) para dominar phrasal verbs laborales.",
          en: "Level 4 (Sailor ⛵): Sentence Mining (One-Target 1T Rule) to master essential workplace phrasal verbs.",
        },
        definition: {
          es: "Call off = cancelar un evento programado. Figure out = resolver o comprender un problema.",
          en: "Call off = to cancel a scheduled event. Figure out = to solve or understand a problem.",
        },
        example: "We had to call off the meeting to figure out the root cause.",
        question: {
          es: "Según el método de Sentence Mining (Regla 1T), ¿qué significa «call off» en «The board decided to call off the merger»?",
          en: "In 'The board decided to call off the merger', what does the phrasal verb 'call off' mean?",
        },
        options: {
          es: [
            "Cancelar algo que estaba planeado o programado (To cancel).",
            "Llamar por teléfono desde una distancia lejana.",
            "Aplaudir al final de una presentación.",
          ],
          en: [
            "To cancel something that was planned or scheduled.",
            "To call someone on the phone from far away.",
            "To applaud at the end of a presentation.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto, Marinero! «Call off» significa cancelar formalmente una reunión, despliegue o proyecto.",
          en: "Correct, Sailor! 'Call off' means to cancel a planned deployment, meeting, or event.",
        },
      },
      {
        word: "Follow up & Touch base",
        ipa: "/ˈfɑː.loʊ ʌp/ • /tʌtʃ beɪs/",
        contrast: {
          es: "Nivel 4 (Marinero ⛵): En EE. UU., «follow up» lleva acento principal en 'fol-' cuando es verbo («follow UP») y en 'FOL-' cuando es sustantivo («a FOLlow-up»).",
          en: "Level 4 (Sailor ⛵): In US English, 'follow UP' stresses the particle as a verb, while 'a FOLlow-up' stresses the first word as a noun.",
        },
        definition: {
          es: "Follow up = dar seguimiento a un tema. Touch base = ponerse en contacto brevemente para actualizarse.",
          en: "Follow up = check on or continue an earlier action. Touch base = briefly reconnect to share an update.",
        },
        example: "Let's touch base on Monday so I can follow up with the client.",
        question: {
          es: "Si un compañero te escribe «Let's touch base tomorrow morning», ¿qué propone hacer?",
          en: "If a teammate writes 'Let's touch base tomorrow morning', what are they proposing?",
        },
        options: {
          es: [
            "Tener una breve puesta al día para coordinar avances.",
            "Cancelar el proyecto definitivamente.",
            "Mudarse a otra oficina.",
          ],
          en: [
            "Have a brief check-in to share updates and align.",
            "Cancel the project permanently.",
            "Move to a different office building.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! «Touch base» viene del béisbol estadounidense y significa hacer un contacto rápido de actualización.",
          en: "Well done! 'Touch base' comes from American baseball and means having a quick check-in.",
        },
      },
      {
        word: "Look forward to",
        ipa: "/lʊk ˈfɔːr.wɚd tuː/",
        contrast: {
          es: "Nivel 4 (Marinero ⛵): En habla rápida, «to» en «look forward to» se reduce a /tə/ cuando va antes de un gerundio (-ing).",
          en: "Level 4 (Sailor ⛵): In fast speech, 'to' in 'look forward to' reduces to /tə/ before an -ing verb.",
        },
        definition: {
          es: "Look forward to + sustantivo o verbo en -ing = esperar con ilusión o entusiasmo un evento futuro.",
          en: "Look forward to + noun or -ing verb = anticipate a future event with pleasure.",
        },
        example: "I am looking forward to meeting the new design team.",
        question: {
          es: "¿Qué forma verbal debe ir después de «look forward to» en un correo profesional?",
          en: "Which verb form must follow 'look forward to' in a professional email?",
        },
        options: {
          es: [
            "Verbo terminado en -ing («looking forward to hearing from you»).",
            "Verbo en pasado simple («looking forward to heard»).",
            "Otro 'to' extra («looking forward to to hear»).",
          ],
          en: [
            "An -ing gerund ('looking forward to hearing from you').",
            "A past simple verb ('looking forward to heard').",
            "An extra 'to' ('looking forward to to hear').",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! Aquí «to» es preposición, por eso siempre exige sustantivo o gerundio (-ing): «I look forward to seeing you».",
          en: "Spot on! Here 'to' is a preposition, so it always takes a noun or -ing gerund: 'I look forward to seeing you.'",
        },
      },
      {
        word: "Run out of & Put off",
        ipa: "/rʌn aʊt əv/ • /pʊt ɔːf/",
        contrast: {
          es: "Nivel 4 (Marinero ⛵): En «run out of», las palabras se enlazan como /rʌˈnaʊ.ɾəv/ usando Flap T y reducción de 'of' a /əv/.",
          en: "Level 4 (Sailor ⛵): In 'run out of', the words link as /rʌˈnaʊ.ɾəv/ with a Flap T and reduced 'of' (/əv/).",
        },
        definition: {
          es: "Run out of = quedarse sin existencias o tiempo. Put off = posponer o aplazar algo.",
          en: "Run out of = have none left. Put off = postpone or delay something.",
        },
        example: "Don't put off the backup until we run out of storage.",
        question: {
          es: "Si tu equipo dice «We had to put off the launch because we ran out of time», ¿qué ocurrió?",
          en: "If your team says 'We had to put off the launch because we ran out of time', what happened?",
        },
        options: {
          es: [
            "Tuvieron que posponer el lanzamiento porque se quedaron sin tiempo.",
            "Adelantaron el lanzamiento porque tenían tiempo de sobra.",
            "Publicaron el lanzamiento por accidente.",
          ],
          en: [
            "They had to postpone the launch because they had no time left.",
            "They moved the launch earlier because they had plenty of time.",
            "They published the launch by mistake.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! «Put off» (posponer) y «run out of» (quedarse sin) son esenciales en conversaciones diarias y laborales.",
          en: "Correct! 'Put off' (postpone) and 'run out of' (have none left) are essential in daily and work conversations.",
        },
      },
    ],
  },
  b2: {
    exercises: [
      {
        word: "Bandwidth & Trade-offs",
        ipa: "/ˈbænd.wɪdθ/ • /ˈtreɪd.ɔːfs/",
        contrast: {
          es: "Nivel 5 (Contramaestre 🪈): Jerga corporativa de EE. UU. para debatir ventajas, desventajas y capacidad operativa.",
          en: "Level 5 (Bosun 🪈): US business metaphors for debating advantages, disadvantages, and team capacity.",
        },
        definition: {
          es: "Bandwidth = capacidad temporal o mental para asumir un trabajo. Weigh the trade-offs = evaluar ventajas y desventajas.",
          en: "Bandwidth = time or mental capacity to take on work. Weigh the trade-offs = evaluate pros and cons.",
        },
        example: "Let's weigh the trade-offs before checking if the team has the bandwidth.",
        question: {
          es: "En una reunión en EE. UU., si un colega dice «I don't have the bandwidth for this project this week», ¿qué quiere decir?",
          en: "In a US meeting, if a colleague says 'I don't have the bandwidth for this project this week', what do they mean?",
        },
        options: {
          es: [
            "Que no tiene la capacidad de tiempo o carga operativa disponible esta semana.",
            "Que su conexión de cable de internet se desconectó físicamente.",
            "Que no le gusta el tema del proyecto.",
          ],
          en: [
            "They don't have the available time or workload capacity this week.",
            "Their home internet cable was physically unplugged.",
            "They dislike the topic of the project.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien, Contramaestre! «Bandwidth» se usa metafóricamente en EE. UU. para referirse a disponibilidad de tiempo y energía.",
          en: "Well done, Bosun! 'Bandwidth' is widely used in US workplaces to mean available time and operational capacity.",
        },
      },
      {
        word: "Bring up to speed",
        ipa: "/brɪŋ ʌp tə spiːd/",
        contrast: {
          es: "Nivel 5 (Contramaestre 🪈): En «up to speed», la preposición 'to' se reduce a /tə/ y 'speed' lleva el acento tónico de la frase.",
          en: "Level 5 (Bosun 🪈): In 'up to speed', 'to' reduces to /tə/ while 'speed' carries the primary phrasal stress.",
        },
        definition: {
          es: "Bring someone up to speed = poner al día a alguien con la información más reciente.",
          en: "Bring someone up to speed = give someone all the latest information so they are fully informed.",
        },
        example: "Can you bring me up to speed on the client's feedback?",
        question: {
          es: "Si regresas de vacaciones y pides «Please bring me up to speed on the Q3 launch», ¿qué estás solicitando?",
          en: "If you return from vacation and ask 'Please bring me up to speed on the Q3 launch', what are you asking for?",
        },
        options: {
          es: [
            "Que te actualicen con los datos y decisiones más recientes.",
            "Que conduzcan más rápido hacia la oficina.",
            "Que eliminen tu nombre del proyecto.",
          ],
          en: [
            "To be updated with the latest facts and decisions.",
            "To drive faster to the office.",
            "To remove your name from the project.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Excelente! «Bring someone up to speed» es una expresión estándar en equipos ágiles y entornos corporativos.",
          en: "Excellent! 'Bring someone up to speed' is a staple idiom in agile teams and corporate environments.",
        },
      },
      {
        word: "Ballpark figure",
        ipa: "/ˈbɔːl.pɑːrk ˈfɪɡ.jɚ/",
        contrast: {
          es: "Nivel 5 (Contramaestre 🪈): Palabra compuesta con acento principal en la primera sílaba ('BALLpark').",
          en: "Level 5 (Bosun 🪈): Compound noun with primary stress on the first syllable ('BALLpark').",
        },
        definition: {
          es: "Ballpark figure = una cifra aproximada o estimación razonable (no exacta).",
          en: "Ballpark figure = a rough numerical estimate rather than an exact count.",
        },
        example: "We don't need an exact quote yet—just give us a ballpark figure.",
        question: {
          es: "Si un cliente te pide «a ballpark figure» para el presupuesto, ¿qué espera recibir?",
          en: "If a client asks you for 'a ballpark figure' for the budget, what do they expect?",
        },
        options: {
          es: [
            "Un cálculo aproximado o estimado general.",
            "Una factura legalmente vinculante al centavo.",
            "El precio de una entrada de estadio.",
          ],
          en: [
            "A rough estimate or approximate number.",
            "A legally binding invoice down to the exact cent.",
            "The price of a stadium ticket.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! También se usa la frase «in the ballpark of \$5,000» para indicar aproximación.",
          en: "Correct! You can also say 'in the ballpark of \$5,000' to give an approximate range.",
        },
      },
      {
        word: "Get the ball rolling",
        ipa: "/ɡɛt ðə bɔːl ˈroʊ.lɪŋ/",
        contrast: {
          es: "Nivel 5 (Contramaestre 🪈): En «get the», la /t/ final suele suavizarse o asimilarse antes de la fricativa /ð/.",
          en: "Level 5 (Bosun 🪈): In 'get the', the final /t/ is unreleased or assimilated smoothly before /ð/.",
        },
        definition: {
          es: "Get the ball rolling = iniciar una actividad, proyecto o conversación para generar impulso.",
          en: "Get the ball rolling = start an activity, project, or discussion so progress begins.",
        },
        example: "Let's review the agenda to get the ball rolling.",
        question: {
          es: "¿Cuándo es más natural usar la expresión «Let's get the ball rolling»?",
          en: "When is it most natural to say 'Let's get the ball rolling'?",
        },
        options: {
          es: [
            "Al comienzo de una reunión o proyecto para arrancar el trabajo.",
            "Cuando ya terminaste todas las tareas y te vas a dormir.",
            "Cuando quieres detener una discusión por completo.",
          ],
          en: [
            "At the start of a meeting or project to kick off the work.",
            "When you have finished every task and are going to sleep.",
            "When you want to shut down a discussion completely.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! Significa dar el primer paso para poner un proyecto en marcha.",
          en: "Spot on! It means taking the first step to set a project in motion.",
        },
      },
    ],
  },
  c1: {
    exercises: [
      {
        word: "Equivocal & Hedging",
        ipa: "/ɪˈkwɪv.ə.kəl/",
        contrast: {
          es: "Nivel 6 (Navegante 🧭): Precisión académica y mitigación diplomática (Hedging) en entornos ejecutivos.",
          en: "Level 6 (Navigator 🧭): Academic precision and diplomatic professional hedging in executive settings.",
        },
        definition: {
          es: "Equivocal = ambiguo, abierto a varias interpretaciones. Push back = presentar límites fundamentados ante un plazo.",
          en: "Equivocal = ambiguous, open to multiple interpretations. Push back = to object constructively to a request.",
        },
        example: "What she really meant was that the equivocal timeline required us to push back.",
        question: {
          es: "En lugar de decir bruscamente «That's completely wrong», ¿cuál es el estándar diplomático (Hedging) en EE. UU.?",
          en: "Instead of bluntly saying 'That's completely wrong', what is the diplomatic US workplace hedging standard?",
        },
        options: {
          es: [
            "«I have a slightly different perspective on this. Could you walk me through your reasoning?»",
            "«You made a big mistake and must fix it immediately.»",
            "«Nobody agrees with that idea.»",
          ],
          en: [
            "'I have a slightly different perspective on this. Could you walk me through your reasoning?'",
            "'You made a big mistake and must fix it immediately.'",
            "'Nobody agrees with that idea.'",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Impecable, Navegante! El hedging diplomático protege la colaboración del equipo mientras plantea una objeción técnica.",
          en: "Impeccable, Navigator! Diplomatic hedging preserves team collaboration while raising a technical objection.",
        },
      },
      {
        word: "Bite the bullet",
        ipa: "/baɪt ðə ˈbʊl.ɪt/",
        contrast: {
          es: "Nivel 6 (Navegante 🧭): Cuida la vocal corta relajada /ʊ/ en «bullet» (/ˈbʊl.ɪt/), distinta de /uː/ en «boot».",
          en: "Level 6 (Navigator 🧭): Notice the short lax vowel /ʊ/ in 'bullet' (/ˈbʊl.ɪt/), distinct from tense /uː/ in 'boot'.",
        },
        definition: {
          es: "Bite the bullet = aceptar con determinación una tarea difícil o desagradable pero inevitable.",
          en: "Bite the bullet = face a difficult, unpleasant, or unavoidable situation with resolve.",
        },
        example: "We had to bite the bullet and migrate the legacy database over the weekend.",
        question: {
          es: "En un informe universitario o de ingeniería, ¿qué significa «We need to bite the bullet and rewrite the module»?",
          en: "In a university or engineering briefing, what does 'We need to bite the bullet and rewrite the module' mean?",
        },
        options: {
          es: [
            "Asumir con firmeza una tarea difícil o costosa que ya no se puede postergar.",
            "Ignorar el problema hasta el próximo año.",
            "Celebrar que el módulo funciona sin cambios.",
          ],
          en: [
            "Accept and tackle a difficult, unavoidable task instead of delaying it further.",
            "Ignore the problem until next year.",
            "Celebrate that the module works with zero changes.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! «Bite the bullet» comunica madurez estratégica ante decisiones difíciles.",
          en: "Well done! 'Bite the bullet' conveys strategic resolve when facing tough trade-offs.",
        },
      },
      {
        word: "Move the needle",
        ipa: "/muːv ðə ˈniː.dəl/",
        contrast: {
          es: "Nivel 6 (Navegante 🧭): En «needle», la 'd' seguida de 'l' silábica produce /ˈniː.dəl/ sin pausa vocálica larga.",
          en: "Level 6 (Navigator 🧭): In 'needle', /d/ transitions directly into the syllabic /l/ (/ˈniː.dəl/).",
        },
        definition: {
          es: "Move the needle = generar un impacto medible y significativo en un indicador clave.",
          en: "Move the needle = make a noticeable, measurable difference on a key outcome.",
        },
        example: "Minor color tweaks won't move the needle on user retention.",
        question: {
          es: "Si una directora afirma «This initiative won't really move the needle», ¿qué está evaluando?",
          en: "If a director says 'This initiative won't really move the needle', what is she evaluating?",
        },
        options: {
          es: [
            "Que la iniciativa no producirá un cambio medible ni relevante en los resultados.",
            "Que una aguja física de costura está rota.",
            "Que el proyecto duplicará los ingresos de inmediato.",
          ],
          en: [
            "That the initiative will not produce a meaningful, measurable impact on results.",
            "That a physical sewing needle is broken.",
            "That the project will immediately double revenue.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! Es una metáfora muy frecuente en estrategia de producto, investigación y liderazgo.",
          en: "Exact! It is a high-frequency metaphor in product strategy, research, and executive reviews.",
        },
      },
      {
        word: "Read between the lines",
        ipa: "/riːd bɪˈtwiːn ðə laɪnz/",
        contrast: {
          es: "Nivel 6 (Navegante 🧭): La terminación '-s' en «lines» vibra como /z/ (/laɪnz/) tras consonante sonora /n/.",
          en: "Level 6 (Navigator 🧭): The plural '-s' in 'lines' is voiced as /z/ (/laɪnz/) after the voiced /n/.",
        },
        definition: {
          es: "Read between the lines = inferir el significado implícito que no se dijo de forma literal.",
          en: "Read between the lines = infer an unstated or subtle meaning from what someone says or writes.",
        },
        example: "Reading between the lines of the email, the vendor may miss the deadline.",
        question: {
          es: "¿Qué habilidad comunicativa describe la expresión «read between the lines»?",
          en: "Which communication skill does the idiom 'read between the lines' describe?",
        },
        options: {
          es: [
            "Detectar intenciones, matices o advertencias implícitas que no aparecen explícitamente.",
            "Leer únicamente los números de página de un libro.",
            "Memorizar un texto palabra por palabra sin entenderlo.",
          ],
          en: [
            "Detecting implied intentions, nuances, or warnings not stated explicitly.",
            "Reading only the page numbers of a book.",
            "Memorizing a text word-for-word without understanding it.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Brillante! Interpretar mensajes implícitos es clave en el nivel Navegante (C1).",
          en: "Brilliant! Interpreting implied meaning is a core Navigator (C1) skill.",
        },
      },
    ],
  },
  c2: {
    exercises: [
      {
        word: "Perspicacious",
        ipa: "/ˌpɜː.spɪˈkeɪ.ʃəs/",
        contrast: {
          es: "Nivel 7 (Capitán ☸️): Acento secundario en /ˌpɜː/ y primario en /ˈkeɪ/, propio del registro culto y literario.",
          en: "Level 7 (Captain ☸️): Secondary stress on /ˌpɜː/ and primary stress on /ˈkeɪ/, hallmark of educated C2 prosody.",
        },
        definition: {
          es: "adj. Perspicaz, sagaz; capaz de discernir matices complejos con rapidez y exactitud.",
          en: "adj. Having a ready insight into and keen discernment of subtle complexities.",
        },
        example: "Had we heeded her perspicacious warning earlier, we would have avoided the storm entirely.",
        question: {
          es: "¿Qué significa demostrar un análisis «perspicacious» al comandar una negociación compleja?",
          en: "What does it mean to demonstrate a 'perspicacious' analysis when commanding a complex negotiation?",
        },
        options: {
          es: [
            "Mostrar una agudeza mental y perspicacia excepcionales para captar detalles sutiles.",
            "Hablar de manera superficial sin revisar los datos.",
            "Posponer todas las decisiones indefinidamente.",
          ],
          en: [
            "Showing exceptional mental acuity and discernment for subtle details.",
            "Speaking superficially without checking the data.",
            "Postponing every decision indefinitely.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Dominio de Capitán! «Perspicacious» expresa el más alto grado de perspicacia analítica.",
          en: "Captain Mastery! 'Perspicacious' denotes acute discernment and intellectual insight.",
        },
      },
      {
        word: "Ubiquitous",
        ipa: "/juːˈbɪk.wɪ.təs/",
        contrast: {
          es: "Nivel 7 (Capitán ☸️): Comienza con la semivocal /j/ («yoo-BIK-wih-tuhs»), no con vocal pura /uː/.",
          en: "Level 7 (Captain ☸️): Begins with the palatal glide /j/ ('yoo-BIK-wih-tuhs'), not a pure vowel /uː/.",
        },
        definition: {
          es: "adj. Ubicuo, omnipresente; que parece estar en todas partes al mismo tiempo.",
          en: "adj. Present, appearing, or found everywhere simultaneously.",
        },
        example: "Cloud computing has become ubiquitous across modern research institutions.",
        question: {
          es: "En un artículo académico, si algo se describe como «ubiquitous», ¿qué característica tiene?",
          en: "In an academic paper, if something is described as 'ubiquitous', what characteristic does it have?",
        },
        options: {
          es: [
            "Está presente de manera generalizada en casi todos los ámbitos.",
            "Es sumamente raro y casi imposible de encontrar.",
            "Pertenece exclusivamente a la antigüedad clásica.",
          ],
          en: [
            "It is widespread and present virtually everywhere.",
            "It is exceedingly rare and almost impossible to find.",
            "It belongs exclusively to classical antiquity.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Impecable! «Ubiquitous» aporta elegancia y concisión en ensayos y ponencias de alto nivel.",
          en: "Impeccable! 'Ubiquitous' brings precision and conciseness to high-level essays and keynotes.",
        },
      },
      {
        word: "Ostensibly",
        ipa: "/ɑːˈsten.sə.bli/",
        contrast: {
          es: "Nivel 7 (Capitán ☸️): El acento recae en la segunda sílaba ('-STEN-') y el sufijo '-ibly' se pronuncia /ə.bli/.",
          en: "Level 7 (Captain ☸️): Stress falls on the second syllable ('-STEN-') while '-ibly' reduces to /ə.bli/.",
        },
        definition: {
          es: "adv. Aparentemente, supuestamente (a menudo sugiriendo que la razón real es otra).",
          en: "adv. Apparently or purportedly, often implying the true motive differs from the stated one.",
        },
        example: "The policy was ostensibly designed to cut costs, though critics noted other motives.",
        question: {
          es: "¿Qué matiz sutil introduce el adverbio «ostensibly» en una argumentación crítica?",
          en: "What subtle nuance does the adverb 'ostensibly' introduce in a critical argument?",
        },
        options: {
          es: [
            "Señala que algo se presenta con un propósito aparente, dejando entrever escepticismo sobre su motivo real.",
            "Garantiza con 100% de certeza matemática que la afirmación es indiscutible.",
            "Indica que el evento ocurrió hace menos de cinco minutos.",
          ],
          en: [
            "It signals a stated or apparent purpose while subtly hinting skepticism about the true motive.",
            "It guarantees with 100% mathematical certainty that the claim is indisputable.",
            "It indicates the event occurred less than five minutes ago.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Excelente! Usar «ostensibly» te permite expresar escepticismo diplomático con una sola palabra.",
          en: "Excellent! Using 'ostensibly' lets you express measured skepticism in a single word.",
        },
      },
      {
        word: "Ephemeral",
        ipa: "/ɪˈfem.ɚ.əl/",
        contrast: {
          es: "Nivel 7 (Capitán ☸️): Acento en la segunda sílaba ('-FEM-'), mientras la primera y últimas sílabas se relajan.",
          en: "Level 7 (Captain ☸️): Stress falls on the second syllable ('-FEM-'), while surrounding syllables remain unstressed.",
        },
        definition: {
          es: "adj. Efímero, pasajero; que dura muy poco tiempo.",
          en: "adj. Lasting for a very short time; transitory.",
        },
        example: "Online viral trends are often ephemeral compared with lasting cultural shifts.",
        question: {
          es: "¿Cuál es el antónimo directo de «ephemeral» en un texto literario o filosófico?",
          en: "Which word is the direct antonym of 'ephemeral' in a literary or philosophical text?",
        },
        options: {
          es: [
            "Enduring / Perpetual (duradero, perpetuo).",
            "Fleeting (fugaz).",
            "Momentary (momentáneo).",
          ],
          en: [
            "Enduring / Perpetual.",
            "Fleeting.",
            "Momentary.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Maestría total! «Ephemeral» contrasta con «enduring» o «perpetual» para describir fenómenos pasajeros.",
          en: "Total mastery! 'Ephemeral' contrasts with 'enduring' or 'perpetual' when describing transitory phenomena.",
        },
      },
    ],
  },
};

/* ==========================================================================
   3. Listening Comprehension Data (7 Crew Ranks)
   ========================================================================== */

const LISTENING_DATA = {
  a0: {
    exercises: [
      {
        title: {
          es: "Nivel 1: Terrícola (Landlubber) — Primer Saludo y Nombre",
          en: "Level 1: Landlubber — First Greeting & Name",
        },
        scenario: {
          es: "Escucha a Roberto presentándose con palabras básicas y números.",
          en: "Listen to Roberto introducing himself using basic words and numbers.",
        },
        duration: "00:10",
        audioScript:
          "Hello, my name is Roberto. Thank you! I am at Gate Number One.",
        question: {
          es: "¿Cómo se llama la persona del audio y en qué puerta (Gate) está?",
          en: "What is the speaker's name and which gate number is he at?",
        },
        options: {
          es: [
            "Se llama Roberto y está en la Puerta 1 (Gate Number One).",
            "Se llama Carlos y está en la Puerta 5.",
            "Se llama Roberto y está en la Puerta 8.",
          ],
          en: [
            "His name is Roberto and he is at Gate Number One.",
            "His name is Carlos and he is at Gate Five.",
            "His name is Roberto and he is at Gate Eight.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! El audio dice claramente: «Hello, my name is Roberto. Thank you! I am at Gate Number One.»",
          en: "Correct! The audio clearly says: 'Hello, my name is Roberto. Thank you! I am at Gate Number One.'",
        },
      },
      {
        title: {
          es: "Nivel 1: Terrícola (Landlubber) — En la Cafetería",
          en: "Level 1: Landlubber — At the Coffee Shop",
        },
        scenario: {
          es: "Escucha un pedido sencillo de desayuno con números básicos.",
          en: "Listen to a simple breakfast order with basic numbers.",
        },
        duration: "00:12",
        audioScript:
          "Good morning! Two coffees and one bottle of water, please. Thank you very much.",
        question: {
          es: "¿Qué pide el cliente en la cafetería?",
          en: "What does the customer order at the coffee shop?",
        },
        options: {
          es: [
            "Dos cafés y una botella de agua.",
            "Un té y tres pasteles.",
            "Tres cafés y dos sándwiches.",
          ],
          en: [
            "Two coffees and one bottle of water.",
            "One tea and three cakes.",
            "Three coffees and two sandwiches.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! «Two coffees and one bottle of water, please.»",
          en: "Well done! 'Two coffees and one bottle of water, please.'",
        },
      },
      {
        title: {
          es: "Nivel 1: Terrícola (Landlubber) — Número de Teléfono",
          en: "Level 1: Landlubber — Phone Number Check",
        },
        scenario: {
          es: "Escucha a Ana dictando los últimos cuatro dígitos de su teléfono.",
          en: "Listen to Ana reading the last four digits of her phone number.",
        },
        duration: "00:11",
        audioScript:
          "Hi, my name is Ana. My room is number four, and the code is seven, two, nine, zero.",
        question: {
          es: "¿Cuál es el número de habitación (room) de Ana?",
          en: "What is Ana's room number?",
        },
        options: {
          es: [
            "La habitación número 4 (four).",
            "La habitación número 7 (seven).",
            "La habitación número 9 (nine).",
          ],
          en: [
            "Room number four.",
            "Room number seven.",
            "Room number nine.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! Ana dice «My room is number four» y luego dicta el código 7-2-9-0.",
          en: "Exact! Ana says 'My room is number four' and then reads the code 7-2-9-0.",
        },
      },
      {
        title: {
          es: "Nivel 1: Terrícola (Landlubber) — Días de Clase",
          en: "Level 1: Landlubber — Class Days",
        },
        scenario: {
          es: "Escucha un aviso corto sobre el horario de una clase.",
          en: "Listen to a short notice about a class schedule.",
        },
        duration: "00:12",
        audioScript:
          "Hello class! Our English lesson is on Monday and Wednesday at nine o'clock.",
        question: {
          es: "¿Qué días y a qué hora es la clase de inglés?",
          en: "Which days and at what time is the English class?",
        },
        options: {
          es: [
            "Los lunes y miércoles a las 9:00 (nine o'clock).",
            "Los martes y jueves a las 5:00.",
            "Los sábados a las 11:00.",
          ],
          en: [
            "On Monday and Wednesday at nine o'clock.",
            "On Tuesday and Thursday at five o'clock.",
            "On Saturday at eleven o'clock.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! «On Monday and Wednesday at nine o'clock.»",
          en: "Correct! 'On Monday and Wednesday at nine o'clock.'",
        },
      },
    ],
  },
  a1: {
    exercises: [
      {
        title: {
          es: "Nivel 2: Grumete (Cabin Mate) — Mi Vida y Rutina Diaria",
          en: "Level 2: Cabin Mate — My Life & Daily Routine",
        },
        scenario: {
          es: "Escucha un audio lento y claro sobre el lugar de residencia y rutina diaria.",
          en: "Listen to slow, clear audio about home and daily routine.",
        },
        duration: "00:15",
        audioScript:
          "Hello! I live in Guatemala with my family. I work every day from Monday to Friday, and I study English in the evening.",
        question: {
          es: "Según el audio de nivel Grumete, ¿dónde vive el hablante y qué hace por la tarde-noche (in the evening)?",
          en: "According to the Cabin Mate audio, where does the speaker live and what does he do in the evening?",
        },
        options: {
          es: [
            "Vive en Guatemala y estudia inglés por la tarde-noche.",
            "Vive en México y trabaja los domingos.",
            "Vive en Canadá y viaja en barco los sábados.",
          ],
          en: [
            "He lives in Guatemala and studies English in the evening.",
            "He lives in Mexico and works on Sundays.",
            "He lives in Canada and travels by boat on Saturdays.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien, Grumete! «I live in Guatemala... and I study English in the evening.»",
          en: "Well done, Cabin Mate! 'I live in Guatemala... and I study English in the evening.'",
        },
      },
      {
        title: {
          es: "Nivel 2: Grumete (Cabin Mate) — Rutina de Fin de Semana",
          en: "Level 2: Cabin Mate — Weekend Routine",
        },
        scenario: {
          es: "Escucha a Sofía contar qué hace los sábados con su familia.",
          en: "Listen to Sofia describe what she does on Saturdays with her family.",
        },
        duration: "00:16",
        audioScript:
          "On Saturdays, I usually wake up at eight. I make breakfast for my family, and then we walk to the park near our house.",
        question: {
          es: "¿Qué hace Sofía los sábados después de preparar el desayuno?",
          en: "What does Sofia do on Saturdays after making breakfast?",
        },
        options: {
          es: [
            "Camina con su familia al parque cercano a su casa.",
            "Maneja cuatro horas hasta la playa.",
            "Trabaja en la oficina hasta la medianoche.",
          ],
          en: [
            "She walks with her family to the park near their house.",
            "She drives four hours to the beach.",
            "She works at the office until midnight.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! «We walk to the park near our house.»",
          en: "Correct! 'We walk to the park near our house.'",
        },
      },
      {
        title: {
          es: "Nivel 2: Grumete (Cabin Mate) — Preguntando la Dirección",
          en: "Level 2: Cabin Mate — Asking for Directions",
        },
        scenario: {
          es: "Escucha indicaciones sencillas para llegar a la estación del metro.",
          en: "Listen to simple directions to reach the subway station.",
        },
        duration: "00:15",
        audioScript:
          "Excuse me, where is the subway station? Go straight for two blocks and turn left at the pharmacy. It is next to the bank.",
        question: {
          es: "¿Dónde está ubicada la estación del metro?",
          en: "Where is the subway station located?",
        },
        options: {
          es: [
            "A dos cuadras recto, girando a la izquierda en la farmacia, junto al banco.",
            "Detrás del aeropuerto, a veinte minutos en autobús.",
            "Al final de la calle girando a la derecha en el hospital.",
          ],
          en: [
            "Two blocks straight, turn left at the pharmacy, next to the bank.",
            "Behind the airport, twenty minutes by bus.",
            "At the end of the street, turn right at the hospital.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Excelente! «Go straight for two blocks, turn left at the pharmacy, next to the bank.»",
          en: "Excellent! 'Go straight for two blocks, turn left at the pharmacy, next to the bank.'",
        },
      },
      {
        title: {
          es: "Nivel 2: Grumete (Cabin Mate) — Horario de Tienda",
          en: "Level 2: Cabin Mate — Store Opening Hours",
        },
        scenario: {
          es: "Escucha el mensaje grabado de una librería local.",
          en: "Listen to a recorded message from a local bookstore.",
        },
        duration: "00:16",
        audioScript:
          "Thank you for calling City Books. We open from nine a.m. to six p.m. Monday through Saturday. We are closed on Sunday.",
        question: {
          es: "¿Qué día permanece cerrada la librería City Books?",
          en: "Which day is City Books closed?",
        },
        options: {
          es: [
            "El domingo (Sunday).",
            "El lunes (Monday).",
            "El sábado (Saturday).",
          ],
          en: [
            "On Sunday.",
            "On Monday.",
            "On Saturday.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! «We are closed on Sunday.»",
          en: "Exact! 'We are closed on Sunday.'",
        },
      },
    ],
  },
  a2: {
    exercises: [
      {
        title: {
          es: "Nivel 3: Marinero de Cubierta (Deckhand) — Compras y Relato en Pasado",
          en: "Level 3: Deckhand — Shopping & Past Story",
        },
        scenario: {
          es: "Escucha una historia corta en pasado sobre un viaje al mercado.",
          en: "Listen to a short past-tense story about a trip to the market.",
        },
        duration: "00:20",
        audioScript:
          "Yesterday I went to the market in the morning and I bought fresh fruit and coffee for the team. Then we started our work.",
        question: {
          es: "¿Qué compró el hablante ayer en el mercado?",
          en: "What did the speaker buy at the market yesterday?",
        },
        options: {
          es: [
            "Fruta fresca y café para el equipo (Fresh fruit and coffee).",
            "Mapas nuevos y una brújula de bronce.",
            "Billetes de tren para el fin de semana.",
          ],
          en: [
            "Fresh fruit and coffee for the team.",
            "New maps and a brass compass.",
            "Train tickets for the weekend.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! «Yesterday I went to the market in the morning and I bought fresh fruit and coffee for the team.»",
          en: "Exact! 'Yesterday I went to the market in the morning and I bought fresh fruit and coffee for the team.'",
        },
      },
      {
        title: {
          es: "Nivel 3: Marinero de Cubierta (Deckhand) — Cambio de Vuelo",
          en: "Level 3: Deckhand — Airport Gate Announcement",
        },
        scenario: {
          es: "Escucha un anuncio rápido en el aeropuerto sobre un vuelo a Boston.",
          en: "Listen to a quick airport announcement about a flight to Boston.",
        },
        duration: "00:20",
        audioScript:
          "Attention passengers on Flight 204 to Boston. Your departure gate changed from Gate B4 to Gate B9, and boarding starts in fifteen minutes.",
        question: {
          es: "¿A qué puerta deben dirigirse ahora los pasajeros del vuelo 204?",
          en: "Which gate should passengers on Flight 204 go to now?",
        },
        options: {
          es: [
            "A la puerta B9 (Gate B9), y el abordaje empieza en 15 minutos.",
            "A la puerta B4, dentro de dos horas.",
            "A la zona de reclamo de equipaje.",
          ],
          en: [
            "Gate B9, and boarding starts in fifteen minutes.",
            "Gate B4, in two hours.",
            "The baggage claim area.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! «Your departure gate changed from Gate B4 to Gate B9.»",
          en: "Well done! 'Your departure gate changed from Gate B4 to Gate B9.'",
        },
      },
      {
        title: {
          es: "Nivel 3: Marinero de Cubierta (Deckhand) — Devolución en Tienda",
          en: "Level 3: Deckhand — Returning a Jacket",
        },
        scenario: {
          es: "Escucha la explicación de un cliente en el mostrador de servicio.",
          en: "Listen to a customer explaining an issue at the customer service desk.",
        },
        duration: "00:19",
        audioScript:
          "Hi! I bought this jacket last Tuesday, but it is a little too small. Here is my receipt. Could I exchange it for a medium size?",
        question: {
          es: "¿Qué solicita el cliente en el mostrador?",
          en: "What is the customer asking for at the desk?",
        },
        options: {
          es: [
            "Cambiar la chaqueta por una talla mediana (medium size).",
            "Comprar unos zapatos nuevos sin recibo.",
            "Hablar con el gerente por un retraso de envío.",
          ],
          en: [
            "To exchange the jacket for a medium size.",
            "To buy new shoes without a receipt.",
            "To speak with the manager about a shipping delay.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! «Could I exchange it for a medium size?»",
          en: "Correct! 'Could I exchange it for a medium size?'",
        },
      },
      {
        title: {
          es: "Nivel 3: Marinero de Cubierta (Deckhand) — Nota de Voz de Trabajo",
          en: "Level 3: Deckhand — Quick Work Voicemail",
        },
        scenario: {
          es: "Escucha un mensaje breve de un compañero sobre la reunión de la tarde.",
          en: "Listen to a short message from a coworker about the afternoon meeting.",
        },
        duration: "00:18",
        audioScript:
          "Hey, it's Marco. I already sent the budget spreadsheet by email, so please check it out before our two p.m. call.",
        question: {
          es: "¿Qué ya hizo Marco antes de llamar?",
          en: "What did Marco already do before calling?",
        },
        options: {
          es: [
            "Ya envió la hoja de cálculo del presupuesto por correo electrónico.",
            "Canceló la llamada de las dos de la tarde.",
            "Imprimió veinte copias del contrato.",
          ],
          en: [
            "He already emailed the budget spreadsheet.",
            "He canceled the two p.m. call.",
            "He printed twenty copies of the contract.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! «I already sent the budget spreadsheet by email.»",
          en: "Spot on! 'I already sent the budget spreadsheet by email.'",
        },
      },
    ],
  },
  b1: {
    exercises: [
      {
        title: {
          es: "Nivel 4: Marinero (Sailor) — Conversación sobre Metas y Trabajo",
          en: "Level 4: Sailor — Conversation About Goals & Work",
        },
        scenario: {
          es: "Escucha una opinión personal sobre por qué es importante aprender inglés.",
          en: "Listen to a personal opinion about why learning English matters.",
        },
        duration: "00:26",
        audioScript:
          "I think learning English is important because I want to travel and collaborate with engineering teams around the world. Listening to podcasts every morning helps me improve.",
        question: {
          es: "¿Por qué considera el hablante que es importante aprender inglés?",
          en: "Why does the speaker think learning English is important?",
        },
        options: {
          es: [
            "Porque quiere viajar y colaborar con equipos de ingeniería de todo el mundo.",
            "Porque es un requisito obligatorio para comprar un boleto de ferry.",
            "Porque quiere traducir poemas antiguos del siglo XVI.",
          ],
          en: [
            "Because he wants to travel and collaborate with engineering teams around the world.",
            "Because it is required to buy a ferry ticket.",
            "Because he wants to translate sixteenth-century poetry.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Excelente, Marinero! Comprendes opiniones, motivaciones y planes profesionales con fluidez.",
          en: "Excellent, Sailor! You understand opinions, motivations, and career goals clearly.",
        },
      },
      {
        title: {
          es: "Nivel 4: Marinero (Sailor) — Cambio de Planes por Lluvia",
          en: "Level 4: Sailor — Changing Weekend Plans",
        },
        scenario: {
          es: "Escucha a Laura explicar por qué pospusieron el evento del sábado.",
          en: "Listen to Laura explain why they postponed Saturday's event.",
        },
        duration: "00:24",
        audioScript:
          "We originally planned an outdoor picnic for Saturday, but the forecast shows heavy rain. So we decided to call off the park reservation and meet at a downtown cafe instead.",
        question: {
          es: "¿Qué decidieron hacer Laura y sus amigos ante el pronóstico de lluvia?",
          en: "What did Laura and her friends decide to do about the rain forecast?",
        },
        options: {
          es: [
            "Cancelar la reserva del parque y reunirse en una cafetería del centro.",
            "Llevar paraguas y hacer el picnic bajo la tormenta.",
            "Mover el viaje al próximo mes de diciembre.",
          ],
          en: [
            "Cancel the park reservation and meet at a downtown cafe instead.",
            "Bring umbrellas and hold the picnic in the storm.",
            "Move the trip to next December.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! Aquí escuchaste «call off» (cancelar) en un contexto cotidiano.",
          en: "Correct! Here you heard 'call off' (cancel) in an everyday social context.",
        },
      },
      {
        title: {
          es: "Nivel 4: Marinero (Sailor) — Consejo de Productividad",
          en: "Level 4: Sailor — Podcast Productivity Tip",
        },
        scenario: {
          es: "Escucha el fragmento de un pódcast sobre cómo organizar las mañanas.",
          en: "Listen to a podcast clip about organizing morning focus.",
        },
        duration: "00:25",
        audioScript:
          "If you check social media right after waking up, you often lose focus. Instead, you should pick one priority task and finish it before opening your inbox.",
        question: {
          es: "¿Qué recomienda el presentador del pódcast antes de abrir el correo?",
          en: "What does the podcast host recommend doing before opening your inbox?",
        },
        options: {
          es: [
            "Elegir una tarea prioritaria y terminarla primero.",
            "Revisar redes sociales durante treinta minutos.",
            "Responder cincuenta correos antes de desayunar.",
          ],
          en: [
            "Pick one priority task and finish it first.",
            "Scroll through social media for thirty minutes.",
            "Reply to fifty emails before breakfast.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! «Pick one priority task and finish it before opening your inbox.»",
          en: "Well done! 'Pick one priority task and finish it before opening your inbox.'",
        },
      },
      {
        title: {
          es: "Nivel 4: Marinero (Sailor) — Entrevista de Trabajo",
          en: "Level 4: Sailor — Job Interview Experience",
        },
        scenario: {
          es: "Escucha a David describir su experiencia previa en soporte técnico.",
          en: "Listen to David describe his prior experience in technical support.",
        },
        duration: "00:26",
        audioScript:
          "I have worked in customer support for four years, and I really enjoy helping users figure out software issues quickly without technical jargon.",
        question: {
          es: "¿Qué es lo que más disfruta David de su trabajo?",
          en: "What does David enjoy most about his job?",
        },
        options: {
          es: [
            "Ayudar a los usuarios a resolver problemas de software sin usar jerga técnica.",
            "Escribir manuales legales de cien páginas.",
            "Trabajar únicamente de noche sin hablar con clientes.",
          ],
          en: [
            "Helping users figure out software issues without technical jargon.",
            "Writing hundred-page legal manuals.",
            "Working only night shifts without speaking to clients.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! Escuchaste el phrasal verb «figure out» (resolver/comprender).",
          en: "Spot on! You caught the phrasal verb 'figure out' (solve/understand).",
        },
      },
    ],
  },
  b2: {
    exercises: [
      {
        title: {
          es: "Nivel 5: Contramaestre (Bosun) — Debate sobre Trabajo Remoto",
          en: "Level 5: Bosun — Debating Remote Work Trade-offs",
        },
        scenario: {
          es: "Escucha un análisis equilibrado sobre las ventajas y desventajas del trabajo desde casa.",
          en: "Listen to a balanced analysis of the advantages and disadvantages of working from home.",
        },
        duration: "00:34",
        audioScript:
          "On the one hand, working from home is flexible and saves two hours of daily commuting. On the other hand, it can be lonely if teams don't touch base regularly.",
        question: {
          es: "¿Qué ventaja y qué desventaja menciona el hablante sobre trabajar desde casa?",
          en: "What advantage and disadvantage does the speaker mention about working from home?",
        },
        options: {
          es: [
            "Ventaja: es flexible y ahorra tiempo de transporte; Desventaja: puede ser solitario si el equipo no mantiene contacto.",
            "Ventaja: pagan el doble de sueldo; Desventaja: requiere trabajar los domingos.",
            "No menciona ninguna ventaja, solo críticas.",
          ],
          en: [
            "Advantage: flexible and saves commuting time; Disadvantage: can be lonely if teams don't touch base.",
            "Advantage: doubles your salary; Disadvantage: requires working every Sunday.",
            "No advantages are mentioned, only complaints.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien, Contramaestre! Has captado ambos lados del debate y el phrasal verb «touch base».",
          en: "Well done, Bosun! You captured both sides of the debate as well as the workplace phrasal verb 'touch base'.",
        },
      },
      {
        title: {
          es: "Nivel 5: Contramaestre (Bosun) — IA en la Educación",
          en: "Level 5: Bosun — Weighing AI Tools in Classrooms",
        },
        scenario: {
          es: "Escucha un comentario de noticias sobre herramientas digitales en universidades.",
          en: "Listen to a news commentary on digital tools in universities.",
        },
        duration: "00:32",
        audioScript:
          "Despite concerns that automated tools might weaken writing habits, many professors point out that personalized feedback helps students revise drafts faster when guided responsibly.",
        question: {
          es: "¿Qué argumento positivo destacan muchos profesores a pesar de las preocupaciones?",
          en: "What positive point do many professors highlight despite the concerns?",
        },
        options: {
          es: [
            "Que la retroalimentación personalizada ayuda a los estudiantes a revisar sus borradores más rápido si se guía con responsabilidad.",
            "Que los estudiantes ya no necesitan leer libros nunca más.",
            "Que las universidades cerrarán sus bibliotecas este año.",
          ],
          en: [
            "Personalized feedback helps students revise drafts faster when guided responsibly.",
            "Students never need to read books again.",
            "Universities will close all libraries this year.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Excelente! Identificaste el contraste introducido con «Despite...».",
          en: "Excellent! You caught the contrast introduced by 'Despite...'.",
        },
      },
      {
        title: {
          es: "Nivel 5: Contramaestre (Bosun) — Planificación de Capacidad",
          en: "Level 5: Bosun — Sprint Bandwidth & Trade-offs",
        },
        scenario: {
          es: "Escucha a una líder de producto negociar prioridades con un cliente.",
          en: "Listen to a product lead negotiating priorities with a stakeholder.",
        },
        duration: "00:30",
        audioScript:
          "We can certainly add the analytics dashboard this month, but we need to weigh the trade-offs: our engineers don't have the bandwidth to launch both the dashboard and the mobile redesign simultaneously.",
        question: {
          es: "¿Cuál es la restricción principal que explica la líder de producto?",
          en: "What main constraint does the product lead explain?",
        },
        options: {
          es: [
            "El equipo no tiene capacidad suficiente para lanzar el panel de análisis y el rediseño móvil al mismo tiempo.",
            "El cliente canceló el contrato por falta de presupuesto.",
            "Los ingenieros no saben programar aplicaciones móviles.",
          ],
          en: [
            "The team lacks the bandwidth to launch both the dashboard and the mobile redesign at the same time.",
            "The client canceled the contract due to budget cuts.",
            "The engineers don't know how to build mobile apps.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! «Weigh the trade-offs» y «bandwidth» son claves para negociar alcances en inglés.",
          en: "Correct! 'Weigh the trade-offs' and 'bandwidth' are key phrases for scope negotiation.",
        },
      },
      {
        title: {
          es: "Nivel 5: Contramaestre (Bosun) — Transporte Urbano Sostenible",
          en: "Level 5: Bosun — Urban Bike Lanes Report",
        },
        scenario: {
          es: "Escucha un resumen radial sobre movilidad urbana y carriles bici.",
          en: "Listen to a radio summary on urban mobility and bike lanes.",
        },
        duration: "00:31",
        audioScript:
          "If the city expanded protected bike lanes near transit hubs, daily car traffic would likely drop by fifteen percent, though local shops initially worried about fewer parking spots.",
        question: {
          es: "¿Qué preocupación inicial tenían los comercios locales según el reporte?",
          en: "What initial concern did local shops have according to the report?",
        },
        options: {
          es: [
            "Que hubiera menos espacios de estacionamiento disponibles.",
            "Que aumentara el precio de la electricidad.",
            "Que cerrara la estación de tren central.",
          ],
          en: [
            "That there would be fewer parking spots available.",
            "That electricity prices would rise.",
            "That the central train station would close.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! Captaste tanto la hipótesis (2º Condicional) como la objeción inicial.",
          en: "Well done! You caught both the hypothetical 2nd Conditional and the initial objection.",
        },
      },
    ],
  },
  c1: {
    exercises: [
      {
        title: {
          es: "Nivel 6: Navegante (Navigator) — Significado Implícito en Reuniones",
          en: "Level 6: Navigator — Implied Meaning in Executive Briefings",
        },
        scenario: {
          es: "Escucha cómo se interpreta el sentido implícito (subtexto) tras una revisión de proyecto.",
          en: "Listen to an interpretation of implied meaning after a project review.",
        },
        duration: "00:42",
        audioScript:
          "When the director asked if we had the bandwidth to refactor the module before Friday, what she really meant was that the project was already behind schedule and we needed to prioritize core stability.",
        question: {
          es: "¿Qué quería decir realmente la directora (implied meaning) con su pregunta?",
          en: "What did the director really mean (implied meaning) by her question?",
        },
        options: {
          es: [
            "Que el proyecto ya estaba atrasado (behind schedule) y debían priorizar la estabilidad principal.",
            "Que tenían semanas de sobra para añadir funciones decorativas.",
            "Que el proyecto había sido cancelado definitivamente.",
          ],
          en: [
            "That the project was already behind schedule and they needed to prioritize core stability.",
            "That they had weeks to spare for decorative features.",
            "That the project had been permanently canceled.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Impecable, Navegante! Captar el subtexto («What she really meant was...») es el sello del Nivel 6.",
          en: "Impeccable, Navigator! Decoding subtext ('What she really meant was...') is the hallmark of Level 6.",
        },
      },
      {
        title: {
          es: "Nivel 6: Navegante (Navigator) — Negociación Diplomática (Hedging)",
          en: "Level 6: Navigator — Diplomatic Pushback with a Vendor",
        },
        scenario: {
          es: "Escucha cómo una gerente rechaza un plazo poco realista con tacto profesional.",
          en: "Listen to a manager politely pushing back on an unrealistic deadline.",
        },
        duration: "00:38",
        audioScript:
          "I appreciate how quickly your team put this timeline together. That said, I have a slightly different perspective on the testing phase—if we compress QA to two days, it probably won't move the needle on reliability.",
        question: {
          es: "¿Qué está comunicando diplomáticamente la gerente?",
          en: "What is the manager diplomatically communicating?",
        },
        options: {
          es: [
            "Que reducir las pruebas de calidad a dos días es arriesgado y no mejorará la confiabilidad del producto.",
            "Que aprueba el cronograma exactamente tal como fue enviado.",
            "Que el equipo de pruebas no es necesario en este proyecto.",
          ],
          en: [
            "That compressing QA testing to two days is unwise and will not improve reliability.",
            "That she approves the timeline exactly as submitted.",
            "That the QA team is unnecessary for this project.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Excelente! Reconociste el uso de «That said, I have a slightly different perspective...» para objetar sin confrontación.",
          en: "Excellent! You recognized 'That said, I have a slightly different perspective...' as polite executive pushback.",
        },
      },
      {
        title: {
          es: "Nivel 6: Navegante (Navigator) — Seminario Universitario",
          en: "Level 6: Navigator — University Research Seminar",
        },
        scenario: {
          es: "Escucha a un investigador resumir un hallazgo inesperado con inversión enfática.",
          en: "Listen to a researcher summarize an unexpected finding using emphatic inversion.",
        },
        duration: "00:40",
        audioScript:
          "Not only did the longitudinal study reveal a sharp drop in energy waste, but it also suggested that neighborhood-level incentives outperformed citywide subsidies by nearly two to one.",
        question: {
          es: "¿Cuál fue el segundo hallazgo clave del estudio longitudinal?",
          en: "What was the second key finding of the longitudinal study?",
        },
        options: {
          es: [
            "Los incentivos a nivel de vecindario superaron casi dos a uno a los subsidios de toda la ciudad.",
            "El desperdicio energético aumentó en todos los distritos.",
            "Los subsidios municipales eliminaron por completo la participación vecinal.",
          ],
          en: [
            "Neighborhood-level incentives outperformed citywide subsidies by nearly two to one.",
            "Energy waste increased across all districts.",
            "Citywide subsidies completely eliminated neighborhood participation.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! «Not only did... but it also...» estructura argumentos complejos con gran claridad.",
          en: "Well done! 'Not only did... but it also...' structures complex academic findings clearly.",
        },
      },
      {
        title: {
          es: "Nivel 6: Navegante (Navigator) — Lectura entre Líneas",
          en: "Level 6: Navigator — Reading Between the Lines",
        },
        scenario: {
          es: "Escucha la evaluación de un comité tras leer un correo ambiguo de un proveedor.",
          en: "Listen to a committee review after reading an equivocal vendor email.",
        },
        duration: "00:39",
        audioScript:
          "The supplier's reply sounded polite on the surface, yet reading between the lines, their equivocal phrasing about 'supply chain adjustments' means we should prepare a backup vendor immediately.",
        question: {
          es: "¿Por qué recomienda el hablante preparar un proveedor de respaldo?",
          en: "Why does the speaker recommend preparing a backup vendor?",
        },
        options: {
          es: [
            "Porque el lenguaje ambiguo del proveedor sugiere posibles retrasos en el suministro.",
            "Porque el proveedor ya entregó todo el inventario por adelantado.",
            "Porque quieren cancelar el producto de forma definitiva.",
          ],
          en: [
            "Because the supplier's equivocal wording hints at potential delivery delays.",
            "Because the supplier already delivered all inventory ahead of schedule.",
            "Because they want to discontinue the product permanently.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Brillante! Captaste cómo «equivocal phrasing» y «reading between the lines» anticipan riesgos.",
          en: "Brilliant! You caught how 'equivocal phrasing' and 'reading between the lines' signal risk early.",
        },
      },
    ],
  },
  c2: {
    exercises: [
      {
        title: {
          es: "Nivel 7: Capitán (Captain) — Habla Rápida y Matices Estratégicos",
          en: "Level 7: Captain — Fast Speech & Strategic Nuance",
        },
        scenario: {
          es: "Escucha la reflexión evaluando una decisión crítica tras un cambio repentino de condiciones.",
          en: "Listen to a reflection evaluating a critical decision after sudden changing conditions.",
        },
        duration: "00:50",
        audioScript:
          "Had we set sail earlier and heeded the barometric drop at dawn, we would have avoided the storm entirely rather than having to bite the bullet and reroute through the northern strait.",
        question: {
          es: "¿Qué habría ocurrido si hubieran zarpado más temprano y atendido la caída barométrica?",
          en: "What would have happened had they set sail earlier and heeded the barometric drop?",
        },
        options: {
          es: [
            "Habrían evitado la tormenta por completo en lugar de tener que desviarse por el estrecho norte.",
            "Habrían llegado tres días más tarde al puerto de origen.",
            "Habrían tenido que abandonar el barco en la costa sur.",
          ],
          en: [
            "They would have avoided the storm entirely instead of rerouting through the northern strait.",
            "They would have arrived three days later at their home port.",
            "They would have had to abandon the ship on the south coast.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Maestría de Capitán! Comprendes condicionales invertidos y modismos («bite the bullet») a velocidad natural.",
          en: "Captain Mastery! You decode inverted conditionals and idioms ('bite the bullet') effortlessly.",
        },
      },
      {
        title: {
          es: "Nivel 7: Capitán (Captain) — Análisis Económico Matizado",
          en: "Level 7: Captain — Nuanced Policy Commentary",
        },
        scenario: {
          es: "Escucha a una analista cuestionar el propósito aparente de una reforma regulatoria.",
          en: "Listen to an analyst questioning the ostensible purpose of a regulatory reform.",
        },
        duration: "00:46",
        audioScript:
          "The legislation was ostensibly crafted to streamline licensing for small clinics; however, a perspicacious reading of the fine print reveals compliance thresholds that inadvertently favor ubiquitous hospital conglomerates.",
        question: {
          es: "¿Qué contradicción señala la analista respecto a la legislación?",
          en: "What contradiction does the analyst point out regarding the legislation?",
        },
        options: {
          es: [
            "Aunque aparentemente buscaba agilizar trámites para clínicas pequeñas, la letra pequeña termina favoreciendo a los grandes conglomerados hospitalarios.",
            "La ley elimina por completo todos los requisitos médicos del país.",
            "Las clínicas pequeñas recibieron fondos ilimitados sin ninguna condición.",
          ],
          en: [
            "Though ostensibly meant to help small clinics, the fine print sets thresholds that favor large hospital conglomerates.",
            "The law eliminates every medical licensing requirement nationwide.",
            "Small clinics received unlimited funding with zero conditions.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Impecable! Decodificaste «ostensibly», «perspicacious» y «ubiquitous» en un argumento de alto registro.",
          en: "Impeccable! You decoded 'ostensibly', 'perspicacious', and 'ubiquitous' in a high-register argument.",
        },
      },
      {
        title: {
          es: "Nivel 7: Capitán (Captain) — Conferencia sobre Arquitectura Urbana",
          en: "Level 7: Captain — Keynote on Ephemeral vs. Enduring Design",
        },
        scenario: {
          es: "Escucha el cierre de una ponencia sobre diseño cívico y sostenibilidad.",
          en: "Listen to the closing remarks of a keynote on civic design and sustainability.",
        },
        duration: "00:45",
        audioScript:
          "Were municipal planners to prioritize enduring civic spaces over ephemeral architectural trends, cities would cultivate deeper social trust—a truth that becomes unmistakable once we examine neighborhoods built to last.",
        question: {
          es: "¿Qué propone el ponente a los planificadores municipales?",
          en: "What does the speaker propose to municipal planners?",
        },
        options: {
          es: [
            "Priorizar espacios cívicos duraderos por encima de modas arquitectónicas pasajeras para fortalecer la confianza social.",
            "Demoler los barrios históricos cada cinco años para seguir tendencias virales.",
            "Sustituir todos los parques públicos por estacionamientos temporales.",
          ],
          en: [
            "Prioritize enduring civic spaces over ephemeral architectural trends to cultivate deeper social trust.",
            "Demolish historic neighborhoods every five years to follow viral trends.",
            "Replace all public parks with temporary parking lots.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Excelente! Identificaste la inversión condicional «Were municipal planners to prioritize...».",
          en: "Excellent! You caught the inverted conditional 'Were municipal planners to prioritize...'.",
        },
      },
      {
        title: {
          es: "Nivel 7: Capitán (Captain) — Retrospectiva de Liderazgo",
          en: "Level 7: Captain — Mixed Conditional Leadership Debrief",
        },
        scenario: {
          es: "Escucha la evaluación de un consejo asesor sobre una decisión tomada hace cinco años.",
          en: "Listen to an advisory board evaluating a strategic decision made five years ago.",
        },
        duration: "00:44",
        audioScript:
          "If the consortium had standardized its open-source protocols five years ago, we would be witnessing seamless cross-platform interoperability today, rather than scrambling to patch fragmented silos.",
        question: {
          es: "¿Cuál es la consecuencia presente de no haber estandarizado los protocolos hace cinco años?",
          en: "What is the present consequence of not having standardized the protocols five years ago?",
        },
        options: {
          es: [
            "Hoy tienen que esforzarse por corregir sistemas fragmentados en lugar de disfrutar de interoperabilidad fluida.",
            "El consorcio duplicó su velocidad de desarrollo sin ningún obstáculo.",
            "Todos los protocolos antiguos desaparecieron automáticamente.",
          ],
          en: [
            "Today they are scrambling to patch fragmented silos instead of enjoying seamless interoperability.",
            "The consortium doubled development speed without any friction.",
            "All legacy protocols disappeared automatically.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Dominio de Capitán! Comprendiste un Condicional Mixto complejo con total precisión.",
          en: "Captain Mastery! You parsed a complex Mixed Conditional with complete precision.",
        },
      },
    ],
  },
};

/* ==========================================================================
   4. My Ship Data: Monthly Calendars, Weekly Lessons, Completed Resume & Competences
   ========================================================================== */

const SHIP_MONTHS_DATA = [
  {
    year: 2026,
    monthIndex: 8, // September 2026
    name: { es: "Septiembre 2026", en: "September 2026" },
    daysInMonth: 30,
    startOffset: 1, // Tuesday (Mon=0)
    // status: "goal" (blue), "worked" (green), "missed" (red)
    statuses: {
      1: "worked", 2: "goal", 3: "goal", 4: "missed", 5: "worked", 6: "goal", 7: "goal",
      8: "worked", 9: "missed", 10: "worked", 11: "goal", 12: "goal", 13: "worked", 14: "missed",
      15: "goal", 16: "goal", 17: "worked", 18: "goal", 19: "missed", 20: "worked", 21: "goal",
      22: "goal", 23: "worked", 24: "goal", 25: "worked", 26: "goal", 27: "missed", 28: "goal",
      29: "worked", 30: "goal",
    },
  },
  {
    year: 2026,
    monthIndex: 9, // October 2026
    name: { es: "Octubre 2026", en: "October 2026" },
    daysInMonth: 31,
    startOffset: 3, // Thursday (Mon=0)
    statuses: {
      1: "goal", 2: "goal", 3: "worked", 4: "goal", 5: "missed", 6: "worked", 7: "goal",
      8: "goal", 9: "worked", 10: "goal", 11: "missed", 12: "goal", 13: "worked", 14: "goal",
      15: "goal", 16: "goal", 17: "worked", 18: "missed", 19: "worked", 20: "goal", 21: "goal",
      22: "worked", 23: "goal", 24: "goal", 25: "worked", 26: "missed", 27: "goal", 28: "goal",
      29: "worked", 30: "goal", 31: "goal",
    },
  },
  {
    year: 2026,
    monthIndex: 10, // November 2026 (Current)
    name: { es: "Noviembre 2026", en: "November 2026" },
    daysInMonth: 30,
    startOffset: 6, // Sunday (Mon=0)
    statuses: {
      1: "goal", 2: "goal", 3: "worked", 4: "missed", 5: "goal", 6: "worked",
      7: "goal", 8: "goal", 9: "worked", 10: "missed", 11: "goal", 12: "goal",
    },
  },
];

const WEEKLY_LESSONS_WORKED = [
  {
    day: { es: "Lunes", en: "Monday" },
    status: "goal",
    statusLabel: { es: "🔵 Meta Alcanzada (25m)", en: "🔵 Goal Reached (25m)" },
    rank: { es: "Nivel 1: Terrícola ⚓", en: "Level 1: Landlubber ⚓" },
    lesson: {
      es: "Presentaciones y Sonido Interdental /θ/",
      en: "Introductions & Dental Fricative /θ/",
    },
    module: { es: "Gramática + Pronunciación", en: "Grammar + Pronunciation" },
  },
  {
    day: { es: "Martes", en: "Tuesday" },
    status: "worked",
    statusLabel: { es: "🟢 Día Trabajado (15m)", en: "🟢 Day Worked (15m)" },
    rank: { es: "Nivel 2: Grumete 🪣", en: "Level 2: Cabin Mate 🪣" },
    lesson: {
      es: "Rutinas en Presente Simple y Flap T (/ɾ/)",
      en: "Present Simple Routines & American Flap T",
    },
    module: { es: "Vocabulario y Pronunciación", en: "Vocabulary & Pronunciation" },
  },
  {
    day: { es: "Miércoles", en: "Wednesday" },
    status: "missed",
    statusLabel: { es: "🔴 Día Perdido (0m)", en: "🔴 Day Missed (0m)" },
    rank: { es: "Sin actividad", en: "No activity" },
    lesson: {
      es: "Día de descanso en puerto — sin sesión registrada",
      en: "Rest day in port — no session logged",
    },
    module: { es: "Pendiente de recuperar", en: "Pending recovery" },
  },
  {
    day: { es: "Jueves", en: "Thursday" },
    status: "goal",
    statusLabel: { es: "🔵 Meta Alcanzada (22m)", en: "🔵 Goal Reached (22m)" },
    rank: {
      es: "Nivel 3: Marinero de Cubierta 🪢",
      en: "Level 3: Deckhand 🪢",
    },
    lesson: {
      es: "Relatos en Pasado Simple y Connected Speech",
      en: "Past Simple Stories & Connected Speech Linking",
    },
    module: { es: "Taller de Gramática", en: "Grammar Workshop" },
  },
  {
    day: { es: "Viernes", en: "Friday" },
    status: "goal",
    statusLabel: { es: "🔵 Meta Alcanzada (30m)", en: "🔵 Goal Reached (30m)" },
    rank: { es: "Nivel 4: Marinero ⛵", en: "Level 4: Sailor ⛵" },
    lesson: {
      es: "Sentence Mining (Regla 1T): Call off & Figure out",
      en: "Sentence Mining (1T Rule): Call off & Figure out",
    },
    module: { es: "Vocabulario + Listening", en: "Vocabulary + Listening" },
  },
  {
    day: { es: "Sábado", en: "Saturday" },
    status: "worked",
    statusLabel: { es: "🟢 Día Trabajado (14m)", en: "🟢 Day Worked (14m)" },
    rank: { es: "Nivel 5: Contramaestre 🪈", en: "Level 5: Bosun 🪈" },
    lesson: {
      es: "Debate de Ventajas/Desventajas y Jerga Bandwidth",
      en: "Debating Trade-offs & Workplace Bandwidth",
    },
    module: { es: "Comprensión Auditiva", en: "Listening Lab" },
  },
  {
    day: { es: "Domingo", en: "Sunday" },
    status: "goal",
    statusLabel: { es: "🔵 Meta Alcanzada (24m)", en: "🔵 Goal Reached (24m)" },
    rank: { es: "Nivel 6: Navegante 🧭", en: "Level 6: Navigator 🧭" },
    lesson: {
      es: "Mitigación Diplomática (Hedging) y Subtexto",
      en: "Diplomatic Professional Hedging & Subtext",
    },
    module: { es: "Mi Barco • Pragmática", en: "My Ship • Pragmatics" },
  },
];

const DEFAULT_COMPLETED_LESSONS = [
  {
    key: "grammar-a0",
    title: {
      es: "Nivel 1: Terrícola ⚓ — Presentaciones y Verbo 'To Be'",
      en: "Level 1: Landlubber ⚓ — Introductions & Verb 'To Be'",
    },
    module: { es: "Taller de Gramática", en: "Grammar Workshop" },
    score: "100%",
  },
  {
    key: "vocab-a1",
    title: {
      es: "Nivel 2: Grumete 🪣 — Flap T Estadounidense (Water & City)",
      en: "Level 2: Cabin Mate 🪣 — American Flap T (Water & City)",
    },
    module: { es: "Vocabulario y Pronunciación", en: "Vocabulary & Pronunciation" },
    score: "100%",
  },
  {
    key: "listening-a2",
    title: {
      es: "Nivel 3: Marinero de Cubierta 🪢 — Relato en el Mercado",
      en: "Level 3: Deckhand 🪢 — Market Past Story",
    },
    module: { es: "Comprensión Auditiva", en: "Listening Comprehension" },
    score: "100%",
  },
  {
    key: "vocab-b1",
    title: {
      es: "Nivel 4: Marinero ⛵ — Sentence Mining (Call off & Figure out)",
      en: "Level 4: Sailor ⛵ — Sentence Mining (Call off & Figure out)",
    },
    module: { es: "Vocabulario y Pronunciación", en: "Vocabulary & Pronunciation" },
    score: "100%",
  },
  {
    key: "grammar-b2",
    title: {
      es: "Nivel 5: Contramaestre 🪈 — Debate: On the one hand / On the other hand",
      en: "Level 5: Bosun 🪈 — Debate: On the one hand / On the other hand",
    },
    module: { es: "Taller de Gramática", en: "Grammar Workshop" },
    score: "100%",
  },
  {
    key: "ship-sociolinguistic",
    title: {
      es: "Nivel 6: Navegante 🧭 — Mitigación Diplomática (US Hedging)",
      en: "Level 6: Navigator 🧭 — Diplomatic Hedging in US Teams",
    },
    module: { es: "Mi Barco • Competencia Pragmática", en: "My Ship • Pragmatic Competence" },
    score: "100%",
  },
];

const SHIP_COMPETENCE_DATA = {
  discourse: {
    badge: "COHESIÓN Y STORYTELLING EN 3 TIEMPOS",
    title: {
      es: "Competencia Discursiva (Discourse Competence)",
      en: "Discourse Competence",
    },
    explanation: {
      es: "Une ideas con cohesión y estructura intervenciones técnicas mediante el protocolo de Storytelling en 3 Tiempos: 1) Contexto ('The reason we ran into this issue was...'), 2) Acción ('What I ended up doing was...'), y 3) Aprendizaje ('Looking back, the key takeaway is...').",
      en: "Connect ideas cohesively and structure technical updates using 3-Step Storytelling: 1) Context ('The reason we ran into this issue was...'), 2) Action ('What I ended up doing was...'), and 3) Takeaway ('Looking back, the key takeaway is...').",
    },
    example:
      "The reason we ran into this issue was a legacy dependency; consequently, what I ended up doing was refactoring the module.",
    exercises: [
      {
        question: {
          es: "En una reunión técnica, quieres cerrar tu historia destacando la lección principal aprendida. ¿Qué conector discursivo del protocolo en 3 tiempos es el más adecuado?",
          en: "In a technical review, you want to conclude your story by highlighting the main lesson learned. Which 3-step storytelling transition is most appropriate?",
        },
        options: {
          es: [
            "«Looking back, the key takeaway is that we should automate load testing early.»",
            "«Once upon a time there was a server.»",
            "«Anyway, I forgot why I started talking.»",
          ],
          en: [
            "'Looking back, the key takeaway is that we should automate load testing early.'",
            "'Once upon a time there was a server.'",
            "'Anyway, I forgot why I started talking.'",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Excelente Competencia Discursiva! «Looking back, the key takeaway is...» sintetiza con claridad ejecutiva el aprendizaje final.",
          en: "Excellent Discourse Competence! 'Looking back, the key takeaway is...' synthesizes the final lesson with executive clarity.",
        },
      },
      {
        question: {
          es: "Al explicar el contexto inicial (Paso 1) de un incidente en un informe, ¿qué estructura conecta la causa con naturalidad?",
          en: "When explaining the initial context (Step 1) of an incident in a report, which structure naturally frames the root cause?",
        },
        options: {
          es: [
            "«The reason we ran into this issue was an expired API token on the staging server.»",
            "«Issue happened because yes, very bad.»",
            "«In conclusion, hello everyone.»",
          ],
          en: [
            "'The reason we ran into this issue was an expired API token on the staging server.'",
            "'Issue happened because yes, very bad.'",
            "'In conclusion, hello everyone.'",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! «The reason we ran into this issue was...» abre la historia con foco inmediato en la causa.",
          en: "Correct! 'The reason we ran into this issue was...' opens the update with immediate focus on the cause.",
        },
      },
      {
        question: {
          es: "En un ensayo o correo largo, ¿qué conector enlaza dos ideas contrastantes con cohesión formal?",
          en: "In an essay or long email, which discourse marker cohesively links two contrasting points?",
        },
        options: {
          es: [
            "«Nevertheless, the pilot program outperformed expectations in rural districts.»",
            "«Banana, the pilot program outperformed expectations.»",
            "«For example, however, therefore, maybe.»",
          ],
          en: [
            "'Nevertheless, the pilot program outperformed expectations in rural districts.'",
            "'Banana, the pilot program outperformed expectations.'",
            "'For example, however, therefore, maybe.'",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! «Nevertheless» introduce un contraste claro tras reconocer una dificultad previa.",
          en: "Well done! 'Nevertheless' introduces a clear contrast after acknowledging an earlier obstacle.",
        },
      },
      {
        question: {
          es: "Al presentar una actualización de proyecto (Paso 2), ¿cómo describes la acción decisiva que tomaste?",
          en: "When giving a project update (Step 2), how do you frame the decisive action you took?",
        },
        options: {
          es: [
            "«What I ended up doing was splitting the migration into two low-risk phases.»",
            "«I did something and forgot what.»",
            "«The problem will solve itself next year.»",
          ],
          en: [
            "'What I ended up doing was splitting the migration into two low-risk phases.'",
            "'I did something and forgot what.'",
            "'The problem will solve itself next year.'",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! «What I ended up doing was...» destaca la solución concreta con fluidez narrativa.",
          en: "Spot on! 'What I ended up doing was...' highlights your concrete action with smooth narrative flow.",
        },
      },
    ],
  },
  sociolinguistic: {
    badge: "REGISTRO Y MITIGACIÓN DIPLOMÁTICA (HEDGING)",
    title: {
      es: "Competencia Sociolingüística y Pragmática",
      en: "Sociolinguistic and Pragmatic Competence",
    },
    explanation: {
      es: "En el entorno corporativo estadounidense, la asertividad y la objeción técnica se suavizan intencionalmente mediante frases de mitigación diplomática (hedging) para fomentar la colaboración.",
      en: "In the US corporate environment, technical objections and urgent requests are intentionally softened through diplomatic hedging to foster collaboration.",
    },
    example:
      "Direct: 'Do this right now.' → US Workplace Standard: 'Could you prioritize this ticket when you have a moment?'",
    exercises: [
      {
        question: {
          es: "Necesitas saber si una colega tiene disponibilidad esta semana para revisar una arquitectura. ¿Cuál es la forma estándar en el entorno profesional de EE. UU.?",
          en: "You need to check whether a colleague has capacity this week to review an architecture diagram. Which phrasing matches the US workplace standard?",
        },
        options: {
          es: [
            "«Do you have the bandwidth to walk through this architecture this week?»",
            "«Tell me if you are doing nothing today.»",
            "«You must review my document immediately.»",
          ],
          en: [
            "'Do you have the bandwidth to walk through this architecture this week?'",
            "'Tell me if you are doing nothing today.'",
            "'You must review my document immediately.'",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! Combinar «bandwidth» (capacidad disponible) y «walk through» (revisar paso a paso) es natural, cortés y profesional en EE. UU.",
          en: "Well done! Combining 'bandwidth' and 'walk through' is natural, polite, and idiomatic in US professional settings.",
        },
      },
      {
        question: {
          es: "Un cliente pide agregar una función grande sin cambiar la fecha de entrega. ¿Cómo respondes con cortesía pragmática (push back)?",
          en: "A client asks to add a major feature without moving the deadline. How do you push back politely?",
        },
        options: {
          es: [
            "«We'd be happy to include that; however, to keep quality high, we'd need to adjust the launch date by one week.»",
            "«That is an impossible and ridiculous request.»",
            "«No, we don't work on Fridays.»",
          ],
          en: [
            "'We'd be happy to include that; however, to keep quality high, we'd need to adjust the launch date by one week.'",
            "'That is an impossible and ridiculous request.'",
            "'No, we don't work on Fridays.'",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Impecable! Reconocer el pedido y explicar la restricción («however, to keep quality high...») mantiene una relación constructiva.",
          en: "Impeccable! Acknowledging the request before stating the trade-off ('however, to keep quality high...') keeps collaboration constructive.",
        },
      },
      {
        question: {
          es: "Estás en una reunión y necesitas interrumpir brevemente para aclarar un dato crucial. ¿Qué fórmula es adecuada?",
          en: "You are in a meeting and need to step in briefly to clarify a crucial figure. Which phrase is appropriate?",
        },
        options: {
          es: [
            "«Sorry to jump in—could I quickly clarify the Q2 numbers before we move on?»",
            "«Stop talking now, it is my turn.»",
            "«You are reading the wrong chart.»",
          ],
          en: [
            "'Sorry to jump in—could I quickly clarify the Q2 numbers before we move on?'",
            "'Stop talking now, it is my turn.'",
            "'You are reading the wrong chart.'",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! «Sorry to jump in...» es la transición pragmática estándar para intervenir sin sonar brusco.",
          en: "Correct! 'Sorry to jump in...' is the standard pragmatic softener for interjecting politely.",
        },
      },
      {
        question: {
          es: "Quieres pedirle a alguien que te ayude con una tarea urgente sin sonar autoritario. ¿Qué opción eliges?",
          en: "You want to ask a teammate for help with an urgent task without sounding demanding. Which option do you choose?",
        },
        options: {
          es: [
            "«Would you mind taking a quick look at this draft when you have a moment?»",
            "«Fix this draft before 3 p.m. or else.»",
            "«Why haven't you finished this yet?»",
          ],
          en: [
            "'Would you mind taking a quick look at this draft when you have a moment?'",
            "'Fix this draft before 3 p.m. or else.'",
            "'Why haven't you finished this yet?'",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Excelente! «Would you mind + -ing» suaviza peticiones directas en cualquier entorno laboral.",
          en: "Excellent! 'Would you mind + -ing' softens direct requests in any professional setting.",
        },
      },
    ],
  },
  strategic: {
    badge: "PARAFRASEO RÁPIDO Y CIRCUNLOQUIO",
    title: {
      es: "Competencia Estratégica (Strategic Competence)",
      en: "Strategic Competence",
    },
    explanation: {
      es: "Desarrolla la agilidad para reformular una idea técnica de 3 formas distintas (parafraseo rápido) o describir un concepto mediante circunloquio sin detener el flujo de la conversación.",
      en: "Build the agility to rephrase a complex technical idea in 3 different ways (rapid paraphrasing) or use circumlocution without breaking conversational flow.",
    },
    example:
      "Original: 'We must avoid technical debt.' → Paraphrase: 'What we need to prevent is taking shortcuts today that will slow down our engineering velocity tomorrow.'",
    exercises: [
      {
        question: {
          es: "Durante una presentación olvidas el término exacto «bottleneck» (cuello de botella). ¿Qué respuesta demuestra alta Competencia Estratégica?",
          en: "During a presentation, you momentarily forget the exact word 'bottleneck'. Which response demonstrates strong Strategic Competence?",
        },
        options: {
          es: [
            "«It’s the specific stage in the pipeline where traffic backs up and slows down the entire system.»",
            "Detener la presentación en silencio durante un minuto.",
            "Abandonar la llamada sin explicar el punto.",
          ],
          en: [
            "'It’s the specific stage in the pipeline where traffic backs up and slows down the entire system.'",
            "Stop the presentation in silence for a full minute.",
            "Leave the call without explaining your point.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Exacto! Definir la función del concepto con fluidez mantiene tu autoridad comunicativa intacta.",
          en: "Spot on! Defining the concept's function smoothly keeps your communicative authority intact.",
        },
      },
      {
        question: {
          es: "Notas que un cliente no entendió un término técnico como «latency». ¿Cómo lo parafraseas al instante para hacerlo claro?",
          en: "You notice a client didn't understand a technical term like 'latency'. How do you paraphrase it on the spot?",
        },
        options: {
          es: [
            "«In other words, it’s the slight delay between clicking a button and seeing the app respond.»",
            "«Just look it up in a computer science textbook.»",
            "«Latency means latency, nothing else.»",
          ],
          en: [
            "'In other words, it’s the slight delay between clicking a button and seeing the app respond.'",
            "'Just look it up in a computer science textbook.'",
            "'Latency means latency, nothing else.'",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Muy bien! «In other words...» seguido de una analogía cotidiana es una herramienta estratégica clave.",
          en: "Well done! 'In other words...' followed by an everyday example is a key strategic tool.",
        },
      },
      {
        question: {
          es: "En una llamada con mala conexión no escuchaste la fecha límite que dijo tu interlocutor. ¿Qué estrategia mantiene el control de la conversación?",
          en: "On a noisy call, you missed the deadline mentioned by the other speaker. Which strategy keeps the conversation moving smoothly?",
        },
        options: {
          es: [
            "«Just to make sure I caught that correctly, did you say the target date is Thursday the 14th?»",
            "Fingir que entendiste todo y entregar el trabajo otro día.",
            "Colgar el teléfono sin avisar.",
          ],
          en: [
            "'Just to make sure I caught that correctly, did you say the target date is Thursday the 14th?'",
            "Pretend you understood everything and guess the date.",
            "Hang up the phone without warning.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Correcto! Verificar comprensión con «Just to make sure I caught that correctly...» evita malentendidos costosos.",
          en: "Correct! Confirming comprehension with 'Just to make sure I caught that correctly...' prevents costly misunderstandings.",
        },
      },
      {
        question: {
          es: "Te hacen una pregunta compleja y necesitas 3 segundos para organizar tu respuesta en inglés. ¿Qué marcador estratégico usas?",
          en: "Someone asks you a complex question and you need 3 seconds to organize your answer in English. Which strategic filler works best?",
        },
        options: {
          es: [
            "«That’s a great question—let me break my answer down into two parts.»",
            "Quedarte completamente mudo mirando la cámara.",
            "Responder «No speak English» y cambiar de tema.",
          ],
          en: [
            "'That’s a great question—let me break my answer down into two parts.'",
            "Stay completely silent staring at the camera.",
            "Say 'No speak English' and change the subject.",
          ],
        },
        correctIndex: 0,
        feedback: {
          es: "¡Excelente! Comprar tiempo de procesamiento con estructura («let me break my answer down...») proyecta seguridad.",
          en: "Excellent! Buying processing time with structure ('let me break my answer down...') projects confidence.",
        },
      },
    ],
  },
};

/* ==========================================================================
   State & Storage Helpers
   ========================================================================== */

let currentLang = "es";
let activeLevelId = "a0";
let activeShipSectionId = "logbook";
let activeExerciseIndices = {
  grammar: 0,
  vocab: 0,
  listening: 0,
  ship: 0,
};
let currentMonthIdx = 2; // November 2026 in SHIP_MONTHS_DATA
let isAudioPlaying = false;
let audioIntervalId = null;

function getSavedProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function markExerciseCompleted(key) {
  try {
    const prog = getSavedProgress();
    prog[key] = true;
    localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(prog));
  } catch {
    // ignore
  }
}

function announceToScreenReader(message) {
  const announcer = document.getElementById("sr-announcer");
  if (!announcer) return;
  announcer.textContent = "";
  setTimeout(() => {
    announcer.textContent = message;
  }, 50);
}

/* ==========================================================================
   Theme Management (Light / Dark / High Contrast)
   ========================================================================== */

const THEMES = ["light", "dark", "contrast"];

function applyTheme(themeId, announce = false) {
  const validTheme = THEMES.includes(themeId) ? themeId : "light";
  document.documentElement.setAttribute("data-theme", validTheme);

  const toggleBtn = document.getElementById("theme-toggle-btn");
  const themeLabel = document.getElementById("theme-label");
  const dict = UI_TEXT[currentLang] || UI_TEXT.es;

  const labelMap = {
    light: dict.themeLight,
    dark: dict.themeDark,
    contrast: dict.themeContrast,
  };

  if (themeLabel) {
    themeLabel.textContent = labelMap[validTheme];
  }

  if (toggleBtn) {
    toggleBtn.setAttribute("aria-pressed", String(validTheme !== "light"));
    toggleBtn.setAttribute(
      "aria-label",
      currentLang === "es"
        ? `Cambiar tema de color para accesibilidad. Tema actual: ${labelMap[validTheme]}`
        : `Change color theme for accessibility. Current theme: ${labelMap[validTheme]}`
    );
  }

  try {
    localStorage.setItem(STORAGE_THEME_KEY, validTheme);
  } catch {
    // ignore
  }

  if (announce) {
    announceToScreenReader(
      currentLang === "es"
        ? `Tema cambiado a ${labelMap[validTheme]}`
        : `Theme changed to ${labelMap[validTheme]}`
    );
  }
}

function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_THEME_KEY);
  } catch {
    saved = null;
  }

  if (saved && THEMES.includes(saved)) {
    applyTheme(saved, false);
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-contrast: more)").matches
  ) {
    applyTheme("contrast", false);
  } else {
    applyTheme("light", false);
  }

  const toggleBtn = document.getElementById("theme-toggle-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-theme") || "light";
      const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
      applyTheme(next, true);
    });
  }
}

/* ==========================================================================
   Language Management (Spanish Default <-> Full English)
   ========================================================================== */

function applyLanguage(lang, announce = false) {
  currentLang = lang === "en" ? "en" : "es";
  document.documentElement.setAttribute("lang", currentLang);

  const dict = UI_TEXT[currentLang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && dict[key]) {
      el.textContent = dict[key];
    }
  });

  const langBtn = document.getElementById("lang-toggle-btn");
  const langCodeEl = document.getElementById("lang-code-badge");
  const langTextEl = document.getElementById("lang-btn-text");

  if (langCodeEl) langCodeEl.textContent = currentLang.toUpperCase();
  if (langTextEl) {
    langTextEl.textContent = currentLang === "es" ? "Español" : "English";
  }
  if (langBtn) {
    langBtn.setAttribute("title", dict.langBtnTitle);
    langBtn.setAttribute("aria-label", dict.langBtnTitle);
  }

  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(currentTheme, false);

  try {
    localStorage.setItem(STORAGE_LANG_KEY, currentLang);
  } catch {
    // ignore
  }

  // Re-render dynamic views on language switch
  renderLevelTabLabels();
  const pageType = document.body.getAttribute("data-page");
  if (pageType === "port") renderCrewRanksOnPort();
  if (pageType === "grammar") renderGrammarLevel(activeLevelId);
  if (pageType === "vocabulary") renderVocabLevel(activeLevelId);
  if (pageType === "listening") renderListeningLevel(activeLevelId);
  if (pageType === "ship") {
    renderShipSection(activeShipSectionId);
    renderMonthCalendar();
    renderWeeklyLessons();
    renderCompletedLessonsResume();
  }

  if (announce) {
    announceToScreenReader(
      currentLang === "es"
        ? "Idioma cambiado a Español"
        : "Language switched to English"
    );
  }
}

function initLanguage() {
  let savedLang = "es";
  try {
    savedLang = localStorage.getItem(STORAGE_LANG_KEY) || "es";
  } catch {
    savedLang = "es";
  }

  applyLanguage(savedLang, false);

  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const nextLang = currentLang === "es" ? "en" : "es";
      applyLanguage(nextLang, true);
    });
  }
}

/* ==========================================================================
   Web Speech API Helper
   ========================================================================== */

function speakEnglish(text, rate = 0.95) {
  if (!("speechSynthesis" in window)) {
    announceToScreenReader(text);
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}

/* ==========================================================================
   Port Page: Render 7 Crew Ranks Cards ("What Each Rank Can Do")
   ========================================================================== */

function renderCrewRanksOnPort() {
  const container = document.getElementById("crew-ranks-container");
  if (!container) return;

  container.innerHTML = "";

  CREW_RANKS.forEach((rank) => {
    const card = document.createElement("article");
    card.className = "rank-card";

    const bulletsHtml = rank.canDo[currentLang]
      .map((item) => `<li>${item}</li>`)
      .join("");

    const grammarLabel = currentLang === "es" ? "Gramática" : "Grammar";
    const vocabLabel = currentLang === "es" ? "Vocabulario" : "Vocabulary";
    const listenLabel = currentLang === "es" ? "Listening" : "Listening";

    card.innerHTML = `
      <div>
        <div class="rank-card-top">
          <span class="rank-badge-icon" title="${rank.badgeLabel[currentLang]}" aria-hidden="true">${rank.badge}</span>
          <div>
            <span class="rank-level-num">${rank.shortTitle[currentLang]}</span>
            <h3 class="rank-name-title">${rank.name[currentLang]}</h3>
          </div>
        </div>
        <p class="rank-meaning" style="margin-top: 0.65rem">${rank.subtitle[currentLang]}</p>
        <ul class="rank-can-do-list" style="margin-top: 0.55rem">
          ${bulletsHtml}
        </ul>
      </div>
      <div>
        <div class="rank-example-quote" style="margin-bottom: 0.75rem">
          “${rank.example}”
        </div>
        <div class="rank-card-actions">
          <a href="pages/grammar.html?level=${rank.id}" class="level-pill-link">${grammarLabel} →</a>
          <a href="pages/vocabulary.html?level=${rank.id}" class="level-pill-link">${vocabLabel} →</a>
          <a href="pages/listening.html?level=${rank.id}" class="level-pill-link">${listenLabel} →</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/* ==========================================================================
   Shared Crew Rank Bar & Multiple-Choice Renderer
   ========================================================================== */

function renderLevelTabLabels() {
  document.querySelectorAll(".level-tab-btn[data-level]").forEach((btn) => {
    const lvlId = btn.getAttribute("data-level");
    const rankObj = CREW_RANKS.find((r) => r.id === lvlId);
    if (rankObj) {
      btn.innerHTML = `<span aria-hidden="true">${rankObj.badge}</span> <span>${rankObj.shortTitle[currentLang]}</span>`;
    }
  });
}

function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function setUrlParam(name, value) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    window.history.replaceState({}, "", url);
  } catch {
    // ignore
  }
}

function updateLevelTabsUI(currentId) {
  document.querySelectorAll(".level-tab-btn[data-level]").forEach((btn) => {
    const lvl = btn.getAttribute("data-level");
    btn.classList.toggle("active", lvl === currentId);
    btn.setAttribute("aria-selected", String(lvl === currentId));
  });
}

function getExerciseProgressKey(modulePrefix, unitId, exerciseIndex) {
  return exerciseIndex === 0
    ? `${modulePrefix}-${unitId}`
    : `${modulePrefix}-${unitId}-${exerciseIndex + 1}`;
}

function renderExerciseStepper({
  modulePrefix,
  unitId,
  totalCount,
  activeIndex,
  onSelect,
}) {
  const counterBadge = document.getElementById("exercise-counter-badge");
  const stepperEl = document.getElementById("exercise-stepper");
  const navRowEl = document.getElementById("exercise-nav-row");

  if (counterBadge) {
    counterBadge.textContent = `${activeIndex + 1} / ${totalCount}`;
  }

  if (stepperEl) {
    const progress = getSavedProgress();
    stepperEl.innerHTML = "";
    for (let i = 0; i < totalCount; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      const key = getExerciseProgressKey(modulePrefix, unitId, i);
      const isDone = Boolean(progress[key]);
      btn.className = "exercise-step-btn";
      if (i === activeIndex) btn.classList.add("active");
      if (isDone) btn.classList.add("completed");
      btn.setAttribute(
        "aria-label",
        currentLang === "es"
          ? `Ejercicio ${i + 1} de ${totalCount}${isDone ? " (completado)" : ""}`
          : `Exercise ${i + 1} of ${totalCount}${isDone ? " (completed)" : ""}`
      );
      btn.setAttribute("aria-pressed", String(i === activeIndex));
      btn.innerHTML = isDone
        ? `<span class="step-check-icon" aria-hidden="true">✓</span> ${i + 1}`
        : `${i + 1}`;
      btn.addEventListener("click", () => onSelect(i));
      stepperEl.appendChild(btn);
    }
  }

  if (navRowEl) {
    navRowEl.innerHTML = "";
    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "btn btn-secondary exercise-next-btn";
    const isLast = activeIndex >= totalCount - 1;
    nextBtn.textContent = isLast
      ? currentLang === "es"
        ? "↺ Volver al Ejercicio 1"
        : "↺ Back to Exercise 1"
      : currentLang === "es"
      ? "Siguiente Ejercicio →"
      : "Next Exercise →";
    nextBtn.addEventListener("click", () => {
      onSelect((activeIndex + 1) % totalCount);
    });
    navRowEl.appendChild(nextBtn);
  }
}

function renderOptionsAndBind({
  options,
  correctIndex,
  feedbackText,
  progressKey,
  onSuccess,
}) {
  const optionsContainer = document.getElementById("exercise-options");
  const feedbackEl = document.getElementById("exercise-feedback");
  if (!optionsContainer || !feedbackEl) return;

  optionsContainer.innerHTML = "";
  feedbackEl.className = "feedback-banner";
  feedbackEl.textContent = "";

  const letters = ["A", "B", "C", "D"];
  const resolvedOptions = Array.isArray(options)
    ? options
    : options[currentLang] || options.es || [];

  resolvedOptions.forEach((optText, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.innerHTML = `
      <span class="option-letter" aria-hidden="true">${letters[idx]}</span>
      <span>${optText}</span>
    `;

    btn.addEventListener("click", () => {
      optionsContainer.querySelectorAll(".option-btn").forEach((b) => {
        b.classList.remove("selected-correct", "selected-wrong");
      });

      if (idx === correctIndex) {
        btn.classList.add("selected-correct");
        feedbackEl.className = "feedback-banner visible success";
        feedbackEl.textContent = `✓ ${feedbackText}`;
        markExerciseCompleted(progressKey);
        announceToScreenReader(feedbackText);
        if (typeof onSuccess === "function") onSuccess();
      } else {
        btn.classList.add("selected-wrong");
        feedbackEl.className = "feedback-banner visible error";
        const tryAgainMsg =
          currentLang === "es"
            ? "✕ Respuesta incorrecta. Revisa la guía del rango e inténtalo de nuevo."
            : "✕ Not quite right. Review the rank guide and try again.";
        feedbackEl.textContent = tryAgainMsg;
        announceToScreenReader(tryAgainMsg);
      }
    });

    optionsContainer.appendChild(btn);
  });
}

function bindPrevNextButtons(renderFn) {
  const prevBtn = document.getElementById("prev-level-btn");
  const nextBtn = document.getElementById("next-level-btn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const idx = CREW_RANKS.findIndex((l) => l.id === activeLevelId);
      const prevIdx = (idx - 1 + CREW_RANKS.length) % CREW_RANKS.length;
      renderFn(CREW_RANKS[prevIdx].id);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const idx = CREW_RANKS.findIndex((l) => l.id === activeLevelId);
      const nextIdx = (idx + 1) % CREW_RANKS.length;
      renderFn(CREW_RANKS[nextIdx].id);
    });
  }
}

/* ==========================================================================
   Page 1: Grammar Workshop Renderer
   ========================================================================== */

function renderGrammarLevel(levelId, exerciseIndex = null) {
  const validId = GRAMMAR_DATA[levelId] ? levelId : "a0";
  if (exerciseIndex !== null) {
    activeExerciseIndices.grammar = exerciseIndex;
  } else if (validId !== activeLevelId) {
    activeExerciseIndices.grammar = 0;
  }
  activeLevelId = validId;
  setUrlParam("level", validId);
  updateLevelTabsUI(validId);

  const item = GRAMMAR_DATA[validId];
  const exercises = item.exercises || [];
  const exIdx = Math.min(
    Math.max(activeExerciseIndices.grammar, 0),
    Math.max(exercises.length - 1, 0)
  );
  activeExerciseIndices.grammar = exIdx;
  const ex = exercises[exIdx];
  const rankMeta = CREW_RANKS.find((l) => l.id === validId);

  const badgeEl = document.getElementById("level-code-badge");
  const titleEl = document.getElementById("theory-title");
  const subEl = document.getElementById("rank-subtitle-line");
  const expEl = document.getElementById("theory-explanation");
  const wrongEl = document.getElementById("grammar-wrong-ex");
  const rightEl = document.getElementById("grammar-right-ex");
  const questionEl = document.getElementById("exercise-question");

  if (badgeEl && rankMeta) {
    badgeEl.textContent = `${rankMeta.badge} ${rankMeta.shortTitle[currentLang]}`;
  }
  if (titleEl) titleEl.textContent = item.title[currentLang];
  if (subEl && rankMeta) subEl.textContent = rankMeta.subtitle[currentLang];
  if (expEl) expEl.textContent = item.explanation[currentLang];
  if (wrongEl) wrongEl.textContent = item.wrongExample;
  if (rightEl) rightEl.textContent = item.rightExample;
  if (questionEl && ex) questionEl.textContent = ex.question[currentLang];

  const refreshStepper = () => {
    renderExerciseStepper({
      modulePrefix: "grammar",
      unitId: validId,
      totalCount: exercises.length,
      activeIndex: exIdx,
      onSelect: (nextIdx) => renderGrammarLevel(validId, nextIdx),
    });
  };

  refreshStepper();
  if (ex) {
    renderOptionsAndBind({
      options: ex.options,
      correctIndex: ex.correctIndex,
      feedbackText: ex.feedback[currentLang],
      progressKey: getExerciseProgressKey("grammar", validId, exIdx),
      onSuccess: refreshStepper,
    });
  }
}

function initGrammarPage() {
  renderLevelTabLabels();
  const paramLevel = (getUrlParam("level") || "a0").toLowerCase();
  document.querySelectorAll(".level-tab-btn[data-level]").forEach((btn) => {
    btn.addEventListener("click", () => {
      renderGrammarLevel(btn.getAttribute("data-level"));
    });
  });
  bindPrevNextButtons(renderGrammarLevel);
  renderGrammarLevel(paramLevel);
}

/* ==========================================================================
   Page 2: Vocabulary & Pronunciation Renderer
   ========================================================================== */

function renderVocabLevel(levelId, exerciseIndex = null) {
  const validId = VOCAB_DATA[levelId] ? levelId : "a0";
  if (exerciseIndex !== null) {
    activeExerciseIndices.vocab = exerciseIndex;
  } else if (validId !== activeLevelId) {
    activeExerciseIndices.vocab = 0;
  }
  activeLevelId = validId;
  setUrlParam("level", validId);
  updateLevelTabsUI(validId);

  const levelData = VOCAB_DATA[validId];
  const exercises = levelData.exercises || [];
  const exIdx = Math.min(
    Math.max(activeExerciseIndices.vocab, 0),
    Math.max(exercises.length - 1, 0)
  );
  activeExerciseIndices.vocab = exIdx;
  const item = exercises[exIdx];
  const rankMeta = CREW_RANKS.find((l) => l.id === validId);

  const badgeEl = document.getElementById("level-code-badge");
  const wordEl = document.getElementById("vocab-target-word");
  const ipaEl = document.getElementById("vocab-target-ipa");
  const defEl = document.getElementById("vocab-target-def");
  const contrastEl = document.getElementById("vocab-phonetic-note");
  const exEl = document.getElementById("vocab-context-sentence");
  const questionEl = document.getElementById("exercise-question");

  if (badgeEl && rankMeta) {
    badgeEl.textContent = `${rankMeta.badge} ${rankMeta.shortTitle[currentLang]}`;
  }
  if (item) {
    if (wordEl) wordEl.textContent = item.word;
    if (ipaEl) ipaEl.textContent = item.ipa;
    if (defEl) defEl.textContent = item.definition[currentLang];
    if (contrastEl) contrastEl.textContent = item.contrast[currentLang];
    if (exEl) exEl.textContent = `“${item.example}”`;
    if (questionEl) questionEl.textContent = item.question[currentLang];
  }

  const refreshStepper = () => {
    renderExerciseStepper({
      modulePrefix: "vocab",
      unitId: validId,
      totalCount: exercises.length,
      activeIndex: exIdx,
      onSelect: (nextIdx) => renderVocabLevel(validId, nextIdx),
    });
  };

  refreshStepper();
  if (item) {
    renderOptionsAndBind({
      options: item.options,
      correctIndex: item.correctIndex,
      feedbackText: item.feedback[currentLang],
      progressKey: getExerciseProgressKey("vocab", validId, exIdx),
      onSuccess: refreshStepper,
    });
  }
}

function initVocabPage() {
  renderLevelTabLabels();
  const paramLevel = (getUrlParam("level") || "a0").toLowerCase();
  document.querySelectorAll(".level-tab-btn[data-level]").forEach((btn) => {
    btn.addEventListener("click", () => {
      renderVocabLevel(btn.getAttribute("data-level"));
    });
  });

  const normalBtn = document.getElementById("speak-word-normal");
  const slowBtn = document.getElementById("speak-word-slow");
  const sentenceBtn = document.getElementById("speak-sentence-btn");

  const getActiveVocabItem = () => {
    const levelData = VOCAB_DATA[activeLevelId];
    if (!levelData || !levelData.exercises) return null;
    return levelData.exercises[activeExerciseIndices.vocab] || levelData.exercises[0];
  };

  if (normalBtn) {
    normalBtn.addEventListener("click", () => {
      const item = getActiveVocabItem();
      if (item) speakEnglish(item.word, 0.95);
    });
  }
  if (slowBtn) {
    slowBtn.addEventListener("click", () => {
      const item = getActiveVocabItem();
      if (item) speakEnglish(item.word, 0.65);
    });
  }
  if (sentenceBtn) {
    sentenceBtn.addEventListener("click", () => {
      const item = getActiveVocabItem();
      if (item) speakEnglish(item.example, 0.92);
    });
  }

  bindPrevNextButtons(renderVocabLevel);
  renderVocabLevel(paramLevel);
}

/* ==========================================================================
   Page 3: Listening Comprehension Renderer
   ========================================================================== */

function renderListeningLevel(levelId, exerciseIndex = null) {
  const validId = LISTENING_DATA[levelId] ? levelId : "a0";
  if (exerciseIndex !== null) {
    activeExerciseIndices.listening = exerciseIndex;
  } else if (validId !== activeLevelId) {
    activeExerciseIndices.listening = 0;
  }
  activeLevelId = validId;
  setUrlParam("level", validId);
  updateLevelTabsUI(validId);

  const levelData = LISTENING_DATA[validId];
  const exercises = levelData.exercises || [];
  const exIdx = Math.min(
    Math.max(activeExerciseIndices.listening, 0),
    Math.max(exercises.length - 1, 0)
  );
  activeExerciseIndices.listening = exIdx;
  const item = exercises[exIdx];
  const rankMeta = CREW_RANKS.find((l) => l.id === validId);

  const badgeEl = document.getElementById("level-code-badge");
  const titleEl = document.getElementById("theory-title");
  const scenarioEl = document.getElementById("theory-explanation");
  const durationEl = document.getElementById("listening-duration");
  const transcriptEl = document.getElementById("listening-transcript");
  const questionEl = document.getElementById("exercise-question");
  const waveformEl = document.getElementById("listening-waveform");

  if (badgeEl && rankMeta) {
    badgeEl.textContent = `${rankMeta.badge} ${rankMeta.shortTitle[currentLang]}`;
  }
  if (item) {
    if (titleEl) titleEl.textContent = item.title[currentLang];
    if (scenarioEl) scenarioEl.textContent = item.scenario[currentLang];
    if (durationEl) durationEl.textContent = item.duration;
    if (transcriptEl) transcriptEl.textContent = `“${item.audioScript}”`;
    if (questionEl) questionEl.textContent = item.question[currentLang];
  }
  if (waveformEl) waveformEl.classList.remove("playing");

  const refreshStepper = () => {
    renderExerciseStepper({
      modulePrefix: "listening",
      unitId: validId,
      totalCount: exercises.length,
      activeIndex: exIdx,
      onSelect: (nextIdx) => renderListeningLevel(validId, nextIdx),
    });
  };

  refreshStepper();
  if (item) {
    renderOptionsAndBind({
      options: item.options,
      correctIndex: item.correctIndex,
      feedbackText: item.feedback[currentLang],
      progressKey: getExerciseProgressKey("listening", validId, exIdx),
      onSuccess: refreshStepper,
    });
  }
}

function initListeningPage() {
  renderLevelTabLabels();
  const paramLevel = (getUrlParam("level") || "a0").toLowerCase();
  document.querySelectorAll(".level-tab-btn[data-level]").forEach((btn) => {
    btn.addEventListener("click", () => {
      renderListeningLevel(btn.getAttribute("data-level"));
    });
  });

  const playNormalBtn = document.getElementById("listen-play-normal");
  const playSlowBtn = document.getElementById("listen-play-slow");
  const transcriptBtn = document.getElementById("toggle-transcript-btn");
  const transcriptBox = document.getElementById("listening-transcript");
  const waveformEl = document.getElementById("listening-waveform");

  function playScenarioAudio(rate) {
    const levelData = LISTENING_DATA[activeLevelId];
    const exercises = levelData && levelData.exercises ? levelData.exercises : [];
    const item = exercises[activeExerciseIndices.listening] || exercises[0];
    if (!item) return;
    if (waveformEl) waveformEl.classList.add("playing");
    speakEnglish(item.audioScript, rate);
    setTimeout(() => {
      if (waveformEl) waveformEl.classList.remove("playing");
    }, 5500);
  }

  if (playNormalBtn) {
    playNormalBtn.addEventListener("click", () => playScenarioAudio(0.96));
  }
  if (playSlowBtn) {
    playSlowBtn.addEventListener("click", () => playScenarioAudio(0.72));
  }
  if (transcriptBtn && transcriptBox) {
    transcriptBtn.addEventListener("click", () => {
      transcriptBox.classList.toggle("open");
    });
  }

  bindPrevNextButtons(renderListeningLevel);
  renderListeningLevel(paramLevel);
}

/* ==========================================================================
   Page 4: My Ship (Profile Photo, Month Calendar, Week Calendar, Lesson Resume & Competences)
   ========================================================================== */

function renderMonthCalendar() {
  const monthObj = SHIP_MONTHS_DATA[currentMonthIdx];
  const titleEl = document.getElementById("month-cal-title");
  const gridEl = document.getElementById("month-calendar-grid");
  const summaryEl = document.getElementById("month-cal-summary");
  if (!monthObj || !gridEl) return;

  if (titleEl) {
    titleEl.textContent = monthObj.name[currentLang];
  }

  gridEl.innerHTML = "";

  // Empty leading slots
  for (let i = 0; i < monthObj.startOffset; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "cal-day-cell empty";
    emptyCell.setAttribute("aria-hidden", "true");
    gridEl.appendChild(emptyCell);
  }

  let blueCount = 0;
  let greenCount = 0;
  let redCount = 0;

  for (let day = 1; day <= monthObj.daysInMonth; day++) {
    const status = monthObj.statuses[day] || "";
    const cell = document.createElement("div");
    let statusClass = "";
    let statusAria = "";

    if (status === "goal") {
      statusClass = "day-goal";
      blueCount++;
      statusAria =
        currentLang === "es"
          ? `Día ${day}: Meta diaria alcanzada (Azul)`
          : `Day ${day}: Daily goal reached (Blue)`;
    } else if (status === "worked") {
      statusClass = "day-worked";
      greenCount++;
      statusAria =
        currentLang === "es"
          ? `Día ${day}: Día trabajado (Verde)`
          : `Day ${day}: Day worked (Green)`;
    } else if (status === "missed") {
      statusClass = "day-missed";
      redCount++;
      statusAria =
        currentLang === "es"
          ? `Día ${day}: Día perdido (Rojo)`
          : `Day ${day}: Day missed (Red)`;
    }

    cell.className = `cal-day-cell ${statusClass}`;
    cell.textContent = String(day);
    if (statusAria) {
      cell.setAttribute("title", statusAria);
      cell.setAttribute("aria-label", statusAria);
    }

    gridEl.appendChild(cell);
  }

  if (summaryEl) {
    summaryEl.textContent =
      currentLang === "es"
        ? `Resumen de ${monthObj.name.es}: 🔵 ${blueCount} metas alcanzadas • 🟢 ${greenCount} días trabajados • 🔴 ${redCount} días perdidos`
        : `${monthObj.name.en} Summary: 🔵 ${blueCount} goals reached • 🟢 ${greenCount} days worked • 🔴 ${redCount} days missed`;
  }
}

function renderWeeklyLessons() {
  const weekGrid = document.getElementById("week-lessons-grid");
  if (!weekGrid) return;

  weekGrid.innerHTML = "";

  WEEKLY_LESSONS_WORKED.forEach((item) => {
    const card = document.createElement("article");
    const borderClass =
      item.status === "goal"
        ? "day-goal-border"
        : item.status === "worked"
        ? "day-worked-border"
        : "day-missed-border";

    card.className = `week-day-card ${borderClass}`;
    card.innerHTML = `
      <div>
        <div class="week-day-header">
          <span>${item.day[currentLang]}</span>
        </div>
        <p class="week-lesson-module" style="margin-top: 0.4rem">${item.rank[currentLang]}</p>
        <h3 class="week-lesson-name" style="margin-top: 0.25rem">${item.lesson[currentLang]}</h3>
      </div>
      <div>
        <span class="lesson-resume-meta" style="display:block; margin-bottom: 0.25rem">${item.module[currentLang]}</span>
        <span class="badge badge-outline" style="font-size: 0.65rem">${item.statusLabel[currentLang]}</span>
      </div>
    `;
    weekGrid.appendChild(card);
  });
}

function renderCompletedLessonsResume() {
  const listEl = document.getElementById("lessons-completed-list");
  const counterBadge = document.getElementById("lessons-completed-count");
  if (!listEl) return;

  listEl.innerHTML = "";

  const savedProg = getSavedProgress();
  const combinedLessons = [...DEFAULT_COMPLETED_LESSONS];

  // Add any newly completed exercises from localStorage not already in default list
  Object.keys(savedProg).forEach((key) => {
    if (!combinedLessons.some((l) => l.key === key)) {
      const [mod, lvl] = key.split("-");
      const rankObj = CREW_RANKS.find((r) => r.id === lvl);
      const rankTitle = rankObj ? `${rankObj.badge} ${rankObj.shortTitle[currentLang]}` : key;
      combinedLessons.unshift({
        key,
        title: {
          es: `${rankTitle} — Ejercicio interactivo completado`,
          en: `${rankTitle} — Interactive exercise completed`,
        },
        module: {
          es: mod === "grammar" ? "Taller de Gramática" : mod === "vocab" ? "Vocabulario y Pronunciación" : "Comprensión Auditiva",
          en: mod === "grammar" ? "Grammar Workshop" : mod === "vocab" ? "Vocabulary & Pronunciation" : "Listening Lab",
        },
        score: "100%",
      });
    }
  });

  if (counterBadge) {
    counterBadge.textContent =
      currentLang === "es"
        ? `${combinedLessons.length} Lecciones Completadas`
        : `${combinedLessons.length} Lessons Completed`;
  }

  combinedLessons.forEach((item) => {
    const row = document.createElement("div");
    row.className = "lesson-resume-item";
    row.innerHTML = `
      <div class="lesson-resume-info">
        <strong class="lesson-resume-title">${item.title[currentLang]}</strong>
        <span class="lesson-resume-meta">${item.module[currentLang]}</span>
      </div>
      <span class="badge badge-teal">✓ ${item.score}</span>
    `;
    listEl.appendChild(row);
  });
}

function initProfilePhotoUpload() {
  const fileInput = document.getElementById("profile-photo-input");
  const uploadBtn = document.getElementById("upload-photo-btn");
  const avatarImg = document.getElementById("ship-profile-img");

  if (!fileInput || !uploadBtn || !avatarImg) return;

  try {
    const savedAvatar = localStorage.getItem(STORAGE_AVATAR_KEY);
    if (savedAvatar) {
      avatarImg.src = savedAvatar;
    }
  } catch {
    // ignore
  }

  uploadBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        avatarImg.src = reader.result;
        try {
          localStorage.setItem(STORAGE_AVATAR_KEY, reader.result);
        } catch {
          // ignore quota errors
        }
        announceToScreenReader(
          currentLang === "es"
            ? "Foto de perfil actualizada"
            : "Profile photo updated"
        );
      }
    };
    reader.readAsDataURL(file);
  });
}

function renderShipSection(sectionId, exerciseIndex = null) {
  const validSections = ["logbook", "discourse", "sociolinguistic", "strategic"];
  const validId = validSections.includes(sectionId) ? sectionId : "logbook";
  if (exerciseIndex !== null) {
    activeExerciseIndices.ship = exerciseIndex;
  } else if (validId !== activeShipSectionId) {
    activeExerciseIndices.ship = 0;
  }
  activeShipSectionId = validId;
  setUrlParam("section", validId);

  document.querySelectorAll(".level-tab-btn[data-section]").forEach((btn) => {
    const sec = btn.getAttribute("data-section");
    btn.classList.toggle("active", sec === validId);
    btn.setAttribute("aria-selected", String(sec === validId));
  });

  const logbookView = document.getElementById("ship-logbook-view");
  const competenceView = document.getElementById("ship-competence-view");

  if (validId === "logbook") {
    if (logbookView) logbookView.style.display = "block";
    if (competenceView) competenceView.style.display = "none";
    renderMonthCalendar();
    renderWeeklyLessons();
    renderCompletedLessonsResume();
    return;
  }

  if (logbookView) logbookView.style.display = "none";
  if (competenceView) competenceView.style.display = "grid";

  const data = SHIP_COMPETENCE_DATA[validId];
  if (!data) return;

  const exercises = data.exercises || [];
  const exIdx = Math.min(
    Math.max(activeExerciseIndices.ship, 0),
    Math.max(exercises.length - 1, 0)
  );
  activeExerciseIndices.ship = exIdx;
  const ex = exercises[exIdx];

  const badgeEl = document.getElementById("ship-comp-badge");
  const titleEl = document.getElementById("ship-comp-title");
  const expEl = document.getElementById("ship-comp-explanation");
  const exEl = document.getElementById("ship-comp-example");
  const qEl = document.getElementById("exercise-question");

  if (badgeEl) badgeEl.textContent = data.badge;
  if (titleEl) titleEl.textContent = data.title[currentLang];
  if (expEl) expEl.textContent = data.explanation[currentLang];
  if (exEl) exEl.textContent = data.example;
  if (qEl && ex) qEl.textContent = ex.question[currentLang];

  const refreshStepper = () => {
    renderExerciseStepper({
      modulePrefix: "ship",
      unitId: validId,
      totalCount: exercises.length,
      activeIndex: exIdx,
      onSelect: (nextIdx) => renderShipSection(validId, nextIdx),
    });
  };

  refreshStepper();
  if (ex) {
    renderOptionsAndBind({
      options: ex.options,
      correctIndex: ex.correctIndex,
      feedbackText: ex.feedback[currentLang],
      progressKey: getExerciseProgressKey("ship", validId, exIdx),
      onSuccess: () => {
        refreshStepper();
        renderCompletedLessonsResume();
      },
    });
  }
}

function initShipPage() {
  initProfilePhotoUpload();

  const prevMonthBtn = document.getElementById("prev-month-btn");
  const nextMonthBtn = document.getElementById("next-month-btn");

  if (prevMonthBtn) {
    prevMonthBtn.addEventListener("click", () => {
      currentMonthIdx =
        (currentMonthIdx - 1 + SHIP_MONTHS_DATA.length) %
        SHIP_MONTHS_DATA.length;
      renderMonthCalendar();
    });
  }

  if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", () => {
      currentMonthIdx = (currentMonthIdx + 1) % SHIP_MONTHS_DATA.length;
      renderMonthCalendar();
    });
  }

  const paramSec = (getUrlParam("section") || "logbook").toLowerCase();
  document.querySelectorAll(".level-tab-btn[data-section]").forEach((btn) => {
    btn.addEventListener("click", () => {
      renderShipSection(btn.getAttribute("data-section"));
    });
  });

  renderShipSection(paramSec);
}

/* ==========================================================================
   Port (index.html) Audio & Pronunciation Previews
   ========================================================================== */

function initPortPreviews() {
  renderCrewRanksOnPort();

  const speakVocabBtn = document.getElementById("speak-vocab-btn");
  if (speakVocabBtn) {
    speakVocabBtn.addEventListener("click", () => {
      speakEnglish("Equivocal. Ambiguous; open to more than one interpretation.");
    });
  }

  const playBtn = document.getElementById("audio-play-btn");
  const playIcon = document.getElementById("audio-play-icon");
  const waveform = document.getElementById("audio-waveform");
  const timerEl = document.getElementById("audio-timer");

  if (playBtn && waveform && timerEl) {
    let remainingSeconds = 42;
    playBtn.addEventListener("click", () => {
      isAudioPlaying = !isAudioPlaying;
      playBtn.setAttribute("aria-pressed", String(isAudioPlaying));
      if (isAudioPlaying) {
        if (playIcon) playIcon.textContent = "❚❚";
        waveform.classList.add("playing");
        speakEnglish(
          "On the one hand, working from home is flexible. On the other hand, it can be lonely."
        );
        audioIntervalId = setInterval(() => {
          remainingSeconds = remainingSeconds > 1 ? remainingSeconds - 1 : 42;
          const m = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
          const s = String(remainingSeconds % 60).padStart(2, "0");
          timerEl.textContent = `${m}:${s}`;
        }, 1000);
      } else {
        if (playIcon) playIcon.textContent = "▶";
        waveform.classList.remove("playing");
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        if (audioIntervalId) clearInterval(audioIntervalId);
      }
    });
  }
}

/* ==========================================================================
   Bootstrap Application on DOMContentLoaded
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLanguage();

  const pageType = document.body.getAttribute("data-page");
  if (pageType === "port") initPortPreviews();
  if (pageType === "grammar") initGrammarPage();
  if (pageType === "vocabulary") initVocabPage();
  if (pageType === "listening") initListeningPage();
  if (pageType === "ship") initShipPage();
});
