import { type CategoriesAnalyticsEntity } from '@domain/database';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export class CategoriesAnalyticsFactory {
    public static getMany(): CategoriesAnalyticsEntity[] {
        const list: CategoriesAnalyticsEntity[] = [];

        const DAYS_COUNT = 30;
        const category = faker.string.uuid();
        const first = DateTime.utc();

        for (let index = 0; index < DAYS_COUNT; index += 1) {
            list.push({
                category_id: category,
                revenue: faker.number.float({ min: 100, max: 200, fractionDigits: 2 }),
                date: first.plus({ days: index }).toISODate(),
            });
        }

        return list;
    }
}
