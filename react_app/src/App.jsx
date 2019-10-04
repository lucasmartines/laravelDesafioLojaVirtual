import React from 'react'

import {BrowserRouter as Router ,Route,Switch } from 'react-router-dom'

import ProdutoComponent from './components/produtos/ProdutosComponent.jsx'
import CadastrarProduto from './components/produtos/CadastrarProduto.jsx'

import  NavbarComponent from './components/Navbar.jsx';
import PainelProdutoComponent from './components/produtos/PainelProdutoComponent.jsx'
import DetalhesProdutoComponent from './components/produtos/ProdutoDetalhesComponent.jsx'
import ModificarProdutoComponent from "./components/produtos/ProdutoModificarComponent.jsx";
import CadastrarUsuarioComponent from './components/usuario/CadastrarUsuarioComponent.jsx';
import LogarUsuarioComponent from './components/usuario/LogarUsuarioComponent.jsx'



function App() {
  return (
    <div>
     
      <Router>
        <NavbarComponent/>
        <Switch>
          
              
              {/* <Route exact path="/" component={ProdutoComponent}/> */}
              <Route path="/produto/cadastrar" component={CadastrarProduto} />
              <Route path="/produto/detalhes/:id" component={DetalhesProdutoComponent} />
              <Route path="/produto/modificar/:id" component={ModificarProdutoComponent} /> 
              <Route path="/produto" exact component={PainelProdutoComponent} />
              <Route path="/usuario/logar" component={LogarUsuarioComponent} />
              <Route path="/usuario/cadastrar" component={CadastrarUsuarioComponent} />
              <Route exact path="/:buscar?/:pagina?" component={ProdutoComponent}/>
              <Route component={ ()=> (<h2> Erro 404-Pagina não encontrada!  </h2>)} />
        </Switch>
      </Router>       
    </div>
  );
}

export default App;
