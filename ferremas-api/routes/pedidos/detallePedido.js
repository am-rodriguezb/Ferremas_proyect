const express = require('express');
const router = express.Router();
const controller = require('../../controllers/pedidos/detallePedidoController');

router.get('/:pedido_id', controller.getByPedido);
router.post('/', controller.addDetalle);

module.exports = router;
