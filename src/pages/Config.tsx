import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/UseAuth';

export const Config = () => {
  // Puxamos o nome atual e a função de login para forçar a atualização do nome
  const { username, login } = useAuth();
  
  // O estado do input já começa preenchido com o nome atual do usuário
  const [nomeUsuario, setNomeUsuario] = useState(username || '');

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomeUsuario.trim()) {
      toast.error('O nome não pode ficar vazio.');
      return;
    }

    // Aqui você no futuro faria um 'await api.atualizarPerfil(nomeUsuario)'
    // Por enquanto, atualizamos no nosso contexto local:
    login(nomeUsuario); 
    
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div style={{ maxWidth: '800px', padding: '0.5rem 0.5rem', color: 'var(--texto-escuro)' }}>
      <h1 style={{ margin: '0 0 1.5rem 0', color: 'var(--texto-escuro)', fontSize: '1.8rem' }}>
        Configurações
      </h1>

      {/* Card do Formulário */}
      <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        
        <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--texto-escuro)', fontSize: '1.2rem' }}>
          Perfil do Sistema
        </h2>
        <p style={{ color: 'var(--texto-mutado)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Atualize suas informações de exibição no painel.
        </p>

        <form onSubmit={handleSalvar} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Input de Nome */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="nome" style={{ color: 'var(--texto-escuro)', fontWeight: '500', fontSize: '0.9rem' }}>
              Nome de Exibição
            </label>
            <input 
              id="nome"
              type="text" 
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
              style={{ 
                padding: '0.75rem', 
                borderRadius: '0.5rem', 
                border: '1px solid #D1D5DB', 
                outline: 'none',
                fontSize: '1rem',
                color: 'var(--texto-escuro)',
                backgroundColor: '#F9FAFB'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--cor-secundaria)'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
            />
          </div>

          {/* Divisória */}
          <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '1rem 0' }} />

          {/* Botão de Salvar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              type="submit"
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: 'var(--cor-primaria)',
                color: 'var(--texto-claro)',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                boxShadow: 'none',
                outline: 'none'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--cor-secundaria)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--cor-primaria)'}
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};