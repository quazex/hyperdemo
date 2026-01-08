import { ProductsAnalyticsEntity } from '@domain/database'
import { ProductsAnalyticsFactory, ProductsDataFactory } from '@domain/mocks'
import { jest } from '@jest/globals'
import { ValueProvider } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TestingApplicationUnit } from '@shared/testing'
import { ProductsAnalyticsService } from '../module/business/business.handler'
import { ProductsAnalyticsRepository } from '../module/integration/integration.repository'
import { ProductsAnalyticsController } from '../module/transport/transport.controller'

export class TestingUnitMock extends TestingApplicationUnit {
  public readonly product = ProductsDataFactory.getOne()
  public readonly rows = ProductsAnalyticsFactory.getMany()

  public override async init(): Promise<void> {
    const rows = this.rows.map((row) => ({
      ...row,
      product_id: this.product.product_id,
    }))

    const tRepository: ValueProvider = {
      provide: getRepositoryToken(ProductsAnalyticsEntity),
      useValue: {
        find: jest.fn().mockReturnValue(rows),
      },
    }

    await super.init({
      providers: [
        tRepository,
        ProductsAnalyticsRepository,
        ProductsAnalyticsService,
      ],
      controllers: [
        ProductsAnalyticsController,
      ],
    })
  }
}
