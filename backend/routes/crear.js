const express = require('express');
const { leerTareas, guardarTareas } = require('../db');

const router = express.Router();

router.post('/', (req, res) => {
  const { titulo, descripcion, prioridad, fechaLimite } = req.body;

  let validar = null;
  try {
    validar = require('../validacion').validarTarea;
  } catch (e) {
    validar = null;
  }

  if (validar) {
    const error = validar(req.body);
    if (error) return res.status(400).json({ error });
  } else if (!titulo || !titulo.trim()) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  const tareas = leerTareas();
  const nueva = {
    id: Date.now(),
    titulo: titulo.trim(),
    descripcion: (descripcion || '').trim(),
    prioridad: prioridad || 'Media',
    fechaLimite: fechaLimite || '',
    completada: false
  };

  tareas.push(nueva);
  guardarTareas(tareas);
  res.status(201).json(nueva);
});

module.exports = router;