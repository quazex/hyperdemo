import { ViewConfig } from '@config';
import { ProductsDataEntity } from '@domain/database';
import { ProductsDataFactory } from '@domain/mocks';
import { jest } from '@jest/globals';
import { ValueProvider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingApplication } from '@testing';
import { ProductsListService } from '../module/business/business.handler';
import { ProductsListRepository } from '../module/integration/integration.repository';
import { ProductsListController } from '../module/transport/transport.controller';

export class TestingUnitMock extends TestingApplication {
    public readonly entities = ProductsDataFactory.getMany();

    public override async init(): Promise<void> {
        const tRepository: ValueProvider = {
            provide: getRepositoryToken(ProductsDataEntity),
            useValue: {
                count: jest.fn().mockReturnValue(this.entities.length),
                find: jest.fn().mockReturnValue(this.entities),
            },
        };

        await super.init({
            providers: [
                ViewConfig,
                tRepository,
                ProductsListRepository,
                ProductsListService,
            ],
            controllers: [
                ProductsListController,
            ],
        });
    }
}
