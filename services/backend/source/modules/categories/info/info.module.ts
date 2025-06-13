import { CategoriesStatisticsEntity } from '@domain/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesInfoService } from './module/business/business.handler';
import { CategoriesInfoRepository } from './module/integration/integration.repository';
import { CategoriesInfoController } from './module/transport/transport.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CategoriesStatisticsEntity,
        ]),
    ],
    providers: [
        CategoriesInfoRepository,
        CategoriesInfoService,
    ],
    controllers: [
        CategoriesInfoController,
    ],
})
export class CategoriesInfoModule {}
