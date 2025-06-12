import { TBrandsDataSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class BrandsDataRes implements TBrandsDataSchema {
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

    public static init(doc: TBrandsDataSchema): BrandsDataRes {
        return plainToInstance(BrandsDataRes, doc);
    }
}
