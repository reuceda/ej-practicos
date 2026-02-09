const app = require('./app');
const express = require('express');
const sequilize = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const Products = require('./models/product.model');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//listar productos
app.get('/api/productos', async (req, res) => {
    try {
        const products = await Products.getAll();

        res.json(products || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//obtener producto por id
app.get('/api/productos/:id', async (req, res) => {
    try {
        const product = await Products.getById(req.params.id);
        
        res.json(product || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// crear producto
app.post('/api/productos', async (req, res) => {
    try {
        const nuevo = await Products.create(req.body);
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//actualizar producto
app.put('/api/productos/:id', async (req, res) => {
    try {
        const product = await Products.getById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const actualizado = await Products.update(req.params.id, req.body);
        res.json(actualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


//eliminar producto
app.delete('/api/productos/:id', async (req, res) => {
    try {
        const product = await Products.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await Products.remove(req.params.id);

        res.json({ mensaje: 'Producto eliminado' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//ruta principal
app.get('/', (req, res) => {
    res.send('<h1>Bienvenido a la API de los ejercicios practicos</h1>');
});

const startServer = async () => {
    try {
        await sequilize.authenticate();
        await sequilize.sync(); // crea las tablas si no existen
        console.log('Database connected');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();