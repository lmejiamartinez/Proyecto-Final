const Sequelize = require('sequelize');
const sequelize = require('../Config/db');

const db = {};

db.Usuario = require('./Usuarios')(sequelize, Sequelize.DataTypes);
db.AprendizFicha = require('./AprendizFicha')(sequelize, Sequelize.DataTypes);
db.Visita = require('./Visitas')(sequelize, Sequelize.DataTypes);
db.Ficha = require('./Fichas')(sequelize, Sequelize.DataTypes);
db.Notificaciones = require('./Notificaciones')(sequelize, Sequelize.DataTypes);
db.Bitacora = require('./Bitacoras')(sequelize, Sequelize.DataTypes);
db.Documento = require('./Documentos')(sequelize, Sequelize.DataTypes);

// Asociaciones
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
