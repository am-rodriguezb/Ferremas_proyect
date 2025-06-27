const db = require('../../database');

exports.obtenerCategorias = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categoria');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
};
