const API = '/api/tareas';

function mostrarMensaje(texto, tipo) {
  const caja = document.getElementById('mensaje');
  caja.textContent = texto;
  caja.className = 'mensaje ' + tipo;
  setTimeout(function () { caja.className = 'mensaje oculto'; }, 3000);
}

function leerFormulario() {
  return {
    titulo: document.getElementById('titulo').value.trim(),
    descripcion: document.getElementById('descripcion').value.trim(),
    prioridad: document.getElementById('prioridad').value,
    fechaLimite: document.getElementById('fechaLimite').value
  };
}

function limpiarFormulario() {
  document.getElementById('formTarea').reset();
  document.getElementById('tareaId').value = '';
  document.getElementById('btnGuardar').textContent = 'Guardar tarea';
  document.getElementById('btnCancelar').classList.add('oculto');
}

async function crearTarea(datos) {
  const respuesta = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  const resultado = await respuesta.json();
  if (!respuesta.ok) throw new Error(resultado.error || 'Error al crear la tarea');
  return resultado;
}

document.getElementById('formTarea').addEventListener('submit', async function (e) {
  e.preventDefault();
  const datos = leerFormulario();
  const id = document.getElementById('tareaId').value;

  try {
    if (id && typeof actualizarTarea === 'function') {
      await actualizarTarea(Number(id), datos);
      mostrarMensaje('Tarea actualizada correctamente', 'ok');
    } else {
      await crearTarea(datos);
      mostrarMensaje('Tarea creada correctamente', 'ok');
    }
    limpiarFormulario();
    if (typeof cargarTareas === 'function') cargarTareas();
  } catch (error) {
    mostrarMensaje(error.message, 'error');
  }
});