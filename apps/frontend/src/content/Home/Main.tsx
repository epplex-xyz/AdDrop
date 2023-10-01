import React from "react";
import { LandingPage } from "./LandingPage";
import { SectionConfig } from "./sections";

export function Main() {
    return (
        <div className="flex flex-col w-full">
            <LandingPage id={SectionConfig.landingPage.id}/>
        </div>
    );
}
