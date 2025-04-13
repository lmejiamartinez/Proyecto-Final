const {Sequelize} = require('sequelize');
require('dotenv').config();//Para leer el archivo .env

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:process.env.DB_DIALECT,
        logging:false, // Esto sirve para mostarr consultas sql en la consola las que se estan ejecutando
    }
);
module.exports = sequelize;