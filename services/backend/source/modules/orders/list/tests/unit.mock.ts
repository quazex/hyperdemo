import { ViewConfig } from '@config';
import { OrdersStatisticsEntity } from '@domain/database';
import { OrdersStatisticsFactory } from '@domain/mocks';
import { jest } from '@jest/globals';
import { ValueProvider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingApplication } from '@testing';
import { OrdersListService } from '../module/business/business.handler';
import { OrdersListRepository } from '../module/integration/integration.repository';
import { OrdersListController } from '../module/transport/transport.controller';

export class TestingUnitMock extends TestingApplication {
    public readonly entities = OrdersStatisticsFactory.getMany();

    public override async init(): Promise<void> {
        const tRepository: ValueProvider = {
            provide: getRepositoryToken(OrdersStatisticsEntity),
            useValue: {
                count: jest.fn().mockReturnValue(this.entities.length),
                find: jest.fn().mockReturnValue(this.entities),
            },
        };

        await super.init({
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
    }
}
