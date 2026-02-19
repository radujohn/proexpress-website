# ProExpress — Expedite Transportation Website

A complete, production-ready website for ProExpress expedite transportation services.  
Built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and **MongoDB**.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, services overview, why choose, testimonials, FAQ |
| `/services` | Sprinter Van & Straight Truck service details |
| `/about` | Company story, team, fleet, stats |
| `/tracking` | UI-only shipment tracking (portal coming soon) |
| `/quote` | Full quote request form (saved to MongoDB) |
| `/contact` | Contact form + map + business info (saved to MongoDB) |
| `/faq` | 12 Q&As with FAQPage JSON-LD schema for AEO |
| `/admin` | **Password-protected** lead & contact management dashboard |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | SEO robots directives |

---

## Environment Variables

Copy `.env.example` to `.env` (or edit `.env` directly) and set the following:

```env
# MongoDB connection string (required)
MONGO_URL=mongodb://localhost:27017

# MongoDB database name (optional — defaults to "proexpress" if unset or placeholder)
DB_NAME=proexpress

# Public base URL used for SEO metadata and sitemap generation
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# -----------------------------------------------------------------------
# ADMIN DASHBOARD PASSWORD (required to access /admin)
# -----------------------------------------------------------------------
# Set a strong, unique password here. This value is never exposed to the
# browser — it lives only on the server and is compared at request time.
#
# Rules:
#   - Must be at least 12 characters
#   - Use a mix of letters, numbers, and symbols
#   - Never commit a real production password to source control
#   - Rotate this value if you suspect it has been compromised
#
ADMIN_PASSWORD=change-me-before-going-to-production

# -----------------------------------------------------------------------
# EMAIL / SMTP (optional — all six variables must be set to enable email)
# -----------------------------------------------------------------------
# When all six variables below are present, ProExpress will send a
# branded HTML notification email to NOTIFY_EMAIL whenever:
#   • A quote request is submitted via /quote
#   • A contact form is submitted via /contact
#
# If any variable is missing or SMTP delivery fails, the form submission
# is still saved to MongoDB and the API returns success — leads are
# never lost because of an email error.
#
# SMTP_HOST   — Your mail server hostname, e.g. mail.yourdomain.com
# SMTP_PORT   — 465 for implicit TLS (recommended) or 587 for STARTTLS
# SMTP_USER   — The username you authenticate with (usually an email address)
# SMTP_PASS   — The SMTP account password (never your webmail login password)
# SMTP_FROM   — Sender label shown in the inbox, e.g.:
#                 ProExpress <notify@yourdomain.com>
# NOTIFY_EMAIL — The address that receives every new lead notification
#
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=notify@yourdomain.com
SMTP_PASS=your-smtp-password
SMTP_FROM=ProExpress <notify@yourdomain.com>
NOTIFY_EMAIL=owner@yourdomain.com
```

> **Security note — ADMIN_PASSWORD:** If `ADMIN_PASSWORD` is not set, the
> `/api/admin/login` endpoint returns `503 Service Unavailable` and no admin
> access is possible.

> **Security note — SMTP_PASS:** Never use your webmail login password as the
> SMTP password. Create a dedicated SMTP / app password for this account via
> your hosting control panel (cPanel → Email Accounts → Connect Devices, or
> equivalent). Rotate it periodically.

---

## Setting ADMIN_PASSWORD

### Local development

Edit `/app/.env`:

```env
ADMIN_PASSWORD=my-local-dev-password
```

Restart the dev server so Next.js picks up the new value:

```bash
sudo supervisorctl restart nextjs
# or
yarn dev
```

### Production (Railway / Render / VPS)

Set the variable in your hosting platform's dashboard — **do not** put a real production
password in `.env` committed to Git.

| Platform | Where to set |
|----------|--------------|
| Railway | Project → Variables tab |
| Render | Service → Environment tab |
| Docker / VPS | Pass via `-e ADMIN_PASSWORD=...` or your secrets manager |

---

## Admin Dashboard (`/admin`)

1. Navigate to `/admin`
2. Enter the value of `ADMIN_PASSWORD` from your environment
3. The dashboard shows two tabs:
   - **Quote Leads** — all quote request submissions with pickup/delivery details
   - **Contact Forms** — all contact form submissions
4. Per-row actions:
   - **Status dropdown** — change between `New`, `Contacted`, `Closed`
   - **Delete** — permanently removes the record from MongoDB
5. Use the **Search** box and **Status filter** to find specific leads

---

## Running Locally

```bash
# Install dependencies
yarn install

# Start the dev server (via supervisor — already running in this environment)
sudo supervisorctl restart nextjs

# Or run directly
yarn dev
```

The app runs on **port 3000**. All `/api/*` routes are handled by the same Next.js process.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion |
| Database | MongoDB (via `mongodb` driver) |
| Fonts | Barlow (headings) + Inter (body) via Google Fonts |
| Icons | lucide-react |
| IDs | UUID v4 (no MongoDB ObjectIDs exposed) |
| SEO | JSON-LD schemas, next/font, sitemap.js, robots.js |

---

## API Reference

All endpoints are under `/api/*`.

### Public

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/quote` | Submit a quote request |
| `POST` | `/api/contact` | Submit a contact message |
| `GET` | `/api/health` | Health check |

### Admin (requires `Authorization: Bearer <ADMIN_PASSWORD>`)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/admin/login` | Verify password, returns token |
| `GET` | `/api/admin/leads` | List all quote leads |
| `GET` | `/api/admin/contacts` | List all contact submissions |
| `PATCH` | `/api/admin/leads/:id` | Update lead status |
| `PATCH` | `/api/admin/contacts/:id` | Update contact status |
| `DELETE` | `/api/admin/leads/:id` | Delete a lead |
| `DELETE` | `/api/admin/contacts/:id` | Delete a contact |

---

## Contact

**ProExpress** — When Speed Is Non-Negotiable  
📞 [414-324-9699](tel:4143249699)  
📧 info@proexpress.com  
📍 1234 Industrial Dr, Milwaukee, WI 53201
