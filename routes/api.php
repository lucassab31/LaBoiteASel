<?php

use App\Http\Controllers\Api\Admin\UsersController;
use App\Http\Controllers\Api\PostsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PassportAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Posts
Route::prefix('posts')->name('posts.')->group(function () {
    Route::get('/', [PostsController::class, 'index']);
    Route::get('/view/{id}', [PostsController::class, 'view']);

    Route::get('/add', [PostsController::class, 'add']);
    Route::post('/add', [PostsController::class, 'store']);

    Route::get('/progress/{id}', [PostsController::class, 'inProgress']);
    Route::get('/finish/{id}', [PostsController::class, 'finish']);
    
    Route::get('/delete/{id}', [PostsController::class, 'delete']);
});
// Admin
Route::prefix('admin')->group(function () {
    // Users
    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [UsersController::class, 'index']);
        Route::get('/view/{id}', [UsersController::class, 'view']);
    
        Route::get('/add', [UsersController::class, 'add']);
        Route::post('/add', [UsersController::class, 'store']);

        Route::get('/delete/{id}', [UsersController::class, 'delete']);
    });
});

Route::post('login', [PassportAuthController::class, 'login']);
Route::get('logout', [PassportAuthController::class, 'logout']);

// A mettre en place à la fin
Route::middleware('isAuthenticated')->group(function () {
    // Routes connected
    Route::middleware('isAdmin')->prefix('admin')->group(function () {
        // Routes admin
    });
});