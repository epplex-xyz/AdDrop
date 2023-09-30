// TODO: what is the type of body
import {RequestInit, Response} from 'node-fetch';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const options = (
    apiKey: string,
    method: HttpMethod,
    body: any,
): RequestInit => {
    switch (method) {
        case 'POST':
            return {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify(body),
            };
        case 'GET':
            return {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${apiKey}`,
                },
            };
        case 'DELETE':
            return {
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${apiKey}`,
                },
            };
        default:
            throw new Error('Invalid method');
    }
};

export async function requestWrapper(request: () => Promise<Response>) {
    try {
        const response = await request();
        const data: any = await response.json();

        if (!data.error) {
            return data.data;
        } else {
            throw new Error(data.error);
        }
    } catch (err) {
        throw new Error(`Failed ${err}`);
    }
}
