const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Documento extends Model {
        static associate(models) {
            Documento.belongsTo(models.Usuario, {
                foreignKey: 'id_aprendiz',
                as: 'aprendiz'
            });

            Documento.belongsTo(models.AprendizFicha, {
                foreignKey: 'id_ficha_aprendiz',
                as: 'ficha'
            });
        }
    }

    Documento.init({
        id_documento: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        id_ficha_aprendiz: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        tipo_documento: {
            type: DataTypes.ENUM('CC', 'TI', 'CE'),
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        num_documento: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Documento',
        tableName: 'documentos',
        timestamps: true,
    });

    return Documento;
};
