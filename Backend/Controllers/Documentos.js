const { Documento, AprendizFicha } = require('../Models');

//Subir un documento

exports.crearDocumento = async (req, res) => {
    try {
        const { id_ficha_aprendiz, tipo_documento, fecha, descripcion, nombre, num_documento } = req.body;

        // Verificar si el id_ficha_aprendiz existe
        const fichaExiste = await AprendizFicha.findByPk(id_ficha_aprendiz);
        if (!fichaExiste) {
            return res.status(404).json({ mensaje: 'Ficha de aprendiz no encontrada' });
        }

        const nuevoDocumento = await Documento.create({
            id_ficha_aprendiz,
            tipo_documento,
            fecha,
            descripcion,
            nombre,
            num_documento
        });

        res.status(201).json(nuevoDocumento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el documento' });
    }
},

    //Obtener todos los documentos
    exports.obtenerDocumentos = async (req, res) => {
        try {
            const documentos = await Documento.findAll({
                include: [{ model: AprendizFicha, as: 'ficha_aprendiz' }]
            });
            res.status(200).json(documentos);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener documentos' });
        }
    },

    //Obtener un documento por ID
    exports.obtenerDocumentoPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const documento = await Documento.findByPk(id, {
                include: [{ model: AprendizFicha, as: 'ficha_aprendiz' }]
            });

            if (!documento) {
                return res.status(404).json({ mensaje: 'Documento no encontrado' });
            }

            res.status(200).json(documento);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al buscar el documento' });
        }
    },

    // Actualizar documento
    exports.actualizarDocumento = async (req, res) => {
        try {
            const { id } = req.params;
            const documento = await Documento.findByPk(id);

            if (!documento) {
                return res.status(404).json({ mensaje: 'Documento no encontrado' });
            }

            await documento.update(req.body);

            res.status(200).json({ mensaje: 'Documento actualizado', documento });
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al actualizar el documento' });
        }
    };

//Eliminar documento
exports.eliminarDocumento = async (req, res) => {
    try {
        const { id } = req.params;
        const documento = await Documento.findByPk(id);

        if (!documento) {
            return res.status(404).json({ mensaje: 'Documento no encontrado' });
        }

        await documento.destroy();

        res.status(200).json({ mensaje: 'Documento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el documento' });
    }
};