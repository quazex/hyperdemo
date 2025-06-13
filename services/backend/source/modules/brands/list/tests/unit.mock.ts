import { ViewConfig } from '@config';
import { BrandsStatisticsEntity } from '@domain/database';
import { BrandsStatisticsFactory } from '@domain/mocks';
import { jest } from '@jest/globals';
import { ValueProvider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingApplication } from '@testing';
import { BrandsListService } from '../module/business/business.handler';
import { BrandsListRepository } from '../module/integration/integration.repository';
import { BrandsListController } from '../module/transport/transport.controller';

export class TestingUnitMock extends TestingApplication {
    public readonly entities = BrandsStatisticsFactory.getMany();

    public override async init(): Promise<void> {
        const tRepository: ValueProvider = {
            provide: getRepositoryToken(BrandsStatisticsEntity),
            useValue: {
                count: jest.fn().mockReturnValue(this.entities.length),
                find: jest.fn().mockReturnValue(this.entities),
            },
        };

        await super.init({
            providers: [
                ViewConfig,
                tRepository,
                BrandsListRepository,
                BrandsListService,
            ],
            controllers: [
                BrandsListController,
            ],
        });
    }
}
