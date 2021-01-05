import React, { Component } from 'react'

import Logo from './Logo'
import Links from './Links'
import '../style/NavBar.scss'



class NavBar extends Component {
    render() {
        return (
       <nav>
               <Logo />
               <Links class="links" />
       </nav>
        )
    }
}

export default NavBar