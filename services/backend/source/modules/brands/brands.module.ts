import { Module } from '@nestjs/common';
import { BrandsAnalyticsModule } from './analytics/analytics.module';
import { BrandsInfoModule } from './info/info.module';
import { BrandsListModule } from './list/list.module';
import { BrandsProductsModule } from './products/products.module';

@Module({
    imports: [
        BrandsAnalyticsModule,
        BrandsInfoModule,
        BrandsListModule,
        BrandsProductsModule,
    ],
})
export class BrandsModule {}
