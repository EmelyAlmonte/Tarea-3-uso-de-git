const fs = require('fs');
const path = require('path');

const archivo = path.join(__dirname, 'tareas.json');

function leerTareas() {
  if (!fs.existsSync(archivo)) {
    fs.writeFileSync(archivo, '[]');
  }
  const contenido = fs.readFileSync(archivo, 'utf-8');
  return JSON.parse(contenido || '[]');
}

function guardarTareas(tareas) {
  fs.writeFileSync(archivo, JSON.stringify(tareas, null, 2));
}

module.exports = { leerTareas, guardarTareas };