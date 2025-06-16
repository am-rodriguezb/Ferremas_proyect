const db = require('../../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM user WHERE username = ?', [username]);

        if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign(
        {
            user_id: user.user_id,
            username: user.username,
            perfil: user.perfil
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
        );

        res.json({
        message: 'Login exitoso',
        token,
        perfil: user.perfil,
        user_id: user.user_id
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
