import { TPaginationRes } from '@domain/restapi';
import { TBrandsDataSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Type } from 'class-transformer';
import { BrandsDataRes } from './data.response';

export type TBrandsPagination = TPaginationRes<TBrandsDataSchema>;

export class BrandsListRes implements TBrandsPagination {
    @ApiProperty({ minimum: 0 })
    public total: number;

    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Type(() => BrandsDataRes)
    public rows: BrandsDataRes[];

    public static init(data: TBrandsPagination): BrandsListRes {
        return plainToInstance(BrandsListRes, data);
    }
}
