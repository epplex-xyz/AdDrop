import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {StepComponentProps} from "@content/Campaign/StepTypes";
import toast from "react-hot-toast";
import useCampaginCreationStore from "@providers/CampaignCreationStore";
import Button from "@mui/material/Button";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";

export function Survey({buttonAction, ...props}: StepComponentProps){
    const { distribution } = useCampaginCreationStore((state) => state.data);
    const setDistribution = useCampaginCreationStore((state) => state.setDistribution);

    const handleNextStep = () => {
        try {


            // setDistribution({
            //     distributionDate: date.input,
            //     userReach: userReach.input as unknown as number, //todo
            //     userGroups: [],
            // })

            buttonAction();
        } catch (e: any) {
            toast.error(e.message);
        }
    }

    return (
        <div className="flex flex-col w-full items-center gap-y-4">
            <TextDivider>STEP 3 - SURVEY</TextDivider>

            <Button
                onClick={handleNextStep}
                {...ButtonConfig.nextStep}
            />
        </div>
    );
}