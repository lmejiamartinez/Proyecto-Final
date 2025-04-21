const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../Models"); // Importa bien
const { UUID } = require("sequelize");

const login = async (req, res) => {
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

        const usuario ={
            rol: usuarioBackend.rol,
            idUsuario: usuarioBackend.id_usuario
        }

        const token = jwt.sign({ id: usuarioBackend.id_usuario }, process.env.SECRET_JWT_KEY, {
            expiresIn: "1d",
        });
        console.log(usuario)
        return res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 2000 * 60 * 60,
        }).status(200).json({
            mensaje: "Login exitoso",
            usuario,
        });
    } catch (error) {
        console.error("💥 Error en login:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};
// Registro
const registro = async (req, res) => {
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
            { id_usuario: nuevo.id, rol: nuevo.rol },
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
        res.status(500).json({ mensaje: 'Error al registrar', error });
    }
};

const verificarToken = (req, res) => {
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
        const usuarioDecoded = jwt.verify(token_frontend, process.env.SECRET_JWT_KEY);

        // Si la verificación es exitosa, extraemos los datos decodificados
        const usuario = {
            rol: usuarioDecoded.rol,
            idUsuario: usuarioDecoded.id_usuario,
        };

        console.log("Usuario decodificado: ", usuarioDecoded);

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


module.exports = { login, registro, verificarToken };
