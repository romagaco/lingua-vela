/**
 * LinguaVela — Live Updates & Commits Changelog Module (js/updates.js)
 *
 * Fetches recent commits directly from GitHub (romagaco/lingua-vela) so every
 * new feature pushed to the repository automatically appears in a modern timeline.
 * Includes a bundled git-history snapshot so the page works 100% offline or on file://.
 */

(() => {
  "use strict";

  const root = document.getElementById("updates-root");
  if (!root) return;

  const REPO_OWNER = "romagaco";
  const REPO_NAME = "lingua-vela";
  const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
  const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=30`;

  // Bundled fallback snapshot synced from git log (used immediately & when offline)
  const FALLBACK_COMMITS = [
    { sha: "2832b06", date: "2026-11-27", author: "roberto", message: "Add real-world English practice labs", body: "Drag-and-Drop Message Builder, Live Document & Form Lab, Click-to-Fix Error Detective, and 3-zone Tone & Register Sorter across Pre-A1 to C2." },
    { sha: "2e9c406", date: "2026-11-27", author: "roberto", message: "Add progressive immersion and level sections", body: "Progressive Spanglish-to-English immersion engine (15% EN to 100% EN) plus 3 new interactive sections per level: Reading Capsule, Expressions & False Friends, and Situational Roleplay." },
    { sha: "2dac046", date: "2026-11-22", author: "roberto", message: "Add interactive listening practice sections", body: "Added 70 Micro-Dictation & Connected Speech Cloze exercises and 70 Interactive Dialogue challenges." },
    { sha: "d942012", date: "2026-11-22", author: "roberto", message: "Move community section to top of Port" },
    { sha: "53407a5", date: "2026-11-22", author: "roberto", message: "Add books and community links" },
    { sha: "b62c3e7", date: "2026-11-20", author: "roberto", message: "Add extended books and extra practice banks" },
    { sha: "5f5e5e2", date: "2026-11-16", author: "roberto", message: "Improve responsive layouts across screen sizes" },
    { sha: "29fa169", date: "2026-11-16", author: "roberto", message: "Add interactive C2 lesson content" },
    { sha: "6dc8d8d", date: "2026-11-16", author: "roberto", message: "Add interactive C1 lesson curriculum" },
    { sha: "a88f653", date: "2026-11-16", author: "roberto", message: "Add interactive B2 lesson curriculum" },
    { sha: "1df95f4", date: "2026-11-16", author: "roberto", message: "Add interactive B1 lesson curriculum" },
    { sha: "e260c93", date: "2026-11-16", author: "roberto", message: "Update README.md" },
    { sha: "8766706", date: "2026-11-16", author: "roberto", message: "Add interactive A2 lesson curriculum" },
    { sha: "f6ea9f7", date: "2026-11-15", author: "roberto", message: "Add A1 lesson module and lesson page" },
    { sha: "ee6e786", date: "2026-11-15", author: "roberto", message: "Add animal icons and image support to flashcards" },
    { sha: "45ea884", date: "2026-11-15", author: "roberto", message: "Add vocabulary animals flashcards & UI" },
    { sha: "ce3f101", date: "2026-11-13", author: "roberto", message: "Add Books module with stories, styles, and assets" },
    { sha: "f113c61", date: "2026-11-12", author: "roberto", message: "PreA1 lessons" },
    { sha: "cc9435f", date: "2026-11-12", author: "roberto", message: "Add Lessons/Practice/Books hubs, pages & styles" },
    { sha: "eb5bd77", date: "2026-11-12", author: "roberto", message: "Add .nojekyll to disable Jekyll build processing" },
    { sha: "37a1f3c", date: "2026-11-12", author: "roberto", message: "new project" },
  ];

  let commits = [...FALLBACK_COMMITS];
  let sourceMode = "cached"; // "live" | "cached" | "loading"
  let activeFilter = "all";
  let searchQuery = "";

  const lang = () => (document.documentElement.lang === "en" ? "en" : "es");
  const L = (es, en) => (lang() === "es" ? es : en);

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function classifyCommit(msg) {
    const m = String(msg || "").toLowerCase();
    if (/(fix|bug|hotfix|repair)/.test(m)) {
      return { id: "fix", icon: "🐛", es: "Corrección", en: "Fix", badgeCls: "badge-warm" };
    }
    if (/(responsive|layout|style|ui|css|move|icon|image)/.test(m)) {
      return { id: "ui", icon: "🎨", es: "Diseño & UI", en: "UI & Layout", badgeCls: "badge-warm" };
    }
    if (/(lesson|curriculum|book|flashcard|prea1|a1|a2|b1|b2|c1|c2)/.test(m)) {
      return { id: "content", icon: "📚", es: "Lecciones & Contenido", en: "Lessons & Content", badgeCls: "badge-teal" };
    }
    if (/(readme|nojekyll|new project|chore|docs)/.test(m)) {
      return { id: "chore", icon: "🛠️", es: "Mantenimiento", en: "Maintenance", badgeCls: "badge-neutral" };
    }
    return { id: "feature", icon: "✨", es: "Nueva Función", en: "New Feature", badgeCls: "badge-teal" };
  }

  function formatDate(isoStr) {
    if (!isoStr) return "";
    try {
      const d = new Date(isoStr.length === 10 ? `${isoStr}T12:00:00Z` : isoStr);
      return d.toLocaleDateString(lang() === "es" ? "es-ES" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return isoStr;
    }
  }

  function render() {
    const query = searchQuery.trim().toLowerCase();
    const filtered = commits.filter((c) => {
      const cat = classifyCommit(c.message);
      if (activeFilter !== "all" && cat.id !== activeFilter) return false;
      if (query) {
        const hay = `${c.message} ${c.body || ""} ${c.sha} ${c.author}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });

    const latestDate = commits[0] ? formatDate(commits[0].date) : "—";
    const featureCount = commits.filter((c) => {
      const id = classifyCommit(c.message).id;
      return id === "feature" || id === "content";
    }).length;

    const statusBadge =
      sourceMode === "live"
        ? `<span class="updates-status-pill is-live"><span class="status-dot" aria-hidden="true"></span> ${L(
            "En vivo desde GitHub",
            "Live from GitHub"
          )}</span>`
        : sourceMode === "loading"
        ? `<span class="updates-status-pill">⏳ ${L("Sincronizando con GitHub...", "Syncing with GitHub...")}</span>`
        : `<span class="updates-status-pill">📦 ${L("Bitácora local (offline)", "Cached Ship Log")}</span>`;

    const filters = [
      { id: "all", label: L("🧭 Todos", "🧭 All") },
      { id: "feature", label: L("✨ Funciones", "✨ Features") },
      { id: "content", label: L("📚 Lecciones", "📚 Lessons & Content") },
      { id: "ui", label: L("🎨 UI & Diseño", "🎨 UI & Layout") },
      { id: "chore", label: L("🛠️ Proyecto", "🛠️ Maintenance") },
    ];

    const timelineHtml = filtered.length
      ? filtered
          .map((c, idx) => {
            const cat = classifyCommit(c.message);
            const isLatest = idx === 0 && activeFilter === "all" && !query;
            const commitUrl = `${REPO_URL}/commit/${c.fullSha || c.sha}`;
            return `
              <article class="commit-card ${isLatest ? "is-latest" : ""}">
                <div class="commit-rail-dot" aria-hidden="true"></div>
                <div class="commit-card-body">
                  <div class="commit-card-top">
                    <div class="commit-badges">
                      ${
                        isLatest
                          ? `<span class="badge badge-teal">🚀 ${L("ÚLTIMA ACTUALIZACIÓN", "LATEST UPDATE")}</span>`
                          : ""
                      }
                      <span class="badge ${cat.badgeCls}">${cat.icon} ${cat[lang()]}</span>
                    </div>
                    <time class="commit-date">${escapeHtml(formatDate(c.date))}</time>
                  </div>

                  <h3 class="commit-title">${escapeHtml(c.message)}</h3>
                  ${c.body ? `<p class="commit-desc">${escapeHtml(c.body)}</p>` : ""}

                  <div class="commit-meta-row">
                    <span class="commit-author">👤 ${escapeHtml(c.author || "LinguaVela Crew")}</span>
                    <a
                      href="${commitUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="commit-sha-pill"
                      title="${L("Ver commit en GitHub", "View commit on GitHub")}"
                    >
                      #${escapeHtml(c.sha)} ↗
                    </a>
                  </div>
                </div>
              </article>
            `;
          })
          .join("")
      : `<div class="card coming-soon-card" style="margin: 1rem auto;">
           <p>${L("No se encontraron commits con ese filtro.", "No commits match that filter.")}</p>
         </div>`;

    root.innerHTML = `
      <div class="updates-stats-grid">
        <div class="card updates-stat-card">
          <span class="updates-stat-label">${L("COMMITS REGISTRADOS", "COMMITS TRACKED")}</span>
          <strong class="updates-stat-val">${commits.length}</strong>
        </div>
        <div class="card updates-stat-card">
          <span class="updates-stat-label">${L("FUNCIONES Y LECCIONES", "FEATURES & LESSONS")}</span>
          <strong class="updates-stat-val">${featureCount}</strong>
        </div>
        <div class="card updates-stat-card">
          <span class="updates-stat-label">${L("ÚLTIMA PUBLICACIÓN", "LATEST SHIP DATE")}</span>
          <strong class="updates-stat-val">${escapeHtml(latestDate)}</strong>
        </div>
      </div>

      <div class="card updates-toolbar-card">
        <div class="updates-toolbar-top">
          <div class="updates-source-group">
            ${statusBadge}
            <a href="${REPO_URL}/commits" target="_blank" rel="noopener noreferrer" class="btn btn-light updates-gh-btn">
              GitHub Repo ↗
            </a>
            <button type="button" class="btn btn-light updates-gh-btn" data-updates-refresh="true">
              ↻ ${L("Actualizar", "Refresh")}
            </button>
          </div>
          <input
            type="search"
            id="updates-search-input"
            class="dictation-text-input updates-search"
            value="${escapeHtml(searchQuery)}"
            placeholder="${L("Buscar commits o funciones...", "Search commits or features...")}"
            aria-label="${L("Buscar commits", "Search commits")}"
          />
        </div>

        <div class="level-tabs" role="tablist" aria-label="${L("Filtrar por tipo de cambio", "Filter by change type")}">
          ${filters
            .map(
              (f) => `
            <button
              type="button"
              class="level-tab-btn ${activeFilter === f.id ? "active" : ""}"
              role="tab"
              aria-selected="${activeFilter === f.id}"
              data-updates-filter="${f.id}"
            >${f.label}</button>`
            )
            .join("")}
        </div>
      </div>

      <div class="updates-timeline">
        ${timelineHtml}
      </div>
    `;
  }

  function fetchLiveCommits() {
    if (typeof fetch !== "function") return;
    sourceMode = "loading";
    render();

    fetch(API_URL, { headers: { Accept: "application/vnd.github+json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          commits = data.map((item) => {
            const fullMsg = (item.commit && item.commit.message) || "";
            const lines = fullMsg.split("\n").map((l) => l.trim()).filter(Boolean);
            return {
              sha: String(item.sha || "").slice(0, 7),
              fullSha: item.sha || "",
              date:
                (item.commit && item.commit.author && item.commit.author.date) || "",
              author:
                (item.author && item.author.login) ||
                (item.commit && item.commit.author && item.commit.author.name) ||
                "LinguaVela",
              message: lines[0] || "Update",
              body: lines.slice(1).join(" "),
            };
          });
          sourceMode = "live";
        } else {
          sourceMode = "cached";
        }
        render();
      })
      .catch(() => {
        sourceMode = "cached";
        render();
      });
  }

  root.addEventListener("click", (e) => {
    const filterBtn = e.target.closest("[data-updates-filter]");
    if (filterBtn) {
      activeFilter = filterBtn.dataset.updatesFilter;
      render();
      return;
    }
    if (e.target.closest("[data-updates-refresh]")) {
      fetchLiveCommits();
    }
  });

  root.addEventListener("input", (e) => {
    if (e.target && e.target.id === "updates-search-input") {
      searchQuery = e.target.value || "";
      render();
      const input = document.getElementById("updates-search-input");
      if (input) {
        input.focus();
        input.setSelectionRange(searchQuery.length, searchQuery.length);
      }
    }
  });

  new MutationObserver(render).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });

  render();
  fetchLiveCommits();
})();
