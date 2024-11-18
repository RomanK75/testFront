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
  Button,
  Pagination,
} from '@mui/material';
import Navbar from './Navbar';

export interface TableConfig {
  endpoint: string;
  baseUrl: string;
  filters: FilterConfig[];
  columns: ColumnConfig[];
}

interface FilterConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date';
}

interface ColumnConfig {
  key: string;
  label: string;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
}

const DataTable = ({ config }: { config: TableConfig }) => {
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    const queryParams = new URLSearchParams({
      page: pagination.page.toString(),
      limit: pagination.limit.toString(),
    });

    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    const response = await fetch(`${config.endpoint}?${queryParams}`);
    const result = await response.json();
    setData(result.data || []);
    if (result.pagination) {
      setPagination(result.pagination);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  useEffect(() => {
    fetchData();
  }, [pagination.page]);

  return (
    <div>
      <Navbar />
      <Grid container spacing={2} sx={{ mb: 3, mt: 1 }}>
        {config.filters.map((filter) => (
          <Grid item xs={2} key={filter.name}>
            <TextField
              fullWidth
              label={filter.label}
              name={filter.name}
              type={filter.type}
              value={filters[filter.name] || ''}
              onChange={handleFilterChange}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" onClick={fetchData}>
            Apply Filters
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {config.columns.map((column) => (
                <TableCell key={column.key}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {config.columns.map((column) => (
                  <TableCell key={column.key}>{row[column.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(pagination.total / pagination.limit)}
        page={pagination.page}
        onChange={handlePageChange}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default DataTable;
