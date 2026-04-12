const agora = new Date();

// Data de hoje no fuso de São Paulo no formato YYYY-MM-DD
const dataHoje = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'America/Sao_Paulo',
}).format(agora);

// Dia da semana de hoje no fuso de São Paulo
let diaSemanaHoje = agora.toLocaleDateString('pt-BR', {
  weekday: 'long',
  timeZone: 'America/Sao_Paulo',
}).toLowerCase();

diaSemanaHoje = diaSemanaHoje
  .replace('-feira', '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

// Função para normalizar texto
function normalizar(valor) {
  return String(valor || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

return items.map(item => {
  const row = item.json;

  const ativo = normalizar(row.ATIVO).toUpperCase();
  const diaSemana = normalizar(row.DIA_SEMANA);
  const ultimoEnvio = String(row.ULTIMO_ENVIO || '').trim();

  const enviarHoje =
    ativo === 'SIM' &&
    diaSemana === diaSemanaHoje &&
    ultimoEnvio !== dataHoje;

  return {
    json: {
      ...row,
      data_hoje: dataHoje,
      dia_semana_hoje: diaSemanaHoje,
      enviar_hoje: enviarHoje,
    },
  };
});
