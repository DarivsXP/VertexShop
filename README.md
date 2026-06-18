# VertexShop

Full-stack e-commerce demo built with **Laravel**, **React**, **MySQL**, and **Sanctum**.

## Features

- Marketing landing page with features, testimonials, and CTAs
- Full storefront at `/shop` with categories and featured products
- Company pages: About, Contact, FAQ, Shipping, Privacy, Terms
- Product catalog with search, filtering, and infinite scroll
- Optimized images & skeleton loading
- Shopping cart & wishlist
- Product reviews and order tracking
- Mock checkout with coupon codes (`VERTEX10`, `DEVGEAR5`)
- Admin dashboard
- Dark / light mode
- Mobile-responsive layout

## Demo accounts

| Role | Email | Password |
|------|-------|----------|
| Customer | customer@vertexshop.demo | password |
| Admin | admin@vertexshop.demo | password |

## Local setup

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php scripts/generate-shop-images.php
npm install
npm run build
php artisan serve
```

Visit **http://127.0.0.1:8000** (use this exact URL — not `localhost` — so cookies and assets match).

### Development mode (live reload)

```bash
composer dev
```

This starts Laravel, Vite, queue worker, and logs together. Use this while editing React/CSS files.

### If the page is blank

1. Make sure the server is still running (`php artisan serve` must stay open).
2. Rebuild the frontend: `npm run build`
3. Hard-refresh the browser (`Ctrl+Shift+R`).
4. Confirm `public/build/manifest.json` exists.

## Deploy on Render

Render does **not** run Laravel with npm alone. Use **Docker** (files are included in this repo).

### 1. Create a PostgreSQL database

In Render Dashboard → **New** → **PostgreSQL** (Free). Copy the **Internal Database URL**.

### 2. Create a Web Service

**Important:** If your service shows **Build Command** and **Start Command** fields pre-filled with `npm install`, you are on the **Node** runtime — not Docker. Render will not work for Laravel that way. You must either create a **new** service with Language = **Docker**, or deploy via **Blueprint** (see step 4).

| Setting | Value |
|---------|-------|
| **Repository** | `https://github.com/DarivsXP/VertexShop` |
| **Branch** | `main` |
| **Language / Runtime** | **Docker** (scroll the dropdown — it is NOT Node) |
| **Dockerfile Path** | `./Dockerfile` |
| **Docker Command** | `/start.sh` *(only if the field is required; otherwise leave empty)* |
| **Build Command** | *This field should NOT appear for Docker* |
| **Start Command** | *This field should NOT appear for Docker* |
| **Health Check Path** | `/up` |

When **Docker** is selected correctly, Render builds from the `Dockerfile` automatically. You do **not** run `npm install` in the dashboard.

### 3. Environment variables

| Key | Value |
|-----|-------|
| `APP_ENV` | `production` |
| `APP_DEBUG` | `false` |
| `APP_KEY` | Run `php artisan key:generate --show` locally and paste |
| `APP_URL` | `https://YOUR-SERVICE.onrender.com` |
| `DB_CONNECTION` | `pgsql` |
| `DB_URL` | Internal Database URL from step 1 |
| `SESSION_DRIVER` | `database` |
| `CACHE_STORE` | `database` |
| `QUEUE_CONNECTION` | `database` |
| `SESSION_SECURE_COOKIE` | `true` |
| `LOG_CHANNEL` | `stderr` |
| `SANCTUM_STATEFUL_DOMAINS` | `YOUR-SERVICE.onrender.com` |

Replace `YOUR-SERVICE` with your actual Render hostname (no `https://`).

### 4. Deploy

Push to `main` or click **Manual Deploy**. First deploy takes ~5–10 minutes.

### 4b. Easiest path: Blueprint (recommended if stuck on Node runtime)

1. Render Dashboard → **New** → **Blueprint**
2. Connect `DarivsXP/VertexShop`
3. Render reads `render.yaml` and creates PostgreSQL + Docker web service automatically
4. After deploy, set `APP_URL` and `SANCTUM_STATEFUL_DOMAINS` to your `*.onrender.com` hostname

### Why your previous deploy failed

- **Runtime was wrong** — `npm install; npm run build` only builds the React UI, not a PHP server.
- **Start command was wrong** — npm cannot start Laravel; you need nginx + PHP-FPM (included in the `Dockerfile`).

## Deploy (Amezmo)

## Resume description

Built a full-stack e-commerce platform featuring authentication, product management, shopping cart functionality, order tracking, and responsive user interfaces. Integrated REST APIs and optimized frontend performance for desktop and mobile users.
