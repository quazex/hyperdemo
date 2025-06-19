import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { TAuthOptionsFactory } from '@auth';
import { ClerkOptions } from '@clerk/backend';
import { Dotenv, InjectDotenv } from '@hyperdemo/nestjs/modules/environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig implements TAuthOptionsFactory {
    constructor(@InjectDotenv() private readonly env: Dotenv) {}

    public createAuthOptions(): ClerkOptions {
        const options: ClerkOptions = {
            publishableKey: this.env.get('CLERK_PUBLISHABLE_KEY').required().asString(),
            secretKey: this.env.get('CLERK_SECRET_KEY').required().asString(),
            jwtKey: undefined,
        };

        //
        // Try to load key file
        //
        const root = process.cwd();
        const path = resolve(root, 'public.pem');

        const isExists = existsSync(path);
        if (isExists) {
            options.jwtKey = readFileSync(path, 'utf8');
        }

        return options;
    }
}
