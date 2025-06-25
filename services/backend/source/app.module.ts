import { ConfigModule, ClerkConfig, PostgresConfig } from '@config';
import { ContextInterceptor, ContextModule } from '@context';
import { ClerkModule } from '@hyperdemo/clerk';
import { LogsRequestsInterceptor } from '@hyperdemo/logging';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'modules/users/users.module';
import { BrandsModule } from './modules/brands/brands.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { HealthModule } from './modules/health/health.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: PostgresConfig,
        }),
        ClerkModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: ClerkConfig,
        }),
        ContextModule.forRoot(),
        HealthModule,
        UsersModule,
        BrandsModule,
        CategoriesModule,
        OrdersModule,
        ProductsModule,
        ReviewsModule,
    ],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: LogsRequestsInterceptor,
    }, {
        provide: APP_INTERCEPTOR,
        useClass: ContextInterceptor,
    }],
})
export class AppModule {}
