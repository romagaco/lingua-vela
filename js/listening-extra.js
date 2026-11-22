/**
 * LinguaVela — Extra Listening Sections Renderer (js/listening-extra.js)
 * Renders 2 additional evidence-based listening sections on pages/listening.html:
 *   1. Micro-Dictation & Connected Speech Cloze (70 exercises: 10 per level, a0–c2)
 *   2. Interactive Dialogue & Next-Reply Challenge (70 exercises: 10 per level, a0–c2)
 * Syncs automatically with the active Crew Rank tab and <html lang> (ES/EN).
 */

(() => {
  const dictationRoot = document.getElementById("listening-dictation-root");
  const dialogueRoot = document.getElementById("listening-dialogue-root");
  if (!dictationRoot && !dialogueRoot) return;

  const DICTATION_DATA = window.LINGUAVELA_LISTENING_DICTATION || {};
  const DIALOGUE_DATA = window.LINGUAVELA_LISTENING_DIALOGUE || {};

  const STORAGE_KEY = "linguavela-listening-extra-v1";
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

  const dictationIndices = { a0: 0, a1: 0, a2: 0, b1: 0, b2: 0, c1: 0, c2: 0 };
  const dialogueIndices = { a0: 0, a1: 0, a2: 0, b1: 0, b2: 0, c1: 0, c2: 0 };

  // Session state
  const dictationState = {}; // { `${level}:${idx}`: { inputVal, submitted, correct } }
  const dialogueState = {}; // { `${level}:${idx}`: { pickedOrigIdx, correct, revealPrompt } }

  function getActiveLevelFromDOM() {
    const activeTab = document.querySelector(".level-tab-btn.active[data-level]");
    if (activeTab) return activeTab.getAttribute("data-level") || "a0";
    const params = new URLSearchParams(window.location.search);
    const paramLevel = (params.get("level") || "a0").toLowerCase();
    return DICTATION_DATA[paramLevel] ? paramLevel : "a0";
  }

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveProgress(prog) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prog));
    } catch {
      // ignore storage errors
    }
  }

  function markDone(section, level, idx) {
    const prog = loadProgress();
    prog[`${section}:${level}:${idx}`] = true;
    saveProgress(prog);
  }

  function resetSection(section, level) {
    const prog = loadProgress();
    for (let i = 0; i < 10; i++) {
      delete prog[`${section}:${level}:${i}`];
      if (section === "dictation") delete dictationState[`${level}:${i}`];
      if (section === "dialogue") delete dialogueState[`${level}:${i}`];
    }
    saveProgress(prog);
    if (section === "dictation") {
      dictationIndices[level] = 0;
      renderDictation();
    } else {
      dialogueIndices[level] = 0;
      renderDialogue();
    }
  }

  function speakText(text, rate = 1.0) {
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

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getOrderedItems(arr, level, qIdx) {
    const items = arr.map((text, origIdx) => ({ text, origIdx }));
    if (items.length <= 1) return items;
    const seed = level.charCodeAt(0) * 29 + level.charCodeAt(1) * 19 + qIdx * 11;
    const shift = seed % items.length;
    return items.slice(shift).concat(items.slice(0, shift));
  }

  function normalizeAnswer(str) {
    return String(str || "")
      .trim()
      .toLowerCase()
      .replace(/[.,!?"]/g, "")
      .replace(/\s+/g, " ");
  }

  /* ==========================================================================
     Section 1: Micro-Dictation & Connected Speech Cloze Renderer
     ========================================================================== */

  function renderDictation() {
    if (!dictationRoot) return;
    const list = DICTATION_DATA[activeLevel] || [];
    if (list.length === 0) {
      dictationRoot.innerHTML = "";
      return;
    }

    const idx = Math.min(Math.max(dictationIndices[activeLevel] || 0, 0), list.length - 1);
    dictationIndices[activeLevel] = idx;
    const item = list[idx];
    const rank = RANK_META[activeLevel] || RANK_META.a0;
    const prog = loadProgress();
    const stateKey = `${activeLevel}:${idx}`;
    const state = dictationState[stateKey] || { inputVal: "", submitted: false, correct: false };

    let completedCount = 0;
    const stepperHtml = list
      .map((_, i) => {
        const isDone = Boolean(prog[`dictation:${activeLevel}:${i}`]);
        if (isDone) completedCount++;
        const cls = [
          "exercise-step-btn",
          i === idx ? "active" : "",
          isDone ? "completed" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return `
          <button type="button" class="${cls}" data-dict-step="${i}" aria-pressed="${i === idx}">
            ${isDone ? `<span class="step-check-icon" aria-hidden="true">✓</span> ${i + 1}` : `${i + 1}`}
          </button>`;
      })
      .join("");

    const pct = Math.round((completedCount / list.length) * 100);
    const blankFill = state.inputVal
      ? `<span class="dictation-blank-pill ${
          state.submitted ? (state.correct ? "is-correct" : "is-wrong") : "is-filled"
        }">${escapeHtml(state.inputVal)}</span>`
      : `<span class="dictation-blank-pill">_______</span>`;

    const clozeHtml = escapeHtml(item.clozeTemplate).replace("___", blankFill);

    const orderedBank = getOrderedItems(item.wordBank || [], activeLevel, idx);
    const wordBankHtml = orderedBank
      .map((chip) => {
        const isSelected =
          normalizeAnswer(state.inputVal) === normalizeAnswer(chip.text);
        let cls = "dictation-chip-btn";
        if (isSelected && state.submitted) {
          cls += state.correct ? " chip-correct" : " chip-wrong";
        } else if (isSelected) {
          cls += " chip-active";
        }
        return `
          <button type="button" class="${cls}" data-dict-chip="${escapeHtml(chip.text)}">
            ${escapeHtml(chip.text)}
          </button>`;
      })
      .join("");

    let feedbackHtml = "";
    if (state.submitted) {
      feedbackHtml = state.correct
        ? `<div class="feedback-banner visible success" role="status">✓ ${escapeHtml(
            item.feedback[lang()]
          )}</div>`
        : `<div class="feedback-banner visible error" role="status">✕ ${L(
            "No coincide exactamente. Escucha de nuevo a 0.75x o elige una palabra del banco.",
            "Not an exact match. Listen again at 0.75x or pick a word from the word bank."
          )}</div>`;
    }

    dictationRoot.innerHTML = `
      <article class="card extra-practice-card listening-extra-card">
        <div class="extra-practice-header">
          <div>
            <span class="card-eyebrow">${L(
              "SECCIÓN 1 • MICRO-DICTADO Y CONNECTED SPEECH (ESTILO DUOLINGO / RACHEL'S ENGLISH)",
              "SECTION 1 • MICRO-DICTATION & CONNECTED SPEECH CLOZE (DUOLINGO / RACHEL'S ENGLISH STYLE)"
            )}</span>
            <h2 class="theory-title extra-practice-title">${L(
              "Laboratorio de Micro-Dictado y Enlaces Fonéticos",
              "Micro-Dictation & Connected Speech Lab"
            )}</h2>
            <p class="extra-practice-sub">${L(
              "Escucha la oración a velocidad normal, lenta o rápida y escribe (o selecciona) la palabra exacta que falta.",
              "Listen to the sentence at normal, slow, or overload speed and type (or tap) the exact missing word."
            )}</p>
          </div>
          <div class="extra-practice-meta">
            <span class="badge badge-teal">${rank.badge} ${rank[lang()]}</span>
            <span class="badge badge-warm">${completedCount} / ${list.length} ${L(
              "completados",
              "completed"
            )}</span>
            <button type="button" class="btn btn-light extra-reset-btn" data-dict-reset="true">
              ↺ ${L("Reiniciar set", "Reset set")}
            </button>
          </div>
        </div>

        <div class="extra-progress-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
          <div class="extra-progress-fill" style="width: ${pct}%"></div>
        </div>

        <div class="exercise-stepper extra-stepper" role="tablist">
          ${stepperHtml}
        </div>

        <div class="extra-question-area">
          <div class="extra-question-top">
            <span class="badge badge-warm">${L("Dictado", "Dictation")} ${idx + 1} / ${list.length}</span>
            <div class="listening-speed-controls">
              <button type="button" class="btn btn-primary" data-dict-play="1">
                🔊 ${L("Escuchar (1.0x)", "Listen (1.0x)")}
              </button>
              <button type="button" class="btn btn-light" data-dict-play="0.75">
                🐢 ${L("Lento (0.75x)", "Slow (0.75x)")}
              </button>
              <button type="button" class="btn btn-light" data-dict-play="1.25">
                ⚡ ${L("Rápido (1.25x)", "Fast (1.25x)")}
              </button>
            </div>
          </div>

          <div class="example-box" style="margin: 0">
            <span class="example-box-label">${L(
              "PISTA FONÉTICA Y CONNECTED SPEECH",
              "PHONETIC & CONNECTED SPEECH CLUE"
            )}</span>
            <p style="margin: 0; font-size: 0.9rem">${escapeHtml(item.phoneticTip[lang()])}</p>
          </div>

          <div class="dictation-cloze-box" lang="en">
            ${clozeHtml}
          </div>

          <form class="dictation-input-row" data-dict-form="true">
            <input
              type="text"
              class="dictation-text-input"
              data-dict-input="true"
              value="${escapeHtml(state.inputVal)}"
              placeholder="${L(
                "Escribe la palabra que escuchaste...",
                "Type the word you heard..."
              )}"
              aria-label="${L("Palabra del dictado", "Dictation word")}"
              autocomplete="off"
            />
            <button type="submit" class="btn btn-dark">
              ✓ ${L("Comprobar", "Check")}
            </button>
          </form>

          <div class="dictation-wordbank-wrap">
            <span class="dictation-wordbank-label">${L(
              "O toca una opción del banco auditivo:",
              "Or tap an option from the audio word bank:"
            )}</span>
            <div class="dictation-wordbank-chips">
              ${wordBankHtml}
            </div>
          </div>

          ${feedbackHtml}
        </div>

        <div class="extra-nav-footer">
          <button type="button" class="btn btn-light" data-dict-prev="true">
            ← ${L("Anterior", "Previous")}
          </button>
          <button type="button" class="btn btn-dark" data-dict-next="true">
            ${
              idx >= list.length - 1
                ? L("↺ Volver al 1", "↺ Back to 1")
                : L("Siguiente Dictado →", "Next Dictation →")
            }
          </button>
        </div>
      </article>
    `;
  }

  /* ==========================================================================
     Section 2: Interactive Dialogue & Next-Reply Challenge Renderer
     ========================================================================== */

  function renderDialogue() {
    if (!dialogueRoot) return;
    const list = DIALOGUE_DATA[activeLevel] || [];
    if (list.length === 0) {
      dialogueRoot.innerHTML = "";
      return;
    }

    const idx = Math.min(Math.max(dialogueIndices[activeLevel] || 0, 0), list.length - 1);
    dialogueIndices[activeLevel] = idx;
    const item = list[idx];
    const rank = RANK_META[activeLevel] || RANK_META.a0;
    const prog = loadProgress();
    const stateKey = `${activeLevel}:${idx}`;
    const state = dialogueState[stateKey] || {
      pickedOrigIdx: null,
      correct: false,
      revealPrompt: false,
    };

    let completedCount = 0;
    const stepperHtml = list
      .map((_, i) => {
        const isDone = Boolean(prog[`dialogue:${activeLevel}:${i}`]);
        if (isDone) completedCount++;
        const cls = [
          "exercise-step-btn",
          i === idx ? "active" : "",
          isDone ? "completed" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return `
          <button type="button" class="${cls}" data-dial-step="${i}" aria-pressed="${i === idx}">
            ${isDone ? `<span class="step-check-icon" aria-hidden="true">✓</span> ${i + 1}` : `${i + 1}`}
          </button>`;
      })
      .join("");

    const pct = Math.round((completedCount / list.length) * 100);
    const showLine = state.revealPrompt || state.correct;
    const letters = ["A", "B", "C", "D"];
    const orderedOptions = getOrderedItems(item.options || [], activeLevel, idx);

    const optionsHtml = orderedOptions
      .map((opt, displayIdx) => {
        let cls = "option-btn";
        if (state.pickedOrigIdx === opt.origIdx) {
          cls += state.correct ? " selected-correct" : " selected-wrong";
        }
        return `
          <button type="button" class="${cls}" data-dial-opt="${opt.origIdx}">
            <span class="option-letter" aria-hidden="true">${letters[displayIdx]}</span>
            <span>${escapeHtml(opt.text)}</span>
          </button>`;
      })
      .join("");

    let feedbackHtml = "";
    if (state.pickedOrigIdx !== null) {
      feedbackHtml = state.correct
        ? `<div class="feedback-banner visible success" role="status">
             <div>✓ ${escapeHtml(item.feedback[lang()])}</div>
             <button type="button" class="btn btn-light dialogue-hear-reply-btn" data-dial-speak-reply="${escapeHtml(
               item.options[item.correctIndex]
             )}">
               🔊 ${L("Escuchar tu respuesta en voz alta", "Listen to your reply aloud")}
             </button>
           </div>`
        : `<div class="feedback-banner visible error" role="status">✕ ${L(
            "Esa respuesta no encaja con lo que dijo el interlocutor. Escucha el audio de nuevo e inténtalo.",
            "That reply doesn't fit what the speaker asked. Listen again and try another option."
          )}</div>`;
    }

    dialogueRoot.innerHTML = `
      <article class="card extra-practice-card listening-extra-card">
        <div class="extra-practice-header">
          <div>
            <span class="card-eyebrow">${L(
              "SECCIÓN 2 • DIÁLOGO INTERACTIVO Y RESPUESTA EN CONTEXTO (ESTILO BUSUU / BABBEL)",
              "SECTION 2 • INTERACTIVE DIALOGUE & NEXT-REPLY CHALLENGE (BUSUU / BABBEL STYLE)"
            )}</span>
            <h2 class="theory-title extra-practice-title">${L(
              "Simulador de Conversación: ¿Qué responderías?",
              "Interactive Conversation Simulator: What Do You Reply?"
            )}</h2>
            <p class="extra-practice-sub">${L(
              "Primero escucha al interlocutor sin leer el texto y elige la respuesta más natural y apropiada para la situación.",
              "Listen to the speaker first without reading the transcript, then choose the most natural reply for the situation."
            )}</p>
          </div>
          <div class="extra-practice-meta">
            <span class="badge badge-teal">${rank.badge} ${rank[lang()]}</span>
            <span class="badge badge-warm">${completedCount} / ${list.length} ${L(
              "completados",
              "completed"
            )}</span>
            <button type="button" class="btn btn-light extra-reset-btn" data-dial-reset="true">
              ↺ ${L("Reiniciar set", "Reset set")}
            </button>
          </div>
        </div>

        <div class="extra-progress-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
          <div class="extra-progress-fill" style="width: ${pct}%"></div>
        </div>

        <div class="exercise-stepper extra-stepper" role="tablist">
          ${stepperHtml}
        </div>

        <div class="extra-question-area">
          <div class="extra-question-top">
            <span class="badge badge-warm">${L("Escenario", "Scenario")} ${idx + 1} / ${list.length}</span>
            <span class="badge badge-teal">${escapeHtml(item.context[lang()])}</span>
          </div>

          <div class="dialogue-speaker-bubble">
            <div class="dialogue-speaker-top">
              <span class="dialogue-speaker-label">🎙️ ${L(
                "Interlocutor A (Escucha primero):",
                "Speaker A (Listen first):"
              )}</span>
              <div class="listening-speed-controls">
                <button type="button" class="btn btn-primary" data-dial-play="1">
                  🔊 ${L("Escuchar (1.0x)", "Listen (1.0x)")}
                </button>
                <button type="button" class="btn btn-light" data-dial-play="0.75">
                  🐢 ${L("Lento (0.75x)", "Slow (0.75x)")}
                </button>
                <button type="button" class="btn btn-light" data-dial-toggle-text="true">
                  👁️ ${
                    showLine
                      ? L("Ocultar texto", "Hide transcript")
                      : L("Revelar texto", "Reveal transcript")
                  }
                </button>
              </div>
            </div>

            <p class="dialogue-speaker-text ${showLine ? "is-revealed" : "is-hidden"}" lang="en">
              ${
                showLine
                  ? `“${escapeHtml(item.speakerALine)}”`
                  : L(
                      "🔒 Reproduce el audio para entrenar tu oído (o pulsa «Revelar texto» si necesitas ayuda).",
                      "🔒 Play the audio to train your ear first (or click 'Reveal transcript' if you need a hint)."
                    )
              }
            </p>
          </div>

          <div class="exercise-prompt-box" style="margin-bottom: 0">
            ${L(
              "💬 Tu turno (Interlocutor B): ¿Cuál es la respuesta más natural?",
              "💬 Your turn (Speaker B): Which is the most natural response?"
            )}
          </div>

          <div class="options-list" role="group">
            ${optionsHtml}
          </div>

          ${feedbackHtml}
        </div>

        <div class="extra-nav-footer">
          <button type="button" class="btn btn-light" data-dial-prev="true">
            ← ${L("Anterior", "Previous")}
          </button>
          <button type="button" class="btn btn-dark" data-dial-next="true">
            ${
              idx >= list.length - 1
                ? L("↺ Volver al 1", "↺ Back to 1")
                : L("Siguiente Diálogo →", "Next Dialogue →")
            }
          </button>
        </div>
      </article>
    `;
  }

  /* ==========================================================================
     Event Listeners — Section 1 (Dictation)
     ========================================================================== */

  if (dictationRoot) {
    dictationRoot.addEventListener("click", (event) => {
      const stepBtn = event.target.closest("[data-dict-step]");
      if (stepBtn) {
        dictationIndices[activeLevel] = Number(stepBtn.dataset.dictStep);
        renderDictation();
        return;
      }

      const playBtn = event.target.closest("[data-dict-play]");
      if (playBtn) {
        const list = DICTATION_DATA[activeLevel] || [];
        const item = list[dictationIndices[activeLevel] || 0];
        if (item) speakText(item.audioText, Number(playBtn.dataset.dictPlay) || 1);
        return;
      }

      const chipBtn = event.target.closest("[data-dict-chip]");
      if (chipBtn) {
        const list = DICTATION_DATA[activeLevel] || [];
        const idx = dictationIndices[activeLevel] || 0;
        const item = list[idx];
        if (!item) return;
        const val = chipBtn.dataset.dictChip;
        const isCorrect = normalizeAnswer(val) === normalizeAnswer(item.answer);
        dictationState[`${activeLevel}:${idx}`] = {
          inputVal: val,
          submitted: true,
          correct: isCorrect,
        };
        if (isCorrect) markDone("dictation", activeLevel, idx);
        renderDictation();
        return;
      }

      if (event.target.closest("[data-dict-prev]")) {
        const len = (DICTATION_DATA[activeLevel] || []).length;
        if (len > 0) {
          dictationIndices[activeLevel] = (dictationIndices[activeLevel] - 1 + len) % len;
          renderDictation();
        }
        return;
      }

      if (event.target.closest("[data-dict-next]")) {
        const len = (DICTATION_DATA[activeLevel] || []).length;
        if (len > 0) {
          dictationIndices[activeLevel] = (dictationIndices[activeLevel] + 1) % len;
          renderDictation();
        }
        return;
      }

      if (event.target.closest("[data-dict-reset]")) {
        resetSection("dictation", activeLevel);
      }
    });

    dictationRoot.addEventListener("submit", (event) => {
      const form = event.target.closest("[data-dict-form]");
      if (!form) return;
      event.preventDefault();
      const input = form.querySelector("[data-dict-input]");
      const val = input ? input.value : "";
      const list = DICTATION_DATA[activeLevel] || [];
      const idx = dictationIndices[activeLevel] || 0;
      const item = list[idx];
      if (!item) return;
      const isCorrect = normalizeAnswer(val) === normalizeAnswer(item.answer);
      dictationState[`${activeLevel}:${idx}`] = {
        inputVal: val,
        submitted: true,
        correct: isCorrect,
      };
      if (isCorrect) markDone("dictation", activeLevel, idx);
      renderDictation();
    });
  }

  /* ==========================================================================
     Event Listeners — Section 2 (Dialogue)
     ========================================================================== */

  if (dialogueRoot) {
    dialogueRoot.addEventListener("click", (event) => {
      const stepBtn = event.target.closest("[data-dial-step]");
      if (stepBtn) {
        dialogueIndices[activeLevel] = Number(stepBtn.dataset.dialStep);
        renderDialogue();
        return;
      }

      const playBtn = event.target.closest("[data-dial-play]");
      if (playBtn) {
        const list = DIALOGUE_DATA[activeLevel] || [];
        const item = list[dialogueIndices[activeLevel] || 0];
        if (item) speakText(item.speakerALine, Number(playBtn.dataset.dialPlay) || 1);
        return;
      }

      if (event.target.closest("[data-dial-toggle-text]")) {
        const idx = dialogueIndices[activeLevel] || 0;
        const key = `${activeLevel}:${idx}`;
        const prev = dialogueState[key] || {
          pickedOrigIdx: null,
          correct: false,
          revealPrompt: false,
        };
        dialogueState[key] = { ...prev, revealPrompt: !prev.revealPrompt };
        renderDialogue();
        return;
      }

      const optBtn = event.target.closest("[data-dial-opt]");
      if (optBtn) {
        const list = DIALOGUE_DATA[activeLevel] || [];
        const idx = dialogueIndices[activeLevel] || 0;
        const item = list[idx];
        if (!item) return;
        const pickedOrigIdx = Number(optBtn.dataset.dialOpt);
        const isCorrect = pickedOrigIdx === item.correctIndex;
        const key = `${activeLevel}:${idx}`;
        const prev = dialogueState[key] || {};
        dialogueState[key] = {
          ...prev,
          pickedOrigIdx,
          correct: isCorrect,
          revealPrompt: isCorrect ? true : Boolean(prev.revealPrompt),
        };
        if (isCorrect) markDone("dialogue", activeLevel, idx);
        renderDialogue();
        return;
      }

      const speakReplyBtn = event.target.closest("[data-dial-speak-reply]");
      if (speakReplyBtn) {
        speakText(speakReplyBtn.dataset.dialSpeakReply, 0.95);
        return;
      }

      if (event.target.closest("[data-dial-prev]")) {
        const len = (DIALOGUE_DATA[activeLevel] || []).length;
        if (len > 0) {
          dialogueIndices[activeLevel] = (dialogueIndices[activeLevel] - 1 + len) % len;
          renderDialogue();
        }
        return;
      }

      if (event.target.closest("[data-dial-next]")) {
        const len = (DIALOGUE_DATA[activeLevel] || []).length;
        if (len > 0) {
          dialogueIndices[activeLevel] = (dialogueIndices[activeLevel] + 1) % len;
          renderDialogue();
        }
        return;
      }

      if (event.target.closest("[data-dial-reset]")) {
        resetSection("dialogue", activeLevel);
      }
    });
  }

  /* ==========================================================================
     Sync with Crew Rank Tabs & Language Toggle
     ========================================================================== */

  function renderAll() {
    renderDictation();
    renderDialogue();
  }

  function syncLevel() {
    const nextLevel = getActiveLevelFromDOM();
    if (nextLevel !== activeLevel && DICTATION_DATA[nextLevel]) {
      activeLevel = nextLevel;
      renderAll();
    }
  }

  const levelTabsContainer = document.querySelector(".level-tabs");
  if (levelTabsContainer) {
    new MutationObserver(syncLevel).observe(levelTabsContainer, {
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "aria-selected"],
    });
  }

  new MutationObserver(renderAll).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });

  window.addEventListener("DOMContentLoaded", () => {
    activeLevel = getActiveLevelFromDOM();
    renderAll();
  });

  if (document.readyState !== "loading") {
    activeLevel = getActiveLevelFromDOM();
    renderAll();
  }
})();
