import React, {useState} from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {styled} from "@mui/material/styles";
import Select from "@mui/material/Select";
import style from "@styles/style.module.scss";
import {SingleDivider} from "@components/Divider/SingleDivider";
import {Text} from "@components/Text/TextComponent";

// Border color on select
// https://stackoverflow.com/questions/51387085/change-color-of-select-components-border-and-arrow-icon-material-ui
const CustomSelectField = styled(Select)(({ theme }) => ({
    color: theme.palette.text.primary,
    width: "100px",
    height: "40px",
    borderRadius: style.borderRadiusSm,
    '& .MuiOutlinedInput-input': {
        paddingTop: '2px',
        paddingBottom: '2px',
        borderColor: "text.primary",
    },
}));

interface SelectProps<T> {
    options: T[],
    defaultValue: number,
    width?: string,

    selectWidth?: string,
}

export function MySelect<T>({width = "undefined", selectWidth = "undefined", options, defaultValue}: SelectProps<T>) {
    const [value, setValue] = useState<number>(defaultValue);
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    {/* Index for input, adds a label above select field */}
    {/*<InputLabel className="text-xs" id="demo-simple-select-label">Token</InputLabel>*/}
    const component = <FormControl className="text-xs">
        <CustomSelectField
            value={value}
            onChange={handleChange}
            sx={{
                '& .MuiSvgIcon-root': {color: 'text.primary'},
                '& .MuiInputBase-input': {color: 'text.primary'},
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: "text.primary",
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'text.primary'
                },
                width: width,
            }}
            MenuProps={{
                sx: {
                    '& .MuiMenu-list': {
                        paddingTop: '0px',
                        paddingBottom: '0px',
                    },
                },
                PaperProps: {
                    sx: {
                        maxHeight: "80px",
                        width: selectWidth,
                    }
                }
            }}
        >
            {options.map((id, i) =>
                [
                    <MenuItem
                        key={"select" + i}
                        value={i}
                        sx={{
                            minHeight: "unset",
                            maxHeight: "32px",
                        }}

                    >
                        <Text.Body2>
                            {id as React.ReactNode}
                        </Text.Body2>
                    </MenuItem>,
                    (i + 1) !== options.length && <SingleDivider/>
                ]
            )}
        </CustomSelectField>
    </FormControl>;

    return {
        component,
        value
    };
}
