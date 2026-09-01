<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\CurrentBranch;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

/**
 * Outlet switcher for the topbar. The Branches management page (CRUD) was
 * removed, but branch scoping itself stays — so any authenticated user can
 * still switch which outlet their UI is scoped to.
 */
class BranchController extends Controller
{
    /** Switch the active outlet the UI is scoped to (topbar switcher). */
    public function switch(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'branch_id' => 'required|exists:branches,id',
        ]);

        CurrentBranch::set((int) $data['branch_id']);

        return back()->with('success', 'Switched outlet.');
    }
}
