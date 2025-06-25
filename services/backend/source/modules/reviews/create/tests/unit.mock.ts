import { ContextProvider } from '@context';
import { ReviewsDataEntity } from '@domain/database';
import { ReviewsDataFactory } from '@domain/mocks';
import { jest } from '@jest/globals';
import { ValueProvider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingApplication } from '@testing';
import { ReviewsCreateService } from '../module/business/business.handler';
import { ReviewsCreateRepository } from '../module/integration/integration.repository';
import { ReviewsCreateController } from '../module/transport/transport.controller';

export class TestingUnitMock extends TestingApplication {
    public readonly entity = ReviewsDataFactory.getOne();

    public override async init(): Promise<void> {
        const tRepository: ValueProvider = {
            provide: getRepositoryToken(ReviewsDataEntity),
            useValue: {
                create: jest.fn().mockReturnValue(this.entity),
                save: jest.fn().mockReturnValue(this.entity),
            },
        };

        await super.init({
            providers: [
                ContextProvider,
                tRepository,
                ReviewsCreateRepository,
                ReviewsCreateService,
            ],
            controllers: [
                ReviewsCreateController,
            ],
        });
    }
}
