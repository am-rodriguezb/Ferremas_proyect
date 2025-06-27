const express = require('express');
const router = express.Router();
const controller = require('../../controllers/usuarios/clientesController');
const { verifyToken } = require('../../middleware/authMiddleware'); // Asegúrate de tener este middleware

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/perfil', verifyToken, controller.getPerfil);
router.put('/perfil', verifyToken, controller.actualizarPerfil);
// En el futuro puedes añadir: obtener perfil del cliente, actualizarlo, etc.

module.exports = router;
