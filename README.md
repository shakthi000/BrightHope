# Bright Hope Counselling & Coaching Centre

A premium, production-ready website for Bright Hope Counselling & Coaching Centre in Chennai. Built with Next.js 15, featuring immersive 3D visuals, smooth animations, functional appointment booking, contact forms, and email notifications.

## Features

- **Premium Design** — Original luxury aesthetic with warm, trustworthy branding
- **3D Hero Scene** — React Three Fiber scene: glowing path, growing tree, particles, floating books
- **Smooth Animations** — Framer Motion, GSAP ScrollTrigger, Lenis smooth scroll
- **Appointment Booking** — Full booking flow with Supabase storage and Resend emails
- **Contact Form** — Validated form with rate limiting, spam protection, and email delivery
- **SEO Optimized** — Metadata, Open Graph, JSON-LD schema, sitemap, robots.txt
- **Accessible** — WCAG AA compliance, keyboard navigation, ARIA labels, skip links
- **Performance** — Optimized for Lighthouse scores > 95

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | Shadcn UI (Radix) |
| Animations | Framer Motion, GSAP, Lenis |
| 3D | React Three Fiber, Three.js |
| Database | Supabase (PostgreSQL) |
| Email | Resend |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Supabase account
- Resend account

### Installation

```bash
# Clone and install
cd BrightHope
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migration in Supabase SQL Editor
# File: supabase/migrations/001_initial_schema.sql

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

See `.env.example` for all required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production site URL |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | Verified sender email |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID (optional) |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── contact/        # Contact form API
│   │   └── book-appointment/
│   ├── about/
│   ├── blog/
│   ├── book-appointment/
│   ├── contact/
│   ├── services/
│   └── ...
├── components/
│   ├── animations/         # Framer Motion wrappers
│   ├── forms/              # Contact & appointment forms
│   ├── layout/             # Header, Footer, SmoothScroll
│   ├── sections/           # Homepage sections
│   ├── three/              # React Three Fiber scenes
│   └── ui/                 # Shadcn UI components
└── lib/
    ├── email/              # Resend email templates
    ├── supabase/           # Database client
    └── validations/        # Zod schemas
supabase/
└── migrations/             # SQL schema
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with all sections |
| `/about` | Mission, vision, founder story |
| `/services` | Counselling & academic services |
| `/testimonials` | Client testimonials |
| `/contact` | Contact form & information |
| `/book-appointment` | Appointment booking |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual blog posts |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms of service |

## Database Setup

Run the migration in Supabase SQL Editor:

```sql
-- See supabase/migrations/001_initial_schema.sql
```

Tables created:
- `contact_submissions` — Contact form data
- `appointments` — Booking records with unique booking IDs

## Email Setup (Resend)

1. Create account at [resend.com](https://resend.com)
2. Verify your domain or use the sandbox for testing
3. Add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to `.env.local`
4. Emails are sent to `lakshmiananthanssv@gmail.com` with user confirmations

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Vercel deployment instructions.

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## License

Private — All rights reserved by Bright Hope Counselling & Coaching Centre.
