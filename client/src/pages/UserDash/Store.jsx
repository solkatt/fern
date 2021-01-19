import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/Store.scss'
import '../../style/pages/PageLayout.scss'
import UserContext from '../../context/UserContext';



class Store extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {
            store: [],
            columns: [],
            isLoading: false,
        }


        this.showProduct = this.showProduct.bind(this)
        this.onDeleteProduct = this.onDeleteProduct.bind(this)
        this.loadStore = this.loadStore.bind(this)
    }

    componentDidMount = async () => {

        await this.context.getUserData().then((user) => {
            console.log(user)
            this.loadStore()
        })



    }



    loadStore = async () => {
        this.setState({ isLoading: true })

        const storeID = this.context.storeID

        await api.getStoreById(storeID).then(store => {
            this.setState({
                store: store.data.data,
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
        const { store, isLoading } = this.state

        return (

            <div className="page-layout">





                <h1>STORE</h1>
                <div className="page-content">

                    {isLoading ? <h2>Loading...</h2> :


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









                    }






                </div>

            </div>


        )
    }
}

export default Store


