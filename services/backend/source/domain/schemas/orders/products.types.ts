import { TPaginationRes } from '@domain/restapi';
import { TBrandsShortSchema } from '../brands/short.types';
import { TCategoriesShortSchema } from '../categories/short.types';
import { TProductsImageSchema } from '../products/images.types';

export type TOrdersProductsListSchema = TPaginationRes<TOrdersProductsDataSchema>;

export interface TOrdersProductsDataSchema {
    product_id: string;
    name: string;
    description: string;
    images: TProductsImageSchema[];
    brand: TBrandsShortSchema;
    category: TCategoriesShortSchema;
    quantity: number;
    price: number;
}
