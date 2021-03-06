import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/Products.scss'
import '../../style/pages/PageLayout.scss'
import UserContext from '../../context/UserContext';
import FileUpload from '../../utils/FileUpload'
import '../../style/Common.scss'


class AddProduct extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {
            writer: '',
            name: '',
            description: '',
            images: [],
            price: 0,
            stock_quantity: 0,
            categories: [],
            storeID: '',
            isLoading: false,
        }


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.updateImages= this.updateImages.bind(this)
    }

    componentDidMount = () => {
        // this.setState({
        //      isLoading: true
        //     })


        
        this.setState({
            storeID: this.context.storeID,
            writer: this.context.id,
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

        // event.preventDefault()

        this.setState({
            isLoading: true,
        });

        // Send new product data 
        //and state.store-id 



        const { name, description, images, categories, price, stock_quantity, storeID, writer } = this.state

        const payload = {
            writer: writer,
            name: name,
            description: description,
            images: images,
            categories: categories,
            price: price,
            stock_quantity: stock_quantity,
            storeID: storeID,

        }


        await api.addProduct(payload).then((res) => {

            // localStorage.setItem('storage-object', JSON.stringify({token: res.data}))

            // Load something

            alert('Product successfully uploaded')
            console.log(this.state.images)
            this.props.history.push('/products/all')
    

        }, (err) => {
            console.log(err)
        })



    }


     updateImages = (newImages) => {

        // console.log(newImages)
        this.setState({
            images: newImages
        })
    }




    render() {
        // const { products } = this.state

        return (
            <div className="page-layout">
                <div className="page-content">
                <h2 className='page-title'>add product</h2>


                 <div className='add-product-container'>

                    <FileUpload refreshFunction={this.updateImages} />
                    <div className="add-product-form">

                        <input name="name" className='common-input' type="text" placeholder="Product Name" onChange={this.handleInputChange} />
                        <textarea name="description" className='common-input' type="text" placeholder="Description" onChange={this.handleInputChange} />
                        {/* <input name="categories" className='common-input' type="text" placeholder="Categories" onChange={this.handleInputChange} /> */}
                        <input name="price" className='common-input' type="number" placeholder="Price" onChange={this.handleInputChange} />
                        <input name="stock_quantity" className='common-input' type="number" placeholder="Stock Quantity" onChange={this.handleInputChange} />
                        <button type="submit" className='common-button' onClick={this.handleSubmit}>Add Product</button>
                    </div>
                 </div>




                </div>
            </div>




            
                





        )
    }
}

export default AddProduct



