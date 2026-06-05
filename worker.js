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

const DEFAULT_SITE = {
  name: "BarkinMad Studios",
  description: "Independent UK game and app developer creating retro-inspired experiences for modern devices.",
  keywords: "retro games, arcade games, iOS games, ZXSnake, ZXBrick, ZXPong, ZXSpace, GameOfDarts",
  ogDescription: "Retro games. Modern apps. Built with passion.",
  email: "barry@barkinmad.studio",
  website: "https://www.barkinmad.studio",
  copyright: "BarkinMad Studios",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Apps", href: "/apps" },
    { label: "News", href: "/news" },
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Contact", href: "/contact" }
  ],
  footerNavigation: [
    { label: "Apps", href: "/apps" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
    { label: "Contact", href: "/contact" }
  ],
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61579287944996"
  }
};

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
    const site = await getSite();
    return textResponse(`Contact: mailto:${site.email || "barry@barkinmad.studio"}
Expires: 2027-05-31T00:00:00.000Z
Preferred-Languages: en
Policy: ${site.website || "https://www.barkinmad.studio"}/contact`);
  }

  if (path === "/home") {
    return Response.redirect(`${url.origin}/`, 301);
  }

  if (path === "/devlog") {
    return Response.redirect(`${url.origin}/news`, 301);
  }

  if (path === "/about-us") {
    return Response.redirect(`${url.origin}/about`, 301);
  }

  if (path === "/support") {
    return Response.redirect(`${url.origin}/contact`, 301);
  }

  if (path === "/") {
    const homepage = await fetchJson(`${PAGES_BASE}/home.json`) || {};
    const site = await getSite();
    return pageResponse("BarkinMad Studios", await homePage(homepage), {
      canonicalPath: "/",
      description: homepage.intro,
      image: `${IMAGE_BASE}/logos/social-preview.png`,
      structuredData: [organizationSchema(site), websiteSchema(site)]
    });
  }

  if (path === "/apps") {
    const page = await fetchJson(`${PAGES_BASE}/apps.json`) || {};
    return pageResponse("Apps - BarkinMad Studios", await appsPage(page), {
      canonicalPath: "/apps",
      description: page.intro,
      image: `${IMAGE_BASE}/retro-banner.png`
    });
  }

  if (path === "/zx-series") {
    const page = await fetchJson(`${PAGES_BASE}/zx-series.json`) || {};
    return pageResponse("ZX Series - BarkinMad Studios", await zxSeriesPage(page), {
      canonicalPath: "/zx-series",
      description: page.description,
      image: `${IMAGE_BASE}/retro-banner.png`
    });
  }

  if (["/retro-arcade-games", "/retro-games", "/games", "/darts-apps", "/gameofdarts"].includes(path)) {
    return Response.redirect(`${url.origin}/apps`, 301);
  }

  if (path === "/about") return staticJsonPage("about");
  if (path === "/privacy") return staticJsonPage("privacy");
  if (path === "/cookies") return staticJsonPage("cookies");
  if (path === "/contact") return staticJsonPage("contact");

  if (path.startsWith("/apps/")) {
    return appJsonPage(path.replace("/apps/", ""));
  }

  if (path === "/news") {
    return pageResponse("News & Devlog - BarkinMad Studios", await newsPage(), {
      canonicalPath: "/news",
      description: "Development updates, screenshots, release news, and behind-the-scenes progress from BarkinMad Studios.",
      image: `${IMAGE_BASE}/retro-banner.png`
    });
  }

  if (path === "/news/archive") {
    return pageResponse("News Archive - BarkinMad Studios", await newsArchivePage(), {
      canonicalPath: "/news/archive",
      description: "Older BarkinMad Studios news and development updates.",
      image: `${IMAGE_BASE}/retro-banner.png`
    });
  }

  if (path.startsWith("/news/")) {
    return newsArticleResponse(path.replace("/news/", ""));
  }

  return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
}

function textResponse(body) {
  return new Response(body, {
    headers: { "content-type": "text/plain;charset=UTF-8" }
  });
}

async function pageResponse(title, content, options = {}, status = 200) {
  if (typeof options === "number") {
    status = options;
    options = {};
  }

  const site = await getSite();

  return new Response(layout(title, content, site, options, status), {
    status,
    headers: { "content-type": "text/html;charset=UTF-8" }
  });
}

function layout(title, content, site = {}, options = {}, status = 200) {
  const siteName = site.name || DEFAULT_SITE.name;
  const siteDescription = cleanMeta(options.description || site.description || DEFAULT_SITE.description);
  const ogDescription = cleanMeta(options.ogDescription || options.description || site.ogDescription || siteDescription);
  const website = site.website || DEFAULT_SITE.website;
  const canonicalUrl = absoluteSiteUrl(website, options.canonicalPath || "/");
  const socialImage = options.image || `${IMAGE_BASE}/logos/social-preview.png`;
  const robots = options.robots || (status >= 400 ? "noindex,follow" : "index,follow");
  const structuredData = Array.isArray(options.structuredData)
    ? options.structuredData
    : options.structuredData
      ? [options.structuredData]
      : [organizationSchema(site)];
  const navigation = Array.isArray(site.navigation) && site.navigation.length
    ? site.navigation
    : DEFAULT_SITE.navigation;
  const footerNavigation = Array.isArray(site.footerNavigation) && site.footerNavigation.length
    ? site.footerNavigation
    : DEFAULT_SITE.footerNavigation;

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
<link rel="canonical" href="${escapeHtml(canonicalUrl)}">

<meta name="description" content="${escapeHtml(siteDescription)}">
${site.keywords ? `<meta name="keywords" content="${escapeHtml(site.keywords)}">` : ""}
<meta name="robots" content="${escapeHtml(robots)}">

<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(ogDescription)}">
<meta property="og:image" content="${escapeHtml(socialImage)}">
<meta property="og:url" content="${escapeHtml(canonicalUrl)}">
<meta property="og:type" content="${escapeHtml(options.ogType || "website")}">
<meta property="og:site_name" content="${escapeHtml(siteName)}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(ogDescription)}">
<meta name="twitter:image" content="${escapeHtml(socialImage)}">

${structuredData.map(schema => `
<script type="application/ld+json">${escapeJsonForHtml(schema)}</script>`).join("")}

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
    url("${IMAGE_BASE}/retro-banner.png") center/cover no-repeat;
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

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1.5rem auto 0;
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
    <img src="${IMAGE_BASE}/logos/logo-black-horizontal.png" alt="${escapeHtml(siteName)}">
  </a>

  <nav>
    ${renderLinks(navigation)}
  </nav>
</header>

${content}

<footer>
  <img class="footer-logo" src="${IMAGE_BASE}/logos/logo-black-icon.png" alt="${escapeHtml(siteName)}" loading="lazy">

  <p>&copy; ${new Date().getFullYear()} ${escapeHtml(site.copyright || siteName)}. All rights reserved.</p>

  <p>
    ${renderLinks(footerNavigation)}
    ${site.socials?.facebook ? `<a href="${escapeHtml(site.socials.facebook)}" target="_blank" rel="noopener">Facebook</a>` : ""}
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

async function getSite() {
  const site = await fetchJson(`${DATA_BASE}/site.json`);
  if (!site || typeof site !== "object") return DEFAULT_SITE;

  return {
    ...DEFAULT_SITE,
    ...site,
    socials: {
      ...DEFAULT_SITE.socials,
      ...(site.socials || {})
    }
  };
}

async function getApps() {
  const apps = await fetchJson(`${DATA_BASE}/apps.json`);
  return Array.isArray(apps) ? apps : [];
}

function renderLinks(links) {
  if (!Array.isArray(links)) return "";

  return links
    .filter(link => link && link.label && link.href)
    .map(link => {
      const isExternal = /^https?:\/\//i.test(link.href);
      const target = isExternal ? ` target="_blank" rel="noopener"` : "";
      return `<a href="${escapeHtml(link.href)}"${target}>${escapeHtml(link.label)}</a>`;
    })
    .join("");
}

function absoluteSiteUrl(base, path = "/") {
  try {
    return new URL(path, base.endsWith("/") ? base : `${base}/`).toString();
  } catch {
    return `https://www.barkinmad.studio${path.startsWith("/") ? path : `/${path}`}`;
  }
}

function cleanMeta(value, fallback = "") {
  const text = String(value || fallback || "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 180 ? `${text.slice(0, 177).trim()}...` : text;
}

function escapeJsonForHtml(value) {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026");
}

function organizationSchema(site = {}) {
  const website = site.website || DEFAULT_SITE.website;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name || DEFAULT_SITE.name,
    url: website,
    logo: `${IMAGE_BASE}/logos/logo-black-icon.png`,
    sameAs: Object.values(site.socials || {}).filter(Boolean)
  };
}

function websiteSchema(site = {}) {
  const website = site.website || DEFAULT_SITE.website;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name || DEFAULT_SITE.name,
    url: website,
    description: site.description || DEFAULT_SITE.description
  };
}

function appSchema(app, slug, site = DEFAULT_SITE) {
  const name = app.title || app.name || slug;
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: app.genre === "Sports" ? "SportsApplication" : "GameApplication",
    operatingSystem: Array.isArray(app.supportedPlatforms) ? app.supportedPlatforms.join(", ") : "iOS",
    description: cleanMeta(app.description || app.shortDescription),
    url: absoluteSiteUrl(site.website || DEFAULT_SITE.website, `/apps/${slug}`),
    image: app.heroImage ? `${IMAGE_BASE}/${app.heroImage}` : `${IMAGE_BASE}/logos/social-preview.png`,
    author: {
      "@type": "Organization",
      name: app.developer || site.name || DEFAULT_SITE.name
    }
  };

  if (app.appStoreUrl) schema.installUrl = app.appStoreUrl;
  return schema;
}

function articleSchema(article, slug, site = DEFAULT_SITE) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: cleanMeta(article.excerpt || firstParagraph(article.content)),
    datePublished: article.date,
    image: article.image ? `${NEWS_BASE}/${slug}/${article.image}` : `${IMAGE_BASE}/logos/social-preview.png`,
    mainEntityOfPage: absoluteSiteUrl(site.website || DEFAULT_SITE.website, `/news/${slug}`),
    publisher: {
      "@type": "Organization",
      name: site.name || DEFAULT_SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${IMAGE_BASE}/logos/logo-black-icon.png`
      }
    }
  };
}

function firstParagraph(content) {
  return Array.isArray(content) ? content.find(Boolean) || "" : "";
}

function getAppImage(app) {
  return app.cardImage || app.image || app.icon || "";
}

function actionLink(action) {
  if (!action || !action.label || !action.href) return "";
  return `<a class="btn" href="${escapeHtml(action.href)}">${escapeHtml(action.label)}</a>`;
}

function renderPromoSection(section) {
  if (!section || !section.title) return "";

  return `
<section>
  <h2>${escapeHtml(section.title)}</h2>
  <div class="card">
    ${section.description ? `<p>${escapeHtml(section.description)}</p>` : ""}
    ${actionLink(section.action)}
  </div>
</section>`;
}

function filterApps(apps, filter) {
  if (!filter || !filter.field) return apps;
  return apps.filter(app => app[filter.field] === filter.value);
}

function renderAppCollection(section, apps) {
  if (!section || !section.title) return "";

  const matchingApps = filterApps(apps, section.filter);
  const previewApps = matchingApps.slice(0, section.limit || 3);

  return `
<div class="card">
  <h3>${escapeHtml(section.title)}</h3>
  ${section.description ? `<p>${escapeHtml(section.description)}</p>` : ""}
  ${previewApps.length ? `<p><strong>${previewApps.length} shown:</strong> ${escapeHtml(previewApps.map(app => app.name || app.title).join(", "))}</p>` : ""}
  ${section.href ? `<a class="btn" href="${escapeHtml(section.href)}">View ${escapeHtml(section.title)}</a>` : ""}
</div>`;
}

async function homePage() {
  const homepage = await fetchJson(`${PAGES_BASE}/home.json`) || {};
  const apps = await getApps();
  const posts = await fetchJson(`${NEWS_BASE}/posts.json`) || [];
  const sections = Array.isArray(homepage.sections) ? homepage.sections : [];
  const actions = Array.isArray(homepage.actions) ? homepage.actions : [];

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

  <div class="hero-actions">
    ${actions.map(action => actionLink(action)).join("")}
  </div>
</section>

<main>
${featuredApps.length ? `
<section>
  <h2>${escapeHtml(homepage.featuredAppsTitle || "Featured Apps")}</h2>
  <div class="grid">${featuredApps.map(appFullCard).join("")}</div>
</section>` : ""}

${sections.map(renderPromoSection).join("")}

${homepage.showLatestNews !== false && latestPosts.length ? `
<section>
  <h2>${escapeHtml(homepage.latestNewsTitle || "Latest News")}</h2>
  <div class="grid">
    ${latestPosts.map(postCard).join("")}
  </div>
</section>` : ""}
</main>`;
}

async function appsPage() {
  const apps = await getApps();
  const page = await fetchJson(`${PAGES_BASE}/apps.json`) || {};
  const sections = Array.isArray(page.sections) ? page.sections : [];

  return `
<section class="hero hero-retro">
  <h2>${escapeHtml(page.heading || page.title || "Apps")}</h2>
  <p>${escapeHtml(page.intro || "Games and apps from BarkinMad Studios.")}</p>
</section>

<main>
${sections.length ? `
<section>
  <h2>${escapeHtml(page.sectionsTitle || "Browse By Collection")}</h2>
  <div class="grid">
    ${sections.map(section => renderAppCollection(section, apps)).join("")}
  </div>
</section>` : ""}

<section id="all-apps">
  <h2>${escapeHtml(page.allAppsTitle || "All Apps")}</h2>
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
  <p>${escapeHtml(page.description || "Connected retro arcade games from BarkinMad Studios.")}</p>
</section>

<main>
${Array.isArray(page.intro) && page.intro.length ? `
<section>
  <h2>${escapeHtml(page.tagline || "Connected Progression")}</h2>
  <div class="card">
    ${page.intro.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("")}
  </div>
</section>` : ""}

${renderStringListSection("Features", page.features)}

${renderSharedSystems(page.sharedSystems || {}, { achievements, leaderboards, coins, pvp, roadmap })}

<section>
  <h2>${escapeHtml(page.appsTitle || "ZX Series Games")}</h2>
  <div class="grid">
    ${apps.map(appFullCard).join("")}
  </div>
</section>
</main>`;
}

function renderSharedSystems(content, data) {
  const achievements = data.achievements?.zxSeries;
  const leaderboards = data.leaderboards?.zxSeries;
  const coins = data.coins || {};
  const pvp = data.pvp || {};
  const roadmap = data.roadmap || {};

  if (!content.title && !achievements && !leaderboards && !coins.name && !pvp.worldPVP && !pvp.localPVP) {
    return "";
  }

  return `
<section>
  <h2>${escapeHtml(content.title || "Shared Game Systems")}</h2>
  <div class="card">
    ${content.intro ? `<p>${escapeHtml(content.intro)}</p>` : ""}

    ${Array.isArray(achievements) && achievements.length ? `
      <h3>${escapeHtml(content.achievementsTitle || "Shared Achievements")}</h3>
      <ul>${achievements.map(item => `<li><strong>${escapeHtml(item.title || item.name || item.id)}</strong>${item.description ? ` - ${escapeHtml(item.description)}` : ""}</li>`).join("")}</ul>
    ` : ""}

    ${Array.isArray(leaderboards) && leaderboards.length ? `
      <h3>${escapeHtml(content.leaderboardsTitle || "Shared Leaderboards")}</h3>
      <ul>${leaderboards.map(item => `<li><strong>${escapeHtml(item.title || item.name || item.id)}</strong>${item.description ? ` - ${escapeHtml(item.description)}` : ""}</li>`).join("")}</ul>
    ` : ""}

    ${coins.name ? `
      <h3>${escapeHtml(content.coinsTitle || coins.name)}</h3>
      ${coins.description ? `<p>${escapeHtml(coins.description)}</p>` : ""}
    ` : ""}

    ${pvp.worldPVP || pvp.localPVP ? `
      <h3>${escapeHtml(content.pvpTitle || "PVP Modes")}</h3>
      ${pvp.localPVP ? `<p><strong>Local PVP:</strong> ${escapeHtml(pvp.localPVP.description)}</p>` : ""}
      ${pvp.worldPVP ? `<p><strong>World PVP:</strong> ${escapeHtml(pvp.worldPVP.description)}</p>` : ""}
    ` : ""}

    ${renderRoadmapContent(content.roadmapTitle || "Roadmap", roadmap)}
  </div>
</section>`;
}

function renderRoadmapContent(title, roadmap) {
  if (!roadmap || typeof roadmap !== "object") return "";

  const live = Array.isArray(roadmap.live) ? roadmap.live : [];
  const development = Array.isArray(roadmap.development) ? roadmap.development : [];
  const planned = Array.isArray(roadmap.planned) ? roadmap.planned : [];

  if (!live.length && !development.length && !planned.length) return "";

  return `
<h3>${escapeHtml(title)}</h3>
${live.length ? `<p><strong>Live:</strong></p><ul>${live.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
${development.length ? `<p><strong>In Development:</strong></p><ul>${development.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
${planned.length ? `<p><strong>Planned:</strong></p><ul>${planned.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}`;
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

  return pageResponse(`${app.title || app.name} - BarkinMad Studios`, renderAppPage(app), {
    canonicalPath: `/apps/${slug}`,
    description: app.description || app.shortDescription,
    image: app.heroImage ? `${IMAGE_BASE}/${app.heroImage}` : `${IMAGE_BASE}/logos/social-preview.png`,
    ogType: "website",
    structuredData: appSchema(app, slug)
  });
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

  return pageResponse(`${page.title} - BarkinMad Studios`, renderStaticPage(page), {
    canonicalPath: `/${slug}`,
    description: page.intro || firstParagraph(page.sections?.[0]?.paragraphs)
  });
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

        ${Array.isArray(section.links) ? `
          <p>${section.links.map(actionLink).join("")}</p>
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

async function newsArticleResponse(slug) {
  const article = await fetchJson(`${NEWS_BASE}/${slug}/article.json`);

  if (!article) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), {
      canonicalPath: `/news/${slug}`,
      robots: "noindex,follow"
    }, 404);
  }

  return pageResponse(`${article.title} - BarkinMad Studios`, newsArticlePage(slug, article), {
    canonicalPath: `/news/${slug}`,
    description: article.excerpt || firstParagraph(article.content),
    image: article.image ? `${NEWS_BASE}/${slug}/${article.image}` : `${IMAGE_BASE}/logos/social-preview.png`,
    ogType: "article",
    structuredData: articleSchema(article, slug)
  });
}

function newsArticlePage(slug, article) {
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
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/apps", changefreq: "weekly", priority: "0.9" },
    { path: "/zx-series", changefreq: "monthly", priority: "0.8" },
    { path: "/news", changefreq: "weekly", priority: "0.8" },
    { path: "/about", changefreq: "monthly", priority: "0.7" },
    { path: "/privacy", changefreq: "yearly", priority: "0.5" },
    { path: "/cookies", changefreq: "yearly", priority: "0.5" },
    { path: "/contact", changefreq: "monthly", priority: "0.7" }
  ];

  const apps = await getApps();

  for (const app of apps) {
    if (app.slug) {
      urls.push({ path: `/apps/${app.slug}`, changefreq: "monthly", priority: "0.8" });
    }
  }

  const posts = await fetchJson(`${NEWS_BASE}/posts.json`);
  for (const post of getPublishedValidPosts(posts)) {
    urls.push({
      path: `/news/${post.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: post.date
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(path => `
  <url>
    <loc>https://www.barkinmad.studio${path.path}</loc>
    ${path.lastmod ? `<lastmod>${escapeHtml(path.lastmod)}</lastmod>` : ""}
    <changefreq>${path.changefreq}</changefreq>
    <priority>${path.priority}</priority>
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
