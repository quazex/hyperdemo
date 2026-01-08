import { ProductsDataEntity, ReviewsDataEntity } from '@domain/database'
import { jest } from '@jest/globals'
import { ValueProvider } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ContextProvider } from '@shared/context'
import { TestingApplicationUnit } from '@shared/testing'
import { ReviewsCreateService } from '../module/business/business.handler'
import { ReviewsCreateRepository } from '../module/integration/integration.repository'
import { ReviewsCreateController } from '../module/transport/transport.controller'

export class TestingUnitMock extends TestingApplicationUnit {
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
        create: jest.fn(),
        save: jest.fn(),
      },
    }

    await super.init({
      providers: [
        tProductsRepository,
        tReviewsRepository,
        ContextProvider,
        ReviewsCreateRepository,
        ReviewsCreateService,
      ],
      controllers: [
        ReviewsCreateController,
      ],
    })
  }
}
