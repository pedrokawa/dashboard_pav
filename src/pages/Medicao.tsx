export const Medicao = () => {
  return (
    <>
    <div
    style={{ padding: '0.5rem 0.5rem', color: 'var(--texto-escuro)' }}
    >
      <h1 style={{ margin: '0 0 1.5rem 0', color: 'var(--texto-escuro)', fontSize: '1.8rem' }}>
        Visão Geral
      </h1>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 250px', backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: 0, color: 'var(--texto-mutado)', fontSize: '0.9rem' }}>Acessos Hoje</h3>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--texto-escuro)' }}>14</p>
        </div>
        <div style={{ flex: '1 1 250px', backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: 0, color: 'var(--texto-mutado)', fontSize: '0.9rem' }}>Status do Sistema</h3>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--status-sucesso)' }}>Online</p>
        </div>
      </div>
    </div>  
    </>
  );
};