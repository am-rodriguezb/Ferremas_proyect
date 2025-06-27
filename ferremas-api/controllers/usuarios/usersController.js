const db = require('../../database');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT u.*, s.nombre_sucursal
        FROM user u
        LEFT JOIN sucursal s ON u.sucursal_id = s.sucursal_id
        WHERE u.perfil != 'Administrador'
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener usuario por ID
exports.getById = async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT u.*, s.nombre_sucursal
        FROM user u
        LEFT JOIN sucursal s ON u.sucursal_id = s.sucursal_id
        WHERE user_id = ? AND perfil != 'Administrador'
        `, [req.params.id]);

        if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear usuario interno (vendedor, bodeguero, etc)
exports.create = async (req, res) => {
    const {
        username, email, password, first_name, last_name,
        rut, telefono, perfil, sucursal_id
    } = req.body;

    const validRoles = ['Vendedor', 'Bodeguero', 'Contador'];

    if (!validRoles.includes(perfil)) {
        return res.status(400).json({ message: 'Rol no permitido para creación' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const [result] = await db.query(`
        INSERT INTO user (username, email, password, first_name, last_name, rut, telefono, perfil, sucursal_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [username, email, hashedPassword, first_name, last_name, rut, telefono, perfil, sucursal_id]);

        res.status(201).json({ message: 'Usuario creado', user_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar usuario
exports.update = async (req, res) => {
    try {
        const [result] = await db.query(`UPDATE user SET ? WHERE user_id = ?`, [req.body, req.params.id]);
        res.json({ message: 'Usuario actualizado', cambios: result.affectedRows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar usuario
exports.delete = async (req, res) => {
    try {
        const [result] = await db.query(`DELETE FROM user WHERE user_id = ?`, [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
