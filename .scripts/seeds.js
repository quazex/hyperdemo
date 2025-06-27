const { writeFileSync } = require('fs');
const { join } = require('path');
const { gzipSync } = require('zlib');
const { faker } = require('@faker-js/faker');
const { insert } = require('sql-bricks');
const { DateTime } = require('luxon');

const CONFIG = {
    brands_qty: 168,
    categories_qty: 32,
    products_qty: 631,
    orders_qty: 2795,
    dates: {
        from: new Date('2024-06-02T00:00:00Z'),
        to: new Date('2024-08-30T23:59:59Z'),
    },
    statuses: [
        'created',
        'delivery',
        'canceled',
        'resolved',
    ],
    images: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '12',
        '23',
        '38',
        '45',
    ],
    csv: {
        header: true,
        quoted: true,
    },
};

const randomDate = (options) => {
    const dt = faker.date.between(options);
    return DateTime.fromJSDate(dt).toSQL();
};

const entities = {
    brands: [],
    categories: [],
    products: [],
    images: [],
    reviews: [],
    carts: [],
    orders: [],
};

for (let index = 0; index < CONFIG.brands_qty; index += 1) {
    const created = randomDate(CONFIG.dates);

    entities.brands.push({
        brand_id: faker.string.uuid(),
        name: faker.company.name(),
        created_at: created,
        updated_at: created,
    });
}

for (let index = 0; index < CONFIG.categories_qty; index += 1) {
    const created = randomDate(CONFIG.dates);

    entities.categories.push({
        category_id: faker.string.uuid(),
        name: faker.commerce.department(),
        created_at: created,
        updated_at: created,
    });
}

for (let index = 0; index < CONFIG.products_qty; index += 1) {
    const image = faker.helpers.arrayElement(CONFIG.images);
    const created = randomDate(CONFIG.dates);

    const brand = faker.helpers.arrayElement(entities.brands);
    const category = faker.helpers.arrayElement(entities.categories);

    const reviewsQty = faker.number.int({ min: 10, max: 40 });

    const product = {
        product_id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        brand_id: brand.brand_id,
        category_id: category.category_id,
        price: faker.number.float({ min: 10, max: 120, fractionDigits: 2 }),
        feedbacks: reviewsQty,
        created_at: created,
        updated_at: created,
    };

    entities.images.push({
        image_id: faker.string.uuid(),
        product_id: product.product_id,
        small: `https://prd.place/120?id=${image}`,
        regular: `https://prd.place/360?id=${image}`,
        large: `https://prd.place/640?id=${image}`,
        created_at: created,
    });

    for (let index = 0; index < reviewsQty; index += 1) {
        entities.reviews.push({
            id: faker.string.uuid(),
            user_id: faker.string.uuid(),
            product_id: product.product_id,
            text: faker.lorem.sentence(),
            rating: faker.number.int({ min: 1, max: 5 }),
            created_at: randomDate(CONFIG.dates),
        })
    }

    entities.products.push(product);
}

for (let index = 0; index < CONFIG.orders_qty; index += 1) {
    const created = randomDate(CONFIG.dates);

    const order = {
        order_id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        status: faker.helpers.arrayElement(CONFIG.statuses),
        created_at: created,
        updated_at: created,
    };

    const products = faker.helpers.arrayElements(entities.products, {
        min: 3,
        max: 12,
    });

    for (const product of products) {
        entities.carts.push({
            order_id: order.order_id,
            product_id: product.product_id,
            quantity: faker.number.int({ min: 1, max: 4 }),
            price: product.price,
            created_at: randomDate(CONFIG.dates),
        });
    }

    entities.orders.push(order);
}

const sqlQueries = [
    insert('brands_data').values(entities.brands).toString(),
    insert('categories_data').values(entities.categories).toString(),
    insert('products_data').values(entities.products).toString(),
    insert('products_images').values(entities.images).toString(),
    insert('orders_data').values(entities.orders).toString(),
    insert('orders_products').values(entities.carts).toString(),
    insert('reviews_data').values(entities.reviews).toString(),
    'REFRESH MATERIALIZED VIEW brands_analytics',
    'REFRESH MATERIALIZED VIEW brands_statistics',
    'REFRESH MATERIALIZED VIEW categories_analytics',
    'REFRESH MATERIALIZED VIEW categories_statistics',
    'REFRESH MATERIALIZED VIEW orders_statistics',
    'REFRESH MATERIALIZED VIEW products_analytics',
];

const rawSQL = sqlQueries.map((q) => q.concat(';')).join('\n').concat('\n')
const compressed = gzipSync(rawSQL)
const filepath = join(__dirname, '../.docker', './postgres.seeds.sql.gz')

writeFileSync(filepath, compressed);
