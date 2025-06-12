import { ModuleMetadata, ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { InjectOptions, LightMyRequestResponse } from 'fastify';

export class TestingApplication {
    private application: NestFastifyApplication;

    public async init(metadata: ModuleMetadata): Promise<void> {
        const fastifyAdapter = new FastifyAdapter();

        const globalPipe = new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        });

        const tBuilder = Test.createTestingModule(metadata);
        const tModule = await tBuilder.compile();

        this.application = tModule.createNestApplication(fastifyAdapter);

        this.application.useGlobalPipes(globalPipe);
        this.application.enableShutdownHooks();

        await this.application.init();
    }

    public inject(opts: InjectOptions): Promise<LightMyRequestResponse> {
        return this.application.inject(opts);
    }

    public async close(): Promise<void> {
        await this.application.close();
    }
}
