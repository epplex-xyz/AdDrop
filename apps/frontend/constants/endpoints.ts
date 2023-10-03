
// this could go into the shared utils

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface EndpointConfig {
    method: HttpMethod;
    url: string
}

interface Endpoints {
    createUser: EndpointConfig;

}

enum BackendEndpoints {
    createUser = "/user/create",
}

export const backendEndpoints: Endpoints = {
    createUser: {
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${BackendEndpoints.createUser}`,
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
        throw new Error(`Failed ${err}`);
    }
}

export const backendRequest = {
    createUser: (body) => {
        const { method, url } = backendEndpoints.createUser;
        return fetch(url, options(method, body));
    }
};