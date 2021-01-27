import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/AddProduct.scss'
import '../../style/pages/PageLayout.scss'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext';
import LoadingAnimation from '../../components/LoadingAnimation'
import { AiFillEdit, AiFillDelete} from 'react-icons/ai';


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
        this.setState({
            isLoading: true
        })

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
                                <img src={product.images[0]} alt={product.images.indexOf()} />
                                :
                                <div>DEFUALT IMAGE</div>

                            }
                            <div className='product-info-container'>

                            <h3 className='product-name'>{product.name}</h3>
                            <p className='product-description'>{product.description}</p>
                            <h5 className='product-price'>{product.price}kr</h5>


                            <div className="product-btns">
                                <button><Link to={`/products/edit/${product._id}`}>
                                <AiFillEdit className='edit-icon'/>

                               
                               </Link>
                                </button>
                                <button onClick={() => this.onDeleteProduct(product._id)}>
                               
                                    <AiFillDelete className='edit-icon'/>
                                    </button>
                       
                            </div>
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
                        <h2 className='page-title'>PRODUCTS</h2>


                        {isLoading ? <LoadingAnimation /> : this.displayProducts(products)}


                    </div>






                </div>

            </div>


        )
    }
}

export default Products


