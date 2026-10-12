<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VmController;
use App\Http\Middleware\EnsureRole;
use App\Http\Middleware\JwtAuthenticate;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - IFX Cloud Virtual Machine Platform
|--------------------------------------------------------------------------
*/

// Ruta pública de autenticación
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas por JWT en Cookie HttpOnly
Route::middleware([JwtAuthenticate::class])->group(function () {
    // Sesión
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Endpoints de lectura (Permitidos para 'Administrador' y 'Cliente')
    Route::get('/vms', [VmController::class, 'index']);
    Route::get('/vms/stats', [VmController::class, 'stats']);
    Route::get('/vms/{id}', [VmController::class, 'show'])->whereNumber('id');

    // Endpoints de mutación (Restringidos exclusivamente para 'Administrador')
    Route::middleware([EnsureRole::class . ':Administrador'])->group(function () {
        Route::post('/vms', [VmController::class, 'store']);
        Route::put('/vms/{id}', [VmController::class, 'update'])->whereNumber('id');
        Route::patch('/vms/{id}/status', [VmController::class, 'updateStatus'])->whereNumber('id');
        Route::delete('/vms/{id}', [VmController::class, 'destroy'])->whereNumber('id');
    });
});
