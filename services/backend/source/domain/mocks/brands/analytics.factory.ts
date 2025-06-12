import { type BrandsAnalyticsEntity } from '@domain/database';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export class BrandsAnalyticsFactory {
    public static getMany(): BrandsAnalyticsEntity[] {
        const list: BrandsAnalyticsEntity[] = [];

        const DAYS_COUNT = 30;
        const brand = faker.string.uuid();
        const first = DateTime.utc();

        for (let index = 0; index < DAYS_COUNT; index += 1) {
            list.push({
                brand_id: brand,
                revenue: faker.number.float({ min: 100, max: 200, fractionDigits: 2 }),
                date: first.plus({ days: index }).toISODate(),
            });
        }

        return list;
    }
}
