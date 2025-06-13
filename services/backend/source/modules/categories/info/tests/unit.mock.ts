import { CategoriesStatisticsEntity } from '@domain/database';
import { CategoriesStatisticsFactory } from '@domain/mocks';
import { jest } from '@jest/globals';
import { ValueProvider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingApplication } from '@testing';
import { CategoriesInfoService } from '../module/business/business.handler';
import { CategoriesInfoRepository } from '../module/integration/integration.repository';
import { CategoriesInfoController } from '../module/transport/transport.controller';

export class TestingUnitMock extends TestingApplication {
    public readonly entity = CategoriesStatisticsFactory.getOne();

    public override async init() {
        const tRepository: ValueProvider = {
            provide: getRepositoryToken(CategoriesStatisticsEntity),
            useValue: {
                findOne: jest.fn().mockReturnValue(this.entity),
            },
        };

        await super.init({
            providers: [
                tRepository,
                CategoriesInfoRepository,
                CategoriesInfoService,
            ],
            controllers: [
                CategoriesInfoController,
            ],
        });
    }
}
