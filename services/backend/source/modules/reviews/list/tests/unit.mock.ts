import { ViewConfig } from '@config';
import { ReviewsDataEntity } from '@domain/database';
import { ReviewsDataFactory } from '@domain/mocks';
import { jest } from '@jest/globals';
import { ValueProvider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingApplication } from '@testing';
import { ReviewsListService } from '../module/business/business.handler';
import { ReviewsListRepository } from '../module/integration/integration.repository';
import { ReviewsListController } from '../module/transport/transport.controller';

export class TestingUnitMock extends TestingApplication {
    public readonly entities = ReviewsDataFactory.getMany(3);

    public override async init(): Promise<void> {
        const tRepository: ValueProvider = {
            provide: getRepositoryToken(ReviewsDataEntity),
            useValue: {
                count: jest.fn().mockReturnValue(this.entities.length),
                find: jest.fn().mockReturnValue(this.entities),
            },
        };

        await super.init({
            providers: [
                ViewConfig,
                tRepository,
                ReviewsListRepository,
                ReviewsListService,
            ],
            controllers: [
                ReviewsListController,
            ],
        });
    }
}
