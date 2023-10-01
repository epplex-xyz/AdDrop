import { ButtonLinkProps } from "src/components/Buttons/LinkButton";
import { Text } from "src/components/Text/TextComponent";

type ButtonConfigKeys = "login" | "signup";

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
        href: "https://twitter.com/epplex_xyz",
        children: <Text.H6>
            SIGN UP
        </Text.H6>,
        sx: {
            paddingX: '32px',
        },
        linkType: "external",
        blank: true
    },
};