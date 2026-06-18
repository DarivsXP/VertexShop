<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $table = 'shop_coupons';

    protected $fillable = [
        'code',
        'type',
        'value',
        'min_order',
        'is_active',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'value' => 'decimal:2',
            'min_order' => 'decimal:2',
            'is_active' => 'boolean',
            'expires_at' => 'datetime',
        ];
    }

    public function isValidFor(float $subtotal): bool
    {
        if (! $this->is_active) {
            return false;
        }

        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }

        return $subtotal >= (float) $this->min_order;
    }

    public function calculateDiscount(float $subtotal): float
    {
        if (! $this->isValidFor($subtotal)) {
            return 0;
        }

        if ($this->type === 'fixed') {
            return min((float) $this->value, $subtotal);
        }

        return round($subtotal * ((float) $this->value / 100), 2);
    }
}
