export interface Abastecimento {
    placa: string;
    marca: string;
    modelo: string;
    km: string;
    horimetro?: string;
    operador: string;
    litros: number;
    preco: number;
    total: number;
    posto: string;
    dataAbastecimento: string;
    foto?: string;
}