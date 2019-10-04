<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class UsuariosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table("usuarios")->(
            [
                "nome" => "root",
                "email"=>"root@root.com",
                "senha"=>"root",
                "id"=>1
            ]
        );
    }
}
