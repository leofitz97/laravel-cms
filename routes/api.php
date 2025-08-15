
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\UploadController;

// Route::post('/auth/register', [AuthController::class,'register']);
// Route::post('/auth/login', [AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function(){
  // Route::get('/me', [AuthController::class,'me']);
  // Route::post('/logout', [AuthController::class,'logout']);

  Route::resource('/pages', PageController::class);
  // Route::get('/pages/edit/one', [PageController::class, 'edit']);  
  Route::post('/pages/{page}/publish', [PageController::class,'publish']);
  Route::get('/pages/{page}/analytics', [AnalyticsController::class,'show']);
  Route::get('/pages/{page}/analytics/export', [AnalyticsController::class,'export']);
  Route::post('/upload/background', [UploadController::class,'uploadBackground']);

  Route::get('/index', [PageController::class, 'index']);
});

// Public tracking and public page data
Route::post('/pages/{page}/view', [AnalyticsController::class,'trackView']); // public tracking endpoint
Route::get('/pages/public/{slug}', [PageController::class,'showPublic']);
Route::get('/page-preview/{slug}', [PageController::class, 'preview'])->name('pages.preview');

Route::get('/test', function () {
  return response()->json(['message' => 'API works']);
});

// ?>