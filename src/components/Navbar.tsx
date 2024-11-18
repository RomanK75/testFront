import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/shops"
            color="inherit"
          >
            Shop List
          </Button>
          <Button
            component={Link}
            to="/products"
            color="inherit"
          >
            Products List
          </Button>
          <Button
            component={Link}
            to="/product"
            color="inherit"
          >
            Add Product
          </Button>
          <Button
            component={Link}
            to="/shop"
            color="inherit"
          >
            Add Shop
          </Button>
          <Button
            component={Link}
            to="/stock"
            color="inherit"
          >
            Stock
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
