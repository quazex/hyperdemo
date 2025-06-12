import { ViewConfig } from '@config';
import { OrdersProductsEntity } from '@domain/database';
import { OrdersProductsFactory, OrdersStatisticsFactory } from '@domain/mocks';
import { jest } from '@jest/globals';
import { ValueProvider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingApplication } from '@testing';
import { OrdersProductsService } from '../module/business/business.handler';
import { OrdersProductsRepository } from '../module/integration/integration.repository';
import { OrdersProductsController } from '../module/transport/transport.controller';

export class TestingUnitMock extends TestingApplication {
    public readonly order = OrdersStatisticsFactory.getOne();
    public readonly products = OrdersProductsFactory.getMany();

    public override async init(): Promise<void> {
        const products = this.products.map((row) => ({
            ...row,
            order_id: this.order.order_id,
        }));

        const tRepository: ValueProvider = {
            provide: getRepositoryToken(OrdersProductsEntity),
            useValue: {
                count: jest.fn().mockReturnValue(products.length),
                find: jest.fn().mockReturnValue(products),
            },
        };

        await super.init({
            providers: [
                ViewConfig,
                tRepository,
                OrdersProductsRepository,
                OrdersProductsService,
            ],
            controllers: [
                OrdersProductsController,
            ],
        });
    }
}
