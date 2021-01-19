import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/AddProduct.scss'
import '../../style/pages/PageLayout.scss'
import { Link } from 'react-router-dom'

class Products extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            columns: [],
            isLoading: false,

        }


        this.showProduct = this.showProduct.bind(this)
        this.onDeleteProduct = this.onDeleteProduct.bind(this)
        this.loadProducts = this.loadProducts.bind(this)
        this.onEdit = this.onEdit.bind(this)
    }

    componentDidMount = () => {



        this.loadProducts()




    }

    loadProducts = () => {
        this.setState({ isLoading: true })

        api.getAllProducts().then(products => {
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


        // Todo -- Sometimes error on delete / page doesnt update


        // this.setState({
        //     isLoading: true,
        // })
        // console.log('Loading...')

        // console.log(productID)

        await api.deleteProductById(productID).then((res) => {

            console.log(res.data)



        }, (err) => {
            console.log(productID)

            return console.log(err)
        })


        this.loadProducts()


    }




    render() {
        const { products } = this.state

        return (

            <div className="page-layout">
                <div className="page-content">
                    <div className="product-grid">


                        {products.length > 0 ?
                            <>
                                {products.map(product =>
                                    <div key={product._id} className="product-card">

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
                            :
                            <h2>No products here</h2>}


                    </div>






                </div>

            </div>


        )
    }
}

export default Products


