import {Section} from "src/components/Container/Section";
import {BoxProps} from "@mui/material/Box";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";
import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {Text} from "@components/Text/TextComponent";
import Button from "@mui/material/Button";
import {MyMountedWalletButton} from "@components/Buttons/MyWalletConnectButton";
import {PreferenceList} from "../../../constants/types";
import {Label} from "@components/Container/Label";


export function SignUpUser({...props}: BoxProps){
    return (
        <div className="flex flex-col w-full h-screen justify-center">
            <Section {...props}>
                <div className={"flex flex-col items-center gap-y-8 w-[300px]"}>
                    {/*<Text.H6>STEP 1 - LINK X</Text.H6>*/}
                    <TextDivider>STEP 1 - LINK X</TextDivider>
                    <Button {...ButtonConfig.linkX}/>

                    {/*<Text.H6>STEP 2 - LINK WALLET</Text.H6>*/}
                    <TextDivider>STEP 2 - LINK WALLET</TextDivider>
                    <MyMountedWalletButton {...ButtonConfig.linkWallet}/>

                    {/*<Text.H6 className={"whitespace-nowrap"}>STEP 3 - CHOOSE PREFERENCES</Text.H6>*/}
                    <TextDivider>STEP 3 - CHOOSE PREFERENCES</TextDivider>
                    <>
                        {PreferenceList.map((preference, index) => (
                            <React.Fragment key={index}>
                                <Label>{preference}</Label>
                            </React.Fragment>
                        ))}
                    </>
                </div>
            </Section>
        </div>
    );
}