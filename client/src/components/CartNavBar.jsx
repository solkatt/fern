import React, { Component } from 'react';
// import '../style/JoinModal.scss'
// import '../style/Common.scss'

import { AiOutlineShoppingCart } from 'react-icons/ai';
import api from '../api'


import CartContext from '../context/CartContext';



class CartNavBar extends Component {

    static contextType = CartContext;

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',

        }


    }


    componentDidMount = () => {

        console.log(this.context)
    }






    render() {
        return (

            <>

                <div>
                    <h3>Cart</h3>

                    <AiOutlineShoppingCart />
                    <h4>{this.context.getTotalQuantity()}</h4>
                </div>


            </>
        )
    }
}

export default CartNavBar