/**
 * Genera el mensaje de WhatsApp según el motivo del contacto
 */

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '';

export function getWhatsAppUrl(message) {
  if (!WA_NUMBER) return null;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WA_NUMBER.replace(/\D/g, '')}?text=${encoded}`;
}

export function hasWhatsAppConfigured() {
  return Boolean(WA_NUMBER);
}

export function buildRenovarMessage(data) {
  const lines = [
    '🔄 *Consulta: Renovar mi cocina*',
    '',
    `• Medidas aprox: ${data.medidas || 'No especificado'}`,
    `• Estado actual: ${data.estadoActual || 'No especificado'}`,
    `• Zona: ${data.zona || 'No especificado'}`,
    `• Presupuesto: ${data.presupuesto || 'No especificado'}`,
    `• Urgencia: ${data.urgencia || 'No especificado'}`,
  ];
  if (data.linkOpcional) lines.push(`• Link/ref: ${data.linkOpcional}`);
  if (data.mensaje) lines.push('', `Mensaje: ${data.mensaje}`);
  return lines.join('\n');
}

export function buildDesdeCeroMessage(data) {
  const lines = [
    '🏠 *Consulta: Cocina desde cero*',
    '',
    `• Tipo de cocina: ${data.tipoCocina || 'No especificado'}`,
    `• Medidas aprox: ${data.medidas || 'No especificado'}`,
    `• Materiales preferidos: ${data.materiales || 'No especificado'}`,
    `• Zona: ${data.zona || 'No especificado'}`,
    `• Presupuesto: ${data.presupuesto || 'No especificado'}`,
    `• Fecha deseada: ${data.fechaDeseada || 'No especificado'}`,
  ];
  if (data.mensaje) lines.push('', `Mensaje: ${data.mensaje}`);
  return lines.join('\n');
}

export function buildConsultaMessage(data) {
  const lines = [
    '📩 *Consulta general*',
    '',
    `• Nombre: ${data.nombre || 'No especificado'}`,
    `• Zona: ${data.zona || 'No especificado'}`,
  ];
  if (data.mensaje) lines.push('', `Mensaje: ${data.mensaje}`);
  return lines.join('\n');
}

export function buildProyectoSimilarMessage(projectTitle) {
  return `Hola, me interesa un proyecto similar al que vi en su web: *${projectTitle}*. ¿Podrían cotizarme?`;
}
