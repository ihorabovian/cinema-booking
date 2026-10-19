<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui.
- Desktop design, 1440px wide: https://www.figma.com/design/AHzwzYFVJGm81EfKxFhBL4/
- `app/` holds routes only. Own components go in `components/`, shadcn components in `components/ui/`, non-UI code in `lib/`.

## Rules

### Styling

- Use design tokens for colors. Add a new Figma color as `--name` in `:root` and `--color-name` in `@theme inline` in `app/globals.css`, then use `bg-name` / `text-name`. No `bg-gray-*`, `bg-black` or hex values in class names.
- Wrap page content in `mx-auto max-w-page px-[120px]`. Don't use Tailwind's `container` class: its widths don't match the design.
- Don't edit files in `components/ui/`. Override shadcn styles with `className`.
- Before calling UI work done, compare it with its Figma node through the Figma MCP: sizes, spacing, colors, typography.

### Data (GraphQL)

- Data comes from the GraphQL API at `${API_BASE_URL}/graphql` through `gqlClient` (`lib/graphql-client.ts`). Don't use REST endpoints.
- One query per file in `lib/queries/`, written with `graphql(...)` from `@/lib/gql`. Request only the fields the UI uses.
- After adding or changing a query, run `npm run gen`. Never edit `lib/gql/`: it's generated.
- Pages call the functions in `lib/cinema-api.ts`, which wrap each query with `"use cache"` and check `success`.
- Component prop types come from query results in `lib/types/cinema.ts`. Don't write API types by hand.

### Next.js

- Add `"use client"` only to components with state or event handlers, and keep them small. Fetch data in the Server Component and pass it in as props.
- Cache data with `"use cache"` and `cacheLife()` (`cacheComponents` is on). Don't use `fetch(url, { next: { revalidate } })`.
- Use `next/image` without `unoptimized`. Images with `fill` need `sizes`; images in the first screen get `preload`.
- Use `Link` for navigation and `button` for actions.
- Never use the `NEXT_PUBLIC_` prefix for secrets: those variables are bundled into the browser.
- After editing `app/globals.css` or `next.config.ts`, restart `npm run dev`. The dev server may keep serving the old styles or config.

### Code

- Once something repeats three or more times, extract a function, component or constant.
- Ask before adding a new dependency.

### Verification

- After changes, run `npm run typecheck` and `npm run lint`. Both must pass before the work is done.

### Git

- Name commits and PRs following the `git-naming` skill. One logical change per commit.
- Ask before deleting files.

### Communication

- Answer the user's questions in chat using the `caveman` skill.
