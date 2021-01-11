import React, { Component } from 'react'

import {Logo, JoinModal, LoginModal, Links} from './index'
// import Links from './Links'
import '../style/NavBar.scss'
import '../style/Common.scss'



class NavBar extends Component {
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





    // onClickJoin(event) {
    //     this.setState({
    //             joinOpen: 
    //     })
    //         }
        
        

    render() {
        return (
       <nav>
               <Logo />

               <Links class="links" />



               <div className="nav-menu">
                   
               <div className="log-in pointer" onClick={this.onClickLogin}><p>Log in</p></div>
               <div className="join pointer" onClick={this.onClickJoin}><p>Join</p></div>
               
               { (this.state.joinOpen) ? <JoinModal onCloseModal={this.onClickJoin} /> : ''}
               { (this.state.loginOpen) ? <LoginModal onCloseModal={this.onClickLogin} /> : ''}
           
               {/*IF SIGNED IN, SHOW LOG OUT & USER MENU */}
               </div>
       </nav>
        )
    }
}



export default NavBar