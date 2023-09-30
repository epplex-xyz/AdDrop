const defaultSEOConfig = {
    title: "AdDrop",
    description: "Engage-2-earn web3 advertising",
    cannonical: "https://silk-street-frontend.vercel.app/",
    openGraph: {
        type: "website",
        url: "https://silk-street-frontend.vercel.app/",
        // This is the first line of discord link
        site_name: "AdDrop",
        // Second line, blue text
        title: "AdDrop | Engage-2-earn web3 advertising",
        description: "Engage-2-earn web3 advertising",
        images: [
            {
                url: "https://silk-street-frontend.vercel.app/logos/logo.png",
                width: 630,
                height: 630,
                alt: "Website logo",
            },
        ],
        profile: {
            firstName: "Silk",
            lastName: "Street",
            username: "silk_street",
            gender: "unisex",
        },
    },
    twitter: {
        handle: "@blessed_burgers",
        site: "@blessed_burgers",
        cardType: "summary_large_image",
    },
};

export default defaultSEOConfig;
