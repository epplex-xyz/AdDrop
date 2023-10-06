import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {StepComponentProps} from "@content/Campaign/StepTypes";
import toast from "react-hot-toast";
import useCampaginCreationStore, {defaultAccess, defaultSurvey, defaultVoucher} from "@providers/CampaignCreationStore";
import Button from "@mui/material/Button";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";
import {MySelect} from "@components/Input/MySelect";
import {getNumericReward, getStringReward, QuestionType, rewardList, RewardProps, RewardType} from "@constants/types";
import {Text} from "@components/Text/TextComponent";


function RewardInput(questionType: QuestionType) {
    switch (questionType) {
        case QuestionType.YesNo:
            return <>YesNo</>
        case QuestionType.Poll:
            return <>Poll</>
        case QuestionType.FiveStar:
            return <>five</>
        case QuestionType.TenNumber:
            return <>10</>
        case QuestionType.FeedbackHundred:
            return <>F100</>
        case QuestionType.FeedbackFiveHundred:
            return <>F500</>
    }
}

function RewardQuestion(reward: RewardProps) {
    switch (reward.type) {
        case RewardType.Survey:
            return <>
                {reward.questions.map( ({questionType, question, answer}, i) =>
                    <div className="flex justify-between w-full" key={i}>
                        {/*this should be a standard input text*/}
                        <Text.Subtitle1>

                            {question}
                        </Text.Subtitle1>

                        {/* This should be separate input types*/}
                        {RewardInput(questionType)}
                    </div>
                )}
            </>

        case RewardType.Voucher:
            return <>voucher</>;
        case RewardType.Access:
            return <>accces</>;
        default:
            throw new Error('Invalid reward type');
    }
}

export function Rewards({buttonAction, ...props}: StepComponentProps){
    const { reward } = useCampaginCreationStore((state) => state.data);
    const setDistribution = useCampaginCreationStore((state) => state.setReward);

    const industry = MySelect({
        options: rewardList,
        // defaultValue: getNumericReward(reward.type),
        defaultValue: reward.type,
        width: "200px"
    });


    console.log("reward", industry.value)

    const rewardData = () => {
        // const stringVal = getStringReward(industry.value);
        const stringVal = industry.value;
        console.log("stringVal", stringVal)
        if (stringVal === RewardType.Voucher) {
            if (reward.type === RewardType.Voucher) {
                return reward
            } else {
                return defaultVoucher
            }
        }
        if (stringVal === RewardType.Access) {
            if (reward.type === RewardType.Access) {
                return reward
            } else {
                return defaultAccess
            }
        }
        if (stringVal === RewardType.Survey) {
            if (reward.type === RewardType.Survey) {
                return reward
            } else {
                return defaultSurvey
            }
        }

        throw new Error("Invalid reward type");
    }

    const handleNextStep = () => {
        try {

            buttonAction();
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <div className="flex flex-col w-full items-center gap-y-4">
            <TextDivider>STEP 3 - REWARDS</TextDivider>
            {industry.component}


            {RewardQuestion(rewardData())}

            <Button
                onClick={handleNextStep}
                {...ButtonConfig.nextStep}
            />
        </div>
    );
}