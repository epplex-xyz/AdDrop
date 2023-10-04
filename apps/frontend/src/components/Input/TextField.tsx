import {styled} from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { useState } from "react";
import style from "../../styles/style.module.scss";


const Input = styled(TextField)(({theme }) => ({
    '& .MuiTextField-root': {
        display: 'contents',

    },
    '& .MuiInputBase-input': {
        padding: '0px',
        color: theme.palette.text.primary,
        textAlign: "center",
    },
    '& .MuiOutlinedInput-root': {
        // backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
        borderWidth: '0px',
        boxShadow: `inset 0 0 0 1px ${theme.palette.text.primary}`,
        borderRadius: style.borderRadiusMd,
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none"
    }
}));

export function StandardInput({placeholder, height = "undefined", ...props}): {inputComponent: React.ReactNode, input: string} {
    const [input, setInput] = useState("");

    const handleSearchChange = (e) => {
        setInput(e.target.value);
    };

    const inputComponent = <Input
        autoComplete="off"
        value={input}
        placeholder={placeholder}
        onChange={handleSearchChange}
        sx={{
            textAlign: "center",
            '& .MuiInputBase-input': {
                height: height,
            },
            ...props,
        }}
    />;

    return {inputComponent, input};
}