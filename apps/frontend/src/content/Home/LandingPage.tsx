import { Section } from "src/components/Container/Section";
import { BoxProps } from "@mui/material/Box";
import { Text } from "src/components/Text/TextComponent";
import { ButtonLink } from "src/components/Buttons/LinkButton";
import { ButtonLinkConfig } from "@components/Buttons/ButtonLinkConfig";
import Image from "next/image";
import React from "react";
import {useXButton} from "@components/Buttons/XButton";
import {useRouter} from "next/navigation";
import {backendRequest, requestWrapper} from "@constants/endpoints";
import toast from "react-hot-toast";

function LandingText(){
    return (
        <div className={"flex flex-col text-center items-center gap-y-4"}>
            <Text.H2 fontVariant={"secondary"}>
                AdDrop
            </Text.H2>
            <Text.H6>
                Earn rewards for engaging with ads!
                {/*<PaperPlane/>*/}
            </Text.H6>
        </div>
    );
}

export function LandingPage({...props}: BoxProps){
    // Login flow
    // user authorises twitter
    // check if user exists in db, if in user db, redirect to user page
    // if in company db, redirect to company page

    // Anyone could login, need to setup a PW?
    // Probably OK to just check if user exists in table, or ask to signup

    const router = useRouter();

    const {button, data} = useXButton({redirect: "/"});

    const test = async () => {
        try {
            const request = backendRequest.checkAccount({
                id: data.id,
            });
            const res = await requestWrapper(() => request);
            console.log("result", res);
            if (res === null) {
                throw new Error("Profile not found");
            }

            router.push(`/${res}/${data.user_metadata.user_name}`);
        } catch (e: any) {
            console.log("error", e);
            toast.error(e.message);
        }
    };

    React.useEffect(() => {
        if (data?.id !== undefined){
            test().then();
        }
    },[data]);

    return (
        <Section {...props}>
            <div className={"flex flex-col items-center gap-y-8"}>
                {/*<LogoAnimation/>*/}
                <Image
                    src={"/logos/frontPageLogo.png"}
                    alt="FrontPageLogo"
                    width={200}
                    height={200}
                    priority={true}
                />
                <LandingText/>

                <div className={"flex gap-x-6"}>
                    {/*<ButtonLink {...ButtonLinkConfig.login}/>*/}
                    {button}
                    <ButtonLink {...ButtonLinkConfig.signup}/>
                </div>
            </div>
        </Section>
    );
}