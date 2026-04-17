import { DataTable, type ColumnConfig } from "../components/DataTable";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../api/api";
import { Loading } from "../components/Loading";
import { ExportButton } from "../components/ExportButton";

interface Veiculo {
    id: number;
    placa: string;
    modelo: string;
    marca: string;
    codigoFrota: string;
    anoFabricacao: number;
    anoModelo: number;
    combustivel: string;
    status: string;
}

export const RelVeiculos = () => {

    const [frota, setFrota] = useState<Veiculo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVeiculos = async () => {
            try {
                setIsLoading(true);
                const data = await api.getVeiculos();
                setFrota(data);
            } catch (error) {
                console.error('Erro ao buscar veículos:', error);
                toast.error('Erro ao buscar veículos.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchVeiculos();
    }, []);

    const colunas: ColumnConfig<Veiculo>[] = [
        { key: 'codigoFrota', label: 'Cód. Frota', align: 'left' },
        { key: 'placa', label: 'Placa', align: 'left' },
        { 
        key: 'modelo', 
        label: 'Marca/Modelo',
        align: 'left', 
        // Um truque legal: juntar Marca e Modelo na mesma coluna para ficar mais limpo!
        render: (row) => `${row.marca} ${row.modelo}` 
        },
        { key: 'anoModelo', label: 'Ano', align: 'left' },
        { key: 'combustivel', label: 'Combustível', align: 'left' },
        { 
        key: 'status', 
        label: 'Status', 
        align: 'left',
        render: (row) => (
            <span style={{
            padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '500',
            backgroundColor: row.status === 'Ativo' || row.status === 'Inativo' ? '#D1FAE5' : '#FEE2E2',
            color: row.status === 'Ativo' || row.status === 'Inativo' ? '#065F46' : '#991B1B'
            }}>
            {row.status || 'Desconhecido'}
            </span>
        )
        }
  ];

  return (
    <>
    <div style={{ maxWidth: '100%'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ margin: 0, color: 'var(--texto-escuro)', fontSize: '1.8rem' }}>
            Frota e Equipamentos
            </h1>

            <ExportButton
                disabled={isLoading}
                onClick={() => {
                console.log('Clicado');
            }} />
        </div>
    
    {isLoading ? (
        <Loading text="Buscando veículos..." />
    ) : (
        <DataTable columns={colunas} data={frota} />    
    )}
    </div>
    </>
  );
}
