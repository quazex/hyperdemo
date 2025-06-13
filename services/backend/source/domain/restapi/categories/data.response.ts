import { TCategoriesDataSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class CategoriesDataRes implements TCategoriesDataSchema {
    @Expose()
    @ApiProperty()
    public category_id: string;

    @Expose()
    @ApiProperty()
    public name: string;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public products: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public brands: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public feedbacks: number;

    public static init(doc: TCategoriesDataSchema): CategoriesDataRes {
        return plainToInstance(CategoriesDataRes, doc);
    }
}
