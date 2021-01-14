import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/Store.scss'
import '../../style/pages/PageLayout.scss'


class Store extends Component {
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
    }

    componentDidMount = () => {
        this.loadProducts()
    }

    loadProducts = async () => {
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



    onDeleteProduct = async (productID) => {


        // Todo -- Sometimes error on delete / page doesnt update


        // this.setState({
        //     isLoading: true,
        // })
        // console.log('Loading...')

        await api.deleteProductById(productID).then((res) => {

            console.log(res.data);


            
            
        }, (err) => {
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

                        {products.map(product =>
                            <div key={product._id} className="product-card">

                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <h5>{product.price}</h5>


                                <div className="btns">
                                    <button>Edit</button>
                                    <button onClick={() => this.onDeleteProduct(product._id)}>Delete</button>
                                    <button onClick={() => this.showProduct(product._id)}>Show this ID</button>

                                </div>
                            </div>
                        )}

                    </div>






                </div>

            </div>


        )
    }
}

export default Store


