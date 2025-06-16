const db = require("../../database");

// Obtener todos los productos
exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.*, c.nombre_categoria, m.nombre_marca
            FROM producto p
            JOIN categoria c ON p.categoria_id = c.categoria_id
            JOIN marca m ON p.marca_id = m.marca_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener producto por ID
exports.getById = async (req, res) => {
    try {
        const [rows] = await db.query(
            `
            SELECT p.*, c.nombre_categoria, m.nombre_marca
            FROM producto p
            JOIN categoria c ON p.categoria_id = c.categoria_id
            JOIN marca m ON p.marca_id = m.marca_id
            WHERE p.producto_id = ?
            `,
            [req.params.id]
        );

        if (rows.length === 0)
        return res.status(404).json({ error: "Producto no encontrado" });

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear producto
exports.create = async (req, res) => {
    try {
        const {
            nombre_producto,
            descripcion,
            categoria_id,
            marca_id,
            modelo,
            precio,
            codigo_sku,
            url_imagen,
            peso,
            dimensiones,
            garantia_meses,
        } = req.body;

        const [result] = await db.query(
        `
        INSERT INTO producto (nombre_producto, descripcion, categoria_id, marca_id, modelo, precio, codigo_sku, url_imagen, peso, dimensiones, garantia_meses)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            nombre_producto,
            descripcion,
            categoria_id,
            marca_id,
            modelo,
            precio,
            codigo_sku,
            url_imagen,
            peso,
            dimensiones,
            garantia_meses,
        ]
        );

        res
        .status(201)
        .json({ message: "Producto creado", producto_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar producto
exports.update = async (req, res) => {
    try {
        const [result] = await db.query(
        `
        UPDATE producto SET ? WHERE producto_id = ?
        `,
        [req.body, req.params.id]
        );

        res.json({ message: "Producto actualizado", cambios: result.affectedRows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar producto
exports.delete = async (req, res) => {
    try {
        const [result] = await db.query(
        `
        DELETE FROM producto WHERE producto_id = ?
        `,
        [req.params.id]
        );

        if (result.affectedRows === 0)
        return res.status(404).json({ error: "Producto no encontrado" });

        res.json({ message: "Producto eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
