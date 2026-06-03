import { useState, useEffect } from 'react';

import { Tabs, type TabItem } from '../components/Tabs';
import { DataTable, type ColumnConfig } from '../components/DataTable';
import { Modal } from '../components/Modal';
// import { DatePicker } from '../components/DatePicker';
import { Loading } from '../components/Loading';
import { EditButton } from '../components/EditButton';
import { GalleryButton } from '../components/GalleryButton';
import { Toast } from '../components/Toast'
import { Button } from '@mui/material';
// import { SearchBar } from '../components/SearchBar';

// import * as xlsx from 'xlsx';

import { type Medicao } from '../types/Medicao';
import { api } from '../api/api';

export const RelMedicao = () => {

  const [medicao, setMedicao] = useState<Medicao[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //galeria de fotos
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [imageGallery, setImageGallery] = useState<string[]>([])
  const [imageAtualIdx, setImageAtualIdx] = useState(0);

  //edicao
  const [isEditModal, setIsEditModal] = useState(false);
  const [medicaoEdit, setMedicaoEdit] = useState<Medicao | null>(null);

  useEffect(() => {
    const fetchMedicao = async () => {
      try {
        setIsLoading(true);

        const dados = await api.getMedicao();
        setMedicao(dados);
      }catch (error) {
        console.error("Erro ao buscar medições:", error);
        
      }finally {
        setIsLoading(false);
      }
    };
    fetchMedicao();
  }, []);

  const openGallery = (fotos?: string | string[]) => {
    if (!fotos || fotos.length === 0) {
      Toast.error("Nenhuma foto disponível para medição.");
      return;
    }

    let fotosArray: string[] = [];

    if (typeof fotos === 'string') {
      try {
        fotosArray = JSON.parse(fotos);
      } catch (error) {
        console.log(error);
        fotosArray = [fotos];
      }
    } else if (Array.isArray(fotos)) {
      fotosArray = fotos;
    }

    setImageGallery(fotosArray);
    setImageAtualIdx(0); // Começa sempre na primeira foto
    setIsGalleryOpen(true);
  }

  const nextFoto = () => {
    setImageAtualIdx((prev) => (prev + 1) % imageGallery.length);
  };

  const prevFoto = () => {
    setImageAtualIdx((prev) => (prev - 1 + imageGallery.length) % imageGallery.length);
  };

  const openEditModal = (medicao: Medicao) => {
    setMedicaoEdit(medicao);
    setIsEditModal(true);
  };

  const handleEdit = async () => {
    if(!medicaoEdit) return;

    try {
      const medicaoAtualizada = await api.putMedicao(medicaoEdit.id, medicaoEdit);
      
      setMedicao((prev) => prev.map((item) => item.id === medicaoEdit.id ? medicaoAtualizada : item));
      Toast.success("Medição atualizada com sucesso!");
      setIsEditModal(false);
      setMedicaoEdit(null);
    } catch (error) {
      console.error("Erro ao atualizar medição:", error);
      Toast.error("Erro ao atualizar medição. Tente novamente.");
    }
  };

  const handleInputChange = (field: keyof Medicao, value: string | number) => {
    if (medicaoEdit) {
      setMedicaoEdit({
        ...medicaoEdit,
        [field]: value
      });
    }
  };

  const colunas: ColumnConfig<Medicao>[] = [
    {
      key: 'dataMedicao',
      label: 'Data',
      align: 'left',
      render: (row) => {
        if (row.dataMedicao.includes('/')) {
          return row.dataMedicao; // Já está no formato correto
        }
        try {
          return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }).format(new Date(row.dataMedicao));
        } catch (error) {
          console.error("Erro ao formatar data:", error);
          return 'Data Inválida';
          }
      }
    },
    {
      key: 'apontador',
      label: 'Apontador',
      align: 'left',
    },
    {
      key: 'rodovia',
      label: 'Rodovia',
      align: 'left',
    },
    {
      key: 'sentido',
      label: 'Sentido',
      align: 'left',
    },
    {
      key: 'kmIni',
      label: 'Km Inicial',
      align: 'left',
    },
    {
      key: 'kmFim',
      label: 'Km Final',
      align: 'left',
    },
    {
      key: 'extensao',
      label: 'Extensão',
      align: 'left',
      render: (row) => `${row.extensao} m`
    },
    {
      key: 'largura',
      label: 'Largura',
      align: 'left',
      render: (row) => `${row.largura} m`
    },
    {
      key: 'espessura',
      label: 'Espessura',
      align: 'left',
      render: (row) => `${row.espessura} cm`
    },
    {
      key: 'faixa',
      label: 'Faixa',
      align: 'left',
    },
    {
      key: 'areaTotal',
      label: 'Área',
      align: 'left',
      render: (row) => `${row.areaTotal} m²`
    },
    {
      key: 'observacoes',
      label: 'Observações',
      align: 'left',
    },
    {
      key: 'acoes',
      label: 'Mais',
      align: 'left',
      render: (row: Medicao) => (
        <div
        style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          justifyContent: 'center' 
        }}
        >
          <GalleryButton
          onClick={() => {
            openGallery(row.foto)
          }} />

          <EditButton
          onClick={() => {
            openEditModal(row);
          }}>

          </EditButton>

        </div>
      )
    },
  ]
  // const [termoBusca, setTermoBusca] = useState('');
  // const [dataFiltro, setDataFiltro] = useState('');

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // // const [isDragging, setIsDragging] = useState(false);
  // const [arquivo, setArquivo] = useState<File | null>(null);

  // const importFile = () => {
  //   if (!arquivo) {
  //     alert('Nenhum arquivo selecionado!');
  //     return;
  //   }

    // const reader = new FileReader();

    // reader.onload = (e) => {
    //   const arrayBuffer = e.target?.result;
    //   if (arrayBuffer) {
    //     const workbook = xlsx.read(arrayBuffer, { type: 'array' });
    //     const firstSheetName = workbook.SheetNames[0];
    //     const worksheet = workbook.Sheets[firstSheetName];
    //     const data = xlsx.utils.sheet_to_json(worksheet);
    //     console.log('Dados importados:', data);
    //     alert('Arquivo importado com sucesso! Veja os dados no console.');

    //     setIsModalOpen(false);
    //   }
    // }

    // reader.readAsArrayBuffer(arquivo);
  

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setArquivo(null);
  // }

  const myAbas: TabItem[] = [
    {
      id: 'producao',
      label: 'Produção',
      // Aqui dentro você coloca a tabela inteira!
      content: 
      <>
      <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>



        {isLoading ? (
          <Loading text='Buscando medições...'/>
         ) : (
          <DataTable columns={colunas} data={medicao}/>
       
        )}

      </div>          
      </>
    },
    {
      id: 'emulsao',
      label: 'Emulsão',
      content: <div>Em breve: Gráficos de consumo por motorista vão entrar aqui!</div>
    },
    {
      id: 'agregados',
      label: 'Agregados',
      // Aqui dentro você coloca a tabela inteira!
      content: <div>Em breve: Gráficos de consumo por motorista vão entrar aqui!</div>
    },
    {
      id: 'consumo',
      label: 'Consumo da Obra',
      content: <div>Em breve: Gráficos de consumo por motorista vão entrar aqui!</div>
    },
    {
      id: 'equipe',
      label: 'Equipe',
      // Aqui dentro você coloca a tabela inteira!
      content: <div>Em breve: Gráficos de consumo por motorista vão entrar aqui!</div>
    },
    {
      id: 'Equipamentos',
      label: 'Equipamentos',
      content: <div>Em breve: Gráficos de consumo por motorista vão entrar aqui!</div>
    }    
    

  ]

  return (
    <>
    <div
    style={{ padding: '0.5rem 0.5rem', color: 'var(--texto-escuro)' }}
    > 
      
      <h1 style={{ margin: '0 0 1.5rem 0', color: 'var(--texto-escuro)', fontSize: '1.8rem' }}>
        Medição
      </h1>

      <div>
        <Tabs tabs={myAbas} />
      </div>

    </div>  

    <Modal
    isOpen={isGalleryOpen}
    onClose={() => setIsGalleryOpen(false)}
    titulo="Fotos da Medição"
    maxWidth="700px"
    >

        {imageGallery.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
            
            {/* CONTAINER DA IMAGEM E SETAS */}
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              height: '60vh', 
              minHeight: '300px',
              backgroundColor: 'transparent', // Fundo escuro igual de galerias reais
              borderRadius: '8px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              overflow: 'hidden' 
            }}>
              <img 
                src={imageGallery[imageAtualIdx]} 
                alt={`Registro ${imageAtualIdx + 1}`} 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
              />

              {/* Só mostra as setas se tiver mais de 1 foto */}
              {imageGallery.length > 1 && (
                <>
                  <button 
                    onClick={prevFoto} 
                    style={{ 
                      position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', 
                      background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', 
                      width: '45px', height: '45px', cursor: 'pointer', fontSize: '1.5rem',
                      display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}
                  >
                    &#10094;
                  </button>
                  <button 
                    onClick={nextFoto} 
                    style={{ 
                      position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', 
                      background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', 
                      width: '45px', height: '45px', cursor: 'pointer', fontSize: '1.5rem',
                      display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}
                  >
                    &#10095;
                  </button>
                </>
              )}
            </div>

            {/* CONTADOR */}
            <p style={{ margin: 0, color: '#4B5563', fontWeight: 500 }}>
              Foto {imageAtualIdx + 1} de {imageGallery.length}
            </p>
          </div>
        )}

    </Modal>

    {/* MODAL DE EDIÇÃO */}
      <Modal
        isOpen={isEditModal}
        onClose={() => setIsEditModal(false)}
        titulo="Editar Medição"
        maxWidth="600px"
      >
        {medicaoEdit && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            
          <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Data da Medição</label>
                <input 
                  type="text" 
                  readOnly  
                  value={medicaoEdit.dataMedicao && medicaoEdit.dataMedicao.includes('T') ? 
                    medicaoEdit.dataMedicao.split('T')[0].split('-').reverse().join('/') : medicaoEdit.dataMedicao || ''} 
                  style={{ 
                    padding: '0.5rem', 
                    borderRadius: '4px', 
                    border: '1px solid #D1D5DB', 
                    backgroundColor: '#e5e7eb', 
                    cursor: 'not-allowed' }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Apontador</label>
                <input 
                  type="text" 
                  value={medicaoEdit.apontador || ''} 
                  onChange={(e) => handleInputChange('apontador', e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Rodovia</label>
                <input 
                  type="text" 
                  value={medicaoEdit.rodovia || ''} 
                  onChange={(e) => handleInputChange('rodovia', e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Sentido</label>
                <input 
                  type="text" 
                  placeholder="S/N DIR ESQ"
                  value={medicaoEdit.sentido || ''} 
                  onChange={(e) => handleInputChange('sentido', e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }}
                />
              </div>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Faixa</label>
                <input 
                  type="text"
                  placeholder="1/2/3 ACOST"
                  value={medicaoEdit.faixa || ''} 
                  onChange={(e) => handleInputChange('faixa', e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Km Inicial</label>
                <input 
                  type="text" 
                  value={medicaoEdit.kmIni || ''} 
                  onChange={(e) => handleInputChange('kmIni', e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Km Final</label>
                <input 
                  type="text" 
                  value={medicaoEdit.kmFim || ''} 
                  onChange={(e) => handleInputChange('kmFim', e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Extensão (m)</label>
                <input 
                  type="text" 
                  value={medicaoEdit.extensao || ''} 
                  onChange={(e) => handleInputChange('extensao', e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Largura</label>
                <input 
                  type="text" 
                  value={medicaoEdit.largura || ''} 
                  onChange={(e) => handleInputChange('largura', e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Espessura</label>
                <input 
                  type="text"
                  placeholder="1/2/3 ACOST"
                  value={medicaoEdit.espessura || ''} 
                  onChange={(e) => handleInputChange('espessura', e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Área Total (m²)</label>
                <input 
                  type="text" 
                  value={medicaoEdit.areaTotal || ''} 
                  onChange={(e) => handleInputChange('areaTotal', e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Observações</label>
                <textarea 
                  placeholder="Usina/Espessura/Camada"
                  value={medicaoEdit.observacoes || ''} 
                  onChange={(e) => handleInputChange('observacoes', e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #D1D5DB', fontFamily: 'inherit' }}
                />
            </div>
            {/* BOTÕES DE AÇÃO */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <Button 
                variant="outlined" 
                color="inherit" 
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
                onClick={() => setIsEditModal(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="contained" 
                style={{ 
                  textTransform: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: 500,
                  backgroundColor: '#e67e22',
                  borderColor: '#E5E7EB',
                  color: '#ffffff',
                  width: '11rem',
                  height: '2.8rem',
                  fontSize: '1rem'
                 }} 
                onClick={handleEdit}
              >
                Salvar alterações
              </Button>
            </div>

          </div>
        )}
      </Modal>

  </>
  );
};