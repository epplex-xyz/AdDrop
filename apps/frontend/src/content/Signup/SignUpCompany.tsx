import {Section} from "src/components/Container/Section";
import {BoxProps} from "@mui/material/Box";
import {ButtonConfig} from "@components/Buttons/ButtonLinkConfig";
import React from "react";
import {TextDivider} from "@components/Divider/TextDivider";
import {Preference, preferenceList} from "../../../constants/types";
import {useXButton} from "@components/Buttons/XButton";
import Button from "@mui/material/Button";
import {backendRequest, requestWrapper} from "@constants/endpoints";
import CircularProgress from "@mui/material/CircularProgress";
import {useRouter} from "next/navigation";
import {StandardInput} from "@components/Input/TextField";
import {MySelect} from "@components/Input/MySelect";

export function SignUpCompany({...props}: BoxProps) {
    const {button, data} = useXButton();
    const description = StandardInput(
        {
            placeholder: "What's your one-liner?",
            width: "100%",
            height: "60px"
        }
    );
    const industry = MySelect({
        options: preferenceList,
        defaultValue: 0
    })
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleCreate = async () => {
        // TODO how to detect if anything is null and throw that error

        setLoading(true);
        const request = backendRequest.createUser({
            id: data?.id,
            username: data?.user_metadata.full_name,
            avatar: data?.user_metadata.avatar_url,
            handle: data?.user_metadata.user_name,
            // descrription: description.input
            preferences: []
        });
        const res = await requestWrapper(() => request);
        setLoading(false)

        if (res) {
            router.push(`/company/${data?.user_metadata.user_name}`)
        }
    }

    return (
        <div className="flex flex-col w-full h-screen justify-center">
            <Section {...props}>
                <div className={"flex flex-col items-center gap-y-8 w-[300px]"}>
                    {/* 1. Twitter */}
                    <TextDivider>STEP 1 - LINK X</TextDivider>
                    {button}

                    {/* 2. One-liner */}
                    <TextDivider>STEP 2 - ONE LINER</TextDivider>
                    {description.inputComponent}

                    {/* 3. Industry */}
                    <TextDivider>STEP 3 - SELECT INDUSTRY</TextDivider>
                    {industry.component}

                    {/*Submit button */}
                    {loading ?
                        <CircularProgress sx={{color: "text.primary"}} />
                        : <Button
                            {...ButtonConfig.companyCreate}
                            onClick={handleCreate}
                        />
                    }
                </div>
            </Section>
        </div>
    );
}