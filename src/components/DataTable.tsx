import { 
    Table, 
    TableBody, 
    TableCell,
    TableContainer,
    TableHead, 
    TableRow,
    Paper
} from "@mui/material";

import { type ReactNode } from "react";

export interface ColumnConfig<T> {
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
    columns: ColumnConfig<T>[];
    data: T[];
}   

export const DataTable = <T extends object>({ columns, data }: DataTableProps<T>) => {
    return (
        <TableContainer 
        component={Paper} 
        elevation={0} 
        sx={{ border: '1px solid #E5E7EB', borderRadius: '0.5rem' }}>
            <Table sx={{ minWidth: 650 }} aria-label="tabela customizada">
                {/* Cabeçalho da tabela */}
                <TableHead sx={{ backgroundColor: '#f9fafb'}}>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.key}
                                align={column.align || 'left'}
                                sx={{ 
                                    fontWeight: 'bold',
                                    color: '#374151'
                                }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => {
                        const rowId = (row as Record<string, unknown>).id;
                        const rowKey = rowId ? String(rowId) : String(rowIndex);

                        return (
                        <TableRow 
                        key={rowKey}
                        sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': { backgroundColor: '#f3f4f6' },
                        }}
                        >
                            {columns.map((column) => (
                                <TableCell key={`${rowKey}-${column.key}`} align={column.align || 'left'}>
                                {/* Resolve o erro do 'any': Avisamos ao TS que column.key é uma chave válida de T */}
                                {column.render ? column.render(row) : (row[column.key as keyof T] as ReactNode)}
                                </TableCell>
                            ))}
                        </TableRow>
                    );    
                })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};