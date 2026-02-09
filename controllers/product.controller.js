const productService = require('../services/product.service');

exports.getAllProducts = async (req, res) => {
    const products = await productService.getAll();
    res.status(200).json(products||{});
};

exports.getProductById = async (req, res) => {
    const product = await productService.getById(req.params.id);
    res.status(200).json(product||{});
};

exports.createProduct = async (req, res) => {

    const product = await productService.create(req.body);
    res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
    const updated = await productService.update(req.params.id, req.body);
    if (!updated) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(updated);
};

exports.deleteProduct = async (req, res) => {
    const deleted = await productService.delete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(204).send();
};

