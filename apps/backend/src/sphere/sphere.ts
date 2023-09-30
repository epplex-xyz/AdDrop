import { CreateProductDto } from '../product/dto/create-product.dto';
import fetch from 'node-fetch';
import { GetProductParams } from '../product/dto/get-product-params';
import { options, requestWrapper } from '../utils/request';
import { CreatePriceDto } from './dto/create-price.dto';
import { sphereEndpoints } from './sphereMethods';
import { CreatePaymentDto } from './dto/create-payment.dto';

export class Sphere {
    private readonly apiKey: string;
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async create(createProductDto: CreateProductDto) {
        const { url, method } = sphereEndpoints.createProduct;
        const request = fetch(
            url,
            options(this.apiKey, method, createProductDto)
        );
        const res = await requestWrapper(() => request);
        return res.product;
    }

    async listAllProducts(query: GetProductParams) {
        const queryParams = new URLSearchParams(Object(query));
        const { url, method } = sphereEndpoints.getAllProducts;
        const request = fetch(
            url + queryParams.toString(),
            options(this.apiKey, method, []),
        );

        const res = await requestWrapper(() => request);
        return res.products;
    }

    async deleteProduct(productId: string) {
        const { url, method } = sphereEndpoints.deleteProduct;
        const request = fetch(
            url + productId,
            options(this.apiKey, method, []),
        );

        const res = await requestWrapper(() => request);
        return res;
    }

    /*
     * Prices
     */
    async createPrice(createPriceDto: CreatePriceDto) {
        const { url, method } = sphereEndpoints.createPrice;
        const request = fetch(
            url,
            options(this.apiKey, method, createPriceDto),
        );
        return await requestWrapper(() => request);
    }

    /*
     * Payment
     */
    async createPayment(createPaymentDto: CreatePaymentDto) {
        const { url, method } = sphereEndpoints.createPayment;
        const request = fetch(
            url,
            options(this.apiKey, method, createPaymentDto),
        );
        return await requestWrapper(() => request);
    }
}
