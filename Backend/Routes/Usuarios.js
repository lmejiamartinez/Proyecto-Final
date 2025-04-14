const express = require('express');
const router = express.Router();
const Usuario = require('../Models/Usuarios');
const verificarToken = require('../Middlewares/auth');
const permitirRol = require('../Middlewares/rol');
const Usuarios = require('../Controllers/Usuarios');

//Rutas privadas con rol

router.get('solo-aprendiz', verificarToken, permitirRol(['aprendiz']), (req, res) => {
    res.json({ mensaje: 'Bienvenido Aprendiz', usuario: req.usuario });
});

router.get('solo-instructor', verificarToken, permitirRol(['instructor']), (req, res) => {
    res.json({ mensaje: 'Bienvenido Instructor', usuario: req.usuario })
});

router.get('/general', verificarToken, (req, res) => {
    res.json({ mensaje: 'Ruta pra cualquiere usuario autenticado', usuario: req.usuario });
});


//Crud de usuarios

//Obbtener todos los usuarios (Solo para los instructores)
router.get('/', verificarToken, permitirRol(['instructor']), Usuarios.obtenerUsuarios)

//Obtener un usuario ID
router.get('/:id', verificarToken, Usuarios.obtenerUsuario);

//Crear un nuevo usuario (registrarse)
router.post('/', Usuarios.crearUsuario)

//Actualizar usuario por ID
router.put('/:id', verificarToken, Usuarios.actualizarUsuario);

//Eliminar usuario (solo instructor)
router.delete('/:id', verificarToken, permitirRol(['instructor']), Usuarios.eliminarUsuario);

module.exports = router;