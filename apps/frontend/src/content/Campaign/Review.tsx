import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {StepComponentProps} from "@content/Campaign/StepTypes";

export function Review({buttonAction, ...props}: StepComponentProps){
    return (
        <div className="flex flex-col w-full justify-center">
            <TextDivider>REVIEW</TextDivider>
        </div>
    );
}