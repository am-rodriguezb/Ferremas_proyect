const pool = require("../database");

exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM producto");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};
