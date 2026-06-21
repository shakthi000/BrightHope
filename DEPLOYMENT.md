# Deployment Guide — Bright Hope

This guide covers deploying the Bright Hope website to Vercel with Supabase, Resend, and Google Analytics.

## Prerequisites Checklist

- [ ] GitHub repository with the project code
- [ ] [Vercel](https://vercel.com) account
- [ ] [Supabase](https://supabase.com) project created
- [ ] [Resend](https://resend.com) account with verified domain
- [ ] Domain name (optional, e.g. `brighthope.in`)

---

## Step 1: Supabase Setup

### Create Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New Project**
3. Choose a name, password, and region (preferably closest to Chennai — `ap-south-1`)

### Run Database Migration

1. Open **SQL Editor** in your Supabase dashboard
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Run the SQL to create tables and indexes

### Get API Keys

1. Go to **Settings → API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

---

## Step 2: Resend Setup

### Create API Key

1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Create a new API key → `RESEND_API_KEY`

### Verify Domain (Production)

1. Go to **Domains** in Resend dashboard
2. Add your domain (e.g. `brighthope.in`)
3. Add the DNS records Resend provides
4. Set `RESEND_FROM_EMAIL=Bright Hope <notifications@brighthope.in>`

### Sandbox Testing

For development, use Resend's sandbox:
- From email: `onboarding@resend.dev`
- Can only send to the email you signed up with

---

## Step 3: Deploy to Vercel

### Connect Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `./`

### Environment Variables

Add these in Vercel **Settings → Environment Variables**:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Bright Hope <notifications@yourdomain.com>
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Deploy

Click **Deploy**. Vercel will run `npm run build` automatically.

---

## Step 4: Custom Domain

1. In Vercel project → **Settings → Domains**
2. Add your domain (e.g. `brighthope.in` and `www.brighthope.in`)
3. Update DNS at your registrar:
   - `A` record → `76.76.21.21` (Vercel)
   - Or `CNAME` for `www` → `cname.vercel-dns.com`
4. Update `NEXT_PUBLIC_SITE_URL` to your production domain
5. Redeploy

---

## Step 5: Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a property for your website
3. Get the **Measurement ID** (G-XXXXXXXXXX)
4. Add to Vercel env: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
5. Redeploy

---

## Step 6: Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property (domain or URL prefix)
3. Verify ownership via DNS TXT record or HTML tag
4. Submit sitemap: `https://your-domain.com/sitemap.xml`

---

## Post-Deployment Verification

Run through this checklist after deployment:

- [ ] Homepage loads with 3D hero scene
- [ ] All navigation links work
- [ ] Contact form submits successfully
- [ ] Appointment booking creates record in Supabase
- [ ] Email received at `lakshmiananthanssv@gmail.com`
- [ ] Confirmation email sent to user
- [ ] `/sitemap.xml` accessible
- [ ] `/robots.txt` accessible
- [ ] Open Graph preview works (test with [opengraph.xyz](https://www.opengraph.xyz))
- [ ] Mobile responsive on all pages
- [ ] No console errors in browser

### Test Contact Form

```bash
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9962261841",
    "subject": "Test Message",
    "message": "This is a test message from deployment verification."
  }'
```

### Test Appointment Booking

```bash
curl -X POST https://your-domain.com/api/book-appointment \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9962261841",
    "service": "individual",
    "date": "2025-07-01",
    "time": "10:00",
    "message": "Test booking"
  }'
```

---

## Troubleshooting

### Emails Not Sending

- Verify `RESEND_API_KEY` is correct
- Check domain verification in Resend
- For sandbox: recipient must be your Resend account email
- Check Vercel function logs for errors

### Database Errors

- Confirm migration SQL was executed
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set (not anon key)
- Check Supabase logs in dashboard

### 3D Scene Not Loading

- Check browser WebGL support
- Scene is client-side only (dynamic import with `ssr: false`)
- Falls back to gradient background if WebGL unavailable

### Build Failures

```bash
npm run build
```

Fix any TypeScript or ESLint errors locally before pushing.

---

## Performance Tips

- Vercel automatically handles CDN, compression, and edge caching
- 3D scene uses reduced particle count for mobile (`dpr={[1, 1.5]}`)
- Images use Next.js automatic optimization
- Fonts loaded with `display: swap`

---

## Security Notes

- Never commit `.env.local` or expose `SUPABASE_SERVICE_ROLE_KEY`
- Rate limiting is in-memory (resets on cold starts); consider Upstash Redis for production scale
- Honeypot field protects forms from basic bots
- RLS enabled on Supabase tables; API uses service role

---

## Support

For technical issues with the website codebase, refer to the README.md.
For counselling services, contact Bright Hope at lakshmiananthanssv@gmail.com or 9962261841.
