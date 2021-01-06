import React, { Component } from 'react'

import {Logo, JoinModal} from './index'
// import Links from './Links'
import '../style/NavBar.scss'
import '../style/Common.scss'



class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            joinOpen: false,
        }

        this.onClickJoin = this.onClickJoin.bind(this);
    }

    onClickJoin(event) {
        this.setState(prevState => ({
            joinOpen: !prevState.joinOpen
          }));

          console.log(this.state.joinOpen)
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
               {/* <Links class="links" /> */}
               <div className="nav-menu">
                   
               <div className="log-in pointer"><p>Log in</p></div>
               <div className="join pointer" onClick={this.onClickJoin}><p>Join</p></div>
               
               { (this.state.joinOpen) ? <JoinModal onCloseModal={this.onClickJoin} /> : ''}
           
               {/*IF SIGNED IN, SHOW LOG OUT & USER MENU */}
               </div>
       </nav>
        )
    }
}



export default NavBar