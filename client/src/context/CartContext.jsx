import React from "react";
// import { Redirect } from "react-router-dom";
import api from '../api'

import {
  getFromStorage,
  setInStorage,
  removeFromStorage,
} from "../utils/storage";

const CartContext = React.createContext();

export class CartProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 9,
      shoppingCart: [],
      products: [],
      store: [],

      addToCart: this.addToCart,
      getTotalQuantity: this.getTotalQuantity,
      linkCartToStore: this.linkCartToStore,
      loadCartData: this.loadCartData,

    };



  }


  componentDidMount = () => {
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify([]));
      this.loadCartData()
    }
    this.setState({
      shoppingCart: JSON.parse(localStorage.getItem("cart")),
    });
  };


  addToCart = (product, store) => {

    // this.linkCartToStore(store)

    const alreadyInCart = this.state.shoppingCart.some(
      (element) => element.product === product
    );
    const cloneShoppingCart = Object.assign([], this.state.shoppingCart);
    const productInCart = cloneShoppingCart.find(
      (element) => element.product === product
    );

    if (!this.checkStockAvailability(productInCart, product)) {
      return;
    }

    if (alreadyInCart) {
      alert('already in cart')
      const existingItem = cloneShoppingCart.find(
        (element) => element.product === product
      );
      existingItem.quantity += 1;
    } else {
      const itemInCart = { product: product, quantity: 1, };

      cloneShoppingCart.push(itemInCart);
    }

    this.setState({ shoppingCart: cloneShoppingCart });
    localStorage.setItem("cart", JSON.stringify(cloneShoppingCart));
    alert("Item added to cart");
  };



  linkCartToStore = (storeID) => {

    api.getStoreById(storeID).then((store) => {
      this.setState({ store: store.data.data })
      console.log('linkCartToStore',store)
    }, (err) => {
      console.log(err)
    })

    // TODO
    // IF NOT SAME STORE AS BEFORE ASK IF EMPTY CART

  }


  loadCartData = async () => {

    const shoppingCart = this.state.shoppingCart
    console.log('shoppingCart:', shoppingCart)

    await shoppingCart.map(
        (product) => {
            api.getProductById(product.product).then((dbProduct) => {
             

                const loadedProduct = dbProduct.data.data

                 loadedProduct.cartQuantity = product.quantity
 
                this.setState({
                    products: [...this.state.products, loadedProduct],
                })


                this.linkCartToStore(loadedProduct.storeID)


            }, (err) => {
                console.log(err)
        
            })

        })
        console.log('this state producsts',this.state.products)
}










  checkStockAvailability(productInCart, product) {
    const quantity = productInCart ? productInCart.quantity : 0;
    if (quantity + 1 > product.stock_quantity) {
      alert("This article is out of stock.");
      return false;
    }
    return true;
  }


  getTotalQuantity = () => {
    let totalQuantity = 0;
    let shoppingCart = JSON.parse(localStorage.getItem("cart"));
    if (shoppingCart != null) {
      for (const product of shoppingCart) {
        totalQuantity += product.quantity;
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
      this.setState({ shoppingCart: [] });
    }
    return totalQuantity;
  };




  render() {


    return (
      <CartContext.Provider value={this.state}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
export const Consumer = CartContext.Consumer;