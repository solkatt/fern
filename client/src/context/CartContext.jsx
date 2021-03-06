import React from "react";
// import { Redirect } from "react-router-dom";
import api from '../api'
;

const CartContext = React.createContext();

export class CartProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCart: [],
      store: [],

      addToCart: this.addToCart,
      getTotalQuantity: this.getTotalQuantity,
      linkCartToStore: this.linkCartToStore,
      loadCartStore: this.loadCartStore,
      calculateSum: this.calculateSum,

    };



  }


  componentDidMount = async () => {
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify([]));
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
   
  };






  linkCartToStore = (storeID) => {

    api.getStoreById(storeID).then((store) => {
      this.setState({ store: store.data.data })
 
    }, (err) => {
      console.log(err)
    })

    // TODO
    // IF NOT SAME STORE AS BEFORE ASK IF EMPTY CART

  }

  calculateSum = (products) => {

    
    if(!products) return
    
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
      sum =
        products[i].price *
          products[i].cartQuantity +
        sum;
    }

     return sum;
  };







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