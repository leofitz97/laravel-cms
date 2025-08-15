<?php
namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class PublicPageController extends Controller {
  public function show($slug, Request $request) {
    $page = Page::where('slug',$slug)->where('is_published', true)->with('sections','client')->firstOrFail();

    // Track view server-side (optional): use AnalyticsController::trackView route instead via client JS
    return view('public.page', compact('page'));
  }
}
