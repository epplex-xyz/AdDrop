import {Section} from "src/components/Container/Section";
import {BoxProps} from "@mui/material/Box";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";
import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {MyMountedWalletButton} from "@components/Buttons/MyWalletConnectButton";
import {Label} from "@components/Container/Label";
import {preferenceList} from "../../../constants/preference";
import {useXButton} from "@components/Buttons/XButton";
import Button from "@mui/material/Button";
import {useWallet} from "@solana/wallet-adapter-react";
import {backendRequest, requestWrapper} from "@constants/endpoints";
import CircularProgress from "@mui/material/CircularProgress";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

export function SignUpUser({...props}: BoxProps) {
    const {button, data} = useXButton({redirect: "/signup/user"});
    const {publicKey} = useWallet();
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleCreate = async () => {
        try {
            if (publicKey === null) {
                throw new Error("Wallet not connected");
            }

            if (data === null) {
                throw new Error("X not connected");
            }

            setLoading(true);
            const request = backendRequest.createUser({
                id: data.id,
                username: data.user_metadata.full_name,
                avatar: data.user_metadata.avatar_url,
                handle: data.user_metadata.user_name,
                mainWallet: publicKey.toString(),
                // TODO: add preferences
                preferences: []
            });
            const res = await requestWrapper(() => request);
            setLoading(false);

            if (res) {
                toast.success("User creation success");
                router.push(`/profile/${data.user_metadata.user_name}`);
            } else {
                toast.error("User creation failed");
            }
        } catch (e: any) {
            toast.error(e.message);
        }

    };

    return (
        <div className="flex flex-col w-full h-screen justify-center">
            <Section {...props}>
                <div className={"flex flex-col items-center gap-y-8 w-[300px]"}>
                    {/* 1. Twitter */}
                    <TextDivider>STEP 1 - LINK X</TextDivider>
                    {button}

                    {/* 2. Wallet */}
                    <TextDivider>STEP 2 - LINK WALLET</TextDivider>
                    <MyMountedWalletButton {...ButtonConfig.linkWallet}/>

                    {/* 3. Preferences */}
                    <TextDivider>STEP 3 - CHOOSE PREFERENCES</TextDivider>

                    <div className={"flex flex-row flex-wrap gap-x-2 gap-y-2 justify-center"}>
                        {preferenceList.map((preference, index) => (
                            <React.Fragment key={index}>
                                <Label>{preference}</Label>
                            </React.Fragment>
                        ))}
                    </div>

                    {/*Submit button */}
                    {loading ?
                        <CircularProgress sx={{color: "text.primary"}} />
                        : <Button {...ButtonConfig.userCreate} onClick={handleCreate}/>
                    }
                </div>
            </Section>
        </div>
    );
}