import { ViewConfig } from '@config';
import { CategoriesStatisticsEntity } from '@domain/database';
import { CategoriesStatisticsFactory } from '@domain/mocks';
import { jest } from '@jest/globals';
import { ValueProvider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingApplication } from '@testing';
import { CategoriesListService } from '../module/business/business.handler';
import { CategoriesListRepository } from '../module/integration/integration.repository';
import { CategoriesListController } from '../module/transport/transport.controller';

export class TestingUnitMock extends TestingApplication {
    public readonly entities = CategoriesStatisticsFactory.getMany();

    public override async init(): Promise<void> {
        const tRepository: ValueProvider = {
            provide: getRepositoryToken(CategoriesStatisticsEntity),
            useValue: {
                count: jest.fn().mockReturnValue(this.entities.length),
                find: jest.fn().mockReturnValue(this.entities),
            },
        };

        await super.init({
            providers: [
                ViewConfig,
                tRepository,
                CategoriesListRepository,
                CategoriesListService,
            ],
            controllers: [
                CategoriesListController,
            ],
        });
    }
}
