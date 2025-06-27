const jwt = require('jsonwebtoken');
require('dotenv').config();

// Verificar si hay token válido
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token requerido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });

        req.user = decoded;
        next();
    });
};

// Middleware para limitar acceso por rol
exports.permitRole = (...rolesPermitidos) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !rolesPermitidos.includes(user.perfil)) {
        return res.status(403).json({ message: 'No tienes permisos para esta acción' });
        }
        next();
    };
};

