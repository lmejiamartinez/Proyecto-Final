const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Visita = sequelize.define('Visita', {
    id_visita: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_ficha_aprendiz: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },

    id_instructor: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },

    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    motivo: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM('Presencial', 'Virual'),
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('Pendiente', 'Aprobada', 'Cancelada'),
        allowNull: false,
    },
},
    {
        timestamps: true,
        tableName: 'visitas',

    });

module.exports = Visita;