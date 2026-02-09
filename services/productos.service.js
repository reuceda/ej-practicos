const Productos = require('../models/productos.model');

const getAll = async () => await Productos.findAll();

const getById = async (id) => await Productos.findByPk(id);

const findOne = async (data) => await Productos.findOne({ where: data });

const create = async (data) => await Productos.create(data);

const update = async (id, data) => {
    const producto = await Productos.findByPk(id);
    if (!producto) return null;
    return await producto.update(data);
};

const remove = async (id) => {
    const producto = await Productos.findByPk(id);
    if (!producto) return null;
    await producto.destroy();
    return producto;
};

module.exports = {
    getAll,
    getById,
    findOne,
    create,
    update,
    remove,
};