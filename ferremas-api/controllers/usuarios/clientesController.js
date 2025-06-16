const db = require('../../database');

// Obtener todos los clientes
exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT c.*, u.username, u.email, u.first_name, u.last_name, u.telefono
        FROM cliente c
        JOIN user u ON c.cliente_id = u.user_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

// Obtener cliente por ID
    exports.getById = async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT c.*, u.username, u.email, u.first_name, u.last_name, u.telefono
        FROM cliente c
        JOIN user u ON c.cliente_id = u.user_id
        WHERE c.cliente_id = ?
        `, [req.params.id]);

        if (rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear cliente (requiere un usuario ya creado)
exports.create = async (req, res) => {
    try {
        const { cliente_id, rut, correo, nombre, apellido, direccion, telefono } = req.body;

        const [result] = await db.query(`
        INSERT INTO cliente (cliente_id, rut, correo, nombre, apellido, direccion, telefono)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [cliente_id, rut, correo, nombre, apellido, direccion, telefono]);

        res.status(201).json({ message: 'Cliente creado', cliente_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar cliente
exports.update = async (req, res) => {
    try {
        const [result] = await db.query(`
        UPDATE cliente SET ? WHERE cliente_id = ?
        `, [req.body, req.params.id]);

        res.json({ message: 'Cliente actualizado', cambios: result.affectedRows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar cliente
exports.delete = async (req, res) => {
    try {
        const [result] = await db.query(`
        DELETE FROM cliente WHERE cliente_id = ?
        `, [req.params.id]);

        if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente no encontrado' });

        res.json({ message: 'Cliente eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
