<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KioskConfig extends Model
{
    protected $fillable = [
        'branch_id', 'place_id', 'order_types', 'splash_title', 'splash_subtitle',
        'splash_image', 'accent_color', 'idle_timeout_seconds',
        'require_name', 'require_phone', 'is_active',
    ];

    protected $casts = [
        'order_types' => 'array',
        'require_name' => 'boolean',
        'require_phone' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function place(): BelongsTo
    {
        return $this->belongsTo(Place::class);
    }

    /** Get config for a branch, falling back to a sensible default. */
    public static function forBranch(?int $branchId): self
    {
        return static::where('branch_id', $branchId)->first()
            ?? new static([
                'order_types' => ['dine_in', 'takeaway'],
                'splash_title' => 'Welcome',
                'splash_subtitle' => 'Tap to start your order',
                'accent_color' => '#6366f1',
                'idle_timeout_seconds' => 120,
                'require_name' => false,
                'require_phone' => false,
                'is_active' => true,
            ]);
    }

    /** Get config for a branch, falling back to a sensible default. */
    public static function forPlace(?int $placeId): self
    {
        return static::where('place_id', $placeId)->first()
            ?? new static([
                'order_types' => ['dine_in', 'takeaway'],
                'splash_title' => 'Welcome',
                'splash_subtitle' => 'Tap to start your order',
                'accent_color' => '#6366f1',
                'idle_timeout_seconds' => 120,
                'require_name' => false,
                'require_phone' => false,
                'is_active' => true,
            ]);
    }
}
