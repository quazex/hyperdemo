import {
    BrandsDataEntity,
    CategoriesDataEntity,
    ProductsDataEntity,
    ProductsImagesEntity,
} from '@models/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsInfoService } from './module/business/business.handler';
import { ProductsInfoRepository } from './module/integration/integration.repository';
import { ProductsInfoController } from './module/transport/transport.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BrandsDataEntity,
            CategoriesDataEntity,
            ProductsDataEntity,
            ProductsImagesEntity,
        ]),
    ],
    providers: [
        ProductsInfoRepository,
        ProductsInfoService,
    ],
    controllers: [
        ProductsInfoController,
    ],
})
export class ProductsInfoModule {}
