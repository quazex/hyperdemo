import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { PostgresConfig } from './config/postgres.config';
import { BrandsModule } from './modules/brands/brands.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsListModule } from './modules/products/list/products.module';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: PostgresConfig,
        }),
        BrandsModule,
        CategoriesModule,
        ProductsListModule,
    ],
})
export class AppModule {}
