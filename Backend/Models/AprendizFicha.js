const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AprendizFicha extends Model {
        static associate(models) {
            AprendizFicha.belongsTo(models.Usuario, {
                foreignKey: 'id_usuario',
                as: 'aprendiz'

            });
            AprendizFicha.hasMany(models.Visita, {
                foreignKey: 'id_ficha_aprendiz',
                as: 'visitas'
            });
            AprendizFicha.belongsTo(models.Ficha, {
                foreignKey: 'id_ficha',
                as: 'ficha'
            });
        }
    }

    AprendizFicha.init({
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
        sequelize,
        modelName: 'AprendizFicha',
        tableName: 'aprendiz_ficha',
        timestamps: true,
    });

    return AprendizFicha;
};
