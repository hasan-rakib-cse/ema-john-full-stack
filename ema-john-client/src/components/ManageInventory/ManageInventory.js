import React from 'react'
import fakeData from '../../fakeData'

const ManageInventory = () => {

  // 1 ta onClick() er maddhome all fakeData mongoDB te insert kore detase.
  const handleAddProduct = () => {
    fetch('http://localhost:4000/addProduct', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(fakeData)
    })
  }

  return (
    <div style={{textAlign: 'center'}}>
        <button onClick={handleAddProduct}>Add Product</button>
    </div>
  )
}

export default ManageInventory