<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

Route::post('/magic', [OrderController::class, 'store'])->name('magic.store');
Route::get('/magic/{id}', [OrderController::class, 'show']);
Route::patch('/magic', [OrderController::class, 'update'])->name('magic.update');
Route::delete('/magic/{id}', [OrderController::class, 'destroy'])->name('magic.destroy');
