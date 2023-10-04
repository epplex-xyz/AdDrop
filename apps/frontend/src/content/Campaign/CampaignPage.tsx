import {Section} from "src/components/Container/Section";
import {BoxProps} from "@mui/material/Box";

import React from "react";
import HorizontalNonLinearStepper from "@components/Container/Stepper";

// '1. Advert',
// '2. Distribution',
// '3. Survey',
// '4. Review'

const steps = [
    'Advert',
    'Distribution',
    'Survey',
    'Review'
];

export function CampaignPage({...props}: BoxProps){
    return (
        <div className="flex flex-col w-full h-screen justify-center">
            <Section {...props}>
                <div className={"w-full"}>
                    <HorizontalNonLinearStepper
                        stepNames={steps}
                        stepComponents={[
                            <>C1</>,
                            <>C2</>,
                            <>C3</>,
                            <>C4</>
                        ]}
                    />
                </div>
                {/*<div className={"flex flex-col items-center gap-y-8 max-w-[280px]"}>*/}
                {/*    Create campaign*/}
                {/*</div>*/}
            </Section>
        </div>
    );
}