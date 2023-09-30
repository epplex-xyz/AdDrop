import { HttpMethod } from '../utils/request';

enum SphereEndpointsEnum {
    createProduct = 'https://api.spherepay.co/v1/product',
    getAllProducts = 'https://api.spherepay.co/v1/product?',
    deleteProduct = 'https://api.spherepay.co/v1/product/',
    createPrice = 'https://api.spherepay.co/v1/price',

    createPayment = 'https://api.spherepay.co/v1/paymentLink',
}

interface EndpointConfig {
    method: HttpMethod;
    url: SphereEndpointsEnum;
}

interface SphereEndpoints {
    createProduct: EndpointConfig;
    getAllProducts: EndpointConfig;
    deleteProduct: EndpointConfig;

    createPrice: EndpointConfig;

    createPayment: EndpointConfig;
}

export const sphereEndpoints: SphereEndpoints = {
    createProduct: {
        method: 'POST',
        url: SphereEndpointsEnum.createProduct,
    },
    createPrice: {
        method: 'POST',
        url: SphereEndpointsEnum.createPrice,
    },
    getAllProducts: {
        method: 'GET',
        url: SphereEndpointsEnum.getAllProducts,
    },
    deleteProduct: {
        method: 'DELETE',
        url: SphereEndpointsEnum.deleteProduct,
    },
    createPayment: {
        method: 'POST',
        url: SphereEndpointsEnum.createPayment,
    },
};
