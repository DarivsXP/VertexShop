#!/usr/bin/env bash
set -euo pipefail

cd /var/www/html

export PORT="${PORT:-10000}"

# Render injects DATABASE_URL when a database is linked; Laravel expects DB_URL.
if [ -z "${DB_URL:-}" ] && [ -n "${DATABASE_URL:-}" ]; then
    export DB_URL="$DATABASE_URL"
fi

if [ -z "${APP_KEY:-}" ]; then
    echo "ERROR: APP_KEY is not set. Add it in Render → Environment."
    exit 1
fi

echo "Clearing stale caches..."
php artisan optimize:clear

echo "Running migrations..."
php artisan migrate --force

echo "Seeding shop data..."
php artisan db:seed --class=VertexShopSeeder --force || echo "Seed skipped or already applied."

echo "Caching Laravel for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "Starting services on port ${PORT}..."
rm -f /etc/nginx/sites-enabled/default
envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/sites-enabled/default

php-fpm -D
exec nginx -g 'daemon off;'
