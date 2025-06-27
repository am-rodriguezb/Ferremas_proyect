const db = require('../../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Función para generar token
const generateToken = (cliente) => {
    return jwt.sign(
        {
            cliente_id: cliente.cliente_id,
            username: cliente.username,
            correo: cliente.correo
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );
};

// 🔐 LOGIN DE CLIENTES
exports.login = async (req, res) => {
    const { identificador, password } = req.body;

    try {
        // Buscar cliente por username o correo
        const [clientes] = await db.query(
            `SELECT * FROM cliente WHERE username = ? OR correo = ?`,
            [identificador, identificador]
        );

        if (clientes.length === 0) {
            return res.status(401).json({ message: 'Cliente no encontrado' });
        }

        const cliente = clientes[0];
        const match = await bcrypt.compare(password, cliente.password);

        if (!match) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = generateToken(cliente);

        res.json({
            message: 'Login exitoso',
            token,
            cliente_id: cliente.cliente_id,
            username: cliente.username
        });
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// 🔐 REGISTRO DE CLIENTES
exports.register = async (req, res) => {
    const { username, email, password, nombre, apellido, telefono, direccion, region, comuna } = req.body;

    if (!username || !email || !password || !nombre || !apellido || !direccion || !region || !comuna) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    try {
        // Validar que no exista usuario o email repetido en clientes
        const [clienteExistente] = await db.query(
            'SELECT * FROM cliente WHERE username = ? OR correo = ?',
            [username, email]
        );
        if (clienteExistente.length > 0) {
            return res.status(409).json({ message: 'El nombre de usuario o correo ya están registrados' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Insertar nuevo cliente
        const [resultado] = await db.query(
            `INSERT INTO cliente (username, correo, password, nombre, apellido, direccion, telefono)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [username, email, hashedPassword, nombre, apellido, direccion, telefono]
        );

        res.status(201).json({ message: 'Registro exitoso', cliente_id: resultado.insertId });
    } catch (err) {
        console.error('Error al registrar cliente:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// GET /api/clientes/perfil
// controllers/clientesController.js

exports.getPerfil = async (req, res) => {
    const userId = req.user.cliente_id; // Asumiendo que el ID del cliente está en req.user

    try {
        const [rows] = await db.query(
            `SELECT c.cliente_id, c.username, c.correo, c.nombre, c.apellido,
                    c.direccion, c.telefono, c.region_id, r.nombre_region,
                    c.comuna_id, co.nombre_comuna
            FROM cliente c
            LEFT JOIN region r ON c.region_id = r.region_id
            LEFT JOIN comuna co ON c.comuna_id = co.comuna_id
            WHERE c.cliente_id = ?`,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error('Error al obtener perfil del cliente:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// controllers/clientesController.js

exports.actualizarPerfil = async (req, res) => {
    const userId = req.user.cliente_id;
    const { nombre, apellido, direccion, telefono, region_id, comuna_id } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE cliente
            SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, region_id = ?, comuna_id = ?
            WHERE cliente_id = ?`,
            [nombre, apellido, direccion, telefono, region_id, comuna_id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se pudo actualizar' });
        }

        res.json({ message: 'Perfil actualizado correctamente' });
    } catch (err) {
        console.error('Error al actualizar perfil:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

