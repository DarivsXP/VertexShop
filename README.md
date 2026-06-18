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
php scripts/generate-shop-images.php   # downloads Unsplash/Pexels photos locally
npm install && npm run build
php artisan serve
```

Visit `http://127.0.0.1:8000`

## Deploy (Amezmo)

Push to GitHub and connect to Amezmo. On deploy, `.amezmo/deploy.success` runs migrations and seeds automatically.

Set in `.env`:

```
SANCTUM_STATEFUL_DOMAINS=your-domain.com
```

## Resume description

Built a full-stack e-commerce platform featuring authentication, product management, shopping cart functionality, order tracking, and responsive user interfaces. Integrated REST APIs and optimized frontend performance for desktop and mobile users.
