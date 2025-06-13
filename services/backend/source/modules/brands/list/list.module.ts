import { BrandsStatisticsEntity } from '@domain/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsListService } from './module/business/business.handler';
import { BrandsListRepository } from './module/integration/integration.repository';
import { BrandsListController } from './module/transport/transport.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BrandsStatisticsEntity,
        ]),
    ],
    providers: [
        BrandsListRepository,
        BrandsListService,
    ],
    controllers: [
        BrandsListController,
    ],
})
export class BrandsListModule {}
