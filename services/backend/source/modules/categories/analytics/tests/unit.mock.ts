import { CategoriesAnalyticsEntity } from '@domain/database'
import { CategoriesAnalyticsFactory, CategoriesStatisticsFactory } from '@domain/mocks'
import { jest } from '@jest/globals'
import { ValueProvider } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TestingApplicationUnit } from '@shared/testing'
import { CategoriesAnalyticsService } from '../module/business/business.handler'
import { CategoriesAnalyticsRepository } from '../module/integration/integration.repository'
import { CategoriesAnalyticsController } from '../module/transport/transport.controller'

export class TestingUnitMock extends TestingApplicationUnit {
  public readonly category = CategoriesStatisticsFactory.getOne()
  public readonly rows = CategoriesAnalyticsFactory.getMany()

  public override async init(): Promise<void> {
    const rows = this.rows.map((row) => ({
      ...row,
      category_id: this.category.category_id,
    }))

    const tRepository: ValueProvider = {
      provide: getRepositoryToken(CategoriesAnalyticsEntity),
      useValue: {
        find: jest.fn().mockReturnValue(rows),
      },
    }

    await super.init({
      providers: [
        tRepository,
        CategoriesAnalyticsRepository,
        CategoriesAnalyticsService,
      ],
      controllers: [
        CategoriesAnalyticsController,
      ],
    })
  }
}
