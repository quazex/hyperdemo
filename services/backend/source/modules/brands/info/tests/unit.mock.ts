import { BrandsStatisticsEntity } from '@domain/database'
import { BrandsStatisticsFactory } from '@domain/mocks'
import { jest } from '@jest/globals'
import { ValueProvider } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TestingApplicationUnit } from '@shared/testing'
import { BrandsInfoService } from '../module/business/business.handler'
import { BrandsInfoRepository } from '../module/integration/integration.repository'
import { BrandsInfoController } from '../module/transport/transport.controller'

export class TestingUnitMock extends TestingApplicationUnit {
  public readonly entity = BrandsStatisticsFactory.getOne()

  public override async init(): Promise<void> {
    const tRepository: ValueProvider = {
      provide: getRepositoryToken(BrandsStatisticsEntity),
      useValue: {
        findOne: jest.fn().mockReturnValue(this.entity),
      },
    }

    await super.init({
      providers: [
        tRepository,
        BrandsInfoRepository,
        BrandsInfoService,
      ],
      controllers: [
        BrandsInfoController,
      ],
    })
  }
}
