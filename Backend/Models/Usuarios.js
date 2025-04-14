const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Usuario = sequelize.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    tipo_documento: {
        type: DataTypes.ENUM('CC', 'TI', 'CE'),
        allowNull: false,
        defaultValue: 'CC',
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    clave: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    identificacion: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM('Aprendiz', 'Instructor'),
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'usuarios',
});

module.exports = Usuario;