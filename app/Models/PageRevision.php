<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageRevision extends Model {
  protected $fillable = ['page_id','client_id','revision_data'];
  protected $casts = ['revision_data' => 'array'];

  public function page() {
    return $this->belongsTo(Page::class);
  }

  public function client() {
    return $this->belongsTo(User::class, 'client_id');
  }
}
