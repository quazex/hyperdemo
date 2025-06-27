import { ProductsDataEntity, ReviewsDataEntity } from '@domain/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsReviewsHandler } from './module/business/business.handler';
import { ProductsReviewsRepository } from './module/integration/integration.repository';
import { ProductsReviewsController } from './module/transport/transport.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductsDataEntity,
            ReviewsDataEntity,
        ]),
    ],
    providers: [
        ProductsReviewsRepository,
        ProductsReviewsHandler,
        ProductsReviewsController,
    ],
})
export class ProductsReviewsModule {}
