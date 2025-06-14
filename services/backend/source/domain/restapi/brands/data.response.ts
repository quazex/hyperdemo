import { TBrandsDataSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

export class BrandsDataRes implements TBrandsDataSchema {
    @ApiProperty()
    public brand_id: string;

    @ApiProperty()
    public name: string;

    @ApiProperty({ minimum: 0 })
    public products: number;

    @ApiProperty({ minimum: 0 })
    public categories: number;

    @ApiProperty({ minimum: 0 })
    public feedbacks: number;

    public static init(doc: TBrandsDataSchema): BrandsDataRes {
        return plainToInstance(BrandsDataRes, doc);
    }
}
