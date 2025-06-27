const db = require('../../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign(
        {
        user_id: user.user_id,
        username: user.username,
        perfil: user.perfil
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );
};

// Login exclusivo para ADMINISTRADOR
exports.login = async (req, res) => {
    const { identificador, password } = req.body;

    try {
    const [users] = await db.query(
      `SELECT * FROM user WHERE (username = ? OR email = ?) AND perfil = 'Administrador'`,
        [identificador, identificador]
    );

    if (users.length === 0) return res.status(401).json({ message: 'Admin no encontrado' });

    const admin = users[0];
    const match = await bcrypt.compare(password, admin.password);

    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = generateToken(admin);

    res.json({
        message: 'Login exitoso',
        token,
        perfil: admin.perfil,
        user_id: admin.user_id,
        username: admin.username
        });
    } catch (err) {
        console.error('Error al iniciar sesión admin:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
