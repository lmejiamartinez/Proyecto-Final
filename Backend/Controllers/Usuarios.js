const bcrypt = require('bcryptjs');
const { Usuario } = require('../Models');
const nodemailer = require("nodemailer");
const { Op } = require('sequelize');

// Configurar el transporter de nodemailer con user y pass HARDCODEADOS
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "lmejiamartinez25@gmail.com", // 👹 HARDCORE
        pass: "cquz upxz ucas fane",          // 👹 BIEN PÚBLICO
    },
});

// Crear usuario
exports.crearUsuario = async (req, res) => {
    try {
        const { nombre, correo, claveTemporal, rol, identificacion, tipo_documento, estado, telefono } = req.body;

        if (!nombre || !correo || !claveTemporal || !rol) {
            return res.status(400).json({ error: "Nombre, correo, clave temporal y rol son obligatorios" });
        }

        const existeCorreo = await Usuario.findOne({ where: { correo } });
        if (existeCorreo) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        const salt = bcrypt.genSaltSync(10);
        const claveEncriptada = bcrypt.hashSync(claveTemporal, salt);

        const nuevoUsuario = await Usuario.create({
            estado: estado !== undefined ? estado : 1,
            nombre,
            tipo_documento,
            correo,
            clave: claveEncriptada,
            identificacion,
            rol,
            telefono,
        });

        if (rol === 'Aprendiz') {
            console.log('Lógica para asignar ficha y programa');
            // Aquí deberías relacionarlo en la tabla de AprendizFicha
        }

        try {
            await transporter.sendMail({
                from: '"Soporte SENA" <lmejiamartinez25@gmail.com>',
                to: correo,
                subject: "Tu cuenta ha sido creada",
                html: `<p>Tu cuenta ha sido creada. Clave temporal: <strong>${claveTemporal}</strong>. Cambia tu contraseña al iniciar sesión en el link olvido su contraseña.</p>`,
            });
            console.log('Correo de bienvenida enviado');
        } catch (errorCorreo) {
            console.error('Error enviando correo:', errorCorreo.message);
        }

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ errores: error.errors.map(err => err.message) });
        }
        res.status(500).json({ error: 'Ocurrió un error al crear el usuario' });
    }
};
console.log("--- Controlador Usuarios cargado ---");

exports.buscarUsuarios = async (req, res) => {
    console.log("REQ.QUERY:", req.query);
    const { nombre, documento } = req.query;
    console.log("NOMBRE:", nombre, "DOCUMENTO (al inicio):", documento);
    const whereClause = {};

    if (nombre) {
        whereClause.nombre = { [Op.like]: `%${nombre}%` }; // Cambia Op.iLike a Op.like
        console.log("WHERECLAUSE después de nombre:", whereClause);
    }

    if (documento) {
        whereClause.identificacion = documento;
        console.log("WHERECLAUSE después de documento:", whereClause);
    }

    if (!nombre && !documento) {
        return res.status(400).json({ mensaje: 'Por favor, ingrese un nombre o un número de documento para buscar.' });
    }

    console.log("WHERECLAUSE final:", whereClause);

    try {
        const usuarios = await Usuario.findAll({
            where: {
                [Op.or]: [whereClause],
            },
        });

        if (usuarios.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron usuarios con los criterios proporcionados.' });
        }

        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al buscar usuarios:', error);
        res.status(500).json({ mensaje: 'Error al buscar usuarios.' });
    }
};

// Obtener usuarios (con paginación)
exports.obtenerUsuarios = async (req, res) => {
    try {
        const { page = 1, size = 10, search = '' } = req.query;
        const offset = (page - 1) * size;

        const { count, rows } = await Usuario.findAndCountAll({
            where: {
                [Op.or]: [
                    { nombre: { [Op.like]: `%${search}%` } },
                    { correo: { [Op.like]: `%${search}%` } },
                ],
            },
            offset: parseInt(offset),
            limit: parseInt(size),
            order: [['createdAt', 'DESC']],
        });

        res.json({ total: count, usuarios: rows });
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        res.status(500).json({ error: 'Ocurrió un error al listar usuarios' });
    }
};

// Obtener un solo usuario
exports.obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error.message);
        res.status(500).json({ error: 'Ocurrió un error al buscar el usuario' });
    }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const { correo } = req.body;
        if (correo && correo !== usuario.correo) {
            const existeCorreo = await Usuario.findOne({ where: { correo } });
            if (existeCorreo) {
                return res.status(400).json({ error: 'El correo ya está registrado por otro usuario' });
            }
        }

        await usuario.update(req.body);
        res.json(usuario);
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        res.status(500).json({ error: 'Ocurrió un error al actualizar el usuario' });
    }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await usuario.destroy();
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error.message);
        res.status(500).json({ error: 'Ocurrió un error al eliminar el usuario' });
    }
};
