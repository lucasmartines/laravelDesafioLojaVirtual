import React,{Component} from 'react'
import {Row,Col,Container,Form,Button,Alert,Image} from 'react-bootstrap';
import UsuarioServico from '../../servicos/UsuarioServico.js'
import {Link} from 'react-router-dom'

export default class CadastrarUsuarioComponent extends Component{
    usuarioServico = new UsuarioServico()
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    state = {
        nome:"",
        senha:"",
        erros:[]
    }
    updateNomeUsuario(e){
        this.setState({nome:e.target.value});

        this.limparErros();
    }
    updateSenhaUsuario(e){
        this.setState({senha:e.target.value});
        this.limparErros();
    }
 
    limparErros(){
        this.setState({erros:[]})
    }
    async logarUsuario(){
        // validar 




        // chamar usuario
       await this.usuarioServico.logar(this.state.nome,this.state.senha).then(
            (data) => {
                if (data === true){
                    
                    document.location.reload();
                }

            }
        ).catch(e => {
            let novosErros = this.state.erros;
            novosErros.push(e)
            
            this.setState({ 
                erros:novosErros
            })
            this.setState({nome:"",senha:""})
          //  alert("Usuario ou Senha Invalido")
        });

    }
    componentDidMount(){
        // se já logador
        if ( this.usuarioServico.estouLogado()  ){
            this.props.history.push("/");
        }
       
    }
    mostrarErros(){
        return this.state.erros.map( (erro,index)=> {
            return <Alert key={index} variant="danger"> {erro} </Alert>
        })
    }
    render(){
        return(
            <Container className="mt-4">
                {this.mostrarErros()}
                <Row>
               
                    <Col>
                        <h2> Logar </h2>
                        <Form>
                            <Row>
                                <Col lg={8} sm={12}>
                                    <Form.Group>
                                        <Form.Label> Nome do Usuario </Form.Label>
                                        <Form.Control value={this.state.nome} onChange={(e)=>this.updateNomeUsuario(e)} type="text" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        <Row>
                            <Col lg={8} sm={12}>
                                <Form.Group>
                                    <Form.Label> Senha do Usuario </Form.Label>
                                    <Form.Control value={this.state.senha} onChange={(e)=>this.updateSenhaUsuario(e)} type="password" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Link to="/usuario/cadastrar"> Não Tem um Cadastro? </Link><br/>
                        <Button className="mt-2"onClick={()=>this.logarUsuario()}
                                > Logar  </Button>
                    </Form>
                </Col>
                <Col>
                    <img alt="" style={{width:"100%"}} src="/assets/msbeen_shop.jpg" />
                </Col>
                </Row>
            </Container>
        )
    }

}
