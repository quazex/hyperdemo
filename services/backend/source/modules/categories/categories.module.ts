import { Module } from '@nestjs/common';
import { CategoriesAnalyticsModule } from './analytics/analytics.module';
import { CategoriesInfoModule } from './info/info.module';
import { CategoriesListModule } from './list/list.module';
import { CategoriesProductsModule } from './products/products.module';

@Module({
    imports: [
        CategoriesAnalyticsModule,
        CategoriesInfoModule,
        CategoriesListModule,
        CategoriesProductsModule,
    ],
})
export class CategoriesModule {}
