import {Section} from "src/components/Container/Section";
import {BoxProps} from "@mui/material/Box";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";
import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {MyMountedWalletButton} from "@components/Buttons/MyWalletConnectButton";
import {Label} from "@components/Container/Label";
import {preferenceList} from "../../../constants/types";
import {useXButton} from "@components/Buttons/XButton";
import Button from "@mui/material/Button";
import {useWallet} from "@solana/wallet-adapter-react";
import {backendRequest, requestWrapper} from "@constants/endpoints";
import CircularProgress from "@mui/material/CircularProgress";

export function SignUpUser({...props}: BoxProps) {
    const {button, data} = useXButton();
    const {publicKey} = useWallet()
    const [loading, setLoading] = React.useState(false);

    console.log("data", data)
    const handleCreate = async () => {
        // TODO how to detect if anything is null and throw that error
        // burger bob twitter connect is small
        console.log()
        setLoading(true);
        const request = backendRequest.createUser({
            id: data?.id,
            username: data?.user_metadata.full_name,
            avatar: data?.user_metadata.avatar_url,
            handle: data?.user_metadata.user_name,
            mainWallet: publicKey?.toString(),
            preferences: []
        });
        const res = await requestWrapper(() => request);
        setLoading(false)
        // needs to add redirect
        console.log("res", res)
    }

    return (
        <div className="flex flex-col w-full h-screen justify-center">
            <Section {...props}>
                <div className={"flex flex-col items-center gap-y-8 w-[300px]"}>
                    <TextDivider>STEP 1 - LINK X</TextDivider>
                    {button}

                    <TextDivider>STEP 2 - LINK WALLET</TextDivider>
                    <MyMountedWalletButton {...ButtonConfig.linkWallet}/>

                    <TextDivider>STEP 3 - CHOOSE PREFERENCES</TextDivider>

                    <div className={"flex flex-row flex-wrap gap-x-2 gap-y-2 justify-center"}>
                        {preferenceList.map((preference, index) => (
                            <React.Fragment key={index}>
                                <Label>{preference}</Label>
                            </React.Fragment>
                        ))}
                    </div>

                    {loading ?
                        <CircularProgress sx={{color: "text.primary"}} />
                        : <Button {...ButtonConfig.userCreate} onClick={handleCreate}/>
                    }
                </div>
            </Section>
        </div>
    );
}