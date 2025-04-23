const { AprendizFicha, Usuario, Ficha, Sequelize } = require('../Models'); // Importa Sequelize

exports.obtenerTodos = async (req, res) => {
    try {
        const aprendicesFicha = await AprendizFicha.findAll({
            include: [
                {
                    model: Usuario,
                    as: 'aprendiz',
                    attributes: ['id_usuario', 'nombre', 'rol', 'email'],
                    where: {
                        rol: 'aprendiz'
                    },
                    required: true
                },
                {
                    model: Ficha,
                    as: 'ficha',
                    attributes: ['id_ficha', 'nombre_ficha', 'codigo_programa'],
                },
            ],
        });
        res.status(200).json(aprendicesFicha);
    } catch (error) {
        console.error('Error al obtener aprendices y fichas:', error);
        res.status(500).json({ error: 'Error al obtener los datos de aprendices y fichas.' });
    }
};

exports.obtenerPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const aprendizFicha = await AprendizFicha.findByPk(id, {
            include: [
                {
                    model: Usuario,
                    as: 'aprendiz',
                    attributes: ['id_usuario', 'nombre', 'rol', 'email'],
                    where: {
                        rol: 'aprendiz'
                    },
                    required: true
                },
                {
                    model: Ficha,
                    as: 'ficha',
                    attributes: ['id_ficha', 'nombre_ficha', 'codigo_programa'],
                },
            ],
        });

        if (aprendizFicha) {
            res.status(200).json(aprendizFicha);
        } else {
            res.status(404).json({ error: 'Registro de AprendizFicha no encontrado.' });
        }
    } catch (error) {
        console.error('Error al obtener AprendizFicha por ID:', error);
        res.status(500).json({ error: 'Error al obtener el registro de AprendizFicha.' });
    }
};

exports.crear = async (req, res) => {
    try {
        const nuevoAprendizFicha = await AprendizFicha.create(req.body);
        res.status(201).json(nuevoAprendizFicha);
    } catch (error) {
        console.error('Error al crear AprendizFicha:', error);
        res.status(500).json({ error: 'Error al crear el registro de AprendizFicha.' });
    }
};

exports.actualizar = async (req, res) => {
    const { id } = req.params;
    try {
        const [filasActualizadas] = await AprendizFicha.update(req.body, {
            where: { id_ficha_aprendiz: id },
        });

        if (filasActualizadas > 0) {
            const aprendizFichaActualizado = await AprendizFicha.findByPk(id, {
                include: [
                    {
                        model: Usuario,
                        as: 'aprendiz',
                        attributes: ['id_usuario', 'nombre', 'rol', 'email'],
                        where: {
                            rol: 'aprendiz'
                        },
                        required: true
                    },
                    {
                        model: Ficha,
                        as: 'ficha',
                        attributes: ['id_ficha', 'nombre_ficha', 'codigo_programa'],
                    },
                ],
            });
            res.status(200).json(aprendizFichaActualizado);
        } else {
            res.status(404).json({ error: 'Registro de AprendizFicha no encontrado.' });
        }
    } catch (error) {
        console.error('Error al actualizar AprendizFicha:', error);
        res.status(500).json({ error: 'Error al actualizar el registro de AprendizFicha.' });
    }
};

exports.eliminar = async (req, res) => {
    const { id } = req.params;
    try {
        const filasEliminadas = await AprendizFicha.destroy({
            where: { id_ficha_aprendiz: id },
        });

        if (filasEliminadas > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Registro de AprendizFicha no encontrado.' });
        }
    } catch (error) {
        console.error('Error al eliminar AprendizFicha:', error);
        res.status(500).json({ error: 'Error al eliminar el registro de AprendizFicha.' });
    }
};