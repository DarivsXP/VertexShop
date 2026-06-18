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

## Deploy (Amezmo)

## Resume description

Built a full-stack e-commerce platform featuring authentication, product management, shopping cart functionality, order tracking, and responsive user interfaces. Integrated REST APIs and optimized frontend performance for desktop and mobile users.
