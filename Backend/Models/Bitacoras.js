const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bitacora extends Model {
    static associate(models) {
      Bitacora.belongsTo(models.AprendizFicha, {
        foreignKey: 'id_ficha_aprendiz',
        as: 'ficha_aprendiz',
      });
    }
  }

  Bitacora.init({
    id_bitacoras: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_ficha_aprendiz: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
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
    num_bitacora:{
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    archivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Bitacora',
    tableName: 'bitacoras',
    timestamps: true

  });

  return Bitacora;
};
