const permitirRol = (rolesPermitidos = []) => {
    return (req, res, next) => {
        const rol = req.usuario.rol;

        if (!rolesPermitidos.includes(rol)) {
            return res.status(403).json({ message: 'Acceso denegado: Rol no autorizado' });
        }
        next();
    };
};
module.exports = permitirRol;