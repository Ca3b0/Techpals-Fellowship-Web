// ─── ELEMENTS ────────────────────────────────────────────────────────────────
const searchInput     = document.getElementById("search-input");
const searchBtn       = document.getElementById("search-btn");
const resultsSection  = document.getElementById("results-section");
const resultsContainer = document.getElementById("results-container");

// ─── EVENT LISTENERS ─────────────────────────────────────────────────────────
searchBtn.addEventListener("click", () => runSearch(searchInput.value.trim()));
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") runSearch(searchInput.value.trim());
});
document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const query = chip.dataset.query;
    searchInput.value = query;
    runSearch(query);
  });
});

// ─── SEARCH ──────────────────────────────────────────────────────────────────
function runSearch(query) {
  if (!query) return;
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  showLoading(query);

  // Small delay so loading state is visible
  setTimeout(() => {
    const techpalsMatches  = matchResources(query, TECHPALS_RESOURCES, 4);
    const externalMatches  = matchResources(query, EXTERNAL_RESOURCES, 5);
    renderResults(query, techpalsMatches, externalMatches);
  }, 300);
}

// ─── MATCHING ────────────────────────────────────────────────────────────────
function matchResources(query, list, maxResults) {
  const q     = query.toLowerCase().trim();
  const words = q.split(/\s+/).filter(w => w.length > 2);

  return list
    .map((resource) => {
      const tagStr   = resource.tags.join(" ").toLowerCase();
      const titleStr = resource.title.toLowerCase();
      const descStr  = resource.description.toLowerCase();
      let score = 0;

      // Exact full phrase match in tags (highest value)
      if (tagStr.includes(q))   score += 15;
      if (titleStr.includes(q)) score += 10;
      if (descStr.includes(q))  score += 5;

      // Individual word matches
      words.forEach((word) => {
        if (tagStr.includes(word))   score += 3;
        if (titleStr.includes(word)) score += 2;
        if (descStr.includes(word))  score += 1;
      });

      return { ...resource, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

// ─── RENDER ──────────────────────────────────────────────────────────────────
function renderResults(query, techpalsResults, externalResults) {
  const hasAny = techpalsResults.length > 0 || externalResults.length > 0;

  if (!hasAny) {
    resultsContainer.innerHTML = `
      <div class="empty-state">
        <h3>No results found for "${escapeHtml(query)}"</h3>
        <p>Try a different word or tap one of the popular topics above — or <a href="https://techpals.org" target="_blank" rel="noopener">visit TechPals.org</a> for help.</p>
      </div>`;
    return;
  }

  let html = `
    <div class="results-header">
      <h2>Results for "${escapeHtml(query)}"</h2>
      <p>${techpalsResults.length + externalResults.length} resource${techpalsResults.length + externalResults.length !== 1 ? "s" : ""} found</p>
    </div>`;

  if (techpalsResults.length > 0) {
    html += `<p class="section-label techpals">★ TechPals Resources</p>`;
    html += `<div class="cards-grid">`;
    techpalsResults.forEach(r => { html += cardHTML(r, true); });
    html += `</div>`;
  }

  if (externalResults.length > 0) {
    html += `<p class="section-label">More Trusted Resources</p>`;
    html += `<div class="cards-grid">`;
    externalResults.forEach(r => { html += cardHTML(r, false); });
    html += `</div>`;
  }

  resultsContainer.innerHTML = html;
}

// ─── CARD ────────────────────────────────────────────────────────────────────
const TOPIC_ICONS = {
  bank: "🏦", banking: "🏦", money: "🏦",
  zoom: "📹", video: "📹", facetime: "📹", call: "📹",
  scam: "🛡️", fraud: "🛡️", phishing: "🛡️", safety: "🛡️",
  cloud: "☁️", storage: "☁️", backup: "☁️",
  phone: "📱", smartphone: "📱", iphone: "📱", android: "📱",
  email: "✉️", gmail: "✉️", inbox: "✉️",
  google: "🔍", search: "🔍", internet: "🔍",
  password: "🔐", security: "🔐", login: "🔐",
  wifi: "📶", network: "📶", router: "📶",
  photo: "🖼️", photos: "🖼️", picture: "🖼️",
  text: "💬", message: "💬", sms: "💬",
  battery: "🔋", charging: "🔋",
  app: "📲", apps: "📲", download: "📲",
};

function getIcon(title, tags) {
  const text = (title + " " + (tags || []).join(" ")).toLowerCase();
  for (const [key, icon] of Object.entries(TOPIC_ICONS)) {
    if (text.includes(key)) return icon;
  }
  return "📖";
}

function cardHTML(resource, isTechPals) {
  const { title, description, steps, url, source, tags } = resource;
  const icon = getIcon(title, tags);

  // Short one-line summary for collapsed view
  const firstSentence = (description.match(/[^.!?]+[.!?]?/) || [description])[0].trim();
  const summary = firstSentence.length > 100 ? firstSentence.slice(0, 97) + "…" : firstSentence;

  const badge = isTechPals
    ? `<span class="card-badge">★ TechPals</span>`
    : source
      ? `<span class="card-badge ext">${escapeHtml(source)}</span>`
      : "";

  const chevron = `<svg class="card-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;
  const arrowIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;

  const stepsHTML = steps.map((s, i) => `
    <li><span class="step-num">${i + 1}</span><span>${escapeHtml(s)}</span></li>`).join("");

  return `
    <article class="card ${isTechPals ? "techpals-card" : ""}" role="button" tabindex="0" aria-expanded="false">
      <div class="card-header">
        <div class="card-icon" aria-hidden="true">${icon}</div>
        <div class="card-header-text">
          ${badge}
          <h3 class="card-title">${escapeHtml(title)}</h3>
          <p class="card-summary">${escapeHtml(summary)}</p>
        </div>
        ${chevron}
      </div>
      <div class="card-body" aria-hidden="true">
        <h4>What you'll learn</h4>
        <ul class="card-steps">${stepsHTML}</ul>
        <a class="card-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
          Open full guide ${arrowIcon}
        </a>
      </div>
    </article>`;
}

// ─── EXPAND / COLLAPSE ───────────────────────────────────────────────────────
document.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  if (e.target.closest(".card-link")) return;

  const isOpen = card.classList.contains("open");
  document.querySelectorAll(".card.open").forEach(c => {
    c.classList.remove("open");
    c.setAttribute("aria-expanded", "false");
    c.querySelector(".card-body").setAttribute("aria-hidden", "true");
  });

  if (!isOpen) {
    card.classList.add("open");
    card.setAttribute("aria-expanded", "true");
    card.querySelector(".card-body").setAttribute("aria-hidden", "false");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest(".card");
  if (!card || e.target.closest(".card-link")) return;
  e.preventDefault();
  card.click();
});

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function showLoading(query) {
  resultsContainer.innerHTML = `
    <div class="loading-state" role="status" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <p>Finding resources for "<strong>${escapeHtml(query)}</strong>"…</p>
    </div>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
