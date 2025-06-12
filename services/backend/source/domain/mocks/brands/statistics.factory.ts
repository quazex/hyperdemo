import { type BrandsStatisticsEntity } from '@domain/database';
import { faker } from '@faker-js/faker';

export class BrandsStatisticsFactory {
    public static getOne(): BrandsStatisticsEntity {
        const date = faker.date.recent();
        return {
            brand_id: faker.string.uuid(),
            name: faker.company.name(),
            products: faker.number.int({ min: 100, max: 200 }),
            categories: faker.number.int({ min: 10, max: 20 }),
            feedbacks: faker.number.int({ min: 40, max: 80 }),
            created_at: date,
            updated_at: date,
        };
    }

    public static getMany(count = 1): BrandsStatisticsEntity[] {
        const list: BrandsStatisticsEntity[] = [];

        const length = count ?? faker.number.int({ min: 10, max: 40 });
        for (let index = 0; index < length; index += 1) {
            list[index] = this.getOne();
        }

        return list;
    }
}
