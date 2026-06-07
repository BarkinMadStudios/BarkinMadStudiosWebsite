# BarkinMad Studios Website Improvements Audit

## Summary

The website is already strongly content-driven, with JSON files for core pages, apps, ZX Series data, service content, and news articles. The main app pages, ZX Series hub, news system, sitemap, robots.txt, Open Graph tags, and several schema types are present in the current implementation.

The largest gaps are route/rendering coverage rather than raw content availability. The six service detail JSON files exist, but there is no active `/services/...` route or generic service page renderer in `worker.txt`, and one service filename is misspelled as `custom-sofware-development.json`. A `/portfolio` page was not found. App pages exist and include screenshots/features/store fields, but do not yet include Why Play, FAQ, Related Apps, or technology sections. News articles are JSON-driven and have title/date/image/content, but related articles are not implemented.

## Completed

- Main `/services` page exists through `pages/services.json` and the `/services` route in `worker.txt`.
- Six service JSON files exist under `pages/services/`:
  - `business-process-improvement.json`
  - `custom-sofware-development.json`
  - `internal-business-tools.json`
  - `mobile-app-development.json`
  - `prototypes-proof-of-concepts.json`
  - `websites-content-platforms.json`
- Service JSON files include hero title/subtitle, description, sections, and CTA data linking to `/contact`.
- `/zx-series` page exists through `pages/zx-series.json` and the `/zx-series` route.
- ZX Series uses supporting JSON data files for games, coins, achievements, leaderboards, PVP, and roadmap data.
- ZX Series content covers shared coins/wallet, achievements, leaderboards, PVP modes, roadmap, and ZX games.
- App pages exist for:
  - `/apps/zxsnake`
  - `/apps/zxbrick`
  - `/apps/zxspace`
  - `/apps/zxpong`
  - `/apps/gameofdarts`
- App pages are JSON-driven through `pages/apps/*.json` and rendered by a generic `appJsonPage` / `renderAppPage` implementation.
- App pages include screenshots, features, supported platforms, achievements where available, leaderboards where available, and App Store/TestFlight fields.
- News page exists at `/news`.
- News articles are JSON-driven through `news/*/article.json` and `news/posts.json`.
- News articles include title, date, image, and content.
- Several articles include internal links in markdown-style content.
- Contact page exists through `pages/contact.json` and `/contact`.
- Home page has clear calls to action for Apps and News.
- Home page links to Apps.
- Apps page links to ZX Series.
- Sitemap exists at `/sitemap.xml`.
- robots.txt exists at `/robots.txt`.
- Page titles and meta descriptions are generated per page where page data provides title/description fields.
- Open Graph and Twitter card tags are generated in the shared layout.
- Organization schema is present.
- Website schema is present on the home page.
- SoftwareApplication schema is present for app pages.
- Article schema is present for news articles.
- Breadcrumb schema exists and is applied to news article pages.
- Image folder structure appears unchanged, and current JSON image paths still align with files under `images/` and `news/`.

## Partially Complete

- Individual service page content exists in JSON, but the pages do not appear to be routable because `worker.txt` does not currently handle `/services/{slug}`.
- The required `/services/custom-software-development` route is not satisfied by the current filename because the file is named `custom-sofware-development.json`.
- Service CTAs exist in JSON, but they are not rendered on individual service pages until a service detail renderer and route are implemented.
- Services are linked from the main navigation, but only the parent `/services` page is linked. Individual service pages are not linked from navigation or rendered service cards.
- `/zx-series` shows ZX Series games from the app data, but the completeness depends on the contents of `pages/data/apps.json` and `pages/data/games.json`; current coverage includes ZXSnake, ZXBrick, ZXSpace, and ZXPong.
- App Store links exist for live apps, but coming-soon apps have empty App Store and TestFlight fields.
- TestFlight links are present as fields, but currently empty across inspected app JSON files.
- App pages include strong product basics, but they do not yet include dedicated Why Play, FAQ, Related Apps, or Technologies sections.
- Portfolio-style content is partially represented by `/apps` and individual app pages, but there is no dedicated `/portfolio` page matching the checklist.
- Project features exist on app pages, but project overviews, technologies, and portfolio-specific links are not consistently structured as portfolio data.
- Unique titles and descriptions are mostly supported, but should be reviewed after new service, portfolio, FAQ, and article-related pages are added.
- Breadcrumb schema exists but is only clearly applied to news article pages. It is not applied broadly to app pages, service pages, ZX Series, or portfolio.
- FAQ schema is not present, because app FAQ content is not yet implemented.
- News article internal links exist in several article bodies, but not every article has explicit internal links or action links.
- News listing and article rendering are generic, but related article data and rendering are not present.
- Content is stored in JSON where practical, but several renderer labels and sections are still hardcoded in `worker.txt` for apps/news/static pages.

## Missing

- Dedicated `/portfolio` page.
- Portfolio entries for ZXSnake, ZXBrick, The Game of Darts, and ZXSpace in a portfolio-specific structure.
- Portfolio fields for project overview, features, technologies, and links.
- Active route handling for `/services/custom-software-development`.
- Active route handling for `/services/mobile-app-development`.
- Active route handling for `/services/internal-business-tools`.
- Active route handling for `/services/business-process-improvement`.
- Active route handling for `/services/websites-content-platforms`.
- Active route handling for `/services/prototypes-proof-of-concepts`.
- Generic service detail renderer.
- Individual service links from the Services page/cards.
- Individual service pages included in the sitemap.
- Why Play section on app pages.
- FAQ section on app pages.
- FAQ schema.
- Related Apps section on app pages.
- Technologies section on app pages.
- Related articles section on news article pages.
- Broad breadcrumb schema coverage for apps, services, ZX Series, and future portfolio pages.
- Home page direct link to `/services`.
- Home page direct link to `/zx-series`.
- Home page explicit Services CTA.
- Home page explicit ZX Series CTA.
- Home page currently links to Apps and News, but not directly to Services or ZX Series.

## Recommended Next Steps

1. Implement service detail routing and a generic service renderer.
   - Priority: High
   - Value return: High
   - Time/credit cost: Medium
   - Why: The service JSON content already exists, and making it routable turns existing work into indexable conversion pages.

2. Fix the `custom-sofware-development.json` slug mismatch and ensure `/services/custom-software-development` works.
   - Priority: High
   - Value return: High
   - Time/credit cost: Low
   - Why: This is likely a small fix with direct SEO and navigation impact.

3. Add service cards/links from `/services` to each individual service page and include service URLs in the sitemap.
   - Priority: High
   - Value return: High
   - Time/credit cost: Low to Medium
   - Why: Users and search engines need a discoverable path into the new service pages.

4. Add direct Home page CTAs/sections for Services and ZX Series.
   - Priority: High
   - Value return: High
   - Time/credit cost: Low
   - Why: This improves conversion paths quickly without large content or renderer changes.

5. Create `/portfolio` as a JSON-driven page using existing app/project data where possible.
   - Priority: Medium
   - Value return: High
   - Time/credit cost: Medium
   - Why: It supports proof-of-work for service buyers and can reuse ZXSnake, ZXBrick, The Game of Darts, and ZXSpace content.

## Task List by Priority, Cost, and Return

### High Priority / High Value Return

- Build `/services/{slug}` route support and a generic service detail renderer.
  - Cost: Medium
  - Return: High
  - Notes: Existing JSON already contains most content, so this is mainly routing/rendering/sitemap work.

- Correct the custom software slug mismatch.
  - Cost: Low
  - Return: High
  - Notes: Current checklist path says `/services/custom-software-development`, but the file is `custom-sofware-development.json`.

- Add Services and ZX Series links to the home page.
  - Cost: Low
  - Return: High
  - Notes: Quick conversion improvement from the highest-traffic entry page.

- Add service page links and CTAs from the main Services page.
  - Cost: Low to Medium
  - Return: High
  - Notes: Makes individual services discoverable without needing nav dropdown complexity.

- Add service detail URLs to the sitemap.
  - Cost: Low
  - Return: High
  - Notes: Important once service pages are routable.

### Medium Priority / High Value Return

- Create a JSON-driven `/portfolio` page.
  - Cost: Medium
  - Return: High
  - Notes: Helps service conversion by showing shipped products and real technical credibility.

- Add technologies/project overview fields to app or portfolio JSON.
  - Cost: Medium
  - Return: High
  - Notes: Strong value for business buyers evaluating capability.

- Add Related Apps sections to app pages.
  - Cost: Medium
  - Return: Medium to High
  - Notes: Improves internal linking and keeps users moving through the app portfolio.

- Add broader breadcrumb schema to apps, services, ZX Series, and portfolio.
  - Cost: Medium
  - Return: Medium to High
  - Notes: Useful SEO enhancement after core route coverage is complete.

### Medium Priority / Medium Value Return

- Add Why Play sections to all app pages.
  - Cost: Medium
  - Return: Medium
  - Notes: Good conversion copy, but less urgent than fixing missing routes.

- Add FAQ sections and FAQ schema to app pages.
  - Cost: Medium
  - Return: Medium
  - Notes: Useful for SEO and App Store support, but requires careful content per app.

- Add related articles to news article pages.
  - Cost: Medium
  - Return: Medium
  - Notes: Improves content depth and internal linking.

- Review unique SEO titles/descriptions after adding service and portfolio pages.
  - Cost: Low to Medium
  - Return: Medium
  - Notes: Best done after new pages exist.

### Lower Priority / Lower Immediate Return

- Add TestFlight links where available.
  - Cost: Low
  - Return: Low to Medium
  - Notes: Useful only when public TestFlight links are active.

- Reduce remaining hardcoded renderer labels where practical.
  - Cost: Medium
  - Return: Low to Medium
  - Notes: Improves maintainability, but current hardcoding is not blocking visible checklist coverage.

- Add article related-content metadata to every article.
  - Cost: Medium to High
  - Return: Medium
  - Notes: Time cost grows with article count and quality expectations.

## High Value Return Focus

The best return for time/credits is to finish the services implementation first: route the existing six JSON files, fix the custom software slug, render CTAs, link the pages from `/services`, and add them to the sitemap. This uses content already present in the repository and directly supports business enquiries.

The second-best return is to improve the home page conversion paths by adding direct Services and ZX Series CTAs. This is low-cost and improves access to the two most commercially important areas: client services and the connected game ecosystem.

The highest larger investment is a JSON-driven `/portfolio` page. It will take more time than the quick fixes, but it can serve both SEO and buyer confidence by presenting shipped products, technologies, and project outcomes in one place.
