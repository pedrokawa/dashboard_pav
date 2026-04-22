import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "../api/api";
import { DataTable, type ColumnConfig } from "../components/DataTable";
import { dateFormat } from "../utils/dateFormat";
import { Loading } from "../components/Loading";
import { ExportButton } from "../components/ExportButton";
import { exportToExcel } from "../utils/exportExcel";

interface Dp {
    id: number;
    user: string;
    createdAt: string;
}

export const RelDp = () => {

    const [dps, setDps] = useState<Dp[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDps = async () => {
            try {
                setIsLoading(true);
                const dados = await api.getUsers();
                setDps(dados);
            } catch (error) {
                console.error("Erro ao buscar DPs:", error);
                toast.error("Erro ao buscar DPs.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDps();
    }, []);

    const colunas: ColumnConfig<Dp>[] = [
        { key: 'user', label: 'Nome', align: 'left' },
        { 
        key: 'createdAt', 
        label: 'Atividade desde', 
        align: 'left', 
        render: (row) => dateFormat(row.createdAt) 
        }
    ];

    return (
    <>
    <div style={{ width: '100%'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0, color: 'var(--texto-escuro)', fontSize: '1.8rem' }}>
           Departamento Pessoal
        </h1>

        <ExportButton
            disabled={isLoading}
            onClick={() => {
                const formatData = dps.map((item) => ({
                    'Nome': item.user,
                    'Atividade desde': dateFormat(item.createdAt),
                }));
                exportToExcel(formatData, "Relatório de Departamento Pessoal");
            }} />
        
    </div>    
    { isLoading ? (
        <Loading text="Buscando colaboradores..." />
    ) : (
        <DataTable data={dps} columns={colunas} />
    )}
    </div>
    </>
    );

}