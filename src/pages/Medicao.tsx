import { Tabs, type TabItem } from '../components/Tabs';

export const Medicao = () => {
  const myAbas: TabItem[] = [
    {
      id: 'producao',
      label: 'Produção MRAF',
      // Aqui dentro você coloca a tabela inteira!
      // content: <DataTable columns={colunas} data={abastecimentosFiltrados} /> 
    },
    {
      id: 'emulsao',
      label: 'Emulsão',
      // content: <div>Em breve: Gráficos de consumo por motorista vão entrar aqui!</div>
    },
    {
      id: 'agregados',
      label: 'Agregados',
      // Aqui dentro você coloca a tabela inteira!
      // content: <DataTable columns={colunas} data={abastecimentosFiltrados} /> 
    },
    {
      id: 'consumo',
      label: 'Consumo da Obra',
      // content: <div>Em breve: Gráficos de consumo por motorista vão entrar aqui!</div>
    },
    {
      id: 'equipe',
      label: 'Equipe',
      // Aqui dentro você coloca a tabela inteira!
      // content: <DataTable columns={colunas} data={abastecimentosFiltrados} /> 
    },
    {
      id: 'Equipamentos',
      label: 'Equipamentos',
      // content: <div>Em breve: Gráficos de consumo por motorista vão entrar aqui!</div>
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