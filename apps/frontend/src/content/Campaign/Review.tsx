import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {StepComponentProps} from "@content/Campaign/StepTypes";
import useCampaginCreationStore from "@providers/CampaignCreationStore";
import style from "@styles/style.module.scss";
import {Text} from "@components/Text/TextComponent";
import {rewardList, RewardType} from "@constants/reward";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";
import Button from "@mui/material/Button";
import {SingleDivider} from "@components/Divider/SingleDivider";
import {MySelect} from "@components/Input/MySelect";
import {tokenDecimals, tokenKeys, tokenList} from "@constants/tokens";
import {useIsAuthenticated} from "../../hooks/useIsAuthenticated";
import CircularProgress from "@mui/material/CircularProgress";
import {ApiResult, backendRequest, birdeyeApi, requestWrapper} from "@constants/endpoints";
import {preferenceList} from "@constants/preference";
import {PublicKey} from "@solana/web3.js";
import {useWallet} from "@solana/wallet-adapter-react";
import {MyMountedWalletButton} from "@components/Buttons/MyWalletConnectButton";
import {useProgramApis} from "@providers/ProgramApisProvider";
import {roundNumber} from "../../../utils/general";

export function Review({buttonAction, ...props}: StepComponentProps){
    const { adDetails, distribution, reward } = useCampaginCreationStore((state) => state.data);
    const [loading, setLoading] = React.useState(false);

    // this needs to be middleware
    const {authenticated, data} = useIsAuthenticated();
    const {program} = useProgramApis()
    const wallet = useWallet()

    console.log("wallet", wallet)

    const tokenTypes = MySelect({
        options: tokenList,
        defaultValue: 1,
        height: "30px",
        width: "80px",
        selectWidth: "80px"
    });

    const distDate = new Date(distribution.distributionDate)
    const cost = 0.1 * distribution.userReach;
    const fees = 0.1 * cost;
    const totalCost = cost + fees;

    // Create campaign backend, send back pubkey
    // initiate token transfer instruction
    // send tx to backend
    // backend checks if successful and then flips a switch on paid/notpaid
    // create the image on shdw
    const handleSubmit = async () => {
        setLoading(true);

        try {
            if (reward.type !== RewardType.Survey) {
                throw new Error("Only Survey Reward supported");
            }

            if (data?.id === undefined) {
                throw new Error("Creator not authenticated");
            }
            if (wallet?.publicKey === null) {
                throw new Error("Wallet not connected");
            }

            // escrow
            const initRequest = backendRequest.createCampaign({
                companyId: data?.id,
                distributionDate: distribution.distributionDate,
                duration: distribution.duration,
                userReach: distribution.userReach,
                userGroups: distribution.userGroups,

                adName: adDetails.name,
                adSymbol: adDetails.symbol,
                adDescription: adDetails.description,

                rewardType: reward.type,
                rewardQuestions: reward.questions.map(({question}) =>  question),
                rewardQuestionTypes: reward.questions.map(({questionType}) => questionType),
            });
            const initRes = await requestWrapper(() => initRequest);

            console.log("request", initRes);
            if (initRes === null) {
                throw new Error("Campaign creation failed");
            }

            const escrowPubkey = new PublicKey(initRes.publicKey);
            console.log("here", escrowPubkey.toString())
            const token = tokenKeys[tokenTypes.value];
            const tokenDec = tokenDecimals[tokenTypes.value];
            const tokenReq = await fetch(birdeyeApi(token.toString()));
            const tokenRes: ApiResult = await tokenReq.json();
            const tokenCosts = Math.floor((totalCost / tokenRes.data.value) * (10 ** tokenDec));
            const {serialisedTx, blockhash} = await program.createPayment(
                escrowPubkey,
                tokenCosts,
                token,
                tokenDec
            );
            console.log("her afetere")

            const finaliseRequest = backendRequest.finaliseCampaign({
                campaignId: initRes.campaignId,
                blockhash: blockhash,
                serialisedTx: serialisedTx,
                payer: wallet.publicKey.toString(),
                tokenAddress: token.toString(),
                tokenAmount: tokenCosts,
                usdAmount: totalCost,
            });
            const finaliseRes = await requestWrapper(() => finaliseRequest);

            console.log("res", finaliseRes)
        } catch (e) {
            console.log("error", e)
        } finally {
            setLoading(false);
        }

    };

    let walletButton;
    if (!wallet.connected) {
        walletButton = <MyMountedWalletButton>
            CONNECT WALLET
        </MyMountedWalletButton>
    } else if (loading) {
        walletButton =
            <Button
                variant={"contained"}
                disabled={true}
            >
            <CircularProgress sx={{color: "text.primary"}} />
        </Button>
    } else {
        walletButton = <Button
            onClick={handleSubmit}
            {...ButtonConfig.submitCampaign}
        />
    }

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
                        <Text.Body2>
                            {adDetails.name} ({adDetails.symbol})
                        </Text.Body2>
                        <Text.Body2>
                            {adDetails.description}
                        </Text.Body2>
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
                        {distDate.getFullYear()}-{distDate.getMonth() + 1}-{distDate.getDate()}
                    </Text.Body2>
                    <Text.Body2>
                        {(distribution.duration + 1)} day{(distribution.duration + 1) > 1 ? "s" : ""}
                    </Text.Body2>
                    <Text.Body2>
                        {preferenceList[distribution.userGroups[0]]}
                    </Text.Body2>
                    <Text.Body2>
                        {distribution.userReach}
                    </Text.Body2>
                </div>
            </div>

            {/* Survey */}
            <div>
                <Text.Subtitle1 sx={{textDecoration: "underline"}}>
                    Reward ({rewardList[reward.type]})
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
                        0.1$ x {distribution.userReach} = {cost}$
                    </Text.Body2>
                </div>
                <div className={"flex justify-between"}>
                    <Text.Body2>
                        AdDrop fee (10%)
                    </Text.Body2>
                    <Text.Body2>
                        {roundNumber(fees)}$
                    </Text.Body2>
                </div>
                <SingleDivider/>
                <div className={"flex justify-between"}>
                    <Text.Body2>
                        Total
                    </Text.Body2>
                    <Text.Body2>
                        {roundNumber(totalCost)}$
                    </Text.Body2>
                </div>
                <div className={"flex justify-end items-center gap-x-2"}>
                    <Text.Body2>
                        Pay in
                    </Text.Body2>
                    {tokenTypes.component}
                </div>
            </div>

            <div className={"flex justify-center mt-4"}>
                {walletButton}
            </div>
        </div>
    );
}