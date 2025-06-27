const express = require('express');
const router = express.Router();
const usuarioController = require('../../controllers/usuarios/usuarioController');

router.post('/login', usuarioController.login);

module.exports = router;
// Este archivo define las rutas relacionadas con los usuarios.
// Aquí se importa el controlador de usuarios y se define la ruta para el inicio de sesión.