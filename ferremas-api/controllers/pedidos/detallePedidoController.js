const db = require("../../database");

// Ver los productos de un pedido
exports.getByPedido = async (req, res) => {
    try {
        const [rows] = await db.query(
        `
        SELECT dp.*, p.nombre_producto, p.codigo_sku
        FROM detalle_pedido dp
        JOIN producto p ON dp.producto_id = p.producto_id
        WHERE dp.pedido_id = ?
        `,
        [req.params.pedido_id]
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Agregar productos a un pedido
exports.addDetalle = async (req, res) => {
    try {
        const { pedido_id, producto_id, cantidad, precio_unitario } = req.body;

        const [result] = await db.query(
        `
        INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario)
        VALUES (?, ?, ?, ?)
        `,
        [pedido_id, producto_id, cantidad, precio_unitario]
        );

        res
        .status(201)
        .json({
            message: "Producto agregado al pedido",
            detalle_id: result.insertId,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
