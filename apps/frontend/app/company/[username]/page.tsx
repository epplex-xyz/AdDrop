"use client";

import Screen from "@components/layout/Screen";
import {CompanyPage} from "@content/company/CompanyPage";
interface Props {
  params: { username: string };
}

export default function UserPage({ params: { username } }: Props) {
    // Todo: check auth
    return (
        <Screen>
            <CompanyPage/>
        </Screen>
    );
}
