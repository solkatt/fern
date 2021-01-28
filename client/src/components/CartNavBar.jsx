import React, { Component } from 'react';


import { AiOutlineShoppingCart } from 'react-icons/ai';
import api from '../api'
import '../style/CartNavBar.scss'

import CartContext from '../context/CartContext';
import {Cart} from '../pages/index'


class CartNavBar extends Component {

    static contextType = CartContext;

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            cartOpen: false,

        }

        this.onClickCart = this.onClickCart.bind(this);



    }


    componentDidMount = () => {

        console.log(this.context)
    }



    onClickCart(event) {
        this.setState(prevState => ({
            cartOpen: !prevState.cartOpen
        }));

        console.log('cartOpen:', this.state.cartOpen)
    }




    render() {
        return (

            <>

                <div className='cart-navbar'>
                    <AiOutlineShoppingCart className='cart-icon' onClick={this.onClickCart} />
                    <div className='cart-quantity'  onClick={this.onClickCart} ><h2 className='cart-quantity-number'>{this.context.getTotalQuantity()}</h2></div>
                    {(this.state.cartOpen) ? <Cart onCloseModal={this.onClickCart} /> : ''}

                </div>


            </>
        )
    }
}

export default CartNavBar