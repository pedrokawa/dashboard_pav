import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../api/api";
import { DataTable, type ColumnConfig } from "../components/DataTable";
import { dateFormat } from '../utils/dateFormat';
import { Loading } from "../components/Loading";
import { ExportButton } from "../components/ExportButton";

interface Abastecimento {
    id: number;
    placa: string;
    marca: string;
    modelo: string;
    km: string;
    horimetro?: string;
    operador: string;
    litros: string;
    preco: string;
    total: string;
    posto: string;
    createdAt: string;   
}


export const RelAbasteci = () => {

    const [abastecimentos, setAbastecimentos] = useState<Abastecimento[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAbastecimentos = async () => {
            try {
                setIsLoading(true);
                const dados = await api.getAbastecimentos();
                setAbastecimentos(dados);
            } catch (error) {
                console.error("Erro ao buscar abastecimentos:", error);
                toast.error("Erro ao buscar abastecimentos.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAbastecimentos();
    }, []);


    const colunas: ColumnConfig<Abastecimento>[] = [
        { 
        key: 'createdAt', 
        label: 'Data', 
        align: 'left',
        render: (row) => dateFormat(row.createdAt)
        },
        { key: 'placa', label: 'Placa', align: 'left' },
        { 
        key: 'marca', 
        label: 'Marca/Modelo', 
        align: 'left',
        render: (row) => `${row.marca}/${row.modelo}`
        },
        { key: 'km', label: 'KM', align: 'left' },
        { key: 'operador', label: 'Operador', align: 'left' },
        { 
        key: 'litros', 
        label: 'litros', 
        align: 'left',
        render: (row) => `${row.litros} litros` 
        },
        {
        key: 'preco', 
        label: 'preco', 
        align: 'left',
        render: (row) => `R$ ${row.preco} ` 
        },
        { 
        key: 'total', 
        label: 'total', 
        align: 'left',
        // Formata como Moeda (R$)
        render: (row) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(row.total))
        },

        
    ];

return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0, color: 'var(--texto-escuro)', fontSize: '1.8rem' }}>
          Controle de Abastecimentos
        </h1>

        <ExportButton
        disabled={isLoading}
        onClick={() => {
          console.log('Clicado');
        }} />
        
      </div>

      {isLoading ? (
        <Loading text="Buscando abastecimento..." />
      ) : (
        <DataTable columns={colunas} data={abastecimentos} />
      )}
    </div>
  );
};
