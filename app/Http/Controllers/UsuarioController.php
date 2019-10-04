<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
//use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response;


class UsuarioController extends Controller
{
    //
    public function index(){

        $usuarios = DB::table("usuarios")->get();

      //  if( $usuarios != null ){
            return response()
                ->json($usuarios);
      //  }
      //  else{
     //       return abort(404,"usuario não encontrado");
     //   }
        
    }
    public function salvar( Request $req ){

        $novoUsuario["nome"] = $req->nome;
        $novoUsuario["email"] = $req->email;
        $novoUsuario["senha"] = $req->senha;


        $usuarios = DB::table("usuarios")->insert($novoUsuario);

        return response()->json( $novoUsuario );
    }
    public function deletar( $id){

        DB::table("usuarios")->where("id","=",$id)->delete();


        return response()->json($id);
    }
    public function atualizar( Request $req , $id){

        $novoUsuario["nome"] = $req->nome;
        $novoUsuario["email"] = $req->email;
        $novoUsuario["senha"] = $req->senha;


        $usuarioAtualizado = DB::table("usuarios")
            ->where("id",$id)
            ->update( $novoUsuario );


        return response()->json($usuarioAtualizado);


    }

    public function encontrarUm( $id )
    {
        if($id === null){
            return abort(404);
        }
        $usuarioEncontrado = DB::table("usuarios")->find( $id );

        if($usuarioEncontrado){
            return response()
                ->json($usuarioEncontrado);
        }
        else{
            return abort(404,"usuario não encontrado");
        }
 
    }
 
}
