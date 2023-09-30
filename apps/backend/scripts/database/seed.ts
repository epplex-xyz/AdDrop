import { dummyProducts } from './products';
import * as dotenv from 'dotenv';
import { USDC_PRICE } from './prices';
import {SphereService} from "../../src/sphere/sphere.service";
import {ProductService} from "../../src/product/product.service";
dotenv.config({ path: '.env' });

async function createPaymentLink(sphereService) {
    const res = await Promise.all([
        sphereService.createPayment({
            lineItems: [
                {
                    price: 'price_3e2b7f54a9e64fcdb1dc4d42cc15f6cb',
                    quantity: 1,
                    quantityMutable: false,
                },
            ],
        }),
    ]);
    console.log('res', res);
}

const main = async () => {
    const sphereService = new SphereService();
    const productService = new ProductService(sphereService);

    // Create product and price
    // 1:1 relationship between product and price
    const res = await Promise.all(
        dummyProducts.map(async (p) => {
            const product = await productService.create(p);
            const price = await sphereService.createPrice({
                name: 'StandardPrice',
                description: 'Standard price for the product',
                currency: USDC_PRICE,
                product: product.id,
                unitAmountDecimal: 2,
                recurring: {},
            });
            return price;
        }),
    );
    console.log('res', res);

    // Create prices
};

main();
