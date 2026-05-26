import toast from 'react-hot-toast';

export const Toast = {
    success: (mensagem: string) => {
        toast.custom((t) => (
        <div
        style={{
          // Animação de entrada e saída
          opacity: t.visible ? 1 : 0,
          transform: t.visible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.3s ease-in-out',
          
          // O visual do seu Toast
          backgroundColor: '#10B981', // O seu verde padrão
          color: '#ffffff',
          padding: '1rem 1.5rem',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          pointerEvents: 'auto',
        }}
        >
            <span style={{ fontSize: '1.2rem' }}>✅</span>
            <p style={{ margin: 0, fontWeight: 500, fontSize: '1rem' }}>
            {mensagem}
            </p>
        </div>
    ));
  },            

  error: (mensagem: string) => {
    toast.custom ((t) => (
        <div
        style={{
          opacity: t.visible ? 1 : 0,
          transform: t.visible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.3s ease-in-out',
          backgroundColor: '#EF4444', // O seu vermelho padrão
          color: '#ffffff',
          padding: '1rem 1.5rem',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          pointerEvents: 'auto',
        }}
       >
        <span style={{ fontSize: '1.2rem' }}>⚠️</span>
        <p style={{ margin: 0, fontWeight: 500, fontSize: '1rem' }}>
          {mensagem}
        </p>
      </div>        
    ))
  },

  loading: (mensagem: string) => {
    // Retorna o ID gerado pelo toast.custom
    return toast.custom((t) => (
      <div
        style={{
          opacity: t.visible ? 1 : 0,
          transform: t.visible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.3s ease-in-out',
          backgroundColor: '#3B82F6', // Azul para Loading
          color: '#ffffff',
          padding: '1rem 1.5rem',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          pointerEvents: 'auto',
        }}
      >
        {/* Spinner animado usando CSS inline */}
        <div style={{
          width: '18px', 
          height: '18px',
          border: '3px solid rgba(255,255,255,0.3)',
          borderTopColor: '#fff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ margin: 0, fontWeight: 500, fontSize: '1rem' }}>
          {mensagem}
        </p>
        
        {/* Keyframe para o Spinner girar */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>        
    ), { duration: Infinity }); // <-- IMPORTANTE: Impede que suma sozinho
  },

  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  }
}