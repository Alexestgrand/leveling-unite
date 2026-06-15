# Leveling: Unite – The Fragments

Site officiel de l'événement communautaire **Leveling: Unite** — tableau de bord, règles, indices, et soumission de la phrase secrète.

**Production :** https://leveling-unite.vercel.app  
**Soumettre une phrase :** https://leveling-unite.vercel.app/soumettre  
**API (séparée) :** https://leveling-validate-api.onrender.com

---

## Documentation complète

→ **[PROJECT.md](./PROJECT.md)** — architecture, déploiement, API, règles, dépannage.

---

## Démarrage rapide

```bash
cp .env.example .env
npm install
npm run dev
```

Variable requise :

```env
PUBLIC_API_URL=http://localhost:8080
```

L'API Go doit tourner en parallèle (`leveling-validate-api`, voir son README).

---

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Dev server (port 5173) |
| `npm run build` | Build statique → `build/` |
| `npm run check` | Vérification TypeScript / Svelte |
| `npm run preview` | Preview du build |

---

## Stack

SvelteKit 5 · Svelte 5 · Tailwind v4 · TypeScript · adapter-static · Vercel

---

## Structure

```
src/
├── routes/          # Pages (accueil, règles, indices, soumettre, auth…)
├── lib/
│   ├── data/mock.ts # Contenu événement (éditer ici)
│   ├── api/         # Client API validation
│   ├── components/  # UI
│   └── styles/      # modern.css
└── app.css
```

Contenu événement : **`src/lib/data/mock.ts`**
