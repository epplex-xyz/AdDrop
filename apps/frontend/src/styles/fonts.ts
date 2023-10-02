import localFont from "next/font/local";

export const AlegreyaBoldItalic = localFont({
    preload: true,
    display: "swap",
    src: [
        {
            path: '../../public/fonts/alegreya/Alegreya-BoldItalic.ttf',
        },
    ],
    fallback: ['Helvetica Neue', 'sans-serif'],
});


export const SatoshiMedium = localFont({
    preload: true,
    display: "swap",
    src: [
        {
            path: '../../public/fonts/satoshi/Satoshi-Medium.woff2',
        },
    ],
    fallback: ['Helvetica Neue', 'sans-serif'],
});

export const SatoshiBold = localFont({
    preload: true,
    display: "swap",
    src: [
        {
            path: '../../public/fonts/satoshi/Satoshi-Bold.woff2',
        },
    ],
    fallback: ['Helvetica Neue', 'sans-serif'],
});