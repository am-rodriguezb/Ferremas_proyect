const express = require('express');
const router = express.Router();
const categoriaController = require('../../controllers/productos/categoriaController');

router.get('/', categoriaController.obtenerCategorias);

module.exports = router;
