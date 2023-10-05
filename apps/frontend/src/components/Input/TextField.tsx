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

interface Props  {
    initialValue?: string;
    height?: string;
    width?: string;
}
export function StandardInput({
    initialValue = "",
    height = "undefined",
    ...props
}: Props & TextFieldProps): {inputComponent: React.ReactNode, input: string} {
    const [input, setInput] = useState(initialValue);

    const handleSearchChange = (e) => {
        setInput(e.target.value);
    };

    const inputComponent = <Input
        autoComplete="off"
        value={input}
        onChange={handleSearchChange}
        placeholder={props.placeholder}
        multiline={props.multiline}
        sx={{
            textAlign: "center",
            '& .MuiInputBase-input': {
                height: height,
            },
            width: props.width,
        }}
    />;

    return {inputComponent, input};
}