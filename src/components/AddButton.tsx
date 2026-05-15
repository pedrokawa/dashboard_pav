import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface AddButtonProps {
    onClick: () => void;
    text?: string;
    disabled?: boolean;
}

export const AddButton = ({ onClick, text = 'Cadastrar', disabled = false}: AddButtonProps) => {
    return (
        <>
            <Button 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
            onClick={onClick}
            disabled={disabled}
            sx={{
                textTransform: 'none',
                borderRadius: '0.5rem',
                fontWeight: 500,
                backgroundColor: '#e67e22',
                borderColor: '#E5E7EB',
                color: '#ffffff',
                width: '9rem',
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