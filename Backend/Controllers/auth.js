const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario, AprendizFicha } = require("../Models");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");

exports.login = async (req, res) => {
    try {
        const { correo, clave } = req.body;

        console.log(" Se recibió solicitud de login:", req.body);

        const usuarioBackend = await Usuario.findOne({
            where: { correo },
            include: [{
                model: AprendizFicha,
                as: 'aprendiz_ficha',
            }]
        });

        if (!usuarioBackend) {
            return res.status(404).json({
                mensaje: "El correo no está registrado.",
            });
        }

        const claveValida = await bcrypt.compare(clave, usuarioBackend.clave);
        if (!claveValida) {
            return res.status(401).json({
                mensaje: "Contraseña incorrecta",
            });
        }

        const token = jwt.sign(
            { idUsuario: usuarioBackend.id_usuario, rol: usuarioBackend.rol },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Aquí estaba el error: usuario no está definido, es usuarioBackend y el alias es 'aprendiz_ficha'
        const idFichaAprendiz = usuarioBackend.aprendiz_ficha?.id_ficha_aprendiz || null;
        console.log(usuarioBackend.aprendiz_ficha);

        return res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 2 * 60 * 60 * 1000,
        }).status(200).json({
            mensaje: "Login exitoso",
            idFichaAprendiz,
        });
    } catch (error) {
        console.error("💥 Error en login:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

// Registro
exports.registro = async (req, res) => {
    const { nombre, correo, clave, rol } = req.body;

    try {
        const existe = await Usuario.findOne({ where: { correo } });
        if (existe) {
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
            { idUsuario: nuevo.id_usuario, rol: nuevo.rol },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(201).json({
            mensaje: 'Usuario registrado con éxito',
            token,
            rol: nuevo.rol,
            usuario: {
                idUsuario: nuevo.id_usuario,
                nombre: nuevo.nombre,
                correo: nuevo.correo
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar', error });
    }
};

exports.verificarToken = async (req, res) => {
    try {
        const token_frontend = req.cookies.token;
        console.log("Token recibido: ", token_frontend);

        if (!token_frontend) {
            return res.status(404).json({
                success: false,
                message: 'Acceso denegado. Token inválido o no proporcionado.',
            });
        }

        // Decodificar el token
        const usuarioBackend = jwt.verify(token_frontend, process.env.JWT_SECRET);
        const usuario = {
            rol: usuarioBackend.rol,
            idUsuario: usuarioBackend.idUsuario
        };

        console.log("Usuario decodificado: ", usuarioBackend);

        // Buscar el id_ficha_aprendiz asociado
        const aprendiz = await AprendizFicha.findOne({
            where: { id_usuario: usuarioBackend.idUsuario }
        });

        const idFichaAprendiz = aprendiz?.id_ficha_aprendiz || null;

        return res.status(200).json({
            success: true,
            usuario,
            idFichaAprendiz,
            message: 'Usuario verificado correctamente.',
        });

    } catch (error) {
        console.error('Error al verificar el token:', error);

        return res.status(403).json({
            success: false,
            message: 'Token inválido o expirado.',
        });
    }
};

// Olvido contraseña - envío correo con nodemailer
exports.forgotPassword = async (req, res) => {
    const { correo } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Genera token y tiempo de expiración
        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpira = Date.now() + 3600000; // 1 hora

        // Guarda el token y expiración
        usuario.reset_token = token;
        usuario.token_expiracion = new Date(tokenExpira);
        await usuario.save();

        // Crea transporte de correo
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Envía el correo
        const resetLink = `http://localhost:5173/auth/reset-password/${token}`;
        await transporter.sendMail({
            from: '"Soporte SENA" <lmejiamartinez25@gmail.com>',
            to: correo,
            subject: "Restablecimiento de contraseña",
            html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetLink}">${resetLink}</a>`,
        });

        return res.json({ mensaje: "Correo enviado para restablecer contraseña." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error interno del servidor." });
    }
};

// Restablecer contraseña
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { nuevaClave } = req.body;

    try {
        const usuario = await Usuario.findOne({
            where: {
                reset_token: token,
                token_expiracion: { [Op.gt]: new Date() }
            }
        });

        if (!usuario) {
            return res.status(400).json({ mensaje: "Token inválido o expirado." });
        }

        const hash = await bcrypt.hash(nuevaClave, 10);
        usuario.clave = hash;
        usuario.reset_token = null;
        usuario.token_expiracion = null;
        await usuario.save();

        return res.json({ mensaje: "Contraseña actualizada correctamente." });
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al restablecer la contraseña." });
    }
};

// Obtener perfil
exports.obtenerPerfil = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ mensaje: 'No autenticado' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const usuario = await Usuario.findByPk(decoded.idUsuario, {
            attributes: ['id_usuario', 'nombre', 'correo', 'rol', 'identificacion', 'tipo_documento', 'telefono']
        });

        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        return res.status(200).json({ usuario });
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        return res.status(500).json({ mensaje: 'Error al obtener perfil' });
    }
};

// Actualizar instructor
exports.actualizarInstructor = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ mensaje: "No autenticado. Token faltante." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id_usuario = decoded.idUsuario;

        const { nombre, correo, identificacion, tipo_documento, telefono } = req.body;

        const instructor = await Usuario.findByPk(id_usuario);

        if (!instructor) {
            return res.status(404).json({ mensaje: "Instructor no encontrado" });
        }

        instructor.nombre = nombre;
        instructor.correo = correo;
        instructor.identificacion = identificacion;
        instructor.tipo_documento = tipo_documento;
        instructor.telefono = telefono;

        await instructor.save();

        res.json({ usuarioActualizado: instructor });
    } catch (error) {
        console.error("Error al actualizar el instructor:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

// Actualizar aprendiz
exports.actualizarAprendiz = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ mensaje: "No autenticado. Token faltante." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const id_usuario = decoded.idUsuario;

        const { nombre, correo, identificacion, tipo_documento, telefono } = req.body;

        const aprendiz = await Usuario.findByPk(id_usuario);

        if (!aprendiz) {
            return res.status(404).json({ mensaje: "Aprendiz no encontrado" });
        }

        aprendiz.nombre = nombre;
        aprendiz.correo = correo;
        aprendiz.identificacion = identificacion;
        aprendiz.tipo_documento = tipo_documento;
        aprendiz.telefono = telefono;

        await aprendiz.save();

        res.json({ usuarioActualizado: aprendiz });
    } catch (error) {
        console.error("Error al actualizar el instructor:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};
