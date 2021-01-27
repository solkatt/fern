import React, { Component } from 'react'
import api from '../api'
// import '../style/pages/EditProduct.scss'
import '../style/pages/PageLayout.scss'
import { Redirect } from "react-router-dom";
import LoadingAnimation from '../components/LoadingAnimation'

import CartContext from '../context/CartContext';


class EditProduct extends Component {

    static contextType = CartContext;

    constructor(props) {
        super(props)
        this.state = {
            store: {},
            products: [],
            columns: [],
            isLoading: false,
            redirect: null
        }

        // this.handleInputChange = this.handleInputChange.bind(this)
        // this.showProduct = this.showProduct.bind(this)
        // this.onDeleteProduct = this.onDeleteProduct.bind(this)
        this.loadStore = this.loadStore.bind(this)
        this.loadStoreProducts = this.loadStoreProducts.bind(this)
        // this.onUpdateProduct = this.onUpdateProduct.bind(this)
    }

    componentDidMount = async () => {

        const { name } = this.props.match.params

        await this.loadStore(name).then( async () => {
            this.loadStoreProducts(this.state.store._id)
         
        })

    }

    loadStore = async (name) => {
        this.setState({ isLoading: true })

        await api.getStoreByName(name).then(store => {
            this.setState({
                store: store.data.data,
                isLoading: false,
            })
            
            console.log('DATA', store.data)
        }, (err) => {
            this.setState({
                isLoading: false,
                redirect: true,
            })
            console.log(err)
        })
    }


    loadStoreProducts = async (storeID) => {
        // const { storeID } = this.state.store._id

        // console.log(id)
        this.setState({ isLoading: true })

        if (storeID) {
            await api.getProductsByStore(storeID).then(products => {
                this.setState({
                    products: products.data.data,
                    isLoading: false,
                })

            }, (err) => {
                console.log(err)
                this.setState({
                    isLoading: false,
                })

            })
        }
        this.setState({ isLoading: false })

    }


    displayProducts = (products) => {


        if (products.length < 1) {
            return (
                <>
                    <h2>No products here</h2>
                </>
            )
        }

        return (
            <>
                {products.map(product =>
                    <div key={product._id} className="product-card">


                        {/* {products.images.map(image =>
            <img src={image} alt={image.indexOf()} />)} */}

                        {product.images.length > 0 ?
                            <img style={{ height: '100px', width: '100px' }} src={product.images[0]} alt={product.images.indexOf()} />
                            :
                            <div>DEFUALT IMAGE</div>

                        }

                        <h3>{product.name}</h3>
                        <p>{product.description} to be trunctaded</p> 
                        <h5>{product.price}</h5>


                        <div className="btns">
                            <button>
                                {/* TODO LINK TO PRODUCT PAGE */}
                                {/* <Link to={`/products/edit/${product._id}`}>
                                    Edit
                                </Link> */}
                            </button>

                            {/* <button onClick={() => this.onEdit(product._id)}>Edit</button> */}
                            <button onClick={() => this.context.addToCart(product._id, this.state.store)}>Add to Cart</button>

                        </div>
                    </div>
                )}
            </>

        )

    }


    render() {
        const { store, products, isLoading } = this.state


        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (

            <div className="page-layout">
                <div className="page-content">

                    <h1>{store.name}</h1>
                    <h3>{store.description}</h3>
                    <div className="product-grid">


                    
                    {isLoading ? <LoadingAnimation /> : this.displayProducts(products)}



                    </div>






                </div>

            </div>


        )
    }
}

export default EditProduct


