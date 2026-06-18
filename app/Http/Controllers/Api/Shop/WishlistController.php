<?php

namespace App\Http\Controllers\Api\Shop;

use App\Http\Controllers\Controller;
use App\Models\Shop\Coupon;
use App\Models\Shop\Product;
use App\Models\Shop\Review;
use App\Models\Shop\Wishlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $items = Wishlist::with('product.category')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($items);
    }

    public function store(Request $request, Product $product): JsonResponse
    {
        Wishlist::firstOrCreate([
            'user_id' => $request->user()->id,
            'shop_product_id' => $product->id,
        ]);

        return response()->json(['message' => 'Added to wishlist.']);
    }

    public function destroy(Request $request, Product $product): JsonResponse
    {
        Wishlist::where('user_id', $request->user()->id)
            ->where('shop_product_id', $product->id)
            ->delete();

        return response()->json(['message' => 'Removed from wishlist.']);
    }
}
