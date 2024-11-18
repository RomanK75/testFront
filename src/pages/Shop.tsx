import React, { useEffect, useState } from 'react'
import { useFetch }  from '../hooks/useFetchStock'
import { useParams, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'

interface StockFormData {
  product_id: number
  quantity: number
  order_quantity: number
}

const Shop = () => {
  const { id } = useParams()
  const { name } = useLocation().state

  console.log(id, name)

  const [formData, setFormData] = useState<StockFormData>({
    product_id: 0,
    quantity: 0,
    order_quantity: 0
  })
  
  const { products, error, handleAdd, fetchProducts } = useFetch()
  useEffect(() => {
    fetchProducts()
  }, [])

  const handleProductSelect = async (productId: number) => {
    try {
      const response = await fetch(`/api/stock/${id}/${productId}`)
      const stockData = await response.json()
      
      if (stockData) {
        setFormData({
          product_id: productId,
          quantity: stockData.quantity,
          order_quantity: stockData.order_quantity
        })
      } else {
        setFormData({
          product_id: productId,
          quantity: 0,
          order_quantity: 0
        })
      }
    } catch (error) {
      console.error('Error fetching stock data:', error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const stockData = {
      ...formData,
      store_id: id
    }
    handleAdd(stockData, '/api/stock')
  }


  return (
    <div>
      <Navbar></Navbar>
      <h2>Shop: {name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Product:</label>
          <select
            value={formData.product_id}
            onChange={(e) => handleProductSelect(Number(e.target.value))}
            required
          >
          <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.plu} value={product.plu}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Quantity in Stock:</label>
          <input
            type="number"
            min="0"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
            required
          />
        </div>

        <div>
          <label>Order Quantity:</label>
          <input
            type="number"
            min="0"
            value={formData.order_quantity}
            onChange={(e) => setFormData({...formData, order_quantity: Number(e.target.value)})}
            required
          />
        </div>

        <button type="submit">Add/Update Stock</button>
      </form>
    </div>
  )
}

export default Shop
