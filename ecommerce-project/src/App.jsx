import './App.css';
import { HomePage } from './Pages/home/HomePage';
import { Routes, Route } from 'react-router';
import { CheckoutPage } from './Pages/chekout/CheckoutPage';
import { OrdersPage } from './Pages/orders/OrdersPage';
import { TrackingPage } from './Pages/TrackingPage';
import { Error } from './Pages/Error';
import { useEffect,useState } from 'react';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState([])
  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data)
      })
  }, [])
  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart}/>} />
        <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
        <Route path='orders' element={<OrdersPage cart={cart}/>} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
