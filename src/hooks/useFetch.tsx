import { useEffect, useState } from 'react';

interface ApiResponse {
  error?: string;
  id?: number;
  name?: string;
  plu?: number;
}

const useFetch = () => {
  const [data, setData] = useState<ApiResponse>({});

  const handleAdd = async (productData: any, endpoint: string) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: productData.name,
        }),
      });
      if (response.ok) {
        const answer = await response.json();
        setData(answer);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDelete = async (id: number, endpoint: string) => {
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const edit = async (id: string, updatedData: string, endpoint: string) => {
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedData,
        }),
      });
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  return {
    data,
    handleAdd,
    handleDelete,
    edit,
  };
};

export default useFetch;
