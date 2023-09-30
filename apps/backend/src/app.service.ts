import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    constructor() {}
    get(): string {
        return 'API connected successfully!';
    }
    async healthCheck(): Promise<string> {
        return 'ok';
    }
}
