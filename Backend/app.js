//App express
const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./Config/db');
const usuarioRoutes = require('./Routes/Usuarios');
const visitasRoutes = require('./Routes/Visitas');
//Middlewares
app.use(express.json());

//Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/visitas', visitasRoutes);

//Probar la conexion
sequelize.authenticate()
    .then(() => console.log('Conexion a Base de Datos exitosa'))
    .catch(error => console.error('Error en la conexion a la Base de Datos', error));


//Sincronixzar modelos
sequelize.sync({ alter: true })
    .then(() => console.log('Modelos sincronizados'))
    .catch(err => console.error('Error al sincronizar modelos:', err));

module.exports = app;