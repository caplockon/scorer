<?php

use App\Http\Controllers\Api\FlightController;
use App\Http\Controllers\Api\Gallery\AlbumController;
use App\Http\Controllers\Api\Gallery\AlbumPictureController;
use App\Http\Controllers\Api\JwtAuthController;
use App\Http\RouteRegex;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [JwtAuthController::class, 'login']);
    Route::post('logout', [JwtAuthController::class, 'logout']);
    Route::post('refresh', [JwtAuthController::class, 'refresh']);
    Route::post('me', [JwtAuthController::class, 'me']);
});
