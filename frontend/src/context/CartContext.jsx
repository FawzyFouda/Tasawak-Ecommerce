import {  useState, useEffect } from 'react';
import { CartContext } from './createContext';
import toast from 'react-hot-toast';
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('tasawak_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('tasawak_wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasawak_cart', JSON.stringify(cart));
    }, [cart]);
    useEffect(() => {
        localStorage.setItem('tasawak_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // تعديل دالة الإضافة لتقبل المنتج والكمية المطلوبة
    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            console.log("tttttttttttttttttttttt")
            console.log(prevCart)
            const existingItem = prevCart.find((item) => item.id === product.id);

            if (existingItem) {
                // إذا كان المنتج موجوداً، نزيد الكمية القديمة بالكمية الجديدة
                return prevCart.map((item) => item.id === product.id ? { ...item } : item);
            }

            // إذا لم يكن موجوداً، نضيفه كعنصر جديد مع تحديد الكمية
            return [...prevCart, { ...product, quantity: quantity }];
        });
        toast.success(`"${product.name}" has been added to cart successfully`);

    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        toast.error(`product has been removed from cart successfully`);

    };

    const clearCart = () => setCart([]);

    const totalAmount = cart.reduce(
        (sum, item) => sum + (item.discount_price || item.price) * item.quantity,
        0
    );
    const addToWishlist = (product, quantity = 1) => {
        setWishlist((prevCart) => {

            const existingItem = prevCart.find((item) => item.id === product.id);

            if (existingItem) {
                // إذا كان المنتج موجوداً، نزيد الكمية القديمة بالكمية الجديدة
                return prevCart.map((item) => item.id === product.id ? { ...item } : item);
            }

            // إذا لم يكن موجوداً، نضيفه كعنصر جديد مع تحديد الكمية
            return [...prevCart, { ...product, quantity: quantity }];
        });
        toast.success(`"${product.name}" has been added to wishlist successfully`);
    };
    const removeFromWishlist = (productId) => {
        setWishlist((prevCart) => prevCart.filter((item) => item.id !== productId));
        toast.error('product has been removed from wishlist successfully');
    };
    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                wishlist,
                addToWishlist,
                removeFromWishlist,
                totalAmount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};