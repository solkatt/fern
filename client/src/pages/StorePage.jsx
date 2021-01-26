import React, { Component } from 'react'
import api from '../api'
// import '../style/pages/EditProduct.scss'
import '../style/pages/PageLayout.scss'
import { Redirect } from "react-router-dom";


class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            store: {},
            product: {},
            columns: [],
            isLoading: false,
            redirect: null
        }

        // this.handleInputChange = this.handleInputChange.bind(this)
        // this.showProduct = this.showProduct.bind(this)
        // this.onDeleteProduct = this.onDeleteProduct.bind(this)
        this.loadStore = this.loadStore.bind(this)
        // this.onUpdateProduct = this.onUpdateProduct.bind(this)
    }

    componentDidMount = () => {

        const { name } = this.props.match.params

        console.log('name:', name)

         this.loadStore(name)
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
            })
            console.log(err)
        })
    }


    // handleInputChange = (event) => {
    //     const value = event.target.value;
    //     const field = event.target.name;
    //     // this.setState({
    //     //         [field]: value
    //     // })


    //     // this.setState({...this.state.product, name: value});


    //     this.setState(prevState => {
    //         let product = { ...prevState.product };  // creating copy of state variable jasper
    //         product[field] = value;                     // update the name property, assign a new value                 
    //         return { product };                                 // return new object jasper object
    //     })



    // }



    // showProduct = (props) => {
    //     console.log(this.state.product)
    // }



    // onDeleteProduct = async (productID) => {


    //     // Todo -- Sometimes error on delete / page doesnt update


    //     // this.setState({
    //     //     isLoading: true,
    //     // })
    //     // console.log('Loading...')

    //     await api.deleteProductById(productID).then((res) => {

    //         console.log(res.data);


    //         this.setState({ redirect: "/products/all" });


    //     }, (err) => {
    //         return console.log(err)


    //     })



    // }

    // onUpdateProduct = async (productID) => {


    //     const { name, description, image, price, stock_quantity, storeID, categories } = this.state.product

    //     const payload = {
    //         name: name,
    //         description: description,
    //         image: image,
    //         price: price,
    //         stock_quantity: stock_quantity,
    //         storeID: storeID,
    //         categories: categories,
    //     }


    //     // img, if no new image then used previous

    //     await api.updateProduct(productID, payload).then((res) => {

    //         console.log(res.data);


    //         // this.setState({ redirect: "/products/all" });


    //     }, (err) => {
    //         return console.log(err)
    //     })
    // }


    render() {
        const { store } = this.state


        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (

            <div className="page-layout">
                <div className="page-content">


                    <div className="product-grid">
                        <h1>{store.name}</h1>


                        {/* <div key={product._id} className="product-card"> */}


                            {/* 
                
                        
                            <input name="name" type="text" defaultValue={product.name} onChange={this.handleInputChange} />
                            <input name="description" type="text" defaultValue={product.description} onChange={this.handleInputChange} />
                            {/* Todo: Inser KR after price */}
                            {/* <input name="price" type="number" defaultValue={product.price} onChange={this.handleInputChange} /> */}


                            {/* <div className="btns">
                                <button onClick={() => this.onDeleteProduct(product._id)}>Delete</button>
                                <button onClick={() => this.showProduct(product._id)}>Show this.state.product</button>
                                <button onClick={() => this.onUpdateProduct(product._id)}>Update Product</button>

                            </div> */}
                        {/* </div> */}


                    </div>






                </div>

            </div>


        )
    }
}

export default EditProduct


