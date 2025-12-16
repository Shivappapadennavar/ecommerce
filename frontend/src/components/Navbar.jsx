import React, { useState } from 'react';
import { ShoppingCart, LogOut, User as UserIcon, Search, Menu, ChevronDown, Monitor, Smartphone, Home as HomeIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { cart, toggleCart } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-brand-blue sticky top-0 z-40 shadow-md">
            {/* Top Bar - Main Nav */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-white italic font-extrabold text-2xl tracking-tighter"
                    >
                        Quick<span className="text-brand-yellow not-italic">Kart</span>
                    </motion.div>
                </Link>

                {/* Search Bar (Desktop) */}
                <div className="hidden md:flex flex-1 max-w-2xl mx-4 relative">
                    <input
                        type="text"
                        placeholder="Search for products, brands and more"
                        className="w-full h-10 pl-4 pr-12 rounded-sm text-sm text-gray-700 focus:outline-none shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-brand-blue">
                        <Search size={20} />
                    </button>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6 text-white font-medium">

                    {/* Login / User Dropdown */}
                    {user ? (
                        <div className="relative group cursor-pointer flex items-center gap-1">
                            <div className="flex items-center gap-1">
                                <UserIcon size={18} />
                                <span>{user.username}</span>
                                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                            </div>
                            {/* Megamenu / Dropdown */}
                            <div className="absolute top-full right-0 w-48 bg-white text-gray-800 shadow-xl rounded-b-md hidden group-hover:block border-t-2 border-brand-blue pt-2">
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="block px-4 py-2 hover:bg-gray-50">Admin Dashboard</Link>
                                )}
                                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-50">My Orders</Link>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500">Logout</button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-brand-white px-8 py-1 bg-white text-brand-blue font-bold rounded-sm hover:bg-gray-100 transition-colors">
                            Login
                        </Link>
                    )}

                    {/* Cart */}
                    <button onClick={toggleCart} className="flex items-center gap-2 group relative">
                        <div className="relative">
                            <ShoppingCart size={22} />
                            {itemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-brand-blue"
                                >
                                    {itemCount}
                                </motion.span>
                            )}
                        </div>
                        <span className="hidden sm:block">Cart</span>
                    </button>
                </div>
            </div>

            {/* Mobile Search - Visible only on small screens */}
            <div className="md:hidden px-4 pb-3">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full h-10 pl-4 pr-12 rounded-sm text-sm"
                    />
                    <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
