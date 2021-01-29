import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/Orders.scss'
import '../../style/pages/PageLayout.scss'
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
                    <div key={order._id} className="order-card">

                        <h2 className='order-id'>Order: {order._id}</h2>
                        <h2 className='order-info'>Date: {order.createdAt}</h2>
                        <h2 className='order-info'>Total: {order.total_price}kr</h2>
                        <h2 className='order-info'>Shipped: {order.sent ? 'Yes' : 'No' }</h2>
                        


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
                    <h2 className='page-title'>Orders</h2>
                    <div className="order-grid">



                        {isLoading ? <LoadingAnimation /> : this.displayOrders(orders)}


                    </div>






                </div>

            </div>


        )
    }
}

export default Orders


