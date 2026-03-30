# Simple Message Board – Specification

## Goal

Build a minimal web application where users can post, view, and delete messages.

The focus is on simplicity and completing the required functionality using AI-assisted development.

---

## Tech Requirements

- Hosting: Vercel (free tier)
- Database: Supabase (free tier)
- Version control: GitHub repository
- Programming language: nextjs + typescript

---

## Functional Requirements

### 1. Create message

- User can enter text into an input field
- On submit, the message is stored in the database

### 2. List messages

- Display all stored messages
- Order: newest first (descending by creation time)

### 3. Delete message

- Each message has a delete action
- Clicking delete removes the message from the database

---

## Data Model

A single table is sufficient:

- id (unique identifier)
- content (text)
- created_at (timestamp)

---

## Constraints

- No authentication required
- No user management
- All messages are public
- Any message can be deleted

---

## Out of Scope

- Authentication / authorization
- Pagination
- Editing messages
- Advanced UI/UX
- Rate limiting or production-grade security

---

## Deliverables

- Public URL of the deployed application (Vercel)
- GitHub repository with source code
- AI usage log (separate file)

---

## Notes

- Keep the implementation minimal and focused on requirements
- Avoid overengineering
- Prefer simple, clear solutions over complex ones

# AI Logs

## LOG SCHEMA

## Step 1 – Project initialization

**Goal:**
...

**Prompt:**
...

**Outcome:**

- ...
- ...

**Decision:**
...
