// Main inspiration: https://www.youtube.com/watch?v=9paBIA2R5C0
import React from "react";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { useMobileOverlay } from "./MobileOverlay";
import { HeaderLogo } from "./HeaderElements";
import { ButtonLink } from "src/components/Buttons/LinkButton";
import { ButtonConfig } from "src/components/Buttons/ButtonConfig";
import { MyMountedWalletButton } from "@components/Buttons/MyWalletConnectButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {IconButton} from "@mui/material";
import Button from "@mui/material/Button";
import {paletteLight} from "@styles/palette";
import {usePathname} from "next/navigation";
function HeaderLeft({TriggerButton}: {TriggerButton: () => React.ReactNode}) {
    return (
        <Box
            component="div"
            display="flex"
            justifyContent={"flex-start"}
            flex={"1 0 0"}
        >
            {/* Either show Logo or hamburger*/}
            <Box
                component="div"
                display={{ xs: "none", md: "flex"}}
            >
                <HeaderLogo />
            </Box>

            <Box
                component="div"
                display={{ xs: "flex", md: "none" }}
            >
                <TriggerButton/>
            </Box>
        </Box>
    );
}

function HeaderBack({}) {
    return (
        <Box
            component="div"
            display="flex"
            justifyContent={"flex-start"}
            flex={"1 0 0"}
        >
            <Box
                component="div"
                display={"flex"}
            >
                <IconButton href={"/"}>
                    <ArrowBackIcon/>
                </IconButton>
            </Box>
        </Box>
    );
}

function HeaderRight({Component}: {Component: React.ReactNode}) {
    return (
        <Box
            component="div"
            display="flex"
            justifyContent={"flex-end"}
            flex={"1 0 0"}
        >
            {Component}
        </Box>
    );
}


export function Header({ headerPosition }) {
    const {OverlayComponent, TriggerButton} = useMobileOverlay();

    const path = usePathname();

    let RightComponent: React.ReactNode;
    let LeftComponent: React.ReactNode;

    if (path === "/demo") {
        RightComponent = <MyMountedWalletButton/>;
        LeftComponent = <HeaderLeft TriggerButton={TriggerButton}/>
    } else if (path === "/signup") {
        LeftComponent = <HeaderBack/>
        RightComponent = <></>
    } else {
        RightComponent = <ButtonLink {...ButtonConfig.login}/>;
        LeftComponent = <></>
    }


    return (
        <>
            <AppBar
                color={"transparent"}
                sx={{
                    boxShadow: "unset",
                    zIndex: 10,
                }}
                position={headerPosition}
            >
                <Container className="!max-w-none !mx-0">
                    <Toolbar
                        disableGutters
                        sx={{
                            marginY: "8px",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        {/*<HeaderLeft TriggerButton={TriggerButton}/>*/}
                        {LeftComponent}

                        {/*<HeaderRight Component={RightComponent}/>*/}
                    </Toolbar>
                </Container>
            </AppBar>

            <OverlayComponent/>
        </>
    );
}