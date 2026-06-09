import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
import { api } from "../api/api";
import { DataTable, type ColumnConfig } from "../components/DataTable";
import { dateFormat } from '../utils/dateFormat';
import { Loading } from "../components/Loading";
import { ExportButton } from "../components/ExportButton";
import { exportToExcel } from "../utils/exportExcel";
import { SearchBar } from "../components/SearchBar";
import { AddButton } from "../components/AddButton";
import { Modal } from "../components/Modal";
import { Button } from "@mui/material";
import { EditButton } from "../components/EditButton";
import { DeleteButton } from "../components/DeleteButton";
import { Toast } from "../components/Toast";

import { type Abastecimento } from "../types/Abastecimento";
import { DatePicker } from "../components/DatePicker";


const uploadImage = async (file: File): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'abastecimentos_upload');
  formData.append('cloud_name', 'dkrosnkyu');

  try {

    const response = await fetch("https://api.cloudinary.com/v1_1/dkrosnkyu/auto/upload", {
      method: 'POST',
      body: formData,
    })

    const data = await response.json();

    return data.secure_url;

  }catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    Toast.error("Erro ao fazer upload da imagem.");
    return undefined;
  }
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

    //edit
    const [editId, setEditId] = useState<number | null>(null);
    const [urlNfe, setUrlNfe ] = useState<string | undefined>(undefined);

    //delete
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [idDelete, setIdDelete] = useState<number | null>(null);

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
      setEditId(null);

      setIsModalOpen(false);
    }

    const handleCadastrarAbastecimento = async (e: React.FormEvent) => {
      e.preventDefault();

      let loadingId;

      try {
        
        let linkNota = urlNfe;

        if (nfe) {
          loadingId = Toast.loading("Enviando novo anexo para a nuvem...");
          linkNota = await uploadImage(nfe);
          Toast.dismiss(loadingId);
        }

      const numLitros = parseFloat(litros.toString().replace(',', '.'));
      const numPreco = parseFloat(preco.toString().replace(',', '.'));
      const numTotal = parseFloat(total.toString().replace(',', '.'));
    
      const dadosAbastecimento = {
        placa: placa.toUpperCase(),
        marca,
        modelo,
        km: km || '0',
        horimetro: horimetro || '0',
        operador,
        litros: numLitros,
        preco: numPreco,
        total: numTotal,
        posto,
        dataAbastecimento: new Date(dataAbastecimento).toISOString(),
        foto: linkNota
      }

      if (editId) {
        const abastAtualizado = await api.putAbast(editId, dadosAbastecimento);

        setAbastecimentos(prev => prev.map(item => item.id === editId ? abastAtualizado : item));
        Toast.success("Abastecimento atualizado com sucesso!");
        closeModal();
        return;
      } else {
        
        const novoAbast = await api.postAbast(dadosAbastecimento);
        setAbastecimentos((prev) => [novoAbast, ...prev])

        Toast.success("Abastecimento cadastrado com sucesso!");
          
        closeModal();
      }

      }catch (error) {
        if(loadingId) Toast.dismiss(loadingId);
        console.error("Erro ao cadastrar abastecimento:", error);
        Toast.error("Erro ao cadastrar abastecimento.");  

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
          Toast.error("Digite uma placa válida.");
        }
        }
        catch (error) {
          console.error("Erro ao buscar veículo:", error);
          Toast.error("Erro ao buscar veículo.");
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

    const handleEditar = (abast: Abastecimento) => {

      setEditId(abast.id);
      setUrlNfe(abast.foto);

      setPlaca(abast.placa);
      setMarca(abast.marca);
      setModelo(abast.modelo);
      setKm(abast.km);

      setHorimetro(abast.horimetro || '');
      setOperador(abast.operador);

      setLitros(abast.litros.toString());
      setPreco(abast.preco.toString());
      setTotal(abast.total.toString());
      setPosto(abast.posto);
      
      setUrlNfe(abast.foto);

      if (abast.dataAbastecimento) {
        let dataFinalParaOInput = '';

        if (abast.dataAbastecimento.includes('/')) {
          // 1. Cai aqui se for uma data dos testes antigos: "20/05/2026"
          const partes = abast.dataAbastecimento.split(' ');
          const [dia, mes, ano] = partes[0].split('/');

          dataFinalParaOInput = `${ano}-${mes}-${dia}`;
        } else {
          // 2. Cai aqui se for do banco real (ISO): "2026-05-20T14:30:00.000Z"
          dataFinalParaOInput = String(abast.dataAbastecimento).split('T')[0];

        }
      // Entrega pro estado exatamente o que o input quer: YYYY-MM-DD
        setDataAbastecimento(dataFinalParaOInput);
      } else {
        setDataAbastecimento('');
      }

      setIsModalOpen(true);

    }

    const handleNovoAbast = () => {
      setEditId(null);
      setUrlNfe(undefined);
      setNfe(null);
      
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

      setIsModalOpen(true); // Abre com a casa limpa!
     
    }

    const handleAbrirDelete = (id: number) => {
      setIdDelete(id);
      setIsDeleteModal(true);
    }

    const confirmDelete = async () => {
      if (!idDelete) return;

      try{
        await api.deleteAbast(idDelete);
        setAbastecimentos(prev => prev.filter(item => item.id !== idDelete));
        Toast.success("Abastecimento deletado com sucesso.");

        setIsDeleteModal(false);
        setIdDelete(null);
      }catch (error) {
        console.error(error);
        Toast.error("Erro ao deletar abastecimento.");
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
                Toast.error("Erro ao buscar abastecimentos.");
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
          render: (row) => dateFormat(row.dataAbastecimento)
        },
        { 
        key: 'placa', 
        label: 'Placa', 
        align: 'left' },
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
        {
          key: 'id',
          label: 'Ações',
          align: 'center',
          render: (row: Abastecimento) => (
            <div style={{ 
              display: 'flex', 
              width: '100%', 
              gap: '0.5rem', 
              justifyContent: 'center'
              }}>
              <EditButton 
              onClick={() => handleEditar(row)} />
              <DeleteButton
              onClick={() => handleAbrirDelete(row.id)} />
            </div>
          )
        }
        
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

    const handleExportExcel = async () => {
      if (!abastecimentosFiltrados || abastecimentosFiltrados.length === 0) {
        Toast.dismiss("Nenhum dado para exportar.");
        return;
      }

      try {

        const formatData = abastecimentosFiltrados.map((item) => ({
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

        await exportToExcel(formatData, "Relatório de Abastecimentos");
      
      } catch (error) {
        console.error("Erro ao gerar a planilha de abastecimento:", error);
        alert("Houve um erro ao exportar o arquivo.");
      }
    };

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
        onClick={() => handleExportExcel()} />

        <AddButton
        disabled={isLoading}
        onClick={handleNovoAbast}
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
    titulo={editId ? "Editar Abastecimento" : "Cadastrar Abastecimento"}
    >
      <form onSubmit={handleCadastrarAbastecimento}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Placa *</label>
              <input
                type="text"
                placeholder="Ex: ABC-1234"
                required 
                value={placa}
                onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                onBlur={handleBuscaPlaca}
                maxLength={8}
                readOnly={editId !== null}
                style={{ 
                  padding: '0.5rem', 
                  borderRadius: '0.375rem', 
                  border: '1px solid #D1D5DB', 
                  height: '1.2rem',
                  backgroundColor: editId !== null ? '#afb4b3' : 'transparent',
                  cursor: editId !== null ? 'not-allowed' : 'text',
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Marca *</label>
              <input 
                placeholder="Marca" 
                readOnly 
                disabled
                value={marca}
                style={{ 
                  padding: '0.5rem', 
                  borderRadius: '0.375rem', 
                  border: '1px solid #D1D5DB', 
                  height: '1.2rem', 
                  backgroundColor: '#afb4b3', 
                  fontWeight: 'bold',
                  cursor: 'not-allowed' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Modelo *</label>
              <input 
                placeholder="Modelo" 
                readOnly
                disabled
                value={modelo}
                style={{ 
                  padding: '0.5rem', 
                  borderRadius: '0.375rem', 
                  border: '1px solid #D1D5DB', 
                  height: '1.2rem', 
                  backgroundColor: '#afb4b3', 
                  fontWeight: 'bold', 
                  cursor: 'not-allowed'}} 
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
                style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #D1D5DB', height: '1.2rem'}} 
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
                style={{ 
                  padding: '0.5rem', 
                  borderRadius: '0.375rem', 
                  border: '1px solid #D1D5DB', 
                  backgroundColor: '#afb4b3', 
                  cursor: 'not-allowed', 
                  height: '1.2rem', 
                  fontWeight: 'bold',
                }} 
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
              <DatePicker
              label="Data"
              value={dataAbastecimento}
              onChange={setDataAbastecimento}/>
            </div>

            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>Nota Fiscal *</label>

              {editId !== null && urlNfe ? (
                <span 
                  style={{
                    fontSize: '0.9rem',
                    color: '#F59E0B', // O seu laranja
                    fontWeight: 'bold',
                    padding: '0.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    height: '1.2rem'
                  }}
                >
                  Arquivo já anexado.
                </span>
              ) : (
                <>
                <input 
                type="file" 
                // required={!urlNfe && !nfe} 
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
                    style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 500 }}>
                      Arquivo selecionado: {nfe.name}
                    </span>
                  )}
                </>
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
                width: '10rem',
                height: '2.8rem',
                fontSize: '1rem'
                }}
              >
              { editId ? 'Salvar alterações' : 'Cadastrar' }
            </Button>
          </div>
      </form>
    </Modal>

    <Modal
      isOpen={isDeleteModal}
      onClose={() => setIsDeleteModal(false)}
      titulo="Excluir Abastecimento"
      maxWidth="30%"
    >
      <div>
        <p style={{ fontSize: '1.05rem', color: '#374151', margin: 0 }}>
          Tem certeza que deseja excluir este abastecimento? 
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2.5rem' }}>
          <Button 
            type="button" 
            onClick={() => setIsDeleteModal(false)} 
            style={{
              textTransform: 'none',
              borderRadius: '0.5rem',
              fontWeight: 500,
              backgroundColor: '#9CA3AF', // Cinza neutro para cancelar
              color: '#ffffff',
              width: '8rem',
              height: '2.8rem',
              fontSize: '1rem'
            }}
          >
            Cancelar
          </Button>
          
          <Button 
            type="button"
            onClick={confirmDelete}
            style={{
                textTransform: 'none',
                borderRadius: '0.5rem',
                fontWeight: 500,
                backgroundColor: '#e67e22',
                borderColor: '#E5E7EB',
                color: '#ffffff',
                width: '8rem',
                height: '2.8rem',
                fontSize: '1rem'
            }}
          >
            Deletar
          </Button>
        </div>
      </div>
    </Modal>

  </>

  );
};
