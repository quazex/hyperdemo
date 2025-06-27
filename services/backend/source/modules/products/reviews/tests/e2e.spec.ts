import { setTimeout } from 'node:timers/promises';
import { TProductsDataSchema, TProductsListSchema, TReviewsDataSchema } from '@domain/schemas';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from '@jest/globals';
import { HttpStatus } from '@nestjs/common';

describe('Products Reviews Events (e2e)', () => {
    describe('EVENT reviews.created.event', () => {
        it('should increment feedbacks field', async() => {
            //
            // Получаем список товаров
            //
            const productsList = await global.JEST_E2E.application.inject<TProductsListSchema>({
                method: 'GET',
                url: '/api/v1/products/list?page=1',
            });

            expect(productsList.statusCode).toBe(HttpStatus.OK);
            expect(productsList.body.rows.length).toBeGreaterThan(0);

            //
            // Создаем отзыв
            //
            const productBefore = faker.helpers.arrayElement(productsList.body.rows);
            const reviewData = {
                text: faker.lorem.sentence(),
                rating: faker.number.int({ min: 1, max: 5 }),
            };

            const createdReview = await global.JEST_E2E.application.inject<TReviewsDataSchema>({
                method: 'POST',
                url: `/api/v1/reviews/${productBefore.product_id}/create`,
                payload: reviewData,
            });

            expect(createdReview.statusCode).toBe(HttpStatus.CREATED);

            //
            // Событие срабатывает асинхронно, поэтому нужно дополнительное время для обработки
            //
            await setTimeout(1_000);

            //
            // Получаем товар повторно
            //
            const productAfter = await global.JEST_E2E.application.inject<TProductsDataSchema>({
                method: 'GET',
                url: `/api/v1/products/${productBefore.product_id}/info`,
            });

            expect(productAfter.statusCode).toBe(HttpStatus.OK);

            //
            // Проверяем результат
            //
            const feedbacksDiff = productAfter.body.feedbacks - productBefore.feedbacks;
            expect(feedbacksDiff).toBe(1);
        });
    });
});
