const PRIORIDADES = ['Baja', 'Media', 'Alta'];

function validarTarea(datos) {
  const { titulo, descripcion, prioridad, fechaLimite } = datos;

  if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
    return 'El título es obligatorio';
  }
  if (titulo.trim().length < 3) {
    return 'El título debe tener al menos 3 caracteres';
  }
  if (titulo.trim().length > 60) {
    return 'El título no puede superar los 60 caracteres';
  }
  if (descripcion && descripcion.length > 200) {
    return 'La descripción no puede superar los 200 caracteres';
  }
  if (prioridad && !PRIORIDADES.includes(prioridad)) {
    return 'La prioridad debe ser Baja, Media o Alta';
  }
  if (fechaLimite) {
    const fecha = new Date(fechaLimite);
    if (isNaN(fecha.getTime())) {
      return 'La fecha límite no es válida';
    }
  }
  return null;
}

module.exports = { validarTarea };