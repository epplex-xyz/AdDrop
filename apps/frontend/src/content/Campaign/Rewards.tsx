import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {StepComponentProps} from "@content/Campaign/StepTypes";
import toast from "react-hot-toast";
import useCampaginCreationStore from "@providers/CampaignCreationStore";
import Button from "@mui/material/Button";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";
import {MySelect} from "@components/Input/MySelect";
import {Question, QuestionType, questionTypes, rewardList, RewardType} from "@constants/reward";
import {Text} from "@components/Text/TextComponent";
import {StandardInput} from "@components/Input/TextField";

function RewardQuestion({defaultQuestion = "", defaultQuestionType = 0}: {defaultQuestion?: string, defaultQuestionType?: number}):
    {questionInput: string, questionType: QuestionType, component: React.ReactNode}
{
    const question = StandardInput({
        initialValue: defaultQuestion,
        multiline: true,
        placeholder: "What's your question?",
        height: "35px"
    });

    const questionType = MySelect({
        options: questionTypes,
        defaultValue: defaultQuestionType,
        width: "120px",
        selectWidth: "120px"
    });

    const component = <div className="flex justify-between w-full">
        {question.inputComponent}

        {questionType.component}
    </div>;

    return {
        questionInput: question.input,
        questionType: questionType.value,
        component
    };
}

export function Rewards({buttonAction, ...props}: StepComponentProps){
    const { reward } = useCampaginCreationStore((state) => state.data);
    const setReward = useCampaginCreationStore((state) => state.setReward);

    // TODO fillin the zustand store
    const questions = Array(3).fill(null).map( (i) => {
        return RewardQuestion({
            // defaultQuestion: reward.type === RewardType.Survey ? reward.questions[i].question : "",
            // defaultQuestionType: reward.type === RewardType.Survey ? reward.questions[i].questionType : 0
        });
    });

    const rewardType = MySelect({
        options: rewardList,
        defaultValue: reward.type,
        width: "200px"
    });

    const handleNextStep = () => {
        try {
            if (rewardType.value !== RewardType.Survey) {
                throw new Error(`Only survey rewards are supported`);
            }

            let qs: Question[] = [];
            for (const [index, {questionInput, questionType}] of questions.entries()) {
                if (questionInput === "") {
                    throw new Error(`Question ${index + 1} not provided`);
                }

                if (questionType !== QuestionType.YesNo) {
                    throw new Error(`Only Yes/No questions are supported`);
                }

                qs.push({
                    questionType: questionType,
                    question: questionInput as string
                });
            }

            setReward({
                type: RewardType.Survey,
                questions: qs
            });

            buttonAction();
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    const mainComponent = () => {
        if (rewardType.value === RewardType.Survey) {
            return (<>
                <div className="flex justify-between w-full">
                    <Text.Subtitle1>
                        Question
                    </Text.Subtitle1>

                    <Text.Subtitle1>
                        Question Type
                    </Text.Subtitle1>
                </div>

                {questions.map(({component}, i) =>
                    <React.Fragment key={i}>
                        {component}
                    </React.Fragment>
                )}
            </>);
        } else if (rewardType.value === RewardType.Voucher) {
            return <Text.Subtitle1>Vouchers are not yet supported</Text.Subtitle1>;
        } else if (rewardType.value === RewardType.Access) {
            return <Text.Subtitle1>Access Tokens are not yet supported</Text.Subtitle1>;
        }
    };

    return (
        <div className="flex flex-col w-full items-center gap-y-4">
            <TextDivider>STEP 3 - REWARDS</TextDivider>
            {rewardType.component}

            {mainComponent()}

            <Button
                onClick={handleNextStep}
                {...ButtonConfig.nextStep}
            />
        </div>
    );
}