import { Button } from "@mui/material";

interface ExportButtonProps {
    onClick: () => void;
    text?: string;
    disabled?: boolean;
}

export const ExportButton = ({ onClick, text = 'Exportar relatório', disabled = false}: ExportButtonProps) => {
    return (
        <>
            <Button 
            variant="contained" 
            color="primary"
            // startIcon={}
            onClick={onClick}
            disabled={disabled}
            sx={{
                textTransform: 'none',
                borderRadius: '0.5rem',
                fontWeight: 500,
                backgroundColor: '#e67e22',
                borderColor: '#E5E7EB',
                color: '#ffffff',
                width: '11rem',
                height: '2.8rem',
                fontSize: '1rem'
            //     '&:hover': {
            //     backgroundColor: '#F9FAFB',
            //     borderColor: '#D1D5DB',
            // }
            }}
            >
            {text}
            </Button>
        </>
    );
};