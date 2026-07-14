import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const root = new URL("..", import.meta.url);
const workerSource = await readFile(new URL("worker.js", root), "utf8");
const schema = JSON.parse(await readFile(new URL("../../Docs/Schemas/news-article-v2.schema.json", root), "utf8"));

function v2Article(overrides = {}) {
  return {
    schemaVersion: 2,
    revision: 1,
    articleId: "fixture-v2-article",
    slug: "v2-fixture",
    title: "Structured Fixture",
    createdAt: "2025-07-01T09:00:00.000Z",
    updatedAt: "2025-07-14T10:30:00.000Z",
    publishedAt: "2025-07-14T12:00:00.000Z",
    status: "published",
    category: "Studio News",
    articleType: "Development Update",
    tags: ["fixture", "structured-news"],
    summary: "A structured article fixture.",
    seo: { title: "Structured SEO Title", description: "Structured SEO description." },
    readingTimeMinutes: 7,
    contentHash: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    heroImage: {
      assetId: "hero-fixture",
      path: "news/v2-fixture/image.png",
      mimeType: "image/png",
      width: 1600,
      height: 900,
      bytes: 100,
      sha256: "fixture",
      alt: "A fixture hero image",
      caption: "Hero caption"
    },
    content: [
      { id: "paragraph", type: "paragraph", runs: [{ text: "A " }, { text: "bold", bold: true }, { text: " and " }, { text: "italic", italic: true }, { text: " link", link: { url: "https://example.com", title: "Example" } }, { text: " unsafe", link: { url: "javascript:alert(1)" } }] },
      { id: "heading-section", type: "heading", level: 2, text: "Section heading" },
      { id: "list", type: "list", style: "ordered", items: [{ id: "item-1", runs: [{ text: "First item" }] }, { id: "item-2", runs: [{ text: "Second item" }] }] },
      { id: "callout", type: "callout", style: "information", title: "Important", runs: [{ text: "Callout text" }] },
      { id: "quote", type: "quote", runs: [{ text: "Quoted text" }], attribution: "Fixture author" },
      { id: "image", type: "image", asset: { assetId: "inline-fixture", path: "news/v2-fixture/image.png", mimeType: "image/png", width: 1600, height: 900, bytes: 100, sha256: "fixture", alt: "Inline fixture image", caption: "Inline caption" } },
      { id: "divider", type: "divider" },
      { id: "unknown", type: "video", html: "<script>should-not-render()</script>" }
    ],
    relatedProject: { title: "StudioDash", url: "/apps/studiodash" },
    relatedArticleSlugs: ["legacy-fixture"],
    actions: [{ label: "Preserved action", href: "/apps/studiodash" }],
    ...overrides
  };
}

function legacyArticle(overrides = {}) {
  return {
    title: "Legacy Fixture",
    date: "2026-07-14",
    image: "image.png",
    content: ["Legacy paragraph one.", "Legacy paragraph two."],
    actions: [{ label: "Legacy action", href: "/apps/studiodash" }],
    ...overrides
  };
}

async function requestWorker(path, { articles = {}, posts = [] } = {}) {
  let fetchHandler;
  const context = vm.createContext({
    URL,
    URLSearchParams,
    Request,
    Response,
    Headers,
    TextEncoder,
    crypto,
    console,
    addEventListener(type, listener) {
      if (type === "fetch") fetchHandler = listener;
    },
    fetch: async (url) => {
      const value = String(url);
      if (value.endsWith("/news/posts.json")) return Response.json(posts);
      if (value.endsWith("/pages/apps.json")) return Response.json([]);
      if (value.endsWith("/pages/services.json")) return Response.json({ servicePages: [] });
      const articleMatch = value.match(/\/news\/([^/]+)\/article\.json$/);
      if (articleMatch) return articles[articleMatch[1]] ? Response.json(articles[articleMatch[1]]) : new Response("Not found", { status: 404 });
      if (value.endsWith("/pages/data/site.json")) return Response.json({ name: "BarkinMad Studios", website: "https://www.barkinmad.studio" });
      return new Response("Not found", { status: 404 });
    }
  });
  vm.runInContext(workerSource, context, { filename: "worker.js" });
  assert.ok(fetchHandler, "Worker fetch handler should register");
  let response;
  fetchHandler({ request: new Request(`https://www.barkinmad.studio${path}`), respondWith: (promise) => { response = Promise.resolve(promise); } });
  return response;
}

test("renders Schema V2 blocks safely with metadata and related CTA", async () => {
  const article = v2Article();
  const posts = [
    { slug: "v2-fixture", title: "Structured Fixture", date: "2026-07-14", excerpt: "Structured", image: "image.png" },
    { slug: "legacy-fixture", title: "Legacy card", date: "2026-07-13", excerpt: "Legacy", image: "image.png" }
  ];
  const response = await requestWorker("/news/v2-fixture", { articles: { "v2-fixture": article }, posts });
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /<title>Structured SEO Title - BarkinMad Studios<\/title>/);
  assert.match(html, /<h1>Structured Fixture<\/h1>/);
  assert.match(html, /<h2 id="heading-section"><a class="news-article-heading-anchor" href="#heading-section"/);
  assert.match(html, /<ol><li>First item<\/li>/);
  assert.match(html, /news-article-callout/);
  assert.match(html, /<blockquote class="news-article-quote">/);
  assert.match(html, /<figcaption>Inline caption<\/figcaption>/);
  assert.match(html, /Related project: StudioDash/);
  assert.match(html, /datePublished/);
  assert.match(html, /dateModified/);
  assert.match(html, /Structured SEO description/);
  assert.match(html, /7 min read/);
  assert.match(html, /2025-07-14/);
  assert.doesNotMatch(html, /should-not-render/);
  assert.doesNotMatch(html, /javascript:/i);
  assert.match(html, /Preserved action/);
});

test("keeps legacy article rendering on the legacy path", async () => {
  const response = await requestWorker("/news/legacy-fixture", {
    articles: { "legacy-fixture": legacyArticle() },
    posts: [{ slug: "legacy-fixture", title: "Legacy Fixture", date: "2026-07-14", excerpt: "Legacy", image: "image.png" }]
  });
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Legacy paragraph one/);
  assert.match(html, /Legacy action/);
  assert.doesNotMatch(html, /<div class="news-article-body">/);
});

test("filters future V2 articles from direct routes", async () => {
  const response = await requestWorker("/news/v2-future", {
    articles: { "v2-future": v2Article({ slug: "v2-future", publishedAt: "2099-01-01T00:00:00.000Z" }) }
  });
  assert.equal(response.status, 404);
  assert.match(await response.text(), /<meta name="robots" content="noindex,follow">/);
});

test("keeps future index entries out of the sitemap", async () => {
  const response = await requestWorker("/sitemap.xml", {
    posts: [
      { slug: "published-v2", title: "Published V2", date: "2026-07-14", excerpt: "Published", image: "image.png" },
      { slug: "future-v2", title: "Future V2", date: "2099-01-01", excerpt: "Future", image: "image.png" }
    ]
  });
  const xml = await response.text();
  assert.equal(response.status, 200);
  assert.match(xml, /\/news\/published-v2/);
  assert.doesNotMatch(xml, /\/news\/future-v2/);
});

test("defines the approved responsive article presentation tokens", () => {
  assert.match(workerSource, /\.news-article\s*\{[^}]*max-width:\s*760px/s);
  assert.match(workerSource, /\.news-article-hero[^}]*max-width:\s*1080px/s);
  assert.match(workerSource, /\.news-article-body\s*\{[^}]*font-size:\s*1\.05rem[^}]*line-height:\s*1\.75/s);
  assert.match(workerSource, /@media \(max-width:\s*700px\)/);
  assert.match(workerSource, /<h\$\{block\.level\} id=/);
});

test("requires the revision, timestamp, SEO, hash, tag, and listing-override contract", () => {
  assert.equal(schema.properties.schemaVersion.const, 2);
  for (const field of ["revision", "createdAt", "updatedAt", "publishedAt", "tags", "seo", "readingTimeMinutes", "contentHash"]) {
    assert.ok(schema.required.includes(field), `Schema must require ${field}`);
  }
  assert.equal(schema.properties.publicationDate, undefined);
  assert.deepEqual(Object.keys(schema.properties.listing.properties).sort(), ["overrideExcerpt", "overrideTitle"]);
  assert.equal(schema.properties.contentHash.pattern, "^[a-f0-9]{64}$");
});

test("partitions one date-filtered index between latest news and archive", async () => {
  const posts = [
    { slug: "future", title: "Future Article", date: "2099-01-01", excerpt: "Future", image: "image.png" },
    ...Array.from({ length: 16 }, (_, index) => ({ slug: `published-${index + 1}`, title: `Published ${index + 1}`, date: `2026-07-${String(14 - Math.min(index, 13)).padStart(2, "0")}`, excerpt: `Excerpt ${index + 1}`, image: "image.png" }))
  ];
  const latest = await requestWorker("/news", { posts });
  const archive = await requestWorker("/news/archive", { posts });
  const latestHtml = await latest.text();
  const archiveHtml = await archive.text();
  assert.equal(latest.status, 200);
  assert.equal(archive.status, 200);
  assert.match(latestHtml, /Published 1/);
  assert.doesNotMatch(latestHtml, /Published 16/);
  assert.match(archiveHtml, /Published 16/);
  assert.doesNotMatch(archiveHtml, /Published 1<\/h3>/);
  assert.doesNotMatch(`${latestHtml}${archiveHtml}`, /Future Article/);
});
