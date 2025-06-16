const db = require('../../database');

// Ver todos los pagos
exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT p.*, u.username AS cliente
        FROM pago p
        JOIN pedido pe ON p.pedido_id = pe.pedido_id
        JOIN user u ON pe.cliente_id = u.user_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Ver pago por pedido_id
exports.getByPedido = async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT * FROM pago WHERE pedido_id = ?
        `, [req.params.pedido_id]);

        if (rows.length === 0) return res.status(404).json({ error: 'Pago no encontrado' });

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    // Registrar pago
    exports.create = async (req, res) => {
    try {
        const {
        pedido_id,
        monto,
        metodo_pago,
        estado_pago,
        numero_transaccion,
        observaciones
        } = req.body;

        const [result] = await db.query(`
        INSERT INTO pago (pedido_id, monto, metodo_pago, estado_pago, numero_transaccion, observaciones)
        VALUES (?, ?, ?, ?, ?, ?)
        `, [pedido_id, monto, metodo_pago, estado_pago || 'Pendiente', numero_transaccion, observaciones]);

        res.status(201).json({ message: 'Pago registrado', pago_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar estado de pago
exports.updateEstado = async (req, res) => {
    try {
        const { estado_pago } = req.body;
        const { pago_id } = req.params;

        const [result] = await db.query(`
        UPDATE pago SET estado_pago = ? WHERE pago_id = ?
        `, [estado_pago, pago_id]);

        if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Pago no encontrado' });
        }

        res.json({ message: 'Estado de pago actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}