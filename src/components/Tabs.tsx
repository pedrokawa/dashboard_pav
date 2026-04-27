import { useState, type ReactNode } from 'react';

export interface TabItem {
    id: string;
    label: string;
    content: ReactNode;
}

interface TabProps {
    tabs: TabItem[];
}

export const Tabs = ({ tabs }: TabProps) => {

    const [abaAtiva, setAbaAtiva] = useState(0);

    return (
        <>
        <div
        style={{ width: '100%'}}>
            <div 
            style={{ 
            display: 'flex', 
            borderBottom: '1px solid #E5E7EB', 
            marginBottom: '1.5rem',
            justifyContent: 'space-between',
            // gap: '1rem' 
            }}>
                {tabs.map((tab, index) => (
                    <button
                        key={tab.id}
                        onClick={() => setAbaAtiva(index)}
                        style={{
                        padding: '0.75rem 1rem',
                        border: 'none',
                        backgroundColor: 'transparent',
                        // A linha laranja embaixo aparece apenas na aba ativa
                        borderBottom: abaAtiva === index ? '2px solid #F97316' : '2px solid transparent',
                        color: abaAtiva === index ? '#F97316' : '#000000',
                        fontWeight: abaAtiva === index ? 600 : 500,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        }}>
                            {tab.label}  
                    </button>
                ))}
            </div>
        
        <div
        style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            {tabs[abaAtiva].content}
        </div>
        </div>
        </>
    )
}