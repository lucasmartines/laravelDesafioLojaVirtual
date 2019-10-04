import React,{Component} from 'react'

import {BrowserRouter as Router ,Route ,Link} from 'react-router-dom'
import ProdutoServico from '../../servicos/ProdutoServico.js'
import Produto from './ProdutoComponent';

import {Row,Col,Container,InputGroup ,FormControl,Button} from 'react-bootstrap';



export default class ProdutosComponent extends Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props) 
       
        
    }
    produtoServico = new ProdutoServico();
    state = { produtos : [] ,pesquisa:""}
    pegarProdutos = async () =>{
       
     


       this.produtoServico.VerProdutos( ).then( produtos => this.setState({ produtos:produtos}))
          


    }
    pesquisarProduto(){
        this.produtoServico.ProcurarProduto( this.state.pesquisa ).then( produtos => this.setState({ produtos:produtos}))
    }
    mostrarProdutos(){

        if( this.state.produtos !== [] && this.state.produtos !== null){
            console.log("PRODUTO", this.state.produtos[0])
        }
        
        return this.state.produtos.map( (produto) =>{
            
             return <Col key={produto.id} md={6} sm={6} lg={4} xl={3}> 
                <Produto 
                    nome={produto.nome || ""}
                    preco={produto.preco || 0}
                    key={produto.id}
                    id={produto.id }
                    image={produto.urlpadrao}
                    />
                </Col>
            })
    }
    componentDidMount(){
        this.pegarProdutos();
        this.setState({pesquisa:this.state.pesquisa || this.props.match.params.buscar })
    }
    _onEnter( e){
        if( e.key==="Enter"){
           // alert(e.key)
            this.pesquisarProduto();

        }

    }
    _onBackSpace(e){
        if(e.key==="Backspace"){
            this.setState({pesquisa:""});
            //if( this.state.produtos.length > 0)
               this.pegarProdutos();
        }
    }
    render() {
        return(
            <div>
            <Container className=" bg-white ">
                <InputGroup className="mb-3 col-12" >
                    <FormControl
                        placeholder="Procurar Produto"
                        aria-label="Recipient's Procurar Produto"
                        aria-describedby="basic-addon2"
                        onChange={(e)=> this.setState( { pesquisa: e.target.value })}
                        defaultValue={this.state.pesquisa}
                        onKeyDown={ (e)=> { this._onEnter( e ); this._onBackSpace(e) } }
                    />
                    <InputGroup.Append>
                    <Button variant="outline-secondary"
                            onClick={(e)=> this.pesquisarProduto(  )}
                       
                       
                    >Buscar</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Container>
            <Container>
                Sua busca: {this.state.pesquisa}
            </Container>
            <Container className="row flex-wrap m-2 mx-auto bg-white p-2">
                
                {this.mostrarProdutos()}
                
            </Container>
            </div>
        );
    } 
}

