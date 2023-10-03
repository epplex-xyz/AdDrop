import { IconButton } from "@mui/material";

export function RoundIconButton({children, ...props}) {
    return (
        <IconButton
            sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.text.primary,
                border: (theme) => `2px solid ${theme.palette.text.primary}`,
                boxShadow: (theme) => `3px 3px ${theme.palette.text.primary}`,
                "&:hover": {
                    boxShadow: (theme) => `3px 3px ${theme.palette.text.primary}80`
                }
            }}
            {...props}
        >
            {children}
        </IconButton>
    );
}