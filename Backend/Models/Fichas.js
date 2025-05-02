const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Ficha extends Model {
        static associate(models) {
            Ficha.hasMany(models.AprendizFicha, {
                foreignKey: 'id_ficha',
                as: 'aprendices_ficha'
                
            });
            Ficha.belongsTo(models.Usuario, {
                foreignKey: 'id_instructor',
                targetKey:'id_usuario'
                
            });
        }
    }

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
        termino: { // <<--- Confirmar que este es el campo del nombre del programa
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
        id_instructor: {
            type: DataTypes.INTEGER.UNSIGNED,
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