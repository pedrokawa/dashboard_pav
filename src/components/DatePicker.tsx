import type { ChangeEvent } from 'react';

interface DatePickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    disabled?: boolean;
}

export const DatePicker = ({ value, onChange, label, disabled }: DatePickerProps) => {
    return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {/* Só renderiza a label se você passar essa propriedade */}
      {label && (
        <label style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 500 }}>
          {label}
        </label>
      )}
      
      <input
        type="date"
        value={value}
        disabled={disabled}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        style={{
          padding: '0.5rem 0.75rem',
          fontSize: '0.95rem',
          color: disabled ? "#6b7280" : (value ? '#111827' : '#9CA3AF'), // Fica cinza se estiver vazio
          backgroundColor: disabled ? '#e5e7eb' : '#fff',
          border: '1px solid #D1D5DB',
          borderRadius: '0.5rem',
          outline: 'none',
          fontFamily: 'inherit',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          minWidth: '150px',
          height: '1.2rem'
        }}
      />
    </div>
    )
}