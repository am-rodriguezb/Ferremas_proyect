const db = require("../../database");

// Ver todo el inventario
exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT i.*, s.nombre_sucursal, p.nombre_producto, p.codigo_sku
        FROM inventario i
        JOIN sucursal s ON i.sucursal_id = s.sucursal_id
        JOIN producto p ON i.producto_id = p.producto_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Ver inventario por sucursal
exports.getBySucursal = async (req, res) => {
    try {
        const [rows] = await db.query(
        `
        SELECT i.*, p.nombre_producto, p.codigo_sku
        FROM inventario i
        JOIN producto p ON i.producto_id = p.producto_id
        WHERE i.sucursal_id = ?
        `,
        [req.params.id]
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Ver stock de un producto específico en una sucursal
exports.getStockProducto = async (req, res) => {
    try {
        const { sucursal_id, producto_id } = req.params;
        const [rows] = await db.query(
        `
        SELECT cantidad FROM inventario
        WHERE sucursal_id = ? AND producto_id = ?
        `,
        [sucursal_id, producto_id]
        );

        if (rows.length === 0) {
        return res
            .status(404)
            .json({ error: "Producto no encontrado en esta sucursal" });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar stock
exports.updateCantidad = async (req, res) => {
    try {
        const { cantidad } = req.body;

        const [result] = await db.query(
        `
            UPDATE inventario SET cantidad = ? WHERE inventario_id = ?
            `,
        [cantidad, req.params.id]
        );

        res.json({ message: "Stock actualizado", cambios: result.affectedRows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear nuevo inventario (opcional)
exports.create = async (req, res) => {
    try {
        const { sucursal_id, producto_id, cantidad, stock_minimo, stock_maximo } =
        req.body;

        const [result] = await db.query(
        `
            INSERT INTO inventario (sucursal_id, producto_id, cantidad, stock_minimo, stock_maximo)
            VALUES (?, ?, ?, ?, ?)
            `,
        [sucursal_id, producto_id, cantidad, stock_minimo, stock_maximo]
        );

        res
        .status(201)
        .json({
            message: "Inventario registrado",
            inventario_id: result.insertId,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
