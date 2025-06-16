const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        static associate(models) {
            Usuario.hasMany(models.Visita, {
                foreignKey: 'id_instructor',
                as: 'visitas'
            });

            Usuario.hasMany(models.AprendizFicha, {
                foreignKey: 'id_usuario',
                as: 'aprendiz_ficha'
            });

            Usuario.hasMany(models.Ficha, {
                foreignKey: 'id_instructor',
                as: 'fichas' 
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
            unique: true,
            validate: {
                isEmail: true
            }
        },
        clave: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        identificacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rol: {
            type: DataTypes.ENUM('Aprendiz', 'Instructor', 'Administrador'),
            allowNull: false,
        },
        reset_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        token_expiracion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: true,
    });

    return Usuario;
};
