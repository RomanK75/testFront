import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ListOfData from './pages/ListOfData';
import FormData from './components/ProductForm';
import Shop from './pages/Shop';
import StockTable from './components/StockTable';

type Props = {}

const App = (props: Props) => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<ListOfData apiUrl='/api/product'/>}></Route>
        <Route path='/product' element={<FormData mode='add' />}></Route>
        <Route path='/product/:plu' element={<FormData mode='edit'/>}></Route>
        <Route path='/shop' element={<FormData mode='add' />}></Route>
        <Route path='/shops' element={<ListOfData apiUrl='/api/shop'/>}></Route>
        <Route path='/shop/:id' element={<Shop />}></Route>
        <Route path='/stock' element={<StockTable />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App