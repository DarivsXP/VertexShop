<?php

namespace App\Http\Controllers\Api\Shop;

use App\Http\Controllers\Controller;
use App\Models\Shop\Coupon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function validateCode(Request $request): JsonResponse
    {
        $data = $request->validate([
            'code' => ['required', 'string'],
            'subtotal' => ['required', 'numeric', 'min:0'],
        ]);

        $coupon = Coupon::where('code', strtoupper($data['code']))->first();

        if (! $coupon || ! $coupon->isValidFor((float) $data['subtotal'])) {
            return response()->json(['message' => 'Invalid or expired coupon.'], 422);
        }

        return response()->json([
            'code' => $coupon->code,
            'discount' => $coupon->calculateDiscount((float) $data['subtotal']),
            'type' => $coupon->type,
            'value' => $coupon->value,
        ]);
    }
}
