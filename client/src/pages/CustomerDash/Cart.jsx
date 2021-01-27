import React, { Component } from 'react';
import '../../style/Cart.scss'
import '../../style/Common.scss'

import { FaWindowClose } from 'react-icons/fa';
import api from '../../api'

import CartContext from '../../context/CartContext';
import LoadingAnimation from '../../components/LoadingAnimation';

import { Link } from 'react-router-dom'


class Cart extends Component {
    static contextType = CartContext;
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isLoading: false,
        }

        this.onCloseModal = this.onCloseModal.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.displayCartContent = this.displayCartContent.bind(this);
        this.loadCartData = this.loadCartData.bind(this);

    }

    onCloseModal = () => {
        this.props.onCloseModal()
        this.displayCartContent()
    }


    onClickOutside = (event) => {
        const specifiedElement = document.querySelector('.join-modal')
        let isClickInside = specifiedElement.contains(event.target)
        if (!isClickInside) {
            this.onCloseModal()
        };

    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const field = event.target.name;
        this.setState({
            [field]: value
        })


    }



    componentDidMount = async () => {

    




        this.setState({ isLoading: true })

        await this.loadCartData()


        //then take storeID from cart to link to
    }


    handleSubmit = async () => {
        // this.setState({ isLoading: true })

        // const { firstName, email, password } = this.state;

        // const payload = {
        //     name: firstName,
        //     email: email,
        //     password: password,
        // }

        // await api.registerUser(payload).then((res) => {
        //     console.log(res);

        // }, (err) => {
        //     console.log(err)
        // })


    }




    loadCartData = async () => {

        this.setState({ isLoading: true })


        const shoppingCart = this.context.shoppingCart



        await shoppingCart.map(
            (product) => {
                api.getProductById(product.product).then((dbProduct) => {
                 

                    const loadedProduct = dbProduct.data.data

                     loadedProduct.cartQuantity = product.quantity
     
                    this.setState({
                        products: [...this.state.products, loadedProduct],
                        isLoading: false,
                    })


                    


                }, (err) => {
                    console.log(err)
                    this.setState({
                        isLoading: false,
                    })
                })



                // return (
                //     <div key={index}>
                //       <h2>{product}</h2>
                //       <h2>{product.price}kr</h2>
                //       <img style={{height: '100px', width: '100px'}} src={image} />
                //     </div>
                // )

            })
    }





    displayCartContent = () => {


        const products = this.state.products
        console.log('displayCartC, products[0]', products[0])

        if (products.length < 1) return 

        return (
            <>
                {products.map(
                    (product) => {

                        return (
                            <div key={product._id}>
                                <h3>{product.name}</h3>
                                <h3>{product.price}</h3>
                                <h3>{product.cartQuantity}</h3>
                                <img style={{height: '100px', width: '100px'}} src={product.images[0]} />
                            </div>
                        )
                    }
                )}


            </>
        )




    }


    render() {

        const { isLoading, products } = this.state


        return (
            <>
                <div className="modal" onClick={this.onClickOutside}>
                    <div className="join-modal">
                        <FaWindowClose className="close pointer" onClick={this.onCloseModal} />
                        <h1>CART for {this.context.store.name}</h1>
                        {isLoading ? <LoadingAnimation /> : this.displayCartContent()}

                        {/* <button type="submit" onClick={this.handleSubmit}>Check out</button> */}




                        <button><Link to={{  
                            pathname: `/storefront/{${this.context.store.name}}/checkout`,
                            state: {products}}}>
                               Checkout
            </Link></button> 


                    </div>
                </div>
            </>
        )
    }
}

export default Cart