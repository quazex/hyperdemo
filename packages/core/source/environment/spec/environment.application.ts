import { join } from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentModule } from '../environment.module';
import { EnvironmentTokens } from '../environment.tokens';
import { Dotenv } from '../environment.types';

export class TestingApplication {
    private _testing: TestingModule;

    public async init(): Promise<void> {
        const path = join(__dirname, './environment.example');

        const tModule = Test.createTestingModule({
            imports: [
                EnvironmentModule.forDotenv({
                    files: [
                        path,
                    ],
                }),
            ],
        });

        this._testing = await tModule.compile();
        this._testing = await this._testing.init();

        this._testing.enableShutdownHooks();
    }

    public async close(): Promise<void> {
        await this._testing.close();
    }

    public get module(): EnvironmentModule {
        return this._testing.get(EnvironmentModule);
    }

    public get service(): Dotenv {
        const token = EnvironmentTokens.getDotenv();
        return this._testing.get<Dotenv>(token);
    }
}
