import { ButtonLinkProps } from "src/components/Buttons/LinkButton";
import { Text } from "src/components/Text/TextComponent";
import {ButtonProps} from "@mui/material/Button";
import {signInWithOAuth} from "../../../services/supabase";

type ButtonLinkConfigKeys =
    "login"
    | "signup"
    | "createProfile"
    | "createCompany"
    | "linkX"
    | "linkWallet"

type ButtonConfigKeys =
    | "linkX"
    | "linkWallet"

function ButtonText({children}) {
    return <Text.Subtitle1>{children}</Text.Subtitle1>;

}

export const ButtonLinkConfig: Record<ButtonLinkConfigKeys, ButtonLinkProps> = {
    login: {
        variant: "contained",
        href: "/demo",
        children: <ButtonText>
            LOG IN
        </ButtonText>,
        sx: {
            paddingX: '32px',
        }
    },
    signup: {
        variant: "contained",
        href: "/signup",
        children: <ButtonText>
            SIGN UP
        </ButtonText>,
        sx: {
            paddingX: '32px',
        },
    },
    createProfile: {
        variant: "contained",
        href: "/signup/user",
        children: <ButtonText>
            CREATE USER PROFILE
        </ButtonText>,
        sx: {
            paddingX: '16px',
            width: "100%"
        },
    },
    createCompany: {
        variant: "contained",
        href: "/signup/company",
        children: <ButtonText>
            CREATE COMPANY PROFILE
        </ButtonText>,
        sx: {
            paddingX: '16px',
            width: "100%"
        },
    },
    linkX: {
        variant: "contained",
        children: <ButtonText>
            LINK X
        </ButtonText>,
        sx: {
            paddingX: '16px',
        },
    },
    linkWallet: {
        variant: "contained",
        children: <ButtonText>
            LINK WALLET
        </ButtonText>,
        sx: {
            paddingX: '16px',
        },
    },
};

export const ButtonConfig: Record<ButtonConfigKeys, ButtonProps> = {
    linkX: {
        onClick: async () => { await signInWithOAuth("/signup/user") },
        variant: "contained",
        children: <ButtonText>
            LINK X
        </ButtonText>,
        sx: {
            paddingX: '16px',
        },
    },
    linkWallet: {
        children: <ButtonText>
            LINK WALLET
        </ButtonText>,
    },
};