import { DynamicModule, FactoryProvider } from '@nestjs/common';
import { EnvironmentProcessor } from './environment.processor';
import { EnvironmentTokens } from './environment.tokens';
import { Dotenv, DotenvParams } from './environment.types';

export class EnvironmentModule {
    public static parse(props?: DotenvParams): Dotenv {
        const processor = new EnvironmentProcessor();
        return processor.parse(props);
    }

    public static forDotenv(props?: DotenvParams): DynamicModule {
        const token = EnvironmentTokens.getDotenv();

        const envProvider: FactoryProvider = {
            provide: token,
            useFactory: (processor: EnvironmentProcessor) => processor.parse(props),
            inject: [
                EnvironmentProcessor,
            ],
        };
        return {
            global: true,
            module: EnvironmentModule,
            providers: [envProvider, EnvironmentProcessor],
            exports: [envProvider],
        };
    }
}
