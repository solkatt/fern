
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { MoviesList, MoviesInsert, MoviesUpdate, Landing, Products } from '../pages';
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
            <Route path="/products/all" exact component={MoviesList} />
            <Route path="/movies/list" exact component={Products} />
            <Route path="/movies/create" exact component={MoviesInsert} />
            <Route
              path="/movies/update/:id"
              exact
              component={MoviesUpdate}
            />
          </Switch>
        </ UserProvider>
      </Router>
    );
  }
}

export default App;
