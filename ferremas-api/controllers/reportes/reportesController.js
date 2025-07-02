const db = require('../../database');

// Productos con bajo stock
exports.productosBajoStock = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT * FROM vista_productos_stock
            WHERE estado_stock = 'Bajo Stock' OR estado_stock = 'Sin Stock'
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Resumen de pedidos (para el administrador)
exports.resumenPedidos = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT * FROM vista_pedidos_completa
            WHERE MONTH(fecha) = MONTH(CURDATE()) AND YEAR(fecha) = YEAR(CURDATE())
            ORDER BY fecha DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Ventas totales por mes (opcional extra)
exports.ventasTotales = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT SUM(total) AS total_ventas
            FROM pedido
            WHERE MONTH(fecha) = MONTH(CURDATE()) AND YEAR(fecha) = YEAR(CURDATE())
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Desempeño por sucursal
exports.getDesempenoSucursal = async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT s.nombre_sucursal, COUNT(p.pedido_id) AS total_pedidos, SUM(p.total) AS total_ventas
        FROM pedido p
        JOIN sucursal s ON p.sucursal_id = s.sucursal_id
        GROUP BY s.sucursal_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
