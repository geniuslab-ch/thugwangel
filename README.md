# Kyx-Nyx — site officiel (ex-Thug-W-Angel)

Next.js 16 · next-intl (EN / FR / DE / IT) · Tailwind 4. Déployé sur Vercel.

## Ce qu'il faut configurer (Vercel → Settings → Environment Variables)

| Variable | Rôle | Exemple |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Domaine canonique (sitemap, hreflang, schema) | `https://thug-angel.ch` (ou `https://kyx-nyx.ch` après migration) |
| `NEXT_PUBLIC_BOOKING_EMAIL` | Adresse booking affichée + destinataire mailto | `info@thug-angel.ch` |
| `NEXT_PUBLIC_BOOKING_ENDPOINT` | URL Formspree / Web3Forms pour recevoir le formulaire sans ouvrir la messagerie | `https://formspree.io/f/xxxx` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 | `G-XXXXXXX` |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Code de vérification Google Search Console (balise meta) | `abc123…` |

Sans `NEXT_PUBLIC_BOOKING_ENDPOINT`, le formulaire fonctionne quand même : il ouvre la messagerie du visiteur avec la demande pré-remplie.

## Modifier le contenu

- **Identité, réseaux sociaux, morceaux, vidéos, photos** → `lib/site.ts`
  ⚠️ Ajouter les URLs officielles (Instagram, Spotify, YouTube, TikTok…) dans `socials` : elles alimentent le footer **et** le `sameAs` du schema.org (signal clé pour le Knowledge Graph Google).
- **Textes** → `messages/en.json`, `fr.json`, `de.json`, `it.json`
- **Photos** → `public/images/` puis déclarer dans `photos` (lib/site.ts). Format JPG ~1600 px de large + version `-press` haute déf.
- **Musique** → `public/music/track_XX.mp3` + liste `tracks`.

## Pages & URLs

| Page | EN | FR | DE | IT |
|---|---|---|---|---|
| Accueil | `/en` | `/fr` | `/de` | `/it` |
| Booking | `/en/booking` | `/fr/reservation` | `/de/buchung` | `/it/prenotazione` |
| Dossier de presse | `/en/press-kit` | `/fr/dossier-de-presse` | `/de/pressemappe` | `/it/cartella-stampa` |

`/` redirige selon la langue du navigateur. `sitemap.xml`, `robots.txt` et `manifest.webmanifest` sont générés automatiquement.

## Dev local

```bash
npm install
npm run dev   # http://localhost:3000
```
