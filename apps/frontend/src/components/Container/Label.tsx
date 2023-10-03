import Box from "@mui/material/Box";
import style from "@styles/style.module.scss";
import {Text} from "@components/Text/TextComponent";
import React from "react";

export function Label({children}: { children: React.ReactNode }) {
    return (
        <Box
            component="div"
            position="relative"
            display={"flex"}
            flexDirection={"column"}
            alignSelf={"center"}
            color={"primary.main"}
            sx={{
                borderRadius: style.borderRadiusMd,
                boxShadow: (theme) => `inset 0 0 0 1px ${theme.palette.text.primary}`,
            }}
            padding={"8px 16px"}
        >
            {children}
        </Box>
    );
}