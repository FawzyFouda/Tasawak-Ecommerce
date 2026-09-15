import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CookieBar from './components/CookieBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Shops from './pages/Shops';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col justify-between">
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          {/* <Route path="/profile" element={<ProtectedRoute><Cart /></ProtectedRoute>} /> */}
          <Route path="/shop" element={<Shops />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        </Routes>
      </div>
      <CookieBar />
    </div>
  );
}

export default App;