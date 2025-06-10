import { Module } from '@nestjs/common';
import { CategoriesProductsService } from './module/business/business.handler';
import { CategoriesProductsController } from './module/transport/transport.controller';

@Module({
    providers: [
        CategoriesProductsService,
    ],
    controllers: [
        CategoriesProductsController,
    ],
})
export class CategoriesProductsModule {}
