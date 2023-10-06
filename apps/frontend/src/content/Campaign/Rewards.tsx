import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {StepComponentProps} from "@content/Campaign/StepTypes";
import toast from "react-hot-toast";
import useCampaginCreationStore, {defaultAccess, defaultSurvey, defaultVoucher} from "@providers/CampaignCreationStore";
import Button from "@mui/material/Button";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";
import {MySelect} from "@components/Input/MySelect";
import {QuestionType, rewardList, RewardProps, RewardType} from "@constants/types";
import {Text} from "@components/Text/TextComponent";


function RewardInput(questionType: QuestionType) {
    switch (questionType) {
        case QuestionType.YesNo:
            return <>Yes/No</>
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
            return <Text.Subtitle1>Vouchers are not yet supported</Text.Subtitle1>;
        case RewardType.Access:
            return <Text.Subtitle1>Access Tokens are not yet supported</Text.Subtitle1>;
        default:
            throw new Error('Invalid reward type');
    }
}

export function Rewards({buttonAction, ...props}: StepComponentProps){
    const { reward } = useCampaginCreationStore((state) => state.data);
    const setDistribution = useCampaginCreationStore((state) => state.setReward);

    const rewardType = MySelect({
        options: rewardList,
        defaultValue: reward.type,
        width: "200px"
    });


    const handleNextStep = () => {
        try {

            buttonAction();
        } catch (e: any) {
            toast.error(e.message);
        }
    };


    const rewardData = () => {
        switch (rewardType.value) {
            case RewardType.Voucher:
                if (reward.type === RewardType.Voucher) {
                    return reward
                } else {
                    return defaultVoucher
                }
            case RewardType.Access:
                if (reward.type === RewardType.Access) {
                    return reward
                } else {
                    return defaultAccess
                }
            case RewardType.Survey:
                if (reward.type === RewardType.Survey) {
                    return reward
                } else {
                    return defaultSurvey
                }
        }

        throw new Error("Invalid reward type");
    }


    return (
        <div className="flex flex-col w-full items-center gap-y-4">
            <TextDivider>STEP 3 - REWARDS</TextDivider>
            {rewardType.component}


            {RewardQuestion(rewardData())}

            <Button
                onClick={handleNextStep}
                {...ButtonConfig.nextStep}
            />
        </div>
    );
}