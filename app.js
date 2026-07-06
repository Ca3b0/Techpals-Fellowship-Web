// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Set your Brave Search API key here (or in a serverless function — see README)
const BRAVE_API_KEY = "YOUR_BRAVE_API_KEY_HERE";

// How many external results to show (max 5 for v1)
const EXTERNAL_RESULT_COUNT = 5;

// Domains to filter out from external results (low quality / ad-heavy)
const BLOCKED_DOMAINS = [
  "pinterest.com", "quora.com", "reddit.com",
  "amazon.com", "ebay.com", "etsy.com"
];

// ─── ELEMENTS ────────────────────────────────────────────────────────────────
const searchInput  = document.getElementById("search-input");
const searchBtn    = document.getElementById("search-btn");
const resultsSection = document.getElementById("results-section");
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

// ─── MAIN SEARCH FUNCTION ────────────────────────────────────────────────────
async function runSearch(query) {
  if (!query) return;

  // Scroll to results
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  showLoading(query);

  // 1. Match against curated TechPals resources
  const techpalsMatches = matchTechPalsResources(query);

  // 2. Fetch external results
  let externalResults = [];
  try {
    externalResults = await fetchExternalResults(query);
  } catch (err) {
    console.warn("External search unavailable:", err.message);
  }

  renderResults(query, techpalsMatches, externalResults);
}

// ─── TECHPALS MATCHING ───────────────────────────────────────────────────────
function matchTechPalsResources(query) {
  const q = query.toLowerCase();
  const words = q.split(/\s+/);

  return TECHPALS_RESOURCES
    .map((resource) => {
      const tagString = resource.tags.join(" ");
      // Score: full phrase match scores highest, word matches add up
      let score = 0;
      if (tagString.includes(q)) score += 10;
      words.forEach((word) => {
        if (word.length > 2 && tagString.includes(word)) score += 2;
      });
      if (resource.title.toLowerCase().includes(q)) score += 5;
      return { ...resource, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4); // max 4 TechPals results
}

// ─── EXTERNAL SEARCH (Brave Search API) ──────────────────────────────────────
async function fetchExternalResults(query) {
  // If no API key is set, return a helpful fallback message
  if (BRAVE_API_KEY === "YOUR_BRAVE_API_KEY_HERE") {
    return getFallbackResults(query);
  }

  const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query + " tutorial guide for beginners")}&count=${EXTERNAL_RESULT_COUNT + 3}&safesearch=strict`;

  const response = await fetch(url, {
    headers: {
      "Accept": "application/json",
      "Accept-Encoding": "gzip",
      "X-Subscription-Token": BRAVE_API_KEY
    }
  });

  if (!response.ok) throw new Error(`Brave API error: ${response.status}`);

  const data = await response.json();
  const results = data.web?.results ?? [];

  return results
    .filter((r) => !BLOCKED_DOMAINS.some((d) => r.url.includes(d)))
    .slice(0, EXTERNAL_RESULT_COUNT)
    .map((r) => ({
      title: r.title,
      description: r.description || "Click to view this resource.",
      url: r.url,
      source: extractDomain(r.url)
    }));
}

// Fallback results when no API key is configured (uses trusted known sources)
function getFallbackResults(query) {
  const q = encodeURIComponent(query);
  return [
    {
      title: `Search Google for "${query}"`,
      description: "Find guides, tutorials, and trusted websites about this topic on Google.",
      url: `https://www.google.com/search?q=${q}+beginner+guide`,
      source: "google.com"
    },
    {
      title: `AARP: ${query} guides`,
      description: "AARP has many easy-to-follow technology guides written specifically for older adults.",
      url: `https://www.aarp.org/home-family/personal-technology/`,
      source: "aarp.org"
    },
    {
      title: `GCFGlobal: Free ${query} lessons`,
      description: "GCFGlobal offers free, beginner-friendly technology tutorials on a wide range of topics.",
      url: `https://edu.gcfglobal.org/en/`,
      source: "gcfglobal.org"
    }
  ];
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
      <p>${techpalsResults.length + externalResults.length} resources found</p>
    </div>`;

  // TechPals resources first
  if (techpalsResults.length > 0) {
    html += `<p class="section-label techpals">★ TechPals Resources</p>`;
    html += `<div class="cards-grid">`;
    techpalsResults.forEach((r) => {
      html += cardHTML({
        title: r.title,
        desc: r.description,
        url: r.url,
        isTechPals: true
      });
    });
    html += `</div>`;
  }

  // External results
  if (externalResults.length > 0) {
    html += `<p class="section-label">More Resources</p>`;
    html += `<div class="cards-grid">`;
    externalResults.forEach((r) => {
      html += cardHTML({
        title: r.title,
        desc: r.description,
        url: r.url,
        source: r.source,
        isTechPals: false
      });
    });
    html += `</div>`;
  }

  resultsContainer.innerHTML = html;
}

function cardHTML({ title, desc, url, source, isTechPals }) {
  const badgeHTML = isTechPals
    ? `<span class="card-badge">★ TechPals</span>`
    : source
      ? `<span class="card-badge" style="background:rgba(107,114,128,0.1);color:#4B5563;">${escapeHtml(source)}</span>`
      : "";

  const arrowIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;

  return `
    <article class="card ${isTechPals ? "techpals-card" : ""}">
      ${badgeHTML}
      <h3 class="card-title">${escapeHtml(title)}</h3>
      <p class="card-desc">${escapeHtml(desc)}</p>
      <a class="card-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
        View Resource ${arrowIcon}
      </a>
    </article>`;
}

function showLoading(query) {
  resultsContainer.innerHTML = `
    <div class="loading-state" role="status" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <p>Finding resources for "<strong>${escapeHtml(query)}</strong>"…</p>
    </div>`;
}

// ─── UTILS ───────────────────────────────────────────────────────────────────
function extractDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch { return url; }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
