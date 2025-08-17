<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DrugController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard with pharmacy stats
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Point of Sale routes
    Route::controller(PosController::class)->group(function () {
        Route::get('/pos', 'index')->name('pos.index');
        Route::post('/pos', 'store')->name('pos.store');
        Route::get('/pos/receipt/{sale}', 'show')->name('pos.receipt');
    });

    // Resource routes
    Route::resource('drugs', DrugController::class);
    Route::resource('suppliers', SupplierController::class);
    Route::resource('customers', CustomerController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
