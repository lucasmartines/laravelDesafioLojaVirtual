export default class ProdutoServico
{
     //url = "http://localhost:8000/api/produtos"
     url = "https://laravel-loja-api.herokuapp.com/api/produtos"
     produtos = [];
     async VerProdutos( produtosCallback ){// retornar uma lista de produtos servidor



        return await  fetch(this.url+"/all",{
            method:"GET"
        })
        .then( ( data) => data.json() )
        .then( data =>{
                this.produtos = data 
                //console.log(this.produtos)
                if(produtosCallback != null)
                    produtosCallback( this.produtos )
                return data;
        })

    }
    async ProcurarProduto( nomeProduto ){

        if( nomeProduto ){
            return await  fetch(this.url+"/search/"+nomeProduto,{
                method:"GET"
            })
            .then( ( data) => data.json() )
            .then( data =>{
                    this.produtos = data 
                    //console.log(this.produtos)
                
                    return data;
            })
        }
        else{
            return this.VerProdutos();
        }


         //   alert(nomeProduto)
    }
    CadastrarProduto( novoProduto ){
        
        // validações

        return  fetch(this.url+"/PostProduto",{
            method:"POST",
            body: JSON.stringify( novoProduto ),
            headers:{
                "Content-Type": "application/json"
            },
         //   credentials: "same-origin"
        }).then( data => data.json() )
        .then( data => data )
       
    }
    DeletarProduto( id ){
        
        return fetch(this.url+"/DeleteProduto/"+id,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            },
        }).then( data => { console.log( "DELETE", data.json() ) })
    }
    MostrarUmProduto(id){
        
        return fetch(this.url+"/GetProduto/"+id,{
            method:"GET"
        })
        .then( ( data) => data.json() )
        .then( data =>{                
                return data;
        })
    }
    AtualizarUmProduto( id , novoProduto){

        return  fetch(this.url+"/PutProduto/"+id,{
                    method:"PUT",
                    body: JSON.stringify( novoProduto ),
                    headers:{
                        "Content-Type": "application/json"
                    },
                //   credentials: "same-origin"
                }).then( data => { data.json() 
                    console.log(data)
                })
                .then( data => data )
    }
}