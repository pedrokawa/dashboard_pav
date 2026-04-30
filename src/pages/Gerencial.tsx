import { ActionCard } from "../components/ActionCard";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EditRoadOutlinedIcon from '@mui/icons-material/EditRoadOutlined';

export const VisaoGeral = () => {
  return (
    <>
    <div
    style={{ padding: '0.5rem 0.5rem', color: 'var(--texto-escuro)' }}
    >
      <h1 style={{ margin: '0 0 1.5rem 0', color: 'var(--texto-escuro)', fontSize: '1.8rem' }}>
        Selecione o que faremos:
      </h1>
      <div style={{ marginTop: '3rem' }}>
        
        {/* Grid responsivo: se a tela diminuir, os cards caem pra linha de baixo sozinhos */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          

          <ActionCard 
            titulo="Gestão de Frota" 
            descricao="Visualize caminhões, máquinas e seus status." 
            icone={<DirectionsCarIcon />}
            rota="/dashboard/relatorios/veiculos" 
          />

          <ActionCard 
            titulo="Abastecimentos" 
            descricao="Controle de consumo, histórico de litros e gastos." 
            icone={<LocalGasStationIcon />} 
            rota="/dashboard/relatorios/abastecimentos" 
          />

          <ActionCard 
            titulo="Departamento Pessoal" 
            descricao="Relatórios de colaboradores." 
            icone={<PersonIcon />} 
            rota="/dashboard/relatorios/dp" 
          />
          
          <ActionCard 
            titulo="Medição Diária" 
            descricao="Relatórios de produtividade e lançamentos de campo." 
            icone={<AssessmentIcon />} 
            rota="/dashboard/medicao" 
          />

          <ActionCard 
            titulo="Prestação de Serviços" 
            descricao="Relatórios de serviços de terceiros." 
            icone={<EditRoadOutlinedIcon />} 
            rota="/dashboard/terceiros" 
          />

        </div>
      </div>
    </div>  
    </>
  );
};