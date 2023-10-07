import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import style from "@styles/style.module.scss";
export const StyledTextField = styled(TextField)(({theme }) => ({
    '& .MuiTextField-root': {
        display: 'contents',
    },
    '& .MuiInputBase-input': {
        padding: '0px',
        maxWidth: '100px',
        // height: "30px",
        fontSize: "14px",
        // fontWeight: "900",
        // [theme.breakpoints.down('sm')]: {
        //     maxWidth: '25px',
        //     height: "25px",
        //     fontSize: "1rem"
        // },
    },
    '& .MuiOutlinedInput-root': {
        // backgroundColor: theme.palette.secondary.main,
        // borderWidth: '1px',
        borderRadius: style.borderRadiusSm,
        border: `0.5px solid ${theme.palette.text.primary}`
    },
    // could also do at the textfield
    // sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none"
    }
}));


export function NumberField({
    height = "undefined",
    width = "undefined",
    defaultValue,
}) {
    const [number, setNumber] = useState<number>(defaultValue);
    const onChangeTicketInput = (e) => {
        if (/[0-9]/.test(Number(e.target.value).toString())) {
            // if (i < ticketNumbers.length - 1) {
            //     inputRef.current[i + 1].focus();
            // }
            setNumber(e.target.value);
            // if (i === (ticketNumbers.length - 1)) {
            //     console.log("here")
            //     handleOnFocus(e, focus, ticket.ticketNumbers, index + 1)
            // }
            // console.log("focus", ticketNumbers.length - 1, index)
        }
    };

    const component = <StyledTextField
        // autoFocus={ index === 0 } // Automatically focus the first one
        // key={"TicketInputFields" + index}
        // inputRef={(el) => inputRef.current[index] = el}
        value={number}
        sx={{
            '& .MuiInputBase-input': {
                height: height,
                width: width,
            }
            // '& .MuiOutlinedInput-root': {
            //     borderColor: "text.primary",
            //     // boxShadow: "2px 2px #F36A59"
            //     // boxShadow: (theme) => `2px 2px ${theme.palette!.textShadow!.light}`
            // }
        }}
        inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]'
        }}
        onChange={(e) => onChangeTicketInput(e)}
    />;

    return {
        component,
        value: number};

}