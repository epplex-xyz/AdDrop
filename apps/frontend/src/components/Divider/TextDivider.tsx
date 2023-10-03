import { Text } from "@components/Text/TextComponent";
import Box from "@mui/material/Box";

export function TextDivider({children, uppercase = true}) {
    return (
        <div className="flex items-center justify-center self-stretch gap-x-2">
            <Text.Subtitle1 className={`whitespace-nowrap ${uppercase ? "uppercase" : undefined}`}>
                {children}
            </Text.Subtitle1>
            <Box
                component={"div"}
                height={"3px"}
                bgcolor={"text.primary"}
                width={"100%"}
            />
        </div>
    );
}