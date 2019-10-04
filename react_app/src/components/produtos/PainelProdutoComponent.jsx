import React,{Component} from 'react'

import {BrowserRouter as Router ,Route,Link } from 'react-router-dom'
import ProdutoServico from '../../servicos/ProdutoServico.js'
import Produto from './ProdutoComponent';

import {Row,Col,Container,Card,Button} from 'react-bootstrap';
import UsuarioServico from '../../servicos/UsuarioServico.js'



export default class PainelProdutoComponent extends Component{

    usuarioServico = new UsuarioServico()
    produtoServico = new ProdutoServico();
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props) 
        //let produtoServico = new ProdutoServico();
    }
    state = { produtos : [] }
// NÃO CONFINDIR COM MOSTRAR PRODUTO
    pegarProdutos = async () =>{
       
       this.produtoServico = new ProdutoServico();
       this.produtoServico.VerProdutos( ).then( produtos => this.setState({ produtos:produtos}))

    }
    deletarProduto( id ){
       
       
        if(id != null){
            this.produtoServico.DeletarProduto(id).then( data => {
                console.log(data)
                this.pegarProdutos();
            });
        }
        
    }
    mostrarProdutos(){



        return this.state.produtos.map( (produto) =>{
            
             return <Col md={12} key={produto.id } > 
                    
                        <img className="col-4 imagemProduto  float-md-left " src={ produto.urlpadrao || "assets/no-product.png"} alt={this.props.alt}  />  
                         
                        <h2> {produto.nome || ""} </h2>
                        <h4> Preço:$ {produto.preco || ""} </h4>
                        <p> {produto.descricao} </p>
                        <div>
                            <Button variant="danger" className="mr-2"  onClick={()=>this.deletarProduto(produto.id)}> Deletar </Button>
                            <Button variant="primary" className="mr-2" as={Link} to={"/produto/modificar/"+produto.id} > Modificar </Button>
                        </div>
  
                </Col>
            })
    }

    componentDidMount(){
        if ( !this.usuarioServico.estouLogado() ){
            this.props.history.push("/usuario/logar");

        }
        this.pegarProdutos();
    }
    render() {
        return(
            <div>
            
            <Container className="row flex-wrap m-2 ">
               <h2> Painel De Produtos </h2>
                    {this.mostrarProdutos() }
                
            </Container>
            </div>
        );
    } 
}

