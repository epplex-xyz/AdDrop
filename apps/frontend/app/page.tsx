'use client'

import type {Metadata} from "next";
import {Main} from "../src/content/Home/Main";
import Screen from "../src/components/layout/Screen";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";

// export const metadata: Metadata = {
//   title: "Cubik",
//   metadataBase: new URL("https://res.cloudinary.com"),
//   description: "Fund Public Goods Through Community Voting On Solana",
//   openGraph: {
//     images: ["/demonicirfan/image/upload/v1692786112/OG-Grant_23_tbhrsg.png"],
//   },
//   twitter: {
//     title: "Cubik",
//     card: "summary_large_image",
//     images: ["/demonicirfan/image/upload/v1692786112/OG-Grant_23_tbhrsg.png"],
//   },
// };

export default function Home() {
    const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

    return (
      <Screen headerPosition={isMobile ? "static" : "relative"}>
          <Main/>
      </Screen>
    );
}
