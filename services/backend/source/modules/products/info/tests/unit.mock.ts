import { ProductsDataEntity } from '@domain/database';
import { ProductsDataFactory } from '@domain/mocks';
import { jest } from '@jest/globals';
import { ValueProvider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingApplication } from '@testing';
import { ProductsInfoService } from '../module/business/business.handler';
import { ProductsInfoRepository } from '../module/integration/integration.repository';
import { ProductsInfoController } from '../module/transport/transport.controller';

export class TestingUnitMock extends TestingApplication {
    public readonly entity = ProductsDataFactory.getOne();

    public override async init() {
        const tRepository: ValueProvider = {
            provide: getRepositoryToken(ProductsDataEntity),
            useValue: {
                findOne: jest.fn().mockReturnValue(this.entity),
            },
        };

        await super.init({
            providers: [
                tRepository,
                ProductsInfoRepository,
                ProductsInfoService,
            ],
            controllers: [
                ProductsInfoController,
            ],
        });
    }
}
