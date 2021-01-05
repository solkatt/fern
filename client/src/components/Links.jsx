import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    My first MERN Application
                </Link>

                <Link to="/movies/list" className="nav-link">
                    List Movies
                            </Link>

                <Link to="/movies/create" className="nav-link">
                    Create Movie
                            </Link>

            </React.Fragment>
        )
    }
}

export default Links