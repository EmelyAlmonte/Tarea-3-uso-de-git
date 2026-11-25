
async function actualizarTarea(id, datos) {
  const respuesta = await fetch(API + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  const resultado = await respuesta.json();
  if (!respuesta.ok) throw new Error(resultado.error || 'Error al actualizar la tarea');
  return resultado;
}

async function alternarCompletada(id) {
  try {
    const respuesta = await fetch(API + '/' + id + '/completar', { method: 'PATCH' });
    if (!respuesta.ok) throw new Error('No se pudo cambiar el estado');
    cargarTareas();
  } catch (error) {
    mostrarMensaje(error.message, 'error');
  }
}

function editarTarea(id) {
  const tarea = listaTareas.find(function (t) { return t.id === id; });
  if (!tarea) return;

  document.getElementById('tareaId').value = tarea.id;
  document.getElementById('titulo').value = tarea.titulo;
  document.getElementById('descripcion').value = tarea.descripcion;
  document.getElementById('prioridad').value = tarea.prioridad;
  document.getElementById('fechaLimite').value = tarea.fechaLimite;
  document.getElementById('btnGuardar').textContent = 'Actualizar tarea';
  document.getElementById('btnCancelar').classList.remove('oculto');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function agregarBotonesActualizar() {
  document.querySelectorAll('td.acciones').forEach(function (celda) {
    const id = Number(celda.dataset.id);
    const tarea = listaTareas.find(function (t) { return t.id === id; });

    const btnCompletar = document.createElement('button');
    btnCompletar.textContent = tarea && tarea.completada ? 'Reabrir' : 'Completar';
    btnCompletar.className = 'secundario';
    btnCompletar.addEventListener('click', function () { alternarCompletada(id); });

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', function () { editarTarea(id); });

    celda.appendChild(btnEditar);
    celda.appendChild(btnCompletar);
  });
}

document.getElementById('btnCancelar').addEventListener('click', limpiarFormulario);