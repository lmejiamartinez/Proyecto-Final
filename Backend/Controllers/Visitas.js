const { Visita, Usuario, AprendizFicha } = require('../Models');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const { Op } = require('sequelize');

exports.agendarVisita = async (req, res) => {
    try {
        const { fecha, motivo } = req.body;
        const { idUsuario } = req.usuario; // Suponiendo que tienes middleware de autenticación que añade el id del usuario al req

        if (!fecha || !motivo) {
            return res.status(400).json({ error: 'La fecha y el motivo son campos requeridos.' });
        }

        // Buscar la relación del aprendiz con la ficha activa
        const aprendizFicha = await AprendizFicha.findOne({
            where: {
                id_aprendiz: idUsuario,
                estado: 'Activo' // O el estado que indique la ficha activa
            }
        });

        if (!aprendizFicha) {
            return res.status(404).json({ error: 'No se encontró una ficha activa para este aprendiz.' });
        }

        // Aquí podrías buscar un instructor asignado a esta ficha si es necesario
        // const instructorAsignado = await Usuario.findOne({
        //     where: {
        //         rol: 'instructor',
        //         // ... tu lógica para encontrar el instructor asociado a la ficha
        //     }
        // });

        // if (!instructorAsignado) {
        //     return res.status(404).json({ error: 'No se encontró un instructor asignado a esta ficha.' });
        // }

        // Crear la nueva visita con la información disponible
        const nuevaVisita = await Visita.create({
            id_ficha_aprendiz: aprendizFicha.id_ficha_aprendiz,
            fecha: new Date(fecha), // Asegúrate de que la fecha se guarde correctamente
            motivo: motivo,
            // Puedes dejar estos campos nulos o con valores predeterminados si el instructor los asigna después
            hora_inicio: null,
            hora_fin: null,
            id_instructor: null, // O instructorAsignado.idUsuario si lo encontraste
            tipo: 'Solicitud', // O el tipo que corresponda
            estado: 'Pendiente' // Estado inicial de la solicitud
        });

        res.status(201).json({ mensaje: 'Solicitud de visita enviada correctamente.', visita: nuevaVisita });

    } catch (error) {
        console.error('Error al solicitar visita:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud de visita.' });
    }
};

exports.obtenerVisitas = async (req, res) => {
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
        res.status(500).json({ error: 'Error al obtener agendamientos' });
    }
};

exports.actualizarVisita = async (req, res) => {
    try {
        const { id_visitas } = req.params;
        const [actualizado] = await Visita.update(req.body, { where: { id_visitas } });

        if (actualizado) {
            const visitaActualizada = await Visita.findByPk(id_visitas);
            res.json(visitaActualizada);
        } else {
            res.status(404).json({ error: 'Visita no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar visita', error);
        res.status(500).json({ error: 'Error al actualizar visita' });
    }
};

exports.eliminarVisita = async (req, res) => {
    try {
        const { id_visitas } = req.params;
        const eliminado = await Visita.destroy({ where: { id_visitas } });

        if (eliminado) {
            res.json({ mensaje: 'Visita eliminada correctamente' });
        } else {
            res.status(404).json({ error: 'Visita no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar visita' });
    }
};

exports.generarReporteVisitas = async (req, res) => {
    try {
        const visitas = await Visita.findAll({
            include: [
                {
                    model: AprendizFicha,
                    as: 'aprendiz_ficha',
                    include: [{
                        model: Usuario,
                        as: 'aprendiz',
                        attributes: ['nombre', 'correo']
                    }]
                },
                {
                    model: Usuario,
                    as: 'instructor',
                    attributes: ['nombre', 'correo']
                }
            ],
            order: [['fecha', 'DESC']]
        });

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Reporte de Visitas');

        sheet.columns = [
            { header: 'Nombre Aprendiz', key: 'nombre_aprendiz', width: 30 },
            { header: 'Correo Aprendiz', key: 'correo_aprendiz', width: 30 },
            { header: 'Instructor', key: 'nombre_instructor', width: 30 },
            { header: 'Correo Instructor', key: 'correo_instructor', width: 30 },
            { header: 'Fecha Visita', key: 'fecha', width: 20 },
            { header: 'Hora Inicio', key: 'hora_inicio', width: 20 },
            { header: 'Hora Fin', key: 'hora_fin', width: 20 },
            { header: 'Tipo', key: 'tipo', width: 15 },
            { header: 'Estado', key: 'estado', width: 15 },
        ];

        visitas.forEach(v => {
            sheet.addRow({
                nombre_aprendiz: v.aprendiz_ficha?.aprendiz?.nombre || '',
                correo_aprendiz: v.aprendiz_ficha?.aprendiz?.correo || '',
                nombre_instructor: v.instructor?.nombre || '',
                correo_instructor: v.instructor?.correo || '',
                fecha: new Date(v.fecha).toLocaleString(),
                hora_inicio: new Date(v.hora_inicio).toLocaleTimeString(),
                hora_fin: new Date(v.hora_fin).toLocaleTimeString(),
                tipo: v.tipo,
                estado: v.estado
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename="reporte_visitas.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error('Error al generar el reporte de visitas:', error);
        res.status(500).json({ error: 'Error al generar el reporte de visitas' });
    }
};

exports.generarReporteVisitasPDF = async (req, res) => {
    try {
        const visitas = await Visita.findAll({
            include: [
                {
                    model: AprendizFicha,
                    as: 'aprendiz_ficha',
                    include: [{
                        model: Usuario,
                        as: 'aprendiz',
                        attributes: ['nombre', 'correo']
                    }]
                },
                {
                    model: Usuario,
                    as: 'instructor',
                    attributes: ['nombre', 'correo']
                }
            ],
            order: [['fecha', 'DESC']]
        });

        const doc = new PDFDocument({ margin: 30, size: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="reporte_visitas.pdf"');

        doc.pipe(res);

        doc.fontSize(18).text('Reporte de Visitas', { align: 'center' });
        doc.moveDown();

        visitas.forEach((v, index) => {
            doc.fontSize(12).text(`Visita #${index + 1}`);
            doc.text(`Aprendiz: ${v.aprendiz_ficha?.aprendiz?.nombre || 'N/A'} (${v.aprendiz_ficha?.aprendiz?.correo || ''})`);
            doc.text(`Instructor: ${v.instructor?.nombre || 'N/A'} (${v.instructor?.correo || ''})`);
            doc.text(`Fecha: ${new Date(v.fecha).toLocaleDateString()}`);
            doc.text(`Hora Inicio: ${new Date(v.hora_inicio).toLocaleTimeString()}`);
            doc.text(`Hora Fin: ${new Date(v.hora_fin).toLocaleTimeString()}`);
            doc.text(`Tipo: ${v.tipo}`);
            doc.text(`Estado: ${v.estado}`);
            doc.moveDown();
        });

        doc.end();

    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ error: 'Error al generar el PDF de visitas' });
    }
};
