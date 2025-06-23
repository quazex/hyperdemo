import { Dotenv, InjectDotenv } from '@hyperdemo/environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DocsConfig {
    public readonly is_enabled: boolean;

    constructor(@InjectDotenv() env: Dotenv) {
        this.is_enabled = env.get('DOCS_IS_ENABLED').default('false').asBoolStrict();
    }
}
