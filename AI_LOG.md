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

## Step 2 – Deployment

**Issue:**
Deployment was initially protected by authentication

**Fix:**
Disabled deployment protection in Vercel settings

**Outcome:**
Application became publicly accessible

## Step 3 – First refactor + small updates

**Goal:**
Better UX, refactor a bit.

**Prompt:**
I would like to refactor the code a bit.

Requirements:

- the initial await call, where we are fetching the messages list, also can be an action, in the actions.ts file, like: listMessages
- I would like to add some state management as well: loading state, while the user send a message, receives them, or delete one: Create a better user interface reaction for them: disable the buttons/inputs, and create a custom initial loading component.
- Separate the main components into custom "Component.tsx", and use a "Component.module.css" format for it's styling.
- Add some input validation: do not send empty messages: disable the Save button

Separate the requirements, and implement them step by step. If you have any affected thoughts about my choices, or warnings, pls let me know.

**Outcome:**
Server actions are POST-based mutations by design — using one for listMessages works but breaks the Server Component fetch pattern; flagged before implementing
Adding loading states requires at least some client components — acceptable UX trade-off, but kills the "zero JS" pure server component benefit
useFormStatus (React 19 built-in) is cleaner than manual useState for form pending state — noted as preferred approach

**Decision:**
Flagged all three concerns to the user before writing code; user later acted on warning #1 and reverted listMessages to a plain async function in lib/messages.ts

## Step 4 – Follow the industrial standard

**Goal:**
Use the industry standards.

**Prompt:**
Ok, I got it, pls use the best way for the implementation:

- do not force the listMessages as an action, use the industry standards
- find the best way for better user experience by the async methods

**Outcome**:
listMessages moved to lib/messages.ts as a plain async function — called directly from the Server Component, no 'use server' overhead on reads
Delete uses useOptimistic — item removed instantly from UI, server confirms in background, rolls back on failure
Create uses useTransition + router.refresh() — blocks the form during submission, then re-runs the Server Component fetch to stream fresh list data down without a client-side re-fetch

**Decision**:
Separated read logic (lib/messages.ts) from mutations (actions.ts) to follow Next.js idioms; chose useOptimistic over re-fetching after delete for perceived performance; router.refresh() preferred over calling listMessages client-side to keep data flow unidirectional through the Server Component

## Step 5 - debugging

**Goal**:
Fix toLocaleString() causing server/client date format mismatch in <time> element

**Prompt**:
I got 2 errors. Error: There was an error while hydrating this Suspense boundary. Switched to client rendering. How to fix them?

**Outcome**:
Root cause: toLocaleString() output differs by locale/timezone between server and browser
Fix: add suppressHydrationWarning to the <time> element in MessageItem.tsx — tells React to ignore text mismatches on that single node

**Decision**:
Chose suppressHydrationWarning over the useEffect client-only approach — timestamp is non-critical content and the simpler fix matches the project's minimal philosophy
