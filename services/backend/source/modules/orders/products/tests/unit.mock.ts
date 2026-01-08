import { OrdersDataEntity, OrdersProductsEntity } from '@domain/database'
import { OrdersProductsFactory, OrdersStatisticsFactory } from '@domain/mocks'
import { jest } from '@jest/globals'
import { ValueProvider } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TestingApplicationUnit } from '@shared/testing'
import { OrdersProductsService } from '../module/business/business.handler'
import { OrdersProductsRepository } from '../module/integration/integration.repository'
import { OrdersProductsController } from '../module/transport/transport.controller'

export class TestingUnitMock extends TestingApplicationUnit {
  public readonly order = OrdersStatisticsFactory.getOne()
  public readonly products = OrdersProductsFactory.getMany()

  public override async init(): Promise<void> {
    const products = this.products.map((row) => ({
      ...row,
      order_id: this.order.order_id,
    }))

    const tOrdersRepository: ValueProvider = {
      provide: getRepositoryToken(OrdersDataEntity),
      useValue: {
        countBy: jest.fn().mockReturnValue(1),
      },
    }

    const tProductsRepository: ValueProvider = {
      provide: getRepositoryToken(OrdersProductsEntity),
      useValue: {
        countBy: jest.fn().mockReturnValue(products.length),
        find: jest.fn().mockReturnValue(products),
      },
    }

    await super.init({
      providers: [
        tOrdersRepository,
        tProductsRepository,
        OrdersProductsRepository,
        OrdersProductsService,
      ],
      controllers: [
        OrdersProductsController,
      ],
    })
  }
}
