import React, { Component } from 'react'
import api from '../../api'


class MoviesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllProducts().then(products => {
            this.setState({
                products: products.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { products } = this.state
        console.log('TCL: MoviesList -> render -> movies', products)

   

        return (
       <>
  


<ul>
{ products.map(product=> <li>
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <h5>{product.price}</h5></li>)}
</ul>
</>
        )
    }
}

export default MoviesList


