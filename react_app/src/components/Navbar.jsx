import React,{Component} from 'react'

import {Navbar , Nav,NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import UsuarioServico from '../servicos/UsuarioServico.js'

export  default class NavbarComponent extends Component{
    usuarioServico = new UsuarioServico();
    state = {logado:false}
   
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props)

    }
    deslogar(){
        this.usuarioServico.deslogar()
      //  this.props.history.push("/");
        //    this.context.history.push('/')
        window.location.href = window.location.href ;
        
        console.log(window.location.href)
       // alert(window.location.href)
        console.log("USUARIO DESLOGADO")
     }
    mostrarLinkDeslogar(){
        if(this.state.logado){
            return ( <Nav.Link className="ml-lg-auto" onClick={()=> this.deslogar() }>
                        Deslogar
                    </Nav.Link>)
        }
    }
    componentDidUpdate(prevProps){
        // if( this.usuarioServico.estouLogado() !== this.state.logado  ){
        //     this.setState ( { logado: this.usuarioServico.estouLogado()  } )
        // }
        if (this.props.location !== prevProps.location) {
            this.setState ( { logado: this.usuarioServico.estouLogado()  } )
        }
    }
    componentDidMount(){
        this.setState ( { logado: this.usuarioServico.estouLogado()  } )
        
    }
    render(){
        return(
            <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">Loja</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse  id="navbar-nav">
                    <Nav className="w-100" id="navbar-nav">
                        
                        <NavDropdown title="Produtos"
                                    id="basic-nav-dropdown">
                            <NavDropdown.Item 
                                        to="/produto/cadastrar"
                                        as={Link}>
                                    Cadastrar Produto
                            </NavDropdown.Item>
                            <NavDropdown.Item 
                                        to="/produto"
                                        as={Link}>
                                    Ver Produto
                            </NavDropdown.Item>
                        </NavDropdown>
                        {/*                         
                        {this.state.logado && (
                            <NavDropdown title="Sistema"
                                id="basic-nav-dropdown2"
                                >
                                <NavDropdown.Item 
                                                to="/usuario/logar"
                                                as={Link}>
                                        Logar
                                </NavDropdown.Item>
                                <NavDropdown.Item 
                                                to="/usuario/cadastrar"
                                                as={Link}>
                                        Usuario
                                </NavDropdown.Item>
                            </NavDropdown>
                        )} */}
                        {/* {this.mostrarLinkDeslogar()} */}
                        {   this.state.logado &&
                            ( <Nav.Link className="ml-lg-auto" onClick={()=> this.deslogar() }>
                            Deslogar
                            </Nav.Link>)
                        }
                        { !this.usuarioServico.estouLogado() &&
                            (<Nav.Link className="ml-lg-auto" as={Link} to="/usuario/logar"  >
                            LogIn
                            </Nav.Link>) 
                        }
                    </Nav>
                    
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
}