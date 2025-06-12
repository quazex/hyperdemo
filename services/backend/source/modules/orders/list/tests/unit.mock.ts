import { ViewConfig } from '@config';
import { OrdersStatisticsEntity } from '@domain/database/orders/statistics.entity';
import { OrdersStatisticsFactory } from '@domain/mocks';
import { jest } from '@jest/globals';
import { ValidationPipe, ValueProvider } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InjectOptions, LightMyRequestResponse } from 'fastify';
import { OrdersListService } from '../module/business/business.handler';
import { OrdersListRepository } from '../module/integration/integration.repository';
import { OrdersListController } from '../module/transport/transport.controller';

export class TestingUnitMock {
    private application: NestFastifyApplication;

    public async init(): Promise<void> {
        const fastifyAdapter = new FastifyAdapter();

        const globalPipe = new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        });


        const rows = OrdersStatisticsFactory.getMany();
        const tRepository: ValueProvider = {
            provide: getRepositoryToken(OrdersStatisticsEntity),
            useValue: {
                count: jest.fn().mockReturnValue(rows.length),
                find: jest.fn().mockReturnValue(rows),
            },
        };

        const tBuilder = Test.createTestingModule({
            providers: [
                ViewConfig,
                tRepository,
                OrdersListRepository,
                OrdersListService,
            ],
            controllers: [
                OrdersListController,
            ],
        });

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
