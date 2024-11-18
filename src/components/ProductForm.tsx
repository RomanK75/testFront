import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useLocation, useParams } from 'react-router-dom'
import Navbar from './Navbar'


interface FormData {
  name: string
}

interface FormProps {
  initialData?: FormData
  mode?: 'add' | 'edit'
}


const FormData: React.FC<FormProps> = () => {
  const { plu } = useParams<{ plu?: string }>()
  const { id } = useParams<{ id?: string }>()
  const location = useLocation()
  const { initialData, mode } = location.state || { initialData: null, mode: 'add' }
  console.log(location.pathname)

  const [formData, setFormData] = useState<FormData>(
    initialData || {
      name: ''
    }
  )
  const { handleAdd,edit,data} = useFetch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.pathname.startsWith('/product')) {
    if (mode === 'add') {
      handleAdd(formData, '/api/product')
      setFormData({
        name: ''
      })
    } else if (mode === 'edit' && plu) {
      edit(plu ,formData.name, '/api/product')
    }
  } else {
    console.log(`SHOP ADD`)
    if (mode === 'add') {
      handleAdd(formData, '/api/shop')
      setFormData({
        name: ''
      })
    } else if (mode === 'edit' && id) {
      edit(id ,formData.name, '/api/shop')
    }
  }
  }

  return (
    <div>
    <Navbar />
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder={location.pathname === '/product' ? 'Product Name' : 'Shop Name'}
      />
      <button type="submit">
        {location.pathname.startsWith('/product') ? (
          mode === 'add' ? 'Add Product' : 'Update Product'
        ) : (
          mode === 'add' ? 'Add Shop' : 'Update Shop'
        )}
      </button>
    </form>
    <div>
      {data.error ? (
        <p style={{ color: 'red' }}>{data.error}</p>
      ) : (location.pathname.startsWith('/product') ? (
        <div>
          <h3>PRODUCT PLU: {data.plu}</h3>
          <h3>PRODUCT NAME: {data.name}</h3>
        </div>
      ):(
        <div>
          <h3>SHOP ID: {data.id}</h3>
          <h3>SHOP NAME: {data.name}</h3>
        </div>
      ))}
    </div>
  </div>
    
  )
}

export default FormData