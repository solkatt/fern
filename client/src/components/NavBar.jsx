import React, { Component } from 'react'

import { Logo, JoinModal, LoginModal, Links, UserDashboard } from './index'
import { Link } from 'react-router-dom'
// import Links from './Links'
import '../style/NavBar.scss'
import '../style/Common.scss'

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

    }

    onClickJoin(event) {
        this.setState(prevState => ({
            loginOpen: false,
            joinOpen: !prevState.joinOpen
        }));

        console.log('joinOpen:', this.state.joinOpen)
    }


    onClickLogin(event) {
        this.setState(prevState => ({
            joinOpen: false,
            loginOpen: !prevState.loginOpen
        }));

        console.log('loginOpen', this.state.loginOpen)
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





        return (
            <nav>

                <Logo />

                {this.context.isLoggedIn ?
                    (
                        <>
                            <UserDashboard class="links" />
    
                            <h2>isLoggedIn {this.context.isLoggedIn.toString()}</h2>
                            <h2>isLoggedIn {this.context.storeID}</h2>

                            <div className="join pointer" onClick={this.context.onSignOut}>
                           
                                <Link to="/">Logout</Link>

                                </div>

                        </>
                    ) : (


                        <>

                            <div className="nav-menu">

                                <div className="log-in pointer" onClick={this.onClickLogin}><p>Log in</p></div>
                                <div className="join pointer" onClick={this.onClickJoin}><p>Join</p></div>

                                {(this.state.joinOpen) ? <JoinModal onCloseModal={this.onClickJoin} /> : ''}
                                {(this.state.loginOpen) ? <LoginModal onCloseModal={this.onClickLogin} /> : ''}

                                {/*IF SIGNED IN, SHOW LOG OUT & USER MENU */}
                            </div>

                        </>
                    )
                }


            </nav>
        )

    }
}



export default NavBar