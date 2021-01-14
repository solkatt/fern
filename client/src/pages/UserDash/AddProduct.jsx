import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/Products.scss'
import '../../style/pages/PageLayout.scss'
import UserContext from '../../context/UserContext';

class AddProduct extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            image: '',
            price: 0,
            stock_quantity: 0,
            categories: [],
            storeID: '',
            isLoading: false,
        }


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount = () => {
        // this.setState({
        //      isLoading: true
        //     })


        
        this.setState({
            storeID: this.context.storeID
        })





    }



    handleInputChange = (event) => {
        const value = event.target.value;
        const field = event.target.name;
        this.setState({
            [field]: value
        })


    }


    handleSubmit = async () => {
        this.setState({
            isLoading: true,
        });

        // Send new product data 
        //and state.store-id 



        const { name, description, image, categories, price, stock_quantity, storeID } = this.state

        const payload = {
            name: name,
            description: description,
            image: image,
            categories: categories,
            price: price,
            stock_quantity: stock_quantity,
            storeID: storeID,

        }

        await api.addProduct(payload).then((res) => {

            // localStorage.setItem('storage-object', JSON.stringify({token: res.data}))

            console.log(res.data);

        }, (err) => {
            console.log(err)
        })



    }





    render() {
        // const { products } = this.state

        return (
            <div className="page-layout">
                <div className="page-content">


                    <h2>
                        {this.context.storeID}
                    </h2>
                    <div className="add-product-form">
                        <input name="name" type="text" placeholder="Product Name" onChange={this.handleInputChange} />
                        <input name="description" type="text" placeholder="Description" onChange={this.handleInputChange} />
                        <input name="image" type="text" placeholder="Image" onChange={this.handleInputChange} />
                        <input name="categories" type="text" placeholder="Categories" onChange={this.handleInputChange} />
                        <input name="price" type="number" placeholder="Price" onChange={this.handleInputChange} />
                        <input name="stock_quantity" type="number" placeholder="Stock Quantity" onChange={this.handleInputChange} />
                        <button type="submit" onClick={this.handleSubmit}>Add Product</button>
                    </div>





                </div>
            </div>











        )
    }
}

export default AddProduct



