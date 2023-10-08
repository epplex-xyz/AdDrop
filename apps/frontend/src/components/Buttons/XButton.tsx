import Button from "@mui/material/Button";
import {useIsAuthenticated} from "../../hooks/useIsAuthenticated";
import {ButtonConfig, ButtonText} from "@components/Buttons/ButtonLinkConfig";
import {signInWithOAuth} from "@services/supabase";
import {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";

export function XButton({content, setLoading, redirect}: {content: any, setLoading: any, redirect: string}) {
    const handleClick = async () => {
        setLoading(true);
        await signInWithOAuth(process.env.NEXT_PUBLIC_URL + redirect);
        setLoading(false);
    };

    return (
        <Button
            onClick={handleClick}
            {...ButtonConfig.linkX}
        >
            {content}
        </Button>
    );
}

export function useXButton({redirect = "/signup/user"}: {redirect?: string}) {
    const {authenticated, data} = useIsAuthenticated();
    const [loading, setLoading] = useState(false);


    let content;
    if (loading) {
        content = <CircularProgress sx={{color: "text.primary"}} />;
    } else if (authenticated) {
        content = <>
            <Image
                src={data.user_metadata.avatar_url}
                alt={"avatar"}
                height={25}
                width={25}
                style={{
                    borderRadius: "50%",
                    marginRight: "8px"
                }}
            />
            {/*{ redirect === "/"*/}
            {/*    ? <>{data.user_metadata.full_name}</> :*/}
            <ButtonText>
                {data.user_metadata.full_name}
            </ButtonText>
            {/*}*/}
        </>;
    } else {
        content = <ButtonText>
            {redirect === "/"  ?  "LOG IN" : "LINK X"}
        </ButtonText>;
    }

    return {
        button: <XButton content = {content} setLoading={setLoading} redirect={redirect}/>,
        data
    };
}