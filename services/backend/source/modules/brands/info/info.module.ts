import { BrandsStatisticsEntity } from '@domain/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsInfoService } from './module/business/business.handler';
import { BrandsInfoRepository } from './module/integration/integration.repository';
import { BrandsInfoController } from './module/transport/transport.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BrandsStatisticsEntity,
        ]),
    ],
    providers: [
        BrandsInfoRepository,
        BrandsInfoService,
    ],
    controllers: [
        BrandsInfoController,
    ],
})
export class BrandsInfoModule {}
