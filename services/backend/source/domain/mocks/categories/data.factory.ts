import { type CategoriesDataEntity } from '@domain/database';
import { faker } from '@faker-js/faker';

export class CategoriesDataFactory {
    public static getOne(): CategoriesDataEntity {
        const date = faker.date.recent();
        return {
            category_id: faker.string.uuid(),
            name: faker.company.name(),
            created_at: date,
            updated_at: date,
        };
    }

    public static getMany(count = 1): CategoriesDataEntity[] {
        const list: CategoriesDataEntity[] = [];

        const length = count ?? faker.number.int({ min: 10, max: 40 });
        for (let index = 0; index < length; index += 1) {
            list[index] = this.getOne();
        }

        return list;
    }
}
