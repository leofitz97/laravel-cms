<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageClick extends Model {
  protected $fillable = ['page_id','visitor_id','element_id','metadata'];
  protected $casts = ['metadata' => 'array'];
  public function page() { return $this->belongsTo(Page::class); }
}
