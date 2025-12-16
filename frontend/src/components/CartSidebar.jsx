import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, CheckCircle, ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const CartSidebar = () => {
    const { isOpen, toggleCart, cart, removeFromCart, addToCart, total, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [ordering, setOrdering] = useState(false);

    // New helper to decrease quantity logic
    const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
            // You would need to implement updateCart or similar in context to handle this cleaner
            // For now, we reuse addToCart structure or just remove if 1 (simplified)
            // But strict "decrease" usually needs a dedicated context method.
            // Since context only has addToCart (increment) and remove, let's just use remove for now if user clicks trash.
        }
    };

    const handleCheckout = async () => {
        if (!user) {
            toggleCart();
            navigate('/login');
            return;
        }

        setOrdering(true);
        try {
            await api.post('/orders', { items: cart, total });
            clearCart();
            toggleCart();
            // show a nicer toast
            alert('Order placed successfully! 🚀');
        } catch (e) {
            console.error(e);
            alert('Failed to place order');
        } finally {
            setOrdering(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-brand-darkBlue z-40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-gray-100"
                    >
                        {/* Header */}
                        <div className="p-5 flex justify-between items-center bg-brand-blue text-white shadow-md z-10">
                            <div className="flex items-center gap-3">
                                <ShoppingCart className="text-brand-yellow" size={24} />
                                <h2 className="text-xl font-bold tracking-wide">My Cart ({cart.length})</h2>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" className="w-48 opacity-80 mb-6 grayscale" />
                                    </motion.div>
                                    <p className="text-lg font-medium text-gray-500">Your cart is empty!</p>
                                    <p className="text-sm text-gray-400 mb-6">Add items to it now.</p>
                                    <button onClick={toggleCart} className="bg-brand-blue text-white px-6 py-2 rounded-sm font-bold hover:bg-blue-700 transition-colors shadow-md">
                                        Shop Now
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        key={item.id}
                                        className="flex gap-4 bg-white p-4 rounded-md shadow-sm border border-gray-100 relative group"
                                    >
                                        <div className="w-20 h-20 bg-gray-50 rounded-md p-2 flex items-center justify-center flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                                                <div className="text-xs text-gray-500 mt-1">Seller: QuickKart Retail</div>
                                            </div>

                                            <div className="flex justify-between items-end mt-2">
                                                <div className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>

                                                {/* Quantity / Delete Controls */}
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center items-center gap-2">
                                                        {/* Just displaying quantity for now to keep context simple without refactor */}
                                                        <div className="text-sm text-gray-500">Qty: <span className="font-bold text-gray-800">{item.quantity}</span></div>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                        title="Remove Item"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <span>Price ({cart.length} items)</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <span>Discount</span>
                                        <span className="text-green-600 font-bold">- $0.00</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <span>Delivery Charges</span>
                                        <span className="text-green-600 font-bold">Free</span>
                                    </div>
                                    <div className="border-t border-gray-100 pt-3 flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total Amount</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={ordering}
                                    className="w-full bg-brand-orange text-white py-4 rounded-sm font-bold text-lg hover:bg-orange-600 disabled:opacity-70 transition-all shadow-md active:scale-[0.98] flex justify-center items-center gap-2 uppercase tracking-wide"
                                >
                                    {ordering ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </div>
                                    ) : (
                                        user ? <>Checkout <ArrowRight size={20} /></> : 'Login to Continue'
                                    )}
                                </button>
                                <div className="text-center mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                                    <ShieldCheck size={12} />
                                    Safe and Secure Payments. 100% Authentic products.
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Simple Icon component for the footer
const ShieldCheck = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
)

export default CartSidebar;
