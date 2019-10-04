import React,{Component} from 'react'

import {BrowserRouter as Router ,Route,Link } from 'react-router-dom'

import {Card,Button} from 'react-bootstrap'


export default class ProdutoComponent extends Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props)
    }
    render() {
        return(
            <Card className="my-2">
                <div className="containerImagem">
                    <img className="imagemProduto" src={this.props.image || "assets/no-product.png"} alt={this.props.alt}/>  
                </div>
                <h6> {this.props.nome} </h6>
                <div> Preco <span className="h2"> ${this.props.preco} </span><span className="p" style={{marginLeft:"-6px"}}> ,99 </span> </div>
                <div className="text-right">
                <Button variant="primary" as={Link} to={"/produto/detalhes/"+this.props.id} > Comprar </Button>
                </div>
            </Card>
        );
    } 
}

