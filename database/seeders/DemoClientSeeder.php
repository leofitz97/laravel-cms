<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Page;
use Illuminate\Support\Facades\Hash;

class DemoClientSeeder extends Seeder
{
    public function run()
    {
        $user = User::create([
            'name' => 'Demo Client',
            'email' => 'demo@example.com',
            'password' => Hash::make('password'),
            'role' => 'client',
            'slug' => 'demo-client'
        ]);

        Page::create([
            'client_id' => $user->id,
            'title' => 'Demo Client Page',
            'slug' => 'demo-client-page',
            'is_published' => true,
            'published_at' => now(),
            'body' => '<p>Welcome to the demo page. Edit this content using the editor.</p>',
            'theme' => 'modern-blue',
        ]);
    }
}

