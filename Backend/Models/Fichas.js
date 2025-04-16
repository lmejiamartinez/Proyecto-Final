const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Ficha extends Model { }

    Ficha.init({
        id_ficha: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        num_programa: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        termino: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Ficha',
        tableName: 'fichas',
        timestamps: true,
    });

    return Ficha;
};
