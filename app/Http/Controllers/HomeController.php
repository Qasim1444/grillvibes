<?php

namespace App\Http\Controllers;

use App\Models\FoodItem;
use App\Models\Branch;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Public marketing landing page.
     *
     * The site root serves the marketing site to signed-out visitors.
     * Authenticated users don't need the marketing pitch, so they are sent
     * straight to their dashboard.
     */
    public function index(Request $request)
    {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }

        $foodItems = FoodItem::query()
            ->with('foodCategory:id,name')
            ->where('status', true)
            ->orderBy('name')
            ->limit(8)
            ->get(['id', 'foodcategory_id', 'name', 'description', 'price', 'image'])
            ->map(fn (FoodItem $item) => [
                'id' => $item->id,
                'name' => $item->name,
                'description' => $item->description,
                'price' => (float) $item->price,
                'image' => $item->image,
                'category' => $item->foodCategory?->name,
            ]);

        $reservations = Reservation::query()
            ->with('branch:id,name')
            ->whereBetween('reserved_at', [now(), now()->endOfDay()])
            ->whereIn('status', ['pending', 'confirmed'])
            ->orderBy('reserved_at')
            ->limit(8)
            ->get(['id', 'reserved_at', 'party_size', 'status', 'branch_id'])
            ->map(fn (Reservation $reservation) => [
                'id' => $reservation->id,
                'reserved_at' => $reservation->reserved_at?->toIso8601String(),
                'party_size' => $reservation->party_size,
                'status' => $reservation->status,
                'branch' => $reservation->branch?->name,
            ]);

        $branches = Branch::query()
            ->where('status', true)
            ->orderBy('name')
            ->get(['id', 'name', 'address', 'phone', 'latitude', 'longitude'])
            ->map(fn (Branch $branch) => [
                'id' => $branch->id,
                'name' => $branch->name,
                'address' => $branch->address,
                'phone' => $branch->phone,
                'latitude' => $branch->latitude,
                'longitude' => $branch->longitude,
            ]);

        return Inertia::render('HomePage', [
            'foodItems' => $foodItems,
            'reservations' => $reservations,
            'branches' => $branches,
        ]);
    }
}
