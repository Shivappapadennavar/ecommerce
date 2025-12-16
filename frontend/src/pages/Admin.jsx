import React, { useEffect, useState } from 'react';
import api from '../api';
import { Trash2, Plus, LayoutDashboard } from 'lucide-react';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', price: '', description: '', image: '' });

    const fetchProducts = () => {
        api.get('/products').then(res => setProducts(res.data));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await api.delete(`/admin/products/${id}`);
            fetchProducts();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/admin/products', { ...form, price: Number(form.price) });
        setForm({ name: '', price: '', description: '', image: '' });
        fetchProducts();
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-8">
                <LayoutDashboard size={32} className="text-primary" />
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Plus className="text-primary" /> Add New Product
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                <input placeholder="e.g. Wireless Mouse" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                <input placeholder="0.00" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input placeholder="https://..." value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea placeholder="Product description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all h-32 resize-none" required />
                            </div>
                            <button type="submit" className="w-full bg-primary text-white p-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                                Add Product
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-6">Current Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {products.map(p => (
                            <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow group">
                                <img src={p.image} alt={p.name} className="w-24 h-24 object-cover rounded-lg" />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-gray-800 group-hover:text-primary transition-colors">{p.name}</h3>
                                        <p className="text-sm text-gray-500 font-medium">${p.price}</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <button onClick={() => handleDelete(p.id)} className="text-red-400 p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete Product">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Admin;
