import { ProductsDataEntity } from '@domain/database'
import { ProductsDataFactory } from '@domain/mocks'
import { jest } from '@jest/globals'
import { ValueProvider } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TestingApplicationUnit } from '@shared/testing'
import { ProductsInfoService } from '../module/business/business.handler'
import { ProductsInfoRepository } from '../module/integration/integration.repository'
import { ProductsInfoController } from '../module/transport/transport.controller'

export class TestingUnitMock extends TestingApplicationUnit {
  public readonly entity = ProductsDataFactory.getOne()

  public override async init(): Promise<void> {
    const tRepository: ValueProvider = {
      provide: getRepositoryToken(ProductsDataEntity),
      useValue: {
        findOne: jest.fn().mockReturnValue(this.entity),
      },
    }

    await super.init({
      providers: [
        tRepository,
        ProductsInfoRepository,
        ProductsInfoService,
      ],
      controllers: [
        ProductsInfoController,
      ],
    })
  }
}
