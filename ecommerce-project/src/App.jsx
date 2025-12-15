import './App.css';
import { HomePage } from './Pages/HomePage';
import {Routes, Route} from 'react-router'
function App() {
  return (
    <>
    <Routes>
      <Route index element = {<HomePage />} />
      <Route path = "checkout" element = {<div>Hello checkout</div>} />
    </Routes>
    </>
  )
}

export default App
