# ClauseX

Scans a Terms of Service or Privacy Policy (pasted text or a screenshot) and
returns a plain-English risk grade, flagged clauses, and — on trial/Pro —
lower-risk alternative apps and a ready-to-send data-deletion request.

## Stack

- Next.js 14 (App Router)
- Tailwind CSS, lucide-react
- Gemini API (primary) / Groq API (failover) for scanning — server-side only
- Firebase — Auth (email link) + Firestore (profiles, scan history)
- Paystack for billing — not wired up yet, next milestone

## 1. Install and configure

```bash
npm install
cp .env.example .env.local
```

**Gemini / Groq** — keys from aistudio.google.com/apikey and
console.groq.com/keys. Model names drift; if a scan starts 404ing, check
the current names against each provider's docs.

**Firebase**
1. Create a project at console.firebase.google.com.
2. Build → Authentication → get started → enable the **Email link
   (passwordless sign-in)** provider, and also enable **Google** while
   you're there (just needs a support email, no extra config for local
   dev — OAuth consent screen branding only matters once you're live).
3. Build → Firestore Database → create database (start in production
   mode — the rules below handle access, you don't need test mode).
4. Project settings → General → scroll to "Your apps" → add a web app →
   copy the config values into the `NEXT_PUBLIC_FIREBASE_*` vars.
5. Project settings → Service accounts → Generate new private key →
   downloads a JSON file. Copy `project_id`, `client_email`, and
   `private_key` into the matching `FIREBASE_*` vars (keep the quotes and
   `\n` sequences in the private key exactly as downloaded).
6. Authentication → Settings → Authorized domains — add `localhost` (it's
   there by default) and your production domain once you have one.
7. Deploy the security rules: `firebase deploy --only firestore:rules`
   (needs the Firebase CLI: `npm i -g firebase-tools`, then `firebase login`
   and `firebase init firestore` once to link this folder to your project) —
   or paste the contents of `firestore.rules` into the Firebase console's
   Firestore → Rules tab manually.

```bash
npm run dev
```

## 2. Deploying

Push to GitHub, import into Vercel, add every var from `.env.local` under
Settings → Environment Variables, then redeploy. Add the deployed domain
to Firebase's Authorized domains list too, or sign-in links will fail.

## Project structure

- `app/api/scan`, `app/api/detect` — the LLM-facing endpoints
- `lib/gemini.js` / `lib/groq.js` / `lib/llm.js` — the hybrid provider clients
- `lib/firebase/client.js` — browser SDK (auth + Firestore reads)
- `lib/firebase/admin.js` — server-only SDK, full access, bypasses
  `firestore.rules` entirely
- `lib/firebase/verifyToken.js` — checks the ID token API routes receive
- `firestore.rules` — the actual security boundary, since the
  `NEXT_PUBLIC_FIREBASE_*` config is not a secret
- `app/auth/callback/page.jsx` — completes email-link sign-in client-side
- `lib/tier.js` — computes free/trial/pro from a profile doc, expiring
  trials after 5 days without a scheduled job
- `hooks/useUser.js` — client-side auth + live Firestore profile listener
- `hooks/useScanEngine.js` — client-side scan state, talks to `/api/scan`
- `components/` — one piece of UI per file, each kept small on purpose

## Known gaps

- Paystack isn't connected yet — "Upgrade to Pro" is a placeholder alert.
  Trial activation works for real; going Pro doesn't yet.
- Settings and Help in the profile drawer are still placeholders.
- No admin tooling — to comp someone Pro manually, edit their doc in the
  Firestore console (`profiles/{uid}` → set `tier: "pro"`).
