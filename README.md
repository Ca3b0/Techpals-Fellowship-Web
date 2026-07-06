# TechPals Learning Hub

A personalized learning resource finder for older adults — built for TechPals.

## Files

```
index.html      — the page
style.css       — all styling
resources.js    — your curated TechPals resources (edit this!)
app.js          — search logic and API calls
```

---

## Deploying to GitHub Pages (free, always online)

### Step 1 — Put the code on GitHub
1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **New repository** → name it `techpals-learning-hub` → click **Create repository**
3. Upload all 4 files (`index.html`, `style.css`, `resources.js`, `app.js`) using the **Add file → Upload files** button

### Step 2 — Turn on GitHub Pages
1. In your repository, click **Settings** (top menu)
2. Click **Pages** in the left sidebar
3. Under "Branch", select **main** → click **Save**
4. Wait ~1 minute, then your site is live at:
   `https://YOUR-GITHUB-USERNAME.github.io/techpals-learning-hub/`

Every time you push a change to the repo, the site automatically updates within a minute or two.

---

## Adding your Brave Search API key

The site works without an API key (it shows fallback links to Google, AARP, and GCFGlobal). To enable real search results:

1. Sign up for a free Brave Search API key at [brave.com/search/api](https://brave.com/search/api) — free tier gives 2,000 searches/month
2. Open `app.js` and replace `"YOUR_BRAVE_API_KEY_HERE"` with your key:
   ```js
   const BRAVE_API_KEY = "BSAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
   ```

> **Note:** For production, the API key should live in a serverless function (not in the JS file) so it isn't visible to the public. For a small pilot, the client-side approach is fine to start.

---

## Adding more TechPals resources

Open `resources.js` and add a new object to the `TECHPALS_RESOURCES` array:

```js
{
  title: "Your Resource Title",
  description: "One or two sentences describing what this helps with.",
  url: "https://techpals.org/your-resource-page",
  tags: ["keyword1", "keyword2", "relevant phrase"]
}
```

Tags are how the search matches — add any words someone might type to find this resource.

---

## Local testing (optional)

If you want to preview locally before pushing to GitHub:

```bash
# Install a simple local server (one time)
npm install -g serve

# Run it from the project folder
serve .

# Open http://localhost:3000 in your browser
```
