import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';


function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortType, setSortType] = useState('featured');


    useEffect(() => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

        axios
            .get(`${baseUrl}/products`)
            .then((response) => {
                if (response.data.success) {
                    setProducts(response.data.products);
                    console.log(products)
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        // 1. أخذ نسخة جديدة من المنتجات لتجنب تعديل الـ State الأصلي مباشرة
        let sortedArray = [...products];

        // 2. فحص الخيار المحدد وترتيب العناصر
        if (sortType === 'price-low') {
            // ترتيب من الأقل للأعلى
            sortedArray.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
        } else if (sortType === 'price-high') {
            // ترتيب من الأعلى للأقل
            sortedArray.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
        } else if (sortType === 'newest') {
            // ترتيب حسب الأحدث عن طريق تاريخ الإنشاء
            sortedArray.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        }

        // 3. تحديث قائمة المنتجات المعروضة
        setFilteredProducts(sortedArray);
    }, [sortType, products]);
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

            {/* Header & Page Title */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-widest text-gray-900 mb-2">
                    Shop All Watches
                </h1>
                <p className="text-amber-700 text-xs font-semibold uppercase tracking-widest">
                    Explore Our Premium Collection
                </p>
            </div>

            {/* Filter & View Control Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-4 mb-8 gap-4 text-xs font-medium uppercase tracking-wider text-gray-600">

                {/* Results Counter */}
                <div>
                    Showing <span className="font-bold text-black">{products.length}</span> Products
                </div>

                {/* Sorting Options */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                        <SlidersHorizontal size={14} />
                        <span>Filter</span>
                    </div>

                    <select className="bg-transparent border border-gray-300 rounded px-2 py-1 outline-none focus:border-amber-600 cursor-pointer text-xs" value={sortType}
  onChange={(e) => setSortType(e.target.value)}>
                        <option value="featured">Sort by: Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest Arrivals</option>
                    </select>
                </div>
            </div>

            {/* Loading Skeleton */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="animate-pulse bg-gray-100 rounded-md h-80"></div>
                    ))}
                </div>
            ) : products.length === 0 ? (
                /* Empty State */
                <div className="text-center py-20 text-gray-500">
                    <p className="text-lg font-serif mb-2">No products found</p>
                    <p className="text-xs uppercase tracking-wider">Check back later for new arrivals</p>
                </div>
            ) : (
                /* Products Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            )}

        </div>
    );
}

export default Shop;