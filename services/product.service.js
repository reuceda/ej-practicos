const Products = require('../models/product.model');

const getAll = async () => await Products.findAll();

const getById = async (id) => await Products.findByPk(id);

const findOne = async (data) => await Products.findOne({ where: data });

const create = async (data) => await Products.create(data);

const update = async (id, data) => {
    const product = await Products.findByPk(id);
    if (!product) return null;
    return await product.update(data);
};

const remove = async (id) => {
    const product = await Products.findByPk(id);
    if (!product) return null;
    await product.destroy();
    return product;
};

module.exports = {
    getAll,
    getById,
    findOne,
    create,
    update,
    remove,
};