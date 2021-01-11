
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar} from '../components'
import { MoviesList, MoviesInsert, MoviesUpdate, Landing } from '../pages';
import '../style/App.scss'

function App() {
  return (
    <Router>
    <NavBar />
    <Switch>
        <Route path="/" exact component={Landing} />




        <Route path="/movies/list" exact component={MoviesList} />
        <Route path="/movies/create" exact component={MoviesInsert} />
        <Route
            path="/movies/update/:id"
            exact
            component={MoviesUpdate}
        />
    </Switch>
</Router>
  );
}

export default App;
