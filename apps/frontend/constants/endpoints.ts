// this could go into the shared utils
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface EndpointConfig {
    method: HttpMethod;
    url: string
}

interface Endpoints {
    createUser: EndpointConfig;
    createCompany: EndpointConfig;
    createCampaign: EndpointConfig;
    finaliseCampaign: EndpointConfig;
    checkAccount: EndpointConfig;

}

enum BackendEndpoints {
    createUser = "/user/create",
    createCompany = "/company/create",
    createCampaign = "/campaign/create",
    finaliseCampaign = "/campaign/finalise",
    checkAccount = "/user/check",
}

export const backendEndpoints: Endpoints = {
    createUser: {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${BackendEndpoints.createUser}`,
    },
    createCompany: {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${BackendEndpoints.createCompany}`,
    },
    createCampaign: {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${BackendEndpoints.createCampaign}`,
    },
    finaliseCampaign: {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${BackendEndpoints.finaliseCampaign}`,
    },
    checkAccount: {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${BackendEndpoints.checkAccount}`,
    },

};

export const options = (
    // apiKey: string,
    method: HttpMethod,
    body,
): RequestInit => {
    switch (method) {
        case 'POST':
            return {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    // authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify(body),
            };
        case 'GET':
            return {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    // authorization: `Bearer ${apiKey}`,
                },
            };
        case 'DELETE':
            return {
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                    // authorization: `Bearer ${apiKey}`,
                },
            };
        default:
            throw new Error('Invalid method');
    }
};

export async function requestWrapper(request: () => Promise<Response>) {
    try {
        const response = await request();
        const data = await response.json();

        if (!data.error) {
            return data.data;
        } else {
            throw new Error(data.error);
        }
    } catch (err) {
        console.log(`Failed ${err}`);
    }
}

export const backendRequest = {
    createUser: (body) => {
        const { method, url } = backendEndpoints.createUser;
        return fetch(url, options(method, body));
    },
    createCompany: (body) => {
        const { method, url } = backendEndpoints.createCompany;
        return fetch(url, options(method, body));
    },
    createCampaign: (body) => {
        const { method, url } = backendEndpoints.createCampaign;
        return fetch(url, options(method, body));
    },
    checkAccount: (body) => {
        const { method, url } = backendEndpoints.checkAccount;
        return fetch(url, options(method, body));
    },
    finaliseCampaign: (body) => {
        const { method, url } = backendEndpoints.finaliseCampaign;
        return fetch(url, options(method, body));
    },

};

export const birdeyeApi = (token) => `https://public-api.birdeye.so/public/price?address=${token}`;

export interface ApiResult {
    data: {
        value: number
        updateUnixTime: number
        updateHumanTime: string
    },
    success: boolean

}