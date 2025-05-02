// models/Notificacion.js

module.exports = (sequelize, DataTypes) => {
    const Notificaciones = sequelize.define('Notificaciones', {
        id_notificaciones: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'no leida'  // 'leida' o 'no_leida'
        },
        categoria: {
            type: DataTypes.ENUM('info', 'success', 'warning', 'error'),
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        mensaje: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'notificaciones',
        timestamps: false
    });

    // Relación con tabla usuarios
    Notificaciones.associate = (models) => {
        Notificaciones.belongsTo(models.Usuario, {
            foreignKey: 'id_usuario',
            as: 'usuarios'
        });
    };

    return Notificaciones;
};
