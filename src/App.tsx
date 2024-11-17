import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ListOfData from './pages/ListOfData';
import ProductForm from './components/ProductForm';
import Shop from './pages/Shop';

type Props = {}

const App = (props: Props) => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<ListOfData apiUrl='/api/product'/>}></Route>
        <Route path='/product' element={<ProductForm mode='add' />}></Route>
        <Route path='/product/:plu' element={<ProductForm mode='edit'/>}></Route>
        <Route path='/shop' element={<ProductForm mode='add' />}></Route>
        <Route path='/shops' element={<ListOfData apiUrl='/api/shop'/>}></Route>
        <Route path='/shop/:id' element={<Shop id={1} name='Shop number 1'/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App