import { Search, User, Heart, ShoppingBag, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/createContext';

const Navbar = () => {
  const navigate = useNavigate();
  // قراءة بيانات المستخدم المسجل من الـ LocalStorage
  const user = JSON.parse(localStorage.getItem('user'));
const {cart} = useContext(CartContext)
const itemsCount = cart.reduce((total,item) => total + item.quantity, 0) 
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
      {/* Top Notice Bar */}
      <div className="bg-black text-white text-xs text-center py-2 font-light">
        FREE SHIPPING ON ORDERS OVER $100
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-serif tracking-widest font-bold">
          Wattie<span className="text-amber-600">.</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide uppercase">
          <Link to="/" className="hover:text-amber-600 transition">Home</Link>
          <a href="/shop" className="hover:text-amber-600 transition flex items-center gap-1">
            Shop <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded uppercase">New</span>
          </a>
          <a href="#" className="hover:text-amber-600 transition">Featured</a>
          <a href="#" className="hover:text-amber-600 transition">Pages</a>
          <a href="#" className="hover:text-amber-600 transition">Blogs</a>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-5 text-gray-700">
          <button className="hover:text-black transition"><Search size={20} /></button>
          
          {/* User Icon & Logout Status */}
{user ? (
  <div className="flex items-center gap-3">
    <Link 
      to="/profile" 
      className="text-xs font-semibold uppercase text-amber-600 hover:underline"
    >
      Hi, {user.name}
    </Link>
    <button 
      onClick={handleLogout} 
      title="Logout" 
      className="hover:text-red-600 transition"
    >
      <LogOut size={18} />
    </button>
  </div>
) : (
  <Link to="/login" title="Sign In" className="hover:text-black transition">
    <User size={20} />
  </Link>
)}

          <Link className="hover:text-black transition"  to={'/wishlist'}><Heart size={20}/></Link>
          <Link className="hover:text-black transition relative" to={'/cart'}>
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">{itemsCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;