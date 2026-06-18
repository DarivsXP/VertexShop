<?php

namespace Database\Seeders;

use App\Models\Shop\Category;
use App\Models\Shop\Coupon;
use App\Models\Shop\Product;
use App\Models\Shop\Review;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class VertexShopSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@vertexshop.demo'],
            [
                'name' => 'Vertex Admin',
                'password' => Hash::make('password'),
                'is_admin' => true,
            ]
        );

        $demoUser = User::updateOrCreate(
            ['email' => 'customer@vertexshop.demo'],
            [
                'name' => 'Demo Customer',
                'password' => Hash::make('password'),
                'is_admin' => false,
            ]
        );

        Coupon::updateOrCreate(
            ['code' => 'VERTEX10'],
            [
                'type' => 'percent',
                'value' => 10,
                'min_order' => 25,
                'is_active' => true,
                'expires_at' => now()->addYear(),
            ]
        );

        Coupon::updateOrCreate(
            ['code' => 'DEVGEAR5'],
            [
                'type' => 'fixed',
                'value' => 5,
                'min_order' => 40,
                'is_active' => true,
                'expires_at' => now()->addYear(),
            ]
        );

        $categories = [
            [
                'name' => 'Apparel',
                'slug' => 'apparel',
                'description' => 'Developer hoodies, tees, and everyday wear.',
                'image' => '/images/shop/categories/apparel.jpg',
            ],
            [
                'name' => 'Desk Setup',
                'slug' => 'desk-setup',
                'description' => 'Keyboards, mugs, and gear for your workspace.',
                'image' => '/images/shop/categories/desk-setup.jpg',
            ],
            [
                'name' => 'Books & Learning',
                'slug' => 'books-learning',
                'description' => 'Guides and references for growing devs.',
                'image' => '/images/shop/categories/books-learning.jpg',
            ],
            [
                'name' => 'Accessories',
                'slug' => 'accessories',
                'description' => 'Stickers, cables, and small essentials.',
                'image' => '/images/shop/categories/accessories.jpg',
            ],
        ];

        $products = [
            ['Laravel Hoodie', 'apparel', 49.99, 59.99, 42, 'laravel-hoodie', true],
            ['Vue.js Keyboard', 'desk-setup', 89.99, 109.99, 18, 'vue-js-keyboard', true],
            ['API Architecture Mug', 'desk-setup', 16.99, null, 75, 'api-architecture-mug', false],
            ['Clean Code Field Guide', 'books-learning', 34.99, 39.99, 30, 'clean-code-field-guide', true],
            ['Git Sticker Pack', 'accessories', 9.99, null, 120, 'git-sticker-pack', false],
            ['Mechanical Keycap Set', 'desk-setup', 29.99, 34.99, 55, 'mechanical-keycap-set', false],
            ['Full-Stack Dev Tee', 'apparel', 24.99, 29.99, 60, 'full-stack-dev-tee', false],
            ['MySQL Query Notebook', 'books-learning', 14.99, null, 88, 'mysql-query-notebook', false],
            ['USB-C Hub Pro', 'accessories', 44.99, 54.99, 22, 'usb-c-hub-pro', true],
            ['Tailwind CSS Cap', 'apparel', 19.99, null, 40, 'tailwind-css-cap', false],
            ['Docker Blueprint Poster', 'accessories', 12.99, 15.99, 35, 'docker-blueprint-poster', false],
            ['REST API Cheat Sheet', 'books-learning', 11.99, null, 95, 'rest-api-cheat-sheet', false],
        ];

        $categoryMap = [];

        foreach ($categories as $categoryData) {
            $categoryMap[$categoryData['slug']] = Category::updateOrCreate(
                ['slug' => $categoryData['slug']],
                $categoryData
            );
        }

        foreach ($products as [$name, $categorySlug, $price, $compare, $stock, $imageSlug, $featured]) {
            $slug = Str::slug($name);

            $product = Product::updateOrCreate(
                ['slug' => $slug],
                [
                    'shop_category_id' => $categoryMap[$categorySlug]->id,
                    'name' => $name,
                    'description' => "Premium {$name} for developers who care about quality tools and clean workflows. Demo product for VertexShop.",
                    'price' => $price,
                    'compare_price' => $compare,
                    'stock' => $stock,
                    'image' => "/images/shop/products/{$imageSlug}.jpg",
                    'is_featured' => $featured,
                ]
            );

            Review::updateOrCreate(
                [
                    'shop_product_id' => $product->id,
                    'user_id' => $demoUser->id,
                ],
                [
                    'rating' => 5,
                    'comment' => 'Great quality and fast checkout. Perfect demo product!',
                ]
            );
        }
    }
}
