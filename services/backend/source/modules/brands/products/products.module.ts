import { Module } from '@nestjs/common';
import { BrandsProductsService } from './module/business/business.handler';
import { BrandsProductsController } from './module/transport/transport.controller';

@Module({
    providers: [
        BrandsProductsService,
    ],
    controllers: [
        BrandsProductsController,
    ],
})
export class BrandsProductsModule {}
