import { Module } from '@nestjs/common'
import { CategoriesAnalyticsModule } from './analytics/analytics.module'
import { CategoriesInfoModule } from './info/info.module'
import { CategoriesListModule } from './list/list.module'

@Module({
  imports: [
    CategoriesAnalyticsModule,
    CategoriesInfoModule,
    CategoriesListModule,
  ],
})
export class CategoriesModule {}
