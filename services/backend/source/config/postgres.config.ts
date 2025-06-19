import { join } from 'path';
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
} from '@domain/database';
import { EnvironmentModule, Dotenv, InjectDotenv } from '@hyperdemo/nestjs/modules/environment';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class PostgresConfig implements TypeOrmOptionsFactory {
    constructor(@InjectDotenv() private readonly env: Dotenv) {}

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        const connectTimeout = this.env.get('POSTGRES_TIMEOUT').default('10000').asIntPositive();
        return {
            type: 'postgres',
            host: this.env.get('POSTGRES_HOST').required().asString(),
            port: this.env.get('POSTGRES_PORT').required().asPortNumber(),
            username: this.env.get('POSTGRES_USERNAME').required().asString(),
            password: this.env.get('POSTGRES_PASSWORD').required().asString(),
            database: this.env.get('POSTGRES_DATABASE').required().asString(),
            ssl: this.env.get('POSTGRES_SECURE').default('false').asBoolStrict(),
            connectTimeoutMS: connectTimeout,
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
            ],
            useUTC: true,
            migrationsRun: false,
            synchronize: false,
            cache: false,
            retryDelay: connectTimeout,
            verboseRetryLog: false,
        };
    }

    public static init(): DataSource {
        const environment = EnvironmentModule.parse();
        const factory = new PostgresConfig(environment);
        const options = factory.createTypeOrmOptions() as DataSourceOptions;

        const root = process.cwd();
        const migrations = join(root, 'source/database/migrations/*-migration.ts');

        return new DataSource({
            ...options,
            migrationsRun: true,
            migrations: [
                migrations,
            ],
        });
    }
}
