const express = require('express');
const router = express.Router();
const controller = require('../../controllers/usuarios/clientesController');
const { verifyToken, permitRole } = require('../../middleware/authMiddleware');

// Rutas protegidas
router.get('/', verifyToken, permitRole('Administrador'), controller.getAll);
router.get('/:id', verifyToken, permitRole('Administrador'), controller.getById);
router.post('/', verifyToken, permitRole('Administrador'), controller.create);
router.put('/:id', verifyToken, permitRole('Administrador'), controller.update);
router.delete('/:id', verifyToken, permitRole('Administrador'), controller.delete);

module.exports = router;
