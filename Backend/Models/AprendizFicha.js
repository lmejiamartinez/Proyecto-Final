const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const AprendizFicha = sequelize.define('AprendizFicha', {
    id_ficha_aprendiz: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
    },
    id_ficha: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    id_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    id_empresa: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jefe_inmdediato: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alternativa_contrato: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'aprendiz_ficha',
});
AprendizFicha.associate = (models) => {
    AprendizFicha.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'aprendiz'
    });

    AprendizFicha.hasMany(models.Visita, {
        foreignKey: 'id_ficha_aprendiz',
        as: 'visitas'
    });
};


module.exports = AprendizFicha;
