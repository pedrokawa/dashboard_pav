import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ActionCardProps {
  titulo: string;
  descricao: string;
  icone: ReactNode;
  rota: string;
}

export const ActionCard = ({ titulo, descricao, icone, rota }: ActionCardProps) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(rota)}
      sx={{
        backgroundColor: '#ffffff',
        border: '1px solid #E5E7EB',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        // O pulo do gato: Efeito de hover com a cor do sistema!
        '&:hover': {
          borderColor: '#F97316', // Laranja que você já usa no botão
          boxShadow: '0 4px 12px rgba(249, 115, 22, 0.1)',
          transform: 'translateY(-3px)' // Faz o card dar um "pulinho" pra cima
        }
      }}
    >
      {/* Caixinha do Ícone */}
      <Box sx={{ 
        backgroundColor: '#FFF7ED', // Fundo laranja super clarinho
        color: '#F97316',           // Ícone laranja forte
        padding: '0.75rem',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icone}
      </Box>

      {/* Textos */}
      <Box>
        <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827', mb: 0.25 }}>
          {titulo}
        </Typography>
        <Typography variant="body2" sx={{ color: '#6B7280', lineHeight: 1.4 }}>
          {descricao}
        </Typography>
      </Box>
    </Box>
  );
};