const db = require("../../database");

// Obtener todos los pedidos
exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT p.*, 
                c.username AS cliente,
                v.username AS vendedor,
                b.username AS bodeguero,
                s.nombre_sucursal,
                e.nombre_estado
        FROM pedido p
        LEFT JOIN user c ON p.cliente_id = c.user_id
        LEFT JOIN user v ON p.vendedor_id = v.user_id
        LEFT JOIN user b ON p.bodeguero_id = b.user_id
        LEFT JOIN sucursal s ON p.sucursal_id = s.sucursal_id
        LEFT JOIN estado e ON p.estado_actual = e.estado_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener pedido por ID
exports.getById = async (req, res) => {
    try {
        const [rows] = await db.query(
        `
        SELECT * FROM pedido WHERE pedido_id = ?
        `,
        [req.params.id]
        );

        if (rows.length === 0)
        return res.status(404).json({ error: "Pedido no encontrado" });

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear pedido
exports.create = async (req, res) => {
    try {
        const {
        cliente_id,
        vendedor_id,
        bodeguero_id,
        tipo_entrega,
        sucursal_id,
        direccion_envio,
        estado_actual,
        total,
        observaciones,
        } = req.body;

        const [result] = await db.query(
        `
        INSERT INTO pedido (cliente_id, vendedor_id, bodeguero_id, tipo_entrega,
                            sucursal_id, direccion_envio, estado_actual, total, observaciones)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            cliente_id,
            vendedor_id,
            bodeguero_id,
            tipo_entrega,
            sucursal_id,
            direccion_envio,
            estado_actual || 1,
            total,
            observaciones,
        ]
        );

        res
        .status(201)
        .json({ message: "Pedido creado", pedido_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar pedido
exports.update = async (req, res) => {
    try {
        const [result] = await db.query(
        `
        UPDATE pedido SET ? WHERE pedido_id = ?
        `,
        [req.body, req.params.id]
        );

        res.json({ message: "Pedido actualizado", cambios: result.affectedRows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar/cancelar pedido
exports.delete = async (req, res) => {
    try {
        const [result] = await db.query(
        `
        DELETE FROM pedido WHERE pedido_id = ?
        `,
        [req.params.id]
        );

        if (result.affectedRows === 0)
        return res.status(404).json({ error: "Pedido no encontrado" });

        res.json({ message: "Pedido eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




