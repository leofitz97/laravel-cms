<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;

class HomeController extends Controller
{
  /**
   * Display dashboard stats and list of pages.
   */
  public function index()
  {

    $pages = Page::where('is_published', true)
    ->orderBy('created_at', 'desc')
    ->paginate(20);
    return Inertia::render('welcome', ['pages'=>$pages->getCollection()]);
  }
}
