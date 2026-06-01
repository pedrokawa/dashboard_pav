import { useState, useEffect } from 'react';

import { Tabs, type TabItem } from '../components/Tabs';
import { DataTable, type ColumnConfig } from '../components/DataTable';
import { Modal } from '../components/Modal';
// import { DatePicker } from '../components/DatePicker';
import { Loading } from '../components/Loading';
import { EditButton } from '../components/EditButton';
import { GalleryButton } from '../components/GalleryButton';
import { Toast } from '../components/Toast'
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

  const colunas: ColumnConfig<Medicao>[] = [
    {
      key: 'dataMedicao',
      label: 'Data',
      align: 'left',
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
      label: 'Extensão (m)',
      align: 'left',
    },
    {
      key: 'largura',
      label: 'Largura (m)',
      align: 'left',
    },
    {
      key: 'faixa',
      label: 'Faixa',
      align: 'left',
    },
    {
      key: 'areaTotal',
      label: 'Área (m²)',
      align: 'left',
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
            console.log("editar medição:", row.id);
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
              backgroundColor: '#1F2937', // Fundo escuro igual de galerias reais
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



  </>
  );
};