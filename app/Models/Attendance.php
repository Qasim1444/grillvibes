<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    use HasFactory;

    /** Statuses that count as a paid working day in the payroll formula. */
    public const PAID_STATUSES = ['present', 'late', 'holiday'];

    public const STATUSES = ['present', 'absent', 'late', 'half_day', 'leave', 'holiday'];

    protected $fillable = [
        'user_id',
        'date',
        'check_in',
        'check_out',
        'status',
        'worked_minutes',
        'late_minutes',
        'note',
    ];

    protected $casts = [
        'date' => 'date',
        'worked_minutes' => 'integer',
        'late_minutes' => 'integer',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
