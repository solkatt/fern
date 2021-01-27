import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/EditProduct.scss'
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
            columns: [],
            isLoading: false,
            redirect: null
        }

        this.displayCheckout = this.displayCheckout.bind(this)
        // this.handleInputChange = this.handleInputChange.bind(this)
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






    // loadProduct = async (id) => {
    //     this.setState({ isLoading: true })

    //     await api.getProductById(id).then(product => {
    //         this.setState({
    //             product: product.data.data,
    //             isLoading: false,
    //         })
    //         console.log(this.state.product)
    //     })
    // }


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





    // handleInputChange = (event) => {
    //     const value = event.target.value;
    //     const field = event.target.name;
    //     // this.setState({
    //     //         [field]: value
    //     // })


    //     // this.setState({...this.state.product, name: value});


    //     this.setState(prevState => {
    //         let product = { ...prevState.product };  // creating copy of state variable jasper
    //         product[field]  = value;                     // update the name property, assign a new value                 
    //         return { product };                                 // return new object jasper object
    //       })



    // }







    // onUpdateProduct = async (productID) => {


    //     const {name, description, image, price, stock_quantity, storeID, categories } = this.state.product

    //     const payload = {
    //         name: name,
    //         description: description,
    //         image: image,
    //         price: price,
    //         stock_quantity: stock_quantity,
    //         storeID: storeID,
    //         categories: categories,
    //     }


    //    // img, if no new image then used previous

    //     await api.updateProduct(productID, payload).then((res) => {

    //         console.log(res.data);


    //         // this.setState({ redirect: "/products/all" });


    //     }, (err) => {
    //         return console.log(err)
    //     })
    // }





    displayCheckout = () => {

        const store = this.context.store



        return (
            <>
                <h2>POOP</h2>
                <h2>Store: {store.name}</h2>


                <div>
                    <h2>Cart:</h2>
                    {this.state.products.map((product) => {
                        return (
                            <div key={product._id}>
                                <h2>Product name: {product.name}</h2>
                                <img src={product.images[0]} style={{ height: '200px', width: '200px' }} />
                                <h2>Price styck: {product.price}</h2>
                                <h2>quantity: {product.cartQuantity}</h2>
                                <p>+</p>
                                <p>-</p>
                            </div>
                        )
                    })}
                </div>

                <div>
                    <h2>Customer info:</h2>
                    <input name="firstName" type="text" placeholder="Förnamn" onChange={this.handleInputChange}></input>
                    <input name="lastName" type="text" placeholder="Efternamn" onChange={this.handleInputChange}></input>
                    <input name="email" type="email" placeholder="Email" onChange={this.handleInputChange}></input>
                    <input name="phone" type="text" placeholder="Telefon" onChange={this.handleInputChange}></input>
                    <input name="adress" type="text" placeholder="Address" onChange={this.handleInputChange}></input>
                    <input name="city" type="text" placeholder="City" onChange={this.handleInputChange}></input>
                    <input name="zip" type="text" placeholder="Zip" onChange={this.handleInputChange}></input>
                    <input name="store" type="text" placeholder="Butik" onChange={this.handleInputChange}></input>

                    <button>Next</button>
                </div>
                <div>
                    <h2>Shipping</h2>

                    <label class="container">DHL
                        <input type="checkbox" checked="checked" />
                        <span class="checkmark"></span>
                    </label>
                    <button>Next</button>

                </div>
                <div>
                    <h2>Payment</h2>

                  
                    <button>Next</button>

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


