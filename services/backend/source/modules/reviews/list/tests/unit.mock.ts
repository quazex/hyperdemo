import { ViewConfig } from '@config'
import { ProductsDataEntity, ReviewsDataEntity } from '@domain/database'
import { ReviewsDataFactory } from '@domain/mocks'
import { jest } from '@jest/globals'
import { ValueProvider } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TestingApplicationUnit } from '@shared/testing'
import { ReviewsListService } from '../module/business/business.handler'
import { ReviewsListRepository } from '../module/integration/integration.repository'
import { ReviewsListController } from '../module/transport/transport.controller'

export class TestingUnitMock extends TestingApplicationUnit {
  public readonly entities = ReviewsDataFactory.getMany()

  public override async init(): Promise<void> {
    const tProductsRepository: ValueProvider = {
      provide: getRepositoryToken(ProductsDataEntity),
      useValue: {
        countBy: jest.fn().mockReturnValue(1),
      },
    }

    const tReviewsRepository: ValueProvider = {
      provide: getRepositoryToken(ReviewsDataEntity),
      useValue: {
        count: jest.fn().mockReturnValue(this.entities.length),
        find: jest.fn().mockReturnValue(this.entities),
      },
    }

    await super.init({
      providers: [
        ViewConfig,
        tProductsRepository,
        tReviewsRepository,
        ReviewsListRepository,
        ReviewsListService,
      ],
      controllers: [
        ReviewsListController,
      ],
    })
  }
}
