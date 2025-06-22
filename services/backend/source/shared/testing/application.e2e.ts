import { AuthGuard } from '@auth';
import { HttpExceptionFilter } from '@hyperdemo/nestjs/modules/exception';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { InjectOptions } from 'fastify';
import { AppModule } from '../../app.module';
import { TTestingResponse } from './tests.types';

export class TestingApplication {
    #application: NestFastifyApplication;

    public async init(): Promise<void> {
        const fastifyAdapter = new FastifyAdapter();

        const tBuilder = Test
            .createTestingModule({
                imports: [AppModule],
            })
            .overrideGuard(AuthGuard).useValue({
                canActivate: () => true,
            });

        const tModule = await tBuilder.compile();
        this.#application = tModule.createNestApplication(fastifyAdapter, {
            logger: false,
        });

        const appReflector = this.#application.get(Reflector);

        const globalPipe = new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        const globalSerializer = new ClassSerializerInterceptor(appReflector, {
            strategy: 'exposeAll',
        });
        const globalFilter = new HttpExceptionFilter();

        this.#application.useGlobalPipes(globalPipe);
        this.#application.useGlobalInterceptors(globalSerializer);
        this.#application.useGlobalFilters(globalFilter);

        this.#application.setGlobalPrefix('api');
        this.#application.enableVersioning({
            type: VersioningType.URI,
        });

        this.#application.enableShutdownHooks();

        await this.#application.init();
        await this.#application.getHttpAdapter().getInstance().ready();
    }

    public async inject<TData>(opts: InjectOptions): Promise<TTestingResponse<TData>> {
        const response = await this.#application.inject(opts);
        return {
            statusCode: response.statusCode,
            body: response.json(),
        };
    }

    public async close(): Promise<void> {
        await this.#application.close();
    }
}
