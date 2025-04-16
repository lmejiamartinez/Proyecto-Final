const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Visita extends Model {
        static associate(models) {
            Visita.belongsTo(models.AprendizFicha, {
                foreignKey: 'id_ficha_aprendiz',
                //as: 'aprendiz_ficha'
            });

            Visita.belongsTo(models.Usuario, {
                foreignKey: 'id_instructor',
                //as: 'instructor'
            });
        }
    }

    Visita.init({
        id_visitas: {
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
            type: DataTypes.ENUM('Presencial', 'Virtual'),
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
    }, {
        sequelize,
        modelName: 'Visita',
        tableName: 'visitas',
        timestamps: true,
    });

    return Visita;
};
