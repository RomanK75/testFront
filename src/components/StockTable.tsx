import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
  Button
} from '@mui/material';
import Navbar from './Navbar';

interface Stock {
  id: number;
  plu: number;
  product_name: string;
  store_id: number;
  store_name: string;
  quantity: number;
  order_quantity: number;
}

const StockTable = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filters, setFilters] = useState({
    plu: '',
    store_id: '',
    quantity_from: '',
    quantity_to: '',
    order_quantity_from: '',
    order_quantity_to: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchStocks = async () => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    const response = await fetch(`/api/stock?${queryParams}`);
    const data = await response.json();
    setStocks(data.data || []);
  };

  return (
    <div>
      <Navbar></Navbar>
      <Grid container spacing={2} sx={{ mb: 3, mt: 1 }}>
        <Grid item xs={2}>
          <TextField
            fullWidth
            label="PLU"
            name="plu"
            type="number"
            value={filters.plu}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Store ID"
            name="store_id"
            type="number"
            value={filters.store_id}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Quantity From"
            name="quantity_from"
            type="number"
            value={filters.quantity_from}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Quantity To"
            name="quantity_to"
            type="number"
            value={filters.quantity_to}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Order Quantity From"
            name="order_quantity_from"
            type="number"
            value={filters.order_quantity_from}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Order Quantity To"
            name="order_quantity_to"
            type="number"
            value={filters.order_quantity_to}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={fetchStocks}>
            Apply Filters
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PLU</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Store ID</TableCell>
              <TableCell>Store Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Order Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell>{stock.plu}</TableCell>
                <TableCell>{stock.product_name}</TableCell>
                <TableCell>{stock.store_id}</TableCell>
                <TableCell>{stock.store_name}</TableCell>
                <TableCell>{stock.quantity}</TableCell>
                <TableCell>{stock.order_quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StockTable;
