import {BoxProps} from "@mui/material/Box";
import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";


export function Review({...props}: BoxProps){
    return (
        <div className="flex flex-col w-full justify-center">
            <TextDivider>REVIEW</TextDivider>
        </div>
    );
}