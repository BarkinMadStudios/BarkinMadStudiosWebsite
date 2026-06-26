export default {
  async fetch(request, env, ctx) {
    return handleRequest(request);
  }
};

const ADS_TXT = `google.com, pub-2030137443667873, DIRECT, f08c47fec0942fa0
`;

const REPO_BASE =
  "https://raw.githubusercontent.com/BarkinMadStudios/BarkinMadStudiosWebsite/main";

const IMAGE_BASE = `${REPO_BASE}/images`;
const NEWS_BASE = `${REPO_BASE}/news`;
const PAGES_BASE = `${REPO_BASE}/pages`;
const DATA_BASE = `${PAGES_BASE}/data`;
const SITE_LASTMOD = "2026-06-14";

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
    { label: "Services", href: "/services" },
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

  if (path === "/googleeaa2bb6a63462e00.html") {
    return new Response(
      "google-site-verification: googleeaa2bb6a63462e00.html",
      {
        headers: {
          "Content-Type": "text/html; charset=utf-8"
        }
      }
    );
  }

  if (path === "/google0b80faf2f8732a53.html") {
    return new Response(
      "google-site-verification: google0b80faf2f8732a53.html",
      {
        headers: {
          "Content-Type": "text/html; charset=utf-8"
        }
      }
    );
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
    const page = await fetchJson(`${PAGES_BASE}/apps.json`);
    if (!page) return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);

    return pageResponse(page.seoTitle || `${page.title} | BarkinMad Studios`, await appsPage(page), {
      canonicalPath: "/apps",
      description: page.description,
      image: pageHeroImage(page, `${IMAGE_BASE}/retro-banner.png`)
    });
  }

  if (path === "/apps/non-zx") {
    const page = await fetchJson(`${PAGES_BASE}/non-zx-apps.json`);
    if (!page) return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);

    return pageResponse(page.seoTitle || `${page.title} | BarkinMad Studios`, await nonZxAppsPage(page), {
      canonicalPath: "/apps/non-zx",
      description: page.description || page.intro,
      image: pageHeroImage(page, `${IMAGE_BASE}/retro-banner.png`)
    });
  }

  if (path === "/zx-series") {
    const page = await fetchJson(`${PAGES_BASE}/zx-series.json`);
    if (!page) return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);

    return pageResponse(page.seoTitle || `${page.title} | BarkinMad Studios`, await zxSeriesPage(page), {
      canonicalPath: "/zx-series",
      description: page.description,
      image: pageHeroImage(page, `${IMAGE_BASE}/retro-banner.png`)
    });
  }

  if (["/retro-arcade-games", "/retro-games", "/games", "/darts-apps", "/gameofdarts"].includes(path)) {
    return Response.redirect(`${url.origin}/apps`, 301);
  }

  if (path === "/about") return staticJsonPage("about");
  if (path === "/portfolio/studiodash") return portfolioDetailJsonPage("studiodash");
  if (path === "/portfolio") return portfolioJsonPage();
  if (path === "/docs") return docsJsonPage();
  if (path === "/privacy") return staticJsonPage("privacy");
  if (path === "/cookies") return staticJsonPage("cookies");
  if (path === "/terms") return staticJsonPage("terms");
  if (path === "/company") return staticJsonPage("company");
  if (path === "/contact") return staticJsonPage("contact");
  if (path === "/services") return staticJsonPage("services");

  if (path === "/services/custom-sofware-development") {
    return Response.redirect(`${url.origin}/services/custom-software-development`, 301);
  }

  if (path.startsWith("/services/")) {
    return serviceJsonPage(path.replace("/services/", ""));
  }

  if (path.startsWith("/apps/")) {
    const appPathParts = path.replace("/apps/", "").split("/").filter(Boolean);

    if (appPathParts.length === 1) {
      return appJsonPage(appPathParts[0]);
    }

    if (appPathParts.length === 2) {
      return appDocumentationJsonPage(appPathParts[0], appPathParts[1]);
    }

    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
  }

if (path === "/news") {
  return pageResponse("News & Devlog - BarkinMad Studios", await newsPage(), {
    canonicalPath: "/news",
    description: "Development updates, screenshots, release news, and behind-the-scenes progress from BarkinMad Studios.",
    image: `${IMAGE_BASE}/news-bg-banner.png`
  });
}

  if (path === "/news/archive") {
    return pageResponse("News Archive - BarkinMad Studios", await newsArchivePage(), {
      canonicalPath: "/news/archive",
      description: "Older BarkinMad Studios news and development updates.",
      image: `${IMAGE_BASE}/news-bg-banner.png`
    });
  }

  if (path === "/news/32-language-support-across-the-zx-series") {
    return Response.redirect(`${url.origin}/news/language-support`, 301);
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
${options.keywords || site.keywords ? `<meta name="keywords" content="${escapeHtml(options.keywords || site.keywords)}">` : ""}
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
  max-width: min(320px, 80vw);
  object-fit: contain;
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

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-logo {
  height: 100px;
  width: auto;
  max-width: 90%;
  object-fit: contain;
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

.card-link {
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.card-link:hover {
  border-color: #f39c12;
  transform: translateY(-2px);
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
  max-height: 220px;
  object-fit: contain;
  object-position: center;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid #333858;
  background: #050712;
}

.post-image {
  object-fit: cover;
  background: #000;
}

.article-image {
  width: 100%;
  height: auto;
  max-height: 520px;
  object-fit: contain;
  object-position: center;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid #333858;
  background: #050712;
}

.screenshot-image {
  width: 100%;
  max-width: 420px;
  max-height: 720px;
  margin: 0 auto 1rem;
  display: block;
  aspect-ratio: 9 / 19.5;
  object-fit: contain;
  object-position: center;
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

.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0 0 1rem;
  color: #cfd2ea;
  font-size: 0.95rem;
}

.breadcrumbs a {
  color: #ffcc66;
  text-decoration: none;
}

.breadcrumbs a:hover { color: #f39c12; }

.breadcrumb-separator {
  color: #7d84ad;
}

.guide-nav {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.guide-nav a {
  border: 1px solid #333858;
  border-radius: 8px;
  color: #f4f4f4;
  padding: 0.55rem 0.8rem;
  text-decoration: none;
}

.guide-nav a[aria-current="page"] {
  background: #f39c12;
  border-color: #f39c12;
  color: #111;
  font-weight: bold;
}

.contents-list {
  columns: 2;
  margin-bottom: 0;
}

.contents-list a {
  color: #ffcc66;
  text-decoration: none;
}

.contents-list a:hover { color: #f39c12; }

.prev-next {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
}

.prev-next .card {
  margin-bottom: 0;
}

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

footer p {
  display: flex;
  justify-content: center;
  gap: 0.5rem 1rem;
  flex-wrap: wrap;
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

  .contents-list {
    columns: 1;
  }

  .prev-next {
    grid-template-columns: 1fr;
  }
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

function serviceSchema(service, slug, site = DEFAULT_SITE) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title || service.heroTitle || slug,
    description: cleanMeta(service.description || service.heroSubtitle),
    url: absoluteSiteUrl(site.website || DEFAULT_SITE.website, `/services/${slug}`),
    provider: {
      "@type": "Organization",
      name: site.name || DEFAULT_SITE.name,
      url: site.website || DEFAULT_SITE.website
    },
    areaServed: "United Kingdom",
    serviceType: service.title || service.heroTitle || "Software development"
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
    image: imageAssetUrl(app.heroImage, `${IMAGE_BASE}/logos/social-preview.png`),
    author: {
      "@type": "Organization",
      name: app.developer || site.name || DEFAULT_SITE.name
    }
  };

  if (app.appStoreUrl) schema.installUrl = app.appStoreUrl;
  return schema;
}

function howToSchema(page, app, appSlug, detailSlug, site = DEFAULT_SITE) {
  const steps = Array.isArray(page?.howToSteps)
    ? page.howToSteps.filter(step => step?.name || step?.text)
    : [];

  if (page?.schemaType !== "HowTo" || !steps.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: page.title || `${app?.title || app?.name || appSlug} Guide`,
    description: cleanMeta(page.description || page.summary),
    url: absoluteSiteUrl(site.website || DEFAULT_SITE.website, `/apps/${appSlug}/${detailSlug}`),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name || `Step ${index + 1}`,
      text: markdownLinksToText(step.text || step.name || "")
    }))
  };
}

function softwareProjectSchema(project, slug, site = DEFAULT_SITE) {
  if (!project || !project.title) return null;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    applicationCategory: "BusinessApplication",
    operatingSystem: Array.isArray(project.platforms) ? project.platforms.join(", ") : "iPadOS, macOS",
    description: cleanMeta(project.description || firstParagraph(project.overview)),
    url: absoluteSiteUrl(site.website || DEFAULT_SITE.website, `/portfolio/${slug}`),
    image: pageHeroImage(project, `${IMAGE_BASE}/logos/social-preview.png`),
    author: {
      "@type": "Organization",
      name: site.name || DEFAULT_SITE.name
    },
    applicationSubCategory: project.type || "Developer Tools"
  };
}

function faqSchema(faqs) {
  const questions = Array.isArray(faqs) ? faqs.filter(item => item?.question && item?.answer) : [];
  if (!questions.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: markdownLinksToText(item.answer)
      }
    }))
  };
}

function articleSchema(article, slug, site = DEFAULT_SITE) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: articleDescription(article),
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

function projectSchema(projects, site = DEFAULT_SITE) {
  const website = site.website || DEFAULT_SITE.website;
  const items = Array.isArray(projects) ? projects.filter(project => project?.title) : [];
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BarkinMad Studios Portfolio",
    itemListElement: items.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: cleanMeta(project.summary || project.outcome || project.type),
        url: project.href ? absoluteSiteUrl(website, project.href) : absoluteSiteUrl(website, "/portfolio")
      }
    }))
  };
}

function breadcrumbSchema(items, site = DEFAULT_SITE) {
  const website = site.website || DEFAULT_SITE.website;
  const itemListElement = items
    .filter(item => item && item.name && item.path)
    .map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteSiteUrl(website, item.path)
    }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement
  };
}

function firstParagraph(content) {
  return Array.isArray(content) ? content.find(Boolean) || "" : "";
}

function articleDescription(article) {
  return cleanMeta(article.excerpt || markdownLinksToText(firstParagraph(article.content)));
}

function getAppImage(app) {
  return app.cardImage || app.image || app.icon || "";
}

function imageAssetUrl(image, fallback = "") {
  const value = String(image || "").trim();
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;

  const normalized = value.replace(/^\/+/, "");
  if (normalized.startsWith("images/")) return `${REPO_BASE}/${normalized}`;
  return `${IMAGE_BASE}/${normalized}`;
}

function actionLink(action) {
  if (!action || !action.label || !action.href) return "";
  const href = safeLinkHref(action.href);
  if (!href) return "";
  return `<a class="btn" href="${escapeHtml(href)}">${escapeHtml(action.label)}</a>`;
}

function pageHeroImage(page, fallback) {
  const image = String(page?.hero?.image || "").trim();
  if (!image) return fallback;
  if (/^https?:\/\//i.test(image)) return image;
  if (image.startsWith("/")) return `${REPO_BASE}${image}`;
  if (image.startsWith("images/")) return `${REPO_BASE}/${image}`;
  return `${IMAGE_BASE}/${image}`;
}

function heroBackgroundStyle(page) {
  const image = pageHeroImage(page, `${IMAGE_BASE}/retro-banner.png`);
  return ` style="background-image: linear-gradient(rgba(10,10,25,0.78), rgba(10,10,25,0.9)), url('${escapeHtml(image)}');"`;
}

function renderPromoSection(section) {
  if (!section || !section.title) return "";
  const paragraphs = String(section.description || "")
    .split(/\n+/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean);

  return `
<section>
  <h2>${escapeHtml(section.title)}</h2>
  <div class="card">
    ${paragraphs.map(paragraph => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}
    ${actionLink(section.action)}
  </div>
</section>`;
}

function getZxSeriesApps(apps) {
  return apps.filter(app => app.series === "zx-series" || /^zx/i.test(app.slug || app.name || ""));
}

function getNonZxApps(apps) {
  return apps.filter(app => !getZxSeriesApps([app]).length);
}

function renderAppCollection(section) {
  if (!section || !section.title) return "";

  const label = section.actionLabel || section.buttonLabel || "";

  return `
<div class="card">
  <h3>${escapeHtml(section.title)}</h3>
  ${section.description ? `<p>${renderContentParagraph(section.description)}</p>` : ""}
  ${section.href && label ? `<a class="btn" href="${escapeHtml(section.href)}">${escapeHtml(label)}</a>` : ""}
</div>`;
}

function renderLinkCards(title, items) {
  if (!Array.isArray(items) || !items.length) return "";

  return `
<section>
  ${title ? `<h2>${escapeHtml(title)}</h2>` : ""}
  <div class="grid">
    ${items.map(item => `
      <div class="card">
        <h3>${escapeHtml(item.title || item.heading || item.label || "")}</h3>
        ${item.description ? `<p>${renderContentParagraph(item.description)}</p>` : ""}
        ${item.href ? `<a class="btn" href="${escapeHtml(item.href)}">${escapeHtml(item.actionLabel || item.buttonText || "View Service")}</a>` : ""}
      </div>
    `).join("")}
  </div>
</section>`;
}

function emptyStateCard(text) {
  return text ? `<div class="card"><p>${renderContentParagraph(text)}</p></div>` : "";
}

async function homePage() {
  const homepage = await fetchJson(`${PAGES_BASE}/home.json`) || {};
  const apps = await getApps();
  const posts = await fetchJson(`${NEWS_BASE}/posts.json`) || [];
  const sections = Array.isArray(homepage.sections) ? homepage.sections : [];
  const actions = Array.isArray(homepage.actions) ? homepage.actions : [];

  const featuredProducts = Array.isArray(homepage.featuredProducts)
    ? homepage.featuredProducts.filter(item => item?.title)
    : [];

  const featuredSlugs = Array.isArray(homepage.featuredApps)
    ? homepage.featuredApps
    : apps.filter(app => app.status === "Live").slice(0, 3).map(app => app.slug);

  const featuredApps = apps.filter(app => featuredSlugs.includes(app.slug));
  const featuredItems = featuredProducts.length ? featuredProducts : featuredApps;

  const latestPosts = getPublishedValidPosts(posts).slice(0, homepage.newsCount || 3);

  return `
<section class="hero hero-home"${heroBackgroundStyle(homepage)}>
  <img class="hero-logo" src="${IMAGE_BASE}/logos/logo-black-stacked.png" alt="BarkinMad Studios" loading="eager">

  <h2>${escapeHtml(homepage.heading || "Retro Games & Mobile Apps")}</h2>

  <p>${renderContentParagraph(homepage.intro || "Retro-inspired arcade games and modern mobile apps for iPhone and iPad.")}</p>

  <div class="hero-actions">
    ${actions.map(action => actionLink(action)).join("")}
  </div>
</section>

<main>
${featuredItems.length ? `
<section>
  <h2>${escapeHtml(homepage.featuredAppsTitle || "Featured Apps")}</h2>
  <div class="grid">${featuredItems.map(item => featuredProducts.length ? productCard(item) : appFullCard(item)).join("")}</div>
</section>` : ""}

${renderHomeServicesSection(homepage.servicesSection)}

${renderHomeZxSection(homepage.zxSeriesSection)}

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

function renderHomeServicesSection(section) {
  if (!section || !Array.isArray(section.items) || !section.items.length) return "";

  return `
<section>
  <h2>${escapeHtml(section.title || "Software & Development Services")}</h2>
  ${section.intro ? `<p>${renderContentParagraph(section.intro)}</p>` : ""}
  <div class="grid">
    ${section.items.map(item => `
      <div class="card">
        <h3>${escapeHtml(item.title)}</h3>
        ${item.summary ? `<p>${renderContentParagraph(item.summary)}</p>` : ""}
        ${item.href ? `<a class="btn" href="${escapeHtml(item.href)}">Learn More</a>` : ""}
      </div>
    `).join("")}
  </div>
  ${section.action ? actionLink(section.action) : ""}
</section>`;
}

function renderHomeZxSection(section) {
  if (!section) return "";
  const games = Array.isArray(section.games) ? section.games : [];
  const features = Array.isArray(section.features) ? section.features : [];

  if (!games.length && !features.length && !section.intro) return "";

  return `
<section>
  <h2>${escapeHtml(section.title || "ZX Series")}</h2>
  <div class="card">
    ${section.intro ? `<p>${renderContentParagraph(section.intro)}</p>` : ""}
    ${games.length ? `<p><strong>Games:</strong> ${games.map(escapeHtml).join(", ")}</p>` : ""}
    ${features.length ? `<ul>${features.map(feature => `<li>${renderContentParagraph(feature)}</li>`).join("")}</ul>` : ""}
    ${section.action ? actionLink(section.action) : ""}
  </div>
</section>`;
}

function productCard(product) {
  if (!product || !product.title) return "";
  const image = getAppImage(product);

  return `
<div class="card">
  ${image ? `
    <img class="game-image" src="${IMAGE_BASE}/${escapeHtml(image)}" alt="${escapeHtml(product.title)}" loading="lazy">
  ` : ""}

  ${product.type ? `<span class="badge">${escapeHtml(product.type)}</span>` : ""}

  <h3>${escapeHtml(product.title)}</h3>

  ${product.description ? `<p>${renderContentParagraph(product.description)}</p>` : ""}
  ${product.status ? `<p><strong>Status:</strong> ${escapeHtml(product.status)}</p>` : ""}

  ${product.href ? actionLink({ label: product.actionLabel || "View Product", href: product.href }) : ""}
</div>`;
}

async function appsPage(page) {
  const sections = Array.isArray(page.sections) ? page.sections : [];

  return `
<section class="hero hero-retro"${heroBackgroundStyle(page)}>
  <h2>${escapeHtml(page.heading || page.title)}</h2>
  ${page.intro ? `<p>${renderContentParagraph(page.intro)}</p>` : ""}
</section>

<main>
${renderContentSections(page.content)}

${sections.length ? `
<section>
  <h2>${escapeHtml(page.sectionsTitle)}</h2>
  <div class="grid">
    ${sections.map(renderAppCollection).join("")}
  </div>
</section>` : ""}

${renderPromoSection(page.businessServices)}
</main>`;
}

async function nonZxAppsPage(page) {
  const apps = getNonZxApps(await getApps());

  return `
<section class="hero hero-retro"${heroBackgroundStyle(page)}>
  <h2>${escapeHtml(page.heading || page.title)}</h2>
  ${page.intro ? `<p>${renderContentParagraph(page.intro)}</p>` : ""}
</section>

<main>
<section>
  <h2>${escapeHtml(page.appsTitle || page.title)}</h2>
  <div class="grid">
    ${apps.length ? apps.map(appFullCard).join("") : emptyStateCard(page.emptyText)}
  </div>
</section>
</main>`;
}

async function zxSeriesPage(page) {
  const apps = getZxSeriesApps(await getApps());
  const achievements = await fetchJson(`${DATA_BASE}/achievements.json`) || {};
  const leaderboards = await fetchJson(`${DATA_BASE}/leaderboards.json`) || {};
  const coins = await fetchJson(`${DATA_BASE}/coins.json`) || {};
  const pvp = await fetchJson(`${DATA_BASE}/pvp.json`) || {};
  const roadmap = await fetchJson(`${DATA_BASE}/zxroadmap.json`) || {};
  const games = await fetchJson(`${DATA_BASE}/games.json`) || {};

  return `
<section class="hero hero-retro"${heroBackgroundStyle(page)}>
  <h2>${escapeHtml(page.title)}</h2>
  ${page.description ? `<p>${escapeHtml(page.description)}</p>` : ""}
</section>

<main>
${Array.isArray(page.intro) && page.intro.length ? `
<section>
  <h2>${escapeHtml(page.tagline)}</h2>
  <div class="card">
    ${renderParagraphs(page.intro)}
  </div>
</section>` : ""}

${Array.isArray(page.overview) && page.overview.length ? `
<section>
  <h2>${escapeHtml(page.overviewTitle || "Overview")}</h2>
  <div class="card">
    ${renderParagraphs(page.overview)}
  </div>
</section>` : ""}

${renderStringListSection(page.featuresTitle || "Series Features", page.features)}

${renderSharedSystems(page.sharedSystems || {}, { achievements, leaderboards, coins, pvp, roadmap, games })}

<section>
  <h2>${escapeHtml(page.appsTitle)}</h2>
  <div class="grid">
    ${apps.map(appFullCard).join("")}
  </div>
</section>

${renderContentSections(page.sections)}
</main>`;
}

function renderParagraphs(content) {
  const paragraphs = Array.isArray(content) ? content : (content ? [content] : []);
  return paragraphs
    .filter(paragraph => paragraph !== null && paragraph !== undefined && String(paragraph).trim())
    .map(paragraph => `<p>${renderContentParagraph(paragraph)}</p>`)
    .join("");
}

function renderContentSections(sections) {

  if (!Array.isArray(sections) || !sections.length) return "";

  return sections.map(section => `

<section>

  <h2>${escapeHtml(section.heading || section.title)}</h2>

  <div class="card">

    ${(section.paragraphs || []).map(paragraph => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}

    ${Array.isArray(section.list) ? `

      <ul>

        ${section.list.map(item => `<li>${renderContentParagraph(item)}</li>`).join("")}

      </ul>

    ` : ""}

    ${Array.isArray(section.links) ? `

      <div class="button-group">${section.links.map(actionLink).join("")}</div>

    ` : ""}

  </div>

</section>

`).join("");

}

function renderSharedSystems(content, data) {
  const achievements = data.achievements?.zxSeries;
  const leaderboards = data.leaderboards?.zxSeries;
  const coins = data.coins || {};
  const pvp = data.pvp || {};
  const roadmap = data.roadmap || {};
  const games = Array.isArray(data.games?.games) ? data.games.games : [];
  const hasAchievements = Array.isArray(achievements) && achievements.length;
  const hasLeaderboards = Array.isArray(leaderboards) && leaderboards.length;
  const hasCoins = Boolean(coins.name || content.coinsDescription);
  const hasPvp = Boolean(pvp.worldPVP || pvp.localPVP || content.pvpDescription || content.localPVPDescription || content.worldPVPDescription);

  if (!content.title && !content.intro && !content.description && !hasAchievements && !hasLeaderboards && !hasCoins && !hasPvp && !games.length) {
    return "";
  }

  return `
<section>
  <h2>${escapeHtml(content.title)}</h2>
  <div class="card">
    ${renderParagraphs(content.intro)}
    ${renderParagraphs(content.description)}
  </div>
</section>

${games.length && content.gamesTitle ? `
<section>
  <h2>${escapeHtml(content.gamesTitle)}</h2>
  <div class="card">
    <ul>${games.map(game => `<li><strong>${escapeHtml(game.name || game.title)}</strong>${game.status ? ` - ${escapeHtml(game.status)}` : ""}</li>`).join("")}</ul>
  </div>
</section>` : ""}

${hasCoins && content.coinsTitle ? `
<section>
  <h2>${escapeHtml(content.coinsTitle)}</h2>
  <div class="card">
    ${renderParagraphs(content.coinsDescription)}
    ${coins.description ? `<p>${renderContentParagraph(coins.description)}</p>` : ""}
  </div>
</section>` : ""}

${(hasAchievements || content.achievementsDescription) && content.achievementsTitle ? `
<section>
  <h2>${escapeHtml(content.achievementsTitle)}</h2>
  <div class="card">
    ${renderParagraphs(content.achievementsDescription)}
    ${hasAchievements ? `<ul>${achievements.map(item => `<li><strong>${escapeHtml(item.title || item.name || item.id)}</strong>${item.description ? ` - ${renderContentParagraph(item.description)}` : ""}</li>`).join("")}</ul>` : ""}
  </div>
</section>` : ""}

${(hasLeaderboards || content.leaderboardsDescription) && content.leaderboardsTitle ? `
<section>
  <h2>${escapeHtml(content.leaderboardsTitle)}</h2>
  <div class="card">
    ${renderParagraphs(content.leaderboardsDescription)}
    ${hasLeaderboards ? `<ul>${leaderboards.map(item => `<li><strong>${escapeHtml(item.title || item.name || item.id)}</strong>${item.description ? ` - ${renderContentParagraph(item.description)}` : ""}</li>`).join("")}</ul>` : ""}
  </div>
</section>` : ""}

${hasPvp && content.pvpTitle ? `
<section>
  <h2>${escapeHtml(content.pvpTitle)}</h2>
  <div class="card">
    ${renderParagraphs(content.pvpDescription)}
    ${renderParagraphs(content.localPVPDescription)}
    ${pvp.localPVP && content.localPVPTitle ? `<p><strong>${escapeHtml(content.localPVPTitle)}:</strong> ${renderContentParagraph(pvp.localPVP.description)}</p>` : ""}
    ${renderParagraphs(content.worldPVPDescription)}
    ${pvp.worldPVP && content.worldPVPTitle ? `<p><strong>${escapeHtml(content.worldPVPTitle)}:</strong> ${renderContentParagraph(pvp.worldPVP.description)}</p>` : ""}
  </div>
</section>` : ""}

${renderRoadmapSection(content, roadmap)}`;
}

function renderRoadmapSection(labels, roadmap) {
  const roadmapContent = renderRoadmapContent(labels, roadmap);
  if (!roadmapContent) return "";

  return `
<section>
  <div class="card">
    ${roadmapContent}
  </div>
</section>`;
}

function renderRoadmapContent(labels, roadmap) {
  if (!roadmap || typeof roadmap !== "object") return "";

  const live = Array.isArray(roadmap.live) ? roadmap.live : [];
  const development = Array.isArray(roadmap.development) ? roadmap.development : [];
  const planned = Array.isArray(roadmap.planned) ? roadmap.planned : [];

  if (!live.length && !development.length && !planned.length) return "";

  return `
<h3>${escapeHtml(labels.roadmapTitle)}</h3>
${renderParagraphs(labels.roadmapDescription)}
${live.length && labels.roadmapLiveTitle ? `<p><strong>${escapeHtml(labels.roadmapLiveTitle)}:</strong></p><ul>${live.map(item => `<li>${renderContentParagraph(item)}</li>`).join("")}</ul>` : ""}
${development.length && labels.roadmapDevelopmentTitle ? `<p><strong>${escapeHtml(labels.roadmapDevelopmentTitle)}:</strong></p><ul>${development.map(item => `<li>${renderContentParagraph(item)}</li>`).join("")}</ul>` : ""}
${planned.length && labels.roadmapPlannedTitle ? `<p><strong>${escapeHtml(labels.roadmapPlannedTitle)}:</strong></p><ul>${planned.map(item => `<li>${renderContentParagraph(item)}</li>`).join("")}</ul>` : ""}`;
}

function appFullCard(app) {
  const image = getAppImage(app);
  const detailHref = app.href || (app.slug ? `/apps/${app.slug}` : "");

  return `
<div class="card">
  ${image ? `
    <img class="game-image" src="${IMAGE_BASE}/${escapeHtml(image)}" alt="${escapeHtml(app.name || app.title)}" loading="lazy">
  ` : ""}

  ${app.type ? `<span class="badge">${escapeHtml(app.type)}</span>` : ""}

  <h3>${escapeHtml(app.name || app.title)}</h3>

  <p>${renderContentParagraph(app.description || app.shortDescription || "")}</p>

  ${app.status ? `<p><strong>Status:</strong> ${escapeHtml(app.status)}</p>` : ""}

  <div style="display:flex;gap:1rem;flex-wrap:wrap;">
    ${detailHref ? `<a class="btn" href="${escapeHtml(detailHref)}">View App Page</a>` : ""}

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
  const normalizedAppSlug = String(slug || "").trim();
  const apps = await getApps();
  const listed = apps.some(app => app.slug === normalizedAppSlug);

  if (!listed) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
  }

  const app = await fetchJson(`${PAGES_BASE}/apps/${normalizedAppSlug}.json`);

  if (!app) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
  }

  const documentationLinks = await getGuidesFromPagesIndex(
    normalizedAppSlug,
    normalizedAppSlug === "zxsnake" ? [] : app.documentationLinks
  );

  const relatedApps = apps.filter(item => item.slug && item.slug !== normalizedAppSlug).slice(0, 3);
  const structuredData = [
    appSchema(app, normalizedAppSlug),
    faqSchema(app.faq),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Apps", path: "/apps" },
      { name: app.title || app.name || normalizedAppSlug, path: `/apps/${normalizedAppSlug}` }
    ])
  ].filter(Boolean);

  return pageResponse(`${app.title || app.name} - BarkinMad Studios`, renderAppPage(app, relatedApps, documentationLinks), {
    canonicalPath: `/apps/${normalizedAppSlug}`,
    description: app.description || app.shortDescription,
    image: imageAssetUrl(app.heroImage, `${IMAGE_BASE}/logos/social-preview.png`),
    ogType: "website",
    structuredData
  });
}

async function appDocumentationJsonPage(appSlug, detailSlug) {
  const normalizedAppSlug = String(appSlug || "").trim();
  const normalizedDetailSlug = String(detailSlug || "").trim();

  if (!/^[a-z0-9-]+$/.test(normalizedAppSlug) || !/^[a-z0-9-]+$/.test(normalizedDetailSlug)) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
  }

  const apps = await getApps();
  const listedApp = apps.find(app => app.slug === normalizedAppSlug);

  if (!listedApp) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
  }

  const pageIndex = await fetchJson(`${PAGES_BASE}/apps/${normalizedAppSlug}/pages.json`);
  const indexPages = Array.isArray(pageIndex?.pages) ? pageIndex.pages : [];
  const listedPage = indexPages.find(page => page?.slug === normalizedDetailSlug);

  if (!listedPage) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), {
      canonicalPath: `/apps/${normalizedAppSlug}/${normalizedDetailSlug}`,
      robots: "noindex,follow"
    }, 404);
  }

  const app = await fetchJson(`${PAGES_BASE}/apps/${normalizedAppSlug}.json`);
  const page = await fetchJson(`${PAGES_BASE}/apps/${normalizedAppSlug}/${normalizedDetailSlug}.json`);

  if (!app || !page) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), {
      canonicalPath: `/apps/${normalizedAppSlug}/${normalizedDetailSlug}`,
      robots: "noindex,follow"
    }, 404);
  }

  const site = await getSite();
  const title = page.seoTitle || `${page.title || listedPage.title} - BarkinMad Studios`;
  const canonicalPath = `/apps/${normalizedAppSlug}/${normalizedDetailSlug}`;
  const structuredData = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Apps", path: "/apps" },
      { name: app.title || app.name || listedApp.name || normalizedAppSlug, path: `/apps/${normalizedAppSlug}` },
      { name: page.title || listedPage.title || normalizedDetailSlug, path: canonicalPath }
    ], site),
    faqSchema(page.faq),
    howToSchema(page, app, normalizedAppSlug, normalizedDetailSlug, site)
  ].filter(Boolean);

  return pageResponse(title, renderAppDocumentationPage(app, page, pageIndex, normalizedAppSlug, normalizedDetailSlug), {
    canonicalPath,
    description: page.description || listedPage.description || page.summary,
    image: appDocumentationImage(page, app),
    ogType: "website",
    structuredData
  });
}

function appDocumentationImage(page, app) {
  return imageAssetUrl(page?.heroImage || app?.heroImage, `${IMAGE_BASE}/logos/social-preview.png`);
}

function renderAppDocumentationPage(app, page, pageIndex, appSlug, detailSlug) {
  const title = page.title || "App Guide";
  const sections = Array.isArray(page.sections) ? page.sections : [];
  const relatedLinks = Array.isArray(page.relatedLinks) ? page.relatedLinks : [];
  const images = Array.isArray(page.images) ? page.images.filter(image => image?.src) : [];
  const otherDocs = Array.isArray(pageIndex?.pages)
    ? pageIndex.pages.filter(item => item?.slug && item.title)
    : [];
  const currentIndex = otherDocs.findIndex(item => item.slug === detailSlug);
  const previousDoc = currentIndex > 0 ? otherDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex >= 0 && currentIndex < otherDocs.length - 1 ? otherDocs[currentIndex + 1] : null;
  const appTitle = app.title || app.name || "App";
  const sectionLinks = sections
    .map(section => ({
      id: section.id || slugify(section.heading || section.title || ""),
      label: section.heading || section.title || ""
    }))
    .filter(item => item.id && item.label);

  return `
<section class="hero hero-retro"${heroBackgroundStyle({ hero: { image: page.heroImage || app.heroImage } })}>
  <h2>${escapeHtml(title)}</h2>
  ${page.summary ? `<p>${renderContentParagraph(page.summary)}</p>` : ""}
</section>

<main>
<section>
  <div class="card">
    ${renderBreadcrumbs([
      { label: "Home", href: "/" },
      { label: "Apps", href: "/apps" },
      { label: appTitle, href: `/apps/${appSlug}` },
      { label: title }
    ])}
    ${page.description ? `<p>${renderContentParagraph(page.description)}</p>` : ""}
    ${renderGuideNavigation(otherDocs, appSlug, detailSlug)}
    <a class="btn" href="/apps/${escapeHtml(appSlug)}">Back to ${escapeHtml(appTitle)}</a>
  </div>
</section>

${sectionLinks.length > 1 ? `
<section>
  <h2>Contents</h2>
  <div class="card">
    <ul class="contents-list">
      ${sectionLinks.map(item => `<li><a href="#${escapeHtml(item.id)}">${escapeHtml(item.label)}</a></li>`).join("")}
    </ul>
  </div>
</section>` : ""}

${sections.map(section => `
<section>
  <h2${section.id || section.heading || section.title ? ` id="${escapeHtml(section.id || slugify(section.heading || section.title || ""))}"` : ""}>${escapeHtml(section.heading || section.title || "")}</h2>
  <div class="card">
    ${(section.paragraphs || []).map(paragraph => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}
    ${Array.isArray(section.bullets) && section.bullets.length ? `
      <ul>
        ${section.bullets.map(item => `<li>${renderContentParagraph(item)}</li>`).join("")}
      </ul>
    ` : ""}
  </div>
</section>`).join("")}

${images.length ? `
<section>
  <h2>${escapeHtml(page.imageSectionTitle || "Images")}</h2>
  <div class="grid">
    ${images.map(image => `
      <div class="card">
        <img class="screenshot-image" src="${escapeHtml(imageAssetUrl(image.src))}" alt="${escapeHtml(image.alt || title)}" loading="lazy">
        ${image.caption ? `<p>${renderContentParagraph(image.caption)}</p>` : ""}
      </div>
    `).join("")}
  </div>
</section>` : ""}

${renderFaqSection(page.faq)}

${previousDoc || nextDoc ? `
<section>
  <h2>Previous / Next</h2>
  <div class="prev-next">
    ${previousDoc ? renderGuideStepCard("Previous", previousDoc, appSlug) : `<div></div>`}
    ${nextDoc ? renderGuideStepCard("Next", nextDoc, appSlug) : `<div></div>`}
  </div>
</section>` : ""}

${relatedLinks.length ? `
<section>
  <h2>Related Links</h2>
  <div class="grid">
    ${relatedLinks.map(link => `
      <div class="card">
        <h3>${escapeHtml(link.label || "Related Link")}</h3>
        ${link.description ? `<p>${renderContentParagraph(link.description)}</p>` : ""}
        ${link.href ? `<a class="btn" href="${escapeHtml(safeLinkHref(link.href) || "#")}">Open</a>` : ""}
      </div>
    `).join("")}
  </div>
</section>` : ""}

${otherDocs.length ? `
<section>
  <h2>${escapeHtml(pageIndex?.title || "Guides")}</h2>
  <div class="grid">
    ${otherDocs.map(item => `
      <div class="card">
        <h3>${escapeHtml(item.title)}</h3>
        ${item.description ? `<p>${renderContentParagraph(item.description)}</p>` : ""}
        <a class="btn" href="/apps/${escapeHtml(appSlug)}/${escapeHtml(item.slug)}">View Guide</a>
      </div>
    `).join("")}
  </div>
</section>` : ""}
</main>`;
}

function renderBreadcrumbs(items) {
  const entries = Array.isArray(items) ? items.filter(item => item?.label) : [];
  if (!entries.length) return "";

  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      ${entries.map((item, index) => {
        const isLast = index === entries.length - 1 || !item.href;
        const separator = index > 0 ? `<span class="breadcrumb-separator" aria-hidden="true">/</span>` : "";
        const crumb = isLast
          ? `<span aria-current="page">${escapeHtml(item.label)}</span>`
          : `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`;
        return `${separator}${crumb}`;
      }).join("")}
    </nav>`;
}

function renderGuideNavigation(pages, appSlug, currentSlug) {
  const items = Array.isArray(pages) ? pages.filter(item => item?.slug && item.title) : [];
  if (!items.length) return "";

  return `
    <nav class="guide-nav" aria-label="Guide navigation">
      ${items.map(item => {
        const href = `/apps/${appSlug}/${item.slug}`;
        const current = item.slug === currentSlug ? ` aria-current="page"` : "";
        return `<a href="${escapeHtml(href)}"${current}>${escapeHtml(item.title)}</a>`;
      }).join("")}
    </nav>`;
}

function renderGuideStepCard(label, page, appSlug) {
  return `
    <div class="card">
      <p><strong>${escapeHtml(label)}</strong></p>
      <h3>${escapeHtml(page.title)}</h3>
      ${page.description ? `<p>${renderContentParagraph(page.description)}</p>` : ""}
      <a class="btn" href="/apps/${escapeHtml(appSlug)}/${escapeHtml(page.slug)}">${escapeHtml(label)} Guide</a>
    </div>`;
}

function renderAppPage(app, relatedApps = [], guideLinks = null) {
  const sectionGuideLinks = Array.isArray(guideLinks) ? guideLinks : app.documentationLinks;

  return `
<section class="hero hero-retro"${heroBackgroundStyle({ hero: { image: app.heroImage } })}>
  <h2>${escapeHtml(app.title || app.name)}</h2>
  <p>${renderContentParagraph(app.tagline || "")}</p>
</section>

<main>
<section>
  <div class="card">
    ${app.heroImage ? `
      <img class="article-image" src="${escapeHtml(imageAssetUrl(app.heroImage))}" alt="${escapeHtml(app.title || app.name)}" loading="lazy">
    ` : ""}

    ${app.status ? `<span class="badge">${escapeHtml(app.status)}</span>` : ""}
    ${app.shortDescription ? `<h2>${escapeHtml(app.shortDescription)}</h2>` : ""}
    ${app.description ? `<p>${renderContentParagraph(app.description)}</p>` : ""}

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
    <p>${renderContentParagraph(app.barkinMadCoins.description)}</p>
  </div>
</section>` : ""}

${renderAppDocumentationLinks(sectionGuideLinks)}

${renderStringListSection("Supported Platforms", app.supportedPlatforms)}

${renderFaqSection(app.faq)}

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
        <img class="screenshot-image" src="${escapeHtml(imageAssetUrl(image))}" alt="${escapeHtml(caption || (app.title || app.name) + " screenshot")}" loading="lazy">
        ${caption ? `<p>${renderContentParagraph(caption)}</p>` : ""}
      </div>`;
    }).join("")}
  </div>
</section>` : ""}

${renderRelatedApps(relatedApps)}
</main>`;
}

function renderAppDocumentationLinks(links) {
  const items = Array.isArray(links) ? links.filter(link => link?.label && link?.href) : [];
  if (!items.length) return "";

  return `
<section>
  <h2>Guides & Help</h2>
  <div class="grid">
    ${items.map(link => `
      <div class="card">
        <h3>${escapeHtml(link.label)}</h3>
        ${link.description ? `<p>${renderContentParagraph(link.description)}</p>` : ""}
        <a class="btn" href="${escapeHtml(link.href)}">View Guide</a>
      </div>
    `).join("")}
  </div>
</section>`;
}

function renderFaqSection(faqs) {
  const items = Array.isArray(faqs) ? faqs.filter(item => item?.question && item?.answer) : [];
  if (!items.length) return "";

  return `
<section>
  <h2>FAQ</h2>
  <div class="card">
    ${items.map(item => `
      <h3>${escapeHtml(item.question)}</h3>
      <p>${renderContentParagraph(item.answer)}</p>
    `).join("")}
  </div>
</section>`;
}

async function getGuidesFromPagesIndex(appSlug, fallbackLinks = []) {
  if (!appSlug) return Array.isArray(fallbackLinks) ? fallbackLinks : [];

  const index = await fetchJson(`${PAGES_BASE}/apps/${appSlug}/pages.json`);
  const pages = normalizeDocumentationPages(index?.pages);

  if (!pages.length) {
    return Array.isArray(fallbackLinks) ? fallbackLinks : [];
  }

  const links = [];
  const seen = new Set();

  for (const page of pages) {
    if (!page?.slug) continue;

    const status = String(page.status || page.contentStatus || "").toLowerCase();
    if (status === "draft") continue;

    const href = `/apps/${appSlug}/${page.slug}`;
    if (seen.has(href)) continue;
    seen.add(href);

    links.push({
      label: page.title || page.slug,
      href,
      description: page.description || ""
    });
  }

  if (links.length) return links;

  return Array.isArray(fallbackLinks) ? fallbackLinks : [];
}

function normalizeDocumentationPages(pages) {
  if (!Array.isArray(pages)) return [];

  const seen = new Set();
  const normalized = [];

  for (const page of pages) {
    if (!page || typeof page !== "object") continue;

    const slug = String(page.slug || "").trim();
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);

    normalized.push({
      ...page,
      slug
    });
  }

  return normalized;
}

function renderRelatedApps(apps) {
  if (!Array.isArray(apps) || !apps.length) return "";

  return `
<section>
  <h2>You May Also Like</h2>
  <div class="grid">
    ${apps.map(appFullCard).join("")}
  </div>
</section>`;
}

function renderStringListSection(title, items) {
  if (!Array.isArray(items) || !items.length) return "";

  return `
<section>
  <h2>${escapeHtml(title)}</h2>
  <div class="card">
    <ul>
      ${items.map(item => `<li>${renderContentParagraph(item)}</li>`).join("")}
    </ul>
  </div>
</section>`;
}

async function serviceJsonPage(slug) {
  const serviceSlug = String(slug || "").trim();
  if (!/^[a-z0-9-]+$/.test(serviceSlug)) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
  }

  const service = await fetchJson(`${PAGES_BASE}/services/${serviceSlug}.json`);

  if (!service) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), {
      canonicalPath: `/services/${serviceSlug}`,
      robots: "noindex,follow"
    }, 404);
  }

  const site = await getSite();
  const heroPage = {
    ...service,
    hero: {
      ...(service.hero || {}),
      image: service.hero?.image || "/images/service-bg-banner.png"
    }
  };

  return pageResponse(`${service.title} - BarkinMad Studios`, renderServicePage(heroPage), {
    canonicalPath: `/services/${serviceSlug}`,
    description: service.description,
    image: pageHeroImage(heroPage, `${IMAGE_BASE}/service-bg-banner.png`),
    structuredData: [
      serviceSchema(service, serviceSlug, site),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.title, path: `/services/${serviceSlug}` }
      ])
    ]
  });
}

function renderServicePage(service) {
  const cta = service.cta || {
    title: "Request a Consultation",
    content: "Contact BarkinMad Studios to discuss your project, requirements, and next steps.",
    buttonText: "Contact BarkinMad Studios",
    buttonLink: "/contact"
  };

  return `
<section class="hero hero-retro"${heroBackgroundStyle(service)}>
  <h2>${escapeHtml(service.heroTitle || service.heading || service.title)}</h2>
  ${service.heroSubtitle || service.description ? `<p>${renderContentParagraph(service.heroSubtitle || service.description)}</p>` : ""}
</section>

<main>
  ${service.description ? `
    <section>
      <h2>Overview</h2>
      <div class="card">
        <p>${renderContentParagraph(service.description)}</p>
      </div>
    </section>
  ` : ""}

  ${Array.isArray(service.sections) ? service.sections.map(section => `
    <section>
      <h2>${escapeHtml(section.heading || section.title)}</h2>
      <div class="card">
        ${renderServiceSectionContent(section)}
      </div>
    </section>
  `).join("") : ""}

  ${cta ? `
    <section>
      <h2>${escapeHtml(cta.title || "Request a Consultation")}</h2>
      <div class="card">
        ${cta.content ? `<p>${renderContentParagraph(cta.content)}</p>` : ""}
        ${actionLink({ label: cta.buttonText || "Contact BarkinMad Studios", href: cta.buttonLink || "/contact" })}
      </div>
    </section>
  ` : ""}
</main>`;
}

function renderServiceSectionContent(section) {
  const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : [];
  const list = Array.isArray(section.list) ? section.list : [];
  const content = Array.isArray(section.content) ? section.content : [];

  if (paragraphs.length || list.length) {
    return `
      ${paragraphs.map(paragraph => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}
      ${list.length ? `<ul>${list.map(item => `<li>${renderContentParagraph(item)}</li>`).join("")}</ul>` : ""}
      ${Array.isArray(section.links) ? `<div class="button-group">${section.links.map(actionLink).join("")}</div>` : ""}
    `;
  }

  if (!content.length) return "";

  const shouldRenderAsList = content.length > 2;
  return shouldRenderAsList
    ? `<ul>${content.map(item => `<li>${renderContentParagraph(item)}</li>`).join("")}</ul>`
    : content.map(paragraph => `<p>${renderContentParagraph(paragraph)}</p>`).join("");
}

async function staticJsonPage(slug) {
  const page = await fetchJson(`${PAGES_BASE}/${slug}.json`);

  if (!page) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
  }

  const sections = staticPageSections(page);
  if (!sections.length) {
    return pageResponse("Page Error - BarkinMad Studios", brokenPage());
  }

  const renderablePage = { ...page, sections };

  return pageResponse(page.seoTitle || `${page.title} - BarkinMad Studios`, renderStaticPage(renderablePage), {
    canonicalPath: `/${slug}`,
    description: page.description || page.intro || firstParagraph(sections[0]?.paragraphs),
    image: pageHeroImage(page, `${IMAGE_BASE}/logos/social-preview.png`),
    structuredData: [
      organizationSchema(DEFAULT_SITE),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: page.heading || page.title || slug, path: `/${slug}` }
      ])
    ]
  });
}

function staticPageSections(page) {
  if (Array.isArray(page.sections)) return page.sections;

  if (Array.isArray(page.content)) {
    return page.content
      .filter(section => section?.heading || section?.title || section?.text)
      .map(section => ({
        heading: section.heading || section.title,
        paragraphs: section.text ? [section.text] : []
      }));
  }

  return [];
}

async function docsJsonPage() {
  const page = await fetchJson(`${PAGES_BASE}/docs.json`);

  if (!page) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
  }

  return pageResponse(page.seoTitle || `${page.title || "Documentation"} - BarkinMad Studios`, renderDocsPage(page), {
    canonicalPath: "/docs",
    description: page.description || page.intro,
    image: pageHeroImage(page, `${IMAGE_BASE}/news-bg-banner.png`),
    structuredData: [
      organizationSchema(DEFAULT_SITE),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: page.heading || page.title || "Documentation", path: "/docs" }
      ])
    ]
  });
}

async function portfolioJsonPage() {
  const page = await fetchJson(`${PAGES_BASE}/portfolio.json`);

  if (!page) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
  }

  const structuredData = [
    organizationSchema(DEFAULT_SITE),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: page.heading || page.title || "Portfolio", path: "/portfolio" }
    ]),
    projectSchema(page.projects)
  ].filter(Boolean);

  return pageResponse(page.seoTitle || `${page.title || "Portfolio"} - BarkinMad Studios`, renderPortfolioPage(page), {
    canonicalPath: "/portfolio",
    description: page.description || page.intro,
    image: pageHeroImage(page, `${IMAGE_BASE}/apps-hero-banner.png`),
    structuredData
  });
}

async function portfolioDetailJsonPage(slug) {
  const projectSlug = String(slug || "").trim();
  if (!/^[a-z0-9-]+$/.test(projectSlug)) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
  }

  const page = await fetchJson(`${PAGES_BASE}/portfolio-${projectSlug}.json`);

  if (!page) {
    return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), {
      canonicalPath: `/portfolio/${projectSlug}`,
      robots: "noindex,follow"
    }, 404);
  }

  return pageResponse(page.seoTitle || `${page.title || page.heading || projectSlug} - BarkinMad Studios`, renderPortfolioDetailPage(page), {
    canonicalPath: `/portfolio/${projectSlug}`,
    description: page.description || firstParagraph(page.overview),
    keywords: page.keywords,
    image: pageHeroImage(page, `${IMAGE_BASE}/logos/social-preview.png`),
    structuredData: [
      organizationSchema(DEFAULT_SITE),
      softwareProjectSchema(page, projectSlug),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: page.heading || page.title || projectSlug, path: `/portfolio/${projectSlug}` }
      ])
    ].filter(Boolean)
  });
}

function renderPortfolioPage(page) {
  const sections = Array.isArray(page.sections) ? page.sections : [];
  const projects = Array.isArray(page.projects) ? page.projects : [];
  const projectCategories = Array.isArray(page.projectCategories) ? page.projectCategories.filter(Boolean) : [];
  const actions = Array.isArray(page.actions) ? page.actions : [];

  return `
<section class="hero hero-retro"${heroBackgroundStyle(page)}>
  <h2>${escapeHtml(page.heading || page.title || "Portfolio")}</h2>
  ${page.intro ? `<p>${renderContentParagraph(page.intro)}</p>` : ""}
</section>

<main>
  ${page.description ? `
    <section>
      <div class="card">
        <p>${renderContentParagraph(page.description)}</p>
      </div>
    </section>
  ` : ""}

  ${renderContentSections(sections)}

  ${projects.length ? `
    <section>
      <h2>Projects</h2>
      ${projectCategories.length
        ? projectCategories.map(category => renderPortfolioProjectGroup(category, projects.filter(project => project.category === category))).join("")
        : `<div class="grid portfolio-grid">${projects.map(renderPortfolioProjectCard).join("")}</div>`}
    </section>
  ` : ""}

  ${renderPortfolioConfidentiality(page.confidentiality)}

  ${actions.length ? `
    <section>
      <div class="card">
        <div class="button-group">${actions.map(actionLink).join("")}</div>
      </div>
    </section>
  ` : ""}
</main>`;
}

function renderPortfolioProjectGroup(category, projects) {
  if (!Array.isArray(projects) || !projects.length) return "";

  return `
  <h3>${escapeHtml(category)}</h3>
  <div class="grid portfolio-grid">
    ${projects.map(renderPortfolioProjectCard).join("")}
  </div>`;
}

function renderPortfolioProjectCard(project) {
  if (!project || !project.title) return "";
  const technologies = Array.isArray(project.technologies) ? project.technologies.filter(Boolean) : [];
  const image = getAppImage(project);

  return `
<div class="card portfolio-card">
  ${image ? `
    <img class="game-image" src="${IMAGE_BASE}/${escapeHtml(image)}" alt="${escapeHtml(project.title)}" loading="lazy">
  ` : ""}
  <div>
    ${project.badge ? `<span class="badge">${renderContentParagraph(project.badge)}</span>` : project.status ? `<span class="badge">${renderContentParagraph(project.status)}</span>` : ""}
    <h3>${renderContentParagraph(project.title)}</h3>
    ${project.status ? `<p><strong>Status:</strong> ${renderContentParagraph(project.status)}</p>` : ""}
    ${project.type ? `<p><strong>Type:</strong> ${renderContentParagraph(project.type)}</p>` : ""}
    ${project.summary ? `<p>${renderContentParagraph(project.summary)}</p>` : ""}
    ${project.challenge ? `<p><strong>Challenge:</strong> ${renderContentParagraph(project.challenge)}</p>` : ""}
    ${project.solution ? `<p><strong>Solution:</strong> ${renderContentParagraph(project.solution)}</p>` : ""}
    ${technologies.length ? `
      <p><strong>Technologies:</strong></p>
      <ul>
        ${technologies.map(technology => `<li>${renderContentParagraph(technology)}</li>`).join("")}
      </ul>
    ` : ""}
    ${project.outcome ? `<p><strong>Outcome:</strong> ${renderContentParagraph(project.outcome)}</p>` : ""}
  </div>
  ${project.href ? actionLink({ label: "View Project", href: project.href }) : ""}
</div>`;
}

function renderPortfolioDetailPage(page) {
  const actions = Array.isArray(page.actions) ? page.actions : [];

  return `
<section class="hero hero-retro"${heroBackgroundStyle(page)}>
  <h2>${escapeHtml(page.heading || page.title)}</h2>
  ${page.tagline ? `<p>${renderContentParagraph(page.tagline)}</p>` : ""}
</section>

<main>
  <section>
    <div class="card">
      ${page.icon ? `<img class="game-image" src="${IMAGE_BASE}/${escapeHtml(page.icon)}" alt="${escapeHtml(page.title || page.heading)} app icon" loading="lazy">` : ""}
      ${page.badge ? `<span class="badge">${escapeHtml(page.badge)}</span>` : ""}
      ${page.status ? `<p><strong>Status:</strong> ${escapeHtml(page.status)}</p>` : ""}
      ${page.type ? `<p><strong>Category:</strong> ${escapeHtml(page.type)}</p>` : ""}
      ${renderParagraphs(page.overview)}
    </div>
  </section>

  ${renderContentSections(page.sections)}

  ${renderStringListSection("Key Features", page.features)}
  ${renderStringListSection("Current Integrations", page.integrations)}
  ${renderStringListSection("Platform Support", page.platforms)}
  ${renderStringListSection("Technology", page.technologies)}

  ${actions.length ? `
    <section>
      <div class="card">
        <div class="button-group">${actions.map(actionLink).join("")}</div>
      </div>
    </section>
  ` : ""}
</main>`;
}

function renderPortfolioConfidentiality(confidentiality) {
  if (!confidentiality) return "";
  const paragraphs = Array.isArray(confidentiality.paragraphs) ? confidentiality.paragraphs : [];
  if (!confidentiality.heading && !paragraphs.length) return "";

  return `
<section>
  ${confidentiality.heading ? `<h2>${escapeHtml(confidentiality.heading)}</h2>` : ""}
  <div class="card">
    ${paragraphs.map(paragraph => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}
  </div>
</section>`;
}

function renderDocsPage(page) {
  const categories = Array.isArray(page.categories) ? page.categories : [];
  const actions = Array.isArray(page.actions) ? page.actions : [];

  return `
<section class="hero hero-retro"${heroBackgroundStyle(page)}>
  <h2>${escapeHtml(page.heading || page.title || "Documentation")}</h2>
  ${page.intro ? `<p>${renderContentParagraph(page.intro)}</p>` : ""}
</section>

<main>
  ${categories.length ? categories.map(category => `
    <section>
      <h2>${escapeHtml(category.title)}</h2>
      ${category.description ? `<p>${renderContentParagraph(category.description)}</p>` : ""}
      <div class="grid">
        ${(category.documents || []).map(document => `
          <div class="card">
            <h3>${escapeHtml(document.title)}</h3>
            ${document.summary ? `<p>${renderContentParagraph(document.summary)}</p>` : ""}
            ${Array.isArray(document.tags) && document.tags.length ? `<p><strong>Topics:</strong> ${document.tags.map(escapeHtml).join(", ")}</p>` : ""}
            ${document.href ? `<a class="btn" href="${escapeHtml(document.href)}">Open Document</a>` : ""}
          </div>
        `).join("")}
      </div>
    </section>
  `).join("") : ""}

  ${renderStringListSection("Documentation Platform", page.features)}

  ${actions.length ? `
    <section>
      <div class="card">
        <div class="button-group">${actions.map(actionLink).join("")}</div>
      </div>
    </section>
  ` : ""}
</main>`;
}

function renderStaticPage(page) {
  return `
<section class="hero hero-retro"${heroBackgroundStyle(page)}>
  <h2>${escapeHtml(page.heading || page.title)}</h2>
  ${page.intro ? `<p>${renderContentParagraph(page.intro)}</p>` : ""}
</section>

<main>
  ${renderLinkCards(page.servicePagesTitle, page.servicePages)}

  ${page.sections.map(section => `
    <section>
      <h2>${escapeHtml(section.heading || section.title)}</h2>
      <div class="card">
        ${(section.paragraphs || []).map(paragraph => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}

        ${Array.isArray(section.list) ? `
          <ul>
            ${section.list.map(item => `<li>${renderContentParagraph(item)}</li>`).join("")}
          </ul>
        ` : ""}

        ${Array.isArray(section.links) ? `
          <div class="button-group">${section.links.map(actionLink).join("")}</div>
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
  <img class="game-image post-image" src="${NEWS_BASE}/${escapeHtml(post.slug)}/${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" loading="lazy">
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

  const posts = getPublishedValidPosts(await fetchJson(`${NEWS_BASE}/posts.json`));
  const relatedPosts = posts.filter(post => post.slug !== slug).slice(0, 3);

  return pageResponse(`${article.title} - BarkinMad Studios`, newsArticlePage(slug, article, relatedPosts), {
    canonicalPath: `/news/${slug}`,
    description: articleDescription(article),
    image: article.image ? `${NEWS_BASE}/${slug}/${article.image}` : `${IMAGE_BASE}/logos/social-preview.png`,
    ogType: "article",
    structuredData: [
      articleSchema(article, slug),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "News", path: "/news" },
        { name: article.title, path: `/news/${slug}` }
      ])
    ]
  });
}

function newsArticlePage(slug, article, relatedPosts = []) {
  const paragraphs = Array.isArray(article.content) ? article.content : [];
  const articleActions = Array.isArray(article.actions) ? article.actions : [];

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

    ${paragraphs.map(paragraph =>
      `<p>${renderContentParagraph(paragraph)}</p>`
    ).join("")}

    ${articleActions.length ? `
      <p>${articleActions.map(actionLink).join("")}</p>
    ` : ""}

    <a class="btn" href="/news">Back To News</a>
  </div>
</section>

${relatedPosts.length ? `
<section>
  <h2>Related Articles</h2>
  <div class="grid">
    ${relatedPosts.map(postCard).join("")}
  </div>
</section>` : ""}
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
    { path: "/apps/non-zx", changefreq: "weekly", priority: "0.8" },
    { path: "/zx-series", changefreq: "monthly", priority: "0.8" },
    { path: "/news", changefreq: "weekly", priority: "0.8" },
    { path: "/about", changefreq: "monthly", priority: "0.7" },
    { path: "/portfolio", changefreq: "monthly", priority: "0.8" },
    { path: "/portfolio/studiodash", changefreq: "monthly", priority: "0.8" },
    { path: "/docs", changefreq: "monthly", priority: "0.7" },
    { path: "/services", changefreq: "monthly", priority: "0.7" },
    { path: "/privacy", changefreq: "yearly", priority: "0.5" },
    { path: "/cookies", changefreq: "yearly", priority: "0.5" },
    { path: "/terms", changefreq: "yearly", priority: "0.5" },
    { path: "/company", changefreq: "yearly", priority: "0.5" },
    { path: "/contact", changefreq: "monthly", priority: "0.7" }
  ].map(url => ({ ...url, lastmod: SITE_LASTMOD }));

  const apps = await getApps();

  for (const app of apps) {
    const appPath = app.href || (app.slug ? `/apps/${app.slug}` : "");
    if (appPath && !urls.some(url => url.path === appPath)) {
      urls.push({ path: appPath, changefreq: "monthly", priority: "0.8", lastmod: SITE_LASTMOD });
    }

    if (app.slug) {
      const pageIndex = await fetchJson(`${PAGES_BASE}/apps/${app.slug}/pages.json`);
      const documentationPages = Array.isArray(pageIndex?.pages) ? pageIndex.pages : [];

      for (const page of documentationPages) {
        if (page?.slug) {
          urls.push({
            path: `/apps/${app.slug}/${page.slug}`,
            changefreq: "monthly",
            priority: "0.6",
            lastmod: page.lastUpdated || pageIndex.lastUpdated || SITE_LASTMOD
          });
        }
      }
    }
  }

  const services = await fetchJson(`${PAGES_BASE}/services.json`);
  const servicePages = Array.isArray(services?.servicePages) ? services.servicePages : [];
  for (const service of servicePages) {
    if (service.href) {
      urls.push({ path: service.href, changefreq: "monthly", priority: "0.8", lastmod: SITE_LASTMOD });
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

function renderContentParagraph(text) {
  const source = String(text ?? "");
  const markdownLink = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let html = "";
  let lastIndex = 0;
  let match;

  while ((match = markdownLink.exec(source)) !== null) {
    html += escapeHtml(source.slice(lastIndex, match.index));

    const href = safeLinkHref(match[2]);
    html += href
      ? `<a href="${escapeHtml(href)}">${escapeHtml(match[1])}</a>`
      : escapeHtml(match[0]);

    lastIndex = markdownLink.lastIndex;
  }

  html += escapeHtml(source.slice(lastIndex));
  return html.replace(/<\/a>\s+([,.;:!?])/g, "</a>$1");
}

function markdownLinksToText(text) {
  return String(text ?? "")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1")
    .replace(/\s+([,.;:!?])/g, "$1");
}

function safeLinkHref(href) {
  const value = String(href || "").trim();
  if (!value) return "";

  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  if (/^https?:\/\//i.test(value)) {
    try {
      return new URL(value).toString();
    } catch {
      return "";
    }
  }

  return "";
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
