/**
 * LinguaVela — Real-World Message Builder & Live Document Lab Renderer (js/practice-builder.js)
 *
 * Interactive mechanics (zero plain questionnaires):
 *   1. Drag-and-Drop Sentence & Message Builder (HTML5 Drag & Drop + click/tap reordering)
 *   2. Real-Life Document & Form Lab (Drag-and-Drop or tap chips directly into live document fields)
 *
 * Syncs across all 7 Crew Ranks (a0 -> c2), URL ?level=, progressive Spanglish meter, and <html lang>.
 */

(() => {
  "use strict";

  const builderRoot = document.getElementById("builder-lab-root");
  const docRoot = document.getElementById("document-lab-root");
  if (!builderRoot || !docRoot) return;

  const DATA = window.LINGUAVELA_BUILDER_DATA || {};
  const LEVELS = ["a0", "a1", "a2", "b1", "b2", "c1", "c2"];
  const STORAGE_KEY = "linguavela-builder-lab-v1";
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
  const taskIndices = { a0: 0, a1: 0, a2: 0, b1: 0, b2: 0, c1: 0, c2: 0 };

  // Session state per `${level}:${taskIdx}`: { bank: [{id, text}], placed: [{id, text}], checked: bool, solved: bool }
  const builderState = {};
  // Document state per `${level}`: { slots: { f1: chipText | null, ... }, checked: bool, solved: bool }
  const docState = {};

  // Active drag payload
  let dragPayload = null;

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

  // Deterministic scramble so tiles never start already in order
  function deterministicShuffle(arr, seedStr) {
    const copy = arr.map((text, idx) => ({ id: `${seedStr}-${idx}`, text }));
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) % 10000;
    for (let i = copy.length - 1; i > 0; i--) {
      seed = (seed * 16807) % 2147483647;
      const j = seed % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    // Ensure not identical to original order
    if (copy.length > 1 && copy.every((item, idx) => item.text === arr[idx])) {
      [copy[0], copy[1]] = [copy[1], copy[0]];
    }
    return copy;
  }

  function getBuilderState(lvl, idx) {
    const key = `${lvl}:${idx}`;
    if (!builderState[key]) {
      const task = (DATA[lvl] && DATA[lvl].builderTasks[idx]) || { tiles: [] };
      builderState[key] = {
        bank: deterministicShuffle(task.tiles, key),
        placed: [],
        checked: false,
        solved: false,
      };
    }
    return builderState[key];
  }

  function getDocState(lvl) {
    if (!docState[lvl]) {
      const doc = DATA[lvl] && DATA[lvl].documentLab;
      const slots = {};
      if (doc) {
        doc.fields.forEach((f) => {
          slots[f.blankId] = null;
        });
      }
      docState[lvl] = { slots, checked: false, solved: false };
    }
    return docState[lvl];
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
      slot.innerHTML = window.LinguaSpanglish.renderBanner(activeLevel, "builder");
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
     Lab 1: Drag-and-Drop Sentence & Message Builder
     ========================================================================== */
  function renderBuilderLab() {
    const levelData = DATA[activeLevel];
    if (!levelData) return;
    const tasks = levelData.builderTasks || [];
    const idx = Math.min(Math.max(taskIndices[activeLevel] || 0, 0), tasks.length - 1);
    taskIndices[activeLevel] = idx;
    const task = tasks[idx];
    const st = getBuilderState(activeLevel, idx);
    const prog = loadProgress();
    const rank = RANK_META[activeLevel];

    let doneCount = 0;
    const stepperHtml = tasks
      .map((_, i) => {
        const isDone = Boolean(prog[`build:${activeLevel}:${i}`]);
        if (isDone) doneCount++;
        const cls = ["exercise-step-btn", i === idx ? "active" : "", isDone ? "completed" : ""]
          .filter(Boolean)
          .join(" ");
        return `<button type="button" class="${cls}" data-b-step="${i}" aria-pressed="${i === idx}">
          ${isDone ? `<span class="step-check-icon" aria-hidden="true">✓</span> ` : ""}${i + 1}
        </button>`;
      })
      .join("");

    const placedHtml = st.placed.length
      ? st.placed
          .map((tile, pIdx) => {
            let statusCls = "";
            if (st.checked) {
              statusCls = tile.text === task.tiles[pIdx] ? "tile-correct" : "tile-wrong";
            }
            return `<button
              type="button"
              class="dnd-tile dnd-tile-placed ${statusCls}"
              draggable="true"
              data-dnd-zone="placed"
              data-dnd-idx="${pIdx}"
              lang="en"
              title="${escapeHtml(L("Arrastra para reordenar o haz clic para quitar", "Drag to reorder or click to remove"))}"
            >${escapeHtml(tile.text)}</button>`;
          })
          .join("")
      : `<span class="dnd-placeholder">${escapeHtml(
          L(
            "⬇️ Arrastra los bloques aquí (o haz clic en cada uno para armar tu mensaje)...",
            "⬇️ Drag tiles here (or click each tile to assemble your message)..."
          )
        )}</span>`;

    const bankHtml = st.bank.length
      ? st.bank
          .map(
            (tile, bIdx) => `<button
              type="button"
              class="dnd-tile dnd-tile-bank"
              draggable="true"
              data-dnd-zone="bank"
              data-dnd-idx="${bIdx}"
              lang="en"
            >${escapeHtml(tile.text)}</button>`
          )
          .join("")
      : `<span class="dnd-placeholder">${escapeHtml(
          L("✓ Todos los bloques colocados. ¡Pulsa Comprobar!", "✓ All tiles placed. Click Check Order!")
        )}</span>`;

    const targetSentence = task.tiles.join(" ");
    let feedbackHtml = "";
    if (st.checked) {
      feedbackHtml = st.solved
        ? `<div class="feedback-banner visible success" role="status">
             <div>✓ ${escapeHtml(T(task.feedback))}</div>
             <button type="button" class="btn btn-light dialogue-hear-reply-btn" data-b-speak="${escapeHtml(
               targetSentence
             )}">
               🔊 ${escapeHtml(L("Escuchar mensaje armado", "Listen to completed message"))}
             </button>
           </div>`
        : `<div class="feedback-banner visible error" role="status">✕ ${escapeHtml(
            L(
              "Algunos bloques no están en su posición natural (en rojo). Arrastra para reordenar o usa 💡 Pista.",
              "Some tiles are out of natural order (highlighted in red). Drag to reorder or click 💡 Hint."
            )
          )}</div>`;
    }

    builderRoot.innerHTML = `
      <article class="card extra-practice-card">
        <div class="extra-practice-header">
          <div>
            <span class="card-eyebrow">${escapeHtml(
              L(
                "LABORATORIO 1 • CONSTRUCTOR DRAG & DROP (ESTILO DUOLINGO / BABBEL / CAMBRIDGE)",
                "LAB 1 • DRAG-AND-DROP MESSAGE BUILDER (DUOLINGO / BABBEL / CAMBRIDGE STYLE)"
              )
            )}</span>
            <h2 class="theory-title extra-practice-title">${escapeHtml(
              L("Constructor de Mensajes Reales (Drag & Drop)", "Real-World Message Builder (Drag & Drop)")
            )}</h2>
            <p class="extra-practice-sub">${escapeHtml(
              L(
                "Arrastra los bloques (o haz clic en ellos) para construir mensajes auténticos en el orden exacto del inglés real.",
                "Drag and drop (or click) the tiles into the dropzone to build authentic English messages in natural word order."
              )
            )}</p>
          </div>
          <div class="extra-practice-meta">
            <span class="badge badge-teal">${rank.badge} ${rank[effectiveLang()]}</span>
            <span class="badge badge-warm">${doneCount} / ${tasks.length} ${escapeHtml(
              L("completados", "completed")
            )}</span>
          </div>
        </div>

        <div class="exercise-stepper extra-stepper" role="tablist">
          ${stepperHtml}
        </div>

        <div class="extra-question-area">
          <div class="extra-question-top">
            <span class="badge badge-teal">${escapeHtml(task.channel)}</span>
            <button type="button" class="btn btn-light" data-b-speak="${escapeHtml(targetSentence)}" data-b-rate="0.88">
              🔊 ${escapeHtml(L("Escuchar audio modelo", "Hear model audio"))}
            </button>
          </div>

          <div class="lv-roleplay-goal-box">
            🎯 <strong>${escapeHtml(T(task.goal))}</strong>
          </div>

          <div class="dnd-dropzone ${st.solved ? "is-solved" : ""}" data-dnd-dropzone="placed" aria-label="${escapeHtml(
            L("Zona para armar la oración", "Sentence assembly dropzone")
          )}">
            ${placedHtml}
          </div>

          <div class="dnd-bank-wrap" data-dnd-dropzone="bank">
            <span class="dictation-wordbank-label">${escapeHtml(
              L("Bloques disponibles (arrastra o haz clic):", "Available tiles (drag or click):")
            )}</span>
            <div class="dnd-tile-bank-list">
              ${bankHtml}
            </div>
          </div>

          <div class="dnd-actions-row">
            <button type="button" class="btn btn-primary" data-b-check="true" ${
              st.placed.length === 0 ? "disabled" : ""
            }>
              ✓ ${escapeHtml(L("Comprobar orden", "Check Order"))}
            </button>
            <button type="button" class="btn btn-light" data-b-hint="true" ${
              st.solved ? "disabled" : ""
            }>
              💡 ${escapeHtml(L("Pista (colocar siguiente)", "Hint (place next tile)"))}
            </button>
            <button type="button" class="btn btn-light" data-b-clear="true">
              ↺ ${escapeHtml(L("Reiniciar bloques", "Reset tiles"))}
            </button>
            <button type="button" class="btn btn-dark" data-b-next="true" style="margin-left: auto;">
              ${
                idx >= tasks.length - 1
                  ? escapeHtml(L("↺ Volver al 1", "↺ Back to 1"))
                  : escapeHtml(L("Siguiente Mensaje →", "Next Message →"))
              }
            </button>
          </div>

          ${feedbackHtml}
        </div>
      </article>
    `;
  }

  /* ==========================================================================
     Lab 2: Real-Life Document & Form Lab
     ========================================================================== */
  function renderDocumentLab() {
    const levelData = DATA[activeLevel];
    if (!levelData || !levelData.documentLab) return;
    const doc = levelData.documentLab;
    const st = getDocState(activeLevel);
    const rank = RANK_META[activeLevel];

    // All available chips = 4 answers + 1 distractor, deterministically shuffled
    const allChipTexts = [...doc.fields.map((f) => f.answer), doc.extraDistractor].filter(Boolean);
    const shuffledChips = deterministicShuffle(allChipTexts, `doc-${activeLevel}`);
    const usedValues = new Set(Object.values(st.slots).filter(Boolean));

    const chipsHtml = shuffledChips
      .map((chip) => {
        const isUsed = usedValues.has(chip.text);
        return `<button
          type="button"
          class="dnd-tile dnd-doc-chip ${isUsed ? "is-used" : ""}"
          draggable="${!isUsed}"
          data-doc-chip="${escapeHtml(chip.text)}"
          ${isUsed ? "disabled" : ""}
          lang="en"
        >${escapeHtml(chip.text)}</button>`;
      })
      .join("");

    const fieldsHtml = doc.fields
      .map((f) => {
        const val = st.slots[f.blankId];
        let slotCls = "doc-blank-slot";
        if (val) slotCls += " is-filled";
        if (st.checked && val) {
          slotCls += val === f.answer ? " is-correct" : " is-wrong";
        }
        return `
          <div class="doc-field-row">
            <span class="doc-field-label">${escapeHtml(f.label)}</span>
            <div class="doc-field-line" lang="en">
              <span>${escapeHtml(f.before)}</span>
              <button
                type="button"
                class="${slotCls}"
                data-doc-slot="${f.blankId}"
                title="${escapeHtml(
                  val
                    ? L("Haz clic para quitar este chip", "Click to remove this chip")
                    : L("Suelta un chip aquí", "Drop a chip here")
                )}"
              >${val ? escapeHtml(val) : "________"}</button>
              <span>${escapeHtml(f.after)}</span>
            </div>
          </div>`;
      })
      .join("");

    const completedSpeech = doc.fields
      .map((f) => `${f.before}${f.answer}${f.after}`)
      .join(" ");

    let feedbackHtml = "";
    if (st.checked) {
      feedbackHtml = st.solved
        ? `<div class="feedback-banner visible success" role="status">
             <div>✓ ${escapeHtml(T(doc.feedback))}</div>
             <button type="button" class="btn btn-light dialogue-hear-reply-btn" data-doc-speak="${escapeHtml(
               completedSpeech
             )}">
               🔊 ${escapeHtml(L("Escuchar documento completo", "Read completed document aloud"))}
             </button>
           </div>`
        : `<div class="feedback-banner visible error" role="status">✕ ${escapeHtml(
            L(
              "Revisa los campos marcados en rojo. Haz clic en un campo lleno para devolver el chip y probar otro.",
              "Check the red fields. Click any filled slot to return its chip and try another."
            )
          )}</div>`;
    }

    docRoot.innerHTML = `
      <article class="card extra-practice-card">
        <div class="extra-practice-header">
          <div>
            <span class="card-eyebrow">${escapeHtml(
              L(
                "LABORATORIO 2 • DOCUMENTOS Y FORMULARIOS REALES (ESTILO IELTS / BABBEL)",
                "LAB 2 • REAL-LIFE DOCUMENT & FORM LAB (IELTS / BABBEL STYLE)"
              )
            )}</span>
            <h2 class="theory-title extra-practice-title">${escapeHtml(
              L("Laboratorio de Documentos Reales en Vivo", "Live Real-Life Document Lab")
            )}</h2>
            <p class="extra-practice-sub">${escapeHtml(T(doc.instruction))}</p>
          </div>
          <div class="extra-practice-meta">
            <span class="badge badge-teal">${rank.badge} ${rank[effectiveLang()]}</span>
            ${
              st.solved
                ? `<span class="badge badge-teal">✓ FILED &amp; APPROVED</span>`
                : `<span class="badge badge-warm">📄 ${escapeHtml(doc.docCode)}</span>`
            }
          </div>
        </div>

        <div class="doc-artifact-sheet ${st.solved ? "is-approved" : ""}">
          <div class="doc-artifact-header">
            <div>
              <span class="doc-artifact-type">${escapeHtml(doc.docType)}</span>
              <h3 class="doc-artifact-title" lang="en">${escapeHtml(doc.docTitle)}</h3>
            </div>
            ${
              st.solved
                ? `<span class="doc-approved-stamp" aria-label="Approved">✓ APPROVED</span>`
                : `<span class="doc-code-tag">${escapeHtml(doc.docCode)}</span>`
            }
          </div>

          <div class="doc-fields-list">
            ${fieldsHtml}
          </div>
        </div>

        <div class="dnd-bank-wrap">
          <span class="dictation-wordbank-label">${escapeHtml(
            L(
              "Chips disponibles (arrastra a un campo o haz clic para llenar el siguiente espacio libre):",
              "Available chips (drag into any field or click to fill the next open blank):"
            )
          )}</span>
          <div class="dnd-tile-bank-list">
            ${chipsHtml}
          </div>
        </div>

        <div class="dnd-actions-row">
          <button type="button" class="btn btn-primary" data-doc-check="true">
            ✓ ${escapeHtml(L("Validar documento", "Submit Document"))}
          </button>
          <button type="button" class="btn btn-light" data-doc-reset="true">
            ↺ ${escapeHtml(L("Limpiar documento", "Clear Document"))}
          </button>
        </div>

        ${feedbackHtml}
      </article>
    `;
  }

  function renderAll() {
    updateRankTabsAndBanner();
    renderBuilderLab();
    renderDocumentLab();
  }

  /* ==========================================================================
     Drag-and-Drop + Click/Tap Events — Lab 1 (Builder)
     ========================================================================== */
  builderRoot.addEventListener("dragstart", (e) => {
    const tile = e.target.closest(".dnd-tile[data-dnd-zone]");
    if (!tile) return;
    dragPayload = {
      type: "builder",
      zone: tile.dataset.dndZone,
      idx: Number(tile.dataset.dndIdx),
    };
    tile.classList.add("is-dragging");
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", JSON.stringify(dragPayload));
    }
  });

  builderRoot.addEventListener("dragend", (e) => {
    const tile = e.target.closest(".dnd-tile");
    if (tile) tile.classList.remove("is-dragging");
    builderRoot.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));
    dragPayload = null;
  });

  builderRoot.addEventListener("dragover", (e) => {
    if (!dragPayload || dragPayload.type !== "builder") return;
    const zone = e.target.closest("[data-dnd-dropzone]");
    if (!zone) return;
    e.preventDefault();
    zone.classList.add("drag-over");
  });

  builderRoot.addEventListener("dragleave", (e) => {
    const zone = e.target.closest("[data-dnd-dropzone]");
    if (zone && !zone.contains(e.relatedTarget)) {
      zone.classList.remove("drag-over");
    }
  });

  builderRoot.addEventListener("drop", (e) => {
    if (!dragPayload || dragPayload.type !== "builder") return;
    const zoneEl = e.target.closest("[data-dnd-dropzone]");
    if (!zoneEl) return;
    e.preventDefault();
    zoneEl.classList.remove("drag-over");

    const idx = taskIndices[activeLevel] || 0;
    const st = getBuilderState(activeLevel, idx);
    const targetZone = zoneEl.dataset.dndDropzone;
    const targetTile = e.target.closest(".dnd-tile[data-dnd-zone='placed']");

    if (dragPayload.zone === "bank" && targetZone === "placed") {
      const [moved] = st.bank.splice(dragPayload.idx, 1);
      if (moved) {
        if (targetTile) {
          st.placed.splice(Number(targetTile.dataset.dndIdx), 0, moved);
        } else {
          st.placed.push(moved);
        }
        st.checked = false;
        st.solved = false;
      }
    } else if (dragPayload.zone === "placed" && targetZone === "bank") {
      const [moved] = st.placed.splice(dragPayload.idx, 1);
      if (moved) {
        st.bank.push(moved);
        st.checked = false;
        st.solved = false;
      }
    } else if (dragPayload.zone === "placed" && targetZone === "placed") {
      const fromIdx = dragPayload.idx;
      const toIdx = targetTile ? Number(targetTile.dataset.dndIdx) : st.placed.length - 1;
      if (fromIdx !== toIdx) {
        const [moved] = st.placed.splice(fromIdx, 1);
        if (moved) st.placed.splice(toIdx, 0, moved);
        st.checked = false;
        st.solved = false;
      }
    }
    dragPayload = null;
    renderBuilderLab();
  });

  builderRoot.addEventListener("click", (e) => {
    const stepBtn = e.target.closest("[data-b-step]");
    if (stepBtn) {
      taskIndices[activeLevel] = Number(stepBtn.dataset.bStep);
      renderBuilderLab();
      return;
    }

    const speakBtn = e.target.closest("[data-b-speak]");
    if (speakBtn) {
      speak(speakBtn.dataset.bSpeak, Number(speakBtn.dataset.bRate) || 0.92);
      return;
    }

    const tile = e.target.closest(".dnd-tile[data-dnd-zone]");
    if (tile) {
      const idx = taskIndices[activeLevel] || 0;
      const st = getBuilderState(activeLevel, idx);
      const tIdx = Number(tile.dataset.dndIdx);
      if (tile.dataset.dndZone === "bank") {
        const [moved] = st.bank.splice(tIdx, 1);
        if (moved) st.placed.push(moved);
      } else {
        const [moved] = st.placed.splice(tIdx, 1);
        if (moved) st.bank.push(moved);
      }
      st.checked = false;
      st.solved = false;
      renderBuilderLab();
      return;
    }

    if (e.target.closest("[data-b-check]")) {
      const idx = taskIndices[activeLevel] || 0;
      const task = DATA[activeLevel].builderTasks[idx];
      const st = getBuilderState(activeLevel, idx);
      const isExact =
        st.placed.length === task.tiles.length &&
        st.placed.every((tileObj, i) => tileObj.text === task.tiles[i]);
      st.checked = true;
      st.solved = isExact;
      if (isExact) markProgress(`build:${activeLevel}:${idx}`);
      renderBuilderLab();
      return;
    }

    if (e.target.closest("[data-b-hint]")) {
      const idx = taskIndices[activeLevel] || 0;
      const task = DATA[activeLevel].builderTasks[idx];
      const st = getBuilderState(activeLevel, idx);
      // Find first index where placed doesn't match target
      let mismatchIdx = 0;
      while (
        mismatchIdx < st.placed.length &&
        st.placed[mismatchIdx].text === task.tiles[mismatchIdx]
      ) {
        mismatchIdx++;
      }
      if (mismatchIdx < task.tiles.length) {
        // Return any misplaced tiles from mismatchIdx onwards back to bank
        if (mismatchIdx < st.placed.length) {
          const removed = st.placed.splice(mismatchIdx);
          st.bank.push(...removed);
        }
        const neededText = task.tiles[mismatchIdx];
        const bankPos = st.bank.findIndex((t) => t.text === neededText);
        if (bankPos !== -1) {
          const [tileObj] = st.bank.splice(bankPos, 1);
          st.placed.push(tileObj);
        }
        st.checked = false;
        st.solved = false;
        renderBuilderLab();
      }
      return;
    }

    if (e.target.closest("[data-b-clear]")) {
      const idx = taskIndices[activeLevel] || 0;
      delete builderState[`${activeLevel}:${idx}`];
      renderBuilderLab();
      return;
    }

    if (e.target.closest("[data-b-next]")) {
      const len = (DATA[activeLevel].builderTasks || []).length;
      if (len > 0) {
        taskIndices[activeLevel] = ((taskIndices[activeLevel] || 0) + 1) % len;
        renderBuilderLab();
      }
    }
  });

  /* ==========================================================================
     Drag-and-Drop + Click/Tap Events — Lab 2 (Real-Life Document)
     ========================================================================== */
  docRoot.addEventListener("dragstart", (e) => {
    const chip = e.target.closest("[data-doc-chip]");
    if (!chip || chip.disabled) return;
    dragPayload = { type: "doc", text: chip.dataset.docChip };
    chip.classList.add("is-dragging");
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "copyMove";
      e.dataTransfer.setData("text/plain", chip.dataset.docChip);
    }
  });

  docRoot.addEventListener("dragend", (e) => {
    const chip = e.target.closest("[data-doc-chip]");
    if (chip) chip.classList.remove("is-dragging");
    docRoot.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));
    dragPayload = null;
  });

  docRoot.addEventListener("dragover", (e) => {
    if (!dragPayload || dragPayload.type !== "doc") return;
    const slot = e.target.closest("[data-doc-slot]");
    if (!slot) return;
    e.preventDefault();
    slot.classList.add("drag-over");
  });

  docRoot.addEventListener("dragleave", (e) => {
    const slot = e.target.closest("[data-doc-slot]");
    if (slot) slot.classList.remove("drag-over");
  });

  docRoot.addEventListener("drop", (e) => {
    if (!dragPayload || dragPayload.type !== "doc") return;
    const slot = e.target.closest("[data-doc-slot]");
    if (!slot) return;
    e.preventDefault();
    slot.classList.remove("drag-over");
    const st = getDocState(activeLevel);
    st.slots[slot.dataset.docSlot] = dragPayload.text;
    st.checked = false;
    st.solved = false;
    dragPayload = null;
    renderDocumentLab();
  });

  docRoot.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-doc-chip]");
    if (chip && !chip.disabled) {
      const st = getDocState(activeLevel);
      const doc = DATA[activeLevel].documentLab;
      const firstEmpty = doc.fields.find((f) => !st.slots[f.blankId]);
      if (firstEmpty) {
        st.slots[firstEmpty.blankId] = chip.dataset.docChip;
        st.checked = false;
        st.solved = false;
        renderDocumentLab();
      }
      return;
    }

    const slot = e.target.closest("[data-doc-slot]");
    if (slot) {
      const st = getDocState(activeLevel);
      if (st.slots[slot.dataset.docSlot]) {
        st.slots[slot.dataset.docSlot] = null;
        st.checked = false;
        st.solved = false;
        renderDocumentLab();
      }
      return;
    }

    if (e.target.closest("[data-doc-check]")) {
      const doc = DATA[activeLevel].documentLab;
      const st = getDocState(activeLevel);
      const allRight = doc.fields.every((f) => st.slots[f.blankId] === f.answer);
      st.checked = true;
      st.solved = allRight;
      if (allRight) markProgress(`doc:${activeLevel}`);
      renderDocumentLab();
      return;
    }

    if (e.target.closest("[data-doc-reset]")) {
      delete docState[activeLevel];
      renderDocumentLab();
      return;
    }

    const speakBtn = e.target.closest("[data-doc-speak]");
    if (speakBtn) {
      speak(speakBtn.dataset.docSpeak, 0.9);
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
