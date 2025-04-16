//App express
const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./Config/db');
const Rutas = require('./Routes/Rutas');
//Middlewares
app.use(express.json());

//Rutas
app.use('/api', Rutas);

//Probar la conexion
sequelize.authenticate()
    .then(() => console.log('Conexion a Base de Datos exitosa'))
    .catch(error => console.error('Error en la conexion a la Base de Datos', error));


//Sincronixzar modelos
sequelize.sync({ alter: true })
    .then(() => console.log('Modelos sincronizados'))
    .catch(err => console.error('Error al sincronizar modelos:', err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

