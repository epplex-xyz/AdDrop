import { Injectable } from '@nestjs/common';
import { Sphere } from './sphere';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { GetProductParams } from '../product/dto/get-product-params';
import { CreatePriceDto } from './dto/create-price.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class SphereService {
    readonly sphere: Sphere;
    constructor() {
        this.sphere = new Sphere(process.env.SPHERE_KEY);
    }

    async createProduct(createProductDto: CreateProductDto) {
        return await this.sphere.create(createProductDto);
    }

    async listAllProducts(query: GetProductParams) {
        return await this.sphere.listAllProducts(query);
    }

    async deleteProduct(productId: string) {
        return await this.sphere.deleteProduct(productId);
    }

    /*
     * Price
     */

    async createPrice(createPriceDto: CreatePriceDto) {
        return await this.sphere.createPrice(createPriceDto);
    }

    /*
     * Payment
     */
    async createPayment(createPaymentDto: CreatePaymentDto) {
        return await this.sphere.createPayment(createPaymentDto);
    }
}
