import { ConfigModule, ClerkConfig, PostgresConfig } from '@config'
import { ContextInterceptor, ContextModule } from '@shared/context'
import { ClerkModule } from '@hyperdemo/clerk'
import { LogsRequestsInterceptor } from '@hyperdemo/logging'
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandsModule } from './modules/brands/brands.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { HealthModule } from './modules/health/health.module'
import { OrdersModule } from './modules/orders/orders.module'
import { ProductsModule } from './modules/products/products.module'
import { ReviewsModule } from './modules/reviews/reviews.module'
import { UsersModule } from './modules/users/users.module'

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
    EventEmitterModule.forRoot({
      global: true,
      ignoreErrors: true,
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
