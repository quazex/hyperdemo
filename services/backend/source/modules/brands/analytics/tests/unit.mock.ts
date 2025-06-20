import { BrandsAnalyticsEntity } from '@domain/database';
import { BrandsAnalyticsFactory, BrandsStatisticsFactory } from '@domain/mocks';
import { jest } from '@jest/globals';
import { ValueProvider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingApplication } from '@testing';
import { BrandsAnalyticsService } from '../module/business/business.handler';
import { BrandsAnalyticsRepository } from '../module/integration/integration.repository';
import { BrandsAnalyticsController } from '../module/transport/transport.controller';

export class TestingUnitMock extends TestingApplication {
    public readonly brand = BrandsStatisticsFactory.getOne();
    public readonly rows = BrandsAnalyticsFactory.getMany();

    public override async init(): Promise<void> {
        const rows = this.rows.map((row) => ({
            ...row,
            brand_id: this.brand.brand_id,
        }));

        const tRepository: ValueProvider = {
            provide: getRepositoryToken(BrandsAnalyticsEntity),
            useValue: {
                find: jest.fn().mockReturnValue(rows),
            },
        };

        await super.init({
            providers: [
                tRepository,
                BrandsAnalyticsRepository,
                BrandsAnalyticsService,
            ],
            controllers: [
                BrandsAnalyticsController,
            ],
        });
    }
}
