const jwt = require('jsonwebtoken');

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
    permitirRol,
};
