<?php

namespace App\Http\Controllers\Api\Shop;

use App\Http\Controllers\Controller;
use App\Models\Shop\CartItem;
use App\Models\Shop\Product;
use App\Services\Shop\CartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function __construct(private CartService $cartService) {}

    public function show(Request $request): JsonResponse
    {
        $cart = $this->cartService->resolve($request)->load('items.product.category');

        return response()->json([
            'items' => $cart->items,
            'subtotal' => $cart->subtotal(),
            'count' => $cart->items->sum('quantity'),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'product_id' => ['required', 'exists:shop_products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $product = Product::findOrFail($data['product_id']);

        if ($product->stock < $data['quantity']) {
            return response()->json(['message' => 'Not enough stock available.'], 422);
        }

        $cart = $this->cartService->resolve($request);
        $item = $cart->items()->where('shop_product_id', $product->id)->first();

        if ($item) {
            $newQty = $item->quantity + $data['quantity'];
            if ($product->stock < $newQty) {
                return response()->json(['message' => 'Not enough stock available.'], 422);
            }
            $item->update(['quantity' => $newQty]);
        } else {
            $cart->items()->create([
                'shop_product_id' => $product->id,
                'quantity' => $data['quantity'],
            ]);
        }

        return $this->show($request);
    }

    public function update(Request $request, CartItem $item): JsonResponse
    {
        $cart = $this->cartService->resolve($request);

        if ($item->shop_cart_id !== $cart->id) {
            abort(404);
        }

        $data = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        if ($item->product->stock < $data['quantity']) {
            return response()->json(['message' => 'Not enough stock available.'], 422);
        }

        $item->update(['quantity' => $data['quantity']]);

        return $this->show($request);
    }

    public function destroy(Request $request, CartItem $item): JsonResponse
    {
        $cart = $this->cartService->resolve($request);

        if ($item->shop_cart_id !== $cart->id) {
            abort(404);
        }

        $item->delete();

        return $this->show($request);
    }
}
