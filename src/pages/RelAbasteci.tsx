import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../api/api";
import { DataTable, type ColumnConfig } from "../components/DataTable";
// import { dateFormat } from '../utils/dateFormat';
import { Loading } from "../components/Loading";
import { ExportButton } from "../components/ExportButton";
import { exportToExcel } from "../utils/exportExcel";
import { SearchBar } from "../components/SearchBar";
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
    dataAbastecimento: string;
}


export const RelAbasteci = () => {

    const [abastecimentos, setAbastecimentos] = useState<Abastecimento[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [termoBusca, setTermoBusca] = useState('');

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
        key: 'dataAbastecimento', 
        label: 'Data', 
        align: 'left',
        render: (row) => row.dataAbastecimento
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
        label: 'Litros', 
        align: 'left',
        render: (row) => `${row.litros} litros` 
        },
        {
        key: 'preco', 
        label: 'Preço', 
        align: 'left',
        render: (row) => `R$ ${row.preco} ` 
        },
        { 
        key: 'total', 
        label: 'Total', 
        align: 'left',
        // Formata como Moeda (R$)
        render: (row) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(row.total))
        },

        
    ];

    const abastecimentosFiltrados = abastecimentos.filter((item) => {
      const termo = termoBusca.toLowerCase();
      return (
        item.dataAbastecimento.toLowerCase().includes(termo) ||
        item.placa.toLowerCase().includes(termo) ||
        item.marca.toLowerCase().includes(termo) ||
        item.modelo.toLowerCase().includes(termo) ||
        item.operador.toLowerCase().includes(termo) ||
        item.posto.toLowerCase().includes(termo)
      );
    });

return (
  <>
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0, color: 'var(--texto-escuro)', fontSize: '1.8rem' }}>
          Controle de Abastecimentos
        </h1>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>

        <SearchBar
          value={termoBusca}
          onChange={setTermoBusca}
          placeholder="Buscar abastecimentos..."
        />
        
        <ExportButton
        disabled={isLoading}
        onClick={() => {
          const formatData = abastecimentos.map((item) => ({
            'Data': item.dataAbastecimento,
            'Placa': item.placa,
            'Veículo': `${item.marca}/${item.modelo}`,
            'KM': item.km,
            'Horímetro': item.horimetro || 'N/A',
            'Operador': item.operador,
            'Litros': Number(item.litros),
            'Preço': Number(item.preco),
            'Total': Number(item.total),
            'Posto': item.posto,
          }));
          exportToExcel(formatData, "Relatório de Abastecimentos");

        }} />
        </div>  
      </div>

      {isLoading ? (
        <Loading text="Buscando abastecimento..." />
      ) : (
        <DataTable columns={colunas} data={abastecimentosFiltrados} />
      )}
    </div>
  </>
  
  );
};
