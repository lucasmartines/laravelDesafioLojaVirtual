export default class UsuarioServico{
   // url = "http://localhost:8000/api/usuarios";
    url = "https://laravel-loja-api.herokuapp.com/api/usuarios"
    estouLogado(){
        let logado = false
    
        if( localStorage.getItem("UsuarioLogado") === "1"){
            logado = true
            console.log('LOGADO')
        }

        return logado
    }
    cadastrarUsuario(nome,senha,email){

        return  fetch(this.url,{
            method:"POST",
            body: JSON.stringify( {nome,senha,email} ),
            headers:{
                "Content-Type": "application/json"
            },
         //   credentials: "same-origin"
        }).then( data => data.json() )
        .then( data => data )
    }
    listarUsuarios(){
        return fetch(this.url,{
            method:"GET"
        })
        .then( ( data) => { return data.json()} )
        .then( data =>{
                this.produtos = data 
                return data;
        });

    }
    mostrarUsuario( id ){

    }
    deletarUsuario(id){
        return fetch(this.url+ "/"+id,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            },
        }).then( data => { console.log( "DELETE ", data.json() ) })
    }
    atualizarUsuario(id,usuario)
    {
        return  fetch( this.url+"/"+id,{
                    method:"PUT",
                    body: JSON.stringify( usuario ),
                    headers:{
                        "Content-Type": "application/json"
                    },
                
                }).then( data => data.json() )
                .then( data => data ) 
                
    }
    logar(nome,senha){

        // let logado = false;
        let autenticado = false;

        return new Promise( (resolve,reject) => {
            //autenticado = true;
            return this.listarUsuarios().then(
                (data) => {

                    data.forEach((usuario)=>{
                        if( usuario.nome === nome && usuario.senha === senha ){
                            autenticado = true;

                            localStorage.setItem("UsuarioLogado","1");
                            resolve(autenticado)
                        }
                        
                    })
                    if( !autenticado){
                        reject("usuario ou senha não existem no banco de dados")
                    }
                    
                }
            ).catch(e => {
                reject(e)
            })
        })
         
            
    
        // if( autenticado ){
        //     localStorage.setItem("UsuarioLogado","1")
        //     logado = true
        //     return new Promise( ( resolve,reject ) => {

        //         resolve(true);
        //     })
        // }

        // return logado
        
    }
    deslogar(){
        localStorage.removeItem("UsuarioLogado");

    }
}