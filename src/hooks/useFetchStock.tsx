import { useState } from 'react';

interface Product {
  plu: number;
  name: string;
}

interface FetchState {
  products: Product[];
  error: string | null;
}

export const useFetch = () => {
  const [fetchState, setFetchState] = useState<FetchState>({
    products: [],
    error: null,
  });

  const handleAdd = async (formData: any, url: string) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setFetchState((prev) => ({ ...prev, error: null }));
    } catch (error) {
      setFetchState((prev) => ({ ...prev, error: 'Failed to add data' }));
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/product');
      const result = await response.json();
      const products = result.data;
      setFetchState({ products, error: null });
    } catch (error) {
      setFetchState((prev) => ({ ...prev, error: 'Failed to fetch products' }));
    }
  };

  return {
    products: fetchState.products,
    error: fetchState.error,
    handleAdd,
    fetchProducts,
  };
};
