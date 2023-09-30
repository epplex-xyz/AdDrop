import {ProductDto} from "../../src/product/dto/product.dto";

export const dummyProducts: ProductDto[] = [
    {
        name: 'BurgerPFP4',
        description: 'ready to flip burgers',
        images: ['https://www.blessedburgers.co/images/promo/bobpfp.png'],
        prices: [],
        maxSupply: 1,
        tags: ['NFT'],
        meta: {},
        active: true,
    },
    // {
    //     name: 'BurgerKing',
    //     description: 'king of Burgers',
    //     images: ['https://www.blessedburgers.co/images/promo/burgerking.png'],
    //     prices: [],
    //     maxSupply: 1,
    //     tags: ['NFT'],
    //     meta: {},
    //     active: true,
    // },
    // {
    //     name: 'NothingBugrer',
    //     description: 'sometimes life be like dat',
    //     images: [
    //         'https://www.blessedburgers.co/images/receipts/nothingburger.png',
    //     ],
    //     prices: [],
    //     maxSupply: 1,
    //     tags: ['NFT'],
    //     meta: {},
    //     active: true,
    // },
];
