const express = require('express');
const router = express.Router();
const Usuario = require('../Models/Usuarios');
const { permitirRol } = require('../Middlewares/auth');
const Usuarios = require('../Controllers/Usuarios');



//Rutas privadas con rol

router.get('/solo-aprendiz', permitirRol(['aprendiz']), (req, res) => {
    res.json({ mensaje: 'Bienvenido Aprendiz', usuario: req.usuario });
});

router.get('/solo-instructor', permitirRol(['instructor']), (req, res) => {
    res.json({ mensaje: 'Bienvenido Instructor', usuario: req.usuario })
});

router.get('/general', (req, res) => {
    res.json({ mensaje: 'Ruta pra cualquiere usuario autenticado', usuario: req.usuario });
});


//Crud de usuarios

//Obbtener todos los usuarios (Solo para los instructores)
router.get('/obtenerUsuarios', Usuarios.obtenerUsuarios)

//Obtener un usuario ID
router.get('/buscar', (req, res, next) => {
    console.log("--- Solicitud a /api/usuarios/buscar recibida ---");
    next(); // Asegúrate de llamar a next() para que la solicitud continúe al controlador
}, Usuarios.buscarUsuarios);
//Crear un nuevo usuario (registrarse)
router.post('/crear', Usuarios.crearUsuario)

//Actualizar usuario por ID
router.put('/actualizar/:id', Usuarios.actualizarUsuario);

router.get('/obtenerUsuario/:id',Usuarios.obtenerUsuario);

//Eliminar usuario (solo instructor)
router.delete('/eliminar/:id', Usuarios.eliminarUsuario);

module.exports = router;