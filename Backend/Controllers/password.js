// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/Usuarios');  // Asegúrate de importar el modelo de Usuario o el que uses para los usuarios.
const nodemailer = require('nodemailer');  // Si vas a enviar correos electrónicos

// Función para solicitar el reset de contraseña (enviar enlace con token)
exports.solicitarReset = async (req, res) => {
    const { correo } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Generar token de reset
        const token = jwt.sign({ id_usuario: usuario.id }, 'secretoParaToken', { expiresIn: '1h' });

        // Enviar correo con el enlace de reset
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'lmejiamartinez25@gmail.com',
                pass: 'gnys pozk ndqy hfcl'
            }
        });

        const mailOptions = {
            from: 'lmejiamartinez25@gmail.com',
            to: correo,
            subject: 'Solicitud de cambio de contraseña',
            text: `Haz clic en este enlace para resetear tu contraseña: http://localhost:3001/reset-password/${token}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ mensaje: 'Correo enviado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Función para resetear la contraseña
exports.resetearContrasena = async (req, res) => {
    const { token } = req.params;
    const { nuevaContrasena } = req.body;

    try {
        // Verificar token
        const decoded = jwt.verify(token, 'secretoParaToken');
        const usuario = await Usuario.findByPk(decoded.id_usuario);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(nuevaContrasena, salt);

        // Actualizar la contraseña en la base de datos
        usuario.clave = hashedPassword;
        await usuario.save();

        res.status(200).json({ mensaje: 'Contraseña actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
