import React from 'react'
import fakeData from '../../fakeData'

const ManageInventory = () => {

  const handleAddProduct = () => {
    fetch('http://localhost:4000/addProduct', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(fakeData) // 1 ta onClick() er maddhome all fakeData mongoDB te insert kore detase.
    })
  }

  return (
    <div style={{textAlign: 'center'}}>
        <button onClick={handleAddProduct}>Add Product</button>
    </div>
  )
}

export default ManageInventory