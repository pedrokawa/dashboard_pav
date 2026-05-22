import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonProps {
    onClick: () => void;
    text?: string;
    disabled?: boolean;
}

export const DeleteButton = ({ onClick, disabled = false}: DeleteButtonProps) => {
    return (
        <>
            <Button 
            variant="contained" 
            color="primary"
            onClick={onClick}
            disabled={disabled}
            sx={{
                textTransform: 'none',
                borderRadius: '0.5rem',
                fontWeight: 500,
                backgroundColor: '#e67e22',
                borderColor: '#E5E7EB',
                color: '#ffffff',
                width: '2rem',
                height: '2.8rem',
                fontSize: '1rem'
            }}
            >
                <DeleteIcon />
            </Button>
        </>
    );
};