import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/Checkout.scss'
import '../../style/pages/PageLayout.scss'
import { Redirect } from "react-router-dom";

import CartContext from '../../context/CartContext';
import LoadingAnimation from '../../components/LoadingAnimation';

class Checkout extends Component {
    static contextType = CartContext;

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            store: '',
            name: '',
            email: '',
            adress: [
                { street: '', city: '', zip: 0 }
            ],
            phone: 0,
            payment_method: null,

            isLoading: false,
            redirect: null
        }

        this.displayCheckout = this.displayCheckout.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleAdressChange = this.handleAdressChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onClickNextBtn = this.onClickNextBtn.bind(this)




        // this.showProduct = this.showProduct.bind(this)
        // this.onDeleteProduct = this.onDeleteProduct.bind(this)
        // this.loadProduct = this.loadProduct.bind(this)
        // this.onUpdateProduct = this.onUpdateProduct.bind(this)
    }

    componentDidMount = async () => {

        this.setState({ isLoading: true })

        await this.loadCartData().then(() => {

            this.setState({
                isLoading: false

            })

        })

        // this.setState({store: name})
    }





    //    componentDidMount = async () => {

    //         const { name } = this.props.match.params

    //         await this.loadStore(name).then( async () => {
    //             this.loadStoreProducts(this.state.store._id)

    //         })

    //     }

    //     loadStore = async (name) => {
    //         this.setState({ isLoading: true })

    //         await api.getStoreByName(name).then(store => {
    //             this.setState({
    //                 store: store.data.data,
    //                 isLoading: false,
    //             })

    //             console.log('DATA', store.data)
    //         }, (err) => {
    //             this.setState({
    //                 isLoading: false,
    //                 redirect: true,
    //             })
    //             console.log(err)
    //         })
    //     }





    handleInputChange = (event) => {
        const value = event.target.value;
        const field = event.target.name;
        this.setState({
            [field]: value
        })





        // this.setState({...this.state.product, name: value});


        // this.setState(prevState => {
        //     let product = { ...prevState.product };  // creating copy of state variable jasper
        //     product[field]  = value;                     // update the name property, assign a new value                 
        //     return { product };                                 // return new object jasper object
        //   })



    }

    handleAdressChange = (event) => {

        const value = event.target.value;
        const field = event.target.name;

        const adress = { ...this.state.adress }
        adress[field] = value
        this.setState({ adress })

    }




    handleSubmit = async () => {


        this.setState({
            isLoading: true,
        });


        alert('fired')


        const { products, name, email, adress, phone, payment_method } = this.state

        const store = this.context.store

        const total_price = this.context.calculateSum(products)

        const destructuredProducts = products.map((fullProduct) => {
            return (
                { product: fullProduct.name, productID: fullProduct._id, price: fullProduct.price, quantity: fullProduct.cartQuantity }
            )
        })


        const payload = {
            products: destructuredProducts,
            storeName: store.name,
            name: name,
            email: email,
            adress: [
                { street: adress.street, city: adress.city, zip: adress.zip }
            ],
            phone: phone,
            payment_method: 'DHL',
            total_price: total_price,
            storeID: store._id
        }




        // create Store
        // Then put StoreID to User
        await api.createOrder(payload).then((res) => {


            // const storeID = res.data.id
            this.setState({
                isLoading: false,
                // rediret: 'ordercomplete'
            })
            alert('Order successfully created')

            console.log(res.data)

        }, (err) => {
            console.log(err)
            this.setState({
                isLoading: false,
            })
        })

        this.setState({
            isLoading: false,
            // rediret: 'ordercomplete'
        })
    }


    onClickNextBtn = (event) => {


        const button = event.target.name

        const detailsContainer = document.querySelector('.customer-details-container')
        const detailsTitle = document.querySelector('.details-title')

        const shippingContainer = document.querySelector('.shipping-container')
        const shippingTitle = document.querySelector('.shipping-title')

        const paymentContainer = document.querySelector('.payment-container')
        // const paymentTitle =  document.querySelector('.payment-title')


        if (button === 'details') {
            detailsContainer.classList.add('hide')
            detailsTitle.classList.add('hide')

            shippingContainer.classList.remove('hide')
            shippingTitle.classList.remove('hide')
        }

        if (button === 'shipping') {
            shippingContainer.classList.add('hide')
            shippingTitle.classList.add('hide')

            paymentContainer.classList.remove('hide')
            //  shippingTitle.classList.remove('hide')

        }


    }



    displayCheckout = () => {

        const store = this.context.store
        const products = this.state.products

        let totalPrice = 0

        if (this.state.products) {


        }



        return (
            <>


                <div className='order-container hide'>

                    <h2>Store: {store.name}</h2>


                    <div>
                        <h2>Cart:</h2>
                        {this.state.products.map((product) => {
                            return (
                                <div className='order-item' key={product._id}>
                                    <div className='order-item-image-container'>

                                        <img src={product.images[0]} style={{ height: '200px', width: '200px' }} />
                                    </div>

                                    <h2>Product name: {product.name}</h2>
                                    <h2>Price styck: {product.price}</h2>
                                    <h2>quantity: {product.cartQuantity}</h2>
                                    <p>+</p>
                                    <p>-</p>

                                Total:{products ? this.context.calculateSum(products) : ''}

                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='checkout-wrapper'>

                    <h1 className='details-title'>ORDER DETAILS</h1>
                    <div className='customer-details-container'>
                        <div className='details-form'>

                            <input name="name" type="text" placeholder="Name" onChange={this.handleInputChange}></input>
                            <input name="email" type="email" placeholder="Email" onChange={this.handleInputChange}></input>
                            <input name="phone" type="number" placeholder="Phone" onChange={this.handleInputChange}></input>
                            <input name="adress" type="text" placeholder="Adress" onChange={this.handleAdressChange}></input>
                            <input name="city" type="text" placeholder="City" onChange={this.handleAdressChange}></input>
                            <input name="zip" type="number" placeholder="Zip" onChange={this.handleAdressChange}></input>
                            <button name="details" className="next-button common-button" onClick={this.onClickNextBtn}>Next</button>
                        </div>
                    </div>


                    <h2 className='shipping-title hide'>Shipping</h2>
                    <div className='shipping-container hide'>


                        <div className='shipping-alternatives'>
                            <form>
                                <label>
                                    <input type="radio" name="radio" checked />
                                    <span className='shipping-alternative-title'>Sschenker</span>
                                    <p className='shipping-alternative-info'>69kr | 2-3 days delivery</p>
                                </label>
                                <label>
                                    <input type="radio" name="radio" />
                                    <span className='shipping-alternative-title'>Postnord</span>
                                    <p className='shipping-alternative-info'>89kr | 2-14 days delivery</p>
                                </label>
                                <label>
                                    <input type="radio" name="radio" />
                                    <span className='shipping-alternative-title'>DHL</span>
                                    <p className='shipping-alternative-info'>99kr | 1-4 days delivery</p>
                                </label>
                                <label>
                                    <input type="radio" name="radio" />
                                    <span className='shipping-alternative-title'>Instabox</span>
                                    <p className='shipping-alternative-info'>129kr | Next day delivery</p>

                                </label>
                            </form>

                        </div>

                        <button name="shipping" className="next-button common-button" onClick={this.onClickNextBtn}>Next</button>

                    </div>
                    <div className='payment-container hide'>
                        <h2>Payment</h2>


                        <button onClick={this.handleSubmit}>Place Order</button>

                    </div>

                </div>
            </>
        )

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





    render() {
        const { isLoading, products } = this.state


        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (

            <div className="page-layout">
                <div className="page-content">


                    {isLoading ? <LoadingAnimation /> : this.displayCheckout()}


                </div>

            </div>


        )
    }
}

export default Checkout


