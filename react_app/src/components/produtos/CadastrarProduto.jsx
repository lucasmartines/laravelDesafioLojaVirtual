import React,{Component} from 'react'

import {BrowserRouter as Router ,Route } from 'react-router-dom'
import ProdutoServico from '../../servicos/ProdutoServico.js'


import {Row,Col,Container,Form,Button,Alert} from 'react-bootstrap';
import UsuarioServico from '../../servicos/UsuarioServico.js'


export default class CadastrarProdutoComponent extends Component{

    usuarioServico = new UsuarioServico()
    state = { 
        nome:"",
        preco:0,
        descricao:"",
        urlPadrao:"",

        /*produto*/
        carregando:false,
        info:""
    }

    componentDidMount(){
        if ( !this.usuarioServico.estouLogado() ){
            this.props.history.push("/usuario/logar");

        }
    }
    enviarProduto(){
       // alert( this.state.nome + " " + this.state.preco + " " + this.state.descricao)
       let novoProduto = 
       {
           nome:this.state.nome,
           preco:this.state.preco,
           descricao:this.state.descricao,
           urlPadrao:this.state.urlPadrao
        }

        let _produtoServico = new ProdutoServico();

        this.setState({carregando:true});


       _produtoServico.CadastrarProduto(  novoProduto)
        .then( data => { console.log("RESPOSTA AO POST "+data) 
            this.setState({carregando:false,info:"Produto cadastrado com successo" });

        } )
        .catch( err => console.log( err ) )
    }
    updateNomeProduto(e){
        console.log(e)
        this.setState({nome:e.target.value})
    }
    updatePrecoProduto(e){
        this.setState({preco:e.target.value})
    }
    updateDescricaoProduto(e){
        this.setState({descricao:e.target.value})
    }
    updateUrlPadraoProduto(e){
        this.setState({urlPadrao:e.target.value})
    }
    showCarregando(){
        if(this.state.carregando){
            return( <span> ...carregando </span>)
        }
    }
    render() {
        return(
            <div>
                <Container>
                <h2> Cadastrar Produto </h2>
                         <Form>
                             <Row>
                                <Col lg={3} md={6} sm={12}>
                                    <Form.Group>
                                        <Form.Label> Nome do Produto </Form.Label>
                                        <Form.Control onChange={(e)=>this.updateNomeProduto(e)} type="text" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={3} md={4} sm={12}>
                                    <Form.Group >
                                        <Form.Label> Preço do Produto  </Form.Label>
                                        <Form.Control onChange={(e)=>this.updatePrecoProduto(e)} type="number" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={3} md={6} sm={12}>
                                    <Form.Group >
                                        <Form.Label> Url da Imagem do Produto  </Form.Label>
                                        <Form.Control onChange={(e)=>this.updateUrlPadraoProduto(e)} type="text" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group>
                                <Row>
                                    <Col lg={6} sm={12}>
                                        <Form.Group>
                                            <Form.Label> Descricao do Produto </Form.Label>
                                            <Form.Control  onChange={(e)=>this.updateDescricaoProduto(e)}  as="textarea" rows="5" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button onClick={()=>this.enviarProduto()}
                                    disabled={this.state.carregando}> Adicionar Produto </Button>
                            {this.showCarregando()}
                            { this.state.info &&
                                (<Alert variant="info" className="mt-3"> {this.state.info}</Alert>)
                            }
                        </Form>
                </Container>
            </div>
        );
    } 
}

