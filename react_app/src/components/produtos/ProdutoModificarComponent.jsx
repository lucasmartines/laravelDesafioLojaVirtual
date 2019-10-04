import React,{Component} from 'react'
import {BrowserRouter as Router ,Route,Link } from 'react-router-dom'
import ProdutoServico from '../../servicos/ProdutoServico.js'

import {Row,Col,Container,Button,Form} from 'react-bootstrap';



export default class ProdutoModificarComponent extends Component{
    produtoServico = new ProdutoServico();

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props) 
       
        
    }
    state = { produto : {}, carregando:false }
    pegarItemProduto = async () =>{
        
       this.produtoServico.MostrarUmProduto( this.props.match.params.id ).then( produto => {
           
            let produtoClone = {
                nome: produto.nome,
                urlPadrao : produto.urlpadrao,
                preco : produto.preco,
                descricao : produto.descricao
            }

            this.setState({ produto: produtoClone} ) 
            
       })

    }
    atualizarProduto(){

        this.setState( {carregando:true} );
        this.produtoServico.AtualizarUmProduto( this.props.match.params.id , this.state.produto )
            .then( () => this.setState( {carregando:false} ));
    }
    componentDidMount(){
        this.pegarItemProduto();
    }
    updateNomeProduto(e){
        console.log(e)
        this.setState({produto:{
            ...this.state.produto,
            nome:e.target.value
        }})
    }
    updatePrecoProduto(e){
        this.setState({produto:{
            ...this.state.produto,
            preco:e.target.value
        }})
    }
    updateDescricaoProduto(e){
        this.setState({produto:{
            ...this.state.produto,
            descricao:e.target.value
        }})
    }
    updateUrlPadraoProduto(e){
        this.setState({produto:{
            ...this.state.produto,
            urlPadrao:e.target.value 
        }})
        
    }
    showCarregando(){
        console.log("...carregando")
        if(this.state.carregando){
            return( <span> ...carregando</span>)
        }
        // return<span> {this.state.carregando ?'true':'false'}  </span>
    }
    render() {
        return(
            <div>
                
                <Container>
                <h2> Atualizar Produto </h2>
                         <Form>
                             <Row>
                                <Col lg={3} sm={12}>
                                    <Form.Group>
                                        <Form.Label> Nome do Produto </Form.Label>
                                        <Form.Control defaultValue={this.state.produto.nome} onChange={(e)=>this.updateNomeProduto(e)}  />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={3} sm={12}>
                                    <Form.Group >
                                        <Form.Label> Preço do Produto  </Form.Label>
                                        <Form.Control defaultValue={this.state.produto.preco} onChange={(e)=>this.updatePrecoProduto(e)} type="number" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={3} md={6} sm={12}>
                                    <Form.Group >
                                        <Form.Label> Url da Imagem do Produto  </Form.Label>
                                        <Form.Control defaultValue={this.state.produto.urlPadrao } onChange={(e)=>this.updateUrlPadraoProduto(e)} type="text" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group>
                                <Row>
                                    <Col lg={6} sm={12}>
                                        <Form.Group>
                                            <Form.Label> Descricao do Produto </Form.Label>
                                            <Form.Control value={this.state.produto.descricao} onChange={(e)=>this.updateDescricaoProduto(e)}  as="textarea" rows="5" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button onClick={()=>this.atualizarProduto()}
                                    disabled={this.state.carregando}
                                     > Atualizar Produto </Button> 
                                     {this.showCarregando()}
                         
                        </Form>
                </Container>
            </div>
 
        );

    } 
}

