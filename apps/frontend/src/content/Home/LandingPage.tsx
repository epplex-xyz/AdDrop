import { Section } from "src/components/Container/Section";
import { BoxProps } from "@mui/material/Box";
import { Text } from "src/components/Text/TextComponent";
import { ButtonLink } from "src/components/Buttons/LinkButton";
import { ButtonLinkConfig } from "@components/Buttons/ButtonLinkConfig";
import Image from "next/image";
import React from "react";
// import PaperPlane from "../../../public/icons/paperPlane.svg"

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
    return (
        <Section {...props}>
            <div className={"flex flex-col items-center gap-y-8"}>
                <Image
                    src={"/logos/frontPageLogo.png"}
                    alt="FrontPageLogo"
                    width={200}
                    height={200}
                    priority={true}
                />
                <LandingText/>

                <div className={"flex gap-x-6"}>
                    <ButtonLink {...ButtonLinkConfig.login}/>
                    <ButtonLink {...ButtonLinkConfig.signup}/>
                </div>
            </div>
        </Section>
    );
}