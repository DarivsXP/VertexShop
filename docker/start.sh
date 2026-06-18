#!/usr/bin/env bash
set -e

cd /var/www/html

echo "Caching Laravel..."
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Running migrations..."
php artisan migrate --force

echo "Seeding shop data..."
php artisan db:seed --class=VertexShopSeeder --force

echo "Starting services on port ${PORT:-10000}..."
export PORT="${PORT:-10000}"
envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/sites-enabled/default

php-fpm -D
exec nginx -g 'daemon off;'
