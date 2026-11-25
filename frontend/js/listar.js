let listaTareas = [];

function escapar(texto) {
  const div = document.createElement('div');
  div.textContent = texto || '';
  return div.innerHTML;
}

async function cargarTareas() {
  const params = new URLSearchParams({
    buscar: document.getElementById('buscar').value.trim(),
    estado: document.getElementById('filtroEstado').value,
    prioridad: document.getElementById('filtroPrioridad').value
  });

  try {
    const respuesta = await fetch(API + '?' + params.toString());
    listaTareas = await respuesta.json();
    renderizar();
  } catch (error) {
    mostrarMensaje('No se pudo conectar con el servidor', 'error');
  }
}

function renderizar() {
  const cuerpo = document.getElementById('cuerpoTabla');
  cuerpo.innerHTML = '';

  if (listaTareas.length === 0) {
    cuerpo.innerHTML = '<tr><td colspan="5">No hay tareas para mostrar</td></tr>';
  }

  listaTareas.forEach(function (t) {
    const fila = document.createElement('tr');
    fila.innerHTML =
      '<td>' + (t.completada ? 'Completada' : 'Pendiente') + '</td>' +
      '<td class="' + (t.completada ? 'completada' : '') + '">' +
        '<strong>' + escapar(t.titulo) + '</strong><br>' +
        '<small>' + escapar(t.descripcion) + '</small></td>' +
      '<td class="prioridad-' + t.prioridad + '">' + t.prioridad + '</td>' +
      '<td>' + (t.fechaLimite || '-') + '</td>' +
      '<td class="acciones" data-id="' + t.id + '"></td>';
    cuerpo.appendChild(fila);
  });

  const pendientes = listaTareas.filter(function (t) { return !t.completada; }).length;
  document.getElementById('contador').textContent =
    'Mostrando ' + listaTareas.length + ' tarea(s) - ' + pendientes + ' pendiente(s)';

  // Los botones de editar/eliminar los agregan las otras ramas
  if (typeof agregarBotonesActualizar === 'function') agregarBotonesActualizar();
  if (typeof agregarBotonesEliminar === 'function') agregarBotonesEliminar();
}

document.getElementById('buscar').addEventListener('input', cargarTareas);
document.getElementById('filtroEstado').addEventListener('change', cargarTareas);
document.getElementById('filtroPrioridad').addEventListener('change', cargarTareas);

cargarTareas();