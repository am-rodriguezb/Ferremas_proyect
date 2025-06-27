const express = require('express');
const router = express.Router();
const controller = require('../../controllers/usuarios/usersController');
const { verifyToken, permitRole } = require('../../middleware/authMiddleware');

// Solo administradores
router.use(verifyToken);
router.use(permitRole('Administrador'));

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
// Este archivo define las rutas relacionadas con los usuarios.
// Aquí se importa el controlador de usuarios y se define la ruta para las operaciones CRUD de usuarios
