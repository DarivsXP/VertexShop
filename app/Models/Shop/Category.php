<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $table = 'shop_categories';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'shop_category_id');
    }
}
