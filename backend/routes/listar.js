const express = require('express');
const { leerTareas } = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const { buscar, estado, prioridad } = req.query;
  let tareas = leerTareas();

  if (buscar) {
    const texto = buscar.toLowerCase();
    tareas = tareas.filter(function (t) {
      return t.titulo.toLowerCase().includes(texto);
    });
  }

  if (estado === 'pendientes') {
    tareas = tareas.filter(function (t) { return !t.completada; });
  } else if (estado === 'completadas') {
    tareas = tareas.filter(function (t) { return t.completada; });
  }

  if (prioridad && prioridad !== 'todas') {
    tareas = tareas.filter(function (t) { return t.prioridad === prioridad; });
  }

  res.json(tareas);
});

router.get('/:id', (req, res) => {
  const tarea = leerTareas().find(function (t) {
    return t.id === Number(req.params.id);
  });
  if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(tarea);
});

module.exports = router;