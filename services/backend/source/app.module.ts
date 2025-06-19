import { ClerkModule } from '@access/clerk';
import { ConfigModule, ClerkConfig, PostgresConfig } from '@config';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
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
        EventEmitterModule.forRoot({
            global: true,
        }),
        ClerkModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: ClerkConfig,
        }),
        HealthModule,
        BrandsModule,
        CategoriesModule,
        OrdersModule,
        ProductsModule,
    ],
})
export class AppModule {}
