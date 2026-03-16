# Pust Yoga

En personalisert yin yoga-applikasjon som genererer skreddersydde treningsprogrammer basert på ønsket varighet og intensitetsnivå.

## Om prosjektet

Pust Yoga lar brukere lage tilpassede yin yoga-programmer ved å velge total varighet og fordeling mellom oppvarming, hovedprogram og avspenning. Algoritmen genererer en sekvens av yogastillinger som følger en bell-kurve for intensitet gjennom økten.

Appens filosofi er basert på lærene til Paul Grilley, Bernie Clark og Norman Blair.

## Funksjoner

- **Tilpassede programmer** – Velg total varighet (20–120 min) og fordel tid mellom oppvarming, hoveddel og avspenning
- **Intelligent generering** – Bell-kurve-algoritme som varierer intensitet naturlig gjennom økt
- **Detaljerte stillinger** – Informasjon om muskelgrupper, meridianlinjer, intensitetsnivå og instruksjoner
- **Guidet avspilling** – Nedtelling per stilling med støtte for lydveiledning
- **Brukerkontoer** – Innlogging via e-post (OTP) med Supabase Auth
- **Abonnement** – Betalingsmur via Stripe for premiumfunksjoner (lydveiledning)
- **PWA-støtte** – Kan installeres som app på mobil og desktop

## Tech Stack

| Teknologi | Bruk |
|-----------|------|
| [Next.js 15](https://nextjs.org) | React-rammeverk med App Router og SSR |
| [React 19](https://react.dev) | UI-bibliotek |
| [TypeScript](https://typescriptlang.org) | Typesjekking |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [Supabase](https://supabase.com) | Database, autentisering og fillagring |
| [Stripe](https://stripe.com) | Betalingsbehandling |
| [next-pwa](https://github.com/shadowwalker/next-pwa) | Progressive Web App-støtte |

## Kom i gang

### Forutsetninger

- Node.js 18+
- En Supabase-prosjekt med poses-database
- Stripe-konto (valgfritt, for betalingsfunksjoner)

### Installasjon

```bash
# Klon repoet
git clone <repo-url>
cd PustYoga

# Installer avhengigheter
npm install
```

### Miljøvariabler

Lag en `.env.local`-fil i rotkatalogen:

```env
NEXT_PUBLIC_SUPABASE_URL=din_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=din_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=din_service_role_key
STRIPE_SECRET_KEY=din_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=din_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=din_webhook_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Start utviklingsserver

```bash
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

## Prosjektstruktur

```
src/
├── app/
│   ├── page.tsx              # Hjemside – tidsvelger
│   ├── program/              # Generert treningsprogram
│   ├── innlogging/           # Innloggingsside (OTP)
│   ├── profil/               # Brukerprofil og abonnement
│   └── api/
│       ├── workout/generate/ # Generer treningsprogram
│       ├── poses/[slug]/     # Hent posedetaljer
│       ├── payments/         # Stripe checkout og webhook
│       └── media/audio/      # Lydveiledning
├── components/
│   ├── workout/              # TimeSelector, WorkoutView, WorkoutPlayer, PoseCard
│   ├── audio/                # AudioPlayer
│   └── ui/                   # SubscriptionGate
└── lib/
    ├── workout/              # Typer, konstanter og genereringsalgoritme
    ├── supabase/             # Klient- og serveroppsett
    └── stripe/               # Stripe-klient
```

## Genereringsalgoritme

Treningsprogrammet genereres ved hjelp av en bell-kurve-modell for intensitet. For hvert 30-minutters blokk varierer intensiteten slik:

- **0–5 min**: Nivå 1–2 (oppvarming)
- **5–15 min**: Nivå 2–4 (stigende)
- **15–20 min**: Nivå 5–6 (topp)
- **20–25 min**: Nivå 4–5 (nedtrapping)
- **25–30 min**: Nivå 2–3 (avspenning)

Cooldown-seksjonen bruker utelukkende REBOUND-kategoristillinger. Algoritmen unngår gjenbruk av stillinger innen samme økt.

## Databasestruktur (Supabase)

- **poses** – Yogastillinger med metadata (navn, kategori, intensitetsnivå, varighet)
- **pose_variants** – Varianter av stillinger med instruksjoner og tilpasninger
- **pose_media** – Bilde, lyd og video tilknyttet stillinger
- **user_profiles** – Brukerdata og abonnementsstatus

## Scripts

```bash
npm run dev      # Start utviklingsserver
npm run build    # Bygg for produksjon
npm run start    # Start produksjonsserver
npm run lint     # Kjør ESLint
```

## Lisens

Privat prosjekt. Alle rettigheter forbeholdt.
