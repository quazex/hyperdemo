import { TAuthOptionsFactory } from '@auth';
import { ClerkOptions } from '@clerk/backend';
import { Dotenv, InjectDotenv } from '@hyperdemo/nestjs/modules/environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig implements TAuthOptionsFactory {
    constructor(@InjectDotenv() private readonly env: Dotenv) {}

    public createAuthOptions(): ClerkOptions {
        return {
            publishableKey: this.env.get('CLERK_PUBLISHABLE_KEY').required().asString(),
            secretKey: this.env.get('CLERK_SECRET_KEY').required().asString(),
        };
    }
}
