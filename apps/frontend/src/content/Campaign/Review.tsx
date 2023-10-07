import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {StepComponentProps} from "@content/Campaign/StepTypes";
import useCampaginCreationStore from "@providers/CampaignCreationStore";
import style from "@styles/style.module.scss";
import {Text} from "@components/Text/TextComponent";
import {RewardType} from "@constants/types";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";
import Button from "@mui/material/Button";
import {SingleDivider} from "@components/Divider/SingleDivider";

export function Review({buttonAction, ...props}: StepComponentProps){
    const { adDetails, distribution, reward } = useCampaginCreationStore((state) => state.data);


    const totalCost = 0.1 * distribution.userReach;
    const fees = 0.1 * totalCost;
    return (
        <div className="flex flex-col w-full justify-center gap-y-2">
            <TextDivider>STEP 4 - REVIEW & PAY</TextDivider>

            {/* Ad Details */}
            <div>
                <Text.Subtitle1 sx={{textDecoration: "underline"}}>
                    Ad Details
                </Text.Subtitle1>
                <div className={"flex flex-row items-center gap-x-2"}>
                    <img
                        style={{
                            width:"50px",
                            height:"50px",
                            borderRadius: style.borderRadiusMd,
                        }}
                        src={adDetails.temporaryUrl}
                        alt="image"
                    />

                    <div className={"flex flex-col"}>
                        <Text.Subtitle1>
                            {adDetails.name} {adDetails.symbol}
                        </Text.Subtitle1>
                        <Text.Subtitle1>
                            {adDetails.description}
                        </Text.Subtitle1>
                    </div>
                </div>
            </div>

            {/* Distribution */}
            <div>
                <Text.Subtitle1 sx={{textDecoration: "underline"}}>
                    Distribution
                </Text.Subtitle1>
                <div className={"flex flex-row justify-between items-center"}>
                    <Text.Body2>
                        Dist. date
                    </Text.Body2>
                    <Text.Body2>
                        Duration
                    </Text.Body2>
                    <Text.Body2>
                        User-group
                    </Text.Body2>
                    <Text.Body2>
                        Min. users
                    </Text.Body2>
                </div>
                <div className={"flex flex-row justify-between items-center"}>
                    <Text.Body2>
                        {distribution.distributionDate}
                    </Text.Body2>
                    <Text.Body2>
                        {distribution.duration} day{distribution.duration > 1 ? "s" : ""}
                    </Text.Body2>
                    <Text.Body2>
                        {distribution.userGroups[0]}
                    </Text.Body2>
                    <Text.Body2>
                        {distribution.userReach}
                    </Text.Body2>
                </div>
            </div>

            {/* Survey */}
            <div>
                <Text.Subtitle1 sx={{textDecoration: "underline"}}>
                    Survey
                </Text.Subtitle1>
                {reward.type === RewardType.Survey &&
                    <>
                        {reward.questions.map((question, index) => (
                            <div key={index} className={"flex flex-row justify-between items-center"}>
                                <Text.Body2>
                                    {question.question}
                                </Text.Body2>
                                <Text.Body2>
                                    {question.questionType}
                                </Text.Body2>
                            </div>
                        ))}
                    </>
                }
            </div>


            {/* Cost */}
            <div>
                <Text.Subtitle1 sx={{textDecoration: "underline"}}>
                    Cost
                </Text.Subtitle1>
                <div className={"flex justify-between"}>
                    <Text.Body2>
                        User reach
                    </Text.Body2>
                    <Text.Body2>
                        0.1$ x {distribution.userReach} = {totalCost}$
                    </Text.Body2>
                </div>
                <div className={"flex justify-between"}>
                    <Text.Body2>
                        AdDrop fee (10%)
                    </Text.Body2>
                    <Text.Body2>
                        {fees}$
                    </Text.Body2>
                </div>
                <SingleDivider/>
                <div className={"flex justify-between"}>
                    <Text.Body2>
                        Total
                    </Text.Body2>
                    <Text.Body2>
                        {totalCost + fees}$
                    </Text.Body2>
                </div>
                <div className={"flex justify-end"}>
                    <Text.Body2>
                        Pay in USDC
                    </Text.Body2>
                </div>
            </div>

            <div className={"flex justify-center"}>
                <Button
                    {...ButtonConfig.submitCampaign}
                />
            </div>
        </div>
    );
}