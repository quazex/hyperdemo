import { TOrdersProductsListSchema } from '@domain/schemas';
import { OrdersProductsDataModel } from './data.model';

export class OrdersProductsListModel {
    #list: OrdersProductsDataModel[];
    #total: number;
    #pages: number;

    private constructor() {
        this.#list = [];
        this.#total = 0;
        this.#pages = 0;
    }

    public static init(): OrdersProductsListModel {
        return new OrdersProductsListModel();
    }

    public set total(value: number) {
        this.#total = value;
    }

    public set pages(value: number) {
        this.#pages = value;
    }

    public set list(values: OrdersProductsDataModel[]) {
        this.#list = values;
    }

    public toSchema(): TOrdersProductsListSchema {
        return {
            rows: this.#list.map((m) => m.toSchema()),
            total: this.#total,
            pages: this.#pages,
        };
    }
}
