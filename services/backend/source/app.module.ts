import { AuthModule } from '@auth';
import { ConfigModule, AuthConfig, PostgresConfig } from '@config';
import { LogsRequestsInterceptor } from '@logs';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'modules/users/users.module';
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
        UsersModule,
        BrandsModule,
        CategoriesModule,
        OrdersModule,
        ProductsModule,
    ],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: LogsRequestsInterceptor,
    }],
})
export class AppModule {}
