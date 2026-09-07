import { ShoppingBag, Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';


function ProductCard({ product }) {
  const { id, name, price, discount_price, main_image } = product;


  return (
    <div className="group text-center">
      {/* Container للصورة والأيقونات */}
      <div className="bg-gray-100 rounded-md mb-4 overflow-hidden aspect-square flex items-center justify-center relative">
        <img
          src={main_image}
          alt={name}
          className="object-contain group-hover:scale-105 transition duration-300 w-full h-full p-4"
        />

        {/* Hover Action Overlay Icons */}
        <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
          
          {/* Add to Cart Icon */}
          <button
       
            title="Add to Cart"
            className="w-10 h-10 rounded-full bg-white text-gray-800 shadow-md flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          >
            <ShoppingBag size={18} />
          </button>

          {/* Quick View / Product Details Link */}
          <Link
            to={`/product/${id}`}
            title="Quick View"
            className="w-10 h-10 rounded-full bg-white text-gray-800 shadow-md flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          >
            <Search size={18} />
          </Link>

          {/* Wishlist Icon */}
          <button
            title="Add to Wishlist"
            className="w-10 h-10 rounded-full bg-white text-gray-800 shadow-md flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <Link to={`/product/${id}`}>
        <h3 className="font-medium text-sm text-gray-800 tracking-wide hover:text-amber-600 transition-colors">
          {name}
        </h3>
      </Link>

      <div className="mt-2 text-sm font-semibold">
        {discount_price ? (
          <div className="flex justify-center gap-2">
            <span className="line-through text-gray-400">${price}</span>
            <span className="text-amber-600">${discount_price}</span>
          </div>
        ) : (
          <span className="text-gray-900">${price}</span>
        )}
      </div>
    </div>
  );
}

export default ProductCard;