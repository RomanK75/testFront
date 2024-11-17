import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import ProductForm from './components/ProductForm';

type Props = {}

const App = (props: Props) => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Product />}></Route>
        <Route path='/product' element={<ProductForm mode='add' />}></Route>
        <Route path='/product/:plu' element={<ProductForm mode='edit'/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App