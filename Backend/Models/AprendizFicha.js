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

            AprendizFicha.hasMany(models.Bitacora, {
                foreignKey: 'id_ficha_aprendiz',
                as: 'bitacoras'
            });

            AprendizFicha.hasMany(models.Documento, {
                foreignKey: 'id_ficha_aprendiz',
                as: 'documentos'
            });
        }
    }

    AprendizFicha.init({
        id_ficha_aprendiz: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        jefe_inmediato: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        alternativa_contrato: {
            type: DataTypes.STRING(100),
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
