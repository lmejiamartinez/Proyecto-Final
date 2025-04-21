// controllers/ficha.controller.js
const { Ficha } = require('../Models');

//listar fichas
exports.listarFichas = async (req, res) => {
    try {
        const fichas = await Ficha.findAll();
        res.json(fichas);
    } catch (error) {
        res.status(500).json({ error: 'Error al listar las fichas' });
    }
};
//Llamar ficha por numero de programa
exports.listarFichasNum = async (req, res) => {
    try {
        const { num_programa } = req.query;

        // Si se proporciona el num_programa, filtrar las fichas por ese valor
        const filtros = num_programa ? { where: { num_programa } } : {};

        const fichas = await Ficha.findAll(filtros);
        res.json(fichas);
    } catch (error) {
        res.status(500).json({ error: 'Error al listar las fichas' });
    }
};

//Crear ficha
exports.crearFicha = async (req, res) => {
    try {
        const { num_programa, termino, fecha_inicio, fecha_fin } = req.body;
        const ficha = await Ficha.create({ num_programa, termino, fecha_inicio, fecha_fin });
        res.status(201).json(ficha);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la ficha' });
    }
};
