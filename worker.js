(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // worker.js
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  var ADS_TXT = `google.com, pub-2030137443667873, DIRECT, f08c47fec0942fa0
`;
  var GOOGLE_ANALYTICS_ID = "G-7MKNQLXXP9";
	
  var REPO_BASE = "https://raw.githubusercontent.com/BarkinMadStudios/BarkinMadStudiosWebsite/main";
  var IMAGE_BASE = `${REPO_BASE}/images`;
  var NEWS_BASE = `${REPO_BASE}/news`;
  var PAGES_BASE = `${REPO_BASE}/pages`;
  var DATA_BASE = `${PAGES_BASE}/data`;
  var DOCUMENTATION_PLACEHOLDER_IMAGE = "images/shared/placeholder.png";
  var IMAGE_MANIFEST = {"images/apps-hero-banner.png":{"width":1717,"height":916,"widths":[480,800,1200,1600,1717]},"images/apps/barkinmadcoins.png":{"width":1727,"height":794,"widths":[480,800,1200,1600,1727]},"images/apps/gameofdarts/gameofdarts-dartbot.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/gameofdarts/gameofdarts-faq.png":{"width":1536,"height":1024,"widths":[480,800,1200,1536]},"images/apps/gameofdarts/gameofdarts-game-modes.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/gameofdarts/gameofdarts-hero.png":{"width":1881,"height":836,"widths":[480,800,1200,1600,1881]},"images/apps/gameofdarts/gameofdarts-icon.png":{"width":1254,"height":1254,"widths":[480,800,1200,1254]},"images/apps/gameofdarts/gameofdarts-leaderboards.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/gameofdarts/gameofdarts-match-types.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/gameofdarts/gameofdarts-premium-access.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/gameofdarts/gameofdarts-screenshot-IAP.png":{"width":1206,"height":2622,"widths":[480,800,1200,1206]},"images/apps/gameofdarts/gameofdarts-screenshot-help.png":{"width":1206,"height":2622,"widths":[480,800,1200,1206]},"images/apps/gameofdarts/gameofdarts-screenshot-leaderboards.png":{"width":1206,"height":2622,"widths":[480,800,1200,1206]},"images/apps/gameofdarts/gameofdarts-screenshot-main.png":{"width":1206,"height":2622,"widths":[480,800,1200,1206]},"images/apps/gameofdarts/gameofdarts-screenshot-settings.png":{"width":1206,"height":2622,"widths":[480,800,1200,1206]},"images/apps/gameofdarts/gameofdarts-screenshot-splash.png":{"width":1206,"height":2622,"widths":[480,800,1200,1206]},"images/apps/gameofdarts/gameofdarts-statistics.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/gameofdarts/gameofdarts-voice-caller.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/gameofdarts/gameofdarts.png":{"width":1430,"height":1100,"widths":[480,800,1200,1430]},"images/apps/gameofdarts/gameofdarts1.png":{"width":1254,"height":1254,"widths":[480,800,1200,1254]},"images/apps/studiodash/Screenshot1.png":{"width":1372,"height":995,"widths":[480,800,1200,1372]},"images/apps/studiodash/Screenshot2.png":{"width":1372,"height":995,"widths":[480,800,1200,1372]},"images/apps/studiodash/Screenshot3.png":{"width":1372,"height":995,"widths":[480,800,1200,1372]},"images/apps/studiodash/Screenshot4.png":{"width":1372,"height":995,"widths":[480,800,1200,1372]},"images/apps/studiodash/studiodash-hero.png":{"width":1672,"height":941,"widths":[480,800,1200,1600,1672]},"images/apps/studiodash/studiodash-icon.png":{"width":1024,"height":1024,"widths":[480,800,1024]},"images/apps/zxbrick/zxbrick-achievements.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/zxbrick/zxbrick-controls.png":{"width":1714,"height":820,"widths":[480,800,1200,1600,1714]},"images/apps/zxbrick/zxbrick-faq.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/zxbrick/zxbrick-game-modes.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/zxbrick/zxbrick-gameplay-01.png":{"width":941,"height":1672,"widths":[480,800,941]},"images/apps/zxbrick/zxbrick-gameplay-02.png":{"width":1206,"height":2622,"widths":[480,800,1200,1206]},"images/apps/zxbrick/zxbrick-gameplay-03.png":{"width":1320,"height":2868,"widths":[480,800,1200,1320]},"images/apps/zxbrick/zxbrick-gameplay-04.png":{"width":1320,"height":2868,"widths":[480,800,1200,1320]},"images/apps/zxbrick/zxbrick-hero.png":{"width":1873,"height":840,"widths":[480,800,1200,1600,1873]},"images/apps/zxbrick/zxbrick-how-to-play.png":{"width":1714,"height":820,"widths":[480,800,1200,1600,1714]},"images/apps/zxbrick/zxbrick-icon.png":{"width":1024,"height":1024,"widths":[480,800,1024]},"images/apps/zxbrick/zxbrick-leaderboards.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/zxbrick/zxbrick-levels.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/zxbrick/zxbrick-powerup-berserker.png":{"width":96,"height":96,"widths":[96]},"images/apps/zxbrick/zxbrick-powerup-fast.png":{"width":90,"height":90,"widths":[90]},"images/apps/zxbrick/zxbrick-powerup-grow.png":{"width":90,"height":90,"widths":[90]},"images/apps/zxbrick/zxbrick-powerup-laser.png":{"width":90,"height":90,"widths":[90]},"images/apps/zxbrick/zxbrick-powerup-multi.png":{"width":90,"height":90,"widths":[90]},"images/apps/zxbrick/zxbrick-powerup-shield.png":{"width":90,"height":90,"widths":[90]},"images/apps/zxbrick/zxbrick-powerup-shrink.png":{"width":90,"height":90,"widths":[90]},"images/apps/zxbrick/zxbrick-powerup-slow.png":{"width":90,"height":90,"widths":[90]},"images/apps/zxbrick/zxbrick-powerups.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/zxbrick/zxbrick-tips-and-strategy.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/zxbrick/zxbrick.png":{"width":1300,"height":1000,"widths":[480,800,1200,1300]},"images/apps/zxpong/zxpong-gameplay-01.png":{"width":1242,"height":2688,"widths":[480,800,1200,1242]},"images/apps/zxpong/zxpong-hero.png":{"width":1536,"height":1024,"widths":[480,800,1200,1536]},"images/apps/zxpong/zxpong-icon.png":{"width":1024,"height":1024,"widths":[480,800,1024]},"images/apps/zxpong/zxpong.png":{"width":1662,"height":946,"widths":[480,800,1200,1600,1662]},"images/apps/zxsnake/zxsnake-achievements.png":{"width":1536,"height":1024,"widths":[480,800,1200,1536]},"images/apps/zxsnake/zxsnake-controls.png":{"width":1672,"height":941,"widths":[480,800,1200,1600,1672]},"images/apps/zxsnake/zxsnake-faq.png":{"width":1748,"height":812,"widths":[480,800,1200,1600,1748]},"images/apps/zxsnake/zxsnake-game-modes.png":{"width":1677,"height":820,"widths":[480,800,1200,1600,1677]},"images/apps/zxsnake/zxsnake-gameplay-01.png":{"width":1206,"height":2622,"widths":[480,800,1200,1206]},"images/apps/zxsnake/zxsnake-gameplay-02.png":{"width":1206,"height":2622,"widths":[480,800,1200,1206]},"images/apps/zxsnake/zxsnake-gameplay-03.png":{"width":1206,"height":2622,"widths":[480,800,1200,1206]},"images/apps/zxsnake/zxsnake-hero.png":{"width":1871,"height":840,"widths":[480,800,1200,1600,1871]},"images/apps/zxsnake/zxsnake-how-to-play.png":{"width":1691,"height":930,"widths":[480,800,1200,1600,1691]},"images/apps/zxsnake/zxsnake-icon.png":{"width":1024,"height":1024,"widths":[480,800,1024]},"images/apps/zxsnake/zxsnake-leaderboards.png":{"width":1754,"height":779,"widths":[480,800,1200,1600,1754]},"images/apps/zxsnake/zxsnake-tips-and-strategy.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/apps/zxsnake/zxsnake.png":{"width":1300,"height":1024,"widths":[480,800,1200,1300]},"images/apps/zxspace/zxspace-gameplay-01.png":{"width":887,"height":1774,"widths":[480,800,887]},"images/apps/zxspace/zxspace-hero.png":{"width":1659,"height":948,"widths":[480,800,1200,1600,1659]},"images/apps/zxspace/zxspace-icon.png":{"width":1024,"height":1024,"widths":[480,800,1024]},"images/apps/zxspace/zxspace.png":{"width":1413,"height":1113,"widths":[480,800,1200,1413]},"images/contact-bg-banner.png":{"width":1672,"height":941,"widths":[480,800,1200,1600,1672]},"images/home-bg-banner.png":{"width":1717,"height":916,"widths":[480,800,1200,1600,1717]},"images/logos/favicon.png":{"width":64,"height":64,"widths":[64]},"images/logos/logo-black-horizontal.png":{"width":308,"height":119,"widths":[308]},"images/logos/logo-black-icon.png":{"width":241,"height":190,"widths":[241]},"images/logos/logo-black-stacked.png":{"width":234,"height":210,"widths":[234]},"images/logos/social-preview.png":{"width":1942,"height":809,"widths":[480,800,1200,1600,1942]},"images/news-bg-banner.png":{"width":1672,"height":941,"widths":[480,800,1200,1600,1672]},"images/news-hero-banner.png":{"width":1717,"height":916,"widths":[480,800,1200,1600,1717]},"images/otherapps-bg-banner.png":{"width":1536,"height":1024,"widths":[480,800,1200,1536]},"images/placeholder.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"images/privacy-bg-banner.png":{"width":1672,"height":941,"widths":[480,800,1200,1600,1672]},"images/privacy-hero-banner.png":{"width":1717,"height":916,"widths":[480,800,1200,1600,1717]},"images/retro-banner.png":{"width":1536,"height":1024,"widths":[480,800,1200,1536]},"images/service-bg-banner.png":{"width":1717,"height":916,"widths":[480,800,1200,1600,1717]},"images/service-hero-banner.png":{"width":1536,"height":1024,"widths":[480,800,1200,1536]},"images/shared/barkinmadcoins.png":{"width":1727,"height":794,"widths":[480,800,1200,1600,1727]},"images/shared/placeholder.png":{"width":1774,"height":887,"widths":[480,800,1200,1600,1774]},"news/ai-coding/image.png":{"width":1024,"height":1024,"widths":[480,800,1024]},"news/building-game-of-darts/image.png":{"width":1024,"height":800,"widths":[480,800,1024]},"news/building-zxsnake/image.png":{"width":1024,"height":1024,"widths":[480,800,1024]},"news/building-zxspace/image.png":{"width":1024,"height":1024,"widths":[480,800,1024]},"news/creating-retro-style-mobile-games/image.png":{"width":1024,"height":1024,"widths":[480,800,1024]},"news/first-look-zxpong/image.png":{"width":1024,"height":1024,"widths":[480,800,1024]},"news/gameofdarts-update/image.png":{"width":1536,"height":1024,"widths":[480,800,1200,1536]},"news/how-barkinmad-coins-connect-the-zx-series/image.png":{"width":1200,"height":1200,"widths":[480,800,1200]},"news/inside-the-zx-series/image.png":{"width":1200,"height":1200,"widths":[480,800,1200]},"news/introducing-barkinmad-coins/image.png":{"width":1254,"height":1254,"widths":[480,800,1200,1254]},"news/introducing-studiodash/image.png":{"width":1672,"height":941,"widths":[480,800,1200,1600,1672]},"news/language-support/image.png":{"width":1024,"height":1024,"widths":[480,800,1024]},"news/one-year-of-barkinmad-studios/image.png":{"width":1200,"height":1200,"widths":[480,800,1200]},"news/released-zxsnake-zxbrick/image.png":{"width":1024,"height":800,"widths":[480,800,1024]},"news/starting-barkinmad-studios/image.png":{"width":1024,"height":800,"widths":[480,800,1024]},"news/website-relaunch/image.png":{"width":1536,"height":1024,"widths":[480,800,1200,1536]},"news/why-retro-games-still-work/image.png":{"width":1024,"height":900,"widths":[480,800,1024]},"news/zxbrick-powerups/image.png":{"width":1024,"height":1024,"widths":[480,800,1024]},"news/zxsnake-pvp/image.png":{"width":1024,"height":850,"widths":[480,800,1024]}};
  var IMAGE_CACHE_CONTROL = "public, max-age=31536000, immutable";
  var STATIC_CACHE_CONTROL = "public, max-age=86400, stale-while-revalidate=604800";
  var HTML_CACHE_CONTROL = "public, max-age=300, stale-while-revalidate=3600";
  var JSON_CACHE_TTL_MS = 5 * 60 * 1e3;
  var jsonCache = /* @__PURE__ */ new Map();
  var documentationLandingAppSlugs = new Set(["zxsnake", "zxbrick", "zxpong", "zxspace", "gameofdarts", "studiodash"]);
  var zxSnakeReferenceImageFallbacks = {
    overview: "apps/zxsnake/zxsnake-gameplay-01.png",
    "how-to-play": "apps/zxsnake/zxsnake-how-to-play.png",
    controls: "apps/zxsnake/zxsnake-controls.png",
    "game-modes": "apps/zxsnake/zxsnake-game-modes.png",
    achievements: "apps/zxsnake/zxsnake-achievements.png",
    leaderboards: "apps/zxsnake/zxsnake-leaderboards.png",
    "frequently-asked-questions": "apps/zxsnake/zxsnake-faq.png",
    "tips-and-strategy": "images/apps/zxsnake/zxsnake-tips-and-strategy.png",
    guide: "apps/zxsnake/zxsnake-hero.png"
  };
  var sharedDocumentationReferenceImageFallbacks = {
    "barkinmad-coins": "apps/barkinmadcoins.png"
  };
  var appDocumentationReferenceImageFallbacks = {
    zxsnake: zxSnakeReferenceImageFallbacks,
    zxbrick: {
      overview: "apps/zxbrick/zxbrick-gameplay-01.png",
      "how-to-play": "apps/zxbrick/zxbrick-how-to-play.png",
      controls: "apps/zxbrick/zxbrick-controls.png",
      "game-modes": "apps/zxbrick/zxbrick-game-modes.png",
      achievements: "apps/zxbrick/zxbrick-achievements.png",
      leaderboards: "apps/zxbrick/zxbrick-leaderboards.png",
      "frequently-asked-questions": "apps/zxbrick/zxbrick-faq.png",
      "tips-and-strategy": "apps/zxbrick/zxbrick-tips-and-strategy.png",
      levels: "apps/zxbrick/zxbrick-levels.png",
      powerups: "apps/zxbrick/zxbrick-powerups.png",
      guide: "apps/zxbrick/zxbrick-hero.png"
    }
  };
  var SITE_LASTMOD = "2026-07-07";
  var DEFAULT_SITE = {
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
    const rawPath = url.pathname.replace(/\/$/, "") || "/";
    const assetResponse = await imageAssetResponse(request, rawPath);
    if (assetResponse) return assetResponse;
    const path = rawPath.toLowerCase() || "/";
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
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": STATIC_CACHE_CONTROL
          }
        }
      );
    }
    if (path === "/google0b80faf2f8732a53.html") {
      return new Response(
        "google-site-verification: google0b80faf2f8732a53.html",
        {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": STATIC_CACHE_CONTROL
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
      const [homepageData, site, apps, posts] = await Promise.all([
        fetchJson(`${PAGES_BASE}/home.json`),
        getSite(),
        getApps(),
        fetchJson(`${NEWS_BASE}/posts.json`)
      ]);
      const homepage = homepageData || {};
      return pageResponse("BarkinMad Studios", homePage(homepage, apps, posts), {
        site,
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
    if (path === "/portfolio/studiodash") return Response.redirect(`${url.origin}/apps/studiodash`, 301);
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
        if (documentationLandingAppSlugs.has(appPathParts[0]) && appPathParts[1] === "overview") {
          return Response.redirect(`${url.origin}/apps/${appPathParts[0]}`, 301);
        }
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
  __name(handleRequest, "handleRequest");
  function textResponse(body) {
    return new Response(body, {
      headers: {
        "content-type": "text/plain;charset=UTF-8",
        "cache-control": STATIC_CACHE_CONTROL
      }
    });
  }
  __name(textResponse, "textResponse");
  async function pageResponse(title, content, options = {}, status = 200) {
    if (typeof options === "number") {
      status = options;
      options = {};
    }
    const site = options.site || await getSite();
    return new Response(layout(title, content, site, options, status), {
      status,
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": status >= 400 ? "no-store" : HTML_CACHE_CONTROL
      }
    });
  }
  __name(pageResponse, "pageResponse");
  function layout(title, content, site = {}, options = {}, status = 200) {
    const siteName = site.name || DEFAULT_SITE.name;
    const siteDescription = cleanMeta(options.description || site.description || DEFAULT_SITE.description);
    const ogDescription = cleanMeta(options.ogDescription || options.description || site.ogDescription || siteDescription);
    const website = site.website || DEFAULT_SITE.website;
    const canonicalUrl = absoluteSiteUrl(website, options.canonicalPath || "/");
    const socialImage = options.image || `${IMAGE_BASE}/logos/social-preview.png`;
    const robots = options.robots || (status >= 400 ? "noindex,follow" : "index,follow");
    const structuredData = Array.isArray(options.structuredData) ? options.structuredData : options.structuredData ? [options.structuredData] : [organizationSchema(site)];
    const navigation = Array.isArray(site.navigation) && site.navigation.length ? site.navigation : DEFAULT_SITE.navigation;
    const footerNavigation = Array.isArray(site.footerNavigation) && site.footerNavigation.length ? site.footerNavigation : DEFAULT_SITE.footerNavigation;
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

${structuredData.map((schema) => `
<script type="application/ld+json">${escapeJsonForHtml(schema)}<\/script>`).join("")}

<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
</script>
	
<style>
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: "Segoe UI", "Avenir Next", Arial, Helvetica, sans-serif;
  background: radial-gradient(circle at 20% 0%, #131c33 0%, #090d1b 45%, #04070f 100%);
  color: #f4f4f4;
  line-height: 1.65;
}

header {
  background: #000;
  border-bottom: 3px solid #f39c12;
  padding: 0.5rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.site-logo img {
  height: 42px;
  width: auto;
  max-width: min(240px, 70vw);
  object-fit: contain;
  display: block;
}

nav {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.94rem;
  padding: 0.1rem 0.3rem;
}

main a:visited,
footer a:visited {
  color: #c98a1a;
}

nav a:hover { color: #f39c12; }

.hero {
  padding: 4.5rem 2rem 3rem;
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
  font-size: 2.3rem;
  margin-bottom: 1rem;
}

.hero p {
  max-width: 850px;
  margin: auto;
  color: #ddd;
  font-size: 1.02rem;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin: 1.1rem auto 0;
}

.button-group {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  align-items: flex-start;
}

.hero-logo {
  height: 100px;
  width: auto;
  max-width: 90%;
  object-fit: contain;
  margin-bottom: 1.5rem;
}

main {
  max-width: 1320px;
  margin: auto;
  padding: 2.3rem 1.5rem 3rem;
}

section { margin-bottom: 1.5rem; }

h2 { color: #f39c12; }
h3 { color: #ffcc66; }

.docs-main h2,
.docs-main .section-title {
  color: #7de29e;
}

.docs-main h3,
.docs-main .strategy-checklist-heading h3 {
  color: #f39c12;
}

.card {
  background: rgba(20, 26, 43, 0.78);
  border: 1px solid #2f3c5f;
  border-radius: 10px;
  padding: 1rem 1.15rem;
  margin-bottom: 1rem;
  box-shadow: none;
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
  gap: 1rem;
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

.reference-cheat-sheet {
  margin: 32px 0;
}

.reference-cheat-image {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  border: 0;
  border-radius: 0;
  background: none;
  box-shadow: none;
}

.docs-main {
  max-width: 1380px;
}

.docs-panel {
  border: 1px solid #26375b;
  background: rgba(19, 28, 47, 0.86);
  border-radius: 10px;
  padding: 1rem 1.15rem;
}

.docs-block {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.feature-showcase {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1rem;
  align-items: stretch;
}

.feature-showcase + .feature-showcase {
  margin-top: 1rem;
}

.feature-showcase-text {
  min-width: 0;
  min-height: 0;
  overflow: visible;
  padding-bottom: 1.35rem;
}

.feature-showcase-text h2 {
  margin-top: 0;
}

.feature-showcase-text .button-group {
  margin-top: 0.45rem;
  padding-bottom: 0.15rem;
}

.feature-showcase-text .button-group .btn {
  margin-top: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  text-align: center;
}

.feature-showcase-media {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.7rem;
  min-width: 0;
}

.feature-showcase-image {
  width: 100%;
  max-height: 34rem;
  object-fit: contain;
  object-position: center;
  border-radius: 10px;
  border: 1px solid #333858;
  background: #050712;
}

.feature-showcase-caption {
  margin: 0;
  color: #d8dbef;
  font-size: 0.95rem;
}

.feature-showcase[data-layout="textRight"] .feature-showcase-text {
  order: 2;
}

.feature-showcase[data-layout="textRight"] .feature-showcase-media {
  order: 1;
}

.strategy-checklist-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
}

.strategy-checklist-card {
  border: 1px solid #1f8c60;
  background: #101b2a;
  min-height: 0;
}

.docs-main[data-doc-slug="tips-and-strategy"] .strategy-checklist-card-compact {
  padding: 0.65rem 0.8rem;
}

.docs-main[data-doc-slug="tips-and-strategy"] .strategy-checklist-card-compact .docs-block {
  gap: 0.36rem;
}

.strategy-checklist-heading {
  display: flex;
  gap: 0.45rem;
  align-items: center;
}

.strategy-checklist-heading h3,
.strategy-checklist-heading .strategy-checklist-icon {
  color: #6be29f;
}

.strategy-checklist-icon {
  font-size: 1rem;
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
  background: transparent;
  color: #f39c12;
  padding: 0.38rem 0.74rem;
  min-height: 34px;
  border-radius: 999px;
  border: 1px solid #f39c12;
  text-decoration: none;
  font-weight: bold;
  margin-top: 0.75rem;
  width: fit-content;
  line-height: 1.15;
}

.btn:hover { background: #f39c12; color: #090d17; border-color: #ffb347; }

.btn:focus-visible {
  outline: 2px solid #90c8ff;
  outline-offset: 2px;
}

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
  gap: 0.55rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  align-items: center;
}

.guide-nav a {
  border: 1px solid #334065;
  border-radius: 999px;
  color: #f4f4f4;
  padding: 0.32rem 0.78rem;
  font-size: 0.88rem;
  line-height: 1.15;
  text-decoration: none;
}

.guide-nav a[aria-current="page"] {
  background: #f39c12;
  border-color: #f39c12;
  color: #0e111f;
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

.docs-main[data-doc-slug="tips-and-strategy"] .compact-docs .card {
  padding: 0.7rem 0.85rem;
}

.docs-main[data-doc-slug="tips-and-strategy"] .compact-docs .grid {
  gap: 0.75rem;
}

.docs-main[data-doc-slug="tips-and-strategy"] .compact-docs .card .btn {
  margin-top: 0.45rem;
  min-height: 30px;
}

.docs-main[data-doc-slug="tips-and-strategy"] .docs-header-plain .guide-nav {
  margin-top: 0.7rem;
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

.footer-cookie-button {
  appearance: none;
  background: transparent;
  border: 0;
  color: #f39c12;
  cursor: pointer;
  font: inherit;
  margin: 0 0.5rem;
  padding: 0;
  text-decoration: none;
}

.footer-cookie-button:hover {
  color: #ffcc66;
}

.footer-cookie-button:focus-visible {
  outline: 2px solid #90c8ff;
  outline-offset: 4px;
}

.footer-logo {
  height: 56px;
  width: auto;
  display: block;
  margin: 0 auto 0.75rem;
}

.cookie-consent {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 3000;
  width: min(100% - 2rem, 560px);
}

.cookie-consent[hidden],
.cookie-preferences[hidden] {
  display: none;
}

.cookie-consent-panel,
.cookie-preferences-panel {
  background: rgba(8, 12, 24, 0.98);
  border: 1px solid #334065;
  border-radius: 10px;
  box-shadow: 0 18px 54px rgba(0, 0, 0, 0.45);
  color: #f4f4f4;
}

.cookie-consent-panel {
  padding: 1rem;
}

.cookie-consent h2,
.cookie-preferences h2 {
  color: #ffcc66;
  font-size: 1.15rem;
  line-height: 1.25;
  margin: 0 0 0.5rem;
}

.cookie-consent p,
.cookie-preferences p {
  color: #d8dbef;
  font-size: 0.96rem;
  margin: 0 0 0.9rem;
}

.cookie-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.cookie-button {
  align-items: center;
  background: transparent;
  border: 1px solid #f39c12;
  border-radius: 999px;
  color: #f39c12;
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: 700;
  justify-content: center;
  min-height: 38px;
  padding: 0.42rem 0.86rem;
}

.cookie-button-primary {
  background: #f39c12;
  color: #090d17;
}

.cookie-button:hover {
  background: #f39c12;
  border-color: #ffb347;
  color: #090d17;
}

.cookie-button:focus-visible,
.cookie-toggle input:focus-visible {
  outline: 2px solid #90c8ff;
  outline-offset: 3px;
}

.cookie-preferences {
  align-items: center;
  background: rgba(0, 0, 0, 0.68);
  display: flex;
  inset: 0;
  justify-content: center;
  padding: 1rem;
  position: fixed;
  z-index: 3100;
}

.cookie-preferences-panel {
  max-height: min(90vh, 720px);
  max-width: 680px;
  overflow: auto;
  padding: 1.15rem;
  width: 100%;
}

.cookie-category {
  border: 1px solid #26375b;
  border-radius: 8px;
  margin: 0.75rem 0;
  padding: 0.85rem;
}

.cookie-category-header {
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.cookie-category h3 {
  color: #f39c12;
  font-size: 1rem;
  margin: 0;
}

.cookie-category p {
  margin: 0.35rem 0 0;
}

.cookie-toggle {
  align-items: center;
  color: #ffcc66;
  display: inline-flex;
  font-weight: 700;
  gap: 0.45rem;
  white-space: nowrap;
}

.cookie-toggle input {
  accent-color: #f39c12;
  height: 1.15rem;
  width: 1.15rem;
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

  nav {
    justify-content: center;
    margin-top: 0.75rem;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .contents-list {
    columns: 1;
  }

  .guide-nav {
    justify-content: flex-start;
  }

  .prev-next {
    grid-template-columns: 1fr;
  }

  .strategy-checklist-grid {
    grid-template-columns: 1fr;
  }

  .feature-showcase {
    grid-template-columns: 1fr;
  }

  .feature-showcase[data-layout="textRight"] .feature-showcase-text,
  .feature-showcase[data-layout="textRight"] .feature-showcase-media {
    order: initial;
  }

  .feature-showcase-text {
    max-height: none;
    overflow: visible;
  }

  .feature-showcase-image {
    max-height: none;
  }

  .reference-callout {
    flex-direction: column;
    align-items: stretch;
  }

  .reference-callout p {
    max-width: none;
  }

  .docs-main {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .cookie-consent {
    bottom: 0;
    right: 0;
    width: 100%;
  }

  .cookie-consent-panel {
    border-bottom: 0;
    border-left: 0;
    border-radius: 10px 10px 0 0;
    border-right: 0;
  }

  .cookie-actions,
  .cookie-button {
    width: 100%;
  }

  .cookie-category-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
</head>

<body>
<header>
  <a href="/" class="site-logo">
    ${renderImage({ src: "logos/logo-black-horizontal.png", alt: siteName, loading: "eager", sizes: "240px" })}
  </a>

  <nav>
    ${renderLinks(navigation)}
  </nav>
</header>

${content}

<footer>
  ${renderImage({ className: "footer-logo", src: "logos/logo-black-icon.png", alt: siteName, sizes: "56px" })}

  <p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} ${escapeHtml(site.copyright || siteName)}. All rights reserved.</p>

  <p>
    ${renderLinks(footerNavigation)}
    <button class="footer-cookie-button" type="button" data-cookie-preferences-open>Cookie Preferences</button>
    ${site.socials?.facebook ? `<a href="${escapeHtml(site.socials.facebook)}" target="_blank" rel="noopener">Facebook</a>` : ""}
  </p>
</footer>
${renderCookieConsentMarkup()}
${renderCookieConsentScript()}
</body>
</html>`;
  }
  __name(layout, "layout");
  function renderCookieConsentMarkup() {
    return `
<section class="cookie-consent" data-cookie-banner hidden aria-label="Cookie consent">
  <div class="cookie-consent-panel">
    <h2>Cookie Choices</h2>
    <p>BarkinMad Studios uses essential cookies to remember your choices. Analytics and advertising cookies are optional and only load when you allow them.</p>
    <div class="cookie-actions">
      <button class="cookie-button cookie-button-primary" type="button" data-cookie-accept-all>Accept All</button>
      <button class="cookie-button" type="button" data-cookie-reject>Reject Non-Essential</button>
      <button class="cookie-button" type="button" data-cookie-manage>Manage Preferences</button>
    </div>
  </div>
</section>

<section class="cookie-preferences" data-cookie-dialog role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title" hidden>
  <div class="cookie-preferences-panel" tabindex="-1">
    <h2 id="cookie-preferences-title">Cookie Preferences</h2>
    <p>Choose which optional cookies BarkinMad Studios may use on this website. Essential cookies are always enabled because they keep the site and your choices working.</p>

    <div class="cookie-category">
      <div class="cookie-category-header">
        <h3>Essential Cookies</h3>
        <span class="cookie-toggle">Always Enabled</span>
      </div>
      <p>Required for core website operation and for remembering your cookie preferences.</p>
    </div>

    <div class="cookie-category">
      <div class="cookie-category-header">
        <h3>Analytics</h3>
        <label class="cookie-toggle"><input type="checkbox" data-cookie-toggle="analytics"> Allow</label>
      </div>
      <p>Allows Google Analytics to measure page views and general website usage so the website can be improved.</p>
    </div>

    <div class="cookie-category">
      <div class="cookie-category-header">
        <h3>Advertising</h3>
        <label class="cookie-toggle"><input type="checkbox" data-cookie-toggle="advertising"> Allow</label>
      </div>
      <p>Allows Google AdSense advertising storage, ad user data, and ad personalisation signals where advertising is active.</p>
    </div>

    <div class="cookie-actions">
      <button class="cookie-button cookie-button-primary" type="button" data-cookie-save>Save Preferences</button>
      <button class="cookie-button" type="button" data-cookie-dialog-accept-all>Accept All</button>
      <button class="cookie-button" type="button" data-cookie-dialog-reject>Reject Non-Essential</button>
      <button class="cookie-button" type="button" data-cookie-close>Close</button>
    </div>
  </div>
</section>`;
  }
  __name(renderCookieConsentMarkup, "renderCookieConsentMarkup");
  function renderCookieConsentScript() {
    return `
<script>
(function () {
  var COOKIE_NAME = 'bms_cookie_consent';
  var COOKIE_MAX_AGE = 60 * 60 * 24 * 180;
  var GA_ID = '${GOOGLE_ANALYTICS_ID}';
  var ADSENSE_CLIENT = 'ca-pub-2030137443667873';
  var analyticsLoaded = false;
  var adsenseLoaded = false;
  var lastFocus = null;
  var banner = document.querySelector('[data-cookie-banner]');
  var dialog = document.querySelector('[data-cookie-dialog]');
  var dialogPanel = dialog ? dialog.querySelector('.cookie-preferences-panel') : null;
  var analyticsToggle = document.querySelector('[data-cookie-toggle="analytics"]');
  var advertisingToggle = document.querySelector('[data-cookie-toggle="advertising"]');

  function defaultPreferences() {
    return { version: 1, essential: true, analytics: false, advertising: false };
  }

  function readCookie(name) {
    var prefix = name + '=';
    var parts = document.cookie ? document.cookie.split(';') : [];
    for (var i = 0; i < parts.length; i += 1) {
      var part = parts[i].trim();
      if (part.indexOf(prefix) === 0) {
        return part.slice(prefix.length);
      }
    }
    return '';
  }

  function readPreferences() {
    var raw = readCookie(COOKIE_NAME);
    if (!raw) return null;
    try {
      var parsed = JSON.parse(decodeURIComponent(raw));
      return {
        version: 1,
        essential: true,
        analytics: parsed.analytics === true,
        advertising: parsed.advertising === true
      };
    } catch (error) {
      return null;
    }
  }

  function writePreferences(preferences) {
    var value = encodeURIComponent(JSON.stringify({
      version: 1,
      analytics: preferences.analytics === true,
      advertising: preferences.advertising === true
    }));
    var secureAttribute = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = COOKIE_NAME + '=' + value + '; Max-Age=' + COOKIE_MAX_AGE + '; Path=/; SameSite=Lax' + secureAttribute;
  }

  function consentValue(granted) {
    return granted ? 'granted' : 'denied';
  }

  function updateGoogleConsent(preferences) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
      analytics_storage: consentValue(preferences.analytics),
      ad_storage: consentValue(preferences.advertising),
      ad_user_data: consentValue(preferences.advertising),
      ad_personalization: consentValue(preferences.advertising)
    });
  }

  function loadScript(id, src, attributes) {
    if (document.getElementById(id)) return;
    var script = document.createElement('script');
    script.id = id;
    script.async = true;
    script.src = src;
    Object.keys(attributes || {}).forEach(function (key) {
      script.setAttribute(key, attributes[key]);
    });
    document.head.appendChild(script);
  }

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    loadScript('bms-google-analytics', 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID));
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function loadAdsense() {
    if (adsenseLoaded) return;
    adsenseLoaded = true;
    loadScript('bms-google-adsense', 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(ADSENSE_CLIENT), {
      crossorigin: 'anonymous'
    });
  }

  function applyPreferences(preferences) {
    updateGoogleConsent(preferences);
    if (preferences.analytics) loadAnalytics();
    if (preferences.advertising) loadAdsense();
  }

  function setToggles(preferences) {
    if (analyticsToggle) analyticsToggle.checked = preferences.analytics === true;
    if (advertisingToggle) advertisingToggle.checked = preferences.advertising === true;
  }

  function currentDialogPreferences() {
    return {
      version: 1,
      essential: true,
      analytics: analyticsToggle ? analyticsToggle.checked : false,
      advertising: advertisingToggle ? advertisingToggle.checked : false
    };
  }

  function saveAndApply(preferences) {
    writePreferences(preferences);
    setToggles(preferences);
    applyPreferences(preferences);
    hideBanner();
    closeDialog();
  }

  function showBanner() {
    if (banner) banner.hidden = false;
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
  }

  function openDialog() {
    lastFocus = document.activeElement;
    setToggles(readPreferences() || defaultPreferences());
    if (dialog) dialog.hidden = false;
    if (dialogPanel) dialogPanel.focus();
  }

  function closeDialog() {
    if (dialog) dialog.hidden = true;
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  }

  function focusableDialogItems() {
    if (!dialog) return [];
    return Array.prototype.slice.call(dialog.querySelectorAll('button, input, [href], [tabindex]:not([tabindex="-1"])')).filter(function (item) {
      return !item.disabled && item.offsetParent !== null;
    });
  }

  function handleDialogKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDialog();
      return;
    }
    if (event.key !== 'Tab') return;
    var items = focusableDialogItems();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function bind(selector, eventName, handler) {
    Array.prototype.slice.call(document.querySelectorAll(selector)).forEach(function (element) {
      element.addEventListener(eventName, handler);
    });
  }

  var stored = readPreferences();
  if (stored) {
    setToggles(stored);
    applyPreferences(stored);
  } else {
    showBanner();
  }

  bind('[data-cookie-accept-all], [data-cookie-dialog-accept-all]', 'click', function () {
    saveAndApply({ version: 1, essential: true, analytics: true, advertising: true });
  });
  bind('[data-cookie-reject], [data-cookie-dialog-reject]', 'click', function () {
    saveAndApply(defaultPreferences());
  });
  bind('[data-cookie-manage], [data-cookie-preferences-open]', 'click', openDialog);
  bind('[data-cookie-save]', 'click', function () {
    saveAndApply(currentDialogPreferences());
  });
  bind('[data-cookie-close]', 'click', closeDialog);
  if (dialog) dialog.addEventListener('keydown', handleDialogKeydown);
}());
<\/script>`;
  }
  __name(renderCookieConsentScript, "renderCookieConsentScript");
  async function fetchJson(url) {
    const cached = jsonCache.get(url);
    const now = Date.now();
    if (cached && now - cached.time < JSON_CACHE_TTL_MS) {
      return cached.value;
    }
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "BarkinMadStudiosWebsite" },
        cf: { cacheTtl: 300, cacheEverything: true }
      });
      if (!response.ok) return null;
      const value = await response.json();
      jsonCache.set(url, { value, time: now });
      return value;
    } catch {
      return null;
    }
  }
  __name(fetchJson, "fetchJson");
  async function imageAssetResponse(request, rawPath) {
    const assetPath = requestImageAssetPath(rawPath);
    if (!assetPath) return null;
    const manifest = IMAGE_MANIFEST[assetPath];
    const requestUrl = new URL(request.url);
    const accept = request.headers.get("accept") || "";
    const width = parseRequestedImageWidth(requestUrl.searchParams.get("w"));
    const selected = selectImageAssetPath(assetPath, manifest, accept, width);
    let response = await fetchRepoAsset(selected.path);
    let responsePath = selected.path;
    if (!response.ok && selected.path !== assetPath) {
      response = await fetchRepoAsset(assetPath);
      responsePath = assetPath;
    }
    if (!response.ok) return new Response("Not Found", {
      status: 404,
      headers: {
        "content-type": "text/plain;charset=UTF-8",
        "cache-control": "no-store"
      }
    });
    const headers = new Headers(response.headers);
    headers.set("cache-control", IMAGE_CACHE_CONTROL);
    headers.set("content-type", contentTypeForPath(responsePath));
    headers.set("vary", "Accept");
    headers.delete("set-cookie");
    return new Response(response.body, {
      status: response.status,
      headers
    });
  }
  __name(imageAssetResponse, "imageAssetResponse");
  function requestImageAssetPath(rawPath) {
    let pathname = "";
    try {
      pathname = decodeURIComponent(String(rawPath || ""));
    } catch {
      pathname = String(rawPath || "");
    }
    const assetPath = pathname.replace(/^\/+/, "");
    if (!assetPath || assetPath.includes("..")) return "";
    if (!/\.(png|jpe?g)$/i.test(assetPath)) return "";
    if (assetPath.startsWith("images/")) return assetPath;
    if (assetPath.startsWith("news/")) return assetPath;
    return "";
  }
  __name(requestImageAssetPath, "requestImageAssetPath");
  function parseRequestedImageWidth(value) {
    const width = Number.parseInt(String(value || ""), 10);
    return Number.isFinite(width) && width > 0 ? Math.min(width, 2400) : 0;
  }
  __name(parseRequestedImageWidth, "parseRequestedImageWidth");
  function selectImageAssetPath(assetPath, manifest, accept, requestedWidth = 0) {
    const originalType = contentTypeForPath(assetPath);
    if (!manifest) return { path: assetPath, contentType: originalType };
    const format = accept.includes("image/avif") ? "avif" : accept.includes("image/webp") ? "webp" : "";
    if (!format) return { path: assetPath, contentType: originalType };
    const widths = Array.isArray(manifest.widths) && manifest.widths.length ? manifest.widths : [manifest.width].filter(Boolean);
    const selectedWidth = requestedWidth ? widths.find((width) => width >= requestedWidth) || widths[widths.length - 1] : widths[widths.length - 1];
    return {
      path: optimizedImagePath(assetPath, selectedWidth, format),
      contentType: `image/${format}`
    };
  }
  __name(selectImageAssetPath, "selectImageAssetPath");
  function optimizedImagePath(assetPath, width, format) {
    return `images/optimized/${assetPath.replace(/\.(png|jpe?g)$/i, "")}-${width}.${format}`;
  }
  __name(optimizedImagePath, "optimizedImagePath");
  async function fetchRepoAsset(assetPath) {
    return fetch(`${REPO_BASE}/${assetPath}`, {
      headers: { "User-Agent": "BarkinMadStudiosWebsite" },
      cf: { cacheTtl: 31536e3, cacheEverything: true }
    });
  }
  __name(fetchRepoAsset, "fetchRepoAsset");
  function contentTypeForPath(assetPath) {
    if (/\.avif$/i.test(assetPath)) return "image/avif";
    if (/\.webp$/i.test(assetPath)) return "image/webp";
    if (/\.jpe?g$/i.test(assetPath)) return "image/jpeg";
    return "image/png";
  }
  __name(contentTypeForPath, "contentTypeForPath");
  async function getSite() {
    const site = await fetchJson(`${DATA_BASE}/site.json`);
    if (!site || typeof site !== "object") return DEFAULT_SITE;
    return {
      ...DEFAULT_SITE,
      ...site,
      socials: {
        ...DEFAULT_SITE.socials,
        ...site.socials || {}
      }
    };
  }
  __name(getSite, "getSite");
  async function getApps() {
    const apps = await fetchJson(`${DATA_BASE}/apps.json`);
    return Array.isArray(apps) ? apps : [];
  }
  __name(getApps, "getApps");
  function renderLinks(links) {
    if (!Array.isArray(links)) return "";
    return links.filter((link) => link && link.label && link.href).map((link) => {
      const isExternal = /^https?:\/\//i.test(link.href);
      const target = isExternal ? ` target="_blank" rel="noopener"` : "";
      return `<a href="${escapeHtml(link.href)}"${target}>${escapeHtml(link.label)}</a>`;
    }).join("");
  }
  __name(renderLinks, "renderLinks");
  function absoluteSiteUrl(base, path = "/") {
    try {
      return new URL(path, base.endsWith("/") ? base : `${base}/`).toString();
    } catch {
      return `https://www.barkinmad.studio${path.startsWith("/") ? path : `/${path}`}`;
    }
  }
  __name(absoluteSiteUrl, "absoluteSiteUrl");
  function cleanMeta(value, fallback = "") {
    const text = String(value || fallback || "").replace(/\s+/g, " ").trim();
    return text.length > 180 ? `${text.slice(0, 177).trim()}...` : text;
  }
  __name(cleanMeta, "cleanMeta");
  function escapeJsonForHtml(value) {
    return JSON.stringify(value).replaceAll("<", "\\u003c").replaceAll(">", "\\u003e").replaceAll("&", "\\u0026");
  }
  __name(escapeJsonForHtml, "escapeJsonForHtml");
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
  __name(organizationSchema, "organizationSchema");
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
  __name(websiteSchema, "websiteSchema");
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
  __name(serviceSchema, "serviceSchema");
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
  __name(appSchema, "appSchema");
  function howToSchema(page, app, appSlug, detailSlug, site = DEFAULT_SITE, landingPageSlug = "") {
    const steps = Array.isArray(page?.howToSteps) ? page.howToSteps.filter((step) => step?.name || step?.text) : [];
    if (page?.schemaType !== "HowTo" || !steps.length) return null;
    const normalizedAppSlug = String(appSlug || "").trim();
    const normalizedDetailSlug = String(detailSlug || "").trim();
    const normalizedLandingSlug = String(landingPageSlug || "").trim();
    const canonicalPath = getAppDocPath(normalizedAppSlug, normalizedDetailSlug, normalizedLandingSlug);
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: page.title || `${app?.title || app?.name || appSlug} Guide`,
      description: cleanMeta(page.description || page.summary),
      url: absoluteSiteUrl(site.website || DEFAULT_SITE.website, canonicalPath),
      step: steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name || `Step ${index + 1}`,
        text: markdownLinksToText(step.text || step.name || "")
      }))
    };
  }
  __name(howToSchema, "howToSchema");
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
  __name(softwareProjectSchema, "softwareProjectSchema");
  function faqSchema(faqs) {
    const questions = Array.isArray(faqs) ? faqs.filter((item) => item?.question && item?.answer) : [];
    if (!questions.length) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: questions.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: markdownLinksToText(item.answer)
        }
      }))
    };
  }
  __name(faqSchema, "faqSchema");
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
  __name(articleSchema, "articleSchema");
  function isPublishedDate(dateString) {
    const publishedDate = new Date(dateString);
    if (Number.isNaN(publishedDate.getTime())) return false;
    publishedDate.setHours(0, 0, 0, 0);
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    return publishedDate <= today;
  }
  __name(isPublishedDate, "isPublishedDate");
  function projectSchema(projects, site = DEFAULT_SITE) {
    const website = site.website || DEFAULT_SITE.website;
    const items = Array.isArray(projects) ? projects.filter((project) => project?.title) : [];
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
  __name(projectSchema, "projectSchema");
  function breadcrumbSchema(items, site = DEFAULT_SITE) {
    const website = site.website || DEFAULT_SITE.website;
    const itemListElement = items.filter((item) => item && item.name && item.path).map((item, index) => ({
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
  __name(breadcrumbSchema, "breadcrumbSchema");
  function firstParagraph(content) {
    return Array.isArray(content) ? content.find(Boolean) || "" : "";
  }
  __name(firstParagraph, "firstParagraph");
  function articleDescription(article) {
    return cleanMeta(article.excerpt || markdownLinksToText(firstParagraph(article.content)));
  }
  __name(articleDescription, "articleDescription");
  function getAppImage(app) {
    return app.cardImage || app.image || app.icon || "";
  }
  __name(getAppImage, "getAppImage");
  function imageAssetUrl(image, fallback = "") {
    const value = String(image || "").trim();
    if (!value) return fallback;
    if (/^https?:\/\//i.test(value)) return value;
    const normalized = value.replace(/^\/+/, "");
    if (normalized.startsWith("images/")) return `${REPO_BASE}/${normalized}`;
    return `${IMAGE_BASE}/${normalized}`;
  }
  __name(imageAssetUrl, "imageAssetUrl");
  function imageAssetPath(image) {
    const value = String(image || "").trim();
    if (!value) return "";
    if (value.startsWith(REPO_BASE)) return value.slice(REPO_BASE.length + 1);
    if (value.startsWith(IMAGE_BASE)) return `images/${value.slice(IMAGE_BASE.length + 1)}`;
    if (value.startsWith(NEWS_BASE)) return `news/${value.slice(NEWS_BASE.length + 1)}`;
    if (/^https?:\/\//i.test(value)) return "";
    const normalized = value.replace(/^\/+/, "");
    if (normalized.startsWith("images/") || normalized.startsWith("news/")) return normalized;
    return `images/${normalized}`;
  }
  __name(imageAssetPath, "imageAssetPath");
  function imageDisplayUrl(image, fallback = "") {
    const assetPath = imageAssetPath(image);
    if (assetPath && IMAGE_MANIFEST[assetPath]) return `/${assetPath}`;
    if (assetPath && /^(images|news)\//.test(assetPath)) return `/${assetPath}`;
    return imageAssetUrl(image, fallback ? imageDisplayUrl(fallback) : "");
  }
  __name(imageDisplayUrl, "imageDisplayUrl");
  function imageManifestEntry(image, fallback = "") {
    const assetPath = imageAssetPath(image);
    return IMAGE_MANIFEST[assetPath] || (fallback ? IMAGE_MANIFEST[imageAssetPath(fallback)] : null) || null;
  }
  __name(imageManifestEntry, "imageManifestEntry");
  function imageSrcsetAttribute(image, fallback = "", sizes = "") {
    const entry = imageManifestEntry(image, fallback);
    const assetPath = imageAssetPath(image) || imageAssetPath(fallback);
    if (!entry || !assetPath || !Array.isArray(entry.widths) || entry.widths.length < 2) return "";
    const srcset = entry.widths.map((width) => `${escapeHtml(`/${assetPath}?w=${width}`)} ${width}w`).join(", ");
    return ` srcset="${srcset}"${sizes ? ` sizes="${escapeHtml(sizes)}"` : ""}`;
  }
  __name(imageSrcsetAttribute, "imageSrcsetAttribute");
  function imageDimensionAttributes(image, fallback = "") {
    const entry = imageManifestEntry(image, fallback);
    if (!entry?.width || !entry?.height) return "";
    return ` width="${entry.width}" height="${entry.height}"`;
  }
  __name(imageDimensionAttributes, "imageDimensionAttributes");
  function renderImage({ className = "", src = "", alt = "", loading = "lazy", decoding = "async", sizes = "", fallback = "", extra = "" } = {}) {
    const url = imageDisplayUrl(src, fallback);
    if (!url) return "";
    return `<img${className ? ` class="${escapeHtml(className)}"` : ""} src="${escapeHtml(url)}" alt="${escapeHtml(alt)}"${imageDimensionAttributes(src, fallback)}${imageSrcsetAttribute(src, fallback, sizes)}${loading ? ` loading="${escapeHtml(loading)}"` : ""}${decoding ? ` decoding="${escapeHtml(decoding)}"` : ""}${extra}>`;
  }
  __name(renderImage, "renderImage");
  function documentationImageFallbackAttribute() {
    const fallbackUrl = imageDisplayUrl(DOCUMENTATION_PLACEHOLDER_IMAGE);
    return fallbackUrl ? ` onerror="this.onerror=null;this.src='${escapeHtml(fallbackUrl)}';"` : "";
  }
  __name(documentationImageFallbackAttribute, "documentationImageFallbackAttribute");
  function documentationConventionalImagePath(appSlug, detailSlug) {
    const normalizedAppSlug = String(appSlug || "").trim();
    const normalizedDetailSlug = String(detailSlug || "").trim();
    if (!normalizedAppSlug || !normalizedDetailSlug) return "";
    return `apps/${normalizedAppSlug}/${normalizedAppSlug}-${normalizedDetailSlug}.png`;
  }
  __name(documentationConventionalImagePath, "documentationConventionalImagePath");
  function actionLink(action) {
    if (!action || !action.label || !action.href) return "";
    const href = safeLinkHref(action.href);
    if (!href) return "";
    return `<a class="btn" href="${escapeHtml(href)}">${escapeHtml(action.label)}</a>`;
  }
  __name(actionLink, "actionLink");
  function pageHeroImage(page, fallback) {
    const image = String(page?.hero?.image || "").trim();
    if (!image) return fallback;
    if (/^https?:\/\//i.test(image)) return image;
    if (image.startsWith("/")) return `${REPO_BASE}${image}`;
    if (image.startsWith("images/")) return `${REPO_BASE}/${image}`;
    return `${IMAGE_BASE}/${image}`;
  }
  __name(pageHeroImage, "pageHeroImage");
  function heroBackgroundStyle(page) {
    const image = pageHeroImage(page, `${IMAGE_BASE}/retro-banner.png`);
    return ` style="background-image: linear-gradient(rgba(10,10,25,0.78), rgba(10,10,25,0.9)), url('${escapeHtml(imageDisplayUrl(image))}');"`;
  }
  __name(heroBackgroundStyle, "heroBackgroundStyle");
  function renderPromoSection(section) {
    if (!section || !section.title) return "";
    const paragraphs = String(section.description || "").split(/\n+/).map((paragraph) => paragraph.trim()).filter(Boolean);
    return `
<section>
  <h2>${escapeHtml(section.title)}</h2>
  <div class="card">
    ${paragraphs.map((paragraph) => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}
    ${actionLink(section.action)}
  </div>
</section>`;
  }
  __name(renderPromoSection, "renderPromoSection");
  function getZxSeriesApps(apps) {
    return apps.filter((app) => app.series === "zx-series" || /^zx/i.test(app.slug || app.name || ""));
  }
  __name(getZxSeriesApps, "getZxSeriesApps");
  function getNonZxApps(apps) {
    return apps.filter((app) => !getZxSeriesApps([app]).length);
  }
  __name(getNonZxApps, "getNonZxApps");
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
  __name(renderAppCollection, "renderAppCollection");
  function renderLinkCards(title, items) {
    if (!Array.isArray(items) || !items.length) return "";
    return `
<section>
  ${title ? `<h2>${escapeHtml(title)}</h2>` : ""}
  <div class="grid">
    ${items.map((item) => `
      <div class="card">
        <h3>${escapeHtml(item.title || item.heading || item.label || "")}</h3>
        ${item.description ? `<p>${renderContentParagraph(item.description)}</p>` : ""}
        ${item.href ? `<a class="btn" href="${escapeHtml(item.href)}">${escapeHtml(item.actionLabel || item.buttonText || "View Service")}</a>` : ""}
      </div>
    `).join("")}
  </div>
</section>`;
  }
  __name(renderLinkCards, "renderLinkCards");
  function emptyStateCard(text) {
    return text ? `<div class="card"><p>${renderContentParagraph(text)}</p></div>` : "";
  }
  __name(emptyStateCard, "emptyStateCard");
  function homePage(homepage = {}, apps = [], posts = []) {
    const sections = Array.isArray(homepage.sections) ? homepage.sections : [];
    const actions = Array.isArray(homepage.actions) ? homepage.actions : [];
    const featuredProducts = Array.isArray(homepage.featuredProducts) ? homepage.featuredProducts.filter((item) => item?.title) : [];
    const featuredSlugs = Array.isArray(homepage.featuredApps) ? homepage.featuredApps : apps.filter((app) => app.status === "Live").slice(0, 3).map((app) => app.slug);
    const featuredApps = apps.filter((app) => featuredSlugs.includes(app.slug));
    const featuredItems = featuredProducts.length ? featuredProducts : featuredApps;
    const latestPosts = getPublishedValidPosts(posts).slice(0, homepage.newsCount || 3);
    return `
<section class="hero hero-home"${heroBackgroundStyle(homepage)}>
  ${renderImage({ className: "hero-logo", src: "logos/logo-black-stacked.png", alt: "BarkinMad Studios", loading: "eager", sizes: "120px", extra: ' fetchpriority="high"' })}

  <h2>${escapeHtml(homepage.heading || "Retro Games & Mobile Apps")}</h2>

  <p>${renderContentParagraph(homepage.intro || "Retro-inspired arcade games and modern mobile apps for iPhone and iPad.")}</p>

  <div class="hero-actions">
    ${actions.map((action) => actionLink(action)).join("")}
  </div>
</section>

<main>
${featuredItems.length ? `
<section>
  <h2>${escapeHtml(homepage.featuredAppsTitle || "Featured Apps")}</h2>
  <div class="grid">${featuredItems.map((item) => featuredProducts.length ? productCard(item) : appFullCard(item)).join("")}</div>
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
  __name(homePage, "homePage");
  function renderHomeServicesSection(section) {
    if (!section || !Array.isArray(section.items) || !section.items.length) return "";
    return `
<section>
  <h2>${escapeHtml(section.title || "Software & Development Services")}</h2>
  ${section.intro ? `<p>${renderContentParagraph(section.intro)}</p>` : ""}
  <div class="grid">
    ${section.items.map((item) => {
      const actionLabel = item.actionLabel || `Learn about ${item.title}`;
      return `
      <div class="card">
        <h3>${escapeHtml(item.title)}</h3>
        ${item.summary ? `<p>${renderContentParagraph(item.summary)}</p>` : ""}
        ${item.href ? `<a class="btn" href="${escapeHtml(item.href)}">${escapeHtml(actionLabel)}</a>` : ""}
      </div>
    `;
    }).join("")}
  </div>
  ${section.action ? actionLink(section.action) : ""}
</section>`;
  }
  __name(renderHomeServicesSection, "renderHomeServicesSection");
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
    ${features.length ? `<ul>${features.map((feature) => `<li>${renderContentParagraph(feature)}</li>`).join("")}</ul>` : ""}
    ${section.action ? actionLink(section.action) : ""}
  </div>
</section>`;
  }
  __name(renderHomeZxSection, "renderHomeZxSection");
  function productCard(product) {
    if (!product || !product.title) return "";
    const image = getAppImage(product);
    return `
<div class="card">
  ${image ? `
    ${renderImage({ className: "game-image", src: image, alt: product.title, sizes: "(max-width: 700px) calc(100vw - 3rem), (max-width: 1000px) calc((100vw - 4rem) / 2), 420px" })}
  ` : ""}

  ${product.type ? `<span class="badge">${escapeHtml(product.type)}</span>` : ""}

  <h3>${escapeHtml(product.title)}</h3>

  ${product.description ? `<p>${renderContentParagraph(product.description)}</p>` : ""}
  ${product.status ? `<p><strong>Status:</strong> ${escapeHtml(product.status)}</p>` : ""}

  ${product.href ? actionLink({ label: product.actionLabel || `Open ${product.title || "Product"} Page`, href: product.href }) : ""}
</div>`;
  }
  __name(productCard, "productCard");
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
  __name(appsPage, "appsPage");
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
  __name(nonZxAppsPage, "nonZxAppsPage");
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
  __name(zxSeriesPage, "zxSeriesPage");
  function renderParagraphs(content) {
    const paragraphs = Array.isArray(content) ? content : content ? [content] : [];
    return paragraphs.filter((paragraph) => paragraph !== null && paragraph !== void 0 && String(paragraph).trim()).map((paragraph) => `<p>${renderContentParagraph(paragraph)}</p>`).join("");
  }
  __name(renderParagraphs, "renderParagraphs");
  function renderContentSections(sections) {
    if (!Array.isArray(sections) || !sections.length) return "";
    return sections.map((section) => `

<section>

  <h2>${escapeHtml(section.heading || section.title)}</h2>

  <div class="card">

    ${(section.paragraphs || []).map((paragraph) => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}

    ${Array.isArray(section.list) ? `

      <ul>

        ${section.list.map((item) => `<li>${renderContentParagraph(item)}</li>`).join("")}

      </ul>

    ` : ""}

    ${Array.isArray(section.links) ? `

      <div class="button-group">${section.links.map(actionLink).join("")}</div>

    ` : ""}

  </div>

</section>

`).join("");
  }
  __name(renderContentSections, "renderContentSections");
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
    <ul>${games.map((game) => `<li><strong>${escapeHtml(game.name || game.title)}</strong>${game.status ? ` - ${escapeHtml(game.status)}` : ""}</li>`).join("")}</ul>
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
    ${hasAchievements ? `<ul>${achievements.map((item) => `<li><strong>${escapeHtml(item.title || item.name || item.id)}</strong>${item.description ? ` - ${renderContentParagraph(item.description)}` : ""}</li>`).join("")}</ul>` : ""}
  </div>
</section>` : ""}

${(hasLeaderboards || content.leaderboardsDescription) && content.leaderboardsTitle ? `
<section>
  <h2>${escapeHtml(content.leaderboardsTitle)}</h2>
  <div class="card">
    ${renderParagraphs(content.leaderboardsDescription)}
    ${hasLeaderboards ? `<ul>${leaderboards.map((item) => `<li><strong>${escapeHtml(item.title || item.name || item.id)}</strong>${item.description ? ` - ${renderContentParagraph(item.description)}` : ""}</li>`).join("")}</ul>` : ""}
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
  __name(renderSharedSystems, "renderSharedSystems");
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
  __name(renderRoadmapSection, "renderRoadmapSection");
  function renderRoadmapContent(labels, roadmap) {
    if (!roadmap || typeof roadmap !== "object") return "";
    const live = Array.isArray(roadmap.live) ? roadmap.live : [];
    const development = Array.isArray(roadmap.development) ? roadmap.development : [];
    const planned = Array.isArray(roadmap.planned) ? roadmap.planned : [];
    if (!live.length && !development.length && !planned.length) return "";
    return `
<h3>${escapeHtml(labels.roadmapTitle)}</h3>
${renderParagraphs(labels.roadmapDescription)}
${live.length && labels.roadmapLiveTitle ? `<p><strong>${escapeHtml(labels.roadmapLiveTitle)}:</strong></p><ul>${live.map((item) => `<li>${renderContentParagraph(item)}</li>`).join("")}</ul>` : ""}
${development.length && labels.roadmapDevelopmentTitle ? `<p><strong>${escapeHtml(labels.roadmapDevelopmentTitle)}:</strong></p><ul>${development.map((item) => `<li>${renderContentParagraph(item)}</li>`).join("")}</ul>` : ""}
${planned.length && labels.roadmapPlannedTitle ? `<p><strong>${escapeHtml(labels.roadmapPlannedTitle)}:</strong></p><ul>${planned.map((item) => `<li>${renderContentParagraph(item)}</li>`).join("")}</ul>` : ""}`;
  }
  __name(renderRoadmapContent, "renderRoadmapContent");
  function appFullCard(app) {
    const image = getAppImage(app);
    const detailHref = app.href || (app.slug ? `/apps/${app.slug}` : "");
    return `
<div class="card">
  ${image ? `
    ${renderImage({ className: "game-image", src: image, alt: app.name || app.title, sizes: "(max-width: 700px) calc(100vw - 3rem), (max-width: 1000px) calc((100vw - 4rem) / 2), 420px" })}
  ` : ""}

  ${app.type ? `<span class="badge">${escapeHtml(app.type)}</span>` : ""}

  <h3>${escapeHtml(app.name || app.title)}</h3>

  <p>${renderContentParagraph(app.description || app.shortDescription || "")}</p>

  ${app.status ? `<p><strong>Status:</strong> ${escapeHtml(app.status)}</p>` : ""}

  <div style="display:flex;gap:1rem;flex-wrap:wrap;">
    ${detailHref ? `<a class="btn" href="${escapeHtml(detailHref)}">Open ${escapeHtml(app.name || app.title)} App Page</a>` : ""}

    ${app.appStoreUrl ? `
      <a class="btn" href="${escapeHtml(app.appStoreUrl)}" target="_blank" rel="noopener">View on App Store</a>
    ` : ""}

    ${app.testFlightUrl ? `
      <a class="btn" href="${escapeHtml(app.testFlightUrl)}" target="_blank" rel="noopener">Join TestFlight</a>
    ` : ""}
  </div>
</div>`;
  }
  __name(appFullCard, "appFullCard");
  async function appJsonPage(slug) {
    const normalizedSlug = String(slug || "").trim();
    const apps = await getApps();
    const listed = apps.some((app2) => app2.slug === normalizedSlug);
    if (!listed) {
      return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
    }
    const usesDocumentationLanding = documentationLandingAppSlugs.has(normalizedSlug);
    const docsIndex = usesDocumentationLanding ? await fetchJson(`${PAGES_BASE}/apps/${normalizedSlug}/pages.json`) : null;
    const app = usesDocumentationLanding ? await getDocumentationAppMetadata(docsIndex, normalizedSlug) : await fetchJson(`${PAGES_BASE}/apps/${normalizedSlug}.json`);
    if (!app) {
      return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
    }
    const appTitle = app.title || app.name || normalizedSlug;
    if (usesDocumentationLanding) {
      const landingPageSlug = typeof docsIndex?.landingPage === "string" ? docsIndex.landingPage.trim() : "";
      const normalizedLandingSlug = /^[a-z0-9-]+$/.test(landingPageSlug) ? landingPageSlug : "overview";
      const landingContentSlug = normalizedLandingSlug || "overview";
      const landingPage = await fetchJson(`${PAGES_BASE}/apps/${normalizedSlug}/${landingContentSlug}.json`);
      if (landingPage) {
        const title = landingPage.seoTitle || `${landingPage.title || appTitle} - BarkinMad Studios`;
        const structuredData = [
          appSchema(app, normalizedSlug),
          faqSchema(landingPage.faq),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Apps", path: "/apps" },
            { name: appTitle, path: `/apps/${normalizedSlug}` },
            { name: landingPage.title || appTitle, path: `/apps/${normalizedSlug}` }
          ])
        ].filter(Boolean);
        return pageResponse(title, renderAppDocumentationPage(app, landingPage, docsIndex, normalizedSlug, landingContentSlug, landingContentSlug, {
          landingRoute: true
        }), {
          canonicalPath: `/apps/${normalizedSlug}`,
          description: landingPage.description || app.description || app.shortDescription,
          image: appDocumentationImage(landingPage, app),
          ogType: "website",
          structuredData
        });
      }
    }
    const relatedApps = apps.filter((item) => item.slug && item.slug !== normalizedSlug).slice(0, 3);
    const structuredData = [
      appSchema(app, normalizedSlug),
      faqSchema(app.faq),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Apps", path: "/apps" },
        { name: app.title || app.name || normalizedSlug, path: `/apps/${normalizedSlug}` }
      ])
    ].filter(Boolean);
    return pageResponse(`${app.title || app.name} - BarkinMad Studios`, renderAppPage(app, relatedApps), {
      canonicalPath: `/apps/${normalizedSlug}`,
      description: app.description || app.shortDescription,
      image: imageAssetUrl(app.heroImage, `${IMAGE_BASE}/logos/social-preview.png`),
      ogType: "website",
      structuredData
    });
  }
  __name(appJsonPage, "appJsonPage");
  async function appDocumentationJsonPage(appSlug, detailSlug) {
    const normalizedAppSlug = String(appSlug || "").trim();
    const normalizedDetailSlug = String(detailSlug || "").trim();
    if (!/^[a-z0-9-]+$/.test(normalizedAppSlug) || !/^[a-z0-9-]+$/.test(normalizedDetailSlug)) {
      return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
    }
    const apps = await getApps();
    const listedApp = apps.find((app2) => app2.slug === normalizedAppSlug);
    if (!listedApp) {
      return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), 404);
    }
    const pageIndex = await fetchJson(`${PAGES_BASE}/apps/${normalizedAppSlug}/pages.json`);
    const indexPages = Array.isArray(pageIndex?.pages) ? pageIndex.pages : [];
    const usesDocumentationLanding = documentationLandingAppSlugs.has(normalizedAppSlug);
    const normalizedDisplayPages = usesDocumentationLanding ? normaliseZxSnakeGuidePages(indexPages, normalizedAppSlug) : indexPages;
    let listedPage = normalizedDisplayPages.find((page2) => page2?.slug === normalizedDetailSlug);
    if (!listedPage && usesDocumentationLanding && normalizedDetailSlug === "guide") {
      listedPage = { slug: "guide", title: "Guide", description: `Complete ${listedApp.name || normalizedAppSlug} walkthrough and key systems reference.` };
    }
    if (!listedPage && usesDocumentationLanding && normalizedDetailSlug === "screenshots") {
      listedPage = { slug: "screenshots", title: "Screenshots", description: `${listedApp.name || normalizedAppSlug} gameplay screenshots.` };
    }
    const pageLookupSlug = usesDocumentationLanding && normalizedDetailSlug === "screenshots" ? "screenshots" : normalizedDetailSlug;
    if (!listedPage) {
      return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), {
        canonicalPath: `/apps/${normalizedAppSlug}/${normalizedDetailSlug}`,
        robots: "noindex,follow"
      }, 404);
    }
    const app = usesDocumentationLanding ? await getDocumentationAppMetadata(pageIndex, normalizedAppSlug) : await fetchJson(`${PAGES_BASE}/apps/${normalizedAppSlug}.json`);
    const pageUrl = `${PAGES_BASE}/apps/${normalizedAppSlug}/${pageLookupSlug}.json`;
    let page = await fetchJson(pageUrl);
    if (!page && usesDocumentationLanding && normalizedDetailSlug === "guide") {
      page = await fetchJson(`${PAGES_BASE}/apps/${normalizedAppSlug}/guide.json`);
    }
    if (!app || !page) {
      return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), {
        canonicalPath: `/apps/${normalizedAppSlug}/${normalizedDetailSlug}`,
        robots: "noindex,follow"
      }, 404);
    }
    const site = await getSite();
    const title = page.seoTitle || `${page.title || listedPage.title} - BarkinMad Studios`;
    const landingPageSlug = typeof pageIndex?.landingPage === "string" ? pageIndex.landingPage.trim() : "";
    const resolvedCanonicalPath = getAppDocPath(normalizedAppSlug, normalizedDetailSlug, landingPageSlug);
    const structuredData = [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Apps", path: "/apps" },
        { name: app.title || app.name || listedApp.name || normalizedAppSlug, path: `/apps/${normalizedAppSlug}` },
        { name: page.title || listedPage.title || normalizedDetailSlug, path: resolvedCanonicalPath }
      ], site),
      faqSchema(page.faq),
      howToSchema(page, app, normalizedAppSlug, normalizedDetailSlug, site, landingPageSlug)
    ].filter(Boolean);
    return pageResponse(title, renderAppDocumentationPage(app, page, pageIndex, normalizedAppSlug, normalizedDetailSlug, landingPageSlug, {
      landingRoute: usesDocumentationLanding && normalizedDetailSlug === "overview"
    }), {
      canonicalPath: resolvedCanonicalPath,
      description: page.description || listedPage.description || page.summary,
      image: appDocumentationImage(page, app),
      ogType: "website",
      structuredData
    });
  }
  __name(appDocumentationJsonPage, "appDocumentationJsonPage");
  function appDocumentationImage(page, app) {
    return imageAssetUrl(page?.heroImage || app?.heroImage, `${IMAGE_BASE}/logos/social-preview.png`);
  }
  __name(appDocumentationImage, "appDocumentationImage");
  function renderAppDocumentationPage(app, page, pageIndex, appSlug, detailSlug, landingPageSlug = "", options = {}) {
    const title = page.title || "App Guide";
    const isTipsAndStrategyPage = appSlug === "zxsnake" && detailSlug === "tips-and-strategy";
    const usesDocumentationLanding = documentationLandingAppSlugs.has(appSlug);
    const usesDocumentationFramework = usesDocumentationLanding || Array.isArray(pageIndex?.pages);
    const isDocumentationScreenshotPage = usesDocumentationFramework && detailSlug === "screenshots";
    const isDocumentationOverviewPage = usesDocumentationFramework && (detailSlug === "overview" || options.landingRoute === true || isDocumentationScreenshotPage);
    const isDocumentationGuidePage = usesDocumentationFramework && detailSlug === "guide";
    const hideBottomGuideSections = usesDocumentationFramework;
    const sections = Array.isArray(page.sections) ? page.sections : [];
    const relatedLinks = Array.isArray(page.relatedLinks) ? page.relatedLinks.filter((link) => link && typeof link === "object").map((link) => {
      const rawHref = safeLinkHref(link.href);
      const landingHref = landingPageSlug ? `/apps/${appSlug}/${landingPageSlug}` : "";
      const href = rawHref === landingHref ? `/apps/${appSlug}` : rawHref;
      return { ...link, href };
    }) : [];
    const normalizeImageEntries = (images) => {
      if (!Array.isArray(images)) return [];
      return images.filter((image) => image).map((image) => typeof image === "string" ? { src: image } : image).filter((image) => image?.src);
    };
    const normalizeFeatureShowcases = (showcases) => {
      if (!Array.isArray(showcases)) return [];
      return showcases.filter((showcase) => showcase && typeof showcase === "object").map((showcase) => {
        const image = showcase.image && typeof showcase.image === "object" ? showcase.image : {};
        const src = showcase.imageSrc || showcase.src || image.src || "";
        const alt = showcase.imageAlt || showcase.alt || image.alt || "";
        return { ...showcase, image: { ...image, src, alt, caption: showcase.caption || image.caption || "" } };
      }).filter((showcase) => showcase.heading && showcase.image.src);
    };
    const pageImages = normalizeImageEntries(page.images);
    const screenshotEntries = normalizeImageEntries(page.screenshots);
    const featureShowcases = normalizeFeatureShowcases(page.featureShowcases);
    const hasRenderableBodyContent = Boolean(sections.length || featureShowcases.length || page.faq?.length);
    const isDocumentationImageOnlyPage = usesDocumentationFramework && !isDocumentationGuidePage && detailSlug !== "overview" && !hasRenderableBodyContent;
    const images = isTipsAndStrategyPage ? [] : pageImages;
    const inlineReferenceImage = page.referenceImage && typeof page.referenceImage === "object" ? {
      ...(page.referenceImage || {}),
      ...(isTipsAndStrategyPage && !page.referenceImage.displayMode ? { displayMode: "reference-cheat-sheet" } : {})
    } : null;
    const isReferenceCheatSheetImage = (image) => {
      const layout = String(image?.displayMode || image?.variant || image?.type || "").toLowerCase().replace(/_/g, "-");
      if (isTipsAndStrategyPage && image?.src === inlineReferenceImage?.src && !layout) return true;
      return layout === "reference-cheat-sheet";
    };
    const appReferenceFallbacks = appDocumentationReferenceImageFallbacks[appSlug] || {};
    const metadataImages = normalizeImageEntries(page.imageMetadata);
    const explicitDocumentationImageSrc = page.referenceImage?.src || "";
    const documentationReferenceImageSrc = usesDocumentationFramework && !isDocumentationOverviewPage && !featureShowcases.length
      ? explicitDocumentationImageSrc
        || sharedDocumentationReferenceImageFallbacks[detailSlug]
        || appReferenceFallbacks[detailSlug]
        || pageImages[0]?.src
        || metadataImages[0]?.src
        || documentationConventionalImagePath(appSlug, detailSlug)
        || page.heroImage
        || DOCUMENTATION_PLACEHOLDER_IMAGE
      : "";
    const referenceImages = featureShowcases.length ? [] : isTipsAndStrategyPage ? (inlineReferenceImage?.src ? [{ ...inlineReferenceImage }] : []) : isDocumentationOverviewPage ? [] : [
      ...(inlineReferenceImage?.src ? [{ ...inlineReferenceImage }] : []),
      ...images.filter(isReferenceCheatSheetImage)
    ].filter((image, index, array) => index === array.findIndex((item) => item?.src === image?.src));
    const regularImages = usesDocumentationFramework
      ? featureShowcases.length ? [] : isDocumentationOverviewPage || isDocumentationScreenshotPage ? [...pageImages, ...screenshotEntries] : []
      : images.filter((image) => !isReferenceCheatSheetImage(image));
    const otherDocs = usesDocumentationLanding ? normaliseZxSnakeGuidePages(Array.isArray(pageIndex?.pages) ? pageIndex.pages : [], appSlug) : Array.isArray(pageIndex?.pages) ? pageIndex.pages.filter((item) => item?.slug && item.title) : [];
    const currentIndex = otherDocs.findIndex((item) => item.slug === detailSlug);
    const previousDoc = currentIndex > 0 ? otherDocs[currentIndex - 1] : null;
    const nextDoc = currentIndex >= 0 && currentIndex < otherDocs.length - 1 ? otherDocs[currentIndex + 1] : null;
  const appTitle = app.title || app.name || "App";
  const sectionLinks = sections.map((section) => ({
      id: section.id || slugify(section.heading || section.title || ""),
      label: section.heading || section.title || ""
    })).filter((item) => item.id && item.label);
  const hideContentsForPage = usesDocumentationFramework && [
    "overview",
    "how-to-play",
    "controls",
    "game-modes",
    "barkinmad-coins",
    "achievements",
    "leaderboards",
    "tips-and-strategy",
    "frequently-asked-questions",
    "levels",
    "powerups",
    "screenshots"
  ].includes(detailSlug);
    const strategySectionTitles = new Set([
      "before each session",
      "during your run",
      "after each session"
    ]);
    const normaliseSectionTitle = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
    const isStrategySection = (section) => strategySectionTitles.has(normaliseSectionTitle(section?.heading || section?.title || ""));
    const strategySections = isTipsAndStrategyPage || isDocumentationImageOnlyPage ? [] : sections.filter(isStrategySection);
    const remainingSections = sections.filter((section) => !isStrategySection(section));
    const strategyIconFor = (title) => {
      const sectionLabel = normaliseSectionTitle(title);
      if (sectionLabel === "before each session") return "🧭";
      if (sectionLabel === "during your run") return "⚡";
      return "✅";
    };
    const hasContentHeadings = sections.some((section) => Boolean(section?.heading || section?.title));
    const hasSectionContent = Boolean(hasContentHeadings || strategySections.length || regularImages.length || page.faq?.length);
    const screenshotSectionTitle = isDocumentationOverviewPage || isDocumentationScreenshotPage ? "Screenshots" : page.imageSectionTitle || "Images";
    const renderSectionContent = (section) => {
      const sectionId = section.id || section.heading || section.title ? section.id || slugify(section.heading || section.title || "") : "";
      const sectionTitle = section.heading || section.title || "";
      const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : [];
      const bullets = Array.isArray(section.bullets) ? section.bullets : [];
      if (!sectionTitle && !paragraphs.length && !bullets.length) return "";
      return `
<section>
    ${sectionTitle ? `<h2 class="section-title"${sectionId ? ` id="${escapeHtml(sectionId)}"` : ""}>${escapeHtml(sectionTitle)}</h2>` : ""}
  <div class="docs-panel docs-block">
    ${paragraphs.map((paragraph) => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}
    ${bullets.length ? `
      <ul>
        ${bullets.map((item) => `<li>${renderContentParagraph(item)}</li>`).join("")}
      </ul>
    ` : ""}
  </div>
</section>`;
    };
    const renderFeatureShowcase = (showcase, index) => {
      const image = showcase.image || {};
      const layout = showcase.layout === "textRight" ? "textRight" : "textLeft";
      const sectionId = showcase.id || slugify(showcase.heading || `feature-showcase-${index + 1}`);
      const paragraphs = [
        ...(showcase.summary ? [showcase.summary] : []),
        ...(showcase.body ? Array.isArray(showcase.body) ? showcase.body : [showcase.body] : []),
        ...(Array.isArray(showcase.paragraphs) ? showcase.paragraphs : [])
      ].filter((paragraph) => paragraph !== null && paragraph !== void 0 && String(paragraph).trim());
      const bullets = Array.isArray(showcase.bullets) ? showcase.bullets : Array.isArray(showcase.bulletPoints) ? showcase.bulletPoints : [];
      const links = Array.isArray(showcase.links) ? showcase.links : Array.isArray(showcase.internalLinks) ? showcase.internalLinks : [];
      return `
<article class="feature-showcase" data-layout="${escapeHtml(layout)}" id="${escapeHtml(sectionId)}">
  <div class="docs-panel docs-block feature-showcase-text">
    <h2 class="section-title">${escapeHtml(showcase.heading)}</h2>
    ${paragraphs.map((paragraph) => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}
    ${bullets.length ? `
      <ul>
        ${bullets.map((item) => `<li>${renderContentParagraph(item)}</li>`).join("")}
      </ul>
    ` : ""}
    ${links.length ? `<div class="button-group">${links.map(actionLink).join("")}</div>` : ""}
  </div>
  <figure class="docs-panel feature-showcase-media">
    ${renderImage({ className: "feature-showcase-image", src: image.src, fallback: DOCUMENTATION_PLACEHOLDER_IMAGE, alt: image.alt || showcase.heading, sizes: "(max-width: 750px) calc(100vw - 4.3rem), 650px", extra: documentationImageFallbackAttribute() })}
    ${image.caption ? `<figcaption class="feature-showcase-caption">${renderContentParagraph(image.caption)}</figcaption>` : ""}
  </figure>
</article>`;
    };
    return `
<main class="docs-main" data-doc-slug="${escapeHtml(detailSlug)}">
<section${isTipsAndStrategyPage ? ' class="docs-header-plain"' : ""}>
  <div class="docs-panel docs-block">
    ${renderBreadcrumbs([
      { label: "Home", href: "/" },
      { label: "Apps", href: "/apps" },
      { label: appTitle, href: `/apps/${appSlug}` },
      { label: title }
    ])}
    ${renderGuideNavigation(otherDocs, appSlug, detailSlug, landingPageSlug)}
  </div>
</section>

${sectionLinks.length > 1 && !isTipsAndStrategyPage && !hideContentsForPage ? `
<section>
  <h2 class="section-title">Contents</h2>
  <div class="docs-panel">
    <ul class="contents-list">
      ${sectionLinks.map((item) => `<li><a href="#${escapeHtml(item.id)}">${escapeHtml(item.label)}</a></li>`).join("")}
    </ul>
  </div>
</section>` : ""}

${!isDocumentationImageOnlyPage ? remainingSections.map((section) => renderSectionContent(section)).join("") : ""}

${featureShowcases.length ? `
<section>
  ${featureShowcases.map(renderFeatureShowcase).join("")}
</section>` : ""}

${strategySections.length ? `
<section>
  <div class="strategy-checklist-grid">
    ${strategySections.map((section) => `
      <article class="docs-panel strategy-checklist-card ${isTipsAndStrategyPage ? "strategy-checklist-card-compact" : ""}" id="${escapeHtml(section.id || slugify(section.heading || section.title || ""))}">
        <div class="strategy-checklist-heading">
          <span class="strategy-checklist-icon" aria-hidden="true">${escapeHtml(strategyIconFor(section.heading || section.title))}</span>
          <h3>${escapeHtml(section.heading || section.title || "")}</h3>
        </div>
        <div class="docs-block">
          ${(Array.isArray(section.paragraphs) ? section.paragraphs : []).map((paragraph) => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}
          ${Array.isArray(section.bullets) && section.bullets.length ? `
            <ul>
              ${section.bullets.map((item) => `<li>${renderContentParagraph(item)}</li>`).join("")}
            </ul>
          ` : ""}
        </div>
      </article>
    `).join("")}
  </div>
</section>` : ""}

${usesDocumentationFramework && documentationReferenceImageSrc ? `
<section class="reference-cheat-sheet">
  ${renderImage({ className: "reference-cheat-image", src: documentationReferenceImageSrc, fallback: DOCUMENTATION_PLACEHOLDER_IMAGE, alt: page.referenceImage?.alt || title, sizes: "(max-width: 1380px) calc(100vw - 3rem), 1320px", extra: documentationImageFallbackAttribute() })}
</section>`
  : (referenceImages.length ? `
<section class="reference-cheat-sheet">
  ${referenceImages.map((image) => {
    const imageUrl = imageAssetUrl(image.src);
    if (!imageUrl) return "";
    return `
  ${!hasSectionContent && image === referenceImages[0] ? `<h2 class="section-title">${escapeHtml(image.alt || title)}</h2>` : ""}
  ${renderImage({ className: "reference-cheat-image", src: imageUrl, alt: image.alt || title, sizes: "(max-width: 1380px) calc(100vw - 3rem), 1320px", extra: documentationImageFallbackAttribute() })}
`;
  }).join("")}
</section>` : "")}

${(previousDoc || nextDoc) && !hideBottomGuideSections ? `
<section class="compact-docs">
  <h2>Previous / Next</h2>
  <div class="prev-next">
    ${previousDoc ? renderGuideStepCard("Previous", previousDoc, appSlug, landingPageSlug) : `<div></div>`}
    ${nextDoc ? renderGuideStepCard("Next", nextDoc, appSlug, landingPageSlug) : `<div></div>`}
  </div>
</section>` : ""}

${relatedLinks.length && !hideBottomGuideSections ? `
<section class="compact-docs">
  <h2>Related Links</h2>
  <div class="grid">
    ${relatedLinks.map((link) => `
      <div class="card">
        <h3>${escapeHtml(link.label || "Related Link")}</h3>
        ${link.description ? `<p>${renderContentParagraph(link.description)}</p>` : ""}
        ${link.href ? `<a class="btn" href="${escapeHtml(link.href)}">Open ${escapeHtml(link.label || "Related Link")}</a>` : ""}
      </div>
    `).join("")}
  </div>
</section>` : ""}

${otherDocs.length && !hideBottomGuideSections ? `
<section class="compact-docs">
  <h2>${escapeHtml(pageIndex?.title || "Guides")}</h2>
  <div class="grid">
    ${otherDocs.map((item) => `
      <div class="card">
        <h3>${escapeHtml(item.title)}</h3>
        ${item.description ? `<p>${renderContentParagraph(item.description)}</p>` : ""}
        <a class="btn" href="/apps/${escapeHtml(appSlug)}/${escapeHtml(item.slug)}">Open ${escapeHtml(item.title)} Guide</a>
      </div>
    `).join("")}
  </div>
</section>` : ""}

${regularImages.length ? `
<section>
  <h2 class="section-title">${escapeHtml(screenshotSectionTitle)}</h2>
  <div class="grid">
    ${regularImages.map((image) => `
      <div class="card">
        ${renderImage({ className: "screenshot-image", src: image.src, fallback: DOCUMENTATION_PLACEHOLDER_IMAGE, alt: image.alt || title, sizes: "(max-width: 700px) calc(100vw - 5rem), 420px", extra: documentationImageFallbackAttribute() })}
        ${image.caption ? `<p>${renderContentParagraph(image.caption)}</p>` : ""}
      </div>
    `).join("")}
  </div>
</section>` : ""}

${!isDocumentationImageOnlyPage ? renderFaqSection(page.faq) : ""}
</main>`;
  }
  __name(renderAppDocumentationPage, "renderAppDocumentationPage");
  function renderBreadcrumbs(items) {
    const entries = Array.isArray(items) ? items.filter((item) => item?.label) : [];
    if (!entries.length) return "";
    return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      ${entries.map((item, index) => {
      const isLast = index === entries.length - 1 || !item.href;
      const separator = index > 0 ? `<span class="breadcrumb-separator" aria-hidden="true">/</span>` : "";
      const crumb = isLast ? `<span aria-current="page">${escapeHtml(item.label)}</span>` : `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`;
      return `${separator}${crumb}`;
    }).join("")}
    </nav>`;
  }
  __name(renderBreadcrumbs, "renderBreadcrumbs");
  function normaliseZxSnakeGuidePages(pages, appSlug = "") {
    const normalizedAppSlug = String(appSlug || "").trim();
    if (!documentationLandingAppSlugs.has(normalizedAppSlug)) return Array.isArray(pages) ? pages.filter((item) => item?.slug && item.title) : [];
    const filtered = Array.isArray(pages) ? pages.filter((item) => item?.slug && item.title) : [];
    const hasScreenshot = filtered.some((item) => item.slug === "screenshots");
    const hasGuide = filtered.some((item) => item.slug === "guide");
    const appTitle = normalizedAppSlug === "zxbrick" ? "ZXBrick" : "ZXSnake";
    const extras = [];
    if (!hasScreenshot) {
      extras.push({ slug: "screenshots", title: "Screenshots", description: `${appTitle} gameplay screenshots.` });
    }
    if (!hasGuide) {
      extras.push({ slug: "guide", title: "Guide", description: `Complete ${appTitle} walkthrough and key systems reference.` });
    }
    return [...filtered, ...extras];
  }
  __name(normaliseZxSnakeGuidePages, "normaliseZxSnakeGuidePages");
  async function getDocumentationAppMetadata(pageIndex = null, appSlug = "") {
    const normalizedAppSlug = String(appSlug || "").trim();
    if (!documentationLandingAppSlugs.has(normalizedAppSlug)) {
      return null;
    }
    const apps = await getApps();
    const appListItem = Array.isArray(apps) ? apps.find((item) => item?.slug === normalizedAppSlug) : null;
    const appJson = await fetchJson(`${PAGES_BASE}/apps/${normalizedAppSlug}.json`);
    const landingPageKey = typeof pageIndex?.landingPage === "string" ? pageIndex.landingPage.trim() : "";
    const normalizedLandingPage = /^[a-z0-9-]+$/.test(landingPageKey) ? landingPageKey : "overview";
    const landingPageSlug = normalizedLandingPage || "overview";
    const landingPage = await fetchJson(`${PAGES_BASE}/apps/${normalizedAppSlug}/${landingPageSlug}.json`) || await fetchJson(`${PAGES_BASE}/apps/${normalizedAppSlug}/overview.json`);
    if (!landingPage && !appListItem && !appJson) {
      return null;
    }
    const fallback = appListItem ? {
      title: appListItem.name || appJson?.title || normalizedAppSlug,
      description: appListItem.description || "",
      shortDescription: appListItem.shortDescription || appListItem.summary || "",
      heroImage: appListItem.heroImage || appListItem.image || appJson?.heroImage,
      icon: appListItem.icon || appListItem.image || appJson?.icon,
      appStoreUrl: appListItem.appStoreUrl,
      testFlightUrl: appListItem.testFlightUrl,
      supportedPlatforms: appListItem.supportedPlatforms,
      status: appListItem.status,
      version: appListItem.version || "1.0",
      genre: appListItem.genre || "Arcade",
      developer: appListItem.developer || "BarkinMad Studios"
    } : {};
    const baseTitle = appJson?.title || fallback.title || landingPage?.title || normalizedAppSlug;
    return { ...fallback, ...(appJson || {}), ...(landingPage || {}), title: baseTitle, name: baseTitle };
  }
  __name(getDocumentationAppMetadata, "getDocumentationAppMetadata");
  function isAppLandingDocumentationRoute(appSlug, detailSlug, landingPageSlug = "") {
    const normalizedAppSlug = String(appSlug || "").trim();
    const normalizedDetailSlug = String(detailSlug || "").trim();
    const normalizedLandingSlug = String(landingPageSlug || "").trim();
    return documentationLandingAppSlugs.has(normalizedAppSlug) && normalizedDetailSlug === normalizedLandingSlug && normalizedLandingSlug === "overview";
  }
  __name(isAppLandingDocumentationRoute, "isAppLandingDocumentationRoute");
  function renderGuideNavigation(pages, appSlug, currentSlug, landingPageSlug = "") {
    const items = Array.isArray(pages) ? normaliseZxSnakeGuidePages(pages, appSlug) : [];
    if (!items.length) return "";
    return `
    <nav class="guide-nav" aria-label="Guide navigation">
      ${items.map((item) => {
      const href = getAppDocPath(appSlug, item.slug, landingPageSlug);
      const current = item.slug === currentSlug ? ` aria-current="page"` : "";
      return `<a href="${escapeHtml(href)}"${current}>${escapeHtml(item.title)}</a>`;
    }).join("")}
    </nav>`;
  }
  __name(renderGuideNavigation, "renderGuideNavigation");
  function getAppDocPath(appSlug, detailSlug, landingPageSlug = "") {
    const normalizedAppSlug = String(appSlug || "").trim();
    const normalizedDetailSlug = String(detailSlug || "").trim();
    const normalizedLandingSlug = String(landingPageSlug || "").trim();
    if (isAppLandingDocumentationRoute(normalizedAppSlug, normalizedDetailSlug, normalizedLandingSlug)) {
      return `/apps/${normalizedAppSlug}`;
    }
    return `/apps/${normalizedAppSlug}/${normalizedDetailSlug}`;
  }
  __name(getAppDocPath, "getAppDocPath");
  function renderGuideStepCard(label, page, appSlug, landingPageSlug = "") {
    const linkPath = getAppDocPath(appSlug, page?.slug, landingPageSlug);
    return `
    <div class="docs-panel">
      <p><strong>${escapeHtml(label)}</strong></p>
      <h3>${escapeHtml(page.title)}</h3>
      ${page.description ? `<p>${renderContentParagraph(page.description)}</p>` : ""}
      <a class="btn" href="${escapeHtml(linkPath)}">${escapeHtml(label)} Guide</a>
    </div>`;
  }
  __name(renderGuideStepCard, "renderGuideStepCard");
  function renderAppPage(app, relatedApps = []) {
    return `
<section class="hero hero-retro"${heroBackgroundStyle({ hero: { image: app.heroImage } })}>
  <h2>${escapeHtml(app.title || app.name)}</h2>
  <p>${renderContentParagraph(app.tagline || "")}</p>
</section>

<main>
<section>
  <div class="card">
    ${app.heroImage ? `
      ${renderImage({ className: "article-image", src: app.heroImage, alt: app.title || app.name, sizes: "(max-width: 1320px) calc(100vw - 3rem), 1272px" })}
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

${renderAppDocumentationLinks(app.documentationLinks)}

${renderStringListSection("Supported Platforms", app.supportedPlatforms)}

${renderFaqSection(app.faq)}

${Array.isArray(app.screenshots) && app.screenshots.length ? `
<section>
  <h2>Screenshots</h2>
  <div class="grid">
    ${app.screenshots.map((screenshot) => {
      const image = typeof screenshot === "string" ? screenshot : screenshot.image;
      const caption = typeof screenshot === "string" ? "" : screenshot.caption || "";
      if (!image) return "";
      return `
      <div class="card">
        ${renderImage({ className: "screenshot-image", src: image, alt: caption || (app.title || app.name) + " screenshot", sizes: "(max-width: 700px) calc(100vw - 5rem), 420px" })}
        ${caption ? `<p>${renderContentParagraph(caption)}</p>` : ""}
      </div>`;
    }).join("")}
  </div>
</section>` : ""}

${renderRelatedApps(relatedApps)}
</main>`;
  }
  __name(renderAppPage, "renderAppPage");
  function renderAppDocumentationLinks(links) {
    const items = Array.isArray(links) ? links.filter((link) => link?.label && link?.href) : [];
    if (!items.length) return "";
    return `
<section>
  <h2>Guides & Help</h2>
  <div class="grid">
    ${items.map((link) => `
      <div class="card">
        <h3>${escapeHtml(link.label)}</h3>
        ${link.description ? `<p>${renderContentParagraph(link.description)}</p>` : ""}
        <a class="btn" href="${escapeHtml(link.href)}">Open ${escapeHtml(link.label)} Guide</a>
      </div>
    `).join("")}
  </div>
</section>`;
  }
  __name(renderAppDocumentationLinks, "renderAppDocumentationLinks");
  function renderFaqSection(faqs) {
    const items = Array.isArray(faqs) ? faqs.filter((item) => item?.question && item?.answer) : [];
    if (!items.length) return "";
    return `
<section>
  <h2>FAQ</h2>
  <div class="card">
    ${items.map((item) => `
      <h3>${escapeHtml(item.question)}</h3>
      <p>${renderContentParagraph(item.answer)}</p>
    `).join("")}
  </div>
</section>`;
  }
  __name(renderFaqSection, "renderFaqSection");
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
  __name(renderRelatedApps, "renderRelatedApps");
  function renderStringListSection(title, items) {
    if (!Array.isArray(items) || !items.length) return "";
    return `
<section>
  <h2>${escapeHtml(title)}</h2>
  <div class="card">
    <ul>
      ${items.map((item) => `<li>${renderContentParagraph(item)}</li>`).join("")}
    </ul>
  </div>
</section>`;
  }
  __name(renderStringListSection, "renderStringListSection");
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
        ...service.hero || {},
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
  __name(serviceJsonPage, "serviceJsonPage");
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

  ${Array.isArray(service.sections) ? service.sections.map((section) => `
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
  __name(renderServicePage, "renderServicePage");
  function renderServiceSectionContent(section) {
    const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : [];
    const list = Array.isArray(section.list) ? section.list : [];
    const content = Array.isArray(section.content) ? section.content : [];
    if (paragraphs.length || list.length) {
      return `
      ${paragraphs.map((paragraph) => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}
      ${list.length ? `<ul>${list.map((item) => `<li>${renderContentParagraph(item)}</li>`).join("")}</ul>` : ""}
      ${Array.isArray(section.links) ? `<div class="button-group">${section.links.map(actionLink).join("")}</div>` : ""}
    `;
    }
    if (!content.length) return "";
    const shouldRenderAsList = content.length > 2;
    return shouldRenderAsList ? `<ul>${content.map((item) => `<li>${renderContentParagraph(item)}</li>`).join("")}</ul>` : content.map((paragraph) => `<p>${renderContentParagraph(paragraph)}</p>`).join("");
  }
  __name(renderServiceSectionContent, "renderServiceSectionContent");
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
  __name(staticJsonPage, "staticJsonPage");
  function staticPageSections(page) {
    if (Array.isArray(page.sections)) return page.sections;
    if (Array.isArray(page.content)) {
      return page.content.filter((section) => section?.heading || section?.title || section?.text).map((section) => ({
        heading: section.heading || section.title,
        paragraphs: section.text ? [section.text] : []
      }));
    }
    return [];
  }
  __name(staticPageSections, "staticPageSections");
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
  __name(docsJsonPage, "docsJsonPage");
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
  __name(portfolioJsonPage, "portfolioJsonPage");
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
  __name(portfolioDetailJsonPage, "portfolioDetailJsonPage");
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
      ${projectCategories.length ? projectCategories.map((category) => renderPortfolioProjectGroup(category, projects.filter((project) => project.category === category))).join("") : `<div class="grid portfolio-grid">${projects.map(renderPortfolioProjectCard).join("")}</div>`}
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
  __name(renderPortfolioPage, "renderPortfolioPage");
  function renderPortfolioProjectGroup(category, projects) {
    if (!Array.isArray(projects) || !projects.length) return "";
    return `
  <h3>${escapeHtml(category)}</h3>
  <div class="grid portfolio-grid">
    ${projects.map(renderPortfolioProjectCard).join("")}
  </div>`;
  }
  __name(renderPortfolioProjectGroup, "renderPortfolioProjectGroup");
  function renderPortfolioProjectCard(project) {
    if (!project || !project.title) return "";
    const technologies = Array.isArray(project.technologies) ? project.technologies.filter(Boolean) : [];
    const image = getAppImage(project);
    return `
<div class="card portfolio-card">
  ${image ? `
    ${renderImage({ className: "game-image", src: image, alt: project.title, sizes: "(max-width: 700px) calc(100vw - 3rem), (max-width: 1000px) calc((100vw - 4rem) / 2), 420px" })}
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
        ${technologies.map((technology) => `<li>${renderContentParagraph(technology)}</li>`).join("")}
      </ul>
    ` : ""}
    ${project.outcome ? `<p><strong>Outcome:</strong> ${renderContentParagraph(project.outcome)}</p>` : ""}
  </div>
  ${project.href ? actionLink({ label: project.actionLabel || `Open ${project.title || "Project"} Page`, href: project.href }) : ""}
</div>`;
  }
  __name(renderPortfolioProjectCard, "renderPortfolioProjectCard");
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
      ${page.icon ? renderImage({ className: "game-image", src: page.icon, alt: `${page.title || page.heading} app icon`, sizes: "(max-width: 700px) calc(100vw - 3rem), 420px" }) : ""}
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
  __name(renderPortfolioDetailPage, "renderPortfolioDetailPage");
  function renderPortfolioConfidentiality(confidentiality) {
    if (!confidentiality) return "";
    const paragraphs = Array.isArray(confidentiality.paragraphs) ? confidentiality.paragraphs : [];
    if (!confidentiality.heading && !paragraphs.length) return "";
    return `
<section>
  ${confidentiality.heading ? `<h2>${escapeHtml(confidentiality.heading)}</h2>` : ""}
  <div class="card">
    ${paragraphs.map((paragraph) => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}
  </div>
</section>`;
  }
  __name(renderPortfolioConfidentiality, "renderPortfolioConfidentiality");
  function renderDocsPage(page) {
    const categories = Array.isArray(page.categories) ? page.categories : [];
    const actions = Array.isArray(page.actions) ? page.actions : [];
    return `
<section class="hero hero-retro"${heroBackgroundStyle(page)}>
  <h2>${escapeHtml(page.heading || page.title || "Documentation")}</h2>
  ${page.intro ? `<p>${renderContentParagraph(page.intro)}</p>` : ""}
</section>

<main>
  ${categories.length ? categories.map((category) => `
    <section>
      <h2>${escapeHtml(category.title)}</h2>
      ${category.description ? `<p>${renderContentParagraph(category.description)}</p>` : ""}
      <div class="grid">
        ${(category.documents || []).map((document) => `
          <div class="card">
            <h3>${escapeHtml(document.title)}</h3>
            ${document.summary ? `<p>${renderContentParagraph(document.summary)}</p>` : ""}
            ${Array.isArray(document.tags) && document.tags.length ? `<p><strong>Topics:</strong> ${document.tags.map(escapeHtml).join(", ")}</p>` : ""}
            ${document.href ? `<a class="btn" href="${escapeHtml(document.href)}">Open ${escapeHtml(document.title)}</a>` : ""}
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
  __name(renderDocsPage, "renderDocsPage");
  function renderStaticPage(page) {
    return `
<section class="hero hero-retro"${heroBackgroundStyle(page)}>
  <h2>${escapeHtml(page.heading || page.title)}</h2>
  ${page.intro ? `<p>${renderContentParagraph(page.intro)}</p>` : ""}
</section>

<main>
  ${renderLinkCards(page.servicePagesTitle, page.servicePages)}

  ${page.sections.map((section) => `
    <section>
      <h2>${escapeHtml(section.heading || section.title)}</h2>
      <div class="card">
        ${(section.paragraphs || []).map((paragraph) => `<p>${renderContentParagraph(paragraph)}</p>`).join("")}

        ${Array.isArray(section.list) ? `
          <ul>
            ${section.list.map((item) => `<li>${renderContentParagraph(item)}</li>`).join("")}
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
  __name(renderStaticPage, "renderStaticPage");
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
      <a class="btn" href="/news/archive">Browse News Archive</a>
    </p>
  ` : ""}
</section>
</main>`;
  }
  __name(newsPage, "newsPage");
  function postCard(post) {
    return `
<div class="card">
  ${renderImage({ className: "game-image post-image", src: `news/${post.slug}/${post.image}`, alt: post.title, sizes: "(max-width: 700px) calc(100vw - 3rem), (max-width: 1000px) calc((100vw - 4rem) / 2), 420px" })}
  <span class="badge">${formatDate(post.date)}</span>
  <h3>${escapeHtml(post.title)}</h3>
  <p>${escapeHtml(post.excerpt)}</p>
  <a class="btn" href="/news/${escapeHtml(post.slug)}">Read ${escapeHtml(post.title)}</a>
</div>`;
  }
  __name(postCard, "postCard");
  async function newsArticleResponse(slug) {
    const article = await fetchJson(`${NEWS_BASE}/${slug}/article.json`);
    if (!article || !isPublishedDate(article.date)) {
      return pageResponse("Page Not Found - BarkinMad Studios", notFoundPage(), {
        robots: "noindex,follow"
      }, 404);
    }
    const posts = getPublishedValidPosts(await fetchJson(`${NEWS_BASE}/posts.json`));
    const relatedPosts = posts.filter((post) => post.slug !== slug).slice(0, 3);
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
  __name(newsArticleResponse, "newsArticleResponse");
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
      ${renderImage({ className: "article-image", src: `news/${slug}/${article.image}`, alt: article.title, sizes: "(max-width: 1320px) calc(100vw - 3rem), 1272px" })}
    ` : ""}

    ${paragraphs.map(
      (paragraph) => `<p>${renderContentParagraph(paragraph)}</p>`
    ).join("")}

    ${articleActions.length ? `
      <p>${articleActions.map(actionLink).join("")}</p>
    ` : ""}

    <a class="btn" href="/news">Back To Latest News</a>
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
  __name(newsArticlePage, "newsArticlePage");
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
    ${archivedPosts.length ? archivedPosts.map((post) => `
      <p>
        <strong>${formatDate(post.date)}</strong> \u2014
        <a href="/news/${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a><br>
        ${escapeHtml(post.excerpt)}
      </p>
    `).join("") : `<p>There are no archived articles yet.</p>`}

    <a class="btn" href="/news">Back To Latest News</a>
  </div>
</section>
</main>`;
  }
  __name(newsArchivePage, "newsArchivePage");
  function getPublishedValidPosts(posts) {
    if (!Array.isArray(posts)) return [];
    return posts.filter((post) => {
      if (!post || !post.slug || !post.title || !post.date || !post.excerpt || !post.image) return false;
      return isPublishedDate(post.date);
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  __name(getPublishedValidPosts, "getPublishedValidPosts");
  function robotsTxtResponse() {
    return textResponse(`
User-agent: *
Allow: /

Sitemap: https://www.barkinmad.studio/sitemap.xml
`.trim());
  }
  __name(robotsTxtResponse, "robotsTxtResponse");
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
    ].map((url) => ({ ...url, lastmod: SITE_LASTMOD }));
    const apps = await getApps();
    for (const app of apps) {
      const appPath = app.href || (app.slug ? `/apps/${app.slug}` : "");
      if (appPath && !urls.some((url) => url.path === appPath)) {
        urls.push({ path: appPath, changefreq: "monthly", priority: "0.8", lastmod: SITE_LASTMOD });
      }
      if (app.slug) {
        const pageIndex = await fetchJson(`${PAGES_BASE}/apps/${app.slug}/pages.json`);
        const documentationPages = Array.isArray(pageIndex?.pages) ? pageIndex.pages : [];
        for (const page of documentationPages) {
          if (isAppLandingDocumentationRoute(app.slug, page?.slug, pageIndex?.landingPage)) {
            continue;
          }
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
${urls.map((path) => `
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
  __name(sitemapResponse, "sitemapResponse");
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
  __name(formatDate, "formatDate");
  function renderContentParagraph(text) {
    const source = String(text ?? "");
    const markdownLink = /\[([^\]]+)\]\(([^)\s]+)\)/g;
    let html = "";
    let lastIndex = 0;
    let match;
    while ((match = markdownLink.exec(source)) !== null) {
      html += escapeHtml(source.slice(lastIndex, match.index));
      const href = safeLinkHref(match[2]);
      html += href ? `<a href="${escapeHtml(href)}">${escapeHtml(match[1])}</a>` : escapeHtml(match[0]);
      lastIndex = markdownLink.lastIndex;
    }
    html += escapeHtml(source.slice(lastIndex));
    return html.replace(/<\/a>\s+([,.;:!?])/g, "</a>$1");
  }
  __name(renderContentParagraph, "renderContentParagraph");
  function markdownLinksToText(text) {
    return String(text ?? "").replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1").replace(/\s+([,.;:!?])/g, "$1");
  }
  __name(markdownLinksToText, "markdownLinksToText");
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
  __name(safeLinkHref, "safeLinkHref");
  function slugify(value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  __name(slugify, "slugify");
  function escapeHtml(value) {
    return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }
  __name(escapeHtml, "escapeHtml");
  function notFoundPage() {
    return `
<main>
<section>
  <h2>Page Not Found</h2>
  <div class="card">
    <p>The page you requested could not be found.</p>
    <a class="btn" href="/">Back To BarkinMad Studios Home</a>
  </div>
</section>
</main>`;
  }
  __name(notFoundPage, "notFoundPage");
  function brokenPage() {
    return `
<main>
<section>
  <h2>Page Error</h2>
  <div class="card">
    <p>This page could not be displayed because its content file is not in the correct format.</p>
    <a class="btn" href="/">Back To BarkinMad Studios Home</a>
  </div>
</section>
</main>`;
  }
  __name(brokenPage, "brokenPage");
})();
//# sourceMappingURL=worker.js.map
