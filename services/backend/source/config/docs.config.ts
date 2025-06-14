import { Dotenv, InjectDotenv } from '@hyperdemo/nestjs/modules/environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DocsConfig {
    public readonly isEnabled: boolean;

    constructor(@InjectDotenv() env: Dotenv) {
        this.isEnabled = env.get('DOCS_IS_ENABLED').default('false').asBoolStrict();
    }
}
