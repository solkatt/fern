import React, { Component } from 'react';
import '../../style/Cart.scss'
import '../../style/Common.scss'

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import api from '../../api'

import CartContext from '../../context/CartContext';
import LoadingAnimation from '../../components/LoadingAnimation';

import { Link } from 'react-router-dom'


class OrderCompleted extends Component {
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
        const specifiedElement = document.querySelector('.cart-modal')
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





    loadCartData = async () => {

        this.setState({ isLoading: true })


        const shoppingCart = this.context.shoppingCart



        await shoppingCart.map(
            (product) => {
                return (


                    api.getProductById(product.product).then((dbProduct) => {
                        
                        
                        const loadedProduct = dbProduct.data.data
                        
                        loadedProduct.cartQuantity = product.quantity
                        
                        this.setState({
                            products: [...this.state.products, loadedProduct],
                            isLoading: false,
                        })
                        
                        this.context.linkCartToStore(loadedProduct.storeID)
                        
                        
                        
                        
                        
                    }, (err) => {
                        console.log(err)
                        this.setState({
                            isLoading: false,
                        })
                    })
                    
                    
                    )
                    
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


        if (products.length < 1) return

        return (
            <>

                {products.map(
                    (product) => {

                        return (
                            <>
                                <div className='cart-item' key={product._id}>
                                    <div className='cart-item-image-container'>
                                        <img className='cart-item-image' alt='product' src={product.images[0]} />
                                    </div>
                                    <div className='cart-item-info'>
                                        <h3 className='cart-item-title'>{product.name}</h3>
                                        <div className='cart-item-edit'>
                                            <AiOutlineMinus />
                                            <h3 className='cart-item-quantity'>X {product.cartQuantity} </h3>
                                            <AiOutlinePlus />
                                        </div>
                                       {/* < AiFillDelete className=''/> */}
                                        <h3 className='cart-item-price'>{product.price} kr</h3>
                                    </div>
                                </div>
                                <div className='cart-line'></div>
                            </>
                        )
                    }
                )}
                <div className='cart-total-price'>
                    <h2 className='cart-total-total'>Total</h2> <h2 className='cart-total-sum'>{products ? this.context.calculateSum(products) : ''} kr</h2>

                </div>


            </>
        )




    }


    render() {

        const { isLoading, products } = this.state


        return (
            <>
                <div className="cart-modalbg" onClick={this.onClickOutside}>
                    <div className="cart-modal">
                        <h1 className='cart-store-title'>Products in Cart</h1>
                        {isLoading ? <LoadingAnimation /> : this.displayCartContent()}

                        {/* <button type="submit" onClick={this.handleSubmit}>Check out</button> */}




                        <button className='checkout-button' onClick={this.onCloseModal}>
                            <Link className='checkout-button-text' to={{
                            pathname: `/storefront/{${this.context.store.name}}/checkout`,
                            state: { products }
                        }}>
                            Checkout
            </Link></button>


                    </div>
                </div>
            </>
        )
    }
}

export default OrderCompleted