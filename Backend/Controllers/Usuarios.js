const bcrypt = require('bcryptjs');
const { Usuario } = require('../Models');

// Crear usuario
exports.crearUsuario = async (req, res) => {
    try {
        const { nombre, correo, clave, rol, identificacion, tipo_documento, estado } = req.body;

        //Hashear la contraseña
        const salt = bcrypt.genSaltSync(10);
        const claveEncriptada = bcrypt.hashSync(clave, salt);

        const nuevoUsuario = await Usuario.create({
            estado,
            nombre,
            tipo_documento,
            correo,
            clave: claveEncriptada, // Guardar contraseña encriptada
            identificacion,
            rol,


        });

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Errror al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' })
    }
};
;
// Obtner todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error alobtener usuarios' });
    }
};

// Obtener usuario por su ID
exports.obtenerUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

// Actualizar un Usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            await usuario.update(req.body);
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualixzar usuario');
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

// Eliminar Usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            await usuario.destroy();
            res.json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Uusario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }

};