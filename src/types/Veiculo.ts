export interface Veiculo {
    id: number;
    placa: string;  
    marca: string;
    modelo: string;
    codigoFrota: string;
    anoFabricacao: number;
    anoModelo: number;
    renavam: string;
    cor: string;
    combustivel: string;
    kmAtual?: number;
    status: string;
}