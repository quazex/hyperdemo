import { type ProductsDataEntity } from '@domain/database';
import { faker } from '@faker-js/faker';
import { BrandsDataFactory } from '../brands/data.factory';
import { CategoriesDataFactory } from '../categories/data.factory';

export class ProductsDataFactory {
    public static getOne(): ProductsDataEntity {
        const date = faker.date.recent();

        const entity: ProductsDataEntity = {
            product_id: faker.string.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            brand: BrandsDataFactory.getOne(),
            category: CategoriesDataFactory.getOne(),
            images: [],
            price: faker.number.float({ min: 10, max: 120, fractionDigits: 2 }),
            feedbacks: faker.number.int({ min: 10, max: 1_000 }),
            reviews: [],
            created_at: date,
            updated_at: date,
        };

        const imagesQty = faker.number.int({ min: 2, max: 4 });
        for (let index = 0; index < imagesQty; index += 1) {
            entity.images.push({
                image_id: faker.string.uuid(),
                product: {} as never,
                small: faker.image.urlPicsumPhotos({ width: 120 }),
                regular: faker.image.urlPicsumPhotos({ width: 360 }),
                large: faker.image.urlPicsumPhotos({ width: 640 }),
                created_at: date,
            });
        }

        const reviewsQty = faker.number.int({ min: 4, max: 8 });
        for (let index = 0; index < reviewsQty; index += 1) {
            entity.reviews.push({
                id: faker.string.uuid(),
                user_id: faker.string.uuid(),
                product_id: entity.product_id,
                product: {} as never,
                text: faker.lorem.sentence(),
                rating: faker.number.int({ min: 1, max: 5 }),
                created_at: date,
            });
        }

        return entity;
    }

    public static getMany(count = 1): ProductsDataEntity[] {
        const list: ProductsDataEntity[] = [];

        const length = count ?? faker.number.int({ min: 10, max: 40 });
        for (let index = 0; index < length; index += 1) {
            list[index] = this.getOne();
        }

        return list;
    }
}
