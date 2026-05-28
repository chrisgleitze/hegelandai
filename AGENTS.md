# Hegel and AI — Codex Agent Config

## Project

A web application dedicated to the intersection of Georg Wilhelm Friedrich Hegel's philosophy and artificial intelligence. Currently it features a curated literature overview on Hegel and AI, dialectic, recognition, objective spirit, institutions, responsibility, and AI ethics. Further sections and components are planned.

The literature data lives in a Markdown file (`HEGEL_AI_LITERATURE_2026_claude.md`) at the project root and is parsed at build time by `src/lib/literature.ts`. In development, the frontend polls `/api/literature` every 1.2 s so edits to the Markdown are reflected without a page reload.

## Sister Project / Porting Rule

This repository mirrors the structure of the sister project:

- Local path: `/home/chris/projects/kantandai`
- GitHub: `https://github.com/chrisgleitze/kantandai`

When coding in this repository, Codex must actively check whether relevant structural, UI, parser, configuration, or workflow changes exist in `projects/kantandai`, and port them where appropriate. Adapt all copied or ported changes from **Kant and AI** to **Hegel and AI**:

- Replace Kant-specific labels, descriptions, source files, images, and metadata with Hegel-specific equivalents.
- Preserve Hegel-specific literature, terminology, portrait assets, and page copy.
- Do not blindly copy Kant content into this project; use the sister repository as a technical/template reference.
- If a change in `kantandai` conflicts with Hegel-specific requirements, keep the Hegel-specific behavior and document the reason briefly in the response.

## Tech Stack

- **Framework:** Next.js 13 (Pages Router), TypeScript
- **Styling:** Tailwind CSS v3 with `@tailwindcss/typography`
- **Content:** MDX (`@next/mdx`) with remark-gfm and rehype-prism for syntax highlighting
- **UI components:** Headless UI, Heroicons
- **Node:** managed via nvm (default: v22); use absolute binary paths when running npm from a non-interactive shell — the `npm`/`node` shell functions wrap `_load_nvm` and break in subshells

## Key Files

| Path                                    | Role                                           |
| --------------------------------------- | ---------------------------------------------- |
| `src/pages/index.tsx`                   | Home page — Hero + LiteratureOverview          |
| `src/components/LiteratureOverview.tsx` | Renders literature sections and entries        |
| `src/components/LiteratureStats.tsx`    | Entry count display                            |
| `src/lib/literature.ts`                 | Markdown parser; exports `getLiteratureData()` |
| `src/pages/api/literature.ts`           | API route for dev hot-reload                   |
| `HEGEL_AI_LITERATURE_2026_claude.md`    | Source data (Markdown)                         |
| `public/images/hegel-profile.jpg`       | Hegel portrait used in the Hero                |

## Conventions

- All user-facing text is in English unless legal/site-owner pages require German.
- Tailwind utility classes only — no custom CSS files beyond `src/styles/tailwind.css`.
- Components live in `src/components/`, pages in `src/pages/`.
- The literature data model is defined in `src/lib/literature.ts` (`LiteratureEntry`, `LiteratureSection`, `LiteratureData`); keep it the single source of truth.

## Codex Workflow

- Before non-trivial coding changes, compare the relevant file or pattern with `/home/chris/projects/kantandai`.
- Prefer small, reviewable patches.
- After edits, run the most relevant verification command available for the change, such as `npm run build`, `npm run lint`, or a targeted smoke test.
- Mention in the final response which files changed and whether `kantandai` was checked or used as a template.
