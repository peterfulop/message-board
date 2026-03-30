## Step 1 – Project initialization

**Goal:**
Implement create, list, and delete functionality using Next.js App Router and Supabase

**Prompt:**
Create a minimal Next.js 14 app (App Router) with Supabase integration. Use the README.md file for context.

Requirements:

- simple message board
- create, list (desc), delete messages
- use server actions
- minimal setup

Provide:

- setup steps
- folder structure
- initial code

**Outcome:**

- All three operations (create, list desc, delete) handled via server actions in actions.ts with revalidatePath('/') for cache busting after mutations
- Data fetching done in a Server Component (page.tsx) — no client-side JS or state management needed
- Single Supabase client in lib/supabase.ts; table requires one SQL statement (uuid, text, timestamptz)

**Decision:**
Used deleteMessage.bind(null, id) pattern to pass message ID into a server action without a client component; kept all styling inline to avoid adding Tailwind or a CSS framework
