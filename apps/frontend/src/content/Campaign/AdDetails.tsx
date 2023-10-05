import {BoxProps} from "@mui/material/Box";
import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {StandardInput} from "@components/Input/TextField";
import {ImageUpload} from "@components/Input/ImageUpload";
import {Text} from "@components/Text/TextComponent";
import Button from "@mui/material/Button";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";


// image, metadata, name, symbol

export function AdDetails({buttonAction, ...props}: {buttonAction: () => any} & BoxProps ){
    const imageUpload = ImageUpload();
    const description = StandardInput({
        placeholder: "Paste metadata",
        width: "100%",
        height: "100px"
    });
    const nameInput = StandardInput({
        placeholder: "Name",
        height: "35px"
    });
    const symbolInput = StandardInput({
        placeholder: "Symbol",
        height: "35px"
    });

    console.log("buttonAction", buttonAction);

    return (
        <div className="flex flex-col w-full items-center gap-y-4">
            <TextDivider>STEP 1 - AD DETAILS</TextDivider>
            {imageUpload.component}

            {description.inputComponent}


            <div className="flex justify-between w-full">
                <Text.Subtitle1>
                    Name
                </Text.Subtitle1>
                {nameInput.inputComponent}
            </div>

            <div className="flex justify-between w-full">
                <Text.Subtitle1>
                    Symbol
                </Text.Subtitle1>
                {symbolInput.inputComponent}
            </div>

            <Button
                {...ButtonConfig.nextStep}
                onClick={buttonAction}
            />
        </div>
    );
}