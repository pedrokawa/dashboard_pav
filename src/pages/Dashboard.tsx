import { useAuth } from '../hooks/UseAuth';
import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/logo-nobg.webp';

export const Dashboard = () => {
  const { logout, username } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const initial = username ? username.charAt(0).toUpperCase() : 'V';

  const [isSideBar, setIsSideBar] = useState(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [isRelatorioOpen, setIsRelatorioOpen] = useState(false);

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
            <li 
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '0.75rem 1rem', 
              backgroundColor: location.pathname === '/dashboard' ? '#e67e22' : 'transparent', // Destaca o item ativo
              borderRadius: '0.5rem', 
              cursor: 'pointer', 
              fontWeight: location.pathname === '/dashboard' ? '500' : 'normal', // Deixa o item ativo mais negrito
              color: location.pathname === '/dashboard' ? '#000000' : '#9CA3AF', // Destaca o item ativo
              }}
              onMouseOver={(e) => { if(location.pathname !== '/dashboard') e.currentTarget.style.color='#000000';}}
              onMouseOut={(e) => { if(location.pathname !== '/dashboard') e.currentTarget.style.color='#9CA3AF';}}
              >
              📊 Visão Geral
            </li>
            {/* Itens inativos */}
            {/* BOTÃO PAI */}
            <li 
              onClick={() => { 
                setIsRelatorioOpen(!isRelatorioOpen);
                if (!isRelatorioOpen){
                  navigate('/dashboard/relatorios/veiculos'); // Navega para o primeiro relatório ao abrir
                }
              }} 
              style={{ 
                padding: '0.75rem 1rem', 
                borderRadius: '0.5rem', 
                cursor: 'pointer', 
                transition: 'all 0.2s',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: location.pathname.includes('/dashboard/relatorios') ? '#e67e22' : 'transparent',
                color: location.pathname.includes('/dashboard/relatorios') ? 'var(--texto-claro)' : 'var(--texto-mutado)',
                fontWeight: location.pathname.includes('/dashboard/relatorios') ? '500' : 'normal'
              }}
              onMouseOver={(e) => { if(!location.pathname.includes('/dashboard/relatorios')) e.currentTarget.style.color = '#e67e22'; }}
              onMouseOut={(e) => { if(!location.pathname.includes('/dashboard/relatorios')) e.currentTarget.style.color = '#e67e22'; }}
            >
              <span>📋 Relatórios</span>
              {/* Seta que gira quando abre/fecha */}
              <span style={{ fontSize: '0.8rem', transform: isRelatorioOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                ▼
              </span>
            </li>
            {isRelatorioOpen && (
              <ul style={{ 
                listStyle: 'none', 
                padding: '0 0 0 1.5rem', // Dá aquele recuo para a direita
                margin: '0.5rem 0', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.25rem' 
              }}>
                <li 
                  onClick={() => navigate('/dashboard/relatorios/veiculos')}
                  style={{ 
                    padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.9rem',
                    backgroundColor: location.pathname === '/dashboard/relatorios/veiculos' ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: location.pathname === '/dashboard/relatorios/veiculos' ? 'var(--texto-claro)' : 'var(--texto-mutado)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--texto-claro)'}
                  onMouseOut={(e) => { if(location.pathname !== '/dashboard/relatorios/veiculos') e.currentTarget.style.color = 'var(--texto-mutado)'; }}
                >
                  🚜 Veículos
                </li>
                
                <li 
                  onClick={() => navigate('/dashboard/relatorios/abastecimentos')}
                  style={{ 
                    padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.9rem',
                    backgroundColor: location.pathname === '/dashboard/relatorios/abastecimentos' ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: location.pathname === '/dashboard/relatorios/abastecimentos' ? 'var(--texto-claro)' : 'var(--texto-mutado)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--texto-claro)'}
                  onMouseOut={(e) => { if(location.pathname !== '/dashboard/relatorios/abastecimentos') e.currentTarget.style.color = 'var(--texto-mutado)'; }}
                >
                  ⛽ Abastecimentos
                </li>

                <li 
                  // onClick={() => navigate('/dashboard/relatorios/dp')}
                  style={{ 
                    padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.9rem',
                    backgroundColor: location.pathname === '/dashboard/relatorios/dp' ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: location.pathname === '/dashboard/relatorios/dp' ? 'var(--texto-claro)' : 'var(--texto-mutado)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--texto-claro)'}
                  onMouseOut={(e) => { if(location.pathname !== '/dashboard/relatorios/dp') e.currentTarget.style.color = 'var(--texto-mutado)'; }}
                >
                  👷 Depto. Pessoal
                </li>
              </ul>
            )}
            <li
            onClick={() => navigate('/dashboard/configuracoes')} 
            style={{ 
            padding: '0.75rem 1rem', 
            borderRadius: '0.5rem', 
            cursor: 'pointer', 
            color: location.pathname === '/dashboard/configuracoes' ? '#000000' : '#9CA3AF', 
            backgroundColor: location.pathname === '/dashboard/configuracoes' ? '#e67e22' : 'transparent', 
            fontWeight: location.pathname === '/dashboard/configuracoes' ? '500' : 'normal',
            }}
            onMouseOver={(e) => { if(location.pathname !== '/dashboard/configuracoes') e.currentTarget.style.color='#000000';}}
            onMouseOut={(e) => { if(location.pathname !== '/dashboard/configuracoes') e.currentTarget.style.color='#9CA3AF';}}
            >
              ⚙️ Configurações
            </li>
          </ul>
        </nav>
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
            <Outlet />
        </div>  

      </main>
    </div>
  );
};