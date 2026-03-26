# Jemea Trading PLC — Website

A premium, futuristic website for Jemea Trading PLC, an Ethiopian import-export company specializing in agricultural products.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (animations)
- **next-themes** (dark/light mode)
- **Nodemailer** (contact form emails)
- **Lucide React** (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in SMTP credentials:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=Jemeaplc@gmail.com
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, products showcase, trust indicators, CTA |
| `/about` | Company story, mission, vision, values, timeline |
| `/products` | Product grid with filters, detail modals |
| `/contact` | Contact form, company info, FAQ |

## Replacing Placeholder Images

Replace the SVG files in `public/images/` with actual product photos (PNG with transparent backgrounds recommended). Keep the same filenames or update references in the page components.

## Production Build

```bash
npm run build
npm start
```
