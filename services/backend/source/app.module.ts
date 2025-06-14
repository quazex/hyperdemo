import { AuthModule } from '@auth';
import { ConfigModule, AuthConfig, PostgresConfig } from '@config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from './modules/brands/brands.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { HealthModule } from './modules/health/health.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: PostgresConfig,
        }),
        AuthModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: AuthConfig,
        }),
        HealthModule,
        BrandsModule,
        CategoriesModule,
        OrdersModule,
        ProductsModule,
    ],
})
export class AppModule {}
