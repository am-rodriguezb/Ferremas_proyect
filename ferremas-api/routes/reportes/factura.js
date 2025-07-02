const express = require('express');
const router = express.Router();
const controller = require('../../controllers/reportes/facturaController');
const { verifyToken, permitRole } = require('../../middleware/authMiddleware');

// Ruta para generar factura (solo Bodeguero o Administrador)
router.post('/generar', verifyToken, permitRole('Bodeguero', 'Administrador'), controller.generarFactura);

// Ruta para obtener factura por ID de pedido
router.get('/por-pedido/:pedido_id', controller.getFacturaPorPedido);

module.exports = router;