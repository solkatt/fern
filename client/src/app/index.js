
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { AddProduct, CreateStore, Landing, Products, EditProduct, Store, Storefront, Orders, OrderCompleted} from '../pages';
import {Checkout} from '../pages/index'
import '../style/App.scss'
import { UserProvider } from '../context/UserContext';
import { CartProvider } from '../context/CartContext';


class App extends React.Component {

  render() {
    return (
      <UserProvider value={this.state}>
        <CartProvider value={this.state}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/store" exact component={Store} />
            <Route path="/store/create" exact component={CreateStore} />
            {/* <Route path="/store" render={ (props)=> <UserProvider> <Store {...props} /> </UserProvider> } /> */}
            <Route path="/products/all" exact component={Products} />
            <Route path="/products/add" exact component={AddProduct} />
            <Route path="/orders" exact component={Orders} />
            <Route
              path="/products/edit/:id"
              exact
              component={EditProduct}
            />
           <Route
              path="/storefront/:name"
              exact
              component={Storefront}
            />
                  <Route
              path="/storefront/:name/checkout"
              exact
              component={Checkout}
            />
             <Route
              path="/order-success"
              exact
              component={OrderCompleted}
            />
            
          </Switch>
        </Router>
      </ CartProvider>
      </ UserProvider>
    );
  }
}

export default App;
