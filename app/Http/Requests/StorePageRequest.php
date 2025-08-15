<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePageRequest extends FormRequest {
  public function authorize() {
    return auth()->check();
  }

  public function rules() {
    return [
      'title' => 'required|string|max:191',
      'body' => 'nullable|string',
      'theme' => 'nullable|string',
      'background' => 'nullable|image|max:5120',
    ];
  }
}
