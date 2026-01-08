import { ClerkConfig, PostgresConfig, EnvironmentModule } from '@config'
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClerkModule } from '@shared/clerk'
import { ContextInterceptor, ContextModule } from '@shared/context'
import { BrandsModule } from './modules/brands/brands.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { HealthModule } from './modules/health/health.module'
import { OrdersModule } from './modules/orders/orders.module'
import { ProductsModule } from './modules/products/products.module'
import { ReviewsModule } from './modules/reviews/reviews.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    EnvironmentModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useExisting: PostgresConfig,
    }),
    ClerkModule.forRootAsync({
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
    useClass: ContextInterceptor,
  }],
})
export class AppModule {}
