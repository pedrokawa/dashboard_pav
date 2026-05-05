import { Tabs, type TabItem } from '../components/Tabs';
import { Button } from '@mui/material';
import { useState, type DragEvent, type ChangeEvent } from 'react';
import { Modal } from '../components/Modal';
import { DatePicker } from '../components/DatePicker';

import * as xlsx from 'xlsx';
import { SearchBar } from '../components/SearchBar';

export const Medicao = () => {

  const [termoBusca, setTermoBusca] = useState('');
  const [dataFiltro, setDataFiltro] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [arquivo, setArquivo] = useState<File | null>(null);

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setArquivo(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArquivo(e.target.files[0]);
    }
  };

  const importFile = () => {
    if (!arquivo) {
      alert('Nenhum arquivo selecionado!');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target?.result;
      if (arrayBuffer) {
        const workbook = xlsx.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        console.log('Dados importados:', data);
        alert('Arquivo importado com sucesso! Veja os dados no console.');

        setIsModalOpen(false);
      }
    }

    reader.readAsArrayBuffer(arquivo);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setArquivo(null);
  }

  const myAbas: TabItem[] = [
    {
      id: 'producao',
      label: 'Produção MRAF',
      // Aqui dentro você coloca a tabela inteira!
      content: 
      <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        }}>
        {/* <h1>Em breve: Produção Diária</h1> */}
        <Button 
        variant="contained" 
        color="primary"
        // // startIcon={}
        onClick={() => setIsModalOpen(true)}
        // disabled={disabled}
        sx={{
          textTransform: 'none',
          borderRadius: '0.5rem',
          fontWeight: 500,
          backgroundColor: '#e67e22',
          borderColor: '#E5E7EB',
          color: '#ffffff',
          width: '11rem',
          height: '2.8rem',
          fontSize: '1rem'}}
        >Importar Produção
        </Button>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <SearchBar 
          value={termoBusca}
          onChange={setTermoBusca}
          placeholder='Buscar medição...'
          />

          <DatePicker 
          value={dataFiltro}
          onChange={setDataFiltro}
          />

        </div>
      </div>

      {/* <div>
        <DataTable></DataTable>
      </div> */}
          
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
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      titulo="Importar Produção"
    >

      {/* Área de Input de Arquivo Interativa */}
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: isDragging ? '2px dashed #F97316' : '2px dashed #D1D5DB', // Fica laranja ao arrastar!
            backgroundColor: isDragging ? '#FFF7ED' : '#F9FAFB', // Fundo muda também
            borderRadius: '0.5rem',
            padding: '2.5rem 1rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {arquivo ? (
            // VISUAL QUANDO O ARQUIVO ESTÁ CARREGADO
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ color: '#10B981' }}> {/* Ícone de Check Verde */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <p style={{ margin: 0, color: '#374151', fontWeight: 600 }}>{arquivo.name}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>
                {(arquivo.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button 
                onClick={(e) => {
                  e.preventDefault(); // Impede de abrir a janela de arquivo de novo
                  setArquivo(null); // Limpa o estado
                }}
                style={{ 
                  marginTop: '0.5rem', padding: '0.25rem 0.5rem', color: '#EF4444', 
                  background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold'
                }}
              >
                Remover planilha
              </button>
            </div>
          ) : (
            // VISUAL PADRÃO QUANDO ESTÁ VAZIO
            <>
              <div style={{ color: isDragging ? '#F97316' : '#6B7280', transition: 'color 0.2s' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <div>
                <p style={{ margin: 0, color: isDragging ? '#F97316' : '#374151', fontWeight: 500 }}>
                  {isDragging ? 'Solte a planilha aqui!' : 'Clique ou arraste seu arquivo Excel'}
                </p>
              </div>
            </>
          )}

          {/* O input original fica invisível, quem faz o trabalho é a <label> */}
          <input 
            type="file" 
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            style={{ display: 'none' }} 
          />
        </label>

        {/* Botões de Ação do Modal */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <Button
            variant="contained" 
            color="primary"
            onClick={closeModal}
            style={{
              textTransform: 'none',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              backgroundColor: '#E5E7EB',
              borderColor: '#E5E7EB',
              color: '#000000',
              width: '11rem',
              height: '2.8rem',
              fontSize: '1rem'
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained" 
            color="primary" 
            disabled={!arquivo}
            onClick={importFile}
            style={{
              textTransform: 'none',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              backgroundColor: '#e67e22',
              borderColor: '#E5E7EB',
              color: '#ffffff',
              width: '11rem',
              height: '2.8rem',
              fontSize: '1rem'}}
          >
            Importar
          </Button>
        </div>
    </Modal>
  </>
  );
};