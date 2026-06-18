<?php

namespace App\Http\Controllers\Api\Shop;

use App\Http\Controllers\Controller;
use App\Models\Shop\Category;
use App\Models\Shop\Order;
use App\Models\Shop\Product;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    public function dashboard(): JsonResponse
    {
        return response()->json([
            'stats' => [
                'products' => Product::count(),
                'categories' => Category::count(),
                'orders' => Order::count(),
                'customers' => User::where('is_admin', false)->count(),
                'revenue' => (float) Order::sum('total'),
                'pending_orders' => Order::where('status', 'pending')->count(),
            ],
            'recent_orders' => Order::with('user')->latest()->take(5)->get(),
            'low_stock' => Product::where('stock', '<=', 5)->orderBy('stock')->take(5)->get(),
        ]);
    }

    public function products(): JsonResponse
    {
        return response()->json(Product::with('category')->latest()->paginate(20));
    }

    public function storeProduct(Request $request): JsonResponse
    {
        $data = $this->validateProduct($request);
        $data['slug'] = Str::slug($data['name']).'-'.Str::lower(Str::random(4));

        $product = Product::create($data);

        return response()->json($product->load('category'), 201);
    }

    public function updateProduct(Request $request, Product $product): JsonResponse
    {
        $product->update($this->validateProduct($request, $product));

        return response()->json($product->load('category'));
    }

    public function destroyProduct(Product $product): JsonResponse
    {
        $product->delete();

        return response()->json(['message' => 'Product deleted.']);
    }

    public function categories(): JsonResponse
    {
        return response()->json(Category::withCount('products')->orderBy('name')->get());
    }

    public function storeCategory(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'string', 'max:500'],
        ]);

        $category = Category::create([
            ...$data,
            'slug' => Str::slug($data['name']),
        ]);

        return response()->json($category, 201);
    }

    public function orders(): JsonResponse
    {
        return response()->json(Order::with(['user', 'items'])->latest()->paginate(20));
    }

    public function updateOrder(Request $request, Order $order): JsonResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:pending,confirmed,shipped,delivered,cancelled'],
        ]);

        $order->update($data);

        return response()->json($order->load(['user', 'items']));
    }

    public function users(): JsonResponse
    {
        return response()->json(
            User::where('is_admin', false)->latest()->paginate(20)
        );
    }

    private function validateProduct(Request $request, ?Product $product = null): array
    {
        return $request->validate([
            'shop_category_id' => ['required', 'exists:shop_categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'compare_price' => ['nullable', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'image' => ['nullable', 'string', 'max:500'],
            'is_featured' => ['sometimes', 'boolean'],
        ]);
    }
}
