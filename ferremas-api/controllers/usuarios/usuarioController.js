const db = require('../../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Generar token JWT
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

// Login para empleados (vendedores, bodegueros, etc.)
exports.login = async (req, res) => {
    const { identificador, password } = req.body;

    try {
        // Buscar usuario (empleado) por username o email
        const [rows] = await db.query(
            `SELECT * FROM user 
            WHERE (username = ? OR email = ?) 
            AND perfil IN ('Vendedor', 'Bodeguero', 'Contador')`,
            [identificador, identificador]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Empleado no encontrado' });
        }

        const empleado = rows[0];
        const match = await bcrypt.compare(password, empleado.password);

        if (!match) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = generateToken(empleado);

        res.json({
            message: 'Login exitoso',
            token,
            perfil: empleado.perfil,
            user_id: empleado.user_id,
            username: empleado.username
        });
    } catch (err) {
        console.error('Error al iniciar sesión empleado:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
