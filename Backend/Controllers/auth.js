const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../Models"); // Importa bien
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");



exports.login = async (req, res) => {
    try {
        const { correo, clave } = req.body;

        console.log("🧠 Se recibió solicitud de login:", req.body);

        const usuarioBackend = await Usuario.findOne({ where: { correo } });

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


        const token = jwt.sign({ idUsuario: usuarioBackend.id_usuario, rol: usuarioBackend.rol }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        
        return res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 2000 * 60 * 60,
        }).status(200).json({
            mensaje: "Login exitoso",
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
            'secreto',
            { expiresIn: '1h' }
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

exports.verificarToken = (req, res) => {
    try {
        // Obtén el token de la cookie
        const token_frontend = req.cookies.token;
        console.log("Token recibido: ", token_frontend);

        if (!token_frontend) {
            return res.status(404).json({
                success: false,
                message: 'Acceso denegado. Token inválido o no proporcionado.',
            });
        }

        // Verifica el token con la clave secreta
        const usuarioBackend = jwt.verify(token_frontend, process.env.JWT_SECRET);

        // Si la verificación es exitosa, extraemos los datos decodificados
        const usuario = {
            rol: usuarioBackend.rol,
            idUsuario: usuarioBackend.idUsuario
        }

        console.log("Usuario decodificado: ", usuarioBackend);

        // Respuesta exitosa con la información del usuario decodificada
        return res.status(200).json({
            success: true,
            usuario,  // Devuelves la información del usuario decodificada
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

//olvido contreseña envio correo con nodemailer
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
            service: "gmail", // o tu proveedor
            auth: {
                user: "lmejiamartinez25@gmail.com",
                pass: "cquz upxz ucas fane ",
            },
        });

        // Envía el correo
        const resetLink = `http://localhost:5173/auth/reset-password/${token}`; // Ajusta a tu ruta
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
//Restablecer cpntraeña
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
        // Hashea si usas bcrypt
        usuario.reset_token = null;
        usuario.token_expiracion = null;
        await usuario.save();

        return res.json({ mensaje: "Contraseña actualizada correctamente." });
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al restablecer la contraseña." });
    }
};

