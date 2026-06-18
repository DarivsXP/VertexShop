<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $table = 'shop_products';

    protected $fillable = [
        'shop_category_id',
        'name',
        'slug',
        'description',
        'price',
        'compare_price',
        'stock',
        'image',
        'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'compare_price' => 'decimal:2',
            'is_featured' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'shop_category_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'shop_product_id');
    }
}
