<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageSection extends Model {
  protected $fillable = ['page_id','type','content','order'];
  protected $casts = ['content' => 'array'];

  public function page() {
    return $this->belongsTo(Page::class);
  }
}
