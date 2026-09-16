import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { CartContext } from '../context/createContext';
import { useContext } from 'react';

function Wishlist() {
    const { wishlist } = useContext(CartContext)
    // الشاشة في حالة عدم وجود منتجات
    if (wishlist.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <ShoppingBag size={36} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Your favorite is Empty
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                    يبدو أنك لم تقم بإضافة أي من منتجاتنا بعد.
                </p>
                <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition duration-300"
                >
                    <span>تصفح المنتجات الآن</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 uppercase tracking-widest text-center md:text-left">
                Shopping Cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* قائمة المنتجات المضافة */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="hidden sm:grid grid-cols-12 text-xs font-bold uppercase tracking-wider text-gray-400 border-b pb-3">
                        <span className="col-span-6">Product</span>
                        <span className="col-span-3 text-right">Total</span>
                    </div>

                    {wishlist.map((item) => {
                        const itemPrice = item.discount_price || item.price;
                        const itemTotal = itemPrice * item.quantity;

                        return (
                            <div
                                key={item.id}
                                className="flex flex-col sm:grid sm:grid-cols-12 items-center gap-4 border-b border-gray-100 pb-6 pt-2"
                            >
                                {/* معلومات المنتج والصورة */}
                                <div className="sm:col-span-6 flex items-center gap-4 w-full">
                                    <div className="w-20 h-20 bg-gray-50 rounded border border-gray-100 p-2 flex-shrink-0">
                                        <img
                                            src={item.main_image}
                                            alt={item.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                                {/* المجموع وحذف المنتج (شاشات كبيرة) */}
                                <div className="sm:col-span-3 flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                    <span className="text-sm font-bold text-gray-900">
                                        ${itemTotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Wishlist;