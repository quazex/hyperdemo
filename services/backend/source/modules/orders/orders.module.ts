import { Module } from '@nestjs/common';
import { OrdersInfoModule } from './info/info.module';
import { OrdersListModule } from './list/list.module';
import { OrdersProductsModule } from './products/products.module';

@Module({
    imports: [
        OrdersInfoModule,
        OrdersListModule,
        OrdersProductsModule,
    ],
})
export class OrdersModule {}
