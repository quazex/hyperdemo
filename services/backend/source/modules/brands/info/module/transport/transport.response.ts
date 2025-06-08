import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { BrandsInfoSchema } from '../../types/schema.types';

export class BrandsInfoRes implements BrandsInfoSchema {
    @Expose()
    @ApiProperty()
    public brand_id: string;

    @Expose()
    @ApiProperty()
    public name: string;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public products: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public categories: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public feedbacks: number;

    public static init(doc: BrandsInfoSchema): BrandsInfoRes {
        return plainToInstance(BrandsInfoRes, doc);
    }
}
