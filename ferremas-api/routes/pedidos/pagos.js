const express = require('express');
const router = express.Router();
const controller = require('../../controllers/pedidos/pagosController');

router.get('/', controller.getAll);
router.get('/:pedido_id', controller.getByPedido);
router.post('/', controller.create);

module.exports = router;
