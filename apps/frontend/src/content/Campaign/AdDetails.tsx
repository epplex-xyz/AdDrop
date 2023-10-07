import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {StandardInput} from "@components/Input/TextField";
import {ImageUpload} from "@components/Input/ImageUpload";
import {Text} from "@components/Text/TextComponent";
import Button from "@mui/material/Button";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";
import toast from "react-hot-toast";
import {StepComponentProps} from "@content/Campaign/StepTypes";
import useCampaginCreationStore from "@providers/CampaignCreationStore";

export function AdDetails({buttonAction, ...props}: StepComponentProps ){
    const { adDetails } = useCampaginCreationStore((state) => state.data);
    const setAdDetails = useCampaginCreationStore((state) => state.setAdDetails);


    const imageUpload = ImageUpload(null);
    const description = StandardInput({
        initialValue: adDetails.description,
        placeholder: 'Describe your campaign',
        width: "100%",
        height: "100px",
        multiline: true,
    });
    const nameInput = StandardInput({
        initialValue: adDetails.name,
        placeholder: "Name",
        height: "35px"
    });
    const symbolInput = StandardInput({
        initialValue: adDetails.symbol,
        placeholder: "Symbol",
        height: "35px"
    });

    const handleNextStep = () => {
        try {
            if (imageUpload.selectedFile === null) {
                throw new Error("No image uploaded");
            }

            if (description.input === "") {
                throw new Error("No description");
            }

            if (nameInput.input === "") {
                throw new Error("Name not specified");
            }

            if (symbolInput.input === "") {
                throw new Error("Symbol not specified");
            }

            console.log("url", imageUpload.temporaryUrl);
            setAdDetails({
                image: imageUpload.selectedFile,
                temporaryUrl: imageUpload.temporaryUrl,
                description: description.input,
                name: nameInput.input,
                symbol: symbolInput.input,
            });

            buttonAction();
        } catch (e: any) {
            toast.error(e.message);
        }
    };

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
                onClick={handleNextStep}
                {...ButtonConfig.nextStep}
            />
        </div>
    );
}