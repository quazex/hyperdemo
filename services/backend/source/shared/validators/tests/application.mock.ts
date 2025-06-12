import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { InjectOptions, LightMyRequestResponse } from 'fastify';
import { TestsValidatorsController } from './controller.mock';

export class TestingApplication {
    private tApp: NestFastifyApplication;

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

        this.tApp = tModule.createNestApplication(fastifyAdapter);

        this.tApp.useGlobalPipes(globalPipe);
        this.tApp.enableShutdownHooks();

        await this.tApp.init();
    }

    public inject(opts: InjectOptions): Promise<LightMyRequestResponse> {
        return this.tApp.inject(opts);
    }

    public async close(): Promise<void> {
        await this.tApp.close();
    }
}
