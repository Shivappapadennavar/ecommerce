import React, { useEffect, useState } from 'react';
import api from '../api';
import { Package } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get('/orders')
            .then(res => setOrders(res.data.reverse())) // Newest first
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Order History</h1>
            <div className="space-y-6">
                {orders.map(order => (
                    <div key={order.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-6 mb-6">
                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
                                    <Package size={24} />
                                </div>
                                <div>
                                    <span className="font-bold text-lg text-gray-900 block">Order #{order.id.slice(0, 8)}</span>
                                    <span className="text-gray-500 text-sm">{new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}</span>
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-primary">${order.total?.toFixed(2)}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {order.items?.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-gray-700 bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                                        <div>
                                            <div className="font-semibold">{item.name}</div>
                                            <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                                        </div>
                                    </div>
                                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {orders.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-400">No orders placed yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Orders;
