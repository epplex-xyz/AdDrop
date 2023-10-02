import { ButtonLinkProps } from "src/components/Buttons/LinkButton";
import { Text } from "src/components/Text/TextComponent";

type ButtonConfigKeys = "login" | "signup" | "createProfile" | "createCompany";

function ButtonText({children}) {
    return <Text.Subtitle1>{children}</Text.Subtitle1>;

}

export const ButtonConfig: Record<ButtonConfigKeys, ButtonLinkProps> = {
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
};