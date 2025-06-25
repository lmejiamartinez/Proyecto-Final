// App.js
const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./Config/db');
const Rutas = require('./Routes/Rutas');
const cors = require('cors');
const path = require('path');

const cookiesParse = require('cookie-parser');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

//Configuracion para aceptar cookies
app.use(cookiesParse());

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
// Rutas
app.use('/api', Rutas);
// Probar la conexión
sequelize
    .authenticate()
    .then(() => console.log('Conexión a la Base de Datos exitosa'))
    .catch((error) =>
        console.error('Error en la conexión a la Base de Datos', error)
    );

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
