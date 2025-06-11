import { OrdersStatisticsEntity } from '@models/database';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersInfoService } from './module/business/business.handler';
import { OrdersInfoRepository } from './module/integration/integration.repository';
import { OrdersInfoController } from './module/transport/transport.controller';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrdersStatisticsEntity,
        ]),
    ],
    providers: [
        OrdersInfoRepository,
        OrdersInfoService,
    ],
    controllers: [
        OrdersInfoController,
    ],
})
export class OrdersInfoModule {}
