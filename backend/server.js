const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PUERTO = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'frontend')));

const rutas = ['crear', 'listar', 'actualizar', 'eliminar'];

rutas.forEach(function (nombre) {
  try {
    app.use('/api/tareas', require('./routes/' + nombre));
    console.log('Ruta cargada: ' + nombre);
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
    console.log('Ruta pendiente: ' + nombre);
  }
});

app.listen(PUERTO, function () {
  console.log('Servidor en http://localhost:' + PUERTO);
});