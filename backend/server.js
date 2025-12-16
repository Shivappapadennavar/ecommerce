const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const { readData, writeData } = require('./db');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

// Products API
app.get('/api/products', (req, res) => {
    const products = readData('products.json');
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const products = readData('products.json');
    const product = products.find(p => p.id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Admin Product APIs
app.post('/api/admin/products', (req, res) => {
    const products = readData('products.json');
    const newProduct = { id: uuidv4(), ...req.body };
    products.push(newProduct);
    writeData('products.json', products);
    res.status(201).json(newProduct);
});

app.put('/api/admin/products/:id', (req, res) => {
    let products = readData('products.json');
    const index = products.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        writeData('products.json', products);
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.delete('/api/admin/products/:id', (req, res) => {
    let products = readData('products.json');
    const newProducts = products.filter(p => p.id !== req.params.id);
    if (products.length !== newProducts.length) {
        writeData('products.json', newProducts);
        res.json({ message: 'Product deleted' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Orders API
app.get('/api/orders', (req, res) => {
    const orders = readData('orders.json');
    res.json(orders);
});

app.post('/api/orders', (req, res) => {
    const orders = readData('orders.json');
    // Assuming body contains { items: [...], total: ... }
    const newOrder = { id: uuidv4(), date: new Date().toISOString(), ...req.body };
    orders.push(newOrder);
    writeData('orders.json', orders);
    res.status(201).json(newOrder);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
