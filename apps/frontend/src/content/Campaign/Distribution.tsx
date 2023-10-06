import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {StepComponentProps} from "@content/Campaign/StepTypes";
import {StandardInput} from "@components/Input/TextField";
import useCampaginCreationStore from "@providers/CampaignCreationStore";
import Button from "@mui/material/Button";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";
import {Text} from "@components/Text/TextComponent";
import toast from "react-hot-toast";

export function Distribution({buttonAction, ...props}: StepComponentProps){
    const { distribution } = useCampaginCreationStore((state) => state.data);
    const setDistribution = useCampaginCreationStore((state) => state.setDistribution);

    // TODO need proper date
    const date = StandardInput({
        initialValue: distribution.distributionDate,
        placeholder: "Name",
        height: "35px"
    });

    // number based input
    const userReach = StandardInput({
        initialValue: "", // TODO
        placeholder: "Name",
        height: "35px"
    });

    // TODO handle usergroups

    const handleNextStep = () => {
        try {
            if (date.input === "") {
                throw new Error("No distribution date provided");
            }

            if (userReach.input === "") {
                throw new Error("Minimum user reach not provided");
            }

            // TOOD user group
            // if (=== "") {
            //     throw new Error("Minimum user reach not provided");
            // }

            setDistribution({
                distributionDate: date.input,
                userReach: userReach.input as unknown as number, //todo
                userGroups: [],
            })

            buttonAction();
        } catch (e: any) {
            toast.error(e.message);
        }
    }

    return (
        <div className="flex flex-col w-full items-center gap-y-4">
            <TextDivider>STEP 2 - Distribution</TextDivider>

            <div className="flex justify-between w-full">
                <Text.Subtitle1>
                    Distribution date
                </Text.Subtitle1>
                {date.inputComponent}
            </div>

            <div className="flex justify-between w-full">
                <Text.Subtitle1>
                    Target user reach
                </Text.Subtitle1>
                {userReach.inputComponent}
            </div>

            <div className="flex justify-between w-full">
                <Text.Subtitle1>
                    User groups
                </Text.Subtitle1>
                {userReach.inputComponent}
            </div>

            <Button
                onClick={handleNextStep}
                {...ButtonConfig.nextStep}
            />
        </div>
    );
}