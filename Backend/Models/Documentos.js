const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Documento extends Model {
        static associate(models) {
            Documento.belongsTo(models.AprendizFicha, {
                foreignKey: 'id_ficha_aprendiz',
                as: 'ficha',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
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
            references: {
                model: 'aprendiz_ficha',
                key: 'id_ficha_aprendiz'
            }
        },
        nombre: { // aquí va "Carta Laboral"
            type: DataTypes.STRING(100),
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
        archivo: { // aquí va el archivo físico
            type: DataTypes.STRING,
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
