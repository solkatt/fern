import React, { Component } from 'react'

import { Logo, JoinModal, LoginModal, Links, UserDashboard, CartNavBar } from './index'
import { Link } from 'react-router-dom'

// import Links from './Links'
import '../style/NavBar.scss'
import '../style/Common.scss'
import { FiLogOut } from 'react-icons/fi';

import UserContext from '../context/UserContext';

class NavBar extends Component {


    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            joinOpen: false,
            loginOpen: false,
        }

        this.onClickJoin = this.onClickJoin.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.displayUserDashboard = this.displayUserDashboard.bind(this);
        this.displayCustomerDashboard = this.displayCustomerDashboard.bind(this);

    }




    onClickJoin(event) {
        this.setState(prevState => ({
            loginOpen: false,
            joinOpen: !prevState.joinOpen
        }));

    }


    onClickLogin(event) {
        this.setState(prevState => ({
            joinOpen: false,
            loginOpen: !prevState.loginOpen
        }));

    }


    displayUserDashboard = () => {


        const isLoggedIn = this.context.isLoggedIn

        if (isLoggedIn) {
            return (
                <>
                    <UserDashboard class="links" />
                    <div className="join pointer" onClick={this.context.onSignOut}>
                        <Link className='nav-link-logout' to="/">
                        <FiLogOut className="logout-icon" />

                            </Link>
                    </div>
                </>
            )
        } else {

            return (
                <>

                    <div className="nav-menu">

                        <div className="log-in pointer" onClick={this.onClickLogin}><h4>Log in</h4></div>
                        <div className="join pointer" onClick={this.onClickJoin}><h4>Join</h4></div>

                        {(this.state.joinOpen) ? <JoinModal onCloseModal={this.onClickJoin} /> : ''}
                        {(this.state.loginOpen) ? <LoginModal onCloseModal={this.onClickLogin} /> : ''}

                        {/*IF SIGNED IN, SHOW LOG OUT & USER MENU */}
                    </div>
                </>

            )
        }

    }


    displayCustomerDashboard = () => {

        return (
            
       
                    <>

                            <CartNavBar />

                    </>


        
        )

    }


    // onClickLogout(event) {

    // this.context.onSignOut()
    // }



    // onClickJoin(event) {
    //     this.setState({
    //             joinOpen: 
    //     })
    //         }



    render() {

        const currentPath = window.location.pathname






        return (
            <nav>

                <Logo />

                {currentPath.includes('/storefront/') ? this.displayCustomerDashboard() : this.displayUserDashboard()}





            </nav>
        )

    }

}



export default NavBar