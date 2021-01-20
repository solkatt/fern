
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { AddProduct, MoviesUpdate, Landing, Products, EditProduct, Store } from '../pages';
import '../style/App.scss'
import { UserProvider } from '../context/UserContext';


class App extends React.Component {

  render() {
    return (
      <UserProvider value={this.state}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/store" exact component={Store} />
            {/* <Route path="/store" render={ (props)=> <UserProvider> <Store {...props} /> </UserProvider> } /> */}
            <Route path="/products/all" exact component={Products} />
            <Route path="/movies/list" exact component={Products} />¨
            <Route path="/products/add" exact component={AddProduct} />
            <Route
              path="/products/edit/:id"
              exact
              component={EditProduct}
            />
          </Switch>
        </Router>
      </ UserProvider>
    );
  }
}

export default App;
