import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class UserDashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Home
                </Link>


                <Link to="/store/" className="nav-link">
                    Store
                            </Link>

                <Link to="/products/all" className="nav-link">
                    All Your Products
                            </Link>

                <Link to="/products/add" className="nav-link">
                    Add New Product
                            </Link>
             
                <Link to="/orders" className="nav-link">
                    Orders
                            </Link>
                            
        


            </React.Fragment>
        )
    }
}

export default UserDashboard