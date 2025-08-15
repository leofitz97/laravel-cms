<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller {
  public function uploadBackground(Request $request) {
    $request->validate(['file'=>'required|image|max:5120']);
    $path = $request->file('file')->store('public/backgrounds');
    return response()->json(['url' => Storage::url($path)]);
  }
}
