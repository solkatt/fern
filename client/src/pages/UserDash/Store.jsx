import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/Store.scss'
import '../../style/pages/PageLayout.scss'
import UserContext from '../../context/UserContext';
// import { set } from 'mongoose';
import { Link } from 'react-router-dom'
import LoadingAnimation from '../../components/LoadingAnimation'


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
        this.displayCreateStore = this.displayCreateStore.bind(this)

    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await this.context.getUserData().then(() => {
            this.loadStore()
        })

    }


    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.value !== this.state.value) {
    //         this.loadProducts()
    //     }
    // }


    loadStore = async () => {

        this.setState({ isLoading: true })
        const storeID = this.context.storeID

        if (storeID) {

            await api.getStoreById(storeID).then(store => {
                this.setState({
                    store: store.data.data,
                    isLoading: false,
                })
            }, (err) => {
                console.log(err)
                this.setState({
                    isLoading: false,
                })
            })
        } else {
            this.setState({
                isLoading: false,
            })
        }

    }

    displayStore = (store) => {

        const { storeID } = this.context

        if (!storeID || !store) return this.displayCreateStore()

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


    handleSetUpStore = () => {


    }

    



    displayCreateStore = () => {
        // const storeID = this.context.storeID

        return (
            <div className="create-store">
                <h1 className='no-store-title'>No store here at the moment</h1>
                <button className='setup-store-button common-button' onClick={this.handleSetUpStore}>
                <Link className='setup-text' to={`/store/create`}>
                    Set one up!
                    </Link>
                </button>
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
        // const { storeID } = this.context

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


                <div className="page-content">


                    {isLoading ? <LoadingAnimation /> : this.displayStore(store)}

                    {/* <h3>{this.context.data}</h3> */}
                    {/* <button onClick={this.showProps}>Load Store</button> */}


                </div>




            </div>


        )
    }
}

export default Store


