import { TProductsListSchema } from '@domain/schemas';
import { ProductsDataModel } from './data.model';

export class ProductsListModel {
    #list: ProductsDataModel[];
    #total: number;
    #pages: number;

    private constructor() {
        this.#list = [];
        this.#total = 0;
        this.#pages = 0;
    }

    public static init(): ProductsListModel {
        return new ProductsListModel();
    }

    public set total(value: number) {
        this.#total = value;
    }

    public set pages(value: number) {
        this.#pages = value;
    }

    public set list(values: ProductsDataModel[]) {
        this.#list = values;
    }

    public toSchema(): TProductsListSchema {
        return {
            rows: this.#list.map((m) => m.toSchema()),
            total: this.#total,
            pages: this.#pages,
        };
    }
}
