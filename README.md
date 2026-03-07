# Ellen's E-Portfolio

Technical documentation for a customized portfolio built from the upstream
[`ashutosh1919/masterPortfolio`](https://github.com/ashutosh1919/masterPortfolio)
React template.

## Scope and audience

This README is written for:

- **Collaborators** contributing content or code.
- **Maintainer-self** for operational and publishing continuity.

## Upstream template reference

This repository is a derived customization of the original
`masterPortfolio` template. Core structure and many UI components come from
that upstream project, while portfolio content architecture and archive
workflows were extended in this repo.

- Upstream project: <https://github.com/ashutosh1919/masterPortfolio>
- Upstream license inheritance: see [`LICENSE`](./LICENSE)

## What changed vs. original template

### Functional additions

1. **Academic Archive system** (`/academic-archive`)

   - Search across title/course/degree/theme/skills/tags.
   - Tag filtering with normalized tag keys + human-readable labels.
   - Theme-based grouping and date-desc sorting.

2. **Markdown-backed post rendering**

   - Archive entries map metadata to markdown files in `public/archive-posts/`.
   - Supports portfolio growth without editing React view components for each post.

3. **Standalone MGEM capstone page** (`/mgem-capstone`)

   - Dedicated layout for capstone framing, methods summary, and outputs.

4. **Route updates**
   - Added archive list + archive detail routes.
   - Added capstone route.
   - Preserved compatibility redirect `/experience -> /work-experience`.

### Content and branding changes

- Personal profile, SEO fields, social links, education, skills, and experience
  replaced from template defaults.
- Repository purpose shifted from a generic software portfolio template instance
  to a geospatial/environmental academic-professional portfolio.

## Differences vs upstream (commit-based summary)

| Date       | Commit    | Change summary                                                                     | Category              |
| ---------- | --------- | ---------------------------------------------------------------------------------- | --------------------- |
| 2026-02-28 | `ba682ab` | Added manual degree tags + user-friendly tag labels in archive UI/data flow.       | Archive filtering     |
| 2026-02-28 | `5f9301b` | Fixed markdown list continuation issues affecting archive post rendering fidelity. | Markdown rendering    |
| 2026-02-28 | `aa554be` | Corrected archive post dates for timeline accuracy.                                | Content quality       |
| 2026-02-28 | `8487b69` | Preserved full experience logos within circular placeholders.                      | UI refinement         |
| 2026-03-01 | `c4152a4` | Added new GEM 521 archive post scaffolds.                                          | Content pipeline      |
| 2026-03-01 | `890b4e8` | Refactored LiDAR post into concise archive markdown format.                        | Content normalization |
| 2026-03-01 | `f5ba172` | Rewrote GEM 521 Lab 4 post into concise archive format.                            | Content normalization |
| 2026-03-01 | `d427461` | Completed upload pass for current archive posts set.                               | Content ingestion     |

> Use `git log --oneline --decorate` for full chronology.

## Repository structure (key files)

```text
src/
  portfolio.js                  # Core profile, homepage, experience, education, links
  data/archivePosts.js          # Archive metadata model + tag helper logic
  pages/archive/                # Archive list page + post detail page
  pages/mgemCapstone/           # Capstone project page
  containers/Main.js            # App routing (archive/capstone/redirects)
public/
  archive-posts/*.md            # Source markdown for archive entries
  archive-posts/images/*        # Referenced media assets for posts
```

## Local development

### Prerequisites

- Node.js + npm (project currently builds with CRA-based scripts in `package.json`).

### Install and run

```bash
npm install
npm start
```

Runs app locally at <http://localhost:3000>.

### Production build

```bash
npm run build
```

### GitHub Pages deployment

```bash
npm run deploy
```

Deploy target is configured via `homepage` and `gh-pages` script behavior.

## Archive authoring workflow (Markdown-first)

### Metadata source of truth

All archive post cards/filter/search behavior is driven by
`src/data/archivePosts.js` entries.

Each entry should include at least:

- `slug` (URL-safe, unique)
- `title`
- `date` (`YYYY-MM-DD`)
- `degree`
- `course`
- `theme`
- `keySkills` (array)
- `tags` (optional manual additions; auto-tags are also generated)
- `markdownPath` (e.g. `/archive-posts/new-post.md`)
- `outputs` (optional list for concise outcomes)
- `isPrivate` (boolean)

### Add a new post

1. Create markdown file in `public/archive-posts/`.
2. Add post images to `public/archive-posts/images/` (if needed).
3. Add corresponding metadata object in `src/data/archivePosts.js`.
4. Ensure `slug` + `markdownPath` are aligned.
5. Validate filters/search by running locally.

## R Markdown / Quarto publishing guidance

If your writing workflow starts in `.Rmd` or Quarto:

1. Author analysis in `.Rmd` or `.qmd` with executable chunks.
2. Render to markdown (`.md`) for web consumption.
3. Move rendered markdown to `public/archive-posts/`.
4. Copy generated figure assets into `public/archive-posts/images/`.
5. Normalize links/image paths so they are web-root compatible (e.g.
   `/archive-posts/images/figure-name.png`).
6. Optionally trim rendered output to concise narrative sections before publish
   (problem, data/method, outputs, takeaways).

### Interactive embeds in archive markdown

You can now embed interactive viewers directly in archive `.md` files using:

- `@pointcloud(https://your-point-cloud-viewer-url)`
- `@webmap(https://your-web-map-url)`

Both render as responsive iframes in the archive post detail page.

**Recommended hosting targets**

- Point clouds: Potree, Plasio, Cesium 3D Tiles viewers, or any HTTPS iframe-friendly viewer URL.
- Web maps: ArcGIS Online app/embed links, Mapbox hosted maps, Leaflet apps, or other iframe-compatible map apps.

**Important notes**

- Use publicly accessible HTTPS URLs.
- Ensure the provider allows embedding (`X-Frame-Options` / CSP must permit iframes).
- Keep source data heavy assets hosted outside this repo (cloud bucket/static host/CDN).

### How to embed 3D point clouds in archive markdown

1. Publish your point cloud to a web viewer URL (for example Potree/Cesium/Plasio/hosted app).
2. Confirm the viewer is publicly reachable via **HTTPS**.
3. Confirm iframe embedding is allowed by the host (no blocking `X-Frame-Options`/CSP).
4. In your archive markdown file, add a line exactly like:
   - `@pointcloud(https://your-point-cloud-viewer-url)`
5. Add a static image fallback below the embed for reliability on restricted networks.
6. Test locally (`npm start`) and open the archive post route to verify pan/zoom/rotate interaction.

A ready-to-copy example file is available at:

- `public/archive-posts/interactive-map-template.md`

### Recommended minimal render checks

- Headings render correctly.
- Ordered/unordered lists remain valid after render.
- Code blocks and images display in archive detail page.
- Relative links do not break once served from `public/`.

## Maintenance notes

- Keep archive dates accurate; archive sorting is date-based.
- Prefer stable tags to avoid fragmented filters.
- Validate any new post with a local `npm start` pass before commit.
- Run production build before release PRs.
