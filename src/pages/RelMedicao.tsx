import { useState, useEffect } from 'react';

import { Tabs, type TabItem } from '../components/Tabs';
import { DataTable, type ColumnConfig } from '../components/DataTable';
// import { Button } from '@mui/material';
// import { Modal } from '../components/Modal';
// import { DatePicker } from '../components/DatePicker';
import { Loading } from '../components/Loading';
// import { SearchBar } from '../components/SearchBar';

// import * as xlsx from 'xlsx';

import { type Medicao } from '../types/Medicao';
import { api } from '../api/api';

export const RelMedicao = () => {

  const [medicao, setMedicao] = useState<Medicao[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      label: 'Extensão',
      align: 'left',
    },
    {
      key: 'largura',
      label: 'Largura',
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
    // {
    //   key: 'foto',
    //   label: 'Fotos',
    //   align: 'left',
    // },
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

  </>
  );
};