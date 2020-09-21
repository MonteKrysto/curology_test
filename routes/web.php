<?php

use Illuminate\Support\Facades\Route;
// use Laravel\Passport\Http\Controllers\AccessTokenController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

// Auth::routes();
// Route::post('login', [AccessTokenController::class, 'issueToken'])->middleware(['api-login', 'throttle']);

// Route::get('/home', 'HomeController@index')->name('home');
// Route::get('/', 'OrderController@index');
// Route::get('/order/{id}', 'OrderController@show');
// Route::get('/order/{id}/update', 'OrderController@update');
Route::view('/{path?}', 'app');