import { Section } from "src/components/Container/Section";
import { BoxProps } from "@mui/material/Box";
import { Text } from "src/components/Text/TextComponent";
import { ButtonLink } from "src/components/Buttons/LinkButton";
import { ButtonConfig } from "src/components/Buttons/ButtonConfig";
import { LogoAnimation } from "./LogoAnimation";
import Button from "@mui/material/Button";
import {Supabase} from "../../../services/supabase";
import {useRouter} from "next/router";
import {useEffect} from "react";

function LandingText(){
    return (
        <div className={"flex flex-col text-center items-center gap-y-4"}>
            <Text.H1 fontVariant={"secondary"}>
                epPlex
            </Text.H1>
            <Text.H3>
                Empowering ephemeral NFTs on Solana
                {/*[REDACTED REDACTED REDACTED]*/}
            </Text.H3>
        </div>
    );
}

export function LandingPage({...props}: BoxProps){
    const router = useRouter();



    const test = async () => {
        const { data, error } = await Supabase.auth.getSession()
        console.log("DAta", data, error)
    }
    useEffect(() => {
        test().then()
    }, [])

    return (
        <Section {...props}>
            <div className={"flex flex-col items-center gap-y-8"}>
                <LandingText/>

                <div className={"flex gap-x-6"}>
                    <ButtonLink {...ButtonConfig.demo}/>
                    <ButtonLink {...ButtonConfig.docs}/>
                    <Button
                        variant={"contained"}
                        onClick={async () => {
                            const { data, error } = await Supabase.auth.signInWithOAuth({
                                provider: 'twitter',
                                // options: {redirectTo: "/"}
                            })
                            console.log("res", data, error)


                        }}
                    >
                        hello
                    </Button>
                </div>

                <LogoAnimation/>
            </div>
        </Section>
    );
}