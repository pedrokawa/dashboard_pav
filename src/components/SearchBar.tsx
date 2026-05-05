import { type ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
export const SearchBar = ({ value, onChange, placeholder = "Pesquisar..." }: SearchBarProps) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      border: '1px solid #a76e2e',
      borderRadius: '0.5rem',
      padding: '0.5rem 0.75rem',
      minWidth: '250px',
      height: '1.68rem',
      // Uma sombra bem sutil para dar acabamento profissional
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' 
    }}>
      <svg 
       width="18" height="18" viewBox="0 0 24 24" 
       fill="none" stroke="var(--texto-mutado, #9CA3AF)" 
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       style={{ marginRight: '8px' }}
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        style={{
          border: 'none',
          outline: 'none', // Remove aquela borda azul feia ao clicar
          width: '100%',
          fontSize: '0.95rem',
          color: 'var(--texto-escuro, #374151)',
          backgroundColor: 'transparent'
        }}
      />
    </div>
  );
};
