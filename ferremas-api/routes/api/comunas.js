const express = require('express');
const router = express.Router();
const db = require('../../database');

// Obtener todas las regiones
router.get('/regiones', async (req, res) => {
    try {
        const [regiones] = await db.query('SELECT * FROM region');
        res.json(regiones);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener regiones' });
    }
});

// Comunas por región
router.get('/comunas/:region_id', async (req, res) => {
    try {
        const [comunas] = await db.query('SELECT * FROM comuna WHERE region_id = ?', [req.params.region_id]);
        res.json(comunas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener comunas' });
    }
});

module.exports = router;