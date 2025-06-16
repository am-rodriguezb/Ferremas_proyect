const express = require('express');
const router = express.Router();
const controller = require('../../controllers/reportesController');

router.get('/stock-bajo', controller.productosBajoStock);
router.get('/pedidos', controller.resumenPedidos);
router.get('/ventas', controller.ventasTotales); // opcional

module.exports = router;
