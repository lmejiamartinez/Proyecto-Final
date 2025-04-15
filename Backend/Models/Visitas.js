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
    hora_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    hora_fin: {
        type: DataTypes.DATE,
        allowNull: false,
    }
},
    {
        timestamps: true,
        tableName: 'visitas',
    });
Visita.associate = (models) => {
    Visita.belongsTo(models.AprendizFicha, {
        foreignKey: 'id_ficha_aprendiz',
        as: 'aprendiz_ficha'
    });

    Visita.belongsTo(models.Usuario, {
        foreignKey: 'id_instructor',
        as: 'instructor'
    });
};
module.exports = Visita;