<?php

namespace App\Services\Shop;

use App\Models\Shop\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartService
{
    public function resolve(Request $request): Cart
    {
        if ($user = Auth::user()) {
            return Cart::firstOrCreate(['user_id' => $user->id]);
        }

        $sessionId = $request->session()->getId();

        return Cart::firstOrCreate(['session_id' => $sessionId]);
    }

    public function mergeGuestCart(Request $request): void
    {
        $user = Auth::user();

        if (! $user) {
            return;
        }

        $guestCart = Cart::where('session_id', $request->session()->getId())->first();

        if (! $guestCart || $guestCart->items->isEmpty()) {
            return;
        }

        $userCart = Cart::firstOrCreate(['user_id' => $user->id]);

        foreach ($guestCart->items as $item) {
            $existing = $userCart->items()->where('shop_product_id', $item->shop_product_id)->first();

            if ($existing) {
                $existing->update(['quantity' => $existing->quantity + $item->quantity]);
            } else {
                $userCart->items()->create([
                    'shop_product_id' => $item->shop_product_id,
                    'quantity' => $item->quantity,
                ]);
            }
        }

        $guestCart->items()->delete();
        $guestCart->delete();
    }
}
