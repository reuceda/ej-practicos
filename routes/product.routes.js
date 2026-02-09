const express = require('express');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validate.middleware');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id',
    validateRequest([param('id').isInt().withMessage('ID must be an integer')]),
    productController.getProductById
);

router.post('/',
    validateRequest([
        body('nombre').isString().withMessage('El nombre es requerido'),
        body('descripcion').isString().withMessage('La descripción es requerida'),
        body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
        body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero no negativo'),
        body('categoria').isString().withMessage('La categoría es requerida'),
    ]),
    productController.createProduct
);

router.put('/:id',
    validateRequest([
        param('id').isInt().withMessage('ID must be an integer'),
        body('nombre').isString().withMessage('El nombre es requerido'),
        body('descripcion').isString().withMessage('La descripción es requerida'),
        body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
        body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero no negativo'),
        body('categoria').isString().withMessage('La categoría es requerida'),
    ]),
    productController.updateProduct
);

router.delete('/:id',
    validateRequest([param('id').isInt().withMessage('ID must be an integer')]),
    productController.deleteProduct
);

module.exports = router;