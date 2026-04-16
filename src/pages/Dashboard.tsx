import { useAuth } from '../hooks/UseAuth';
import { useState } from 'react';
import Logo from '../assets/logo-nobg.webp';

export const Dashboard = () => {
  const { logout, username } = useAuth();

  const initial = username ? username.charAt(0).toUpperCase() : 'V';

  const [isSideBar, setIsSideBar] = useState(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw', 
      backgroundColor: '#F3F4F6', // Fundo cinza bem claro para o dashboard
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      
      {/* ================= BARRA LATERAL (SIDEBAR) ================= */}
      <aside style={{ 
        width: isSideBar ? '16rem' : '0', 
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        
        backgroundColor: '#d3d3d36b', // Mesmo tom escuro do botão de login
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        {/* Área da Logo */}
        <div style={{ 
          padding: '1.5rem', 
          // borderBottom: '1px solid #374151', 
          display: 'flex', 
          justifyContent: 'center',
          // backgroundColor: 'white' // Fundo branco caso sua logo tenha letras escuras
        }}>
          <img src={Logo} alt="Logo" style={{ width: '80%', height: 'auto' }} />
        </div>

        {/* Menu de Navegação */}
        <nav style={{ flex: 1, padding: '1.5rem 1rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {/* Item ativo (destacado) */}
            <li style={{ padding: '0.75rem 1rem', backgroundColor: '#e67e22', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '500' }}>
              📊 Visão Geral
            </li>
            {/* Itens inativos */}
            <li style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', color: '#9CA3AF' }}>
              📋 Relatórios
            </li>
            <li style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', color: '#9CA3AF' }}>
              ⚙️ Configurações
            </li>
          </ul>
        </nav>

        {/* Rodapé da Sidebar (Logout) */}
        {/* <div style={{ padding: '1rem'
          // , borderTop: '1px solid #374151' 
          }}>
          <button 
            onClick={logout} 
            style={{ 
            width: '100%',
            marginTop: '0.5rem',
            padding: '0.875rem', 
            backgroundColor: '#e67e22', // Botão escuro, bem elegante
            color: 'white', 
            border: 'none', 
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
            }}
          >
            Sair do Sistema
          </button>
        </div> */}
      </aside>

      {/* ================= ÁREA PRINCIPAL ================= */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* CABEÇALHO (HEADER) */}
        <header style={{ 
          height: '4rem', 
          backgroundColor: 'white', 
          borderBottom: '1px solid #E5E7EB', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', // Joga os itens para a direita
          padding: '0 2rem' 
        }}>
          <button 
            onClick={() => setIsSideBar(!isSideBar)}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', 
              fontSize: '1.5rem', color: '#374151', padding: '0.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '0.25rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          {/* ================= ÁREA DO USUÁRIO COM DROPDOWN ================= */}
          {/* position: relative é essencial aqui para o menu flutuar no lugar certo */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.25rem', borderRadius: '0.5rem'
              }}
            >
              <span style={{ color: '#374151', fontWeight: '500' }}>
                Bem-vindo, {username || 'Visitante'}
              </span>
              <div 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              style={{ 
                width: '2.5rem', height: '2.5rem', 
                backgroundColor: '#4F46E5', color: 'white', 
                borderRadius: '50%', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem',
                cursor: 'pointer'
              }}>
                {initial}
              </div>
            </div>

            {/* O Menu Flutuante (só aparece se isUserMenuOpen for true) */}
            {isUserMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '120%', // Fica um pouquinho abaixo do avatar
                right: 0,    // Alinha pela direita
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                minWidth: '12rem',
                zIndex: 50,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                  <button 
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#000000', // Vermelho padrão para ações de sair/deletar
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                  }}
                  // onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'} // Vermelho bem clarinho no hover
                  // onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Acessos e permissões
                </button>
                <button 
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#000000', // Vermelho padrão para ações de sair/deletar
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                  }}
                  // onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'} // Vermelho bem clarinho no hover
                  // onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Perfil
                </button>
                <button 
                  onClick={logout}
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#000000', // Vermelho padrão para ações de sair/deletar
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'} // Vermelho bem clarinho no hover
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </header>

        {/* CONTEÚDO DA PÁGINA */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          <h1 style={{ margin: '0 0 1.5rem 0', color: '#111827', fontSize: '1.8rem' }}>
            Visão Geral
          </h1>
          
          {/* Exemplo de Cards de Informação */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            
            <div style={{ flex: '1 1 250px', backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
               <h3 style={{ margin: 0, color: '#6B7280', fontSize: '0.9rem' }}>Acessos Hoje</h3>
               <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: '#111827' }}>14</p>
            </div>

            <div style={{ flex: '1 1 250px', backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
               <h3 style={{ margin: 0, color: '#6B7280', fontSize: '0.9rem' }}>Status do Sistema</h3>
               <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: '#10B981' }}>Online</p>
            </div>

            <div style={{ flex: '1 1 250px', backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
               <h3 style={{ margin: 0, color: '#6B7280', fontSize: '0.9rem' }}>Última Sincronização</h3>
               <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: '#3B82F6' }}>10 min atrás</p>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};