import { Injectable, Logger } from '@nestjs/common';
import { TProductsReviewsParams } from '../../types/params.types';
import { ProductsReviewsRepository } from '../integration/integration.repository';

@Injectable()
export class ProductsReviewsHandler {
    private readonly logger = new Logger('ProductsReviewsHandler');

    constructor(private readonly repository: ProductsReviewsRepository) {}

    public async getReviews(params: TProductsReviewsParams): Promise<void> {
        try {
            const isProductExists = await this.repository.isProductExists(params.product_id);
            if (!isProductExists) {
                throw new Error(`Cannot find product=${params.product_id}`);
            }

            const reviews = await this.repository.countReviews(params.product_id);
            if (reviews === 0) {
                this.logger.log(`Skip updating feedbacks `);
            }

            const updatedCount = await this.repository.updateProduct({
                product_id: params.product_id,
                feedbacks: reviews,
            });
            this.logger.log(`Updated ${updatedCount} rows`);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
}
