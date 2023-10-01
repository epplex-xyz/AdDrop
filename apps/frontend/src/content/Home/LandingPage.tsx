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

    // console.log("router", router.asPath)
    // const { access_token } = router.query;
    // const params = new URLSearchParams(router.asPath);
    // console.log("params", access_token)
    const fragment = "&" + router.asPath.substring(2); // Remove the '#' character
    // console.log("fragment", fragment)
    const params = new URLSearchParams(fragment);

    // Get the values of the parameters
    const access_token = params.get('access_token');
    const expires_at = params.get('expires_at');
    const expiresIn = params.get('expires_in');
    const providerToken = params.get('provider_token');
    const refresh_token = params.get('refresh_token');

    const token_type = params.get('token_type');

    // Do something with the extracted parameters
    // console.log('Access Token:', access_token);
    // console.log('Expires At:', expires_at, expiresIn, providerToken, refresh_token, token_type);
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