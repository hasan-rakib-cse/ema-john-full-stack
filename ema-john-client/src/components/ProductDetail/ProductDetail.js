import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Product from '../Product/Product';

const ProductDetail = () => {
    const params = useParams();
    const productKey = params.key

    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      fetch(`http://localhost:4000/product/${productKey}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      setIsLoading(false)
  
    }, [productKey]);

    // const allProduct = fakeData.find(product => product.key === productKey.key)
    // console.log(allProduct);

  return (
    <div>
        <h1>Your Product Details</h1>
        {isLoading && <p>Loading......</p>}
        <Product showAddToCart={false} product={product} />
    </div>
  )
}

export default ProductDetail