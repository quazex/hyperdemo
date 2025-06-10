import { join } from 'path';
import { EnvironmentModule, Dotenv, InjectDotenv } from '@hyperdemo/core/modules/environment';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
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
    ProductsOrdersEntity,
} from '../models/database';

@Injectable()
export class PostgresConfig implements TypeOrmOptionsFactory {
    constructor(@InjectDotenv() private readonly env: Dotenv) {}

    public createTypeOrmOptions(): DataSourceOptions {
        return {
            type: 'postgres',
            host: this.env.get('POSTGRES_HOST').required().asString(),
            port: this.env.get('POSTGRES_PORT').required().asPortNumber(),
            username: this.env.get('POSTGRES_USERNAME').required().asString(),
            password: this.env.get('POSTGRES_PASSWORD').required().asString(),
            database: this.env.get('POSTGRES_DATABASE').required().asString(),
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
                ProductsOrdersEntity,
            ],
            useUTC: true,
            migrationsRun: false,
            synchronize: false,
            cache: false,
        };
    }

    public static init(): DataSource {
        const environment = EnvironmentModule.parse();
        const factory = new PostgresConfig(environment);
        const options = factory.createTypeOrmOptions();

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
