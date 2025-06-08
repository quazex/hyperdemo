import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { CategoriesInfoSchema } from '../../types/schema.types';

export class CategoriesInfoRes implements CategoriesInfoSchema {
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

    public static init(doc: CategoriesInfoSchema): CategoriesInfoRes {
        return plainToInstance(CategoriesInfoRes, doc);
    }
}
