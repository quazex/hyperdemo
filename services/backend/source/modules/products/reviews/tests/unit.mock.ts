import { ProductsDataEntity, ReviewsDataEntity } from '@domain/database';
import { ProductsDataFactory } from '@domain/mocks';
import { jest } from '@jest/globals';
import { ValueProvider } from '@nestjs/common';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingApplication } from '@testing';
import { ProductsReviewsHandler } from '../module/business/business.handler';
import { ProductsReviewsRepository } from '../module/integration/integration.repository';
import { ProductsReviewsController } from '../module/transport/transport.controller';

export class TestingUnitMock extends TestingApplication {
    public readonly product = ProductsDataFactory.getOne();

    public get emitter(): EventEmitter2 {
        return this.app.get(EventEmitter2);
    }

    public override async init(): Promise<void> {
        const tProductsRepository: ValueProvider = {
            provide: getRepositoryToken(ProductsDataEntity),
            useValue: {
                countBy: jest.fn().mockReturnValue(1),
                update: jest.fn().mockReturnValue(1),
            },
        };

        const tReviewsRepository: ValueProvider = {
            provide: getRepositoryToken(ReviewsDataEntity),
            useValue: {
                countBy: jest.fn().mockReturnValue(1),
            },
        };

        await super.init({
            imports: [
                EventEmitterModule.forRoot({
                    global: true,
                }),
            ],
            providers: [
                tProductsRepository,
                tReviewsRepository,
                ProductsReviewsRepository,
                ProductsReviewsHandler,
                ProductsReviewsController,
            ],
        });
    }
}
