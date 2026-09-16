import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/createContext';

function Cart() {
    const { cart, removeFromCart, updateQuantity, totalAmount, clearCart } = useContext(CartContext)
    // الشاشة في حالة عدم وجود منتجات
    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <ShoppingBag size={36} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Your Cart is Empty
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                    يبدو أنك لم تقم بطلب أو إضافة أي من منتجاتنا بعد.
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
                        <span className="col-span-3 text-center">Quantity</span>
                        <span className="col-span-3 text-right">Total</span>
                    </div>

                    {cart.map((item) => {
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
                                    <div>
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="font-medium text-gray-800 text-sm hover:text-amber-600 transition"
                                        >
                                            {item.name}
                                        </Link>
                                        <p className="text-xs text-amber-700 font-semibold mt-1">
                                            ${itemPrice}
                                        </p>
                                    </div>
                                </div>

                                {/* التحكم بالكمية */}
                                <div className="sm:col-span-3 flex items-center justify-center gap-3">
                                    <div className="flex items-center border border-gray-200 rounded px-2 py-1 bg-gray-50">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 text-gray-500 hover:text-black transition"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="w-8 text-center text-xs font-bold">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 text-gray-500 hover:text-black transition"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        title="Remove Item"
                                        className="text-gray-400 hover:text-red-500 transition sm:hidden"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                {/* المجموع وحذف المنتج (شاشات كبيرة) */}
                                <div className="sm:col-span-3 flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                    <span className="text-sm font-bold text-gray-900">
                                        ${itemTotal.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        title="Remove Item"
                                        className="hidden sm:block text-gray-400 hover:text-red-500 transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex justify-between items-center pt-4">
                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-amber-600 transition"
                        >
                            <ArrowLeft size={14} /> Continue Shopping
                        </Link>

                        <button
                            onClick={clearCart}
                            className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-700 transition"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>

                {/* ملخص الحساب والإجمالي */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 h-fit space-y-6">
                    <h2 className="text-base font-serif font-bold uppercase tracking-wider text-gray-900 border-b pb-4">
                        Order Summary
                    </h2>

                    <div className="space-y-3 text-xs font-medium text-gray-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-emerald-600 font-bold uppercase">Free</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Tax</span>
                            <span>$0.00</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-sm font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-xl text-amber-700">${totalAmount.toFixed(2)}</span>
                    </div>

                    <button className="w-full bg-black text-white py-4 rounded text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition duration-300 shadow-sm cursor-pointer">
                        Proceed to Checkout
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Cart;