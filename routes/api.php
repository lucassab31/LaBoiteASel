<?php

use App\Http\Controllers\Api\PostsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::prefix('posts')->name('posts.')->group(function () {
    Route::get('/', [PostsController::class, 'index']);
    Route::get('/view/{id}', [PostsController::class, 'view']);

    Route::get('/add', [PostsController::class, 'add']);
    Route::post('/add', [PostsController::class, 'store']);
});