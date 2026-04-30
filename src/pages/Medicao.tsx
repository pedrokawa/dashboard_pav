import { Tabs, type TabItem } from '../components/Tabs';
import { Button } from '@mui/material';
// import { DataTable, type ColumnConfig } from "../components/DataTable";
// // import { useState } from 'react';
// interface Producao {
//   data: string;
//   rodovia: string;
//   kmini: string;
//   kmfim: string;
//   extensao: number;
//   pista: string;
//   faixa: string;
//   largura: number;
//   producao: number;
// }

export const Medicao = () => {

  // const [medicao, setMedicao] = useState<Producao[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [termoBusca, setTermoBusca] = useState('');

  // const colunas: ColumnConfig<Veiculo>[] = [
  //       { key: 'codigoFrota', label: 'Cód. Frota', align: 'left' },
  //       { key: 'placa', label: 'Placa', align: 'left' },
  //       { 
  //       key: 'modelo', 
  //       label: 'Marca/Modelo',
  //       align: 'left', 
  //       // Um truque legal: juntar Marca e Modelo na mesma coluna para ficar mais limpo!
  //       render: (row) => `${row.marca} ${row.modelo}` 
  //       },
  //       { key: 'anoModelo', label: 'Ano', align: 'left' },
  //       { key: 'combustivel', label: 'Combustível', align: 'left' },
  //       { 
  //       key: 'status', 
  //       label: 'Status', 
  //       align: 'left',
  //       render: (row) => (
  //           <span style={{
  //           padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '500',
  //           backgroundColor: row.status === 'Ativo' || row.status === 'Inativo' ? '#D1FAE5' : '#FEE2E2',
  //           color: row.status === 'Ativo' || row.status === 'Inativo' ? '#065F46' : '#991B1B'
  //           }}>
  //           {row.status || 'Desconhecido'}
  //           </span>
  //       )
  //       }
  // ];

  const myAbas: TabItem[] = [
    {
      id: 'producao',
      label: 'Produção MRAF',
      // Aqui dentro você coloca a tabela inteira!
      content: 
      <>
      <div style={{
        display: 'flex',
        justifyContent: 'end'
        }}>
        {/* <h1>Em breve: Produção Diária</h1> */}
        <Button 
        variant="contained" 
        color="primary"
        // // startIcon={}
        // onClick={onClick}
        // disabled={disabled}
        sx={{
          textTransform: 'none',
          borderRadius: '0.5rem',
          fontWeight: 500,
          backgroundColor: '#e67e22',
          borderColor: '#E5E7EB',
          color: '#ffffff',
          width: '11rem',
          height: '2.8rem',
          fontSize: '1rem'}}
        >Importar Produção
        </Button>
      </div>

      {/* <div>
        <DataTable></DataTable>
      </div> */}
          
      </>
    },
    {
      id: 'emulsao',
      label: 'Emulsão',
      content: <div>Em breve: Gráficos de consumo por motorista vão entrar aqui!</div>
    },
    {
      id: 'agregados',
      label: 'Agregados',
      // Aqui dentro você coloca a tabela inteira!
      content: <div>Em breve: Gráficos de consumo por motorista vão entrar aqui!</div>
    },
    {
      id: 'consumo',
      label: 'Consumo da Obra',
      content: <div>Em breve: Gráficos de consumo por motorista vão entrar aqui!</div>
    },
    {
      id: 'equipe',
      label: 'Equipe',
      // Aqui dentro você coloca a tabela inteira!
      content: <div>Em breve: Gráficos de consumo por motorista vão entrar aqui!</div>
    },
    {
      id: 'Equipamentos',
      label: 'Equipamentos',
      content: <div>Em breve: Gráficos de consumo por motorista vão entrar aqui!</div>
    }    
    

  ]

  return (
    <>
    <div
    style={{ padding: '0.5rem 0.5rem', color: 'var(--texto-escuro)' }}
    > 
      
      <h1 style={{ margin: '0 0 1.5rem 0', color: 'var(--texto-escuro)', fontSize: '1.8rem' }}>
        Medição
      </h1>

      <div>
        <Tabs tabs={myAbas} />
      </div>
      {/* <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 250px', backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: 0, color: 'var(--texto-mutado)', fontSize: '0.9rem' }}>Estamos na medição</h3>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--texto-escuro)' }}>4</p>
        </div>
        <div style={{ flex: '1 1 250px', backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: 0, color: 'var(--texto-mutado)', fontSize: '0.9rem' }}>Período</h3>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--status-sucesso)' }}>11/04/2026 a 10/05/2026</p>
        </div> */}
      {/* </div> */}
    </div>  
    </>
  );
};