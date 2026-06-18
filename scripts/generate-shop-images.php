<?php

/**
 * Download curated stock photos (Unsplash / Pexels) for VertexShop.
 * Run: php scripts/generate-shop-images.php
 */

$items = [
    'categories/apparel' => [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&h=600&q=80',
    ],
    'categories/desk-setup' => [
        'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&h=600&q=80',
    ],
    'categories/books-learning' => [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&h=600&q=80',
    ],
    'categories/accessories' => [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&h=600&q=80',
    ],
    'products/laravel-hoodie' => [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&h=600&q=80',
    ],
    'products/vue-js-keyboard' => [
        'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&h=600&q=80',
        'https://images.pexels.com/photos/2530698/pexels-photo-2530698.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    ],
    'products/api-architecture-mug' => [
        'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&h=600&q=80',
    ],
    'products/clean-code-field-guide' => [
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&h=600&q=80',
    ],
    'products/git-sticker-pack' => [
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&h=600&q=80',
    ],
    'products/mechanical-keycap-set' => [
        'https://images.pexels.com/photos/2530698/pexels-photo-2530698.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    ],
    'products/full-stack-dev-tee' => [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&h=600&q=80',
    ],
    'products/mysql-query-notebook' => [
        'https://images.pexels.com/photos/907010/pexels-photo-907010.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&h=600&q=80',
    ],
    'products/usb-c-hub-pro' => [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&h=600&q=80',
    ],
    'products/tailwind-css-cap' => [
        'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&h=600&q=80',
    ],
    'products/docker-blueprint-poster' => [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&h=600&q=80',
    ],
    'products/rest-api-cheat-sheet' => [
        'https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1454165804316-0b7f880c9931?auto=format&fit=crop&w=800&h=600&q=80',
    ],
];

$baseDir = dirname(__DIR__).'/public/images/shop';
$context = stream_context_create([
    'http' => [
        'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\r\nAccept: image/*\r\n",
        'timeout' => 45,
        'follow_location' => 1,
    ],
    'ssl' => [
        'verify_peer' => true,
        'verify_peer_name' => true,
    ],
]);

$downloaded = 0;
$skipped = 0;
$failed = 0;

foreach ($items as $relativePath => $urls) {
    [$dir, $slug] = explode('/', $relativePath);
    $path = "{$baseDir}/{$dir}";

    if (! is_dir($path)) {
        mkdir($path, 0777, true);
    }

    $file = "{$path}/{$slug}.jpg";

    if (file_exists($file) && filesize($file) > 10000) {
        echo "Skip {$relativePath}.jpg (already exists)\n";
        $skipped++;
        continue;
    }

    $saved = false;

    foreach ($urls as $url) {
        $image = @file_get_contents($url, false, $context);

        if ($image !== false && strlen($image) > 10000) {
            file_put_contents($file, $image);
            echo "Saved {$relativePath}.jpg\n";
            $downloaded++;
            $saved = true;
            break;
        }
    }

    if (! $saved) {
        echo "Failed {$relativePath}.jpg\n";
        $failed++;
    }
}

$placeholder = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="Product placeholder">
  <rect width="800" height="600" fill="#1a2440"/>
  <rect x="280" y="220" width="240" height="160" rx="12" fill="#2a3555"/>
  <text x="400" y="310" text-anchor="middle" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="20">Image unavailable</text>
</svg>
SVG;

file_put_contents("{$baseDir}/placeholder.svg", $placeholder);

echo "\nDone: {$downloaded} downloaded, {$skipped} skipped, {$failed} failed.\n";

if ($failed > 0) {
    exit(1);
}
