const express = require('express');
const router = express.Router();
const controller = require('../../controllers/pedidos/historialEstadoController');

router.get('/:pedido_id', controller.getByPedido);
router.post('/', controller.agregarEstado); // para agregar nuevo estado

module.exports = router;
