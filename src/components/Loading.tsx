import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingProps {
    text?: string;
}

export const Loading = ({ text = 'Carregando...' }: LoadingProps) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '4rem 2rem',
        gap: '1rem', // Espaço entre o círculo e o texto
        width: '100%'
      }}
    >
      <CircularProgress size={40} sx={{ color: 'var(--texto-mutado)' }} />
      <span style={{ color: 'var(--texto-mutado)', fontSize: '0.95rem' }}>
        {text}
      </span>
    </Box>
  );
};

