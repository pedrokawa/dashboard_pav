import { DataTable, type ColumnConfig } from "../components/DataTable";

interface Relatorio {
  id: number;
  data: string;
  trecho: string;
  equipe: string;
  toneladas: number;
  status: 'Concluído' | 'Em Andamento';
}

const relatoriosProducao: Relatorio[] = [
  { id: 1, data: '17/04/2026', trecho: 'BR-369 Km 15', equipe: 'Equipe Alpha', toneladas: 120, status: 'Concluído' },
  { id: 2, data: '16/04/2026', trecho: 'PR-445 Sul', equipe: 'Equipe Bravo', toneladas: 85, status: 'Concluído' },
  { id: 3, data: '15/04/2026', trecho: 'Av. Principal', equipe: 'Equipe Alpha', toneladas: 45, status: 'Em Andamento' },
  { id: 4, data: '14/04/2026', trecho: 'Rod. Variante', equipe: 'Equipe Charlie', toneladas: 210, status: 'Concluído' },
];

export const Relatorios = () => {

  const colunas: ColumnConfig<Relatorio>[] = [
    { key: 'data', label: 'Data' },
    { key: 'trecho', label: 'Trecho' },
    { key: 'equipe', label: 'Equipe' }, 
    { key: 'toneladas', label: 'Toneladas' },
    { 
      key: 'status',
      label: 'Status',
      align: 'center',
      render: (row) => (
        <span style={{
          padding: '0.25rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          fontWeight: '500',
          backgroundColor: row.status === 'Concluído' ? '#D1FAE5' : '#FEF3C7',
          color: row.status === 'Concluído' ? '#065F46' : '#92400E'
        }}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <>
    <div
    style={{ padding: '0.5rem 0.5rem', color: 'var(--texto-escuro)' }}
    >
      <h1 style={{ margin: '0 0 1.5rem 0', color: 'var(--texto-escuro)', fontSize: '1.8rem' }}>
        Relatório de Produção
      </h1>
      <DataTable columns={colunas} data={relatoriosProducao} />
    </div>  
    </>
  );
};