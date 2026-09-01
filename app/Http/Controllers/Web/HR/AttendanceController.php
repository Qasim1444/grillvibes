<?php

namespace App\Http\Controllers\Web\HR;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Attendance is entered as a day sheet, not row by row — marking 50 staff one
 * modal at a time is unusable. `index()` therefore returns the full roster for
 * the chosen date with any already-saved row merged in, and `bulkStore()` upserts
 * the whole day in one POST.
 */
class AttendanceController extends Controller
{
    public function index(Request $request): Response
    {
        $date = $this->resolveDate($request->query('date'));
        $search = trim((string) $request->query('search', ''));

        $employees = User::query()
            ->payable()
            ->with('designation:id,name')
            ->when($search !== '', fn ($q) => $q->where(function ($w) use ($search) {
                $w->where('name', 'like', "%{$search}%")
                    ->orWhere('employee_code', 'like', "%{$search}%");
            }))
            ->orderBy('name')
            ->get(['id', 'name', 'employee_code', 'designation_id']);

        $saved = Attendance::query()
            ->whereIn('user_id', $employees->pluck('id'))
            ->whereDate('date', $date)
            ->get()
            ->keyBy('user_id');

        // The roster is one row per employee for one day — it never needs paging,
        // and paging it would make "save the whole sheet" lose the other pages.
        $roster = $employees->map(function (User $u) use ($saved) {
            $row = $saved->get($u->id);

            return [
                'user_id' => $u->id,
                'name' => $u->name,
                'employee_code' => $u->employee_code,
                'designation_name' => $u->designation?->name,
                'attendance_id' => $row?->id,
                'status' => $row->status ?? 'present',
                'check_in' => $row ? substr((string) $row->check_in, 0, 5) : null,
                'check_out' => $row ? substr((string) $row->check_out, 0, 5) : null,
                'late_minutes' => (int) ($row->late_minutes ?? 0),
                'note' => $row->note ?? null,
            ];
        })->values();

        return Inertia::render('HR/Attendance', [
            'date' => $date->toDateString(),
            'roster' => $roster,
            'statuses' => Attendance::STATUSES,
            'filters' => ['search' => $search],
            // The day's own tallies are computed on the page so they stay live
            // while the sheet is being edited; this is month-to-date context.
            'monthSummary' => $this->monthSummary($date),
        ]);
    }

    /** Save (or re-save) an entire day's sheet. */
    public function bulkStore(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'date' => ['required', 'date'],
            'rows' => ['required', 'array', 'min:1'],
            'rows.*.user_id' => ['required', 'integer', 'exists:users,id'],
            'rows.*.status' => ['required', Rule::in(Attendance::STATUSES)],
            'rows.*.check_in' => ['nullable', 'date_format:H:i'],
            'rows.*.check_out' => ['nullable', 'date_format:H:i'],
            'rows.*.late_minutes' => ['nullable', 'integer', 'min:0', 'max:1440'],
            'rows.*.note' => ['nullable', 'string', 'max:255'],
        ]);

        $date = Carbon::parse($data['date'])->toDateString();

        DB::transaction(function () use ($data, $date) {
            foreach ($data['rows'] as $row) {
                // Deliberately not updateOrCreate: its match clause is a plain
                // equality, and the `date` cast writes "2026-08-03 00:00:00" —
                // which MySQL truncates but SQLite keeps verbatim, so the match
                // would miss and re-saving a day would hit the unique index.
                $attendance = Attendance::query()
                    ->where('user_id', $row['user_id'])
                    ->whereDate('date', $date)
                    ->first() ?? new Attendance(['user_id' => $row['user_id'], 'date' => $date]);

                $attendance->fill([
                    'status' => $row['status'],
                    'check_in' => $row['check_in'] ?? null,
                    'check_out' => $row['check_out'] ?? null,
                    'worked_minutes' => $this->workedMinutes($row['check_in'] ?? null, $row['check_out'] ?? null),
                    'late_minutes' => $row['late_minutes'] ?? 0,
                    'note' => $row['note'] ?? null,
                ])->save();
            }
        });

        return redirect()->back()->with('success', 'Attendance saved for '.Carbon::parse($date)->format('d M Y').'.');
    }

    public function destroy($id): RedirectResponse
    {
        Attendance::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Attendance entry removed.');
    }

    private function resolveDate(mixed $value): Carbon
    {
        try {
            return filled($value) ? Carbon::parse((string) $value)->startOfDay() : Carbon::today();
        } catch (\Throwable) {
            return Carbon::today();
        }
    }

    /** Minutes between check-in and check-out; overnight shifts roll past midnight. */
    private function workedMinutes(?string $in, ?string $out): int
    {
        if (blank($in) || blank($out)) {
            return 0;
        }

        [$inH, $inM] = array_map('intval', explode(':', $in));
        [$outH, $outM] = array_map('intval', explode(':', $out));
        $minutes = (($outH * 60) + $outM) - (($inH * 60) + $inM);

        return $minutes < 0 ? $minutes + 1440 : $minutes;
    }

    /** Headline numbers for the month the chosen date falls in. */
    private function monthSummary(Carbon $date): array
    {
        $rows = Attendance::query()
            ->whereBetween('date', [$date->copy()->startOfMonth(), $date->copy()->endOfMonth()])
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        return [
            'month' => $date->format('F Y'),
            'present' => (int) ($rows['present'] ?? 0) + (int) ($rows['late'] ?? 0),
            'absent' => (int) ($rows['absent'] ?? 0),
            'leave' => (int) ($rows['leave'] ?? 0),
            'marked_days' => Attendance::query()
                ->whereBetween('date', [$date->copy()->startOfMonth(), $date->copy()->endOfMonth()])
                ->distinct()
                ->count('date'),
        ];
    }
}
