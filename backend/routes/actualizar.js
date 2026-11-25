const express = require('express');
const { leerTareas, guardarTareas } = require('../db');

const router = express.Router();

router.put('/:id', (req, res) => {
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
  const indice = tareas.findIndex(function (t) {
    return t.id === Number(req.params.id);
  });
  if (indice === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

  tareas[indice].titulo = titulo.trim();
  tareas[indice].descripcion = (descripcion || '').trim();
  tareas[indice].prioridad = prioridad || tareas[indice].prioridad;
  tareas[indice].fechaLimite = fechaLimite || '';

  guardarTareas(tareas);
  res.json(tareas[indice]);
});

router.patch('/:id/completar', (req, res) => {
  const tareas = leerTareas();
  const tarea = tareas.find(function (t) {
    return t.id === Number(req.params.id);
  });
  if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

  tarea.completada = !tarea.completada;
  guardarTareas(tareas);
  res.json(tarea);
});

module.exports = router;