import { ProductsDataEntity, ReviewsDataEntity } from '@domain/database'
import { ProductsDataFactory } from '@domain/mocks'
import { jest } from '@jest/globals'
import { ValueProvider } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TestingApplicationUnit } from '@shared/testing'
import { ProductsReviewsHandler } from '../module/business/business.handler'
import { ProductsReviewsRepository } from '../module/integration/integration.repository'
import { ProductsReviewsController } from '../module/transport/transport.controller'

export class TestingUnitMock extends TestingApplicationUnit {
  public readonly product = ProductsDataFactory.getOne()

  public override async init(): Promise<void> {
    const tProductsRepository: ValueProvider = {
      provide: getRepositoryToken(ProductsDataEntity),
      useValue: {
        countBy: jest.fn().mockReturnValue(1),
        update: jest.fn().mockReturnValue(1),
      },
    }

    const tReviewsRepository: ValueProvider = {
      provide: getRepositoryToken(ReviewsDataEntity),
      useValue: {
        countBy: jest.fn().mockReturnValue(1),
      },
    }

    await super.init({
      providers: [
        tProductsRepository,
        tReviewsRepository,
        ProductsReviewsRepository,
        ProductsReviewsHandler,
        ProductsReviewsController,
      ],
    })
  }
}
