import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { InjectOptions, LightMyRequestResponse } from 'fastify';
import { TestsValidatorsController } from './controller.mock';

export class TestingApplication {
    private app: NestFastifyApplication;

    public async init(): Promise<void> {
        const fastifyAdapter = new FastifyAdapter();

        const globalPipe = new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        });

        const tBuilder = Test.createTestingModule({
            controllers: [
                TestsValidatorsController,
            ],
        });

        const tModule = await tBuilder.compile();

        this.app = tModule.createNestApplication(fastifyAdapter);

        this.app.useGlobalPipes(globalPipe);
        this.app.enableShutdownHooks();

        await this.app.init();
    }

    public inject(opts: InjectOptions): Promise<LightMyRequestResponse> {
        return this.app.inject(opts);
    }

    public async close(): Promise<void> {
        await this.app.close();
    }
}
