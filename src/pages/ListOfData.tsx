import { useEffect, useState } from 'react';
import DataTable from '../components/Tabels';
import useFetch from '../hooks/useFetch';
import Navbar from '../components/Navbar';

interface ApiResponse {
  data: any[];
}
type Props = {
  apiUrl: string;
};

const ListOfData = (props: Props) => {
  const [data, setData] = useState<ApiResponse>({ data: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { handleDelete } = useFetch();

  const fetchData = async () => {
    try {
      let url = props.apiUrl;
      const idOrPlu = url.startsWith('/api/product') ? 'plu' : 'id';
      if (searchQuery) {
        const isNumeric = !isNaN(Number(searchQuery));
        url += `?${isNumeric ? idOrPlu : 'name'}=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, props.apiUrl]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by name or ID/PLU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
        {data.data.length > 0 ? (
          <DataTable
            data={data.data}
            onDelete={handleDelete}
            apiUrl={props.apiUrl}
          />
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
};

export default ListOfData;
