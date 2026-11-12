<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# User Preferences & Agent Rules
- **Do NOT open the browser or use browser subagents.** The user will manually view, check, and test all pages in their own browser and guide the agent directly.
- **Do NOT search, scrape, download, or generate images when the user says they will provide them.** Just focus immediately on building the UI and layout structure; the user will provide the exact image assets.
