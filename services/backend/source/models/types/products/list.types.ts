import { TPaginationRes } from '../../../shared/pagination';
import { TProductsDataSchema } from '../../schemas';

export type TProductsListPagination = TPaginationRes<TProductsDataSchema>;

export interface TProductsListFilters {
    brand_id?: string;
    category_id?: string;
    page: number;
}

export interface TProductsListHandler {
    getList(filters: TProductsListFilters): Promise<TProductsListPagination>;
}
