import { TPaginationRes } from '@domain/restapi';
import { TBrandsDataSchema } from '@domain/schemas';
import { BrandsDataModel } from './data.model';

export class BrandsListModel {
    #list: BrandsDataModel[];
    #total: number;
    #pages: number;

    private constructor() {
        this.#list = [];
        this.#total = 0;
        this.#pages = 0;
    }

    public static init(): BrandsListModel {
        return new BrandsListModel();
    }

    public set total(value: number) {
        this.#total = value;
    }

    public set pages(value: number) {
        this.#pages = value;
    }

    public set list(values: BrandsDataModel[]) {
        this.#list = values;
    }

    public toSchema(): TPaginationRes<TBrandsDataSchema> {
        return {
            rows: this.#list.map((m) => m.toSchema()),
            total: this.#total,
            pages: this.#pages,
        };
    }
}
