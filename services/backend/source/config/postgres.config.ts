import {
  BrandsAnalyticsEntity,
  BrandsDataEntity,
  BrandsStatisticsEntity,
  CategoriesAnalyticsEntity,
  CategoriesDataEntity,
  CategoriesStatisticsEntity,
  OrdersDataEntity,
  OrdersProductsEntity,
  OrdersStatisticsEntity,
  ProductsAnalyticsEntity,
  ProductsDataEntity,
  ProductsImagesEntity,
  ReviewsDataEntity,
} from '@domain/database'
import { Injectable } from '@nestjs/common'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Environment } from 'environment'

@Injectable()
export class PostgresConfig implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: Environment.Postgres.URI,
      connectTimeoutMS: Environment.Postgres.Timeout,
      entities: [
        BrandsAnalyticsEntity,
        BrandsDataEntity,
        BrandsStatisticsEntity,
        CategoriesAnalyticsEntity,
        CategoriesDataEntity,
        CategoriesStatisticsEntity,
        OrdersDataEntity,
        OrdersStatisticsEntity,
        ProductsAnalyticsEntity,
        ProductsDataEntity,
        ProductsImagesEntity,
        OrdersProductsEntity,
        ReviewsDataEntity,
      ],
      useUTC: true,
      migrationsRun: false,
      synchronize: false,
      cache: false,
      retryDelay: Environment.Postgres.Timeout,
      verboseRetryLog: false,
    }
  }
}
