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

//ROTAS DE USUARIO
Route::get('/usuarios' , "UsuarioController@index");
Route::get('/usuarios/{id}' , "UsuarioController@encontrarUm");
Route::post('/usuarios' , "UsuarioController@salvar");
Route::delete('/usuarios/{id}' , "UsuarioController@deletar");
Route::put('/usuarios/{id}' , "UsuarioController@atualizar");

//ROTAS DE PRODUTOS
Route::get('/produtos/all' , "ProdutoController@index");
Route::get('/produtos/GetProduto/{id}' , "ProdutoController@encontrarUm");
Route::get('/produtos/search/{nome}' , "ProdutoController@procurar");
Route::post('/produtos/PostProduto' , "ProdutoController@salvar");
Route::delete('/produtos/DeleteProduto/{id}' , "ProdutoController@deletar");
Route::put('/produtos/PutProduto/{id}' , "ProdutoController@atualizar");
