import React from 'react'
import ReactDOM from 'react-dom'

import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const Product = (props) => {
    const {img, name, seller, price, stock, key} = props.product;
  return (
    <div className='product'>
        <div className='product-image'>
            <img src={img} alt={name.slice(0, 20) + '...'} />
        </div>
        <div className='product-details'>
            <h4 className='product-name'><Link to={'/product/'+key}>{name}</Link></h4>
            <p><small>by: {seller}</small></p>
            <p>${price}</p>
            <p><small>Only {stock} left in stock - order soon</small></p>
            {props.showAddToCart &&
                <button className='main-button' onClick={() => props.addProduct(props.product)}>
                    {/* arrow function use korse jate automatically execute na hoye jay */}
                    <FontAwesomeIcon icon={faCartShopping} /> add to cart
                </button>
            }

        </div>
    </div>
  )
}

export default Product