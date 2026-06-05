import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { logo } from './logoBase64';

export const exportMedicao = async (data: (string | number)[][], fileName: string) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Medição - RDO');

    worksheet.columns = [
        { width: 3 },  // A (vazio)
        { width: 12 }, // B (DATA)
        { width: 15 }, // C (APONTADOR)
        { width: 12 }, // D (RODOVIA)
        { width: 12 }, // E (SENTIDO)
        { width: 12 }, // F (KM INICIAL)
        { width: 12 }, // G (KM FINAL)
        { width: 12 }, // H (EXTENSÃO)
        { width: 10 }, // I (LARGURA)
        { width: 12 }, // J (ESPESSURA)
        { width: 6 },  // K (FAIXA)
        { width: 12 }, // L (ÁREA TOTAL)
        { width: 20 }  // M (OBSERVAÇÕES)        
    ];

    console.log(data)

    let periodo = "-";
    if (data.length > 0) {

        const dataIni = data[data.length - 1][1];
        const dataFim = data[0][1];

        periodo = `${dataIni} a ${dataFim}`;
        console.log(periodo);
    }

    worksheet.addRow(["", "CLIENTE:", ""]);
    worksheet.addRow(["", "OBRA/LOCAL:", "ASFALTOPAV", "", "", "PERÍODO:", periodo]);
    worksheet.addRow(["", "APONTAMENTO DE OBRA - APLICAÇÃO MRAF"]);
    worksheet.addRow([]); // Linha 4 vazia
    worksheet.addRow([
        "", "DATA", "APONTADOR", "RODOVIA", "SENTIDO", "KM INICIAL", "KM FINAL", 
        "EXTENSÃO", "LARGURA", "ESPESSURA", "FAIXA", "ÁREA TOTAL", "OBSERVAÇÕES"
    ]);

    worksheet.addRows(data);

    worksheet.mergeCells('B3:M3');

    const titleCell = worksheet.getCell('B3');
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };
    titleCell.font = { bold: true };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
 
    for (let col = 2; col <= 13; col++) {
        const cell = worksheet.getCell(5, col);
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE67E22' } };
        cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = {
            top: { style: 'thin' }, bottom: { style: 'thin' },
            left: { style: 'thin' }, right: { style: 'thin' }
        };
    }
    //logo
    const logoId = workbook.addImage({
        base64: logo,
        extension: 'jpeg',
    });

    worksheet.addImage(logoId, {
        tl: { col: 12, row: 0 }, 
        ext: { width: 140, height: 40 } 
    });
    
    const buffer = await workbook.xlsx.writeBuffer() as ArrayBuffer;
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `${fileName}.xlsx`);

}