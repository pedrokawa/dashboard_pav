export interface Medicao {
    id: number;
    dataMedicao: string;
    apontador: string;
    rodovia: string;
    sentido: string;
    kmIni: number;
    kmFim: number;
    extensao: number;
    largura: number;
    espessura: number;
    faixa: string;
    areaTotal: number;
    observacoes: string;
    foto: string[];
}