import { TReviewsListSchema } from '@domain/schemas';
import { ReviewsDataModel } from './data.model';

export class ReviewsListModel {
    #list: ReviewsDataModel[];
    #total: number;
    #pages: number;

    private constructor() {
        this.#list = [];
        this.#total = 0;
        this.#pages = 0;
    }

    public static init(): ReviewsListModel {
        return new ReviewsListModel();
    }

    public set total(value: number) {
        this.#total = value;
    }

    public set pages(value: number) {
        this.#pages = value;
    }

    public set list(values: ReviewsDataModel[]) {
        this.#list = values;
    }

    public toSchema(): TReviewsListSchema {
        return {
            rows: this.#list.map((m) => m.toSchema()),
            total: this.#total,
            pages: this.#pages,
        };
    }
}
