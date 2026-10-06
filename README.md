# AI Builder System

A prompt-to-website builder that turns natural-language requests into a polished, animated website preview and supports conversational follow-up edits.

## Current MVP

- Prompt → structured `SiteSpec` → live website preview
- Responsive desktop, tablet, and mobile preview controls
- Modern generated sections: hero, features, stats, testimonials, pricing, FAQ, and contact
- Theme edits for dark/light, colors, and minimal/glass/neon/soft visual effects
- Follow-up edits such as “add pricing”, “remove testimonials”, “make it blue”, or “make it minimal”
- Undo/redo version history
- Browser local autosave
- Motion-powered interface effects
- Optional Groq or OpenAI integration with a no-key local fallback

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Optional AI provider

Copy `.env.example` to `.env.local` and configure a provider.

Groq example:

```env
AI_PROVIDER=groq
AI_MODEL=your-current-model-id
GROQ_API_KEY=your_key_here
```

OpenAI example:

```env
AI_PROVIDER=openai
AI_MODEL=your-current-model-id
OPENAI_API_KEY=your_key_here
```

Keep API keys only in environment variables. If a provider is not configured or temporarily fails, the builder falls back to the local site-spec engine so the core workflow still works.

## Architecture

```text
User prompt
  ↓
/api/generate
  ↓
Configured AI provider (optional)
  ↓ fallback
Local prompt interpreter
  ↓
Validated SiteSpec
  ↓
React live preview
  ↓
Follow-up edits + version history
```

The MVP intentionally generates a structured website specification before rendering. That makes conversational edits predictable and gives the project a clean path toward visual editing, generated source files, publishing, Supabase persistence, templates, and asset management.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

GitHub Actions also runs TypeScript and production-build checks on pushes and pull requests to `main`.

## Next milestones

1. Supabase authentication and persistent projects
2. Per-project database autosave and revision history
3. Visual element selection and property editing
4. Real code/file generation sandbox
5. Template gallery
6. Asset and image workflow
7. Vercel publishing flow
8. Project sharing and collaboration
