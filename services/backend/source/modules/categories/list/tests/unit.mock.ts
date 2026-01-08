import { CategoriesStatisticsEntity } from '@domain/database'
import { CategoriesStatisticsFactory } from '@domain/mocks'
import { jest } from '@jest/globals'
import { ValueProvider } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TestingApplicationUnit } from '@shared/testing'
import { CategoriesListService } from '../module/business/business.handler'
import { CategoriesListRepository } from '../module/integration/integration.repository'
import { CategoriesListController } from '../module/transport/transport.controller'

export class TestingUnitMock extends TestingApplicationUnit {
  public readonly entities = CategoriesStatisticsFactory.getMany()

  public override async init(): Promise<void> {
    const tRepository: ValueProvider = {
      provide: getRepositoryToken(CategoriesStatisticsEntity),
      useValue: {
        count: jest.fn().mockReturnValue(this.entities.length),
        find: jest.fn().mockReturnValue(this.entities),
      },
    }

    await super.init({
      providers: [
        tRepository,
        CategoriesListRepository,
        CategoriesListService,
      ],
      controllers: [
        CategoriesListController,
      ],
    })
  }
}
