import { type ReviewsDataEntity } from '@domain/database';
import { faker } from '@faker-js/faker';
import { ProductsDataFactory } from '../products/data.factory';

export class ReviewsDataFactory {
    public static getOne(): ReviewsDataEntity {
        const product = ProductsDataFactory.getOne();
        const date = faker.date.recent();

        const entity: ReviewsDataEntity = {
            id: faker.string.uuid(),
            user_id: faker.string.uuid(),
            product_id: product.product_id,
            product,
            text: faker.lorem.sentences({ min: 1, max: 3 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            created_at: date,
        };

        return entity;
    }

    public static getMany(count?: number): ReviewsDataEntity[] {
        const list: ReviewsDataEntity[] = [];

        const product = ProductsDataFactory.getOne();
        const length = count ?? faker.number.int({ min: 5, max: 20 });

        for (let index = 0; index < length; index += 1) {
            const review = this.getOne();

            review.product_id = product.product_id;
            review.product = product;
            list[index] = review;
        }

        return list;
    }
}
