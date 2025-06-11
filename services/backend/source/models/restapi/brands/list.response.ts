import { TPaginationRes } from '@models/restapi';
import { TBrandsDataSchema } from '@models/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Type } from 'class-transformer';
import { BrandsDataRes } from './data.response';

export type TBrandsPagination = TPaginationRes<TBrandsDataSchema>;

export class BrandsListRes implements TBrandsPagination {
    @Expose()
    @ApiProperty({ minimum: 0 })
    public total: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Expose()
    @Type(() => BrandsDataRes)
    public rows: BrandsDataRes[];

    public static init(data: TBrandsPagination): BrandsListRes {
        return plainToInstance(BrandsListRes, data);
    }
}
