import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <Router>
            <CartProvider>
                <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
                    <Navbar />
                    <CartSidebar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </div>
            </CartProvider>
        </Router>
    );
}

export default App;
