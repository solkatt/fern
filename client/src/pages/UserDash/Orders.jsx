import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/AddProduct.scss'
import '../../style/pages/PageLayout.scss'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext';
import LoadingAnimation from '../../components/LoadingAnimation'

class Orders extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            isLoading: false,

        }


        this.loadStoreOrders = this.loadStoreOrders.bind(this)
        this.displayOrders = this.displayOrders.bind(this)
      

    }


    
    componentDidMount = async () => {
        this.setState({
            isLoading: true
        })

        await this.context.getUserData().then(() => {
            this.loadStoreOrders()
        })
    }


    loadStoreOrders = async () => {
        const { storeID } = this.context

        this.setState({ isLoading: true })

        if (storeID) {
            await api.getOrdersByStore(storeID).then(orders => {
                this.setState({
                    orders: orders.data.data,
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



    displayOrders = (orders) => {
        console.log('Orders:', this.state.orders)


        if (orders.length < 1) {
            return (
                <>
                    <h2>No orders atm</h2>
                </>
            )
        }



        return (

            <>
                {orders.map(order =>
                    <div key={order._id} className="product-card">

                        <h2>Order {order._id}</h2>
                        <h2>Date: {order.createdAt}</h2>
                        <h2>Total: {order.total_price}kr</h2>

{/* 
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
                            {/* <button onClick={() => this.onDeleteProduct(product._id)}>Delete</button>
                            <button onClick={() => this.showProduct(product._id)}>Show this ID</button>

                        </div>  */}
                    </div>
                )}
            </>

        )

    }




    render() {

        const { orders, isLoading } = this.state

        return (

            <div className="page-layout">
                <div className="page-content">
                    <div className="product-grid">



                        {isLoading ? <LoadingAnimation /> : this.displayOrders(orders)}


                    </div>






                </div>

            </div>


        )
    }
}

export default Orders


