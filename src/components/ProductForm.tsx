import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useLocation, useParams } from 'react-router-dom'


interface ProductFormData {
  name: string
}

interface ProductFormProps {
  initialData?: ProductFormData
  mode?: 'add' | 'edit'
}


const ProductForm: React.FC<ProductFormProps> = () => {
  const { plu } = useParams<{ plu?: string }>()
  const location = useLocation()
  const { initialData, mode } = location.state || { initialData: null, mode: 'add' }

  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: ''
    }
  )
  const { handleAddProduct,editProduct,data} = useFetch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'add') {
      handleAddProduct(formData)
      setFormData({
        name: ''
      })
    } else if (mode === 'edit' && plu) {
      editProduct(plu ,formData.name)
    }
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Product Name"
      />
      <button type="submit">{mode === 'add' ? 'Add Product' : 'Update Product'}</button>
    </form>
    <div>
      {data.error ? (
        <p style={{ color: 'red' }}>{data.error}</p>
      ) : (
        <div>
          <p>PLU: {data.plu}</p>
          <p>Name: {data.name}</p>
        </div>
      )}
    </div>
    </div>
    
  )
}

export default ProductForm