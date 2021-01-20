import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/Store.scss'
import '../../style/pages/PageLayout.scss'
import UserContext from '../../context/UserContext';
import { set } from 'mongoose';



class Store extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {
            store: [],
            columns: [],
            isLoading: false,
            products: [],
        }


        this.showProps = this.showProps.bind(this)
        this.onDeleteProduct = this.onDeleteProduct.bind(this)
        this.loadStore = this.loadStore.bind(this)
        this.displayStore = this.displayStore.bind(this)

        this.loadProducts = this.loadProducts.bind(this)
    }

        componentDidMount = () => {

            // console.log('Componend did mount:',this.context.storeID)

            // this.setState({
            //     isLoading: true,
            // })

            // this.context.getUserData().then(() => {
            //     this.loadStore()

            // })

            this.loadStore()
            this.loadProducts()

       ///////////////////////////////
                // this.loadStore()


        }



    loadStore = async () => {

        this.setState({ isLoading: true })

        const storeID = this.context.storeID
        console.log('loadStore; this.context.storeID:', this.context.storeID)

        await api.getStoreById(storeID).then(store => {
            this.setState({
                store: store.data.data,
                isLoading: false,
            })
        }, (err) => {
            console.log(err)
        })

    }

    displayStore = (store) => {


        if (!store) return null

        return (
            <div className="product-grid">

                {/* Todo: Store Layout / CSS */}
                <div className="store-layout">

                    <h2>{store.name}</h2>
                    <h3>{store.description}</h3>
                    <h3>Store contact mail / Optional</h3>
                    <h3>Store Adress / Optional</h3>
                </div>

                <button>Edit Store Information</button>
            </div>
        )



    }



    showProps = () => {
        // alert(props.storeID)
        this.loadStore()
        console.log('this.context:', this.context)
        console.log('this.context.data:', this.context.data)
        console.log('this.state.products:', this.state.products)

    }


///////////
    loadProducts = async() => {
        this.setState({ isLoading: true })

       await api.getAllProducts().then(products => {
            this.setState({
                products: products.data.data,
                isLoading: false,
            })
        })
    }

///////////////////


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
        const { store, isLoading } = this.state

        return (

            <div className="page-layout">
                {/* <h1>State</h1>
                <h2>
                    StoreName:  {store.name}
                </h2>
                <h1>Context</h1>
                <h2>
                    storeID: {this.context.storeID}

                </h2> */}


                <h1>STORE</h1>
                <div className="page-content">


                    {isLoading ? <h2>Loading animation..</h2> : this.displayStore(store)}
                    {/* {this.displayStore(store)} */}

                    {/* <h3>{this.context.data}</h3> */}
                    <button onClick={this.showProps}>Load Store</button>


                </div>




            </div>


        )
    }
}

export default Store


