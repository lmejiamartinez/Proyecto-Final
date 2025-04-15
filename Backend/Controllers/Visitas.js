const { Visita, Usuario, AprendizFicha } = require('../Models');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const { Op } = require('sequelize');

exports.agendarVisita = async (req, res) => {
    try {
        const { id_ficha_aprendiz, fecha, hora_inicio, hora_fin } = req.body;

        // Buscar conflictos
        const conflicto = await Visita.findOne({
            where: {
                id_ficha_aprendiz,
                fecha,
                [Op.or]: [
                    {
                        hora_inicio: { [Op.between]: [hora_inicio, hora_fin] }
                    },
                    {
                        hora_fin: { [Op.between]: [hora_inicio, hora_fin] }
                    },
                    {
                        [Op.and]: [
                            { horaInicio: { [Op.lte]: horaInicio } },
                            { horaFin: { [Op.gte]: horaFin } }
                        ]
                    }
                ]
            }
        });

        if (conflicto) {
            return res.status(400).json({ error: 'Conflicto de horario detectado para el aprendiz' });
        }

        // Agendar si no hay conflicto
        const nuevaVisita = await Visita.create(req.body);
        res.status(201).json(nuevaVisita);
    } catch (error) {
        console.error('Error al agendar visita:', error);
        res.status(500).json({ error: 'Error al agendar visita' });
    }
};

// Obtener todas las visitas agendadas
exports.obtenerVisitas = async (req, res) => {
    try {
        const visitas = await Visita.findAll();
        res.json(visitas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener agendamientos' });
    }
};

// Actualizar visita
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

// Eliminar visita
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

// Generar reporte de visitas en Excel
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
                fecha: v.fecha,
                hora_inicio: v.hora_inicio,
                hora_fin: v.hora_fin,
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


// Generar reporte de visitas en PDF
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
            doc.text(`Fecha: ${v.fecha}`);
            doc.text(`Hora Inicio: ${v.hora_inicio}`);
            doc.text(`Hora Fin: ${v.hora_fin}`);
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
