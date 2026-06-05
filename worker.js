addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

const ADS_TXT = `google.com, pub-2030137443667873, DIRECT, f08c47fec0942fa0
`;

const REPO_BASE =
  "https://raw.githubusercontent.com/BarkinMadStudios/BarkinMadStudiosWebsite/main";

const IMAGE_BASE = `${REPO_BASE}/images`;
const NEWS_BASE = `${REPO_BASE}/news`;
const PAGES_BASE = `${REPO_BASE}/pages`;
const DATA_BASE = `${PAGES_BASE}/data`;

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname.toLowerCase().replace(/\/$/, "") || "/";

  if (url.hostname === "barkinmad.studio") {
    return Response.redirect(`https://www.barkinmad.studio${url.pathname}`, 301);
  }

  if (["/ads.txt", "/app-ads.txt"].includes(path)) {
    return textResponse(ADS_TXT);
  }

  if (path === "/robots.txt") return robotsTxtResponse();
  if (path === "/sitemap.xml") return sitemapResponse();

  if (path === "/.well-known/security.txt") {
    return textResponse(`Contact: mailto:barry@barkinmad.studio
Expires: 2027-05-31T00:00:00.000Z
Preferred-Languages: en
Policy: https://www.barkinmad.studio/contact`);
  }

  if (path === "/" || path === "/home") {
    return pageResponse("BarkinMad Studios", await homePage());
  }

  if (path === "/apps") {
    return pageResponse("Apps - BarkinMad Studios", await appsPage());
  }

  if (["/retro-arcade-games", "/retro-games", "/games"].includes(path)) {
    return pageResponse("Retro Arcade Games - BarkinMad Studios", await categoryAppsPage("retro"));
  }

  if (path === "/darts-apps" || path === "/gameofdarts") {
    return pageResponse("Darts Apps - BarkinMad Studios", await categoryAppsPage("darts"));
  }

  if (path === "/zx-series") {
    return pageResponse("ZX Series - BarkinMad Studios", await zxSeriesPage());
  }

  if (["/about", "/about-us"].includes(path)) return staticJsonPage("about");
  if (path === "/privacy") return staticJsonPage("privacy");
  if (path === "/cookies") return staticJsonPage("cookies");
  if (["/contact", "/support"].includes(path)) return staticJsonPage("contact");

  if (path.startsWith("/apps/")) {
    return appJsonPage(path.replace("/apps/", ""));
  }

  if (path === "/news" || path === "/devlog") {
    return pageResponse("News & Devlog - BarkinMad Studios", await newsPage());
  }

  if (path === "/news/archive") {
    return pageResponse("News Archive - BarkinMad Studios", await newsArchivePage());
  }

  if (path.startsWith("/news/")) {
    return pageResponse("News - BarkinMad Studios", await newsArticlePage(path.replace("/news/", "")));
  }

  return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
}

function textResponse(body) {
  return new Response(body, {
    headers: { "content-type": "text/plain;charset=UTF-8" }
  });
}

function pageResponse(title, content, status = 200) {
  return new Response(layout(title, content), {
    status,
    headers: { "content-type": "text/html;charset=UTF-8" }
  });
}

function layout(title, content) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="google-adsense-account" content="ca-pub-2030137443667873">

<title>${escapeHtml(title)}</title>

<link rel="icon" type="image/png" href="${IMAGE_BASE}/logos/favicon.png">
<link rel="apple-touch-icon" href="${IMAGE_BASE}/logos/favicon.png">

<meta name="description" content="BarkinMad Studios develops retro-inspired arcade games and mobile apps for iPhone and iPad.">
<meta name="keywords" content="retro games, arcade games, iOS games, ZXSnake, ZXBrick, ZXPong, ZXSpace, GameOfDarts">

<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="Retro games. Modern apps. Built with passion.">
<meta property="og:image" content="${IMAGE_BASE}/logos/social-preview.png">
<meta property="og:url" content="https://www.barkinmad.studio">
<meta property="og:type" content="website">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="Retro games. Modern apps. Built with passion.">
<meta name="twitter:image" content="${IMAGE_BASE}/logos/social-preview.png">

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2030137443667873" crossorigin="anonymous"></script>

<style>
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #0f1020;
  color: #f4f4f4;
  line-height: 1.7;
}

header {
  background: #000;
  border-bottom: 3px solid #f39c12;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.site-logo img {
  height: 60px;
  width: auto;
  display: block;
}

nav {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover { color: #f39c12; }

.hero {
  padding: 7rem 2rem 5rem;
  text-align: center;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.hero-home,
.hero-retro {
  background:
    linear-gradient(rgba(10,10,25,0.78), rgba(10,10,25,0.9)),
    url("${IMAGE_BASE}/apps/zxsnake/zxsnake-hero.png") center/cover no-repeat;
}

.hero-darts {
  background:
    linear-gradient(rgba(10,10,25,0.78), rgba(10,10,25,0.9)),
    url("${IMAGE_BASE}/apps/gameofdarts/gameofdarts.png") center/cover no-repeat;
}

.hero h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  max-width: 850px;
  margin: auto;
  color: #ddd;
  font-size: 1.15rem;
}

.hero-logo {
  height: 100px;
  width: auto;
  max-width: 90%;
  margin-bottom: 1.5rem;
}

main {
  max-width: 1100px;
  margin: auto;
  padding: 3rem 2rem;
}

section { margin-bottom: 3rem; }

h2 { color: #f39c12; }
h3 { color: #ffcc66; }

.card {
  background: #1b1f3a;
  border: 1px solid #333858;
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1000px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 700px) {
  .grid { grid-template-columns: 1fr; }
}

.game-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid #333858;
  background: #000;
}

.article-image {
  width: 100%;
  max-height: 520px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid #333858;
  background: #000;
}

.screenshot-image {
  width: 100%;
  aspect-ratio: 9 / 19.5;
  object-fit: contain;
  border-radius: 12px;
  border: 1px solid #333858;
  background: #000;
}

.badge {
  display: inline-block;
  background: #f39c12;
  color: #111;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 1rem;
  width: fit-content;
}

.btn {
  display: inline-block;
  background: #f39c12;
  color: #111;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 1rem;
  width: fit-content;
}

.btn:hover { background: #ffb347; }

footer {
  background: #000;
  border-top: 1px solid #333858;
  text-align: center;
  padding: 2rem;
  color: #ccc;
}

footer a {
  color: #f39c12;
  text-decoration: none;
  margin: 0 0.5rem;
}

.footer-logo {
  height: 56px;
  width: auto;
  display: block;
  margin: 0 auto 0.75rem;
}

@media (max-width: 750px) {
  header {
    display: block;
    text-align: center;
  }

  nav {
    justify-content: center;
    margin-top: 1rem;
  }

  .hero h2 { font-size: 2rem; }
}
</style>
</head>

<body>
<header>
  <a href="/" class="site-logo">
    <img src="${IMAGE_BASE}/logos/logo-black-horizontal.png" alt="BarkinMad Studios">
  </a>

  <nav>
    <a href="/">Home</a>
    <a href="/apps">Apps</a>
    <a href="/zx-series">ZX Series</a>
    <a href="/retro-arcade-games">Retro Games</a>
    <a href="/darts-apps">Darts Apps</a>
    <a href="/news">News</a>
    <a href="/about">About</a>
    <a href="/privacy">Privacy</a>
    <a href="/contact">Contact</a>
  </nav>
</header>

${content}

<footer>
  <img class="footer-logo" src="${IMAGE_BASE}/logos/logo-black-icon.png" alt="BarkinMad Studios" loading="lazy">

  <p>&copy; ${new Date().getFullYear()} BarkinMad Studios. All rights reserved.</p>

  <p>
    <a href="/apps">Apps</a>
    <a href="/zx-series">ZX Series</a>
    <a href="/about">About</a>
    <a href="/privacy">Privacy</a>
    <a href="/cookies">Cookies</a>
    <a href="/contact">Contact</a>
    <a href="https://www.facebook.com/profile.php?id=61579287944996" target="_blank" rel="noopener">Facebook</a>
  </p>
</footer>
</body>
</html>`;
}

async function fetchJson(url) {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "BarkinMadStudiosWebsite" }
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function getApps() {
  const apps = await fetchJson(`${DATA_BASE}/apps.json`);
  return Array.isArray(apps) ? apps : [];
}

function getAppImage(app) {
  return app.cardImage || app.image || app.icon || "";
}

async function homePage() {
  const homepage = await fetchJson(`${PAGES_BASE}/home.json`) || {};
  const apps = await getApps();
  const posts = await fetchJson(`${NEWS_BASE}/posts.json`) || [];

  const featuredSlugs = Array.isArray(homepage.featuredApps)
    ? homepage.featuredApps
    : apps.filter(app => app.status === "Live").slice(0, 3).map(app => app.slug);

  const featuredApps = apps.filter(app => featuredSlugs.includes(app.slug));

  const latestPosts = getPublishedValidPosts(posts).slice(0, homepage.newsCount || 3);

  return `
<section class="hero hero-home">
  <img class="hero-logo" src="${IMAGE_BASE}/logos/logo-black-stacked.png" alt="BarkinMad Studios" loading="eager">

  <h2>${escapeHtml(homepage.heading || "Retro Games & Mobile Apps")}</h2>

  <p>${escapeHtml(homepage.intro || "Retro-inspired arcade games and modern mobile apps for iPhone and iPad.")}</p>

  <p>
    <a class="btn" href="/apps">View Apps</a>
    <a class="btn" href="/news">Latest News</a>
  </p>
</section>

<main>
${featuredApps.length ? `
<section>
  <h2>Featured Apps</h2>
  <div class="grid">${featuredApps.map(appFullCard).join("")}</div>
</section>` : ""}

<section>
  <h2>ZX Series</h2>
  <div class="card">
    <p>Connected retro arcade games with shared achievements, leaderboards, BarkinMad Coins, and cross-game progression.</p>
    <a class="btn" href="/zx-series">View ZX Series</a>
  </div>
</section>

<section>
  <h2>Retro Arcade Collection</h2>
  <div class="card">
    <p>Classic pick-up-and-play arcade games inspired by early home computers and arcade machines.</p>
    <a class="btn" href="/retro-arcade-games">View Retro Games</a>
  </div>
</section>

<section>
  <h2>Darts Apps</h2>
  <div class="card">
    <p>Mobile darts scoring and statistics apps for match play, party games, and practice sessions.</p>
    <a class="btn" href="/darts-apps">View Darts Apps</a>
  </div>
</section>

${homepage.showLatestNews !== false && latestPosts.length ? `
<section>
  <h2>Latest News</h2>
  <div class="grid">
    ${latestPosts.map(postCard).join("")}
  </div>
</section>` : ""}
</main>`;
}

async function appsPage() {
  const apps = await getApps();

  return `
<section class="hero hero-retro">
  <h2>Apps</h2>
  <p>Games and apps from BarkinMad Studios.</p>
</section>

<main>
<section>
  <h2>All Apps</h2>
  <div class="grid">
    ${apps.map(appFullCard).join("")}
  </div>
</section>
</main>`;
}

async function categoryAppsPage(category) {
  const apps = (await getApps()).filter(app => app.category === category);

  const isDarts = category === "darts";

  return `
<section class="hero ${isDarts ? "hero-darts" : "hero-retro"}">
  <h2>${isDarts ? "Darts Apps" : "Retro Arcade Games"}</h2>
  <p>
    ${isDarts
      ? "Mobile darts scoring and statistics apps for match play, party games, and practice sessions."
      : "Retro-inspired arcade games focused on simple, addictive, pick-up-and-play gameplay."}
  </p>
</section>

<main>
<section>
  <h2>${isDarts ? "Darts Apps" : "Games"}</h2>
  <div class="grid">
    ${apps.map(appFullCard).join("")}
  </div>
</section>
</main>`;
}

async function zxSeriesPage() {
  const page = await fetchJson(`${PAGES_BASE}/zx-series.json`) || {};
  const apps = (await getApps()).filter(app => app.series === "zx-series");

  const achievements = await fetchJson(`${DATA_BASE}/achievements.json`) || {};
  const leaderboards = await fetchJson(`${DATA_BASE}/leaderboards.json`) || {};
  const coins = await fetchJson(`${DATA_BASE}/coins.json`) || {};
  const pvp = await fetchJson(`${DATA_BASE}/pvp.json`) || {};
  const roadmap = await fetchJson(`${DATA_BASE}/roadmap.json`) || {};

  return `
<section class="hero hero-retro">
  <h2>${escapeHtml(page.title || "ZX Series")}</h2>
  <p>${escapeHtml(page.description || "Connected retro arcade gaming from BarkinMad Studios.")}</p>
</section>

<main>
<section>
  <h2>ZX Games</h2>
  <div class="grid">
    ${apps.map(appFullCard).join("")}
  </div>
</section>

${renderDataListSection("Shared Achievements", achievements.zxSeries)}
${renderDataListSection("Shared Leaderboards", leaderboards.zxSeries)}

${coins.name ? `
<section>
  <h2>${escapeHtml(coins.name)}</h2>
  <div class="card">
    <p>${escapeHtml(coins.description)}</p>

    ${Array.isArray(coins.earnMethods) ? `
      <h3>How to earn coins</h3>
      <ul>${coins.earnMethods.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    ` : ""}

    ${Array.isArray(coins.plannedUses) ? `
      <h3>Planned uses</h3>
      <ul>${coins.plannedUses.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    ` : ""}
  </div>
</section>` : ""}

${pvp.worldPVP || pvp.localPVP ? `
<section>
  <h2>PVP Modes</h2>
  <div class="card">
    ${pvp.localPVP ? `<p><strong>Local PVP:</strong> ${escapeHtml(pvp.localPVP.description)}</p>` : ""}
    ${pvp.worldPVP ? `<p><strong>World PVP:</strong> ${escapeHtml(pvp.worldPVP.description)}</p>` : ""}
  </div>
</section>` : ""}

${renderRoadmap(roadmap)}
</main>`;
}

function renderDataListSection(title, items) {
  if (!Array.isArray(items) || !items.length) return "";

  return `
<section>
  <h2>${escapeHtml(title)}</h2>
  <div class="card">
    <ul>
      ${items.map(item => `
        <li>
          <strong>${escapeHtml(item.title || item.name || item.id)}</strong>
          ${item.description ? ` — ${escapeHtml(item.description)}` : ""}
        </li>
      `).join("")}
    </ul>
  </div>
</section>`;
}

function renderRoadmap(roadmap) {
  if (!roadmap || typeof roadmap !== "object") return "";

  return `
<section>
  <h2>Roadmap</h2>
  <div class="card">
    ${Array.isArray(roadmap.live) ? `<h3>Live</h3><ul>${roadmap.live.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : ""}
    ${Array.isArray(roadmap.development) ? `<h3>In Development</h3><ul>${roadmap.development.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : ""}
    ${Array.isArray(roadmap.planned) ? `<h3>Planned</h3><ul>${roadmap.planned.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : ""}
  </div>
</section>`;
}

function appFullCard(app) {
  const image = getAppImage(app);

  return `
<div class="card">
  ${image ? `
    <img class="game-image" src="${IMAGE_BASE}/${escapeHtml(image)}" alt="${escapeHtml(app.name || app.title)}" loading="lazy">
  ` : ""}

  ${app.type ? `<span class="badge">${escapeHtml(app.type)}</span>` : ""}

  <h3>${escapeHtml(app.name || app.title)}</h3>

  <p>${escapeHtml(app.description || app.shortDescription || "")}</p>

  ${app.status ? `<p><strong>Status:</strong> ${escapeHtml(app.status)}</p>` : ""}

  <div style="display:flex;gap:1rem;flex-wrap:wrap;">
    ${app.slug ? `<a class="btn" href="/apps/${escapeHtml(app.slug)}">View App Page</a>` : ""}

    ${app.appStoreUrl ? `
      <a class="btn" href="${escapeHtml(app.appStoreUrl)}" target="_blank" rel="noopener">View on App Store</a>
    ` : ""}

    ${app.testFlightUrl ? `
      <a class="btn" href="${escapeHtml(app.testFlightUrl)}" target="_blank" rel="noopener">Join TestFlight</a>
    ` : ""}
  </div>
</div>`;
}

async function appJsonPage(slug) {
  const apps = await getApps();
  const listed = apps.some(app => app.slug === slug);

  if (!listed) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
  }

  const app = await fetchJson(`${PAGES_BASE}/apps/${slug}.json`);

  if (!app) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
  }

  return pageResponse(`${escapeHtml(app.title || app.name)} - BarkinMad Studios`, renderAppPage(app));
}

function renderAppPage(app) {
  return `
<section class="hero hero-retro">
  <h2>${escapeHtml(app.title || app.name)}</h2>
  <p>${escapeHtml(app.tagline || "")}</p>
</section>

<main>
<section>
  <div class="card">
    ${app.heroImage ? `
      <img class="article-image" src="${IMAGE_BASE}/${escapeHtml(app.heroImage)}" alt="${escapeHtml(app.title || app.name)}" loading="lazy">
    ` : ""}

    ${app.status ? `<span class="badge">${escapeHtml(app.status)}</span>` : ""}
    ${app.shortDescription ? `<h2>${escapeHtml(app.shortDescription)}</h2>` : ""}
    ${app.description ? `<p>${escapeHtml(app.description)}</p>` : ""}

    <div style="display:flex;gap:1rem;flex-wrap:wrap;">
      ${app.appStoreUrl ? `<a class="btn" href="${escapeHtml(app.appStoreUrl)}" target="_blank" rel="noopener">View on App Store</a>` : ""}
      ${app.testFlightUrl ? `<a class="btn" href="${escapeHtml(app.testFlightUrl)}" target="_blank" rel="noopener">Join TestFlight</a>` : ""}
    </div>
  </div>
</section>

${renderStringListSection("Features", app.features)}
${renderStringListSection("Achievements", app.achievements)}
${renderStringListSection("Leaderboards", app.leaderboards)}

${app.barkinMadCoins?.enabled ? `
<section>
  <h2>BarkinMad Coins</h2>
  <div class="card">
    <p>${escapeHtml(app.barkinMadCoins.description)}</p>
  </div>
</section>` : ""}

${renderStringListSection("Supported Platforms", app.supportedPlatforms)}

${Array.isArray(app.screenshots) && app.screenshots.length ? `
<section>
  <h2>Screenshots</h2>
  <div class="grid">
    ${app.screenshots.map(screenshot => {
      const image = typeof screenshot === "string" ? screenshot : screenshot.image;
      const caption = typeof screenshot === "string" ? "" : screenshot.caption || "";

      if (!image) return "";

      return `
      <div class="card">
        <img class="screenshot-image" src="${IMAGE_BASE}/${escapeHtml(image)}" alt="${escapeHtml(caption || (app.title || app.name) + " screenshot")}" loading="lazy">
        ${caption ? `<p>${escapeHtml(caption)}</p>` : ""}
      </div>`;
    }).join("")}
  </div>
</section>` : ""}
</main>`;
}

function renderStringListSection(title, items) {
  if (!Array.isArray(items) || !items.length) return "";

  return `
<section>
  <h2>${escapeHtml(title)}</h2>
  <div class="card">
    <ul>
      ${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  </div>
</section>`;
}

async function staticJsonPage(slug) {
  const page = await fetchJson(`${PAGES_BASE}/${slug}.json`);

  if (!page) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
  }

  if (!Array.isArray(page.sections)) {
    return pageResponse("Page Error - BarkinMad Studios", brokenPage());
  }

  return pageResponse(`${escapeHtml(page.title)} - BarkinMad Studios`, renderStaticPage(page));
}

function renderStaticPage(page) {
  return `
<section class="hero hero-retro">
  <h2>${escapeHtml(page.heading || page.title)}</h2>
  ${page.intro ? `<p>${escapeHtml(page.intro)}</p>` : ""}
</section>

<main>
  ${page.sections.map(section => `
    <section>
      <h2>${escapeHtml(section.heading || section.title)}</h2>
      <div class="card">
        ${(section.paragraphs || []).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("")}

        ${Array.isArray(section.list) ? `
          <ul>
            ${section.list.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        ` : ""}
      </div>
    </section>
  `).join("")}
</main>`;
}

async function newsPage() {
  const posts = await fetchJson(`${NEWS_BASE}/posts.json`);
  const allPublishedPosts = getPublishedValidPosts(posts);
  const visiblePosts = allPublishedPosts.slice(0, 15);
  const hasArchive = allPublishedPosts.length > 15;

  if (!visiblePosts.length) {
    return `
<main>
<section>
  <h2>News & Devlog</h2>
  <div class="card"><p>No news posts are available at the moment.</p></div>
</section>
</main>`;
  }

  return `
<section class="hero hero-retro">
  <h2>News & Devlog</h2>
  <p>Development updates, screenshots, release news, and behind-the-scenes progress from BarkinMad Studios.</p>
</section>

<main>
<section>
  <div class="grid">
    ${visiblePosts.map(postCard).join("")}
  </div>

  ${hasArchive ? `
    <p style="margin-top:2rem;text-align:center;">
      <a class="btn" href="/news/archive">View News Archive</a>
    </p>
  ` : ""}
</section>
</main>`;
}

function postCard(post) {
  return `
<div class="card">
  <img class="game-image" src="${NEWS_BASE}/${escapeHtml(post.slug)}/${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" loading="lazy">
  <span class="badge">${formatDate(post.date)}</span>
  <h3>${escapeHtml(post.title)}</h3>
  <p>${escapeHtml(post.excerpt)}</p>
  <a class="btn" href="/news/${escapeHtml(post.slug)}">Read Article</a>
</div>`;
}

async function newsArticlePage(slug) {
  const article = await fetchJson(`${NEWS_BASE}/${slug}/article.json`);

  if (!article) return notFoundPage();

  return `
<section class="hero hero-retro">
  <h2>${escapeHtml(article.title)}</h2>
  <p>${formatDate(article.date)}</p>
</section>

<main>
<section>
  <div class="card">
    ${article.image ? `
      <img class="article-image" src="${NEWS_BASE}/${escapeHtml(slug)}/${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}" loading="lazy">
    ` : ""}

    ${(article.content || []).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("")}

    <a class="btn" href="/news">Back To News</a>
  </div>
</section>
</main>`;
}

async function newsArchivePage() {
  const posts = await fetchJson(`${NEWS_BASE}/posts.json`);
  const archivedPosts = getPublishedValidPosts(posts).slice(15);

  return `
<section class="hero hero-retro">
  <h2>News Archive</h2>
  <p>Older BarkinMad Studios news and development updates.</p>
</section>

<main>
<section>
  <div class="card">
    ${archivedPosts.length ? archivedPosts.map(post => `
      <p>
        <strong>${formatDate(post.date)}</strong> —
        <a href="/news/${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a><br>
        ${escapeHtml(post.excerpt)}
      </p>
    `).join("") : `<p>There are no archived articles yet.</p>`}

    <a class="btn" href="/news">Back To Latest News</a>
  </div>
</section>
</main>`;
}

function getPublishedValidPosts(posts) {
  if (!Array.isArray(posts)) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return posts
    .filter(post => {
      if (!post || !post.slug || !post.title || !post.date || !post.excerpt || !post.image) return false;

      const postDate = new Date(post.date);
      if (Number.isNaN(postDate.getTime())) return false;

      postDate.setHours(0, 0, 0, 0);
      return postDate <= today;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function robotsTxtResponse() {
  return textResponse(`
User-agent: *
Allow: /

Sitemap: https://www.barkinmad.studio/sitemap.xml
`.trim());
}

async function sitemapResponse() {
  const urls = [
    "/",
    "/apps",
    "/zx-series",
    "/retro-arcade-games",
    "/darts-apps",
    "/news",
    "/about",
    "/privacy",
    "/cookies",
    "/contact"
  ];

  const apps = await getApps();

  for (const app of apps) {
    if (app.slug) urls.push(`/apps/${app.slug}`);
  }

  const posts = await fetchJson(`${NEWS_BASE}/posts.json`);
  for (const post of getPublishedValidPosts(posts)) {
    urls.push(`/news/${post.slug}`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(path => `
  <url>
    <loc>https://www.barkinmad.studio${path}</loc>
    <changefreq>${path === "/" || path === "/news" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : path.startsWith("/news/") ? "0.7" : "0.8"}</priority>
  </url>`).join("")}
</urlset>`;

  return new Response(xml, {
    headers: { "content-type": "application/xml;charset=UTF-8" }
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return escapeHtml(dateString);
  }

  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function notFoundPage() {
  return `
<main>
<section>
  <h2>Page Not Found</h2>
  <div class="card">
    <p>The page you requested could not be found.</p>
    <a class="btn" href="/">Back Home</a>
  </div>
</section>
</main>`;
}

function brokenPage() {
  return `
<main>
<section>
  <h2>Page Error</h2>
  <div class="card">
    <p>This page could not be displayed because its content file is not in the correct format.</p>
    <a class="btn" href="/">Back Home</a>
  </div>
</section>
</main>`;
}
