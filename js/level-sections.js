/**
 * LinguaVela — Renderer for the 3 New Interactive Sections per Level (js/level-sections.js)
 *
 * Renders across all 7 Lesson pages (lesson-a0.html through lesson-c2.html):
 *   1. Reading & News Capsule (VOA / British Council style) — Slow & Normal TTS, Glossary, 3-Q Quiz
 *   2. Real-World Expressions & False Friends (BBC / Busuu style) — 4 Interactive Cards + 4-Q Quiz
 *   3. Everyday Situational Roleplay (BBC English at Work style) — 3-Turn Conversational Simulator
 *
 * Uses window.LinguaSpanglish so all instructions, labels, and feedback scale smoothly
 * from Spanish + starter English words (Pre-A1) to 100% English immersion (C1 & C2).
 */

(() => {
  "use strict";

  const STORAGE_KEY = "linguavela-level-sections-v1";
  const speechSupported = "speechSynthesis" in window;

  // In-memory interactive state per level
  const stateByLevel = {};

  function getLevelState(levelId) {
    if (!stateByLevel[levelId]) {
      stateByLevel[levelId] = {
        activeGlossaryIdx: 0,
        readingAnswers: {},
        exprAnswers: {},
        roleplayTurn: 0,
        roleplayAnswers: {},
      };
    }
    return stateByLevel[levelId];
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

  function recordBest(key, score) {
    const prog = loadProgress();
    if (!prog[key] || score > prog[key]) {
      prog[key] = score;
      saveProgress(prog);
    }
  }

  function speakText(text, rate = 0.92) {
    if (!speechSupported || !text) return;
    try {
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
    } catch {
      // ignore speech errors
    }
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function resolveText(val, levelId) {
    if (window.LinguaSpanglish) {
      return window.LinguaSpanglish.resolve(val, levelId);
    }
    if (val && typeof val === "object") {
      return document.documentElement.lang === "en"
        ? val.en || val.spanglish || val.es
        : val.spanglish || val.es || val.en;
    }
    return val || "";
  }

  function pairText(esText, enText, levelId) {
    if (window.LinguaSpanglish) {
      return window.LinguaSpanglish.pair(esText, enText, levelId);
    }
    return document.documentElement.lang === "en" ? enText : esText;
  }

  // Deterministic option shuffle per (section, level, qIdx) so correct answers vary across A/B/C
  function getOrderedOptions(options, saltStr, qIdx) {
    const items = (options || []).map((text, origIdx) => ({ text, origIdx }));
    if (items.length <= 1) return items;
    let hash = qIdx * 17;
    for (let i = 0; i < saltStr.length; i++) {
      hash = (hash * 31 + saltStr.charCodeAt(i)) % 997;
    }
    const shift = hash % items.length;
    return items.slice(shift).concat(items.slice(0, shift));
  }

  function getTabDefs(levelId) {
    const enGlobal = document.documentElement.lang === "en";
    const fullEn = enGlobal || levelId === "c1" || levelId === "c2";

    const readingLabel = fullEn
      ? "📰 Reading & News"
      : levelId === "a0"
      ? "📰 Lectura · Reading"
      : levelId === "a1"
      ? "📰 Reading y Noticias"
      : "📰 Reading & News";

    const exprLabel = fullEn
      ? "💡 Expressions & False Friends"
      : levelId === "a0"
      ? "💡 Expressions y Trampas"
      : "💡 Expressions & False Friends";

    const roleplayLabel = fullEn
      ? "🎭 Situational Roleplay"
      : levelId === "a0"
      ? "🎭 Roleplay · Diálogo"
      : "🎭 Situational Roleplay";

    return [
      { id: "sec-reading", label: readingLabel },
      { id: "sec-expressions", label: exprLabel },
      { id: "sec-roleplay", label: roleplayLabel },
    ];
  }

  /* ==========================================================================
     Section 1: Reading & News Capsule
     ========================================================================== */
  function renderReadingSection(levelId) {
    const allData = window.LINGUAVELA_LEVEL_SECTIONS || {};
    const data = allData[levelId] && allData[levelId].reading;
    if (!data) return "";

    const st = getLevelState(levelId);
    const fullArticleSpeech = [data.articleTitle, ...(data.paragraphs || [])].join(". ");
    const activeGloss =
      (data.glossary || [])[st.activeGlossaryIdx] || (data.glossary || [])[0];

    const glossaryPills = (data.glossary || [])
      .map((g, idx) => {
        const isAct = idx === st.activeGlossaryIdx;
        return `
          <button
            type="button"
            class="lv-glossary-chip ${isAct ? "active" : ""}"
            data-lv-gloss="${idx}"
            data-lv-speak="${escapeHtml(g.word)}"
          >
            <span>🔊 ${escapeHtml(g.word)}</span>
            <span class="lv-glossary-ipa">${escapeHtml(g.ipa)}</span>
          </button>`;
      })
      .join("");

    const letters = ["A", "B", "C", "D"];
    const questions = data.questions || [];
    const questionsHtml = questions
      .map((q, qIdx) => {
        const ans = st.readingAnswers[qIdx];
        const ordered = getOrderedOptions(q.options, `read-${levelId}`, qIdx);
        const optsHtml = ordered
          .map((opt, dispIdx) => {
            let cls = "option-btn";
            if (ans && ans.picked === opt.origIdx) {
              cls += ans.correct ? " selected-correct" : " selected-wrong";
            }
            return `
              <button type="button" class="${cls}" data-lv-read-q="${qIdx}" data-lv-read-opt="${opt.origIdx}">
                <span class="option-letter" aria-hidden="true">${letters[dispIdx]}</span>
                <span>${escapeHtml(opt.text)}</span>
              </button>`;
          })
          .join("");

        let feedback = "";
        if (ans) {
          feedback = ans.correct
            ? `<div class="feedback-banner visible success" role="status">✓ ${escapeHtml(
                resolveText(q.feedback, levelId)
              )}</div>`
            : `<div class="feedback-banner visible error" role="status">${escapeHtml(
                window.LinguaSpanglish
                  ? window.LinguaSpanglish.ui("tryAgainMsg", levelId)
                  : "✕ Try again."
              )}</div>`;
        }

        return `
          <li class="quiz-item">
            <p class="quiz-prompt"><span class="quiz-num">${qIdx + 1}</span>${escapeHtml(
          resolveText(q.prompt, levelId)
        )}</p>
            <div class="options-list" role="group">${optsHtml}</div>
            ${feedback}
          </li>`;
      })
      .join("");

    const correctCount = Object.values(st.readingAnswers).filter((a) => a.correct).length;
    const best = loadProgress()[`read:${levelId}`] || 0;

    return `
      <section id="level-sec-reading" class="card lesson-card lv-feature-section" aria-labelledby="lv-read-title-${levelId}">
        <header class="lesson-card-header">
          <div class="lv-section-badge-row">
            <span class="card-eyebrow">${escapeHtml(resolveText(data.eyebrow, levelId))}</span>
            <span class="badge badge-teal">📰 ${escapeHtml(data.meta)}</span>
          </div>
          <h2 id="lv-read-title-${levelId}" class="theory-title">${escapeHtml(
      resolveText(data.title, levelId)
    )}</h2>
          <p class="lv-section-instruction">${escapeHtml(resolveText(data.instruction, levelId))}</p>
        </header>

        <article class="lv-reading-article" lang="en">
          <div class="lv-reading-toolbar">
            <h3 class="lv-reading-headline">${escapeHtml(data.articleTitle)}</h3>
            <div class="listening-speed-controls">
              <button type="button" class="btn btn-primary" data-lv-speak="${escapeHtml(
                fullArticleSpeech
              )}" data-lv-rate="0.94">
                ${escapeHtml(
                  window.LinguaSpanglish
                    ? window.LinguaSpanglish.ui("listenNormalBtn", levelId)
                    : "🔊 Listen (1.0x)"
                )}
              </button>
              <button type="button" class="btn btn-light" data-lv-speak="${escapeHtml(
                fullArticleSpeech
              )}" data-lv-rate="0.72">
                ${escapeHtml(
                  window.LinguaSpanglish
                    ? window.LinguaSpanglish.ui("listenSlowBtn", levelId)
                    : "🐢 Slow (0.75x)"
                )}
              </button>
            </div>
          </div>
          <div class="lv-reading-body">
            ${(data.paragraphs || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
          </div>
        </article>

        <div class="lv-glossary-box">
          <span class="example-box-label">${escapeHtml(
            pairText(
              "VOCABULARIO CLAVE EN CONTEXTO (HAZ CLIC PARA ESCUCHAR)",
              "KEY VOCABULARY IN CONTEXT (CLICK TO LISTEN)",
              levelId
            )
          )}</span>
          <div class="lv-glossary-chips">${glossaryPills}</div>
          ${
            activeGloss
              ? `<div class="lv-glossary-detail">
                   <strong>${escapeHtml(activeGloss.word)}</strong>
                   <span class="vocab-ipa">${escapeHtml(activeGloss.ipa)}</span> —
                   <span>${escapeHtml(resolveText(activeGloss.meaning, levelId))}</span>
                 </div>`
              : ""
          }
        </div>

        <div class="lesson-quiz">
          <div class="quiz-header">
            <div>
              <span class="card-eyebrow">${escapeHtml(
                pairText("COMPRENSIÓN DE LECTURA", "READING COMPREHENSION CHECK", levelId)
              )}</span>
              <h3 class="quiz-title">${escapeHtml(
                pairText("Comprueba lo que leíste", "Check Your Understanding", levelId)
              )}</h3>
            </div>
            <div class="quiz-score" aria-live="polite">
              <span class="badge badge-teal">${escapeHtml(
                pairText("Correctas", "Correct", levelId)
              )}: ${correctCount} / ${questions.length}</span>
              <span class="badge badge-neutral">${escapeHtml(
                pairText("Mejor", "Best", levelId)
              )}: ${best} / ${questions.length}</span>
            </div>
          </div>
          <ol class="quiz-list">${questionsHtml}</ol>
          <button type="button" class="btn btn-light" data-lv-reset="reading">
            ↺ ${escapeHtml(pairText("Reiniciar lectura", "Reset reading quiz", levelId))}
          </button>
        </div>
      </section>
    `;
  }

  /* ==========================================================================
     Section 2: Real-World Expressions & False Friends
     ========================================================================== */
  function renderExpressionsSection(levelId) {
    const allData = window.LINGUAVELA_LEVEL_SECTIONS || {};
    const data = allData[levelId] && allData[levelId].expressions;
    if (!data) return "";

    const st = getLevelState(levelId);
    const cardsHtml = (data.cards || [])
      .map((c) => {
        const isTrap = c.type === "falseFriend";
        const tagLabel = isTrap
          ? pairText("⚠️ False Friend Trap", "⚠️ False Friend / Cognate Trap", levelId)
          : pairText("🗣️ Real-World Expression", "🗣️ Real-World Expression", levelId);

        return `
          <article class="lv-expr-card ${isTrap ? "is-trap" : "is-idiom"}">
            <div class="lv-expr-top">
              <span class="badge ${isTrap ? "badge-warm" : "badge-teal"}">${escapeHtml(
          tagLabel
        )}</span>
              <button
                type="button"
                class="speak-btn speak-btn-sm"
                data-lv-speak="${escapeHtml(c.term + ". " + c.example)}"
                aria-label="Listen: ${escapeHtml(c.term)}"
              >
                🔊 <span>Audio</span>
              </button>
            </div>
            <div class="lv-expr-head">
              <h3 class="lv-expr-term" lang="en">${escapeHtml(c.term)}</h3>
              <span class="vocab-ipa">${escapeHtml(c.ipa)}</span>
            </div>
            <p class="lv-expr-trap">${escapeHtml(resolveText(c.trap, levelId))}</p>
            <p class="lv-expr-meaning">${escapeHtml(resolveText(c.realMeaning, levelId))}</p>
            <div class="lv-expr-example" lang="en">“${escapeHtml(c.example)}”</div>
          </article>`;
      })
      .join("");

    const letters = ["A", "B", "C", "D"];
    const quiz = data.quiz || [];
    const quizHtml = quiz
      .map((q, qIdx) => {
        const ans = st.exprAnswers[qIdx];
        const ordered = getOrderedOptions(q.options, `expr-${levelId}`, qIdx);
        const optsHtml = ordered
          .map((opt, dispIdx) => {
            let cls = "option-btn";
            if (ans && ans.picked === opt.origIdx) {
              cls += ans.correct ? " selected-correct" : " selected-wrong";
            }
            return `
              <button type="button" class="${cls}" data-lv-expr-q="${qIdx}" data-lv-expr-opt="${opt.origIdx}">
                <span class="option-letter" aria-hidden="true">${letters[dispIdx]}</span>
                <span>${escapeHtml(opt.text)}</span>
              </button>`;
          })
          .join("");

        let feedback = "";
        if (ans) {
          feedback = ans.correct
            ? `<div class="feedback-banner visible success" role="status">✓ ${escapeHtml(
                resolveText(q.feedback, levelId)
              )}</div>`
            : `<div class="feedback-banner visible error" role="status">${escapeHtml(
                window.LinguaSpanglish
                  ? window.LinguaSpanglish.ui("tryAgainMsg", levelId)
                  : "✕ Try again."
              )}</div>`;
        }

        return `
          <li class="quiz-item">
            <p class="quiz-prompt"><span class="quiz-num">${qIdx + 1}</span>${escapeHtml(
          resolveText(q.prompt, levelId)
        )}</p>
            <div class="options-list" role="group">${optsHtml}</div>
            ${feedback}
          </li>`;
      })
      .join("");

    const correctCount = Object.values(st.exprAnswers).filter((a) => a.correct).length;
    const best = loadProgress()[`expr:${levelId}`] || 0;

    return `
      <section id="level-sec-expressions" class="card lesson-card lv-feature-section" aria-labelledby="lv-expr-title-${levelId}">
        <header class="lesson-card-header">
          <div class="lv-section-badge-row">
            <span class="card-eyebrow">${escapeHtml(resolveText(data.eyebrow, levelId))}</span>
            <span class="badge badge-warm">💡 4 Cards + Quiz</span>
          </div>
          <h2 id="lv-expr-title-${levelId}" class="theory-title">${escapeHtml(
      resolveText(data.title, levelId)
    )}</h2>
          <p class="lv-section-instruction">${escapeHtml(resolveText(data.instruction, levelId))}</p>
        </header>

        <div class="lv-expr-grid">
          ${cardsHtml}
        </div>

        <div class="lesson-quiz">
          <div class="quiz-header">
            <div>
              <span class="card-eyebrow">${escapeHtml(
                pairText(" DETECTOR DE TRAMPAS Y EXPRESIONES", "EXPRESSION & TRAP DETECTOR", levelId)
              )}</span>
              <h3 class="quiz-title">${escapeHtml(
                pairText("Pon a prueba tus expresiones reales", "Test Your Real-World Expressions", levelId)
              )}</h3>
            </div>
            <div class="quiz-score" aria-live="polite">
              <span class="badge badge-teal">${escapeHtml(
                pairText("Correctas", "Correct", levelId)
              )}: ${correctCount} / ${quiz.length}</span>
              <span class="badge badge-neutral">${escapeHtml(
                pairText("Mejor", "Best", levelId)
              )}: ${best} / ${quiz.length}</span>
            </div>
          </div>
          <ol class="quiz-list">${quizHtml}</ol>
          <button type="button" class="btn btn-light" data-lv-reset="expressions">
            ↺ ${escapeHtml(pairText("Reiniciar reto", "Reset challenge", levelId))}
          </button>
        </div>
      </section>
    `;
  }

  /* ==========================================================================
     Section 3: Everyday Situational Roleplay
     ========================================================================== */
  function renderRoleplaySection(levelId) {
    const allData = window.LINGUAVELA_LEVEL_SECTIONS || {};
    const data = allData[levelId] && allData[levelId].roleplay;
    if (!data) return "";

    const st = getLevelState(levelId);
    const turns = data.turns || [];
    const turnIdx = Math.min(Math.max(st.roleplayTurn || 0, 0), Math.max(turns.length - 1, 0));
    st.roleplayTurn = turnIdx;
    const turn = turns[turnIdx];
    if (!turn) return "";

    const stepBtns = turns
      .map((_, idx) => {
        const done = st.roleplayAnswers[idx] && st.roleplayAnswers[idx].correct;
        const cls = [
          "exercise-step-btn",
          idx === turnIdx ? "active" : "",
          done ? "completed" : "",
        ]
          .filter(Boolean)
          .join(" ");
        const stepWord =
          document.documentElement.lang === "en" || levelId === "c1" || levelId === "c2"
            ? "Turn"
            : "Turno";
        return `
          <button type="button" class="${cls}" data-lv-rp-step="${idx}" aria-pressed="${idx === turnIdx}">
            ${done ? `<span class="step-check-icon" aria-hidden="true">✓</span> ` : ""}${stepWord} ${idx + 1}
          </button>`;
      })
      .join("");

    const ans = st.roleplayAnswers[turnIdx];
    const letters = ["A", "B", "C", "D"];
    const ordered = getOrderedOptions(turn.options, `rp-${levelId}`, turnIdx);

    const optionsHtml = ordered
      .map((opt, dispIdx) => {
        let cls = "option-btn";
        if (ans && ans.picked === opt.origIdx) {
          cls += ans.correct ? " selected-correct" : " selected-wrong";
        }
        return `
          <button type="button" class="${cls}" data-lv-rp-opt="${opt.origIdx}">
            <span class="option-letter" aria-hidden="true">${letters[dispIdx]}</span>
            <span lang="en">${escapeHtml(opt.text)}</span>
          </button>`;
      })
      .join("");

    const correctReplyText = turn.options[turn.correct] || "";
    let feedbackHtml = "";
    if (ans) {
      feedbackHtml = ans.correct
        ? `<div class="feedback-banner visible success" role="status">
             <div>✓ ${escapeHtml(resolveText(turn.feedback, levelId))}</div>
             <button type="button" class="btn btn-light dialogue-hear-reply-btn" data-lv-speak="${escapeHtml(
               correctReplyText
             )}">
               🔊 ${escapeHtml(
                 pairText("Escuchar tu respuesta en voz alta", "Listen to your reply aloud", levelId)
               )}
             </button>
           </div>`
        : `<div class="feedback-banner visible error" role="status">${escapeHtml(
            window.LinguaSpanglish
              ? window.LinguaSpanglish.ui("tryAgainMsg", levelId)
              : "✕ Try again."
          )}</div>`;
    }

    const doneTurns = Object.values(st.roleplayAnswers).filter((a) => a.correct).length;
    const best = loadProgress()[`rp:${levelId}`] || 0;

    return `
      <section id="level-sec-roleplay" class="card lesson-card lv-feature-section" aria-labelledby="lv-rp-title-${levelId}">
        <header class="lesson-card-header">
          <div class="lv-section-badge-row">
            <span class="card-eyebrow">${escapeHtml(resolveText(data.eyebrow, levelId))}</span>
            <span class="badge badge-teal">${escapeHtml(
              resolveText(data.scenarioBadge, levelId)
            )}</span>
          </div>
          <h2 id="lv-rp-title-${levelId}" class="theory-title">${escapeHtml(
      resolveText(data.title, levelId)
    )}</h2>
          <p class="lv-section-instruction">${escapeHtml(resolveText(data.instruction, levelId))}</p>
        </header>

        <div class="lv-roleplay-stage">
          <div class="lv-roleplay-header-bar">
            <div class="exercise-stepper" role="tablist">${stepBtns}</div>
            <div class="quiz-score">
              <span class="badge badge-teal">${doneTurns} / ${turns.length}</span>
              <span class="badge badge-neutral">${escapeHtml(
                pairText("Mejor", "Best", levelId)
              )}: ${best} / ${turns.length}</span>
            </div>
          </div>

          <div class="dialogue-speaker-bubble">
            <div class="dialogue-speaker-top">
              <span class="dialogue-speaker-label">🎙️ ${escapeHtml(turn.speaker)}</span>
              <div class="listening-speed-controls">
                <button type="button" class="btn btn-primary" data-lv-speak="${escapeHtml(
                  turn.line
                )}" data-lv-rate="0.94">
                  ${escapeHtml(
                    window.LinguaSpanglish
                      ? window.LinguaSpanglish.ui("listenNormalBtn", levelId)
                      : "🔊 Listen (1.0x)"
                  )}
                </button>
                <button type="button" class="btn btn-light" data-lv-speak="${escapeHtml(
                  turn.line
                )}" data-lv-rate="0.74">
                  ${escapeHtml(
                    window.LinguaSpanglish
                      ? window.LinguaSpanglish.ui("listenSlowBtn", levelId)
                      : "🐢 Slow (0.75x)"
                  )}
                </button>
              </div>
            </div>
            <p class="dialogue-speaker-text is-revealed" lang="en">“${escapeHtml(turn.line)}”</p>
          </div>

          <div class="lv-roleplay-goal-box">
            🎯 <strong>${escapeHtml(resolveText(turn.goal, levelId))}</strong>
          </div>

          <div class="options-list" role="group">
            ${optionsHtml}
          </div>

          ${feedbackHtml}

          <div class="extra-nav-footer" style="margin-top: 0.75rem;">
            <button type="button" class="btn btn-light" data-lv-reset="roleplay">
              ↺ ${escapeHtml(pairText("Reiniciar roleplay", "Reset roleplay", levelId))}
            </button>
            <button type="button" class="btn btn-dark" data-lv-rp-next="true">
              ${
                turnIdx >= turns.length - 1
                  ? escapeHtml(pairText("↺ Volver al Turno 1", "↺ Back to Turn 1", levelId))
                  : escapeHtml(pairText("Siguiente Turno →", "Next Turn →", levelId))
              }
            </button>
          </div>
        </div>
      </section>
    `;
  }

  function renderSection(levelId, tabId) {
    if (tabId === "sec-reading") return renderReadingSection(levelId);
    if (tabId === "sec-expressions") return renderExpressionsSection(levelId);
    if (tabId === "sec-roleplay") return renderRoleplaySection(levelId);
    return "";
  }

  function renderAll(levelId) {
    return `
      ${renderReadingSection(levelId)}
      ${renderExpressionsSection(levelId)}
      ${renderRoleplaySection(levelId)}
    `;
  }

  function handleClick(event, levelId, rerender) {
    const allData = window.LINGUAVELA_LEVEL_SECTIONS || {};
    const lvlData = allData[levelId];
    if (!lvlData) return false;
    const st = getLevelState(levelId);

    const glossBtn = event.target.closest("[data-lv-gloss]");
    if (glossBtn) {
      st.activeGlossaryIdx = Number(glossBtn.getAttribute("data-lv-gloss")) || 0;
      const word = glossBtn.getAttribute("data-lv-speak");
      if (word) speakText(word, 0.88);
      if (typeof rerender === "function") rerender();
      return true;
    }

    const speakBtn = event.target.closest("[data-lv-speak]");
    if (speakBtn) {
      const txt = speakBtn.getAttribute("data-lv-speak");
      const rate = Number(speakBtn.getAttribute("data-lv-rate")) || 0.92;
      speakText(txt, rate);
      return true;
    }

    const readOpt = event.target.closest("[data-lv-read-opt]");
    if (readOpt) {
      const qIdx = Number(readOpt.getAttribute("data-lv-read-q"));
      const picked = Number(readOpt.getAttribute("data-lv-read-opt"));
      const q = (lvlData.reading.questions || [])[qIdx];
      if (!q) return true;
      const isCorrect = picked === q.correct;
      st.readingAnswers[qIdx] = { picked, correct: isCorrect };
      const score = Object.values(st.readingAnswers).filter((a) => a.correct).length;
      recordBest(`read:${levelId}`, score);
      if (typeof rerender === "function") rerender();
      return true;
    }

    const exprOpt = event.target.closest("[data-lv-expr-opt]");
    if (exprOpt) {
      const qIdx = Number(exprOpt.getAttribute("data-lv-expr-q"));
      const picked = Number(exprOpt.getAttribute("data-lv-expr-opt"));
      const q = (lvlData.expressions.quiz || [])[qIdx];
      if (!q) return true;
      const isCorrect = picked === q.correct;
      st.exprAnswers[qIdx] = { picked, correct: isCorrect };
      const score = Object.values(st.exprAnswers).filter((a) => a.correct).length;
      recordBest(`expr:${levelId}`, score);
      if (typeof rerender === "function") rerender();
      return true;
    }

    const rpStep = event.target.closest("[data-lv-rp-step]");
    if (rpStep) {
      st.roleplayTurn = Number(rpStep.getAttribute("data-lv-rp-step")) || 0;
      if (typeof rerender === "function") rerender();
      return true;
    }

    const rpOpt = event.target.closest("[data-lv-rp-opt]");
    if (rpOpt) {
      const turnIdx = st.roleplayTurn || 0;
      const picked = Number(rpOpt.getAttribute("data-lv-rp-opt"));
      const turn = (lvlData.roleplay.turns || [])[turnIdx];
      if (!turn) return true;
      const isCorrect = picked === turn.correct;
      st.roleplayAnswers[turnIdx] = { picked, correct: isCorrect };
      const score = Object.values(st.roleplayAnswers).filter((a) => a.correct).length;
      recordBest(`rp:${levelId}`, score);
      if (typeof rerender === "function") rerender();
      return true;
    }

    if (event.target.closest("[data-lv-rp-next]")) {
      const len = (lvlData.roleplay.turns || []).length;
      if (len > 0) {
        st.roleplayTurn = ((st.roleplayTurn || 0) + 1) % len;
        if (typeof rerender === "function") rerender();
      }
      return true;
    }

    const resetBtn = event.target.closest("[data-lv-reset]");
    if (resetBtn) {
      const which = resetBtn.getAttribute("data-lv-reset");
      if (which === "reading") st.readingAnswers = {};
      if (which === "expressions") st.exprAnswers = {};
      if (which === "roleplay") {
        st.roleplayAnswers = {};
        st.roleplayTurn = 0;
      }
      if (typeof rerender === "function") rerender();
      return true;
    }

    return false;
  }

  window.LinguaLevelSections = {
    getTabDefs,
    renderSection,
    renderAll,
    handleClick,
  };
})();
