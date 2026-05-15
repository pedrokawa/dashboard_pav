import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../api/api";
import { DataTable, type ColumnConfig } from "../components/DataTable";
// import { dateFormat } from '../utils/dateFormat';
import { Loading } from "../components/Loading";
import { ExportButton } from "../components/ExportButton";
import { exportToExcel } from "../utils/exportExcel";
import { SearchBar } from "../components/SearchBar";
import { AddButton } from "../components/AddButton";
import { Modal } from "../components/Modal";
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
    dataAbastecimento: string;
}


export const RelAbasteci = () => {

    const [abastecimentos, setAbastecimentos] = useState<Abastecimento[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [termoBusca, setTermoBusca] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    //estados
    const [placa, setPlaca] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [km, setKm] = useState('');
    const [horimetro, setHorimetro] = useState('');
    const [operador, setOperador] = useState('');
    const [litros, setLitros] = useState('');
    const [preco, setPreco] = useState('');
    const [, setTotal] = useState('');
    const [posto, setPosto] = useState('');
    const [dataAbastecimento, setDataAbastecimento] = useState('');

    const handleCadastrarAbastecimento = async (e: React.FormEvent) => {
      e.preventDefault();

      const valorTotal = parseFloat(litros) * parseFloat(preco);
    
      const dadosAbastecimento = {
        placa: placa.toUpperCase(),
        marca,
        modelo,
        km: km || '0',
        horimetro: horimetro || '0',
        operador,
        litros: parseFloat(litros),
        preco: parseFloat(preco),
        total: valorTotal,
        posto,
        dataAbastecimento
      }

      try {
        await api.postAbast(dadosAbastecimento);
        toast.success("Abastecimento cadastrado com sucesso!");
        
        setPlaca('');
        setMarca('');
        setModelo('');
        setKm('');
        setHorimetro('');
        setOperador('');
        setLitros('');
        setPreco('');
        setTotal('');
        setPosto('');
        setDataAbastecimento('');

        setIsModalOpen(false);

        // fetchAbastecimentos();

      }catch (error) {
        console.error("Erro ao cadastrar abastecimento:", error);
        toast.error("Erro ao cadastrar abastecimento.");  

      }

    }
      
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

        <AddButton
        disabled={isLoading}
        onClick={() => setIsModalOpen(true)}
        />
        </div>  
      </div>

      {isLoading ? (
        <Loading text="Buscando abastecimento..." />
      ) : (
        <DataTable columns={colunas} data={abastecimentosFiltrados} />
      )}
    </div>
      
    <Modal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    titulo="Cadastro de Abastecimento"
    >
      <form onSubmit={handleCadastrarAbastecimento}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Placa *</label>
              <input 
                placeholder="ABC-1234" 
                required 
                value={placa}
                onChange={(e) => setPlaca(e.target.value)} // <-- CONECTADO!
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Operador/Motorista *</label>
              <input 
                type="text" 
                placeholder="Nome do motorista" 
                required 
                value={operador}
                onChange={(e) => setOperador(e.target.value)} // <-- CONECTADO!
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>KM Atual</label>
              <input 
                type="number" 
                placeholder="Ex: 150000" 
                value={km}
                onChange={(e) => setKm(e.target.value)} // <-- CONECTADO!
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Posto *</label>
              <input 
                type="text" 
                placeholder="Nome do Posto" 
                required 
                value={posto}
                onChange={(e) => setPosto(e.target.value)} // <-- CONECTADO!
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Litros *</label>
              <input 
                type="number" 
                step="0.01" 
                placeholder="Ex: 50.00" 
                required 
                value={litros}
                onChange={(e) => setLitros(e.target.value)} // <-- CONECTADO!
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Preço do Litro (R$) *</label>
              <input 
                type="number" 
                step="0.01" 
                placeholder="Ex: 5.99" 
                required 
                value={preco}
                onChange={(e) => setPreco(e.target.value)} // <-- CONECTADO!
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB' }} 
              />
            </div>

        </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} /* estilos de cancelar */>
              Cancelar
            </button>
            <button type="submit" /* estilos de salvar */>
              Salvar Abastecimento
            </button>
          </div>
      </form>
    </Modal>
  </>

  );
};
