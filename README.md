# Aurevon Realty

Next.js website and admin CMS for Aurevon Realty.

## Local Development

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Firebase Setup

The app is integrated with Firebase Auth, Firestore, and Storage, but it only connects when the Firebase public environment variables are present. Copy `.env.example` to `.env.local` locally, then add the same keys in Vercel Project Settings > Environment Variables.

Required Firebase client keys:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Firebase console requirements:

- Enable Google sign-in in Firebase Authentication.
- Deploy `firestore.rules` to the same Firebase project.
- Only `arundongare150@gmail.com` is allowed into the admin panel.

## Commands

```bash
npm run lint
npm run build
```

Public pages fall back to bundled sample content if Firebase is missing or anonymous Firestore reads are not available during build.
