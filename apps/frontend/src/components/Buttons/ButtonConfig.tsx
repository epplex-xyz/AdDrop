import { ButtonLinkProps } from "src/components/Buttons/LinkButton";
import { Text } from "src/components/Text/TextComponent";

type ButtonConfigKeys = "login" | "signup" | "createProfile" | "createCompany";

export const ButtonConfig: Record<ButtonConfigKeys, ButtonLinkProps> = {
    login: {
        variant: "contained",
        href: "/demo",
        children: <Text.H6>
            LOG IN
        </Text.H6>,
        sx: {
            paddingX: '32px',
        }
    },
    signup: {
        variant: "contained",
        href: "/signup",
        children: <Text.H6>
            SIGN UP
        </Text.H6>,
        sx: {
            paddingX: '32px',
        },
    },
    createProfile: {
        variant: "contained",
        href: "/signup/user",
        children: <Text.H6>
            CREATE USER PROFILE
        </Text.H6>,
        sx: {
            paddingX: '32px',
        },
    },
    createCompany: {
        variant: "contained",
        href: "/signup/company",
        children: <Text.H6>
            CREATE COMPANY PROFILE
        </Text.H6>,
        sx: {
            paddingX: '32px',
        },
    },
};