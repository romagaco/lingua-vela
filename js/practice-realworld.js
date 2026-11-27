/**
 * LinguaVela — Real-World Error Detective & Tone/Register Sorter Renderer
 * (js/practice-realworld.js)
 *
 * Interactive mechanics (zero plain questionnaires):
 *   1. Real-World Error Detective: Click directly on the broken word/phrase inside realistic
 *      messages to trigger an inline Quick-Repair bar and heal the prose live.
 *   2. Tone & Register Sorter: 3-column HTML5 Drag-and-Drop board (Casual / Workplace / Formal)
 *      with full click/tap-to-place support for mobile & keyboard users.
 */

(() => {
  "use strict";

  const detectiveRoot = document.getElementById("detective-lab-root");
  const registerRoot = document.getElementById("register-lab-root");
  if (!detectiveRoot || !registerRoot) return;

  const DATA = window.LINGUAVELA_REALWORLD_DATA || {};
  const LEVELS = ["a0", "a1", "a2", "b1", "b2", "c1", "c2"];
  const STORAGE_KEY = "linguavela-realworld-lab-v1";
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

  let activeLevel = getInitialLevel();
  const caseIndices = { a0: 0, a1: 0, a2: 0, b1: 0, b2: 0, c1: 0, c2: 0 };

  // Detective state per `${lvl}:${idx}`: { spotted: bool, wrongClickIdx: number|null, pickedFix: string|null, solved: bool }
  const detectiveState = {};
  // Register state per `${lvl}`: { placements: { itemId: 'casual'|'workplace'|'formal'|null }, selectedId: string|null, checked: bool, solved: bool }
  const registerState = {};
  let draggedCardId = null;

  function getInitialLevel() {
    const params = new URLSearchParams(window.location.search);
    const param = (params.get("level") || "a0").toLowerCase();
    return DATA[param] ? param : "a0";
  }

  function setUrlLevel(lvl) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("level", lvl);
      window.history.replaceState({}, "", url);
    } catch {
      // ignore
    }
  }

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function markProgress(key) {
    const prog = loadProgress();
    prog[key] = true;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prog));
    } catch {
      // ignore
    }
  }

  function speak(text, rate = 0.92) {
    if (!speechSupported || !text) return;
    try {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = "en-US";
      utt.rate = rate;
      const voices = window.speechSynthesis.getVoices();
      const voice =
        voices.find((v) => v.lang === "en-US") ||
        voices.find((v) => v.lang && v.lang.startsWith("en"));
      if (voice) utt.voice = voice;
      window.speechSynthesis.speak(utt);
    } catch {
      // ignore
    }
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const isGlobalEn = () => document.documentElement.lang === "en";
  const effectiveLang = () =>
    isGlobalEn() || activeLevel === "c1" || activeLevel === "c2" ? "en" : "es";

  const L = (es, en) =>
    window.LinguaSpanglish
      ? window.LinguaSpanglish.pair(es, en, activeLevel)
      : effectiveLang() === "en"
      ? en
      : es;

  const T = (obj) =>
    window.LinguaSpanglish
      ? window.LinguaSpanglish.resolve(obj, activeLevel)
      : obj && typeof obj === "object"
      ? obj[effectiveLang()] || obj.spanglish || obj.en || obj.es || ""
      : obj || "";

  function deterministicOrder(arr, seedStr) {
    const copy = [...arr];
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) % 9973;
    for (let i = copy.length - 1; i > 0; i--) {
      seed = (seed * 16807) % 2147483647;
      const j = seed % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getDetState(lvl, idx) {
    const key = `${lvl}:${idx}`;
    if (!detectiveState[key]) {
      detectiveState[key] = {
        spotted: false,
        wrongClickIdx: null,
        pickedFix: null,
        solved: false,
      };
    }
    return detectiveState[key];
  }

  function getRegState(lvl) {
    if (!registerState[lvl]) {
      const placements = {};
      const board = DATA[lvl] && DATA[lvl].registerBoard;
      if (board) {
        board.items.forEach((it) => {
          placements[it.id] = null;
        });
      }
      registerState[lvl] = {
        placements,
        selectedId: null,
        checked: false,
        solved: false,
      };
    }
    return registerState[lvl];
  }

  function updateRankTabsAndBanner() {
    document.querySelectorAll(".level-tab-btn[data-level]").forEach((btn) => {
      const lvl = btn.getAttribute("data-level");
      const active = lvl === activeLevel;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", String(active));
      const meta = RANK_META[lvl];
      if (meta) {
        btn.innerHTML = `<span aria-hidden="true">${meta.badge}</span> <span>${
          isGlobalEn() ? meta.en : meta.es
        }</span>`;
      }
    });

    const slot = document.getElementById("spanglish-banner-slot");
    if (slot && window.LinguaSpanglish) {
      slot.innerHTML = window.LinguaSpanglish.renderBanner(activeLevel, "realworld");
    }

    const prevBtn = document.getElementById("prev-level-btn");
    const nextBtn = document.getElementById("next-level-btn");
    if (prevBtn && window.LinguaSpanglish) {
      prevBtn.textContent = window.LinguaSpanglish.ui("prevLevelBtn", activeLevel);
    }
    if (nextBtn && window.LinguaSpanglish) {
      nextBtn.textContent = window.LinguaSpanglish.ui("nextLevelBtn", activeLevel);
    }
  }

  /* ==========================================================================
     Lab 1: Real-World Error Detective (Click-to-Fix Proofreading)
     ========================================================================== */
  function renderDetectiveLab() {
    const levelData = DATA[activeLevel];
    if (!levelData) return;
    const cases = levelData.detectiveCases || [];
    const idx = Math.min(Math.max(caseIndices[activeLevel] || 0, 0), cases.length - 1);
    caseIndices[activeLevel] = idx;
    const item = cases[idx];
    const st = getDetState(activeLevel, idx);
    const prog = loadProgress();
    const rank = RANK_META[activeLevel];

    let doneCount = 0;
    const stepperHtml = cases
      .map((_, i) => {
        const isDone = Boolean(prog[`det:${activeLevel}:${i}`]);
        if (isDone) doneCount++;
        const cls = ["exercise-step-btn", i === idx ? "active" : "", isDone ? "completed" : ""]
          .filter(Boolean)
          .join(" ");
        return `<button type="button" class="${cls}" data-det-step="${i}" aria-pressed="${i === idx}">
          ${isDone ? `<span class="step-check-icon" aria-hidden="true">✓</span> ` : ""}${i + 1}
        </button>`;
      })
      .join("");

    const tokensHtml = item.segments
      .map((seg, sIdx) => {
        let cls = "proofread-token";
        let display = escapeHtml(seg.text);
        if (seg.isError && st.solved) {
          cls += " is-healed";
          display = `<del class="proofread-old">${escapeHtml(seg.text)}</del> <span class="proofread-new">${escapeHtml(
            item.correctFix
          )}</span>`;
        } else if (seg.isError && st.spotted) {
          cls += " is-spotted";
        } else if (st.wrongClickIdx === sIdx) {
          cls += " is-clean-ping";
        }
        return `<button type="button" class="${cls}" data-det-seg="${sIdx}" lang="en">${display}</button>`;
      })
      .join(" ");

    const fixedFullSentence = item.segments
      .map((seg) => (seg.isError ? item.correctFix : seg.text))
      .join(" ");

    let repairPanelHtml = "";
    if (st.spotted && !st.solved) {
      const orderedFixes = deterministicOrder(item.fixes, `fix-${activeLevel}-${idx}`);
      const fixBtns = orderedFixes
        .map((fx) => {
          const isWrongPicked = st.pickedFix === fx && fx !== item.correctFix;
          return `<button type="button" class="proofread-fix-btn ${
            isWrongPicked ? "is-wrong" : ""
          }" data-det-fix="${escapeHtml(fx)}" lang="en">${escapeHtml(fx)}</button>`;
        })
        .join("");

      repairPanelHtml = `
        <div class="proofread-repair-panel">
          <span class="proofread-repair-label">🔧 ${escapeHtml(
            L(
              "¡Error encontrado! Elige la corrección natural para reparar el mensaje:",
              "Mistake spotted! Click the natural replacement to heal the message:"
            )
          )}</span>
          <div class="proofread-fix-row">${fixBtns}</div>
        </div>
      `;
    }

    let statusHtml = "";
    if (st.solved) {
      statusHtml = `
        <div class="feedback-banner visible success" role="status">
          <div>✓ ${escapeHtml(T(item.feedback))}</div>
          <button type="button" class="btn btn-light dialogue-hear-reply-btn" data-det-speak="${escapeHtml(
            fixedFullSentence
          )}">
            🔊 ${escapeHtml(L("Escuchar mensaje corregido", "Listen to repaired message"))}
          </button>
        </div>`;
    } else if (st.pickedFix && st.pickedFix !== item.correctFix) {
      statusHtml = `<div class="feedback-banner visible error" role="status">✕ ${escapeHtml(
        L("Esa corrección todavía no suena natural. Prueba otra opción.", "That replacement still isn't quite right. Try another fix.")
      )}</div>`;
    } else if (st.wrongClickIdx !== null) {
      statusHtml = `<div class="feedback-banner visible" style="background: var(--bg-pill); color: var(--text-primary); border: 1px solid var(--border-strong);" role="status">🔎 ${escapeHtml(
        L(
          "Esa parte del mensaje está correcta. Sigue buscando el fragmento con error y haz clic en él.",
          "That part of the message looks clean! Keep scanning for the flawed word or phrase."
        )
      )}</div>`;
    }

    detectiveRoot.innerHTML = `
      <article class="card extra-practice-card">
        <div class="extra-practice-header">
          <div>
            <span class="card-eyebrow">${escapeHtml(
              L(
                "LABORATORIO 1 • DETECTIVE DE ERRORES EN VIVO (ESTILO GRAMMARLY / CAMBRIDGE / BUSUU)",
                "LAB 1 • REAL-WORLD ERROR DETECTIVE (GRAMMARLY / CAMBRIDGE / BUSUU STYLE)"
              )
            )}</span>
            <h2 class="theory-title extra-practice-title">${escapeHtml(
              L("Detective de Errores: Haz Clic para Reparar", "Error Detective: Click Directly to Fix")
            )}</h2>
            <p class="extra-practice-sub">${escapeHtml(
              L(
                "Paso 1: Lee el mensaje real y haz clic directo sobre el error. Paso 2: Selecciona la corrección natural para repararlo en vivo.",
                "Step 1: Read the realistic message and click directly on the mistake. Step 2: Apply the natural fix inline."
              )
            )}</p>
          </div>
          <div class="extra-practice-meta">
            <span class="badge badge-teal">${rank.badge} ${rank[effectiveLang()]}</span>
            <span class="badge badge-warm">${doneCount} / ${cases.length} ${escapeHtml(
              L("reparados", "repaired")
            )}</span>
          </div>
        </div>

        <div class="exercise-stepper extra-stepper" role="tablist">
          ${stepperHtml}
        </div>

        <div class="proofread-message-card ${st.solved ? "is-repaired" : ""}">
          <div class="proofread-card-top">
            <span class="badge badge-teal">${escapeHtml(item.channel)}</span>
            <span class="proofread-sender">${escapeHtml(item.sender)}</span>
          </div>
          <p class="proofread-prompt-hint">
            ${
              st.solved
                ? `✨ ${escapeHtml(L("Mensaje reparado y listo para enviar:", "Message repaired and ready to send:"))}`
                : `👆 ${escapeHtml(L("Haz clic directamente en la palabra o frase con error:", "Click directly on the broken word or phrase inside the message:"))}`
            }
          </p>
          <div class="proofread-prose">
            ${tokensHtml}
          </div>
          ${repairPanelHtml}
        </div>

        ${statusHtml}

        <div class="dnd-actions-row">
          <button type="button" class="btn btn-light" data-det-reset="true">
            ↺ ${escapeHtml(L("Reiniciar caso", "Reset case"))}
          </button>
          <button type="button" class="btn btn-dark" data-det-next="true" style="margin-left: auto;">
            ${
              idx >= cases.length - 1
                ? escapeHtml(L("↺ Volver al 1", "↺ Back to 1"))
                : escapeHtml(L("Siguiente Caso →", "Next Case →"))
            }
          </button>
        </div>
      </article>
    `;
  }

  /* ==========================================================================
     Lab 2: Tone & Register Sorter (3-Zone Drag-and-Drop Board)
     ========================================================================== */
  function renderRegisterBoard() {
    const levelData = DATA[activeLevel];
    if (!levelData || !levelData.registerBoard) return;
    const board = levelData.registerBoard;
    const st = getRegState(activeLevel);
    const rank = RANK_META[activeLevel];

    const shuffledItems = deterministicOrder(board.items, `reg-${activeLevel}`);
    const unsorted = shuffledItems.filter((it) => !st.placements[it.id]);
    const placedCount = board.items.length - unsorted.length;

    const zones = [
      {
        id: "casual",
        icon: "😎",
        title: L("Casual / Amigos", "Casual / Friend"),
        sub: L("Mensajes relajados, contracciones y slang", "Relaxed texts, idioms & friends"),
      },
      {
        id: "workplace",
        icon: "💼",
        title: L("Polite Workplace", "Polite Workplace"),
        sub: L("Colegas, clientes y Slack profesional", "Colleagues, clients & US office tone"),
      },
      {
        id: "formal",
        icon: "🏛️",
        title: L("Formal / Diplomático", "Formal / Diplomatic"),
        sub: L("Directivos, cartas oficiales y protocolos", "Executives, letters & governance"),
      },
    ];

    const renderCard = (item, inZone) => {
      let cls = "reg-phrase-card";
      if (st.selectedId === item.id) cls += " is-selected";
      if (st.checked && inZone) {
        cls += inZone === item.zone ? " is-correct" : " is-wrong";
      }
      return `
        <div
          class="${cls}"
          draggable="true"
          data-reg-card="${item.id}"
          role="button"
          tabindex="0"
          aria-pressed="${st.selectedId === item.id}"
        >
          <span class="reg-phrase-text" lang="en">“${escapeHtml(item.text)}”</span>
          <div class="reg-card-actions">
            <button type="button" class="icon-circle-btn reg-speak-btn" data-reg-speak="${escapeHtml(
              item.text
            )}" aria-label="Listen">🔊</button>
            ${
              inZone
                ? `<button type="button" class="reg-remove-btn" data-reg-unplace="${item.id}" title="${escapeHtml(
                    L("Devolver a la bandeja", "Return to tray")
                  )}">✕</button>`
                : ""
            }
          </div>
        </div>`;
    };

    const unsortedHtml = unsorted.length
      ? unsorted.map((it) => renderCard(it, null)).join("")
      : `<span class="dnd-placeholder">${escapeHtml(
          L("✓ Todas las frases ubicadas. ¡Pulsa Comprobar Tablero!", "✓ All phrases sorted. Click Check Register Board!")
        )}</span>`;

    const zonesHtml = zones
      .map((z) => {
        const zoneItems = shuffledItems.filter((it) => st.placements[it.id] === z.id);
        return `
          <div class="reg-zone-col ${st.selectedId ? "is-targetable" : ""}" data-reg-zone="${z.id}">
            <div class="reg-zone-head">
              <span class="reg-zone-icon" aria-hidden="true">${z.icon}</span>
              <div>
                <h3 class="reg-zone-title">${escapeHtml(z.title)}</h3>
                <p class="reg-zone-sub">${escapeHtml(z.sub)}</p>
              </div>
            </div>
            <div class="reg-zone-drop">
              ${
                zoneItems.length
                  ? zoneItems.map((it) => renderCard(it, z.id)).join("")
                  : `<span class="reg-zone-empty">${escapeHtml(
                      st.selectedId
                        ? L("👆 Haz clic aquí para soltar la frase", "👆 Click here to place selected card")
                        : L("Suelta frases aquí...", "Drop phrases here...")
                    )}</span>`
              }
            </div>
          </div>`;
      })
      .join("");

    let feedbackHtml = "";
    if (st.checked) {
      feedbackHtml = st.solved
        ? `<div class="feedback-banner visible success" role="status">✓ ${escapeHtml(T(board.feedback))}</div>`
        : `<div class="feedback-banner visible error" role="status">✕ ${escapeHtml(
            L(
              "Algunas tarjetas están en rojo porque pertenecen a otro registro. Arrástralas a otra columna (o pulsa ✕) y comprueba de nuevo.",
              "Some cards are highlighted in red because they fit a different register. Drag them to another column (or click ✕) and check again."
            )
          )}</div>`;
    }

    registerRoot.innerHTML = `
      <article class="card extra-practice-card">
        <div class="extra-practice-header">
          <div>
            <span class="card-eyebrow">${escapeHtml(
              L(
                "LABORATORIO 2 • CLASIFICADOR DE TONO Y REGISTRO (ESTILO BBC ENGLISH AT WORK / BRITISH COUNCIL)",
                "LAB 2 • TONE & REGISTER SORTER BOARD (BBC ENGLISH AT WORK / BRITISH COUNCIL STYLE)"
              )
            )}</span>
            <h2 class="theory-title extra-practice-title">${escapeHtml(
              L("Tablero de Tono y Registro (Drag & Drop)", "Tone & Register Sorter (Drag & Drop)")
            )}</h2>
            <p class="extra-practice-sub">${escapeHtml(T(board.scenario))}</p>
          </div>
          <div class="extra-practice-meta">
            <span class="badge badge-teal">${rank.badge} ${rank[effectiveLang()]}</span>
            <span class="badge badge-warm">${placedCount} / ${board.items.length} ${escapeHtml(
              L("colocadas", "placed")
            )}</span>
          </div>
        </div>

        <div class="reg-tray-wrap" data-reg-zone="tray">
          <span class="dictation-wordbank-label">${escapeHtml(
            L(
              "Frases por clasificar (arrastra a una columna o haz clic en una tarjeta y luego en su columna):",
              "Phrases to sort (drag into a column, or click a card then click a column):"
            )
          )}</span>
          <div class="reg-tray-grid">
            ${unsortedHtml}
          </div>
        </div>

        <div class="reg-zones-grid">
          ${zonesHtml}
        </div>

        <div class="dnd-actions-row">
          <button type="button" class="btn btn-primary" data-reg-check="true" ${
            placedCount === 0 ? "disabled" : ""
          }>
            ✓ ${escapeHtml(L("Comprobar tablero", "Check Register Board"))}
          </button>
          <button type="button" class="btn btn-light" data-reg-reset="true">
            ↺ ${escapeHtml(L("Reiniciar tablero", "Reset Board"))}
          </button>
        </div>

        ${feedbackHtml}
      </article>
    `;
  }

  function renderAll() {
    updateRankTabsAndBanner();
    renderDetectiveLab();
    renderRegisterBoard();
  }

  /* ==========================================================================
     Events — Lab 1 (Error Detective)
     ========================================================================== */
  detectiveRoot.addEventListener("click", (e) => {
    const stepBtn = e.target.closest("[data-det-step]");
    if (stepBtn) {
      caseIndices[activeLevel] = Number(stepBtn.dataset.detStep);
      renderDetectiveLab();
      return;
    }

    const segBtn = e.target.closest("[data-det-seg]");
    if (segBtn) {
      const idx = caseIndices[activeLevel] || 0;
      const item = DATA[activeLevel].detectiveCases[idx];
      const st = getDetState(activeLevel, idx);
      if (st.solved) return;
      const segIdx = Number(segBtn.dataset.detSeg);
      if (item.segments[segIdx] && item.segments[segIdx].isError) {
        st.spotted = true;
        st.wrongClickIdx = null;
      } else {
        st.wrongClickIdx = segIdx;
      }
      renderDetectiveLab();
      return;
    }

    const fixBtn = e.target.closest("[data-det-fix]");
    if (fixBtn) {
      const idx = caseIndices[activeLevel] || 0;
      const item = DATA[activeLevel].detectiveCases[idx];
      const st = getDetState(activeLevel, idx);
      const chosen = fixBtn.dataset.detFix;
      st.pickedFix = chosen;
      if (chosen === item.correctFix) {
        st.solved = true;
        markProgress(`det:${activeLevel}:${idx}`);
      }
      renderDetectiveLab();
      return;
    }

    const speakBtn = e.target.closest("[data-det-speak]");
    if (speakBtn) {
      speak(speakBtn.dataset.detSpeak, 0.92);
      return;
    }

    if (e.target.closest("[data-det-reset]")) {
      const idx = caseIndices[activeLevel] || 0;
      delete detectiveState[`${activeLevel}:${idx}`];
      renderDetectiveLab();
      return;
    }

    if (e.target.closest("[data-det-next]")) {
      const len = (DATA[activeLevel].detectiveCases || []).length;
      if (len > 0) {
        caseIndices[activeLevel] = ((caseIndices[activeLevel] || 0) + 1) % len;
        renderDetectiveLab();
      }
    }
  });

  /* ==========================================================================
     Drag-and-Drop + Click/Tap Events — Lab 2 (Tone & Register Sorter)
     ========================================================================== */
  registerRoot.addEventListener("dragstart", (e) => {
    const card = e.target.closest("[data-reg-card]");
    if (!card) return;
    draggedCardId = card.dataset.regCard;
    card.classList.add("is-dragging");
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", draggedCardId);
    }
  });

  registerRoot.addEventListener("dragend", (e) => {
    const card = e.target.closest("[data-reg-card]");
    if (card) card.classList.remove("is-dragging");
    registerRoot.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));
    draggedCardId = null;
  });

  registerRoot.addEventListener("dragover", (e) => {
    if (!draggedCardId) return;
    const zone = e.target.closest("[data-reg-zone]");
    if (!zone) return;
    e.preventDefault();
    zone.classList.add("drag-over");
  });

  registerRoot.addEventListener("dragleave", (e) => {
    const zone = e.target.closest("[data-reg-zone]");
    if (zone && !zone.contains(e.relatedTarget)) {
      zone.classList.remove("drag-over");
    }
  });

  registerRoot.addEventListener("drop", (e) => {
    if (!draggedCardId) return;
    const zone = e.target.closest("[data-reg-zone]");
    if (!zone) return;
    e.preventDefault();
    zone.classList.remove("drag-over");
    const st = getRegState(activeLevel);
    const target = zone.dataset.regZone;
    st.placements[draggedCardId] = target === "tray" ? null : target;
    st.selectedId = null;
    st.checked = false;
    st.solved = false;
    draggedCardId = null;
    renderRegisterBoard();
  });

  registerRoot.addEventListener("click", (e) => {
    const speakBtn = e.target.closest("[data-reg-speak]");
    if (speakBtn) {
      e.stopPropagation();
      speak(speakBtn.dataset.regSpeak, 0.92);
      return;
    }

    const unplaceBtn = e.target.closest("[data-reg-unplace]");
    if (unplaceBtn) {
      e.stopPropagation();
      const st = getRegState(activeLevel);
      st.placements[unplaceBtn.dataset.regUnplace] = null;
      st.selectedId = null;
      st.checked = false;
      st.solved = false;
      renderRegisterBoard();
      return;
    }

    const card = e.target.closest("[data-reg-card]");
    if (card) {
      const st = getRegState(activeLevel);
      const id = card.dataset.regCard;
      st.selectedId = st.selectedId === id ? null : id;
      renderRegisterBoard();
      return;
    }

    const zone = e.target.closest("[data-reg-zone]");
    if (zone) {
      const st = getRegState(activeLevel);
      if (st.selectedId) {
        const target = zone.dataset.regZone;
        st.placements[st.selectedId] = target === "tray" ? null : target;
        st.selectedId = null;
        st.checked = false;
        st.solved = false;
        renderRegisterBoard();
      }
      return;
    }

    if (e.target.closest("[data-reg-check]")) {
      const board = DATA[activeLevel].registerBoard;
      const st = getRegState(activeLevel);
      const allCorrect = board.items.every((it) => st.placements[it.id] === it.zone);
      st.checked = true;
      st.solved = allCorrect;
      if (allCorrect) markProgress(`reg:${activeLevel}`);
      renderRegisterBoard();
      return;
    }

    if (e.target.closest("[data-reg-reset]")) {
      delete registerState[activeLevel];
      renderRegisterBoard();
    }
  });

  /* ==========================================================================
     Rank Selector & Language Sync
     ========================================================================== */
  function selectLevel(lvl) {
    if (!DATA[lvl]) return;
    activeLevel = lvl;
    setUrlLevel(lvl);
    renderAll();
  }

  document.querySelectorAll(".level-tab-btn[data-level]").forEach((btn) => {
    btn.addEventListener("click", () => selectLevel(btn.getAttribute("data-level")));
  });

  const prevBtn = document.getElementById("prev-level-btn");
  const nextBtn = document.getElementById("next-level-btn");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const i = LEVELS.indexOf(activeLevel);
      selectLevel(LEVELS[(i - 1 + LEVELS.length) % LEVELS.length]);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const i = LEVELS.indexOf(activeLevel);
      selectLevel(LEVELS[(i + 1) % LEVELS.length]);
    });
  }

  new MutationObserver(renderAll).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });

  renderAll();
})();
