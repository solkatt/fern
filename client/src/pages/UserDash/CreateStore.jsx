import React, { Component } from 'react'
import api from '../../api'
import '../../style/pages/Products.scss'
import '../../style/pages/PageLayout.scss'
import UserContext from '../../context/UserContext';
import FileUpload from '../../utils/FileUploadStore'
class CreateStore extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {
            userID: '',
            name: '',
            description: '',
            logoImg: '',
            email: '',
            categories: [],
            owner: '',
            adress: {
                street: '',
                zip: '',
                city: '',
            },

            isLoading: false,
        }


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.updateImages = this.updateImages.bind(this)
        this.redirect = this.redirect.bind(this)
        this.displayCreateStore = this.displayCreateStore.bind(this)
    }

    componentDidMount = () => {
        // this.setState({
        //      isLoading: true
        //     })


        this.setState({
            // storeID: this.context.storeID,
            userID: this.context.id,
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



        const { name, description, logoImg, categories, email, owner, userID, adress } = this.state

        const payload = {
            name: name,
            description: description,
            logoImg: logoImg,
            categories: categories,
            email: email,
            owner: userID,
        }

// create Store
// Then put StoreID to User
        await api.addProduct(payload).then((res) => {

            // localStorage.setItem('storage-object', JSON.stringify({token: res.data}))

            // Load something

            alert('Product successfully uploaded')
            console.log(this.state.images)
            this.props.history.push('/')


        }, (err) => {
            console.log(err)
        })



    }

    redirect = () => {
        this.props.history.push('/store')
    }


    updateImages = (newImages) => {

        // console.log(newImages)
        this.setState({
            images: newImages
        })
    }



    displayCreateStore = () => {

        return (

            <>
                <h1>CREATE STORE</h1>
                <div className="add-product-form">

                    <FileUpload refreshFunction={this.updateImages} />
                    <input name="name" type="text" placeholder="Product Name" onChange={this.handleInputChange} />
                    <textarea name="description" type="text" placeholder="Description" onChange={this.handleInputChange} />
                    <input name="categories" type="text" placeholder="Categories" onChange={this.handleInputChange} />
                    <input name="price" type="number" placeholder="Price" onChange={this.handleInputChange} />
                    <input name="stock_quantity" type="number" placeholder="Stock Quantity" onChange={this.handleInputChange} />
                    <button type="submit" onClick={this.handleSubmit}>Add Product</button>
                </div>
            </>
        )


    }



    render() {
        const { storeID } = this.context




        return (





            <div className="page-layout">
                <div className="page-content">

                    {storeID ? this.redirect() : this.displayCreateStore()}




                </div>
            </div>











        )
    }
}

export default CreateStore



