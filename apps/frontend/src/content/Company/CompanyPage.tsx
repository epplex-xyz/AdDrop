import {Section} from "src/components/Container/Section";
import {BoxProps} from "@mui/material/Box";
import {ButtonLink} from "src/components/Buttons/LinkButton";
import {ButtonLinkConfig} from "@components/Buttons/ButtonLinkConfig";
import React from "react";

export function CompanyPage({...props}: BoxProps){
    return (
        <div className="flex flex-col w-full h-screen justify-center">
            <Section {...props}>
                <div className={"flex flex-col items-center gap-y-8 max-w-[280px]"}>
                    <ButtonLink {...ButtonLinkConfig.createCampaign}/>
                </div>
            </Section>
        </div>
    );
}