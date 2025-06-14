import { TCategoriesDataSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

export class CategoriesDataRes implements TCategoriesDataSchema {
    @ApiProperty()
    public category_id: string;

    @ApiProperty()
    public name: string;

    @ApiProperty({ minimum: 0 })
    public products: number;

    @ApiProperty({ minimum: 0 })
    public brands: number;

    @ApiProperty({ minimum: 0 })
    public feedbacks: number;

    public static init(doc: TCategoriesDataSchema): CategoriesDataRes {
        return plainToInstance(CategoriesDataRes, doc);
    }
}
