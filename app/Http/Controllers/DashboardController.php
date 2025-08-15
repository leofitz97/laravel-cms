<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
  /**
   * Display dashboard stats and list of pages.
   */
  public function index(Request $request)
  {
    // Stats
    $totalPages = Page::count();
    $publishedPages = Page::whereNotNull('published_at')->count();
    $draftPages = $totalPages - $publishedPages;

  $pages = Page::latest()
    ->take(10)
    ->get()
    ->map(function ($page) {
        return [
            'id' => $page->id,
            'title' => $page->title,
            'slug' => $page->slug,
            'theme' => $page->theme,
            'published_at' => $page->published_at,
        ];
    });

    $startDate = Carbon::now()->subDays(29)->startOfDay();
      $endDate   = Carbon::now()->endOfDay();

    // Analytics
    // Fetch daily page views (replace 'page_views' with your real table)
    // Assume: page_views table has columns -> id, page_id, viewed_at, etc.
    $viewsData = DB::table('page_views')
        ->selectRaw('DATE(created_at) as date, COUNT(*) as total')
        ->whereBetween('created_at', [$startDate, $endDate])
        ->groupBy('date')
        ->orderBy('date', 'asc')
        ->get();

    // Generate full date range array to avoid missing days
    $labels = [];
    $series = [];

    for ($date = $startDate->copy(); $date <= $endDate; $date->addDay()) {
      $formattedDate = $date->format('Y-m-d');
      $labels[] = $date->format('M j');

      // Find matching count
      $matching = $viewsData->firstWhere('date', $formattedDate);
      $series[] = $matching ? (int) $matching->total : 0;
    }

    return Inertia::render('dashboard', [
      'stats' => [
          'totalPages' => $totalPages,
          'publishedPages' => $publishedPages,
          'draftPages' => $draftPages,
      ],
      'pages' => $pages,
      'chartLabels' => $labels,
      'chartSeries' => [
          [
              'name' => 'Views',
              'data' => $series
          ]
      ],
    ]);
  }
}
