CREATE DATABASE testing;

--
-- TABLES
--

CREATE TABLE brands_data (
    "brand_id" uuid NOT NULL,
    "name" text NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "PK_7ed0e423ac3f88cce6d833035fd" PRIMARY KEY ("brand_id")
);

CREATE TABLE categories_data (
    "category_id" uuid NOT NULL,
    "name" text NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "PK_7f3010dc8bd4b50698667e2807c" PRIMARY KEY ("category_id")
);

CREATE TABLE products_images (
    "image_id" uuid NOT NULL,
    "product_id" uuid NOT NULL,
    "small" text NOT NULL,
    "regular" text NOT NULL,
    "large" text NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "PK_794f2a89cde12dfb92548be4a22" PRIMARY KEY ("image_id")
);

CREATE INDEX products_images_product_index ON products_images ("product_id");

CREATE TABLE products_data (
    "product_id" uuid NOT NULL,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "brand_id" uuid NOT NULL,
    "category_id" uuid NOT NULL,
    "price" numeric(10, 2) NOT NULL,
    "feedbacks" integer NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "PK_45dfbb1693886a0792834147be2" PRIMARY KEY ("product_id")
);

CREATE TABLE orders_data (
    "order_id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "status" character varying(100) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "PK_5d2705bc67c1bf8936842abf87e" PRIMARY KEY ("order_id")
);

CREATE TABLE orders_products (
    "order_id" uuid NOT NULL,
    "product_id" uuid NOT NULL,
    "quantity" integer NOT NULL,
    "price" numeric(10, 2) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "PK_9579b145349c996722bde05dee0" PRIMARY KEY ("order_id", "product_id")
);

ALTER TABLE "products_data"
ADD CONSTRAINT "FK_89ca2708ad1ac90f17e3c50cf37" FOREIGN KEY ("brand_id") REFERENCES "brands_data"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "products_data"
ADD CONSTRAINT "FK_285f262ecfe4421993a8b5ef765" FOREIGN KEY ("category_id") REFERENCES "categories_data"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "orders_products"
ADD CONSTRAINT "FK_30215ea8a4c709381a1a0877afe" FOREIGN KEY ("order_id") REFERENCES "orders_data"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "orders_products"
ADD CONSTRAINT "FK_a9005ad241cb5716eef6ccb6fe9" FOREIGN KEY ("product_id") REFERENCES "products_data"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE MATERIALIZED VIEW "brands_analytics" AS
SELECT "p"."brand_id" AS brand_id,
    COALESCE(SUM("op"."quantity" * "op"."price"), 0)::numeric(10, 2) AS revenue,
    op.created_at::DATE AS date
FROM "products_data" "p"
LEFT JOIN "orders_products" "op" ON "op"."product_id" = "p"."product_id"
GROUP BY brand_id,
    date;

CREATE MATERIALIZED VIEW "brands_statistics" AS
SELECT "b"."brand_id" AS brand_id,
    "b"."name" AS name,
    COALESCE(pa.products, 0)::integer AS products,
    COALESCE(pa.categories, 0)::integer AS categories,
    COALESCE(pa.feedbacks, 0)::integer AS feedbacks,
    "b"."created_at" AS created_at,
    "b"."updated_at" AS updated_at
FROM "brands_data" "b"
LEFT JOIN (
    SELECT "p"."brand_id" AS brand_id,
        COUNT("p"."product_id") AS products,
        COUNT(DISTINCT "p"."category_id") AS categories,
        SUM("p"."feedbacks") AS feedbacks
    FROM "products_data" "p"
    GROUP BY brand_id
) "pa" ON pa.brand_id = "b"."brand_id";

CREATE MATERIALIZED VIEW "categories_analytics" AS
SELECT "p"."category_id" AS category_id,
    COALESCE(SUM("op"."quantity" * "op"."price"), 0)::numeric(10, 2) AS revenue,
    op.created_at::DATE AS date
FROM "products_data" "p"
LEFT JOIN "orders_products" "op" ON "op"."product_id" = "p"."product_id"
GROUP BY category_id,
    date;

CREATE MATERIALIZED VIEW "categories_statistics" AS
SELECT "b"."category_id" AS category_id,
    "b"."name" AS name,
    COALESCE(pa.products, 0)::integer AS products,
    COALESCE(pa.brands, 0)::integer AS brands,
    COALESCE(pa.feedbacks, 0)::integer AS feedbacks,
    "b"."created_at" AS created_at,
    "b"."updated_at" AS updated_at
FROM "categories_data" "b"
LEFT JOIN (
    SELECT "p"."category_id" AS category_id,
        COUNT("p"."product_id") AS products,
        COUNT(DISTINCT "p"."brand_id") AS brands,
        SUM("p"."feedbacks") AS feedbacks
    FROM "products_data" "p"
    GROUP BY category_id
) "pa" ON pa.category_id = "b"."category_id";

CREATE MATERIALIZED VIEW orders_statistics AS
SELECT "od"."order_id" AS order_id,
    "od"."user_id" AS user_id,
    "od"."status" AS status,
    COALESCE(pa.products, 0)::integer AS products,
    COALESCE(pa.revenue, 0)::numeric(10, 2) AS revenue,
    "od"."created_at" AS created_at,
    "od"."updated_at" AS updated_at
FROM "orders_data" "od"
LEFT JOIN (
    SELECT "op"."order_id" AS order_id,
        COUNT("op"."product_id") AS products,
        SUM("op"."quantity" * "op"."price") AS revenue
    FROM "orders_products" "op"
    GROUP BY order_id
) "pa" ON pa.order_id = "od"."order_id";

CREATE MATERIALIZED VIEW "products_analytics" AS
SELECT "op"."product_id" AS product_id,
    COALESCE(SUM("op"."quantity" * "op"."price"), 0)::numeric(10, 2) AS revenue,
    op.created_at::DATE AS date
FROM "orders_products" "op"
GROUP BY product_id,
    date;
