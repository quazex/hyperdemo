import { OrdersStatisticsEntity } from '@domain/database';
import { OrdersStatisticsFactory } from '@domain/mocks';
import { jest } from '@jest/globals';
import { ValueProvider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingApplication } from '@testing';
import { OrdersInfoService } from '../module/business/business.handler';
import { OrdersInfoRepository } from '../module/integration/integration.repository';
import { OrdersInfoController } from '../module/transport/transport.controller';

export class TestingUnitMock extends TestingApplication {
    public readonly entity = OrdersStatisticsFactory.getOne();

    public override async init() {
        const tRepository: ValueProvider = {
            provide: getRepositoryToken(OrdersStatisticsEntity),
            useValue: {
                findOne: jest.fn().mockReturnValue(this.entity),
            },
        };

        await super.init({
            providers: [
                tRepository,
                OrdersInfoRepository,
                OrdersInfoService,
            ],
            controllers: [
                OrdersInfoController,
            ],
        });
    }
}
