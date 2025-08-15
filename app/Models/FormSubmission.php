<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormSubmission extends Model {
  protected $fillable = ['page_id','data','visitor_id'];
  protected $casts = ['data' => 'array'];
  public function page() { return $this->belongsTo(Page::class); }
}
