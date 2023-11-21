import React from 'react'
import { useParams } from 'react-router-dom'

import fakeData from '../../fakeData'
import Product from '../Product/Product';

const ProductDetail = () => {

    const params = useParams();

    const allProduct = fakeData.find(product => product.key === params.key)
    console.log(allProduct);

  return (
    <div>
        <h1>Your Product Details</h1>
        <Product showAddToCart={false} product={allProduct} />
    </div>
  )
}

export default ProductDetail