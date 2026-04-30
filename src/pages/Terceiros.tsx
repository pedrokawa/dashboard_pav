import { useState } from "react";
import { DataTable, type ColumnConfig } from "../components/DataTable";
// import { SearchBar } from "../components/SearchBar";
// import { Loading } from "../components/Loading";

interface PrestServico {
    id: number;
    nome: string;
    cnpj: string;
    servico: string;
    valor: string;
    dataServico: string;
}

export const Terceiros = () => {

    const [servicos] = useState<PrestServico[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [termoBusca, setTermoBusca] = useState('');

    const colunas: ColumnConfig<PrestServico>[] = [
        { key: 'dataServico', label: 'Data do Serviço', align: 'left' },
        { key: 'nome', label: 'Nome do Prestador', align: 'left' },
        { key: 'cnpj', label: 'CNPJ', align: 'left' },
        { key: 'servico', label: 'Serviço', align: 'left' },
        { key: 'valor', label: 'Valor', align: 'left' }
    ];

    return (
    <> 
    <div style={{ width: '100%'}}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ margin: '0 0 1.5rem 0', color: 'var(--texto-escuro)', fontSize: '1.8rem' }}>
                Prestação de Serviços de Terceiros
            </h1>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                
            {/* <SearchBar /> */}

            {/* <ExportButton  */}

            </div>

        </div>

        {/* {isLoading ? (
            <Loading text="Buscando serviços..." /> 
        ) : ( */}
                <DataTable columns={colunas} data={servicos}>
                </DataTable>
        {/* )} */}
    
    </div>
    </>
    )
};