import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

interface EditButtonProps {
    onClick: () => void;
    text?: string;
    disabled?: boolean;
}

export const EditButton = ({ onClick, disabled = false}: EditButtonProps) => {
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
                <EditIcon />
            </Button>
        </>
    );
};