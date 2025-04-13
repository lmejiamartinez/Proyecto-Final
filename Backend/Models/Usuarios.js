const {DataTypes} = require('sequelize');
const sequelize = require('../Config/db');

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    estado:{
        type:DataTypes.TINYINT,
        allowNull:false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    tipo_documento:{
        type:DataTypes.ENUM('CC','TI','CE'),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    identificacion:{
        type:DataTypes.BIGINT,
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM('Aprendiz', 'Instructor'),
    },
}, {

    timestamps: true,
    tableName:'usuarios',
});

module.exports = Usuario;