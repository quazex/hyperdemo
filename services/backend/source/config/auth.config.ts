import { TAuthOptionsFactory } from '@auth';
import { ClerkOptions } from '@clerk/backend';
import { Dotenv, InjectDotenv } from '@hyperdemo/core/modules/environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig implements TAuthOptionsFactory {
    public readonly isEnabled: boolean;

    constructor(@InjectDotenv() private readonly env: Dotenv) {
        this.isEnabled = env.get('DOCS_IS_ENABLED').default('false').asBoolStrict();
    }

    public get publishableKey(): string {
        return this.env.get('CLERK_PUBLISHABLE_KEY').required().asString();
    }

    public get secretKey(): string {
        return this.env.get('CLERK_SECRET_KEY').required().asString();
    }

    public createAuthOptions(): ClerkOptions {
        return {
            publishableKey: this.publishableKey,
            secretKey: this.secretKey,
        };
    }
}
