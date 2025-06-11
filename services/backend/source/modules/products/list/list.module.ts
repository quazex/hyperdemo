import {
    BrandsDataEntity,
    CategoriesDataEntity,
    ProductsDataEntity,
    ProductsImagesEntity,
} from '@models/database';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsListService } from './module/business/business.handler';
import { ProductsListRepository } from './module/integration/integration.repository';
import { ProductsListController } from './module/transport/transport.controller';

@Global()
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
        ProductsListRepository,
        ProductsListService,
    ],
    controllers: [
        ProductsListController,
    ],
})
export class ProductsListModule {}
