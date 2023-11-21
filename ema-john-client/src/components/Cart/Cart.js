import React from 'react'
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart
    // console.log(cart)
    
    // one way to add total price
    const total = cart.reduce((totalSum, element) => totalSum + element.price*element.quantity, 0);
    // reduce korte chaile 2 ta jinis pass korte hoy
    // 1. ()    -> callback function    -> akhane 2 ta parameter thakbe
                                        // i) totalSum   -> jer moddhe initial value rekhe sum korte thakbe
                                        // ii) element  -> sob gulo element
    // 2. 0     -> total er initial value 0
    // element.price    -> totalSum er sathe protita element er je property (price) sum korbo.


    // another way to add total price
    // let total = 0;
    // for(let i = 0; i < cart.length; i++) {
    //     const product = cart[i];
    //     total = total + product.price;
    // }

    let shipping = 0
    if(total > 35) { shipping = 0; }
    else if(total > 15) { shipping = 4.99; }
    else if(total > 0) { shipping = 12.99; }

    // fixed 2 decimil point and convert to float
    const formatNumber = (number) => {
        const precision = number.toFixed(2);
        return parseFloat(precision);
    }

    const tax = formatNumber(total / 10);

    let productPrice = formatNumber(total);
    let grandTotal = formatNumber(total + shipping + tax);

    

  return (
    <div className='cart-column'>
        <h4>Order Summary</h4>
        <p>Items Ordered: {cart.length}</p>
        <p>Product Price: {productPrice}</p>
        <p><small>Shipping Cost: {shipping}</small></p>
        <p><small>Tax + Vat: {tax}</small></p>
        <p>Total Price: {grandTotal}</p>
        {
          props.children
        }
    </div>
  )
}

export default Cart


