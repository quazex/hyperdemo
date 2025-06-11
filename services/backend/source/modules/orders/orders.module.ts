import { Module } from '@nestjs/common';
import { OrdersInfoModule } from './info/info.module';
import { OrdersListModule } from './list/list.module';

@Module({
    imports: [
        OrdersInfoModule,
        OrdersListModule,
    ],
})
export class OrdersModule {}
