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
        this.handleAdressChange = this.handleAdressChange.bind(this)
        this.updateImages = this.updateImages.bind(this)
        this.redirect = this.redirect.bind(this)
        this.displayCreateStore = this.displayCreateStore.bind(this)
        this.connectStoreToUser = this.connectStoreToUser.bind(this)
    }

    componentDidMount = async () => {
        // this.setState({
        //      isLoading: true
        //     })


        await this.context.getUserData().then(() => {
            this.setState({
                // storeID: this.context.storeID,
                userID: this.context.id,
            })
        })




    }



    handleInputChange = (event) => {
        const value = event.target.value;
        const field = event.target.name;

        this.setState({
            [field]: value
        })

    }

    handleAdressChange = (event) => {

        const value = event.target.value;
        const field = event.target.name;
        
        const adress = {...this.state.adress}
        adress[field] = value
        this.setState({adress})

    }


    handleSubmit = async () => {

        // event.preventDefault()

        this.setState({
            isLoading: true,
        });

        // Send new product data 
        //and state.store-id 


        
        const { name, description, logoImg, categories, email, userID, adress } = this.state
        
        const payload = {
            name: name,
            description: description,
            logoImg: logoImg,
            categories: categories,
            email: email,
            owner: userID,
            adress: adress,
            storeID: '',
        }

// create Store
// Then put StoreID to User
        await api.createStore(payload).then((res) => {

            // localStorage.setItem('storage-object', JSON.stringify({token: res.data}))

            // Load something
            const storeID = res.data.id
            alert('Store successfully created')
            // console.log(this.state.images)

             this.connectStoreToUser(userID, storeID)


        }, (err) => {
            console.log(err)
        })

    
    }



    connectStoreToUser = async (userID, storeID) => {



        const payload = {
            storeID: storeID 
        }


        await api.updateUserStoreID(userID, payload).then((res) => {

            // localStorage.setItem('storage-object', JSON.stringify({token: res.data}))

            // Load something
            console.log(res.data)

            alert('Store successfully connected to User')
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
                <h3>{this.state.userID}</h3>
                <div className="add-product-form">

                    <FileUpload refreshFunction={this.updateImages} />
                    <input name="name" type="text" placeholder="Store Name" onChange={this.handleInputChange} />
                    <textarea name="description" type="text" placeholder="Description" onChange={this.handleInputChange} />
                    {/* <input name="categories" type="text" placeholder="Categories" onChange={this.handleInputChange} /> */}
                    <input name="email" type="email" placeholder="Email" onChange={this.handleInputChange} />
                    <input name="street" type="text" placeholder="Street" onChange={this.handleAdressChange} />
                    <input name="zip" type="text" placeholder="Zip" onChange={this.handleAdressChange} />
                    <input name="city" type="text" placeholder="City" onChange={this.handleAdressChange} />

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



