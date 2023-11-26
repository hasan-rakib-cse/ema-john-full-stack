import React from 'react'

const ManageInventory = () => {

  const product = {}

  // 1 ta onClick() er maddhome all fakeData mongoDB te insert kore detase.
  const handleAddProduct = () => {
    fetch('http://localhost:4000/addProduct', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(product)
    })
  }

  return (
    <div style={{marginTop: '20px'}}>
      <form action="">
        <p><span>Name</span><input type="text" /></p>
        <p><span>Price</span><input type="text" /></p>
        <p><span>Quantity</span><input type="text" /></p>
        <p><span>Product Image</span><input type="file" /></p>

        <button onClick={handleAddProduct}>Add Product</button>
      </form>
    </div>
  )
}

export default ManageInventory