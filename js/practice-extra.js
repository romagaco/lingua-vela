/**
 * LinguaVela — Extra Practice Bank Module (js/practice-extra.js)
 * Renders a dedicated new practice section (10 extra exercises per Crew Rank)
 * on both Grammar (pages/grammar.html) and Vocabulary (pages/vocabulary.html).
 * Syncs automatically with the active Crew Rank tab and <html lang> (ES/EN).
 */

(() => {
  const root = document.getElementById("extra-practice-root");
  if (!root) return;

  const pageType = document.body.getAttribute("data-page");
  const isGrammar = pageType === "grammar";
  const isVocab = pageType === "vocabulary";
  if (!isGrammar && !isVocab) return;

  const DATA = isGrammar
    ? window.LINGUAVELA_EXTRA_GRAMMAR || {}
    : window.LINGUAVELA_EXTRA_VOCAB || {};

  const STORAGE_KEY = "linguavela-extra-practice-v1";
  const speechSupported = "speechSynthesis" in window;

  const RANK_META = {
    a0: { badge: "⚓", es: "Nivel 1: Terrícola", en: "Level 1: Landlubber" },
    a1: { badge: "🪣", es: "Nivel 2: Grumete", en: "Level 2: Cabin Mate" },
    a2: { badge: "🪢", es: "Nivel 3: Marinero de Cubierta", en: "Level 3: Deckhand" },
    b1: { badge: "⛵", es: "Nivel 4: Marinero", en: "Level 4: Sailor" },
    b2: { badge: "🪈", es: "Nivel 5: Contramaestre", en: "Level 5: Bosun" },
    c1: { badge: "🧭", es: "Nivel 6: Navegante", en: "Level 6: Navigator" },
    c2: { badge: "☸️", es: "Nivel 7: Capitán", en: "Level 7: Captain" },
  };

  const lang = () => (document.documentElement.lang === "en" ? "en" : "es");
  const L = (es, en) => (lang() === "es" ? es : en);

  let activeLevel = getActiveLevelFromDOM();
  const activeIndices = { a0: 0, a1: 0, a2: 0, b1: 0, b2: 0, c1: 0, c2: 0 };
  const sessionAnswers = {}; // { `${mode}:${level}:${idx}`: { pickedOrigIdx, correct } }

  function getActiveLevelFromDOM() {
    const activeTab = document.querySelector(".level-tab-btn.active[data-level]");
    if (activeTab) return activeTab.getAttribute("data-level") || "a0";
    const params = new URLSearchParams(window.location.search);
    const paramLevel = (params.get("level") || "a0").toLowerCase();
    return DATA[paramLevel] ? paramLevel : "a0";
  }

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore storage errors
    }
  }

  function progressKey(level, idx) {
    return `${pageType}:${level}:${idx}`;
  }

  function markCompleted(level, idx) {
    const prog = loadProgress();
    prog[progressKey(level, idx)] = true;
    saveProgress(prog);
  }

  function resetLevelProgress(level) {
    const prog = loadProgress();
    const list = DATA[level] || [];
    list.forEach((_, idx) => {
      const k = progressKey(level, idx);
      delete prog[k];
      delete sessionAnswers[k];
    });
    saveProgress(prog);
    activeIndices[level] = 0;
    render();
  }

  function speakText(text, rate = 0.9) {
    if (!speechSupported || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    const voice =
      voices.find((v) => v.lang === "en-US") ||
      voices.find((v) => v.lang && v.lang.startsWith("en"));
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }

  // Deterministic option order per (level, questionIndex) so correct answers
  // are naturally distributed across A, B, C, D without jumping on re-render.
  function getOrderedOptions(options, level, qIdx) {
    const resolved = Array.isArray(options)
      ? options
      : options[lang()] || options.es || [];
    const items = resolved.map((text, origIdx) => ({ text, origIdx }));
    if (items.length <= 1) return items;
    const seed = level.charCodeAt(0) * 31 + level.charCodeAt(1) * 17 + qIdx * 13;
    const shift = seed % items.length;
    return items.slice(shift).concat(items.slice(0, shift));
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function render() {
    const list = DATA[activeLevel] || [];
    if (list.length === 0) {
      root.innerHTML = "";
      return;
    }

    const idx = Math.min(Math.max(activeIndices[activeLevel] || 0, 0), list.length - 1);
    activeIndices[activeLevel] = idx;
    const ex = list[idx];
    const rank = RANK_META[activeLevel] || RANK_META.a0;
    const prog = loadProgress();

    let completedCount = 0;
    const stepperHtml = list
      .map((_, i) => {
        const k = progressKey(activeLevel, i);
        const isDone = Boolean(prog[k]);
        if (isDone) completedCount++;
        const cls = [
          "exercise-step-btn",
          i === idx ? "active" : "",
          isDone ? "completed" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return `
          <button type="button" class="${cls}" data-extra-step="${i}" aria-pressed="${i === idx}" aria-label="${L(
            `Ejercicio extra ${i + 1} de ${list.length}`,
            `Extra exercise ${i + 1} of ${list.length}`
          )}">
            ${isDone ? `<span class="step-check-icon" aria-hidden="true">✓</span> ${i + 1}` : `${i + 1}`}
          </button>`;
      })
      .join("");

    const pct = Math.round((completedCount / list.length) * 100);
    const key = progressKey(activeLevel, idx);
    const state = sessionAnswers[key];
    const letters = ["A", "B", "C", "D"];
    const orderedOptions = getOrderedOptions(ex.options, activeLevel, idx);

    const optionsHtml = orderedOptions
      .map((opt, displayIdx) => {
        let cls = "option-btn";
        if (state && state.pickedOrigIdx === opt.origIdx) {
          cls += state.correct ? " selected-correct" : " selected-wrong";
        }
        return `
          <button type="button" class="${cls}" data-extra-opt="${opt.origIdx}">
            <span class="option-letter" aria-hidden="true">${letters[displayIdx]}</span>
            <span>${escapeHtml(opt.text)}</span>
          </button>`;
      })
      .join("");

    let feedbackHtml = "";
    if (state) {
      feedbackHtml = state.correct
        ? `<div class="feedback-banner visible success" role="status">✓ ${escapeHtml(ex.feedback[lang()])}</div>`
        : `<div class="feedback-banner visible error" role="status">✕ ${L(
            "Respuesta incorrecta. Inténtalo de nuevo.",
            "Not quite right. Try again."
          )}</div>`;
    }

    const focusChipHtml =
      isVocab && ex.focusWord
        ? `
          <div class="extra-vocab-focus">
            <span class="extra-vocab-word">${escapeHtml(ex.focusWord)}</span>
            ${ex.ipa ? `<span class="vocab-ipa">${escapeHtml(ex.ipa)}</span>` : ""}
            ${
              speechSupported
                ? `<button type="button" class="icon-circle-btn" data-extra-speak="${escapeHtml(
                    ex.focusWord
                  )}" aria-label="${L("Escuchar pronunciación", "Listen to pronunciation")}">🔊</button>`
                : ""
            }
          </div>
        `
        : "";

    const eyebrow = isGrammar
      ? L("NUEVA ZONA • BANCO DE PRÁCTICA EXTRA DE GRAMÁTICA", "NEW SPOT • EXTRA GRAMMAR PRACTICE BANK")
      : L("NUEVA ZONA • BANCO DE PRÁCTICA EXTRA DE VOCABULARIO", "NEW SPOT • EXTRA VOCABULARY PRACTICE BANK");

    const heading = isGrammar
      ? L("10 Ejercicios Extra de Gramática", "10 Extra Grammar Exercises")
      : L("10 Ejercicios Extra de Vocabulario", "10 Extra Vocabulary Exercises");

    const subtitle = isGrammar
      ? L(
          "Refuerza este rango con 10 retos adicionales independientes del taller principal.",
          "Reinforce this rank with 10 additional challenges separate from the main workshop."
        )
      : L(
          "Amplía tu léxico, colocaciones y pronunciación con 10 retos adicionales para este rango.",
          "Expand your lexicon, collocations, and pronunciation with 10 additional challenges for this rank."
        );

    root.innerHTML = `
      <article class="card extra-practice-card">
        <div class="extra-practice-header">
          <div>
            <span class="card-eyebrow">${eyebrow}</span>
            <h2 class="theory-title extra-practice-title">${heading}</h2>
            <p class="extra-practice-sub">${subtitle}</p>
          </div>
          <div class="extra-practice-meta">
            <span class="badge badge-teal">${rank.badge} ${rank[lang()]}</span>
            <span class="badge badge-warm">${completedCount} / ${list.length} ${L("completados", "completed")}</span>
            <button type="button" class="btn btn-light extra-reset-btn" data-extra-reset="true">
              ↺ ${L("Reiniciar set", "Reset set")}
            </button>
          </div>
        </div>

        <div class="extra-progress-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${L(
          "Progreso del banco extra",
          "Extra practice progress"
        )}">
          <div class="extra-progress-fill" style="width: ${pct}%"></div>
        </div>

        <div class="exercise-stepper extra-stepper" role="tablist" aria-label="${L(
          "Selector de 10 ejercicios extra",
          "10 extra exercises selector"
        )}">
          ${stepperHtml}
        </div>

        <div class="extra-question-area">
          <div class="extra-question-top">
            <span class="badge badge-warm">${L("Reto", "Challenge")} ${idx + 1} / ${list.length}</span>
            ${focusChipHtml}
          </div>
          <div class="exercise-prompt-box">${escapeHtml(ex.question[lang()])}</div>
          <div class="options-list" role="group" aria-label="${L("Opciones de respuesta", "Answer options")}">
            ${optionsHtml}
          </div>
          ${feedbackHtml}
        </div>

        <div class="extra-nav-footer">
          <button type="button" class="btn btn-light" data-extra-prev="true">
            ← ${L("Anterior", "Previous")}
          </button>
          <button type="button" class="btn btn-dark" data-extra-next="true">
            ${
              idx >= list.length - 1
                ? L("↺ Volver al 1", "↺ Back to 1")
                : L("Siguiente Reto →", "Next Challenge →")
            }
          </button>
        </div>
      </article>
    `;
  }

  /* ==========================================================================
     Events & Synchronization
     ========================================================================== */

  root.addEventListener("click", (event) => {
    const stepBtn = event.target.closest("[data-extra-step]");
    if (stepBtn) {
      activeIndices[activeLevel] = Number(stepBtn.dataset.extraStep);
      render();
      return;
    }

    const optBtn = event.target.closest("[data-extra-opt]");
    if (optBtn) {
      const list = DATA[activeLevel] || [];
      const idx = activeIndices[activeLevel] || 0;
      const ex = list[idx];
      if (!ex) return;
      const pickedOrigIdx = Number(optBtn.dataset.extraOpt);
      const isCorrect = pickedOrigIdx === ex.correctIndex;
      sessionAnswers[progressKey(activeLevel, idx)] = { pickedOrigIdx, correct: isCorrect };
      if (isCorrect) markCompleted(activeLevel, idx);
      render();
      return;
    }

    if (event.target.closest("[data-extra-prev]")) {
      const len = (DATA[activeLevel] || []).length;
      if (len > 0) {
        activeIndices[activeLevel] = (activeIndices[activeLevel] - 1 + len) % len;
        render();
      }
      return;
    }

    if (event.target.closest("[data-extra-next]")) {
      const len = (DATA[activeLevel] || []).length;
      if (len > 0) {
        activeIndices[activeLevel] = (activeIndices[activeLevel] + 1) % len;
        render();
      }
      return;
    }

    if (event.target.closest("[data-extra-reset]")) {
      resetLevelProgress(activeLevel);
      return;
    }

    const speakBtn = event.target.closest("[data-extra-speak]");
    if (speakBtn) {
      speakText(speakBtn.dataset.extraSpeak, 0.88);
    }
  });

  function syncLevel() {
    const nextLevel = getActiveLevelFromDOM();
    if (nextLevel !== activeLevel && DATA[nextLevel]) {
      activeLevel = nextLevel;
      render();
    }
  }

  // Watch the level tabs so switching ranks (via tabs or Prev/Next Rank buttons) updates immediately
  const levelTabsContainer = document.querySelector(".level-tabs");
  if (levelTabsContainer) {
    new MutationObserver(syncLevel).observe(levelTabsContainer, {
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "aria-selected"],
    });
  }

  // Watch <html lang> so ES/EN toggle updates immediately
  new MutationObserver(render).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });

  // Initial render (after main.js initializes the URL-selected level tab)
  window.addEventListener("DOMContentLoaded", () => {
    activeLevel = getActiveLevelFromDOM();
    render();
  });

  // Fallback immediate render if DOMContentLoaded already fired
  if (document.readyState !== "loading") {
    activeLevel = getActiveLevelFromDOM();
    render();
  }
})();
