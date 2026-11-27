/**
 * LinguaVela — Progressive Spanglish-to-English Immersion Engine (js/spanglish.js)
 *
 * Implements a 7-step Second Language Acquisition (SLA) scaffolding continuum
 * from Pre-A1 (a0) to C2 Mastery (c2):
 *   - a0 (Pre-A1): ~15% English — Spanish instructions with starter English words
 *   - a1 (A1):     ~30% English — Spanish backbone with classroom English phrases
 *   - a2 (A2):     ~50% English — Balanced 50/50 Spanglish code-switching
 *   - b1 (B1):     ~70% English — English backbone with Spanish cognitive bridges
 *   - b2 (B2):     ~85% English — Near-full English with subtle Spanish anchors
 *   - c1 (C1):    100% English — Full Advanced English immersion
 *   - c2 (C2):    100% English — Full Mastery English immersion
 *
 * When the global header toggle is set to English (<html lang="en">), all text
 * resolves to 100% English across every rank.
 */

(() => {
  "use strict";

  const PROFILES = {
    a0: {
      id: "a0",
      pct: 15,
      badge: "🌱",
      ratioLabel: { spanglish: "85% Español · 15% English", en: "100% English Mode" },
      modeTitle: {
        spanglish: "Spanglish Inicial (Starter Immersion)",
        en: "Full English Mode · Level 1",
      },
    },
    a1: {
      id: "a1",
      pct: 30,
      badge: "🌿",
      ratioLabel: { spanglish: "70% Español · 30% English", en: "100% English Mode" },
      modeTitle: {
        spanglish: "Spanglish Básico (Basic Code-Switching)",
        en: "Full English Mode · Level 2",
      },
    },
    a2: {
      id: "a2",
      pct: 50,
      badge: "⚓",
      ratioLabel: { spanglish: "50% Español · 50% English", en: "100% English Mode" },
      modeTitle: {
        spanglish: "Spanglish 50/50 (Balanced Immersion)",
        en: "Full English Mode · Level 3",
      },
    },
    b1: {
      id: "b1",
      pct: 70,
      badge: "⛵",
      ratioLabel: { spanglish: "30% Español · 70% English", en: "100% English Mode" },
      modeTitle: {
        spanglish: "Spanglish Intermedio (Mostly English)",
        en: "Full English Mode · Level 4",
      },
    },
    b2: {
      id: "b2",
      pct: 85,
      badge: "🪈",
      ratioLabel: { spanglish: "15% Español · 85% English", en: "100% English Mode" },
      modeTitle: {
        spanglish: "Near-Full English (Casi 100% Inglés)",
        en: "Full English Mode · Level 5",
      },
    },
    c1: {
      id: "c1",
      pct: 100,
      badge: "🧭",
      ratioLabel: { spanglish: "100% English Immersion", en: "100% English Immersion" },
      modeTitle: {
        spanglish: "Full C1 English Immersion",
        en: "Full C1 English Immersion",
      },
    },
    c2: {
      id: "c2",
      pct: 100,
      badge: "☸️",
      ratioLabel: { spanglish: "100% English Mastery", en: "100% English Mastery" },
      modeTitle: {
        spanglish: "Full C2 English Mastery",
        en: "Full C2 English Mastery",
      },
    },
  };

  /* Hand-crafted progressive instructions per page context and rank */
  const CONTEXT_INSTRUCTIONS = {
    lesson: {
      a0: {
        spanglish:
          "Instrucciones del nivel: Lee cada explicación en español con algunas basic words en inglés, haz click en 🔊 para listen y responde cada question sin prisa.",
        en: "Level instructions: Read each starter guide, click 🔊 to listen out loud, and answer every practice question at your own pace.",
      },
      a1: {
        spanglish:
          "Instrucciones (Spanglish A1): Read cada bloque con calma, listen a las sentences en voz alta y choose la correct option en las actividades y new sections.",
        en: "Level A1 instructions: Read each block step by step, listen to the example sentences out loud, and choose the correct option in every activity.",
      },
      a2: {
        spanglish:
          "Instructions (Spanglish 50/50): Read each grammar guide y revisa los examples en contexto; luego complete the quizzes y las 3 new sections de este rango.",
        en: "Level A2 instructions: Read each grammar guide, study the contextual examples, and complete the quizzes and 3 interactive skill sections.",
      },
      b1: {
        spanglish:
          "Instructions (70% English): Study each grammar block y fíjate en el context; repeat the audio examples out loud and complete las actividades interactivas below.",
        en: "Level B1 instructions: Study each grammar block in context, repeat the audio examples out loud, and complete all interactive sections below.",
      },
      b2: {
        spanglish:
          "Instructions (85% English): Analyze each upper-intermediate structure, pay attention al registro y los matices, and test your command across every section.",
        en: "Level B2 instructions: Analyze each upper-intermediate structure, pay close attention to register and nuance, and test your command across every section.",
      },
      c1: {
        spanglish:
          "Level C1 Instructions (100% English): All explanations, prompts, and skill labs at Navigator rank are presented entirely in English. Focus on register, cohesion, and stylistic precision.",
        en: "Level C1 Instructions (100% English): All explanations, prompts, and skill labs at Navigator rank are presented entirely in English. Focus on register, cohesion, and stylistic precision.",
      },
      c2: {
        spanglish:
          "Level C2 Instructions (100% English): Welcome to full Captain-level immersion. Every explanation, reading, idiom analysis, and pragmatic roleplay is conducted exclusively in English.",
        en: "Level C2 Instructions (100% English): Welcome to full Captain-level immersion. Every explanation, reading, idiom analysis, and pragmatic roleplay is conducted exclusively in English.",
      },
    },
    grammar: {
      a0: {
        spanglish:
          "Instrucciones: Lee la guía de este rango, mira el example (✕ / ✓) y haz click en la correct answer para completar la sentence.",
        en: "Instructions: Read the rank guide, compare the wrong and right examples, and click the correct answer to complete the sentence.",
      },
      a1: {
        spanglish:
          "Instrucciones: Read la regla de gramática, revisa el example de tu daily routine y choose la correct form del verb.",
        en: "Instructions: Read the grammar rule, check the daily routine example, and choose the correct verb form.",
      },
      a2: {
        spanglish:
          "Instructions: Read the rank guide, compara el wrong vs. right example y select the best option para cada past o future sentence.",
        en: "Instructions: Read the rank guide, compare the wrong vs. right example, and select the best option for each sentence.",
      },
      b1: {
        spanglish:
          "Instructions: Review the target structure y observa cómo funciona in context; luego choose the option que complete cada sentence correctamente.",
        en: "Instructions: Review the target structure in context, then choose the option that accurately completes each sentence.",
      },
      b2: {
        spanglish:
          "Instructions: Examine the syntactic pattern and discourse connectors (fíjate en el matiz), then select the most natural option.",
        en: "Instructions: Examine the syntactic pattern and discourse connectors, then select the most natural option.",
      },
      c1: {
        spanglish:
          "Instructions (100% English): Analyze the advanced grammatical structure, stylistic inversion, or subjunctive form, and select the precise option.",
        en: "Instructions (100% English): Analyze the advanced grammatical structure, stylistic inversion, or subjunctive form, and select the precise option.",
      },
      c2: {
        spanglish:
          "Instructions (100% English): Evaluate register, aspectual attitude, and near-native syntactic nuance before selecting the most accurate completion.",
        en: "Instructions (100% English): Evaluate register, aspectual attitude, and near-native syntactic nuance before selecting the most accurate completion.",
      },
    },
    vocabulary: {
      a0: {
        spanglish:
          "Instrucciones: Haz click en 🔊 para listen la pronunciación de cada word, mírala en el example y elige la correct answer.",
        en: "Instructions: Click 🔊 to listen to each target word, read it in the example sentence, and choose the correct answer.",
      },
      a1: {
        spanglish:
          "Instrucciones: Listen a la target word a velocidad normal o slow (0.75x), read la nota de pronunciación y choose la correct option.",
        en: "Instructions: Listen to the target word at normal or slow (0.75x) speed, read the pronunciation note, and choose the correct option.",
      },
      a2: {
        spanglish:
          "Instructions: Listen to the word and example sentence, revisa el IPA phonetic focus y select the right meaning o collocation.",
        en: "Instructions: Listen to the word and example sentence, review the IPA phonetic focus, and select the right meaning or collocation.",
      },
      b1: {
        spanglish:
          "Instructions: Play the native audio, practica el linking y Flap T en voz alta, and select the option que mejor encaje in context.",
        en: "Instructions: Play the native audio, practice linking and Flap T out loud, and select the option that best fits in context.",
      },
      b2: {
        spanglish:
          "Instructions: Compare stress, IPA, and connected speech (presta atención a la colocación), then choose the most accurate lexical choice.",
        en: "Instructions: Compare stress, IPA, and connected speech, then choose the most accurate lexical choice.",
      },
      c1: {
        spanglish:
          "Instructions (100% English): Listen closely to prosody and stress placement, examine register and collocation, and select the precise C1 lexical item.",
        en: "Instructions (100% English): Listen closely to prosody and stress placement, examine register and collocation, and select the precise C1 lexical item.",
      },
      c2: {
        spanglish:
          "Instructions (100% English): Assess subtle connotation, polysemy, and connected-speech prosody, then select the exact near-native expression.",
        en: "Instructions (100% English): Assess subtle connotation, polysemy, and connected-speech prosody, then select the exact near-native expression.",
      },
    },
    listening: {
      a0: {
        spanglish:
          "Instrucciones: Haz click en 🔊 para listen el audio (usa 🐢 Slow si necesitas ayuda) y elige la correct answer sobre lo que escuchaste.",
        en: "Instructions: Click 🔊 to play the audio clip (use 🐢 Slow if helpful) and choose the correct answer about what you heard.",
      },
      a1: {
        spanglish:
          "Instrucciones: Listen al audio primero sin mirar el texto, luego check la question y choose la correct answer.",
        en: "Instructions: Listen to the audio clip first without reading the transcript, then check the question and choose the correct answer.",
      },
      a2: {
        spanglish:
          "Instructions: Play the audio a 1.0x o 0.75x, identifica los key details y select the best answer antes de abrir el transcript.",
        en: "Instructions: Play the audio at 1.0x or 0.75x, catch the key details, and select the best answer before opening the transcript.",
      },
      b1: {
        spanglish:
          "Instructions: Listen for main ideas and connected speech primero sin transcript; then choose the option que responda con exactitud.",
        en: "Instructions: Listen for main ideas and connected speech without the transcript first, then choose the option that answers accurately.",
      },
      b2: {
        spanglish:
          "Instructions: Focus on speaker attitude, implied details, and linking (evita leer el transcript al inicio), then select the best answer.",
        en: "Instructions: Focus on speaker attitude, implied details, and linking before revealing the transcript, then select the best answer.",
      },
      c1: {
        spanglish:
          "Instructions (100% English): Listen at natural speed to capture hedging, stance, and implicit meaning, then answer the comprehension prompt.",
        en: "Instructions (100% English): Listen at natural speed to capture hedging, stance, and implicit meaning, then answer the comprehension prompt.",
      },
      c2: {
        spanglish:
          "Instructions (100% English): Process fast, idiomatic discourse for subtle implicature, register, and rhetorical intent before consulting the transcript.",
        en: "Instructions (100% English): Process fast, idiomatic discourse for subtle implicature, register, and rhetorical intent before consulting the transcript.",
      },
    },
  };

  /* Progressive UI labels for shared interactive widgets */
  const LEVEL_UI = {
    theoryBadge: {
      a0: "GUÍA DEL RANGO Y EXAMPLE",
      a1: "GUÍA Y CONTEXT (A1)",
      a2: "RANK GUIDE Y CONTEXTO",
      b1: "RANK GUIDE & CONTEXTO",
      b2: "RANK GUIDE & CONTEXT (B2)",
      c1: "RANK GUIDE & CONTEXT",
      c2: "RANK GUIDE & CONTEXT",
      en: "RANK GUIDE & CONTEXT",
    },
    exampleLabel: {
      a0: "EXAMPLE EN CONTEXTO",
      a1: "EXAMPLE EN LA SENTENCE",
      a2: "EXAMPLE IN CONTEXT",
      b1: "CONTEXTUAL EXAMPLE",
      b2: "CONTEXTUAL EXAMPLE",
      c1: "CONTEXTUAL EXAMPLE",
      c2: "CONTEXTUAL EXAMPLE",
      en: "CONTEXTUAL EXAMPLE",
    },
    exerciseBadge: {
      a0: "PRÁCTICA · CHOOSE LA ANSWER",
      a1: "INTERACTIVE PRACTICE",
      a2: "INTERACTIVE EXERCISE",
      b1: "INTERACTIVE EXERCISE",
      b2: "INTERACTIVE EXERCISE",
      c1: "INTERACTIVE EXERCISE",
      c2: "INTERACTIVE EXERCISE",
      en: "INTERACTIVE EXERCISE",
    },
    prevLevelBtn: {
      a0: "← Rango Anterior",
      a1: "← Previous Rango",
      a2: "← Previous Rank",
      b1: "← Previous Rank",
      b2: "← Previous Rank",
      c1: "← Previous Rank",
      c2: "← Previous Rank",
      en: "← Previous Rank",
    },
    nextLevelBtn: {
      a0: "Siguiente Rango →",
      a1: "Next Rango →",
      a2: "Next Rank →",
      b1: "Next Rank →",
      b2: "Next Rank →",
      c1: "Next Rank →",
      c2: "Next Rank →",
      en: "Next Rank →",
    },
    nextExerciseBtn: {
      a0: "Siguiente Question →",
      a1: "Next Ejercicio →",
      a2: "Next Exercise →",
      b1: "Next Exercise →",
      b2: "Next Exercise →",
      c1: "Next Exercise →",
      c2: "Next Exercise →",
      en: "Next Exercise →",
    },
    backToFirstBtn: {
      a0: "↺ Volver al #1",
      a1: "↺ Back al Ejercicio 1",
      a2: "↺ Back to Exercise 1",
      b1: "↺ Back to Exercise 1",
      b2: "↺ Back to Exercise 1",
      c1: "↺ Back to Exercise 1",
      c2: "↺ Back to Exercise 1",
      en: "↺ Back to Exercise 1",
    },
    tryAgainMsg: {
      a0: "✕ Casi... Lee la guía del nivel y try again (inténtalo de nuevo).",
      a1: "✕ Respuesta incorrecta. Read la regla y try again.",
      a2: "✕ Not quite right. Revisa la rule del rango y try again.",
      b1: "✕ Not quite right. Revisa el context guide and try again.",
      b2: "✕ Not quite right. Check the structure nuance and try again.",
      c1: "✕ Not quite right. Review the rank guide and try again.",
      c2: "✕ Not quite right. Review the rank guide and try again.",
      en: "✕ Not quite right. Review the rank guide and try again.",
    },
    listenNormalBtn: {
      a0: "🔊 Listen / Escuchar (1.0x)",
      a1: "🔊 Listen (1.0x)",
      a2: "🔊 Listen (1.0x)",
      b1: "🔊 Listen (1.0x)",
      b2: "🔊 Listen (1.0x)",
      c1: "🔊 Listen (1.0x)",
      c2: "🔊 Listen (1.0x)",
      en: "🔊 Listen (1.0x)",
    },
    listenSlowBtn: {
      a0: "🐢 Slow / Lento (0.75x)",
      a1: "🐢 Slow (0.75x)",
      a2: "🐢 Slow (0.75x)",
      b1: "🐢 Slow (0.75x)",
      b2: "🐢 Slow (0.75x)",
      c1: "🐢 Slow (0.75x)",
      c2: "🐢 Slow (0.75x)",
      en: "🐢 Slow (0.75x)",
    },
    toggleTranscriptBtn: {
      a0: "📄 Ver / Ocultar Transcript",
      a1: "📄 Show / Ocultar Transcript",
      a2: "📄 Show / Hide Transcript",
      b1: "📄 Show / Hide Transcript",
      b2: "📄 Show / Hide Transcript",
      c1: "📄 Show / Hide Transcript",
      c2: "📄 Show / Hide Transcript",
      en: "📄 Show / Hide Transcript",
    },
  };

  /* Safe Spanish -> Spanglish rules for lower/mid levels (applied outside quotes & tags) */
  const ES_RULES_A0 = [
    [/¡Correcto!/g, "¡Correct!"],
    [/¡Muy bien!/g, "¡Very good!"],
    [/¡Exacto!/g, "¡Exact!"],
    [/¡Excelente!/g, "¡Excellent!"],
    [/\bHaz clic\b/g, "Haz click"],
    [/\bhaz clic\b/g, "haz click"],
    [/\bEscucha\b/g, "Listen (escucha)"],
    [/\brespuesta correcta\b/g, "correct answer"],
    [/\brespuesta\b/g, "answer"],
    [/\bEjemplo\b/g, "Example"],
    [/\bejemplo\b/g, "example"],
    [/\bejemplos\b/g, "examples"],
    [/\bpalabra\b/g, "word"],
    [/\bpalabras\b/g, "words"],
  ];

  const ES_RULES_A1 = [
    [/¡Correcto!/g, "Correct!"],
    [/\bCorrecto:/g, "Correct:"],
    [/¡Muy bien!/g, "Well done!"],
    [/¡Muy bien,/g, "Well done,"],
    [/¡Exacto!/g, "Spot on!"],
    [/¡Excelente!/g, "Excellent!"],
    [/\bCompleta la oración\b/g, "Complete la sentence"],
    [/\bCompleta la frase\b/g, "Complete la sentence"],
    [/\bCompleta\b/g, "Complete"],
    [/\bElige la forma correcta\b/g, "Choose la correct form"],
    [/\bElige la opción correcta\b/g, "Choose la correct option"],
    [/\bElige\b/g, "Choose"],
    [/\bSelecciona\b/g, "Select"],
    [/\bEscucha\b/g, "Listen"],
    [/\bescucha\b/g, "listen"],
    [/\bLee\b/g, "Read"],
    [/\bHaz clic\b/g, "Click"],
    [/\bhaz clic\b/g, "click"],
    [/\boración\b/g, "sentence"],
    [/\boraciones\b/g, "sentences"],
    [/\bpregunta\b/g, "question"],
    [/\bpreguntas\b/g, "questions"],
    [/\brespuesta\b/g, "answer"],
    [/\brespuestas\b/g, "answers"],
    [/\bEjemplo\b/g, "Example"],
    [/\bejemplo\b/g, "example"],
    [/\bejemplos\b/g, "examples"],
    [/\bverbo\b/g, "verb"],
    [/\bverbos\b/g, "verbs"],
    [/\bpalabra\b/g, "word"],
    [/\bpalabras\b/g, "words"],
    [/\brutina diaria\b/g, "daily routine"],
    [/\bInténtalo de nuevo\b/g, "Try again"],
    [/\binténtalo de nuevo\b/g, "try again"],
  ];

  const ES_RULES_A2 = [
    ...ES_RULES_A1,
    [/\bComplete la sentence\b/g, "Complete the sentence"],
    [/\bChoose la correct form\b/g, "Choose the correct form"],
    [/\bChoose la correct option\b/g, "Choose the correct option"],
    [/\bpregunta correcta\b/g, "correct question"],
    [/\bopción correcta\b/g, "correct option"],
    [/\bforma correcta\b/g, "correct form"],
    [/\ben pasado\b/g, "in the past"],
    [/\ben futuro\b/g, "in the future"],
    [/\bregla\b/g, "rule"],
    [/\breglas\b/g, "rules"],
    [/\bhistoria\b/g, "story"],
    [/\bhistorias\b/g, "stories"],
    [/\bconsejo\b/g, "advice"],
    [/\bviaje\b/g, "trip"],
    [/\bviajes\b/g, "trips"],
    [/\bcompras\b/g, "shopping"],
    [/\bPráctica\b/g, "Practice"],
    [/\bpráctica\b/g, "practice"],
    [/\bEnfoque fonético\b/g, "Phonetic focus"],
    [/\bPista\b/g, "Hint"],
    [/\bTodavía no\./g, "Not quite yet."],
  ];

  /* Safe English -> Spanglish bridge rules for B1 (70% EN) and B2 (85% EN) */
  const EN_RULES_B1 = [
    [/^Complete\b/, "Completa"],
    [/^Choose\b/, "Elige"],
    [/^Select\b/, "Selecciona"],
    [/^Listen to\b/, "Escucha"],
    [/^Listen\b/, "Escucha"],
    [/^Change to\b/, "Pasa a"],
    [/^Correct!/, "¡Correcto!"],
    [/^Well done!/, "¡Muy bien!"],
    [/^Exactly!/, "¡Exacto!"],
    [/^Exact!/, "¡Exacto!"],
    [/^Spot on!/, "¡Exacto!"],
    [/^Excellent,/, "¡Excelente,"],
    [/^Nice!/, "¡Bien!"],
    [/\babout\b/g, "sobre"],
    [/\bbecause\b/g, "porque"],
    [/\bwithout\b/g, "sin"],
    [/\bfor example\b/gi, "por ejemplo"],
    [/\bhowever\b/gi, "sin embargo"],
    [/\bRemember\b/g, "Recuerda"],
  ];

  const EN_RULES_B2 = [
    [/^Correct!/, "¡Correcto! —"],
    [/^Well done!/, "¡Muy bien! —"],
    [/^Exactly!/, "¡Exacto! —"],
    [/^Spot on!/, "¡Exacto! —"],
    [/^Complete\b/, "Completa / Complete"],
    [/^Choose\b/, "Elige / Choose"],
    [/^Select\b/, "Selecciona / Select"],
    [/\bfor example\b/gi, "por ejemplo"],
    [/\bRemember\b/g, "Recuerda"],
  ];

  function isEnglishGlobal() {
    return document.documentElement.lang === "en";
  }

  function normalizeLevel(levelId) {
    const clean = String(levelId || "a0").toLowerCase();
    return PROFILES[clean] ? clean : "a0";
  }

  /**
   * Applies regex replacements only outside HTML tags and quoted example spans
   * so target English sentences inside «...», “...”, or '...' stay untouched.
   */
  function transformOutsideQuotes(text, rules) {
    if (!text || typeof text !== "string" || !rules || !rules.length) return text;
    const tokenRegex = /(<[^>]+>|«[^»]*»|“[^”]*”|(?:^|[\s:(])'[^']{2,}')/g;
    const parts = text.split(tokenRegex);
    return parts
      .map((part, idx) => {
        // Odd indices are matched protected tokens
        if (idx % 2 === 1) return part;
        let out = part;
        for (let i = 0; i < rules.length; i++) {
          out = out.replace(rules[i][0], rules[i][1]);
        }
        return out;
      })
      .join("");
  }

  function blendPair(esText, enText, levelId) {
    const lvl = normalizeLevel(levelId);
    if (isEnglishGlobal()) return enText != null ? enText : esText;
    if (lvl === "c1" || lvl === "c2") {
      return enText != null ? enText : esText;
    }
    if (lvl === "b2") {
      return transformOutsideQuotes(enText != null ? enText : esText, EN_RULES_B2);
    }
    if (lvl === "b1") {
      return transformOutsideQuotes(enText != null ? enText : esText, EN_RULES_B1);
    }
    if (lvl === "a2") {
      return transformOutsideQuotes(esText != null ? esText : enText, ES_RULES_A2);
    }
    if (lvl === "a1") {
      return transformOutsideQuotes(esText != null ? esText : enText, ES_RULES_A1);
    }
    return transformOutsideQuotes(esText != null ? esText : enText, ES_RULES_A0);
  }

  /**
   * Resolves an i18n object ({ es, en, spanglish? }) or primitive for a given level.
   */
  function resolve(value, levelId) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return value;
    if (isEnglishGlobal()) {
      return value.en != null ? value.en : value.spanglish || value.es || "";
    }
    if (value.spanglish != null) {
      return value.spanglish;
    }
    if ("es" in value || "en" in value) {
      return blendPair(value.es, value.en, levelId);
    }
    return value;
  }

  function ui(key, levelId) {
    const entry = LEVEL_UI[key];
    if (!entry) return "";
    if (isEnglishGlobal()) return entry.en;
    const lvl = normalizeLevel(levelId);
    return entry[lvl] || entry.en;
  }

  function getProfile(levelId) {
    return PROFILES[normalizeLevel(levelId)];
  }

  function getInstruction(contextKey, levelId) {
    const lvl = normalizeLevel(levelId);
    const ctx = CONTEXT_INSTRUCTIONS[contextKey] || CONTEXT_INSTRUCTIONS.lesson;
    const item = ctx[lvl] || ctx.a0;
    return isEnglishGlobal() ? item.en : item.spanglish;
  }

  function renderBanner(levelId, contextKey = "lesson") {
    const lvl = normalizeLevel(levelId);
    const prof = getProfile(lvl);
    const enMode = isEnglishGlobal();
    const modeTitle = enMode ? prof.modeTitle.en : prof.modeTitle.spanglish;
    const ratioLabel = enMode ? prof.ratioLabel.en : prof.ratioLabel.spanglish;
    const fillPct = enMode ? 100 : prof.pct;
    const instruction = getInstruction(contextKey, lvl);

    return `
      <div class="spanglish-immersion-banner" data-immersion-level="${lvl}">
        <div class="spanglish-banner-top">
          <div class="spanglish-banner-title-group">
            <span class="spanglish-mode-pill">${prof.badge} ${modeTitle}</span>
            <span class="spanglish-ratio-badge">${ratioLabel}</span>
          </div>
          <div class="spanglish-meter-wrap" aria-hidden="true">
            <span class="spanglish-meter-label">ES</span>
            <div class="spanglish-meter-track">
              <div class="spanglish-meter-fill" style="width: ${fillPct}%"></div>
            </div>
            <span class="spanglish-meter-label">EN ${fillPct}%</span>
          </div>
        </div>
        <p class="spanglish-banner-instruction">${instruction}</p>
      </div>
    `;
  }

  window.LinguaSpanglish = {
    PROFILES,
    isEnglishGlobal,
    normalizeLevel,
    resolve,
    pair: blendPair,
    ui,
    getProfile,
    getInstruction,
    renderBanner,
  };
})();
