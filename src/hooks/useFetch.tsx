import { useEffect, useState } from 'react'


interface ApiResponse {
    error?: string;
    plu?: number;
    name?: string;
}

const useFetch = () => {
  const [data, setData] = useState<ApiResponse>({})
  const [currentEndpoint, setCurrentEndpoint] = useState('/api/product')

  const fetchData = async (endpoint: string) => {
    try {
      const response = await fetch(endpoint)
      const result = await response.json()
      setData(result)
      setCurrentEndpoint(endpoint)
      console.log(result)
    } catch (error) {
    }
  }

  const handleAddProduct = async (productData: any) => {
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: productData.name,
        }),
      })
      if (response.ok) {
        const answer = await response.json()
        setData(answer)
      }
      else {
        const errorData = await response.json()
        alert(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const handleDeleteProduct = async (plu: number) => {
    try {
      console.log(plu)
      const response = await fetch(`/api/product/${plu}`, {
        method: 'DELETE',
      })
      // if (response.ok) {
      //   fetchData(currentEndpoint)
      // }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const editProduct = async (plu: string, updatedData: string) => {
    console.log(plu, updatedData)
    try {
      const response = await fetch(`/api/product/${plu}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedData,
        }),
      })
      console.log(response)
      // if (response.ok) {
      //   fetchData(currentEndpoint)
      // }
    } catch (error) {
      console.error('Error editing product:', error)
    }
  }



  return {
    data,
    fetchData,
    handleAddProduct,
    handleDeleteProduct,
    editProduct,
  }

}

export default useFetch