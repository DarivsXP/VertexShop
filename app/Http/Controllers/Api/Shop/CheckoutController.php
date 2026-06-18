<?php

namespace App\Http\Controllers\Api\Shop;

use App\Http\Controllers\Controller;
use App\Models\Shop\Coupon;
use App\Models\Shop\Order;
use App\Services\Shop\CartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    public function __construct(private CartService $cartService) {}

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'shipping_address' => ['required', 'array'],
            'shipping_address.name' => ['required', 'string', 'max:255'],
            'shipping_address.line1' => ['required', 'string', 'max:255'],
            'shipping_address.city' => ['required', 'string', 'max:255'],
            'shipping_address.country' => ['required', 'string', 'max:255'],
            'shipping_address.postal_code' => ['required', 'string', 'max:20'],
            'coupon_code' => ['nullable', 'string'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $cart = $this->cartService->resolve($request)->load('items.product');

        if ($cart->items->isEmpty()) {
            return response()->json(['message' => 'Your cart is empty.'], 422);
        }

        foreach ($cart->items as $item) {
            if ($item->product->stock < $item->quantity) {
                return response()->json([
                    'message' => "{$item->product->name} only has {$item->product->stock} left in stock.",
                ], 422);
            }
        }

        $subtotal = $cart->subtotal();
        $discount = 0;
        $couponCode = null;

        if (! empty($data['coupon_code'])) {
            $coupon = Coupon::where('code', strtoupper($data['coupon_code']))->first();
            if (! $coupon || ! $coupon->isValidFor($subtotal)) {
                return response()->json(['message' => 'Invalid or expired coupon.'], 422);
            }
            $discount = $coupon->calculateDiscount($subtotal);
            $couponCode = $coupon->code;
        }

        $total = max($subtotal - $discount, 0);

        $order = DB::transaction(function () use ($request, $cart, $data, $subtotal, $discount, $total, $couponCode) {
            $order = Order::create([
                'user_id' => $request->user()->id,
                'order_number' => 'VS-'.strtoupper(Str::random(8)),
                'status' => 'confirmed',
                'subtotal' => $subtotal,
                'discount' => $discount,
                'total' => $total,
                'coupon_code' => $couponCode,
                'shipping_address' => $data['shipping_address'],
                'notes' => $data['notes'] ?? null,
            ]);

            foreach ($cart->items as $item) {
                $order->items()->create([
                    'shop_product_id' => $item->shop_product_id,
                    'product_name' => $item->product->name,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);

                $item->product->decrement('stock', $item->quantity);
            }

            $cart->items()->delete();

            return $order->load('items');
        });

        return response()->json([
            'message' => 'Order placed successfully. Payment simulated for demo purposes.',
            'order' => $order,
        ], 201);
    }
}
