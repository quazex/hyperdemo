import { OrdersStatisticsEntity } from '@domain/database';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersListService } from './module/business/business.handler';
import { OrdersListRepository } from './module/integration/integration.repository';
import { OrdersListController } from './module/transport/transport.controller';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrdersStatisticsEntity,
        ]),
    ],
    providers: [
        OrdersListRepository,
        OrdersListService,
    ],
    controllers: [
        OrdersListController,
    ],
})
export class OrdersListModule {}
