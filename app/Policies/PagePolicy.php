<?php
namespace App\Policies;

use App\Models\User;
use App\Models\Page;



class PagePolicy {

  public function viewAny(User $user)
  {
    return true; // Just allow route access
  }
   
  public function view(User $user, Page $page) {
    return $user->id === $page->client_id || $user->isAdmin();
  }

  public function create(User $user)
  {
    // Logic for who can create pages
    return $user->id || $user->canCreatePages();
  }

  public function update(User $user, Page $page) {
    return $user->id === $page->client_id || $user->isAdmin();
  }

  public function publish(User $user, Page $page) {
    return $user->id === $page->client_id || $user->isAdmin();
  }

  public function delete(User $user, Page $page) {
    return $user->id === $page->client_id || $user->isAdmin();
  }
}
