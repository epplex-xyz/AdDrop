import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {StepComponentProps} from "@content/Campaign/StepTypes";
import useCampaginCreationStore from "@providers/CampaignCreationStore";
import Button from "@mui/material/Button";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";
import {Text} from "@components/Text/TextComponent";
import toast from "react-hot-toast";
import {MySelect} from "@components/Input/MySelect";
import {preferenceList} from "@constants/preference";
import {NumberField} from "@components/Input/Number";
import {MyDatePicker} from "@components/Input/DatePicker";
import {durationList} from "@constants/duration";

export function Distribution({buttonAction, ...props}: StepComponentProps){
    const { distribution } = useCampaginCreationStore((state) => state.data);
    const setDistribution = useCampaginCreationStore((state) => state.setDistribution);
    const date = MyDatePicker({
        width: "150px",
        defaultValue: distribution.distributionDate
    });
    const number = NumberField({
        height: "35px",
        defaultValue: distribution.userReach
    });

    const duration = MySelect({
        options: durationList,
        defaultValue: distribution.duration
    });

    const userPreference = MySelect({
        options: preferenceList,
        defaultValue: distribution.userGroups[0]
    });

    const handleNextStep = () => {
        try {
            if (date.date === null) {
                throw new Error("No distribution date provided");
            }
            // Might need to do more errorhandling here

            setDistribution({
                distributionDate: date.date.toISOString(),
                duration: duration.value,
                userReach: number.value,
                userGroups: [userPreference.value],
            });

            buttonAction();
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <div className="flex flex-col w-full items-center gap-y-4">
            <TextDivider>STEP 2 - Distribution</TextDivider>

            <div className="flex justify-between w-full items-center">
                <Text.Subtitle1>
                    Distribution date
                </Text.Subtitle1>
                {date.component}
            </div>

            <div className="flex justify-between w-full items-center">
                <Text.Subtitle1>
                    Duration
                </Text.Subtitle1>
                {duration.component}
            </div>

            <div className="flex justify-between w-full items-center">
                <Text.Subtitle1>
                    Target user reach sd
                </Text.Subtitle1>
                {number.component}
            </div>

            <div className="flex justify-between w-full items-center">
                <Text.Subtitle1>
                    User group
                </Text.Subtitle1>
                {userPreference.component}
            </div>

            <Button
                onClick={handleNextStep}
                {...ButtonConfig.nextStep}
            />
        </div>
    );
}