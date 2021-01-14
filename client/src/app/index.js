
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { AddProduct, MoviesUpdate, Landing, Products, EditProduct } from '../pages';
import '../style/App.scss'
import { UserProvider } from '../context/UserContext';


class App extends React.Component {

  render() {
    return (
      <Router>
        <UserProvider value={this.state}>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/products/all" exact component={Products} />
            {/* <Route path="/movies/list" exact component={Products} /> */}
            <Route path="/products/add" exact component={AddProduct} />
            <Route
              path="/products/edit/:id"
              exact
              component={EditProduct}
            />
          </Switch>
        </ UserProvider>
      </Router>
    );
  }
}

export default App;
