<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePageRequest;
use App\Models\Page;
use App\Models\PageView;
use Illuminate\Http\Request;
use App\Models\PageRevision;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;



class PageController extends Controller {
  public function __construct() {
    $this->middleware('auth:sanctum')->except(['showPublic', 'preview']);
    $this->authorizeResource(Page::class, 'page');
  }

  public function index(Request $request) {
    $user = $request->user();
    $pages = $user->isAdmin() ? Page::with('client')->paginate(20) : $user->pages()->paginate(20);
    return Inertia::render('page/list', ['pages'=>$pages->getCollection()]);
  }

  public function create()
  {
    return Inertia::render('page/edit', [
        'page' => (object)[],
    ]);
  }

  public function edit(Page $page)
  {
    return Inertia::render('page/edit', [
        'page' => $page
    ]);
  }
  

  public function store(StorePageRequest $request) {
    $user = $request->user();
    $data = $request->only(['title','body','theme']);
    $data['client_id'] = $user->id;
    $data['slug'] = Str::slug($request->input('slug', $data['title'])) . '-' . Str::random(5);

    if ($request->hasFile('background')) {
        $path = $request->file('background')->store('backgrounds','public');
        $data['background_path'] = Storage::url($path);
    }
    if ($request->hasFile('logo')) {
        $path = $request->file('logo')->store('logos','public');
        $data['logo_path'] = Storage::url($path);
    }

    $page = Page::create($data);

    return redirect()->route('pages.edit', $page->id);
  }

  public function update(StorePageRequest $request, Page $page) {
    $data = $request->only(['title','body','theme']);
        $data['slug'] = Str::slug($data['title']);

        DB::beginTransaction();
        try {

            if ($request->hasFile('background')) {
                $path = $request->file('background')->store('backgrounds','public');
                $data['background_path'] = Storage::url($path);
            }
            if ($request->hasFile('logo')) {
                $path = $request->file('logo')->store('logos','public');
                $data['logo_path'] = Storage::url($path);
            }
            $page->update($data);
            PageRevision::create(['page_id'=>$page->id,'client_id'=>$request->user()->id,'revision_data'=>$page->toArray()]);
            DB::commit();
            return redirect()->route('pages.edit', $page->id);
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }

    
  }


  public function destroy(Page $page) {
    $page->delete();
    return redirect()->route('pages.index');
  }

  public function publish(Request $request, Page $page) {
    $this->authorize('publish', $page);
    $page->update([
      'is_published' => true,
      'published_at' => now()
    ]);
    PageRevision::create([
      'page_id' => $page->id,
      'client_id' => $request->user()->id,
      'revision_data' => $page->toArray(),
    ]);
    return redirect()->route('pages.edit', $page->id);
  }

  // Public display route (no auth)
  public function showPublic(Request $request, string $slug) {
    $page = Page::where('slug',$slug)->where('is_published', true)->with('client')->firstOrFail();
    $visitorId = $request->cookie('visitor_uuid') ?? \Str::uuid()->toString();

    // Log page view (only once per day per visitor)
    $alreadyViewed = PageView::where('page_id', $page->id)
      ->where('visitor_id', $visitorId)
      ->whereDate('created_at', now()->toDateString())
      ->exists();
    
    if (! $alreadyViewed) {
      PageView::create([
        'page_id' => $page->id,
        'visitor_id' => $visitorId,
        'ip_address' => $request->ip(),
        'user_agent' => $request->userAgent(),
        'referer' => $request->header('referer'),
      ]);
    }

    $inertiaResponse = Inertia::render('publicPage', ['page' => $page])->toResponse($request);
    return $inertiaResponse->withCookie(cookie()->forever('visitor_id', $visitorId));;
  }


  public function preview($slug)
  {
    $page = Page::where('slug', $slug)->firstOrFail();
    return view('pagePreview', ['page' => $page]);
  }
}
