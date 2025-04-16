const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado o malformado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'secreto'); // Cambia 'secreto' por tu clave real desde env
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

// Middleware para permitir acceso solo a ciertos roles
const permitirRol = (rolesPermitidos = []) => {
    return (req, res, next) => {
        const rol = req.usuario?.rol;

        if (!rol || !rolesPermitidos.includes(rol)) {
            return res.status(403).json({ message: 'Acceso denegado: Rol no autorizado' });
        }

        next();
    };
};

module.exports = {
    verificarToken,
    permitirRol
};
