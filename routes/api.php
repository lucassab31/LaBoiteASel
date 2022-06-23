<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostsController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\Admin\UsersController as AdminUsersController;
use App\Http\Controllers\Api\Admin\StatsController as AdminStatsController;
use App\Http\Controllers\Api\Admin\CategoriesController as AdminCategoriesController;

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

    Route::middleware('auth:api')->group(function () {
        Route::post('/add', [PostsController::class, 'store']);
        Route::get('/candidate/{id}', [PostsController::class, 'candidate']);
        Route::get('/progress/{id}', [PostsController::class, 'inProgress']);
        Route::get('/finish/{id}', [PostsController::class, 'finish']);
        
        Route::get('/delete/{id}', [PostsController::class, 'delete']);
    });
    Route::get('/postsFiltered/{category}/{lengthservice}/{date}/{dateType}', [PostsController::class, 'filteredPosts']);
});

Route::post('/users/login', [UsersController::class, 'login']);

Route::prefix('users')->group(function () {
    Route::get('/view/{id}', [UsersController::class, 'view']);
});

// Routes connected
Route::middleware('auth:api')->group(function () {
    // Users
    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/logout', [UsersController::class, 'logout']);
        Route::get('/viewPosts/{id}', [UsersController::class, 'viewPosts']);
        Route::get('/viewTransactions/{id}', [UsersController::class, 'viewTransactions']);
        Route::get('/viewReports/{id}', [UsersController::class, 'viewReports']);
        
        Route::get('/delete/{id}', [UsersController::class, 'delete']);
    });
    
    // Routes admin
    Route::middleware('isAdmin')->prefix('admin')->group(function () {

    });
});
// Routes admin
Route::prefix('admin')->group(function () {
    // Users
    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [AdminUsersController::class, 'index']);
        Route::get('/view/{id}', [AdminUsersController::class, 'view']);
    
        Route::get('/add', [AdminUsersController::class, 'add']);
        Route::post('/add', [AdminUsersController::class, 'store']);
        Route::post('changeUserStatus/{id}', [AdminUsersController::class, 'changeUserStatus']);
        Route::get('/delete/{id}', [AdminUsersController::class, 'delete']);
    });

    // Stats
    Route::prefix('stats')->name('stats.')->group(function () {
        Route::get('/', [AdminStatsController::class, 'index']);
        Route::post('/services', [AdminStatsController::class, 'services']);
        Route::post('/balance', [AdminStatsController::class, 'balance']);
    });

    // Category
    Route::prefix('categories')->name('categories.')->group(function () {
        Route::post('/add', [AdminCategoriesController::class, 'store']);
        Route::get('/', [AdminCategoriesController::class, 'index']);
        Route::post('update/{id}', [AdminCategoriesController::class, 'update']);
        Route::get('/delete/{id}', [AdminCategoriesController::class, 'delete']);
    });
});
