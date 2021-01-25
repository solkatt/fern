import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/AddProduct.scss'
import '../../style/pages/PageLayout.scss'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext';
import LoadingAnimation from '../../components/LoadingAnimation'

class Products extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            columns: [],
            isLoading: false,

        }


        this.showProduct = this.showProduct.bind(this)
        this.onDeleteProduct = this.onDeleteProduct.bind(this)
        this.loadAllProducts = this.loadAllProducts.bind(this)
        this.loadStoreProducts = this.loadStoreProducts.bind(this)
        this.onEdit = this.onEdit.bind(this)

    }
    componentDidMount = async () => {

        await this.context.getUserData().then(() => {
            this.loadStoreProducts()

        })
    }


    loadStoreProducts = async () => {
        const { storeID } = this.context

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


    /// LOAD ALL PRODUCTS
    loadAllProducts = async () => {
        this.setState({ isLoading: true })

        await api.getAllProducts().then(products => {
            this.setState({
                products: products.data.data,
                isLoading: false,
            })
        })
    }


    showProduct = (props) => {
        alert(props)
    }

    onEdit = () => {
        // Send props to Page
    }



    onDeleteProduct = async (productID) => {
        // this.setState({
        //     isLoading: true,
        // })

        await api.deleteProductById(productID).then((res) => {
            console.log(res.data)
        }, (err) => {
            console.log(productID)
            return console.log(err)
        })
        this.loadStoreProducts()
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
                        <p>{product.description}</p>
                        <h5>{product.price}</h5>


                        <div className="btns">
                            <button><Link to={`/products/edit/${product._id}`}>
                                Edit
            </Link></button>

                            {/* <button onClick={() => this.onEdit(product._id)}>Edit</button> */}
                            <button onClick={() => this.onDeleteProduct(product._id)}>Delete</button>
                            <button onClick={() => this.showProduct(product._id)}>Show this ID</button>

                        </div>
                    </div>
                )}
            </>

        )

    }




    render() {

        const { products, isLoading } = this.state

        return (

            <div className="page-layout">
                <div className="page-content">
                    <div className="product-grid">



                        {isLoading ? <LoadingAnimation /> : this.displayProducts(products)}


                    </div>






                </div>

            </div>


        )
    }
}

export default Products


