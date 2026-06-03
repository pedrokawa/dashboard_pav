export const dateFormat = (dataIso: string): string => {
  if (!dataIso) return '-'; 

  // 1. Se já vier com barra (seus testes antigos), devolve direto
  if (dataIso.includes('/')) return dataIso;

  try {
    // 2. Corta o fuso horário fora se ele existir (o "T")
    const apenasData = dataIso.split('T')[0]; 
    
    // 3. Fatiamos pelo traço: [0] = Ano, [1] = Mês, [2] = Dia
    const [ano, mes, dia] = apenasData.split('-');

    // 4. Montamos na mão, garantindo que o dia sempre venha primeiro
    if (ano && mes && dia) {
      return `${dia}/${mes}/${ano}`;
    }

    return dataIso; // Fallback de segurança
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return dataIso;
  }
};