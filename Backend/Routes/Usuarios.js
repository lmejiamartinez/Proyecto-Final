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
router.get('/', permitirRol(['instructor']), Usuarios.obtenerUsuarios)

//Obtener un usuario ID
router.get('/:id', Usuarios.obtenerUsuario);

//Crear un nuevo usuario (registrarse)
router.post('/', Usuarios.crearUsuario)

//Actualizar usuario por ID
router.put('/:id', Usuarios.actualizarUsuario);

//Eliminar usuario (solo instructor)
router.delete('/:id', permitirRol(['instructor']), Usuarios.eliminarUsuario);

module.exports = router;