<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageView extends Model {
  protected $fillable = ['page_id','visitor_id','ip_address','user_agent','referer'];
  public function page() { return $this->belongsTo(Page::class); }
}
