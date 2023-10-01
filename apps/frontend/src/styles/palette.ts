import { grey } from "@mui/material/colors";
import palette from "../styles/palette.module.scss";

/*
 * Light
 */

export const paletteLight = {
    primary: {
        main: palette.primaryRed,
    },
    secondary: {
        main: palette.primaryWhite,
    },
    background: {
        // Toggles the bg color of dropdown menu
        default: palette.primaryWhite,
        paper: palette.primaryWhite,
    },
    text: {
        primary: palette.contrastBlack,
        secondary: palette.backgroundGrey,
    },
};

/*
 * Dark
 */
export const paletteDark = {
    primary: {
        main: grey[900],
    },
    secondary: {
        main: paletteLight.secondary.main,
    },
    background: {
        default: grey[700],
        paper: grey[500],
    },
    text: {
        primary: palette.baseYellow,
        secondary: palette.contrastBlack,
    },
};
