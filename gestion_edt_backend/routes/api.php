<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EdtController;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\EnseignantController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/connexion', [UserController::class, 'connexion']);
Route::post('/deconnexion', [UserController::class, 'deconnexion']);
 
        Route::get('/seances', [EdtController::class, 'index']);
        Route::post('/seances', [EdtController::class, 'store']);
        Route::put('/seances/{id}', [EdtController::class, 'update']);
        Route::delete('/seances/{id}', [EdtController::class, 'destroy']);
        Route::middleware('auth:sanctum')->get('/edt/etudiant', [EdtController::class, 'edtEtudiant']);

       
        Route::get('/cours', [CoursController::class, 'index']);
        Route::post('/cours', [CoursController::class, 'store']);
        Route::put('/cours/{id}', [CoursController::class, 'update']);
        Route::delete('/cours/{id}', [CoursController::class, 'destroy']);

      
        Route::get('/enseignants', [EnseignantController::class, 'index']);
        Route::post('/enseignants', [EnseignantController::class, 'store']);
        Route::put('/enseignants/{id}', [EnseignantController::class, 'update']);
        Route::delete('/enseignants/{id}', [EnseignantController::class, 'destroy']);

        Route::get('/seances', [EnseignantController::class, 'toutesLesSeances']);
        Route::get('/edt/enseignant/{id}', [EdtController::class, 'edtEnseignant']);

