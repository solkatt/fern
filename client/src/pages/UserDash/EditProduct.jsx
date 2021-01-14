import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/EditProduct.scss'
import '../../style/pages/PageLayout.scss'


class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            columns: [],
            isLoading: false,
        }


        this.showProduct = this.showProduct.bind(this)
        this.onDeleteProduct = this.onDeleteProduct.bind(this)
        this.loadProduct = this.loadProduct.bind(this)
    }

    componentDidMount = () => {

        const { id } = this.props.match.params

        // console.log(id)

        this.loadProduct(id)
    }

    loadProduct = async (id) => {
        this.setState({ isLoading: true })

        await api.getProductById(id).then(product => {
            this.setState({
                product: product.data.data,
                isLoading: false,
            })
            console.log(this.state.product)
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
        
        this.loadProduct()
    }




    render() {
        const { product } = this.state

        return (

            <div className="page-layout">
                <div className="page-content">


                    <div className="product-grid">
                    {/* <h1>{product}</h1> */}

                
                            <div key={product._id} className="product-card">

                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <h5>{product.price}</h5>
                                <h5>{product.stock_quantity}</h5>
                                <h5>{product.categories}</h5>
                                <h5>{product.image}</h5>


                                <div className="btns">
                                    <button onClick={() => this.onDeleteProduct(product._id)}>Delete</button>
                                    <button onClick={() => this.showProduct(product._id)}>Show this ID</button>

                                </div>
                            </div>
                 

                    </div>






                </div>

            </div>


        )
    }
}

export default EditProduct


