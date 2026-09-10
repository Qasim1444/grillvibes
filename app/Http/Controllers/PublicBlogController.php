<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Inertia\Inertia;
use Inertia\Response;

class PublicBlogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('PublicBlog', [
            'posts' => BlogPost::query()
                ->published()
                ->with(['categories:id,name'])
                ->latest('published_at')
                ->get(['id', 'title', 'slug', 'excerpt', 'body', 'featured_image', 'published_at']),
        ]);
    }
}
