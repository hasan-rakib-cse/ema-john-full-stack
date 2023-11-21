import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearLocalShoppingCart, getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager'
import fakeData from '../../fakeData'
import ReviewItem from '../ReviewItem/ReviewItem'
import Cart from '../Cart/Cart'
import happyImage from '../../images/giphy.gif'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // cart
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);

    // const cartProducts = productKeys.map(key => saveCart[key]) // array er moddde dekhabe koyta product kotobar add hoise
    const cartProducts = productKeys.map(key => {
      const product = fakeData.find(pd => pd.key === key)
      product.quantity = saveCart[key]; // object er moddhe key pass korle se object er value paowa jay.
      return product;
    })
    setCart(cartProducts);
  
  }, [])

  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter(pd => pd.key !== productKey)
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  }

  const handleProceedCheckout = () => {
    // setCart([]);
    // setOrderPlaced(true)
    // clearLocalShoppingCart()
    navigate('/shipment');
  }
  
  let thankYou;
  if(orderPlaced) {
    thankYou = <img src={happyImage} alt="" />
  } 
  return (
    <div className='twin-container'>
        <Row>
            <Col className="product-container" xs={{ span: 12, order: 2 }} lg={{span: 9, order: 1}}>
              {cart.map(pd => <ReviewItem key={pd.key} product={pd} removeProduct={handleRemoveProduct} />)}
              { thankYou }
            </Col>
            <Col className="cart-container " xs={{ span: 12, order: 1}} lg={{span: 3, order: 2}}>
              <Cart cart={cart} >
                <button className='main-button' onClick={handleProceedCheckout}>Proceed Checkout</button>
              </Cart>  
            </Col>
        </Row>
    </div>
  )
}

export default Review