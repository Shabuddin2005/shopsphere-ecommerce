
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Products from './Pages/Products';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Cart from './Pages/Cart';
import './App.css';
import Orders from './Pages/Orders';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/cart" element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }/>
  <Route path="/orders" element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }/>
</Routes>

<Footer />
    </>
  );
}

export default App;
