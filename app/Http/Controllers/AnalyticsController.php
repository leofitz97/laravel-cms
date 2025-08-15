<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\PageView;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnalyticsController extends Controller {
  public function __construct() {
    $this->middleware('auth:sanctum')->except(['trackView']);
  }

  // Track view endpoint (public)
  public function trackView(Request $request, Page $page) {
    $visitorId = $request->cookie('visitor_uuid') ?? \Str::uuid()->toString();
    
    // Log page view (only once per day per visitor)
    $alreadyViewed = PageView::where('page_id', $page->id)
      ->where('visitor_id', $visitorId)
      ->whereDate('created_at', now()->toDateString())
      ->exists();

    if ($alreadyViewed) {
      PageView::create([
        'page_id' => $page->id,
        'visitor_id' => $visitorId,
        'ip_address' => $request->ip(),
        'user_agent' => $request->userAgent(),
        'referer' => $request->header('referer'),
      ]);
    }
    // set cookie if not present
    $response = response()->json(['status'=>'ok']);
    if (!$request->cookie('visitor_uuid')) {
      $response->withCookie(cookie('visitor_uuid', $visitorId, 60*24*365));
    }
    return $response;
  }

  // Aggregated stats
  public function stats(Request $request, Page $page) {
    // $this->authorize('view', $page);
      $period = $request->query('period', '30'); // days
    $from = now()->subDays((int)$period)->startOfDay();

    $daily = PageView::selectRaw('DATE(created_at) as day, count(*) as views')
      ->where('page_id',$page->id)
      ->where('created_at', '>=', $from)
      ->groupBy('day')
      ->orderBy('day')
      ->get();

    $unique = PageView::where('page_id',$page->id)
      ->where('created_at', '>=', $from)
      ->distinct('visitor_id')
      ->count('visitor_id');

    $total = PageView::where('page_id',$page->id)
      ->where('created_at', '>=', $from)
      ->count();

    return Inertia::render('AnalyticReport', [
      'pageAnalytic' => [
        'id' => $page->id,
        'title' => $page->title,
        'report' => [
          'daily' => $daily,
          'unique' => $unique,
          'total' => $total,
        ],
      ],
    ]);
  }

  public function show(Page $page, Request $request)
  {
      $this->authorize('view', $page);

      $daily = $this->getViews($page, 'daily');
      $weekly = $this->getViews($page, 'weekly');
      $monthly = $this->getViews($page, 'monthly');

      return Inertia::render('AnalyticReport', [
        'analytic' => [
          'id' => $page->id,
          'title' => $page->title,
          'stats' => [
              'daily' => $daily,
              'weekly' => $weekly,
              'monthly' => $monthly,
          ],
        ]
      ]);
  }

private function getViews(Page $page, string $period)
  {
      $days = match ($period) {
          'daily' => 1,
          'weekly' => 7,
          'monthly' => 30,
      };

      $from = now()->subDays($days)->startOfDay();

      $views = PageView::selectRaw('DATE(created_at) as date, COUNT(*) as views, COUNT(DISTINCT visitor_id) as unique_views')
          ->where('page_id', $page->id)
          ->where('created_at', '>=', $from)
          ->groupBy('date')
          ->orderBy('date')
          ->get();

      return [
          'total' => $views->sum('views'),
          'unique' => $views->sum('unique_views'),
          'chart' => $views->map(fn ($row) => [
              'date' => $row->date,
              'views' => $row->views,
              'unique_views' => $row->unique_views
          ]),
      ];
  }


  // Export CSV
  // public function export(Request $request, Page $page) {
  //     $this->authorize('view', $page);
  //     $from = $request->query('from');
  //     $to = $request->query('to');

  //     $query = PageView::where('page_id', $page->id);
  //     if ($from) $query->where('created_at','>=',$from);
  //     if ($to) $query->where('created_at','<=',$to);

  //     $rows = $query->orderBy('created_at');

  //     return new StreamedResponse(function() use ($rows) {
  //         $handle = fopen('php://output','w');
  //         fputcsv($handle, ['id','visitor_id','ip_address','user_agent','referer','created_at']);
  //         foreach ($rows->cursor() as $row) {
  //             fputcsv($handle, [$row->id,$row->visitor_id,$row->ip_address,$row->user_agent,$row->referer,$row->created_at]);
  //         }
  //         fclose($handle);
  //     }, 200, [
  //         'Content-Type' => 'text/csv',
  //         'Content-Disposition' => 'attachment; filename="analytics.csv"',
  //     ]);
  // }
}