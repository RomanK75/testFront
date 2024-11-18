import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ListOfData from './pages/ListOfData';
import FormData from './components/ProductForm';
import Shop from './pages/Shop';
import StockTable from './components/StockTable';
import { TableConfig } from './components/StockTable';

type Props = {};

const App = (props: Props) => {
  const HistoryTableConfig: TableConfig = {
    baseUrl: 'http://localhost:3002',
    endpoint: '/api/history',
    filters: [
      { name: 'plu', label: 'PLU', type: 'number' },
      { name: 'shop_id', label: 'Shop ID', type: 'number' },
      { name: 'date_from', label: 'Date From', type: 'date' },
      { name: 'date_to', label: 'Date To', type: 'date' },
      { name: 'action', label: 'Action', type: 'text' },
    ],
    columns: [
      { key: 'plu', label: 'PLU' },
      { key: 'shop_id', label: 'Shop ID' },
      { key: 'timestamp', label: 'Timestamp' },
      { key: 'action', label: 'Action' },
    ],
  };
  const StockTableConfig: TableConfig = {
    baseUrl: 'http://localhost:3000',
    endpoint: '/api/stock',
    filters: [
      { name: 'plu', label: 'PLU', type: 'number' },
      { name: 'store_id', label: 'Store ID', type: 'number' },
      { name: 'quantity_from', label: 'Quantity From', type: 'number' },
      { name: 'quantity_to', label: 'Quantity To', type: 'number' },
      {
        name: 'order_quantity_from',
        label: 'Order Quantity From',
        type: 'number',
      },
      { name: 'order_quantity_to', label: 'Order Quantity To', type: 'number' },
    ],
    columns: [
      { key: 'plu', label: 'PLU' },
      { key: 'product_name', label: 'Product Name' },
      { key: 'store_id', label: 'Store ID' },
      { key: 'store_name', label: 'Store Name' },
      { key: 'quantity', label: 'Quantity' },
      { key: 'order_quantity', label: 'Order Quantity' },
    ],
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/products"
          element={<ListOfData apiUrl="/api/product" />}
        ></Route>
        <Route path="/product" element={<FormData mode="add" />}></Route>
        <Route path="/product/:plu" element={<FormData mode="edit" />}></Route>
        <Route path="/shop" element={<FormData mode="add" />}></Route>
        <Route
          path="/shops"
          element={<ListOfData apiUrl="/api/shop" />}
        ></Route>
        <Route path="/shop/:id" element={<Shop />}></Route>
        <Route
          path="/stock"
          element={<StockTable config={StockTableConfig} />}
        ></Route>
        <Route
          path="/history"
          element={<StockTable config={HistoryTableConfig} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
