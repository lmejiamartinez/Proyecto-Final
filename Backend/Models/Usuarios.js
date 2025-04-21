const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        static associate(models) {
            Usuario.hasMany(models.Visita, {
                foreignKey: 'id_instructor',
                as: 'visitas_asignadas'
            });
        }
    }

    Usuario.init({
        id_usuario: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        estado: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        tipo_documento: {
            type: DataTypes.ENUM('CC', 'TI', 'CE'),
            allowNull: false,
            defaultValue: 'CC',
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,  // Esto asegura que el campo sea único
            validate: {
                isEmail: true  // Validación para asegurar que sea un correo válido
            }
        },
        clave: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        identificacion: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        rol: {
            type: DataTypes.ENUM('Aprendiz', 'Instructor'),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: true,
    });

    return Usuario;
};
