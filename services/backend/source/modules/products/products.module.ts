import { Module } from '@nestjs/common'
import { ProductsAnalyticsModule } from './analytics/analytics.module'
import { ProductsInfoModule } from './info/info.module'
import { ProductsListModule } from './list/list.module'
import { ProductsReviewsModule } from './reviews/reviews.module'

@Module({
  imports: [
    ProductsAnalyticsModule,
    ProductsInfoModule,
    ProductsListModule,
    ProductsReviewsModule,
  ],
})
export class ProductsModule {}
