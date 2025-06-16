const db = require('../../database');

// Ver historial por pedido
exports.getByPedido = async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT ep.*, u.username AS usuario, e.nombre_estado
        FROM estado_pedido ep
        JOIN user u ON ep.usuario_id = u.user_id
        JOIN estado e ON ep.estado_id = e.estado_id
        WHERE ep.pedido_id = ?
        ORDER BY ep.fecha ASC
        `, [req.params.pedido_id]);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Agregar nuevo cambio de estado
exports.agregarEstado = async (req, res) => {
    try {
        const { pedido_id, usuario_id, estado_id, observaciones } = req.body;

        const [result] = await db.query(`
        INSERT INTO estado_pedido (pedido_id, usuario_id, estado_id, observaciones)
        VALUES (?, ?, ?, ?)
        `, [pedido_id, usuario_id, estado_id, observaciones]);

        res.status(201).json({ message: 'Estado agregado al historial', historial_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
