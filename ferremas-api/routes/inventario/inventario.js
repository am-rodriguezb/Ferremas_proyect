const express = require('express');
const router = express.Router();
const controller = require('../../controllers/inventario/inventarioController');

router.get('/', controller.getAll);                         // Ver todo el inventario
router.get('/sucursal/:id', controller.getBySucursal);      // Ver inventario por sucursal
router.get('/stock/:sucursal_id/:producto_id', controller.getStockProducto); // Ver stock específico
router.put('/:id', controller.updateCantidad);              // Actualizar stock
router.post('/', controller.create);                        // (opcional) Crear entrada de inventario
router.post('/sucursales-disponibles', controller.getSucursalesDisponibles);


module.exports = router;
