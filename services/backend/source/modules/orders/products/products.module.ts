import {
    BrandsDataEntity,
    CategoriesDataEntity,
    OrdersProductsEntity,
    ProductsDataEntity,
    ProductsImagesEntity,
} from '@domain/database';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersProductsService } from './module/business/business.handler';
import { OrdersProductsRepository } from './module/integration/integration.repository';
import { OrdersProductsController } from './module/transport/transport.controller';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            BrandsDataEntity,
            CategoriesDataEntity,
            OrdersProductsEntity,
            ProductsDataEntity,
            ProductsImagesEntity,
        ]),
    ],
    providers: [
        OrdersProductsRepository,
        OrdersProductsService,
    ],
    controllers: [
        OrdersProductsController,
    ],
})
export class OrdersProductsModule {}
