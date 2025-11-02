# Run — Next.js + Neon Portfolio

This project delivers a localized, server-rendered portfolio powered by Next.js 15, next-intl, Tailwind CSS, and a Neon PostgreSQL database accessed through Prisma.

## Getting Started

```bash
npm install --ignore-scripts
npm run dev
```

The landing page is available at `http://localhost:3000/pt/home` (or change the locale prefix as needed). Use the call-to-action button labelled “Acesso Autorizado” to jump directly to the portfolio content.

## Environment Variables

Copy `.env.example` to `.env.local` and provide your Neon connection strings:

```
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
DIRECT_URL="postgresql://user:password@host/db?sslmode=require"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Prisma & Database

Generate the Prisma client and sync the schema once your Neon credentials are configured:

```bash
npx prisma generate
npx prisma db push
```

## Deployment Notes

- The repository no longer ships with Firebase functions or configuration files.
- Netlify builds can use the default `npm run build` command with the publish directory set to `.next` when deploying the SSR output.
- A helper script `deploy-nobom.ps1` is available for Windows environments to guarantee UTF-8 without BOM encoding during automated setup.
