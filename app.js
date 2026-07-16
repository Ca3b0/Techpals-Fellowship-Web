// ─── ELEMENTS ────────────────────────────────────────────────────────────────
const searchInput      = document.getElementById("search-input");
const searchBtn        = document.getElementById("search-btn");
const resultsSection   = document.getElementById("results-section");
const resultsContainer = document.getElementById("results-container");

// ─── LIVE TECHPALS BLOG FETCHER ───────────────────────────────────────────────
// Fetches live posts from techpals.org/blog pages and parses them.
// Merges with the hardcoded list in resources.js so new posts appear automatically.

let liveTechPalsCache = null; // cache so we only fetch once per session

async function fetchLiveTechPalsPosts() {
  if (liveTechPalsCache) return liveTechPalsCache;

  const pages = [
    "https://www.techpals.org/blog",
    "https://www.techpals.org/blog?offset=1759862940349",
    "https://www.techpals.org/blog?offset=1750702980607",
    "https://www.techpals.org/blog?offset=1748884260764",
  ];

  const allPosts = [];
  const seenUrls = new Set();

  for (const pageUrl of pages) {
    try {
      const res  = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(pageUrl)}`);
      const data = await res.json();
      const html = data.contents || "";

      // Parse out post blocks using regex on the HTML
      // Squarespace blog pattern: href="/blog/slug" followed by title and description
      const postRegex = /href="(https:\/\/www\.techpals\.org\/blog\/[^"]+)"[^>]*>\s*(?:<[^>]+>\s*)*([^<]{10,200})<\/a>[\s\S]{0,500}?<p[^>]*>([\s\S]{20,400}?)<\/p>/gi;
      let match;
      while ((match = postRegex.exec(html)) !== null) {
        const url   = match[1].trim();
        const title = match[2].replace(/\s+/g, " ").trim();
        const desc  = match[3].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

        if (seenUrls.has(url)) continue;
        if (url.includes("category") || url.includes("?offset")) continue;
        if (title.length < 10 || desc.length < 20) continue;

        seenUrls.add(url);
        allPosts.push({
          title,
          description: desc,
          steps: generateSteps(title, desc),
          url,
          tags: extractTags(title + " " + desc),
          isLive: true,
        });
      }
    } catch {
      // If fetch fails for a page, skip it silently
    }
  }

  liveTechPalsCache = allPosts;
  return allPosts;
}

// Auto-extract tags from text by matching known tech keywords
function extractTags(text) {
  const t = text.toLowerCase();
  const keywords = [
    "phone","smartphone","iphone","android","battery","charging","slow","freeze","crash",
    "app","apps","download","delete","storage","space","update","settings","screen",
    "wifi","wi-fi","internet","data","bluetooth","airplane mode","hotspot",
    "email","gmail","inbox","spam","unsubscribe","phishing",
    "text","sms","imessage","messages","group text","voice message",
    "photo","photos","picture","camera","screenshot","scan","pdf",
    "zoom","video call","facetime","google meet","video chat",
    "scam","scams","fraud","gift card","qr code","fake website","cookies",
    "password","security","privacy","tracking","location","sign in","login",
    "cloud","icloud","google drive","backup","google photos",
    "battery","charging","flashlight","alarm","font size","accessibility",
    "subscription","cancel","bluetooth","airpods","smartwatch","fitness tracker",
    "tablet","e-reader","kindle","browser","history","safari","chrome",
    "copy paste","clipboard","flashlight","emergency","contacts",
  ];
  return keywords.filter(k => t.includes(k));
}

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
async function runSearch(query) {
  if (!query) return;
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  showLoading(query);

  // Fetch live posts and merge with hardcoded ones
  let livePosts = [];
  try { livePosts = await fetchLiveTechPalsPosts(); } catch {}

  // Merge live + hardcoded, deduplicate by URL
  const hardcodedUrls = new Set(TECHPALS_RESOURCES.map(r => r.url));
  const freshPosts    = livePosts.filter(p => !hardcodedUrls.has(p.url));
  const allTechPals   = [...TECHPALS_RESOURCES, ...freshPosts];

  const techpalsMatches = matchResources(query, allTechPals, 5, 12);
  const externalMatches = matchResources(query, EXTERNAL_RESOURCES, 4, 8);
  const guide           = buildGuide(query);

  renderResults(query, techpalsMatches, externalMatches, guide);
}

// ─── MATCHING ────────────────────────────────────────────────────────────────
function matchResources(query, list, maxResults, minScore = 8) {
  const q     = query.toLowerCase().trim();
  const words = q.split(/\s+/).filter(w => w.length > 2);

  return list
    .map((resource) => {
      const tagStr   = (resource.tags || []).join(" ").toLowerCase();
      const titleStr = resource.title.toLowerCase();
      const descStr  = resource.description.toLowerCase();
      let score = 0;

      if (tagStr.includes(q))   score += 20;
      if (titleStr.includes(q)) score += 15;
      if (descStr.includes(q))  score += 8;

      words.forEach((word) => {
        if (tagStr.includes(word))   score += 5;
        if (titleStr.includes(word)) score += 3;
        if (descStr.includes(word))  score += 1;
      });

      return { ...resource, score };
    })
    .filter((r) => r.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

// ─── RENDER ──────────────────────────────────────────────────────────────────
function renderResults(query, techpalsResults, externalResults, guide) {
  const hasAny = techpalsResults.length > 0 || externalResults.length > 0;

  if (!hasAny) {
    resultsContainer.innerHTML = `
      <div class="empty-state">
        <h3>No results found for "${escapeHtml(query)}"</h3>
        <p>Try a different word or tap one of the popular topics above — or <a href="https://techpals.org" target="_blank" rel="noopener">visit TechPals.org</a> for help.</p>
      </div>
      ${guideHTML(guide, query)}`;
    return;
  }

  let html = `
    <div class="results-header">
      <h2>Results for "${escapeHtml(query)}"</h2>
      <p>${techpalsResults.length + externalResults.length} resource${techpalsResults.length + externalResults.length !== 1 ? "s" : ""} found</p>
    </div>`;

  if (techpalsResults.length > 0) {
    html += `<p class="section-label techpals">★ TechPals Resources</p><div class="cards-grid">`;
    techpalsResults.forEach(r => { html += cardHTML(r, true); });
    html += `</div>`;
  }

  if (externalResults.length > 0) {
    html += `<p class="section-label">More Trusted Resources</p><div class="cards-grid">`;
    externalResults.forEach(r => { html += cardHTML(r, false); });
    html += `</div>`;
  }

  html += guideHTML(guide, query);
  resultsContainer.innerHTML = html;
}

// ─── AUTO GUIDE BUILDER ───────────────────────────────────────────────────────
const GUIDE_TEMPLATES = {
  zoom: {
    intro: "Zoom is a free app that lets you see and talk to family and friends on your phone, tablet, or computer — even if they live far away.",
    steps: [
      { title: "Download Zoom", body: "On your phone, open the App Store (iPhone) or Google Play Store (Android). Search for 'Zoom' and tap the free download button." },
      { title: "Create a free account", body: "Open Zoom and tap 'Sign Up.' Enter your email address and create a password. Check your email for a confirmation link and click it." },
      { title: "Join a meeting someone sent you", body: "When a family member shares a Meeting ID or link, open Zoom, tap 'Join,' and enter the ID. Tap 'Join' again — you're in!" },
      { title: "Turn on your camera and microphone", body: "At the bottom of the screen you'll see a microphone and a camera icon. Tap each one to make sure they're turned on (not crossed out)." },
      { title: "End the call", body: "When you're done, tap the red 'End' or 'Leave' button at the bottom of the screen." },
    ]
  },
  facetime: {
    intro: "FaceTime is Apple's free video calling app — it comes already installed on every iPhone and iPad.",
    steps: [
      { title: "Open FaceTime", body: "Look for the green FaceTime app on your home screen. If you can't find it, swipe down and type 'FaceTime' in the search bar." },
      { title: "Start a call", body: "Tap the + button in the top right corner. Type the name, phone number, or email of the person you want to call." },
      { title: "Choose video or audio", body: "Tap the green video camera icon for a video call, or the phone icon for audio only." },
      { title: "During the call", body: "Tap the screen to see buttons. The microphone icon mutes you. The camera flip icon switches between front and back camera." },
      { title: "End the call", body: "Tap the red circle with an X to hang up." },
    ]
  },
  "video call": {
    intro: "Video calling lets you see and talk to someone in real time using your phone or tablet — just like being in the same room.",
    steps: [
      { title: "Choose your app", body: "Popular free options: FaceTime (iPhone only), Zoom (any device), Google Meet (any device). Ask the person you're calling which one they use." },
      { title: "Download the app", body: "Open the App Store (iPhone) or Google Play Store (Android), search for the app name, and tap the free download button." },
      { title: "Allow camera and microphone", body: "When the app asks permission to use your camera and microphone, tap 'Allow.' Without this the other person won't see or hear you." },
      { title: "Join or start a call", body: "Tap the name of someone in your contacts to call them, or enter a Meeting ID/link that someone sent you." },
      { title: "During the call", body: "Look for the microphone icon (mute) and camera icon (video on/off) at the bottom of the screen." },
    ]
  },
  email: {
    intro: "Email lets you send messages, photos, and files to anyone in the world for free. It's like a digital letter that arrives instantly.",
    steps: [
      { title: "Get a free email account", body: "The easiest option is Gmail. Go to gmail.com and click 'Create account.' Choose yourname@gmail.com and create a password." },
      { title: "Write your first email", body: "Click the 'Compose' button (pencil icon on phone). In the 'To' field, type the email address of who you're writing to. Add a Subject, then type your message." },
      { title: "Send and receive", body: "Tap the Send button (arrow icon) when ready. New emails appear in your Inbox — tap one to read it." },
      { title: "Reply to an email", body: "Open an email, scroll to the bottom, and tap 'Reply.' Type your message and tap Send." },
      { title: "Stay safe", body: "Never click links in emails from people you don't know. Real banks and government agencies will never ask for your password by email." },
    ]
  },
  scam: {
    intro: "Scammers try to trick people into giving them money or personal information. Knowing the warning signs is the best protection.",
    steps: [
      { title: "Know the #1 rule", body: "No real government agency, bank, utility company, or tech company will ever call you out of the blue and demand payment — especially not with gift cards or wire transfers." },
      { title: "Spot the warning signs", body: "Scams usually involve urgency ('act now!'), threats, prizes you didn't enter to win, or requests for unusual payment like gift cards." },
      { title: "Hang up and call back directly", body: "If someone calls claiming to be from your bank or Medicare, hang up and call the organization directly using the number on their official website." },
      { title: "Protect your personal information", body: "Never give your Social Security number, bank account details, or passwords to someone who calls or emails you unexpectedly." },
      { title: "Report scams", body: "If you think you've been targeted, tell a trusted family member, then report it at reportfraud.ftc.gov or call 1-877-382-4357." },
    ]
  },
  password: {
    intro: "A strong password is your first line of defense. Here's how to create and manage them without getting overwhelmed.",
    steps: [
      { title: "What makes a strong password", body: "Use at least 12 characters, mix uppercase, lowercase, numbers, and symbols. Avoid your name, birthday, or the word 'password.'" },
      { title: "Make it memorable", body: "Try a passphrase — three random words like 'BlueSunsetTable47!' It's long, strong, and easier to remember." },
      { title: "Use a different password per account", body: "If a hacker gets one password and you use it everywhere, they can access all your accounts." },
      { title: "Consider a password manager", body: "Apps like LastPass or the iPhone's built-in password manager remember all your passwords — you only need to remember one master password." },
      { title: "Turn on two-factor authentication", body: "Most accounts let you add a second step — after entering your password, you'll get a text with a code for extra security." },
    ]
  },
  wifi: {
    intro: "Wi-Fi lets your phone connect to the internet without using up your phone data — and it's usually much faster too.",
    steps: [
      { title: "Find Wi-Fi settings on iPhone", body: "Go to Settings → Wi-Fi and make sure the toggle is on (green). You'll see a list of nearby networks." },
      { title: "Find Wi-Fi settings on Android", body: "Go to Settings → Network & Internet → Wi-Fi and turn it on." },
      { title: "Connect to your home network", body: "Tap your home network name and enter your Wi-Fi password when asked." },
      { title: "If it won't connect", body: "Try turning Wi-Fi off and back on. If that doesn't work, unplug your router for 30 seconds, plug it back in, and wait 1 minute." },
      { title: "Stay safe on public Wi-Fi", body: "Avoid checking your bank account on public Wi-Fi (like at a coffee shop). It's fine for general browsing but not for sensitive accounts." },
    ]
  },
  phone: {
    intro: "Modern smartphones can seem complicated at first, but most of what you need comes down to a few simple skills.",
    steps: [
      { title: "Basic gestures", body: "Tap once to select or open something. Swipe up or down to scroll. Pinch two fingers together to zoom out, spread them apart to zoom in." },
      { title: "Make a call", body: "Open the Phone app (green icon). Tap the keypad and dial the number, then tap the green call button. Tap red to hang up." },
      { title: "Send a text", body: "Open the Messages app. Tap the compose icon, type a name or number, type your message, and tap Send." },
      { title: "Adjust text size", body: "On iPhone: Settings → Display & Brightness → Text Size. On Android: Settings → Display → Font Size." },
      { title: "Get help anytime", body: "If something doesn't look right, don't tap anything — ask a TechPals volunteer or trusted family member before proceeding." },
    ]
  },
  battery: {
    intro: "A few simple habits can make your phone battery last much longer throughout the day.",
    steps: [
      { title: "Lower screen brightness", body: "Go to Settings → Display & Brightness (iPhone) or Settings → Display (Android). This is one of the biggest battery savers." },
      { title: "Turn off things you're not using", body: "Bluetooth, Wi-Fi, and Location Services all use battery. Turn them off in Settings when you don't need them." },
      { title: "Use Low Power Mode", body: "On iPhone: Settings → Battery → Low Power Mode. On Android: Settings → Battery → Battery Saver." },
      { title: "Check which apps use battery most", body: "Go to Settings → Battery to see a list of apps and how much battery each has used." },
      { title: "Charge smartly", body: "Try to keep your battery between 20% and 80% for the longest lifespan overall." },
    ]
  },
  photos: {
    intro: "Your phone's camera makes it easy to take, save, and share photos with family and friends.",
    steps: [
      { title: "Take a photo", body: "Open the Camera app. Point your phone at what you want to capture and tap the large white circle button." },
      { title: "Find your photos", body: "Open the Photos app (iPhone) or Gallery app (Android) to see all your photos organized by date." },
      { title: "Share a photo", body: "Open a photo, tap the Share button (box with an arrow on iPhone, or three dots on Android). Choose to send it by text, email, or another app." },
      { title: "Back up your photos automatically", body: "Turn on iCloud Photos (iPhone: Settings → [your name] → iCloud → Photos) or Google Photos (open the app and turn on Backup)." },
      { title: "Delete photos you don't need", body: "Open a photo and tap the trash icon to delete it. On iPhone, deleted photos stay for 30 days before being permanently removed." },
    ]
  },
  banking: {
    intro: "Online banking lets you check your balance, pay bills, and transfer money from your phone — without going to a branch.",
    steps: [
      { title: "Download your bank's official app", body: "Search for your bank's name in the App Store or Google Play. Only download the official app — check that the developer name matches your bank." },
      { title: "Log in safely", body: "Use your username and password. Never share these with anyone — your bank will never ask for your full password over the phone." },
      { title: "Check your balance", body: "After logging in, tap 'Accounts' to see your balance. Tap on your account to see recent transactions." },
      { title: "Set up alerts", body: "Most banking apps let you get text or email alerts for any transaction — a great way to spot unusual activity quickly." },
      { title: "Stay secure", body: "Always open your bank by tapping the app directly — never by clicking a link in a text or email. Log out when done." },
    ]
  },
  apps: {
    intro: "Apps are programs you download to your phone to do specific things — like video calling, checking weather, or games. Most are free.",
    steps: [
      { title: "Find the app store", body: "On iPhone, look for the blue App Store icon. On Android, look for the Google Play Store (colorful triangle icon)." },
      { title: "Search for an app", body: "Tap the Search tab, type the name of the app you want (like 'Zoom' or 'Gmail'), and tap Search." },
      { title: "Download a free app", body: "Tap 'Get' (iPhone) or 'Install' (Android). If it asks for your Apple ID password or Google account, enter it — this is normal even for free apps." },
      { title: "Find and open the app", body: "Once downloaded, the app icon appears on your home screen. If you can't find it, swipe down from the middle of your screen and search for the name." },
      { title: "Delete an app you don't need", body: "Press and hold the app icon until a menu appears. Tap 'Remove App' or 'Uninstall.' This doesn't delete your photos or contacts." },
    ]
  },
};

function genericGuide(query) {
  return {
    intro: `Here's a simple beginner's overview of "${query}" to help you get started.`,
    steps: [
      { title: "Start with the basics", body: `Before diving in, take a moment to understand what ${query} is used for and why people find it useful.` },
      { title: "Look for a beginner guide", body: `Search for "${query} for beginners" on Google. GCFGlobal (edu.gcfglobal.org) and AARP (aarp.org/technology) have free easy-to-follow guides on many tech topics.` },
      { title: "Try it step by step", body: "The best way to learn is to try one small thing at a time. Most things on your phone can be undone — don't worry about making mistakes." },
      { title: "Ask for help when stuck", body: "If you get confused, write down what you were doing and what happened, then ask a TechPals volunteer or trusted family member." },
      { title: "Practice makes it easier", body: "Even a few minutes of practice each day makes a big difference. The more you use it, the more comfortable it becomes." },
    ]
  };
}

function buildGuide(query) {
  const q = query.toLowerCase().trim();
  for (const [key, template] of Object.entries(GUIDE_TEMPLATES)) {
    if (q.includes(key) || key.includes(q)) return template;
  }
  return genericGuide(query);
}

function guideHTML(guide, query) {
  const stepsHTML = guide.steps.map((s, i) => `
    <div class="guide-step">
      <div class="guide-step-num">${i + 1}</div>
      <div class="guide-step-body">
        <h4>${escapeHtml(s.title)}</h4>
        <p>${escapeHtml(s.body)}</p>
      </div>
    </div>`).join("");

  return `
    <div class="generated-guide">
      <div class="guide-header">
        <span class="guide-badge">✦ TechPals Quick Guide</span>
        <h2>Getting started with: ${escapeHtml(query)}</h2>
        <p class="guide-intro">${escapeHtml(guide.intro)}</p>
      </div>
      <div class="guide-steps">${stepsHTML}</div>
      <div class="guide-footer">
        <p>Need more help? <a href="https://techpals.org" target="_blank" rel="noopener">Visit TechPals.org</a> or ask a TechPals volunteer — we're always happy to help.</p>
      </div>
    </div>`;
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
  bluetooth: "🔵", airpod: "🎧",
  alarm: "⏰", flashlight: "🔦",
  watch: "⌚", fitness: "💪",
};

function getIcon(title, tags) {
  const text = (title + " " + (tags || []).join(" ")).toLowerCase();
  for (const [key, icon] of Object.entries(TOPIC_ICONS)) {
    if (text.includes(key)) return icon;
  }
  return "📖";
}

function generateSteps(title, desc) {
  const sentences = desc.match(/[^.!?]+[.!?]*/g) || [];
  const cleaned = sentences.map(s => s.trim()).filter(s => s.length > 20);
  if (cleaned.length >= 3) return cleaned.slice(0, 3);
  if (cleaned.length === 2) return [...cleaned, "Take your time reading through the full guide — it's written for everyday users."];
  return [
    cleaned[0] || `This guide covers "${title}" in plain, simple language.`,
    "Follow along step by step — no technical experience needed.",
    "If you get stuck, a TechPals volunteer is always happy to help."
  ];
}

function cardHTML(resource, isTechPals) {
  const { title, description, steps, url, source, tags } = resource;
  const icon = getIcon(title, tags);
  const firstSentence = (description.match(/[^.!?]+[.!?]?/) || [description])[0].trim();
  const summary = firstSentence.length > 100 ? firstSentence.slice(0, 97) + "…" : firstSentence;
  const cardSteps = steps || generateSteps(title, description);

  const badge = isTechPals
    ? `<span class="card-badge">★ TechPals</span>`
    : source ? `<span class="card-badge ext">${escapeHtml(source)}</span>` : "";

  const chevron = `<svg class="card-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;
  const arrowIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;
  const stepsHTML = cardSteps.map((s, i) => `<li><span class="step-num">${i + 1}</span><span>${escapeHtml(s)}</span></li>`).join("");

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
