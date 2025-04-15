const Sequelize = require('sequelize');
const sequelize = require('../Config/db');

const db = {};

// Importar modelos
db.Usuario = require('./Usuarios')(sequelize, Sequelize.DataTypes);
db.AprendizFicha = require('./AprendizFicha');
db.Visita = require('./Visitas');

// Aquí es donde se conectan las asociaciones
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);  // Pasa todos los modelos a cada uno
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
