const jwt = require('jsonwebtoken');
require('dotenv').config();

// Verifica si el token es válido
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: 'Token requerido' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // guarda los datos del usuario en la request
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};

// Middleware para verificar rol
exports.permitRole = (...perfilesPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !perfilesPermitidos.includes(req.user.perfil)) {
        return res.status(403).json({ error: 'Acceso denegado: rol no permitido' });
        }
        next();
    };
};
