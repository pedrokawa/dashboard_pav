import { DataTable, type ColumnConfig } from "../components/DataTable";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../api/api";
import { Loading } from "../components/Loading";
import { ExportButton } from "../components/ExportButton";
import { exportToExcel } from "../utils/exportExcel";
import { SearchBar } from "../components/SearchBar";
import { AddButton } from "../components/AddButton";
import { Modal } from "../components/Modal";

import { type Veiculo } from "../types/Veiculo";
import { Button } from "@mui/material";
import { EditButton } from "../components/EditButton";

export const RelVeiculos = () => {

    const [frota, setFrota] = useState<Veiculo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [termoBusca, setTermoBusca] = useState('');

    const [placa, setPlaca] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [codigoFrota, setCodigoFrota] = useState('');
    const [anoFabricacao, setAnoFabricacao] = useState('');
    const [anoModelo, setAnoModelo] = useState('');
    const [combustivel, setCombustivel] = useState('');
    const [status, setStatus] = useState('');
    const [renavam, setRenavam] = useState('');
    const [cor, setCor] = useState('');
    const [kmAtual, setKmAtual] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setPlaca('');
        setMarca('');
        setModelo('');
        setCodigoFrota('');
        setAnoFabricacao('');
        setAnoModelo('');
        setCombustivel('');
        setStatus('');
        setRenavam('');
        setCor('');
        setKmAtual('');

        setIsModalOpen(false);
    }

    const handleCadastrarVeiculo = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const dadosVeiculo = {
                placa: placa.trim().toUpperCase(),
                marca: marca.trim(),
                modelo: modelo.trim(),
                codigoFrota: codigoFrota.trim().toUpperCase(),
                anoFabricacao: Number(anoFabricacao) || 0,
                anoModelo: Number(anoModelo) || 0,
                combustivel: combustivel,
                status: status,
                renavam: renavam,
                cor: cor,
                kmAtual: Number(kmAtual) || 0,
            };

            const novoVeiculo = await api.postVeic(dadosVeiculo);

            toast.success('Veículo cadastrado com sucesso!');

            closeModal();

            setFrota((prev) => [novoVeiculo, ...prev]);


        } catch (error) {
            console.error('Erro ao cadastrar veículo:', error);
            toast.error('Erro ao cadastrar veículo.');
        }
    }
    
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
            backgroundColor: row.status?.toLowerCase() === 'ativo' || row.status?.toLowerCase() === 'inativo' ? '#D1FAE5' : '#FEE2E2',
            color: row.status?.toLowerCase() === 'ativo' || row.status?.toLowerCase() === 'inativo' ? '#065F46' : '#991B1B'
            }}>
            {row.status || 'Desconhecido'}
            </span>
        )
        },
         {
           key: 'id',
           label: 'Ações',
           align: 'center',
           render: (row: Veiculo) => (
             <div style={{ 
               display: 'flex', 
               width: '100%', 
               gap: '0.5rem', 
               justifyContent: 'center' }}>
               <EditButton 
               onClick={() => (row.placa)} />
             </div>
           )
         }       
  ];

  const veiculoFiltrado = frota.filter((item) => {
    const termo = termoBusca.toLowerCase();

    return (
        item.codigoFrota.toLowerCase().includes(termo) ||
        item.placa.toLowerCase().includes(termo) ||
        item.marca.toLowerCase().includes(termo) ||
        item.modelo.toLowerCase().includes(termo) ||
        String(item.anoFabricacao).toLowerCase().includes(termo) ||
        String(item.anoModelo).toLowerCase().includes(termo) ||
        item.combustivel.toLowerCase().includes(termo) ||
        item.status.toLowerCase().includes(termo)
    );
  });

  return (
    <>
    <div style={{ maxWidth: '100%'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ margin: 0, color: 'var(--texto-escuro)', fontSize: '1.8rem' }}>
            Frota
            </h1>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center'}}>

            <SearchBar
            value={termoBusca}
            onChange={setTermoBusca}
            placeholder="Buscar veículos..." 
            />
            
            <ExportButton
                disabled={isLoading}
                onClick={() => {
                    const formatData = frota.map((item) => ({
                        'Cód. Frota': item.codigoFrota,
                        'Placa': item.placa,
                        'Veículo': `${item.marca}/${item.modelo}`,
                        'Ano': `${item.anoFabricacao}/${item.anoModelo}`,
                        'Combustível': item.combustivel,
                        'Status': item.status
                    }));
                    exportToExcel(formatData, "Relatório de Frota");
            }} />

            <AddButton 
            disabled={isLoading}
            onClick={() => setIsModalOpen(true)} 
            />
            </div>    
        </div>
    
    {isLoading ? (
        <Loading text="Buscando veículos..." />
    ) : (
        <DataTable columns={colunas} data={veiculoFiltrado} />    
    )}
    </div>

    <Modal
    isOpen={isModalOpen}
    onClose={closeModal}
    titulo="Cadastro de Veículo"
    >
        <form onSubmit={handleCadastrarVeiculo}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Placa *</label>
                <input 
                    placeholder="ABC-1234" 
                    required 
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
                />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Marca *</label>
                <input 
                    placeholder="Marca" 
                    required
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    style={{ 
                    padding: '0.5rem', 
                    borderRadius: '0.375rem', 
                    border: '1px solid #D1D5DB', 
                    height: '1.2rem', 
                    }} 
                />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Modelo *</label>
                <input 
                    placeholder="Modelo" 
                    required    
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    style={{ 
                    padding: '0.5rem', 
                    borderRadius: '0.375rem', 
                    border: '1px solid #D1D5DB', 
                    height: '1.2rem', 
                    }} 
                />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Cor *</label>
                <input 
                    type="text" 
                    placeholder="Ex: Prata" 
                    required 
                    value={cor}
                    onChange={(e) => setCor(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
                />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Código de Frota *</label>
                <input 
                    type="text" 
                    placeholder="Código de Frota" 
                    required 
                    value={codigoFrota}
                    onChange={(e) => setCodigoFrota(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
                />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Ano de Fabricação *</label>
                <input 
                    type="number" 
                    placeholder="Ex: 2020" 
                    value={anoFabricacao}
                    onChange={(e) => setAnoFabricacao(e.target.value)} // <-- CONECTADO!
                    style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
                />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Ano do Modelo</label>
                <input 
                    type="number" 
                    placeholder="Ex: 2020" 
                    value={anoModelo}
                    onChange={(e) => setAnoModelo(e.target.value)} // <-- CONECTADO!
                    style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem'}} 
                />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Renavam *</label>
                <input 
                    type="text" 
                    placeholder="Ex: 0123456789" 
                    required 
                    value={renavam}
                    onChange={(e) => setRenavam(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
                />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Combustível *</label>
                <input 
                    type="text" 
                    placeholder="Ex: Gasolina/Alcool/Diesel/Flex" 
                    value={combustivel}
                    onChange={(e) => setCombustivel(e.target.value)}
                    style={{ 
                    padding: '0.5rem', 
                    borderRadius: '0.375rem', 
                    border: '1px solid #D1D5DB', 
                    }} 
                />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>KM Atual *</label>
                <input 
                    type="number" 
                    placeholder="Ex: 50000" 
                    required 
                    value={kmAtual}
                    onChange={(e) => setKmAtual(e.target.value)} // <-- CONECTADO!
                    style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }} 
                />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Status *</label>
                <input 
                    type="text" 
                    placeholder="Ex: Ativo/Inativo" 
                    required 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)} 
                    style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem' }}  
                />
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
}
