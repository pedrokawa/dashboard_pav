import { useState } from "react";
import '../index.css';
import Logo from '../assets/logo-asfaltopav.webp';

import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth"

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(!username || !password) {
      alert("Preencha ambos os campos para continuar.");
      return;
    } 

    try {
      await api.login(username, password);
      login(username); 
      alert("Login bem-sucedido! Redirecionando...");
      
      navigate("/dashboard");
    } catch (error) {
      alert("Erro ao tentar logar: " + error);
      console.error("Erro detalhado:", error);
    }
  };

    return (
    <div className="animated-bg" style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      alignItems: 'center',
      justifyContent: 'center',
      // /* Aqui está o pulo do gato: um gradiente moderno e elegante */
      // background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <form
        onSubmit={handleLogin} 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '20%',
          maxWidth: '24rem',
          padding: '2.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '1rem', // Bordas mais arredondadas
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)', // Sombra mais difusa e moderna
          margin: '1rem' // Margem de segurança para telas pequenas
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <img 
            src={Logo} 
            alt="Logo AsfaltoPav" 
            style={{ width: '10rem', height: '3rem', marginBottom: '0.75rem' }}
          />
          {/* <h2 style={{ margin: 0, color: '#111827', fontSize: '1.8rem' }}>
            Bem-vindo!
          </h2> */}
          <p style={{ margin: '0.5rem 0 0 0', color: '#6B7280', fontSize: '0.9rem' }}>
            Insira suas credenciais para acessar
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="email" style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151' }}>
            Usuário
          </label>
          <input 
            type="username" 
            id="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="seu usuário"
            required 
            style={{ 
              padding: '0.75rem 1rem', 
              borderRadius: '0.5rem', 
              border: '1px solid #D1D5DB', 
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="password" style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151' }}>
            Senha
          </label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required 
            style={{ 
              padding: '0.75rem 1rem', 
              borderRadius: '0.5rem', 
              border: '1px solid #D1D5DB', 
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            marginTop: '0.5rem',
            padding: '0.875rem', 
            backgroundColor: '#111827', // Botão escuro, bem elegante
            color: 'white', 
            border: 'none', 
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#374151'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#111827'}

        >
          Entrar
        </button>
      </form>
    </div>
  );
}