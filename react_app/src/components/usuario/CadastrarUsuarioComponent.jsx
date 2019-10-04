import React,{Component} from 'react'
import {Row,Col,Container,Form,Button} from 'react-bootstrap'
import UsuarioServico from '../../servicos/UsuarioServico.js'



export default class CadastrarUsuarioComponent extends Component{
    usuarioServico = new UsuarioServico()
    state = {
        nome:"",
        senha:"",
        email:"",
        erros:[]
    }
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    updateNomeUsuario(e){
        this.setState({nome:e.target.value});
    }
    updateSenhaUsuario(e){
        this.setState({senha:e.target.value});
    }
    updateEmailUsuario(e){
        this.setState({email:e.target.value});
    }
    cadastrarUsuario(){

        this.usuarioServico.cadastrarUsuario(this.state.nome,this.state.senha,this.state.email);
        
    }
    render(){
        return(
            <Container className="mt-4">
            <h2> Cadastrar </h2>
                     <Form>
                         <Row>
                            <Col lg={3} sm={12}>
                                <Form.Group>
                                    <Form.Label> Nome do Usuario </Form.Label>
                                    <Form.Control onChange={(e)=>this.updateNomeUsuario(e)} type="text" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={3} sm={12}>
                                <Form.Group>
                                    <Form.Label> Senha do Usuario </Form.Label>
                                    <Form.Control onChange={(e)=>this.updateSenhaUsuario(e)} type="password" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={3} sm={12}>
                                <Form.Group>
                                    <Form.Label> Email do Usuario </Form.Label>
                                    <Form.Control onChange={(e)=>this.updateEmailUsuario(e)} type="email" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button onClick={()=>this.cadastrarUsuario()}
                                disabled={this.state.carregando}> Cadastrar Usuario </Button>
                        
                        
                    </Form>
            </Container>
        )
    }

}
