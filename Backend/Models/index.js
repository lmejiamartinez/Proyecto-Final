const Sequelize = require('sequelize');
const sequelize = require('../Config/db');

const db = {};

// Importar modelos
db.Usuario = require('./Usuarios')(sequelize, Sequelize.DataTypes);
db.AprendizFicha = require('./AprendizFicha')(sequelize, Sequelize.DataTypes);
db.Visita = require('./Visitas')(sequelize, Sequelize.DataTypes);

// Aquí es donde se conectan las asociaciones
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);  // Pasa todos los modelos a cada uno
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
