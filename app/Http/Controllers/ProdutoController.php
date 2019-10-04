<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
//use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response;


class ProdutoController extends Controller
{
    public function index(){
        
        $usuarios = DB::table("produtos")->get();

        if( $usuarios ){
            return response()
                ->json($usuarios);
        }
        else{
            return abort(404,"produto não encontrado");
        }
        
    }
    public function salvar( Request $req ){

        $novoProduto["nome"] = $req->nome;
        $novoProduto["descricao"] = $req->descricao;
        $novoProduto["preco"] = $req->preco;
        $novoProduto["urlpadrao"] = $req->urlPadrao;


        $usuarios = DB::table("produtos")->insert($novoProduto);

        return response()->json( $novoProduto );
    }
    public function deletar( $id){

        DB::table("produtos")->where("id","=",$id)->delete();
        return response()->json($id);

    }
    public function atualizar( Request $req , $id){
        
  //      $update_id = $req->id;


        $novoProduto["nome"] = $req->nome;
        $novoProduto["descricao"] = $req->descricao;
        $novoProduto["preco"] = $req->preco;
        $novoProduto["urlpadrao"] = $req->urlPadrao;

//        dd($novoProduto);

        $produtoAtualizado = DB::table("produtos")
            ->where("id",$id)
            ->update( $novoProduto );


        return response()->json($produtoAtualizado);


    }

    public function encontrarUm($id)
    {
        $usuarioEncontrado = DB::table("produtos")->find($id);

        if($usuarioEncontrado){
            return response()
                ->json($usuarioEncontrado);
        }
        else{
            return abort(404,"usuario não encontrado");
        }

    }

    public function procurar($nome = ""){
        $usuariosEncontrado = DB::table("produtos")->where("nome","like","%" . $nome . "%")->get();

        if($usuariosEncontrado){
            return response()
                ->json($usuariosEncontrado);
        }
        else{
            return abort(404,"Produto não encontrado");
        }
    }
}
