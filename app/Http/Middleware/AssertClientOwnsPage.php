<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Page;

class EnsureClientOwnsPage {
  public function handle(Request $request, Closure $next) {
    $page = $request->route('page');
    if ($page instanceof Page) {
      if (auth()->id() !== $page->client_id && !auth()->user()->isAdmin()) {
        abort(403, 'Forbidden');
      }
    }
    return $next($request);
  }
}
