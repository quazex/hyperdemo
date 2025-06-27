import { ContextProvider } from '@context';
import { ProductsDataEntity, ReviewsDataEntity } from '@domain/database';
import { jest } from '@jest/globals';
import { ValueProvider } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingApplication } from '@testing';
import { ReviewsCreateService } from '../module/business/business.handler';
import { ReviewsCreateRepository } from '../module/integration/integration.repository';
import { ReviewsCreateController } from '../module/transport/transport.controller';

export class TestingUnitMock extends TestingApplication {
    public override async init(): Promise<void> {
        const tEmitterProvider: ValueProvider = {
            provide: EventEmitter2,
            useValue: {
                emit: jest.fn(),
            },
        };

        const tProductsRepository: ValueProvider = {
            provide: getRepositoryToken(ProductsDataEntity),
            useValue: {
                countBy: jest.fn().mockReturnValue(1),
            },
        };

        const tReviewsRepository: ValueProvider = {
            provide: getRepositoryToken(ReviewsDataEntity),
            useValue: {
                create: jest.fn(),
                save: jest.fn(),
            },
        };

        await super.init({
            providers: [
                tEmitterProvider,
                tProductsRepository,
                tReviewsRepository,
                ContextProvider,
                ReviewsCreateRepository,
                ReviewsCreateService,
            ],
            controllers: [
                ReviewsCreateController,
            ],
        });
    }
}
