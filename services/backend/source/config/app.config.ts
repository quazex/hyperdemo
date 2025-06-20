import { Dotenv, InjectDotenv } from '@hyperdemo/nestjs/modules/environment';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

@Injectable()
export class AppConfig {
    public readonly name: string;
    public readonly port: number;
    public readonly version?: string;
    public readonly production: boolean;
    public readonly timezone: string;

    constructor(@InjectDotenv() env: Dotenv) {
        this.name = env.get('APP_HOST').required().asString();
        this.port = env.get('APP_PORT').required().asPortNumber();
        this.version = env.get('APP_VERSION').asString();
        this.production = env.get('APP_PRODUCTION').required().asBoolStrict();
        this.timezone = env.get('APP_TIMEZONE').required().asString();
    }

    public get isDev(): boolean {
        return this.production === false;
    }

    public get isProd(): boolean {
        return this.production === true;
    }

    public get now(): DateTime {
        return DateTime.local({ zone: this.timezone });
    }
}
