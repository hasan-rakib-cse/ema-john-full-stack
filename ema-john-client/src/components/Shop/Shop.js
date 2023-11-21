import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([])

    useEffect(() => {
      const saveCart = getDatabaseCart();
      const productKeys = Object.keys(saveCart)
      const previousCart = productKeys.map(existingKey => {
        const product = fakeData.find(pd => pd.key === existingKey)
        product.quantity = saveCart[existingKey];
        return product;
      })
      setCart(previousCart)
    }, [])
    

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct]; // jesob item match kortase na segulo sob & je item find hoise setar 1 piece newCart e rakhtasi
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);


        // const newCart = [...cart, product];
        // setCart(newCart);

        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // const count = sameProduct.length;
        // addToDatabaseCart(product.key, count)
    }

    return (

        <div className='twin-container'>
            <Row>
                <Col className="product-container" xs={{ span: 12, order: 2 }} lg={{span: 9, order: 1}}>
                    {
                        products.map(product => <Product addProduct={handleAddProduct} showAddToCart={true} key={product.key} product={product} />)
                    }
                </Col>
                <Col className="cart-container " xs={{ span: 12, order: 1}} lg={{span: 3, order: 2}}>
                    <Cart cart={cart}>
                        <Link style={{textDecoration: 'none'}} to={'/review'}><button className='main-button'>Review Order</button></Link>  
                    </Cart>
                </Col>
            </Row>
        </div>

    );
};

export default Shop;