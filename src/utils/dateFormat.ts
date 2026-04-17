export const dateFormat = (dataIso: string): string => {
  if (!dataIso) return '-'; 

  const data = new Date(dataIso);

  return data.toLocaleDateString('pt-BR', {
    timeZone: 'UTC'
  });
};