<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'manager_name',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    /** Seating areas that belong to this outlet. */
    public function places(): HasMany
    {
        return $this->hasMany(Place::class);
    }

    /** Sales booked against this outlet. */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
