import { useAuth } from '../contexts/UseAuth';

export const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Dashboard Restrito</h1>
      <p>Se você está vendo isso, o login na API funcionou!</p>
      
      <button 
        onClick={logout} 
        style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        Sair
      </button>
    </div>
  );
};