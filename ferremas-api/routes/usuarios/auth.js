const express = require('express');
const router = express.Router();
const controller = require('../../controllers/usuarios/authController');

router.post('/login', controller.login);

module.exports = router;
// Este archivo define las rutas relacionadas con la autenticación de usuarios.
// Aquí se importa el controlador de autenticación y se define la ruta para el inicio de sesión