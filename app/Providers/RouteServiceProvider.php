<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the application's "home" route.
     *
     * @var string
     */
    // public const HOME = '/';

    /**
     * Define your route model bindings, pattern filters, etc.
     */

    public function boot(): void
    {
        // $this->routes(function () {
        //     // API routes (stateless, no CSRF)
        //     Route::middleware('api')
        //         ->prefix('api')
        //         ->group(base_path('routes/api.php'));

        //     // Web routes (stateful, with CSRF)
        //     Route::middleware('web')
        //         ->group(base_path('routes/web.php'));
        // });
    }
}
