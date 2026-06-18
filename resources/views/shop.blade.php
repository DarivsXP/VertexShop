<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="VertexShop — Full-stack e-commerce platform with landing page, storefront, authentication, cart, and admin dashboard. Built with Laravel and React.">
    <title>VertexShop — Developer Gear Store</title>
    <link rel="icon" href="/logo.png" type="image/png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/shop.css', 'resources/js/shop/main.jsx'])
    @else
        <style>
            body { font-family: Inter, system-ui, sans-serif; background: #0b1020; color: #f8fafc; margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 2rem; }
            .setup-card { max-width: 520px; background: #121a2f; border: 1px solid rgba(255,255,255,.08); border-radius: 1rem; padding: 1.5rem; line-height: 1.7; }
            code { background: #1a2440; padding: .15rem .45rem; border-radius: .35rem; }
            h1 { margin-top: 0; font-size: 1.5rem; }
        </style>
    @endif
</head>
<body class="shop-body">
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        <div id="shop-app"></div>
    @else
        <div class="setup-card">
            <h1>VertexShop assets not built</h1>
            <p>The React frontend has not been compiled yet, so the storefront cannot load.</p>
            <p>Run these commands, then refresh:</p>
            <p><code>npm install</code><br><code>npm run build</code><br><code>php artisan serve</code></p>
            <p>For live development, run <code>composer dev</code> instead (starts Laravel + Vite together).</p>
        </div>
    @endif
</body>
</html>
