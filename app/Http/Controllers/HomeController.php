<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        return \Inertia\Inertia::render('HomePage');
    }
}
