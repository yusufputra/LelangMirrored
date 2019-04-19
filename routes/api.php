<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('login', 'UserController@login');
Route::post('daftar', 'UserController@daftar');
Route::get('pengguna', 'UserController@index');
Route::get('pengguna/{username}', 'UserController@getOneUser');


// ShopController
Route::post('/daftarToko', 'ShopController@createShop');
Route::get('/toko/{id}', 'ShopController@readShop');
Route::post('/ubahInformasiToko', 'ShopController@updateShop');
Route::post('/hapusToko', 'ShopController@deleteShop');
