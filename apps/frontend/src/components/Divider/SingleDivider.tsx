import React from "react";
import Box from "@mui/material/Box";

export const SingleDivider = ({...props}) => {
    return (
        <Box
            component="div"
            sx={{
                borderTop: (theme) => `1px solid ${theme.palette.text.primary}`,
                width: "100%"
            }}
            className={`self-center`}
            {...props}
        />
    );
};
