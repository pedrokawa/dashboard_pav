import type { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    titulo: string;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, titulo, children }: ModalProps) => {
    if (!isOpen) return null;

return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro transparente
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999, // Garante que o modal fique por cima de TUDO (sidebar, header, etc)
      animation: 'fadeIn 0.2s ease-in-out'
    }}>
      {/* Caixa do Modal */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        width: '100%',
        maxWidth: '800px',
        height: 'fit-content', 
        maxHeight: '90vh',     
        overflowY: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}>
        
        {/* Cabeçalho do Modal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#111827', fontWeight: 600 }}>
            {titulo}
          </h2>
          <button 
            onClick={onClose} 
            style={{
              background: 'transparent', border: 'none', fontSize: '1.5rem', 
              cursor: 'pointer', color: '#6B7280', display: 'flex', alignItems: 'center'
            }}
            title="Fechar"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );

}