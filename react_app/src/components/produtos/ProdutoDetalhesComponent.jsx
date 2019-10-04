import React,{Component} from 'react'
import {BrowserRouter as Router ,Route,Link } from 'react-router-dom'
import ProdutoServico from '../../servicos/ProdutoServico.js'

import {Row,Col,Container,Button} from 'react-bootstrap';



export default class ProdutoDetalhes extends Component{
    produtoServico = new ProdutoServico();

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props) 
       
        
    }
    state = { produto : {} }
    pegarItemProduto = async () =>{
             
       this.produtoServico.MostrarUmProduto( this.props.match.params.id ).then( produto => this.setState({ produto}))

    }
    
    componentDidMount(){
        this.pegarItemProduto();
    }
    render() {
        return(
            <div>
                <Container>
                    {/* Um Produto de id { this.props.match.params.id} */}
                    <div className="float-md-left col-lg-6 ">
                        <img className=" imagemProduto-bg" src={this.state.produto.urlpadrao || "/assets/no-product.png"} alt="" />
                    </div>
                    <h2> {this.state.produto.nome }</h2>
                    <p> Descrição: {this.state.produto.descricao} </p>
                    <span className="h2">  ${this.state.produto.preco }</span>
                    <br/>
                    <Button variant="primary" >
                        Comprar
                    </Button>
                </Container>
            </div>
        );

    } 
}

