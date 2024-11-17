import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

type DataTableProps = {
  data: any[]
  onDelete: (plu: number, endpoint: string) => void
}

const DataTable: React.FC<DataTableProps> = ({ data, onDelete }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>
  }
  const navigate = useNavigate()

  const handleEdit = (item: any) => {
    navigate(`/product/${item.plu}`, { state: { initialData: item, mode: 'edit' } })
  }

  const columns = [...Object.keys(data[0]), 'Actions']

  const formatCellValue = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value)
    }
    return value
  }

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th 
              key={column}
              style={{ 
                border: '1px solid #ddd',
                padding: '8px',
                backgroundColor: '#f4f4f4'
              }}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.keys(data[0]).map((column) => (
              <td 
                key={`${index}-${column}`}
                style={{ 
                  border: '1px solid #ddd',
                  padding: '8px'
                }}
              >
                {formatCellValue(item[column])}
              </td>
            ))}
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              <button 
                onClick={() => handleEdit(item)}
                style={{ marginRight: '8px' }}
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(item.plu, '/api/product')}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
