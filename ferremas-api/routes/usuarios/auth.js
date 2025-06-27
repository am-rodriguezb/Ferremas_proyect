const express = require('express');
const router = express.Router();
const authController = require('../../controllers/usuarios/authController');

// Solo login de administrador
router.post('/login', authController.login);

module.exports = router;
