// DELETE: DELETE /api/tareas/:id  y  DELETE /api/tareas (solo completadas)
const express = require('express');
const { leerTareas, guardarTareas } = require('../db');

const router = express.Router();

router.delete('/completadas/todas', (req, res) => {
  const tareas = leerTareas();
  const restantes = tareas.filter(function (t) { return !t.completada; });
  const eliminadas = tareas.length - restantes.length;

  guardarTareas(restantes);
  res.json({ mensaje: 'Tareas completadas eliminadas', eliminadas: eliminadas });
});

router.delete('/:id', (req, res) => {
  const tareas = leerTareas();
  const indice = tareas.findIndex(function (t) {
    return t.id === Number(req.params.id);
  });
  if (indice === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

  const eliminada = tareas.splice(indice, 1)[0];
  guardarTareas(tareas);
  res.json({ mensaje: 'Tarea eliminada', tarea: eliminada });
});

module.exports = router;