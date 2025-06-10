import { plainToInstance } from 'class-transformer';
import { TProductsDataSchema } from '../../../../../models/schemas';
import { ProductsSchemaDto } from '../../../shared/schema.dto';

export class ProductsInfoRes extends ProductsSchemaDto {
    public static init(data: TProductsDataSchema): ProductsSchemaDto {
        return plainToInstance(ProductsSchemaDto, data);
    }
}
