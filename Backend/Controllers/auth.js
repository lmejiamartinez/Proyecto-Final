const Usuario = require('../Models/Usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Login
const login = async (req, res) => {
    const { correo, clave } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo } });

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado. Regístrate' });
        }
        const claveValida = await bcrypt.compare(clave, usuario.clave);
        if (!claveValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' })
        }

        const token = jwt.sign(
            { id_usuario: usuario.id, rol: usuario.rol },
            'secreto',
            { expiresIn: '1h' }
        );
        res.json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            rol: usuario.rol,
            usuario: {
                id_usuario: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error Iniciar Sesión', error })
    }
};

//Registro
const registro = async (req, res) => {
    const { nombre, correo, clave, rol } = req.body;

    try {
        const existe = await Usuario.findOne({ where: { correo } });
        if (exiate) {
            return res.status(409).json({ mensaje: 'Este correo ya está registrado' });
        }
        const hash = await bcrypt.hash(clave, 10);
        const nuevo = await Usuario.create({
            nombre,
            correo,
            clave: hash,
            rol
        });

        const token = jwt.sign(
            { id_usuario: nuevo.id, rol: nuevo.id },
            'secreto',
            { expiresIn: '1h' }
        );

        res.status(201).json({
            mensaje: 'Usuario registrado con éxito',
            token,
            rol: nuevo.rol,
            usuario: {
                id_usuario: nuevo.id,
                nombre: nuevo.nombre,
                correo: nuevo.correo
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Erroral registrar', error });
    }
};
module.exports = { login, registro };