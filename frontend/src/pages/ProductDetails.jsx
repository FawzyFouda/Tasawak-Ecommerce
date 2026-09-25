import { useContext, useState } from 'react';
import { ShoppingBag, Heart, Share2, Star, Truck, ShieldCheck, RefreshCw, Plus, Minus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { CartContext } from '../context/createContext';

function ProductDetails() {
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const { id } = useParams()
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    const { addToCart, updateQuantity, cart } = useContext(CartContext);
    useEffect(() => {
        const getProduct = async () => {
            const response = await axios.get(
                `${baseUrl}/product/${id}`
            );
            setProduct(response.data.product[0])
        };
        getProduct();
    }, []);
    useEffect(() => {
        const handleQuantityCart = () => {
            updateQuantity(product.id, quantity)
        };
        handleQuantityCart()
    }, [quantity])
    const existingItem = cart.some(item => item.id === product.id);


    // في حال لم تتوفر بيانات المنتج بعد
    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center font-serif text-gray-500">
                جاري تحميل تفاصيل المنتج...
            </div>
        );
    }

    const { name, price, discount_price, description, main_image, stock } = product;

    const handleQuantityChange = (type) => {
        if (type === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        } else if (type === 'increase' && quantity < (stock || 10)) {
            setQuantity(quantity + 1);
        }

    };



    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
            {/* Product Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16">

                {/* Left Column: Product Image / Gallery */}
                <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center border border-gray-100 relative group">
                        <img
                            src={main_image}
                            alt={name}
                            className="w-full h-full object-contain p-8 group-hover:scale-105 transition duration-500"
                        />
                        {discount_price && (
                            <span className="absolute top-4 left-4 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                                Sale
                            </span>
                        )}
                    </div>
                </div>

                {/* Right Column: Product Information */}
                <div className="flex flex-col justify-between">
                    <div>
                        {/* Category / Brand Header */}
                        <p className="text-amber-700 text-xs font-bold uppercase tracking-widest mb-2">
                            Luxury Collection
                        </p>

                        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 tracking-wide mb-3">
                            {name}
                        </h1>

                        {/* Ratings */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">(12 customer reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="text-xl font-semibold mb-6 flex items-center gap-3">
                            {discount_price ? (
                                <>
                                    <span className="text-amber-600 font-bold">${discount_price}</span>
                                    <span className="line-through text-gray-400 text-base">${price}</span>
                                </>
                            ) : (
                                <span className="text-gray-900 font-bold">${price}</span>
                            )}
                        </div>

                        {/* Short Description */}
                        <p className="text-sm text-gray-600 leading-relaxed mb-6 border-b border-gray-100 pb-6">
                            {description || 'Crafted with premium materials and minimalist aesthetics. Perfect for both casual wear and formal occasions.'}
                        </p>

                        {/* Quantity Selector & Add to Cart */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Quantity:</span>
                                <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 gap-4 bg-gray-50">
                                    <button
                                        onClick={() => handleQuantityChange('decrease')}
                                        className="hover:text-amber-600 transition"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-sm font-bold w-4 text-center">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange('increase')}
                                        className="hover:text-amber-600 transition"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <span className="text-xs text-gray-500">
                                    {stock ? `${stock} in stock` : 'In Stock'}
                                </span>
                            </div>

                            <div className="flex gap-3">

                                <button className={`flex-1 bg-black text-white py-3.5 px-6 rounded text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-600 transition shadow-sm ${existingItem ? "hidden" : "visible"} `} onClick={() => addToCart(product)}>
                                    <ShoppingBag size={16} />
                                    Add to Cart
                                </button>
                                <button title="Wishlist" className="p-3.5 border border-gray-300 rounded hover:border-amber-600 hover:text-amber-600 transition">
                                    <Heart size={18} />
                                </button>
                                <button title="Share" className="p-3.5 border border-gray-300 rounded hover:border-amber-600 hover:text-amber-600 transition">
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Guarantees / Features */}
                    <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-6 text-center text-gray-600">
                        <div className="flex flex-col items-center gap-1.5">
                            <Truck size={18} className="text-amber-700" />
                            <span className="text-[11px] font-medium uppercase tracking-wider">Free Shipping</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5">
                            <ShieldCheck size={18} className="text-amber-700" />
                            <span className="text-[11px] font-medium uppercase tracking-wider">2 Year Warranty</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5">
                            <RefreshCw size={18} className="text-amber-700" />
                            <span className="text-[11px] font-medium uppercase tracking-wider">30 Days Return</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs: Description / Additional Info / Reviews */}
            <div className="border-t border-gray-200 pt-10">
                <div className="flex justify-center border-b border-gray-200 gap-8 mb-8 text-xs font-bold uppercase tracking-widest">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`pb-3 border-b-2 transition-colors ${activeTab === 'description'
                            ? 'border-amber-600 text-amber-700'
                            : 'border-transparent text-gray-400 hover:text-gray-700'
                            }`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`pb-3 border-b-2 transition-colors ${activeTab === 'details'
                            ? 'border-amber-600 text-amber-700'
                            : 'border-transparent text-gray-400 hover:text-gray-700'
                            }`}
                    >
                        Additional Details
                    </button>
                </div>

                {/* Tab Contents */}
                <div className="max-w-3xl mx-auto text-sm text-gray-600 leading-relaxed text-center">
                    {activeTab === 'description' && (
                        <p>
                            {description ||
                                'This timepiece combines classic sophistication with high-end craftsmanship. Engineered for modern elegance, it features a water-resistant build and precise movement, making it an essential addition to any collection.'}
                        </p>
                    )}

                    {activeTab === 'details' && (
                        <div className="grid grid-cols-2 gap-4 text-left border border-gray-100 p-6 rounded bg-gray-50">
                            <div><strong className="text-gray-900">Case Diameter:</strong> 40mm</div>
                            <div><strong className="text-gray-900">Movement:</strong> Japanese Quartz</div>
                            <div><strong className="text-gray-900">Water Resistance:</strong> 3 ATM</div>
                            <div><strong className="text-gray-900">Strap Material:</strong> Genuine Leather</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;