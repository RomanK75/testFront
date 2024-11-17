import { useEffect, useState } from 'react'
import DataTable from '../components/Tabels'
import useFetch from '../hooks/useFetch'

interface ApiResponse {
  data: any[]
}

const Product = () => {
  const [data, setData] = useState<ApiResponse>({ data: [] })
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const {handleDeleteProduct } = useFetch()

  const fetchData = async () => {
    try {
      let url = '/api/product'
      if (searchQuery) {
        const isNumeric = !isNaN(Number(searchQuery))
        url += `?${isNumeric ? 'plu' : 'name'}=${encodeURIComponent(searchQuery)}`
      }

      const response = await fetch(url)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchQuery(searchTerm)
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by name or PLU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
        {data.data.length > 0 ? (
          <DataTable data={data.data} onDelete={handleDeleteProduct} />
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  )
}

export default Product
