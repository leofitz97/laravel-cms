<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model {
  protected $fillable = [
    'client_id','title','slug','is_published','logo_path','published_at','theme','body','background_path'
  ];

  protected $casts = [
    'is_published' => 'boolean',
    'published_at' => 'datetime',
  ];

  public function client() {
    return $this->belongsTo(User::class, 'client_id');
  }

  public function sections() {
    return $this->hasMany(PageSection::class)->orderBy('order');
  }

  public function views() {
    return $this->hasMany(PageView::class);
  }

  public function revisions() {
    return $this->hasMany(PageRevision::class);
  }
}