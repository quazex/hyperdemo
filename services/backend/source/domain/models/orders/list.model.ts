import { TOrdersListSchema } from '@domain/schemas';
import { OrdersDataModel } from './data.model';

export class OrdersListModel {
    #list: OrdersDataModel[];
    #total: number;
    #pages: number;

    private constructor() {
        this.#list = [];
        this.#total = 0;
        this.#pages = 0;
    }

    public static init(): OrdersListModel {
        return new OrdersListModel();
    }

    public set total(value: number) {
        this.#total = value;
    }

    public set pages(value: number) {
        this.#pages = value;
    }

    public set list(values: OrdersDataModel[]) {
        this.#list = values;
    }

    public toSchema(): TOrdersListSchema {
        return {
            rows: this.#list.map((m) => m.toSchema()),
            total: this.#total,
            pages: this.#pages,
        };
    }
}
