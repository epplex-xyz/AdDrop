import "@styles/globals.scss"
import * as font from "@styles/fonts";
import {CustomThemeProvider} from "../src/providers/CustomThemeProvider";
import MyWalletProvider from "../src/providers/MyWalletProvider";
import ProgramApisProvider from "../src/providers/ProgramApisProvider";
import {MyToaster} from "../src/components/Container/Toaster";
import {Analytics} from "@vercel/analytics/react";

// export const metadata: Metadata = {
//     title: 'dPublisher',
//     metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
//     description:
//         '📚 An on-chain platform for self-publishing digital comics, tracking user analytics, and capturing the audience',
//     keywords: 'NFT, dReader, dPublisher, Comic, Solana, SOL, mint, collection, manga, manwha',
//     themeColor: '#181A20',
//     viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
//     openGraph: {
//         type: 'website',
//         title: 'dPublisher',
//         description:
//             '📚 An on-chain platform for self-publishing digital comics, tracking user analytics, and capturing the audience',
//         images: '/assets/images/home-metadata.jpg',
//         url: process.env.NEXT_PUBLIC_SITE_URL,
//         siteName: 'Home for comics',
//     },
//     twitter: {
//         title: 'dPublisher',
//         description:
//             '📚 An on-chain platform for self-publishing digital comics, tracking user analytics, and capturing the audience',
//         site: undefined,
//         card: 'summary_large_image',
//     },
//     manifest: '/manifest.json',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={`
                ${font.AlegreyaBoldItalic.className}
                ${font.SatoshiBold.className}
                ${font.SatoshiMedium.className}
            `}>
                <CustomThemeProvider>
                    <MyWalletProvider>
                        <ProgramApisProvider>
                            {/* Vercel */}
                            <Analytics />

                            <MyToaster/>

                            {children}
                        </ProgramApisProvider>
                    </MyWalletProvider>
                </CustomThemeProvider>
            </body>
        </html>
    )
}
