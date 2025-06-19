import { TBrandsShortSchema } from '../brands/short.types';
import { TCategoriesShortSchema } from '../categories/short.types';
import { TProductsImageSchema } from '../products/images.types';

export interface TOrdersProductsSchema {
    product_id: string;
    name: string;
    description: string;
    images: TProductsImageSchema[];
    brand: TBrandsShortSchema;
    category: TCategoriesShortSchema;
    quantity: number;
    price: number;
}
