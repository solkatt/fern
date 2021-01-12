import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class UserDashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Home
                </Link>

                <Link to="/movies/list" className="nav-link">
                    List Movies
                            </Link>

                <Link to="/products/create" className="nav-link">
                    Create Product
                            </Link>

            </React.Fragment>
        )
    }
}

export default UserDashboard