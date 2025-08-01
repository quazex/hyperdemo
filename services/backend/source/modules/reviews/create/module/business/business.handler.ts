import { ContextProvider } from '@context';
import { ReviewsDataModel } from '@domain/models';
import { Exception } from '@hyperdemo/exceptions';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TReviewsCreateParams } from '../../types/params.types';
import { ReviewsCreateRepository } from '../integration/integration.repository';

@Injectable()
export class ReviewsCreateService {
    constructor(
        private readonly contextProvider: ContextProvider,
        private readonly repository: ReviewsCreateRepository,
    ) {}

    public async create(params: TReviewsCreateParams): Promise<ReviewsDataModel> {
        const context = this.contextProvider.getStore();

        //
        // Проверка существования товара
        //
        const isProductExists = await this.repository.isProductExists(params.product_id);
        if (!isProductExists) {
            throw new Exception({
                status: HttpStatus.NOT_FOUND,
                message: 'Cannot find product',
                context: params,
            });
        }

        //
        // Создаем отзыв
        //
        const model = ReviewsDataModel.init({
            user_id: context.user.sub,
            product_id: params.product_id,
            text: params.text,
            rating: params.rating,
        });
        await this.repository.create(model);

        //
        // Отправляем событие для других модулей
        //
        this.repository.emit(params.product_id);

        return model;
    }
}
