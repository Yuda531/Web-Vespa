# 🛵 Vespa Abas — Sales & Restoration Website

A modern, SEO-optimized website for a **Vespa sales and restoration** business. Built with SvelteKit and server-side rendering, the platform showcases Vespa units for sale, presents restoration services, and converts visitors into direct WhatsApp conversations with the owner.

> **User Journey:** Landing Page → Browse Products / Services → Detail Page → Click WhatsApp → Owner Contacted

---

## ✨ Features

### Public-Facing
- **Product Catalog** — Browse available Vespa units with filtering by category, condition, and status
- **Service Showcase** — Detailed restoration and maintenance service pages
- **WhatsApp Integration** — Pre-filled WhatsApp deep-links on every product and service page for instant contact
- **Customer Testimonials** — Social proof section with ratings
- **Responsive Design** — Vintage-themed UI optimized for all screen sizes
- **SEO Optimized** — Server-side rendering, JSON-LD structured data, dynamic sitemap, Open Graph meta tags

### Admin Panel (`/admin`)
- **Dashboard** — Overview of products, services, and site statistics
- **Product Management** — Full CRUD with image uploads, pricing, and SEO fields
- **Service Management** — Create and manage restoration service listings
- **Testimonial Management** — Moderate customer reviews with visibility controls
- **Category Management** — Organize products by Vespa model types
- **Image Uploads** — Drag-and-drop image uploader powered by Cloudinary CDN
- **Site Settings** — Configure WhatsApp number, site title, and other global settings

---

## 🛠️ Tech Stack

| Layer       | Technology                                          |
| ----------- | --------------------------------------------------- |
| Framework   | **SvelteKit** (SSR) — Svelte 5, Vite 7              |
| Database    | **Supabase** PostgreSQL (hosted)                     |
| Auth        | **Supabase Auth** (email/password for admin)         |
| Media       | **Cloudinary** CDN (image hosting & optimization)    |
| UI          | **shadcn-svelte** + **TailwindCSS v4**               |
| Icons       | **Lucide Svelte**                                    |
| Rich Text   | **Tiptap** editor                                    |

---

## 📁 Project Structure

```
web-vespa-abas/
├── src/
│   ├── app.html                    # HTML template
│   ├── app.css                     # TailwindCSS + vintage theme tokens
│   ├── app.d.ts                    # TypeScript declarations
│   ├── hooks.server.ts             # Supabase init + admin route guard
│   ├── lib/
│   │   ├── supabase.ts             # Browser client
│   │   ├── cloudinary.ts           # URL builder helpers
│   │   ├── whatsapp.ts             # WhatsApp deep-link builder
│   │   ├── seo.ts                  # JSON-LD generators
│   │   ├── types.ts                # TypeScript interfaces
│   │   ├── constants.ts            # Site-wide constants
│   │   ├── utils.ts                # Utilities (cn, formatPrice, etc.)
│   │   ├── components/
│   │   │   ├── ui/                 # shadcn-svelte base components
│   │   │   ├── layout/             # Navbar, Footer, MobileMenu
│   │   │   ├── shared/             # ProductCard, WhatsappButton, etc.
│   │   │   ├── sections/           # HeroSection, FeaturedProducts, etc.
│   │   │   └── admin/              # Admin-specific components
│   │   └── server/
│   │       ├── supabase.ts         # Server-only admin client
│   │       └── cloudinary.ts       # Upload helpers
│   └── routes/
│       ├── +layout.svelte          # Public layout (Navbar + Footer)
│       ├── +page.svelte            # Homepage
│       ├── products/               # Product listing + detail pages
│       ├── services/               # Services listing + detail pages
│       ├── about/                  # About page
│       ├── contact/                # Contact page
│       ├── auth/                   # Login / Logout
│       ├── admin/                  # Admin panel (protected)
│       │   ├── products/           # Product CRUD
│       │   ├── services/           # Service CRUD
│       │   ├── testimonials/       # Testimonial CRUD
│       │   ├── categories/         # Category management
│       │   └── settings/           # Site settings
│       └── api/admin/              # API endpoints
├── static/                         # Static assets (favicon, etc.)
├── supabase-schema.sql             # Database schema
├── supabase-seed.sql               # Seed data
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [npm](https://www.npmjs.com/)
- A [Supabase](https://supabase.com/) project
- A [Cloudinary](https://cloudinary.com/) account

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-username/web-vespa-abas.git
   cd web-vespa-abas
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**

   Copy the example env file and fill in your credentials:

   ```sh
   cp .env.example .env
   ```

   Required variables:

   ```env
   # Supabase
   PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # Cloudinary
   PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Site
   PUBLIC_SITE_URL=http://localhost:5173
   ```

4. **Set up the database**

   Run the SQL scripts in your Supabase SQL Editor:

   - `supabase-schema.sql` — Creates all tables, indexes, and RLS policies
   - `supabase-seed.sql` — Seeds sample data (products, services, testimonials)

5. **Create an admin user**

   In the Supabase Authentication dashboard, create an email/password user for admin access.

### Development

Start the development server:

```sh
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

### Type Checking

```sh
npm run check
```

---

## 🎨 Design

The website uses a **vintage / retro** design theme inspired by classic Italian Vespa heritage:

- **Steel Blue** (`#375971`) — Primary color for buttons, links, and navigation
- **Cream** (`#F5F0E8`) — Light backgrounds and card surfaces
- **Rich Black** (`#1A1A1A`) — Text and dark sections
- **Warm Gold** (`#C8A96E`) — Highlights, badges, and hover states
- **Dusty Sage** (`#8B9D83`) — Secondary text and subtle elements

Typography: **Playfair Display** (headings) + **Inter** (body text)

---

## 📄 License

This project is private and proprietary.
