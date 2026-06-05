import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const exportToExcel = async<T extends object> (data: T[], fileName: string) => {
    if (!data || data.length === 0) {
        console.warn("Nenhum dado para exportar.");
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Relatório');

    const colunasDinamicas = Object.keys(data[0]).map(key => ({ 
        header: key,
        key: key,
        width: 20
    }));

    worksheet.columns = colunasDinamicas;
    worksheet.addRows(data);

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4CAF50' }
    };

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${fileName}.xlsx`);
    
}    