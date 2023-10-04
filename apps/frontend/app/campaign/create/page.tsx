"use client"

import Screen from "@components/layout/Screen";
import {CampaignPage} from "@content/Campaign/CampaignPage";
interface Props {
  params: { username: string };
}

export default function CampaignCreate({ params: { username } }: Props) {
    // Todo: check auth
    return (
        <Screen>
            <CampaignPage/>
        </Screen>
    );
};
