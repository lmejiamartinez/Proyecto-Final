const { AprendizFicha, Usuario, Ficha, Sequelize } = require('../Models'); // Importa Sequelize
exports.buscarPorUsuario = async (req, res) => {
    try {
        const ficha = await AprendizFicha.findOne({
            where: { id_usuario: req.params.id_usuario },
            include: [
                {
                    model: Usuario,
                    as: 'aprendiz',
                    attributes: ['nombre'],
                },
                {
                    model: Ficha,
                    as: 'ficha',
                    attributes: ['termino', 'num_programa'],
                },
            ],
        });

        if (!ficha) return res.status(404).json({ error: 'Ficha no encontrada' });

        res.json({
            id_ficha_aprendiz: ficha.id_ficha_aprendiz,
            nombre: ficha.aprendiz?.nombre ?? '',
            num_programa: ficha.ficha?.num_programa ?? '',
            termino: ficha.ficha?.termino ?? '',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar ficha' });
    }
};

exports.obtenerTodos = async (req, res) => {
    try {
        const visitas = await Visita.findAll({
            include: [
                {
                    model: AprendizFicha,
                    as: 'aprendiz_ficha',
                    include: [
                        {
                            model: Usuario,
                            as: 'aprendiz',
                            attributes: ['nombre', 'correo']
                        },
                        {
                            model: sequelize.models.Ficha,
                            as: 'ficha',
                            attributes: ['num_programa', 'termino'] 
                        }
                    ]
                },
                {
                    model: Usuario,
                    as: 'instructor',
                    attributes: ['nombre', 'correo']
                }
            ]
        });
        res.json(visitas);
    } catch (error) {
        console.error('Error al obtener agendamientos:', error);
        res.status(500).json({ error: 'Error al obtener agendamientos' });
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
exports.obtenerFichasIdAprendiz = async (req, res) => {
    const { idaprendiz } = req.params;
    try {
        const aprendizFicha = await AprendizFicha.findAll({
            where: { id_usuario: idaprendiz },
            include: [

                {
                    model: Ficha,
                    as: 'ficha',
                },
            ],
        });
        const fichas = aprendizFicha.map((fichaAprendiz) => {
            return fichaAprendiz.ficha
        }) ?? [];
        if (fichas) {
            res.status(200).json(fichas);
        } else {
            res.status(404).json({ error: 'Registro de AprendizFicha no encontrado.' });
        }
    } catch (error) {
        console.error('Error al obtener AprendizFicha por ID:', error);
        res.status(500).json({ error: 'Error al obtener el registro de AprendizFicha.' });
    }
};