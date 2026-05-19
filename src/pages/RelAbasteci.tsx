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
import { Button } from "@mui/material";
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
    foto?: string;
}

const arqvBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
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
    const [total, setTotal] = useState('');
    const [posto, setPosto] = useState('');
    const [dataAbastecimento, setDataAbastecimento] = useState('');

    const [nfe, setNfe] = useState<File | null>(null);

    // fechar modal
    const closeModal = () => {
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
      setNfe(null);
      setIsModalOpen(false);
    }

    const handleCadastrarAbastecimento = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        
        let fotoBase64: string | undefined = undefined;

        if (nfe) {
          fotoBase64 = await arqvBase64(nfe);
        }

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
        dataAbastecimento: new Date(dataAbastecimento).toISOString(),
        foto: fotoBase64
      }
       
      const novoAbast = await api.postAbast(dadosAbastecimento);

      const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
      
      }).format(new Date(novoAbast.dataAbastecimento));

        const abastecimentoFormatado = {
          ...novoAbast,
          dataAbastecimento: dataFormatada
        };

        toast.success("Abastecimento cadastrado com sucesso!");

        console.log(novoAbast);
        console.log(abastecimentoFormatado);
        
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
        setNfe(null);

        closeModal();

        setAbastecimentos((prev) => [abastecimentoFormatado, ...prev])
        // fetchAbastecimentos();

      }catch (error) {
        console.error("Erro ao cadastrar abastecimento:", error);
        toast.error("Erro ao cadastrar abastecimento.");  

      }

    }

    const handleBuscaPlaca = async () => {
      if (placa.trim().length < 7) return;
      
      try {
        const veiculo = await api.getVeicPlaca(placa);

        if (veiculo) {
          setMarca(veiculo.marca);
          setModelo(veiculo.modelo);
        } else {
          setMarca('');
          setModelo('');
          toast.error("Digite uma placa válida.");
        }
        }
        catch (error) {
          console.error("Erro ao buscar veículo:", error);
          toast.error("Erro ao buscar veículo.");
        }
    }

    const handleTotal = () => {
      const numLitros = parseFloat(litros) || 0;
      const numPreco = parseFloat(preco) || 0;

      if (numLitros > 0 && numPreco > 0) {
        const result = (numLitros * numPreco).toFixed(2);
        setTotal(result);
      }else{
        setTotal('');
      }
    };
      
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
    onClose={closeModal}
    titulo="Cadastro de Abastecimento"
    >
      <form onSubmit={handleCadastrarAbastecimento}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Placa *</label>
              <input 
                placeholder="ABC-1234" 
                required 
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
                onBlur={handleBuscaPlaca}
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Marca *</label>
              <input 
                placeholder="Marca" 
                readOnly 
                value={marca}
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Modelo *</label>
              <input 
                placeholder="Modelo" 
                readOnly
                value={modelo}
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
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
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>KM Atual</label>
              <input 
                type="number" 
                placeholder="Ex: 150000" 
                value={km}
                onChange={(e) => setKm(e.target.value)} // <-- CONECTADO!
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Horímetro</label>
              <input 
                type="number" 
                placeholder="Ex: 150000" 
                value={horimetro}
                onChange={(e) => setHorimetro(e.target.value)} // <-- CONECTADO!
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
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
                onChange={(e) => setLitros(e.target.value)}
                onBlur={handleTotal}
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
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
                onChange={(e) => setPreco(e.target.value)}
                onBlur={handleTotal}
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Total (R$) *</label>
              <input 
                readOnly
                type="number" 
                step="0.01" 
                placeholder="Ex: 5.99" 
                value={total}
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', backgroundColor: '#f3f4f633', cursor: 'not-allowed', height: '1.2rem' }} 
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
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Data *</label>
              <input 
                type="datetime-local" 
                placeholder="Data do abastecimento" 
                required 
                value={dataAbastecimento}
                onChange={(e) => setDataAbastecimento(e.target.value)} 
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }}  
              />
            </div>

            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Nota Fiscal *</label>
              
              <input 
                type="file" 
                placeholder="Arquivo da NF" 
                required 
                accept="image/*, .pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setNfe(e.target.files[0]);
                  }
                }}
                style={{ 
                  fontSize: '0.9rem',
                  padding: '0.5rem',
                  borderRadius: '0.375rem', 
                  border: 'none', 
                  height: '1.2rem',
                  color: '#374151'
                }}  
              />

              {nfe && (
                <span 
                style={{
                  fontSize: '0.85rem',
                  color: '#10B981', 
                  fontWeight: 500
                }}>
                  Arquivo anexado: {nfe.name}
                </span>
              )}
            </div>

        </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem' }}>
            <Button 
            type="button" 
            onClick={closeModal} 
            style={{
                textTransform: 'none',
                borderRadius: '0.5rem',
                fontWeight: 500,
                backgroundColor: '#e67e22',
                borderColor: '#E5E7EB',
                color: '#ffffff',
                width: '9rem',
                height: '2.8rem',
                fontSize: '1rem'
                }}>
              Cancelar
            </Button>
            <Button 
            type="submit"
            style={{
                textTransform: 'none',
                borderRadius: '0.5rem',
                fontWeight: 500,
                backgroundColor: '#e67e22',
                borderColor: '#E5E7EB',
                color: '#ffffff',
                width: '9rem',
                height: '2.8rem',
                fontSize: '1rem'
                }}
              >
              Salvar
            </Button>
          </div>
      </form>
    </Modal>
  </>

  );
};
