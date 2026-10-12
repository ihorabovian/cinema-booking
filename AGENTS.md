<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- Routes live in `app/`. Components are Server Components by default; add `"use client"` only when a component needs state, effects or browser APIs.
- Design tokens are defined in `app/globals.css` (`:root` variables exposed through `@theme`). There is no `tailwind.config` file.

## Rules

### Approach

- Read the surrounding code before changing it, and match its style: naming, structure, comment density.
- Do what was asked and nothing more. If you notice something else worth fixing, mention it instead of changing it silently.
- Ask when a decision affects the API, data shape or UX, or when requirements conflict (design vs. API, task vs. existing code). Decide small things yourself and mention them in the summary.
- For an unfamiliar library or a new major version, check its docs before writing code from memory.
- Ask before adding a new dependency.

### Code quality

- Keep code readable: separate logical blocks with blank lines, use clear names, avoid deep nesting.
- Don't copy-paste. Once something repeats three or more times, extract a function, component or constant.
- Keep a constant next to where it's used; move it to a shared file only when several places need it.
- No magic values (colors, numbers, strings) inline when a token or constant exists for them. Add new colors as tokens in `app/globals.css`.
- Comments explain why, not what. Mark temporary workarounds with `// TODO` and the reason.

### Secrets

- Never put secrets or keys in client code or in git. Local secrets go in `.env.local` (ignored by git).
- Variables prefixed with `NEXT_PUBLIC_` are bundled into the browser. Never use that prefix for secrets.

### Verification

- After changes, run `npm run typecheck` and `npm run lint`. Don't call something done until both pass.
- For UI changes, run `npm run dev` and check the page in the browser when you can.
- Be explicit about what was verified and what wasn't.

### Git

- Name commits and PRs following the `git-naming` skill. Keep commits small and logical, each one building on its own.
- Never force-push or rewrite pushed history unless explicitly asked.
- Ask before deleting files.

### Communication

- Keep answers short and to the point, and explain things clearly and simply.
- Don't repeat what was already said or restate the obvious.
