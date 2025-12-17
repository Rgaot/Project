import './App.css';
import { HomePage } from './Pages/home/HomePage';
import { Routes, Route, useSearchParams } from 'react-router';
import { CheckoutPage } from './Pages/chekout/CheckoutPage';
import { OrdersPage } from './Pages/orders/OrdersPage';
import { TrackingPage } from './Pages/TrackingPage';
import { Error } from './Pages/Error';
import { useEffect,useState } from 'react';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async() => {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data)
    };
  useEffect(() => {
    loadCart();
  }, []);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} search={search} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
        <Route path='orders' element={<OrdersPage cart={cart} loadCart={loadCart} />} />
        <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
        <Route path='*' element={<Error cart={cart} />} />
      </Routes>
    </>
  )
}

export default App
