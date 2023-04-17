<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    $f = \App\Models\Flight::query()->select( 'name')->where('uuid', 'a459044d-a408-4765-99fa-3bbc19037208')->first();
    $f->description = "da3xsd3333xxxx3443asd";
    $f->save();
    return view('welcome');
});
