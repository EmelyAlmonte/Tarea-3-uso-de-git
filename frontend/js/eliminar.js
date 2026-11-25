
async function eliminarTarea(id) {
  if (!confirm('¿Seguro que deseas eliminar esta tarea?')) return;

  try {
    const respuesta = await fetch(API + '/' + id, { method: 'DELETE' });
    const resultado = await respuesta.json();
    if (!respuesta.ok) throw new Error(resultado.error || 'Error al eliminar la tarea');
    mostrarMensaje('Tarea eliminada correctamente', 'ok');
    cargarTareas();
  } catch (error) {
    mostrarMensaje(error.message, 'error');
  }
}

async function eliminarCompletadas() {
  if (!confirm('¿Eliminar todas las tareas completadas?')) return;

  try {
    const respuesta = await fetch(API + '/completadas/todas', { method: 'DELETE' });
    const resultado = await respuesta.json();
    if (!respuesta.ok) throw new Error(resultado.error || 'Error al eliminar');
    mostrarMensaje(resultado.eliminadas + ' tarea(s) completada(s) eliminada(s)', 'ok');
    cargarTareas();
  } catch (error) {
    mostrarMensaje(error.message, 'error');
  }
}

function agregarBotonesEliminar() {
  document.querySelectorAll('td.acciones').forEach(function (celda) {
    const id = Number(celda.dataset.id);

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.className = 'peligro';
    btnEliminar.style.marginTop = '0';
    btnEliminar.addEventListener('click', function () { eliminarTarea(id); });

    celda.appendChild(btnEliminar);
  });
}

document.getElementById('btnLimpiar').addEventListener('click', eliminarCompletadas);